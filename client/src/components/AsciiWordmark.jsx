import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { soundEngine } from '../utils/soundEngine';

const GLYPHS = '!#$%&*+-/0123456789:;<=>?@ABCDEFGHJKLMNPQRSTUVWXYZ[]^_{|}~';
const pick = () => GLYPHS.charAt((Math.random() * GLYPHS.length) | 0);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const FONT = (fs) => `700 ${fs}px Geist, "Helvetica Neue", Arial, sans-serif`;
const UNIT = 400;
const SIM = { mouseStrength: 0.08, returnStrength: 14, light: [0.1, 1.0, 1.0] };

function inkRGB(el) {
    const m = getComputedStyle(el).color.match(/\d+(\.\d+)?/g) || [237, 237, 237];
    return [+m[0], +m[1], +m[2]];
}

function layoutWord(lines, W, maxH, stagger) {
    const c = document.createElement('canvas').getContext('2d');
    const test = 200;
    c.font = FONT(test);
    let widest = 0;
    let asc0 = 0;
    lines.forEach((t, i) => {
        const m = c.measureText(t);
        const iw = (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) || m.width;
        if (iw > widest) widest = iw;
        if (i === 0) asc0 = m.actualBoundingBoxAscent || test * 0.76;
    });
    let fs = (test * (W * (stagger ? (W < 700 ? 0.8 : 0.66) : 0.998))) / Math.max(1, widest);
    if (maxH) fs = Math.min(fs, ((maxH / lines.length) * 0.92) / (asc0 / test));
    c.font = FONT(fs);
    const gap = fs * 0.07;
    let y = 0;
    let inkW = 0;
    const specs = [];
    lines.forEach((t, i) => {
        const m = c.measureText(t);
        const asc = m.actualBoundingBoxAscent || fs * 0.76;
        const desc = Math.max(0, m.actualBoundingBoxDescent || fs * 0.18);
        const w = (m.actualBoundingBoxLeft + m.actualBoundingBoxRight) || m.width;
        let x = m.actualBoundingBoxLeft || 0;
        if (stagger && lines.length > 1) x += (W - w) * (i / (lines.length - 1));
        specs.push({ t, x, y: y + asc });
        y += asc + desc + (i < lines.length - 1 ? gap : 0);
        if (w > inkW) inkW = w;
    });
    if (stagger) inkW = W;
    return { fs, specs, w: Math.ceil(inkW), h: Math.ceil(y) };
}

function hostWidth(host) {
    const cs = getComputedStyle(host);
    return host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
}

const AsciiWordmark = forwardRef(({ lines = ['ANDREI', 'DILAG'], stagger = false, assemble = false }, ref) => {
    const hostRef = useRef(null);
    const engineRef = useRef(null);
    const introStartedRef = useRef(false);
    const explodeRef = useRef(assemble ? 1 : 0);
    const linesKey = Array.isArray(lines) ? lines.join('|') : String(lines);

    useImperativeHandle(ref, () => ({
        setExplode: (p) => {
            explodeRef.current = p;
            engineRef.current?.setExplode?.(p);
        },
        startIntro: () => {
            introStartedRef.current = true;
            engineRef.current?.startIntro?.();
        },
        render: () => engineRef.current?.render?.(),
        rebuild: () => engineRef.current?.build?.()
    }));

    useEffect(() => {
        const parsedLines = linesKey.split('|');
        const host = hostRef.current;
        if (!host) return;

        const REDUCED = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
        let disposed = false;

        const canWebGL = (() => {
            try {
                const c = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
            } catch {
                return false;
            }
        })();

        const createGL = () => {
            const state = {
                explode: REDUCED ? 0 : explodeRef.current,
                intro: !REDUCED && !assemble && !introStartedRef.current ? 0 : 1,
                introT: -1,
                ndc: new THREE.Vector2(-10, -10),
                moved: false,
                speed: 0,
                prev: new THREE.Vector3(),
                hasPrev: false,
                mloc: new THREE.Vector3(1e5, 1e5, 0),
                tilt: { x: 0, y: 0, tx: 0, ty: 0 },
                visible: true,
                running: false,
                t: 0,
                ray: new THREE.Raycaster(),
                renderer: null,
                scene: null,
                points: null,
                rt: null,
                post: null,
                postScene: null,
                postCam: null,
                puni: null,
                uni: null,
                group: null,
                plane: null,
                N: 0,
                base: null,
                off: null,
                offAttr: null,
                active: false,
                grid: null,
                mobile: false
            };

            const r = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'high-performance' });
            r.setClearColor(0x000000, 0);
            r.domElement.className = 'word-canvas';
            r.domElement.setAttribute('aria-hidden', 'true');
            host.appendChild(r.domElement);
            state.renderer = r;

            const onPointerMove = (e) => {
                const b = r.domElement.getBoundingClientRect();
                const h = host.getBoundingClientRect();
                if (!b.width || !b.height || !h.width || !h.height) return;
                state.ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
                state.moved = true;
                const hx = (e.clientX - h.left) / h.width - 0.5;
                const hy = (e.clientY - h.top) / h.height - 0.5;
                const inside = Math.abs(hx) < 0.7 && Math.abs(hy) < 0.9;
                state.tilt.ty = inside ? hx * 0.12 : 0;
                state.tilt.tx = inside ? hy * 0.08 : 0;
                state.kick();
            };
            window.addEventListener('pointermove', onPointerMove, { passive: true });
            const onPointerDown = (e) => {
                if (REDUCED || state.intro < 0.85 || state.explode > 0.2) return;
                if (e.target?.closest?.('a, button, input, textarea')) return;
                const heroStage = host.closest('section') || host;
                if (!heroStage.contains(e.target)) return;

                const b = r.domElement.getBoundingClientRect();
                if (!b.width || !b.height || !state.group || !state.grid || !state.off || !state.base) return;

                const clickNdc = new THREE.Vector2(
                    ((e.clientX - b.left) / b.width) * 2 - 1,
                    -((e.clientY - b.top) / b.height) * 2 + 1
                );
                state.group.updateMatrixWorld(true);
                state.ray.setFromCamera(clickNdc, state.camera);
                const inv = new THREE.Matrix4().copy(state.group.matrixWorld).invert();
                const rayLocal = state.ray.ray.clone().applyMatrix4(inv);
                const hit = new THREE.Vector3();
                if (!rayLocal.intersectPlane(state.plane, hit)) return;

                hit.x -= state.points.position.x;
                hit.y -= state.points.position.y;

                const g = state.grid;
                const off = state.off;
                const base = state.base;
                const mx = hit.x, my = hit.y, mz = hit.z;
                const RAD = UNIT * 1.65;
                const c0 = Math.max(0, ((mx - RAD - g.x0) / g.G) | 0);
                const c1 = Math.min(g.cols - 1, ((mx + RAD - g.x0) / g.G) | 0);
                const r0 = Math.max(0, ((my - RAD - g.y0) / g.G) | 0);
                const r1 = Math.min(g.rows - 1, ((my + RAD - g.y0) / g.G) | 0);

                let hitAny = false;
                for (let cy = r0; cy <= r1; cy++) {
                    for (let cx = c0; cx <= c1; cx++) {
                        const cell = cy * g.cols + cx;
                        for (let j = g.start[cell]; j < g.start[cell + 1]; j++) {
                            const i = g.idx[j] * 3;
                            const dx = (base[i] + off[i] - mx) / UNIT;
                            const dy = (base[i + 1] + off[i + 1] - my) / UNIT;
                            const dz = (base[i + 2] + off[i + 2] - mz) / UNIT;
                            const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-4;
                            if (d > 1.65) continue;
                            const falloff = 1 - d / 1.65;
                            const blast = falloff * falloff * 105;
                            off[i] += (dx / d) * blast;
                            off[i + 1] += (dy / d) * blast;
                            off[i + 2] += ((dz / d) * 0.5 + 0.65) * blast;
                            hitAny = true;
                        }
                    }
                }

                if (hitAny) {
                    state.active = true;
                    state.offAttr.needsUpdate = true;
                    soundEngine.playShockwave();
                    state.kick();
                }
            };
            window.addEventListener('pointerdown', onPointerDown, { passive: true });

            const onVisChange = () => {
                if (!document.hidden && state.visible) state.kick();
            };
            document.addEventListener('visibilitychange', onVisChange);

            let io = null;
            const observeStage = (target) => {
                if (!('IntersectionObserver' in window)) return;
                io?.disconnect();
                io = new IntersectionObserver((es) => {
                    state.visible = es[0].isIntersecting;
                    if (state.visible) state.kick();
                });
                io.observe(target);
            };

            state.build = () => {
                if (disposed) return;
                const W = hostWidth(host);
                if (!W) return;
                const mobile = W < 700;
                const maxH = assemble ? 0 : Math.max(200, window.innerHeight * (mobile ? 0.4 : 0.58));
                const L = layoutWord(parsedLines, W, maxH, stagger);
                host.style.height = `${L.h + 2}px`;

                const stage = host.closest('section, footer') || host;
                const sr = stage.getBoundingClientRect();
                const hr = host.getBoundingClientRect();
                const offX = Math.round(hr.left - sr.left);
                const offY = Math.round(hr.top - sr.top);
                const CW = Math.max(1, Math.round(sr.width));
                const CH = Math.max(1, Math.round(sr.height));

                const cs = r.domElement.style;
                cs.position = 'absolute';
                cs.left = `${-offX}px`;
                cs.top = `${-offY}px`;
                cs.pointerEvents = 'none';

                const TW = L.w + 4;
                const TH = L.h + 4;
                const o = document.createElement('canvas');
                o.width = TW;
                o.height = TH;
                const c = o.getContext('2d');
                c.font = FONT(L.fs);
                c.fillStyle = '#fff';
                c.textBaseline = 'alphabetic';
                L.specs.forEach((s) => c.fillText(s.t, s.x + 2, s.y + 2));
                const A = c.getImageData(0, 0, TW, TH).data;
                const alphaAt = (x, y) => {
                    x |= 0;
                    y |= 0;
                    if (x < 0 || y < 0 || x >= TW || y >= TH) return 0;
                    return A[(y * TW + x) * 4 + 3] / 255;
                };

                const ink = [];
                const rim = [];
                for (let y = 0; y < TH; y++) {
                    for (let x = 0; x < TW; x++) {
                        if (A[(y * TW + x) * 4 + 3] < 128) continue;
                        ink.push(y * TW + x);
                        if (
                            alphaAt(x - 1, y) < 0.5 ||
                            alphaAt(x + 1, y) < 0.5 ||
                            alphaAt(x, y - 1) < 0.5 ||
                            alphaAt(x, y + 1) < 0.5
                        ) {
                            rim.push(y * TW + x);
                        }
                    }
                }
                if (!ink.length || !rim.length) return;

                const depth = L.fs * (mobile ? 0.07 : 0.16);
                state.mobile = mobile;
                const N = Math.round(clamp(ink.length * (mobile ? 0.32 : 0.22), 16000, mobile ? 36000 : 72000));
                const nSide = Math.round(N * clamp((rim.length * depth) / (ink.length + rim.length * depth), 0.15, 0.4));
                const nFront = N - nSide;

                const pos = new Float32Array(N * 3);
                const nor = new Float32Array(N * 3);
                const seed = new Float32Array(N);
                const dir = new Float32Array(N * 3);
                const tx0 = offX - 2 - CW / 2;
                const ty0 = offY - 2 - CH / 2;

                for (let i = 0; i < N; i++) {
                    const side = i >= nFront;
                    let k, px, py, z;
                    let nx = 0, ny = 0, nz = 1;
                    if (!side) {
                        k = ink[(Math.random() * ink.length) | 0];
                        px = (k % TW) + Math.random();
                        py = ((k / TW) | 0) + Math.random();
                        z = depth / 2;
                    } else {
                        k = rim[(Math.random() * rim.length) | 0];
                        px = (k % TW) + 0.5;
                        py = ((k / TW) | 0) + 0.5;
                        z = (Math.random() - 0.5) * depth;
                        const gx = alphaAt(px + 2, py) - alphaAt(px - 2, py);
                        const gy = alphaAt(px, py + 2) - alphaAt(px, py - 2);
                        const gl = Math.hypot(gx, gy) || 1;
                        nx = -gx / gl;
                        ny = gy / gl;
                        nz = 0;
                    }
                    pos[i * 3] = px + tx0;
                    pos[i * 3 + 1] = -(py + ty0);
                    pos[i * 3 + 2] = z;
                    nor[i * 3] = nx;
                    nor[i * 3 + 1] = ny;
                    nor[i * 3 + 2] = nz;
                    seed[i] = Math.random();
                    const th = Math.random() * Math.PI * 2;
                    const ph = Math.acos(2 * Math.random() - 1);
                    dir[i * 3] = Math.sin(ph) * Math.cos(th);
                    dir[i * 3 + 1] = Math.sin(ph) * Math.sin(th);
                    dir[i * 3 + 2] = Math.cos(ph);
                }

                state.N = N;
                state.base = pos;
                state.off = new Float32Array(N * 3);
                state.active = false;

                const G = 40;
                const gx0 = tx0 - 10;
                const gy0 = -(ty0 + TH) - 10;
                const gcols = Math.max(1, Math.ceil((TW + 20) / G));
                const grows = Math.max(1, Math.ceil((TH + 20) / G));
                const counts = new Uint32Array(gcols * grows + 1);
                const cellOf = new Uint32Array(N);
                for (let q = 0; q < N; q++) {
                    const cx = clamp(((pos[q * 3] - gx0) / G) | 0, 0, gcols - 1);
                    const cy = clamp(((pos[q * 3 + 1] - gy0) / G) | 0, 0, grows - 1);
                    cellOf[q] = cy * gcols + cx;
                    counts[cellOf[q] + 1]++;
                }
                for (let s1 = 1; s1 < counts.length; s1++) counts[s1] += counts[s1 - 1];
                const fill = counts.slice(0, gcols * grows);
                const idx = new Uint32Array(N);
                for (let q2 = 0; q2 < N; q2++) idx[fill[cellOf[q2]]++] = q2;
                state.grid = { G, x0: gx0, y0: gy0, cols: gcols, rows: grows, start: counts, idx };

                const pr = Math.min(window.devicePixelRatio || 1, 2);
                r.setPixelRatio(pr);
                r.setSize(CW, CH);
                if (state.scene) {
                    state.points.geometry.dispose();
                    state.points.material.dispose();
                    state.rt.dispose();
                }
                const fov = 32;
                const camZ = CH / 2 / Math.tan((fov * Math.PI) / 360);
                state.camera = new THREE.PerspectiveCamera(fov, CW / CH, 1, camZ * 4);
                state.camera.position.z = camZ;
                state.scene = new THREE.Scene();

                const g = new THREE.BufferGeometry();
                g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
                state.offAttr = new THREE.BufferAttribute(state.off, 3);
                state.offAttr.setUsage(THREE.DynamicDrawUsage);
                g.setAttribute('aOff', state.offAttr);
                g.setAttribute('aNormal', new THREE.BufferAttribute(nor, 3));
                g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
                g.setAttribute('aDir', new THREE.BufferAttribute(dir, 3));

                const Ld = new THREE.Vector3(SIM.light[0], SIM.light[1], SIM.light[2]).normalize();
                state.uni = {
                    uTime: { value: 0 },
                    uExplode: { value: state.explode },
                    uIntro: { value: state.intro },
                    uSize: { value: mobile ? 2.3 : 4.3 },
                    uPR: { value: pr },
                    uCamZ: { value: camZ },
                    uWH: { value: new THREE.Vector2(CW, CH) },
                    uLight: { value: Ld },
                    uFlow: { value: L.fs * 0.02 }
                };

                const mat = new THREE.ShaderMaterial({
                    uniforms: state.uni,
                    transparent: true,
                    depthTest: false,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    vertexShader: `
                        uniform float uTime, uExplode, uIntro, uSize, uPR, uCamZ, uFlow;
                        uniform vec2 uWH; uniform vec3 uLight;
                        attribute vec3 aOff, aNormal, aDir; attribute float aSeed;
                        varying float vA;
                        void main(){
                          float life = fract(uTime * (0.22 + aSeed * 0.25) + aSeed * 13.7);
                          float blink = min(smoothstep(0.0, 0.1, life), 1.0 - smoothstep(0.7, 1.0, life));
                          float tt = uTime * 0.35;
                          vec3 flow = vec3(sin(tt + position.y * 0.011 + aSeed * 6.0), cos(tt * 1.3 + position.x * 0.009 + aSeed * 4.0), sin(tt * 0.9 + position.x * 0.007 - position.y * 0.008));
                          vec3 p = position + aOff + flow * uFlow * (0.4 + aSeed);
                          float ex = uExplode * uExplode;
                          p += aDir * vec3(uWH.x * 0.7, uWH.y * 1.6, 600.0) * ex;
                          float ip = clamp(uIntro * 1.6 - aSeed * 0.6, 0.0, 1.0); ip = 1.0 - pow(1.0 - ip, 3.0);
                          p = mix(position + aDir * vec3(uWH.x * 0.5, uWH.y * 0.9, 500.0), p, ip);
                          vec4 mv = modelViewMatrix * vec4(p, 1.0);
                          gl_Position = projectionMatrix * mv;
                          vec3 n = normalize(normalMatrix * aNormal);
                          float light = max(dot(n, uLight), 0.0);
                          float disturbed = clamp(length(aOff) / 60.0, 0.0, 1.0);
                          gl_PointSize = uSize * uPR * (0.35 + blink * 0.9) * (uCamZ / -mv.z);
                          vA = (0.12 + 0.88 * light) * (0.35 + 0.65 * blink) * (1.0 + disturbed * 0.6) * ip * (1.0 - smoothstep(0.1, 0.75, uExplode));
                        }
                    `,
                    fragmentShader: `
                        varying float vA;
                        void main(){
                          float d = length(gl_PointCoord - 0.5);
                          float a = 1.0 - smoothstep(0.38, 0.5, d);
                          gl_FragColor = vec4(vec3(1.0), vA * a * 0.5);
                        }
                    `
                });

                state.points = new THREE.Points(g, mat);
                state.points.frustumCulled = false;
                const tcx = offX + L.w / 2 - CW / 2;
                const tcy = -(offY + L.h / 2 - CH / 2);
                state.group = new THREE.Group();
                state.group.position.set(tcx, tcy, 0);
                state.points.position.set(-tcx, -tcy, 0);
                state.group.add(state.points);
                state.scene.add(state.group);
                state.plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -depth / 2);

                state.rt = new THREE.WebGLRenderTarget(Math.round(CW * pr), Math.round(CH * pr), {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter
                });

                if (!state.post) {
                    const chars = ' .:-=+*#%@AD';
                    const ac = document.createElement('canvas');
                    const S = 48;
                    ac.width = S * chars.length;
                    ac.height = S;
                    const ax = ac.getContext('2d');
                    ax.fillStyle = '#000';
                    ax.fillRect(0, 0, ac.width, ac.height);
                    ax.fillStyle = '#fff';
                    ax.font = `500 ${S * 0.86}px "Geist Mono", ui-monospace, monospace`;
                    ax.textAlign = 'center';
                    ax.textBaseline = 'middle';
                    for (let ci = 0; ci < chars.length; ci++) {
                        ax.fillText(chars[ci], S * (ci + 0.5), S * 0.54);
                    }
                    const atlas = new THREE.CanvasTexture(ac);
                    atlas.minFilter = THREE.LinearFilter;
                    atlas.generateMipmaps = false;

                    state.puni = {
                        tScene: { value: null },
                        tAtlas: { value: atlas },
                        uCount: { value: chars.length },
                        uCell: { value: new THREE.Vector2(1, 1) },
                        uColor: { value: new THREE.Vector3(0.93, 0.93, 0.93) },
                        uGain: { value: 3.6 },
                        uContrast: { value: 1.09 }
                    };

                    state.post = new THREE.Mesh(
                        new THREE.PlaneGeometry(2, 2),
                        new THREE.ShaderMaterial({
                            uniforms: state.puni,
                            transparent: true,
                            depthTest: false,
                            vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
                            fragmentShader: `
                                uniform sampler2D tScene, tAtlas;
                                uniform float uCount, uGain, uContrast;
                                uniform vec2 uCell;
                                uniform vec3 uColor;
                                varying vec2 vUv;
                                void main(){
                                  vec2 base = uCell * floor(vUv / uCell);
                                  float l = 0.0;
                                  l += texture2D(tScene, base + uCell * vec2(0.25, 0.25)).r;
                                  l += texture2D(tScene, base + uCell * vec2(0.75, 0.25)).r;
                                  l += texture2D(tScene, base + uCell * vec2(0.25, 0.75)).r;
                                  l += texture2D(tScene, base + uCell * vec2(0.75, 0.75)).r;
                                  l = clamp(l * 0.25 * uGain, 0.0, 1.0);
                                  l = clamp((l - 0.5) * uContrast + 0.5, 0.0, 1.0);
                                  if (l < 0.05) discard;
                                  float idx = clamp(floor(l * (uCount - 1.0) + 0.6), 1.0, uCount - 1.0);
                                  vec2 cuv = fract(vUv / uCell);
                                  float ch = texture2D(tAtlas, vec2((idx + cuv.x) / uCount, cuv.y)).r;
                                  float ef = smoothstep(0.0, 0.012, vUv.x) * smoothstep(0.0, 0.012, 1.0 - vUv.x) * smoothstep(0.0, 0.06, vUv.y) * smoothstep(0.0, 0.06, 1.0 - vUv.y);
                                  gl_FragColor = vec4(uColor, ch * (0.55 + 0.45 * l) * ef);
                                }
                            `
                        })
                    );
                    state.postScene = new THREE.Scene();
                    state.postScene.add(state.post);
                    state.postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
                }

                const cell = mobile ? 4 : 9;
                state.puni.uCell.value.set(cell / CW, cell / CH);
                state.puni.uGain.value = mobile ? 3.2 : 4.3;
                state.puni.tScene.value = state.rt.texture;
                observeStage(stage);
                state.render();
            };

            state.simulate = (dt) => {
                const off = state.off;
                const base = state.base;
                const N = state.N;
                if (!off || !base || !state.group) return;

                if (state.moved) {
                    state.moved = false;
                    state.group.updateMatrixWorld(true);
                    state.ray.setFromCamera(state.ndc, state.camera);
                    const inv = new THREE.Matrix4().copy(state.group.matrixWorld).invert();
                    const rayLocal = state.ray.ray.clone().applyMatrix4(inv);
                    const hit = new THREE.Vector3();
                    if (rayLocal.intersectPlane(state.plane, hit)) {
                        hit.x -= state.points.position.x;
                        hit.y -= state.points.position.y;
                        if (state.hasPrev) {
                            const raw = hit.distanceTo(state.prev) / UNIT / Math.max(dt, 0.001);
                            state.speed += (raw * 8 - state.speed) * 0.4;
                        }
                        state.prev.copy(hit);
                        state.hasPrev = true;
                        state.mloc.lerp(hit, 0.6);
                    } else {
                        state.speed *= 0.75;
                    }
                } else {
                    state.speed *= 0.75;
                }

                const rep = Math.min(state.speed, SIM.mouseStrength);
                let moved = false;
                if (rep > 0.002 && state.intro >= 1 && state.explode < 0.05) {
                    const g = state.grid;
                    const mx = state.mloc.x, my = state.mloc.y, mz = state.mloc.z;
                    const RAD = UNIT * 0.55;
                    const c0 = Math.max(0, ((mx - RAD - g.x0) / g.G) | 0);
                    const c1 = Math.min(g.cols - 1, ((mx + RAD - g.x0) / g.G) | 0);
                    const r0 = Math.max(0, ((my - RAD - g.y0) / g.G) | 0);
                    const r1 = Math.min(g.rows - 1, ((my + RAD - g.y0) / g.G) | 0);
                    for (let cy = r0; cy <= r1; cy++) {
                        for (let cx = c0; cx <= c1; cx++) {
                            const cell = cy * g.cols + cx;
                            for (let j = g.start[cell]; j < g.start[cell + 1]; j++) {
                                const i = g.idx[j] * 3;
                                const dx = (base[i] + off[i] - mx) / UNIT;
                                const dy = (base[i + 1] + off[i + 1] - my) / UNIT;
                                const dz = (base[i + 2] + off[i + 2] - mz) / UNIT;
                                const d = Math.sqrt(dx * dx + dy * dy + dz * dz) + 1e-4;
                                if (d > 0.55) continue;
                                let f = (rep / (d * (d + 1))) * 2 * rep * UNIT;
                                if (f > 40) f = 40;
                                off[i] += (dx / d) * f;
                                off[i + 1] += (dy / d) * f;
                                off[i + 2] += (dz / d) * f;
                                moved = true;
                            }
                        }
                    }
                }

                if (state.active || moved) {
                    const k = Math.exp(-(SIM.returnStrength + 0.1) * dt);
                    let mx2 = 0;
                    for (let q = 0; q < N * 3; q++) {
                        const v = off[q] * k;
                        off[q] = v;
                        if (v > mx2) mx2 = v;
                        else if (-v > mx2) mx2 = -v;
                    }
                    state.active = mx2 > 0.05;
                    if (!state.active && !moved) off.fill(0);
                    state.offAttr.needsUpdate = true;
                }
            };

            state.render = () => {
                if (!state.scene || !state.puni || disposed) return;
                const col = inkRGB(host);
                state.puni.uColor.value.set(col[0] / 255, col[1] / 255, col[2] / 255);
                r.setRenderTarget(state.rt);
                r.setClearColor(0x000000, 1);
                r.clear();
                r.render(state.scene, state.camera);
                r.setRenderTarget(null);
                r.setClearColor(0x000000, 0);
                r.clear();
                r.render(state.postScene, state.postCam);
            };

            state.kick = () => {
                if (state.running || !state.scene || disposed) return;
                state.running = true;
                let last = performance.now();
                const loop = (now) => {
                    if (disposed) return;
                    const dt = Math.min(0.05, (now - last) / 1000);
                    last = now;
                    if (!REDUCED) state.t += dt;
                    state.tilt.x += (state.tilt.tx - state.tilt.x) * 0.05;
                    state.tilt.y += (state.tilt.ty - state.tilt.y) * 0.05;
                    state.uni.uTime.value = state.t;
                    state.uni.uExplode.value = state.explode;
                    state.uni.uIntro.value = state.intro;
                    state.group.rotation.x = (state.mobile ? 0.08 : 0.2) + state.tilt.x + Math.sin(state.t * 0.4) * 0.025;
                    state.group.rotation.y = state.tilt.y + Math.sin(state.t * 0.27) * 0.05;
                    if (!REDUCED) state.simulate(dt);
                    const gone = state.explode >= 0.999;
                    if (!gone) state.render();
                    if ((state.visible || state.intro < 1) && !gone && !REDUCED && !document.hidden) {
                        requestAnimationFrame(loop);
                    } else {
                        if (gone) {
                            r.setRenderTarget(null);
                            r.clear();
                        }
                        state.running = false;
                    }
                };
                requestAnimationFrame(loop);
            };

            let introTween = null;
            state.startIntro = () => {
                if (state.intro >= 1) {
                    state.render();
                    state.kick();
                    return;
                }
                if (introTween) return;
                introTween = gsap.to(state, {
                    intro: 1,
                    duration: 1.45,
                    ease: 'power3.out',
                    onUpdate: () => {
                        if (state.uni) state.uni.uIntro.value = state.intro;
                        if (state.group) {
                            state.group.rotation.x = (state.mobile ? 0.08 : 0.2) + state.tilt.x;
                        }
                        state.render();
                        state.kick();
                    },
                    onComplete: () => {
                        state.intro = 1;
                        if (state.uni) state.uni.uIntro.value = 1;
                        state.render();
                        state.kick();
                    }
                });
                state.kick();
            };

            state.setExplode = (p) => {
                state.explode = p;
                if (state.uni) state.uni.uExplode.value = p;
                state.render();
                state.kick();
            };

            state.dispose = () => {
                introTween?.kill();
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerdown', onPointerDown);
                document.removeEventListener('visibilitychange', onVisChange);
                io?.disconnect();
                state.points?.geometry?.dispose();
                state.points?.material?.dispose();
                state.rt?.dispose();
                state.post?.geometry?.dispose();
                state.post?.material?.dispose();
                r.dispose();
                r.domElement.remove();
            };

            return state;
        };

        const create2D = () => {
            const cv = document.createElement('canvas');
            cv.className = 'word-canvas';
            cv.setAttribute('aria-hidden', 'true');
            host.appendChild(cv);
            const ctx = cv.getContext('2d');
            const state = {
                explode: REDUCED ? 0 : explodeRef.current,
                cells: [],
                W: 0,
                H: 0,
                ch: 10
            };
            state.build = () => {
                const W = hostWidth(host);
                if (!W) return;
                const mobile = W < 700;
                const L = layoutWord(parsedLines, W, assemble ? 0 : Math.max(200, window.innerHeight * (mobile ? 0.4 : 0.6)), stagger);
                const CW = L.w + 2, CH = L.h + 2;
                host.style.height = `${CH}px`;
                const o = document.createElement('canvas');
                o.width = CW; o.height = CH;
                const c = o.getContext('2d');
                c.font = FONT(L.fs);
                c.fillStyle = '#fff';
                L.specs.forEach((s) => c.fillText(s.t, s.x + 1, s.y + 1));
                const A = c.getImageData(0, 0, CW, CH).data;
                const cw = mobile ? 5 : 7, ch = cw * 1.6, R = ' .:-=+*%#@';
                const cells = [];
                for (let y = 0; y < CH; y += ch) {
                    for (let x = 0; x < CW; x += cw) {
                        let a = 0;
                        for (let s = 0; s < 4; s++) {
                            const px = Math.min(CW - 1, (x + ((s % 2) + 0.5) * (cw / 2)) | 0);
                            const py = Math.min(CH - 1, (y + (((s >> 1) + 0.5) * ch) / 2) | 0);
                            a += A[(py * CW + px) * 4 + 3];
                        }
                        a /= 4 * 255;
                        if (a > 0.05) {
                            cells.push([x + cw / 2, y + ch / 2, R.charAt(Math.min(9, Math.round(a * 9))), a, Math.random() * 2 - 1, -Math.random()]);
                        }
                    }
                }
                state.cells = cells; state.W = CW; state.H = CH; state.ch = ch;
                const pr = Math.min(window.devicePixelRatio || 1, 2);
                cv.width = CW * pr; cv.height = CH * pr;
                cv.style.width = `${CW}px`; cv.style.height = `${CH}px`;
                ctx.setTransform(pr, 0, 0, pr, 0, 0);
                state.render();
            };
            state.render = () => {
                const e = state.explode * state.explode;
                const col = inkRGB(host);
                ctx.clearRect(0, 0, state.W, state.H);
                ctx.font = `500 ${state.ch * 0.9}px "Geist Mono", monospace`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                for (let i = 0; i < state.cells.length; i++) {
                    const c = state.cells[i];
                    const a = (0.4 + 0.6 * c[3]) * (1 - state.explode);
                    if (a <= 0.02) continue;
                    ctx.fillStyle = `rgba(${col.join(',')},${a})`;
                    ctx.fillText(
                        e > 0.01 && Math.random() < state.explode ? pick() : c[2],
                        c[0] + c[4] * e * state.W * 0.5,
                        c[1] + c[5] * e * state.H * 2
                    );
                }
            };
            state.startIntro = () => state.render();
            state.setExplode = (p) => { state.explode = p; state.render(); };
            state.dispose = () => cv.remove();
            return state;
        };

        const fontsReady = document.fonts?.load
            ? Promise.race([
                  Promise.all([document.fonts.load('700 100px Geist'), document.fonts.load('500 20px "Geist Mono"')]),
                  new Promise((r) => setTimeout(r, 1500))
              ])
            : Promise.resolve();

        let resizeTimer = 0;
        let lastW = window.innerWidth;
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (Math.abs(window.innerWidth - lastW) < 2) return;
                lastW = window.innerWidth;
                engineRef.current?.build?.();
            }, 180);
        };

        let failsafeTimer = 0;
        fontsReady.then(() => {
            if (disposed) return;
            let engine = null;
            if (canWebGL) {
                try {
                    engine = createGL();
                } catch {
                    engine = null;
                }
            }
            if (!engine) engine = create2D();
            engineRef.current = engine;
            engine.build();
            if (introStartedRef.current) {
                engine.startIntro();
            } else if (!assemble) {
                // Failsafe: ensure hero wordmark always assembles even if loader callback already ran
                failsafeTimer = window.setTimeout(() => {
                    introStartedRef.current = true;
                    engine.startIntro();
                }, 1600);
            }
            window.addEventListener('resize', onResize);
        });

        return () => {
            disposed = true;
            clearTimeout(resizeTimer);
            clearTimeout(failsafeTimer);
            window.removeEventListener('resize', onResize);
            engineRef.current?.dispose?.();
            engineRef.current = null;
        };
    }, [linesKey, stagger, assemble]);

    return <div ref={hostRef} className="word" />;
});

AsciiWordmark.displayName = 'AsciiWordmark';
export default AsciiWordmark;
