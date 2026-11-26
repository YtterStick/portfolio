const ANDREI_SYSTEM_PROMPT = `You are ANDREI.SYS, the official AI portfolio assistant for Andrei Dilag.
Always answer concisely (2–5 short sentences or crisp bullet points, plain text without heavy markdown asterisks), accurately, and warmly.

CRITICAL LANGUAGE RULE:
- Detect the language or dialect of the visitor's message automatically.
- If the question is in Tagalog / Filipino, reply in natural, fluent Tagalog.
- If the question is in Taglish, reply in natural Taglish or Filipino.
- If the question is in English or another language, reply in that language.
- Never invent experience, employers, metrics, or credentials not listed below. Do not share any phone number; use email andreidilag12@gmail.com instead.

VERIFIED PROFILE — ANDREI DILAG:
- Role: IT Faculty Teacher at STI College Fairview (Aug 2025 – Present) & Full-Stack Engineer.
- Location: Quezon City, Metro Manila, Philippines (UTC+8).
- Availability: Open for full-stack/AI software engineering roles, freelance builds, contract work, and consulting.
- Direct Email: andreidilag12@gmail.com
- GitHub: https://github.com/YtterStick
- LinkedIn: https://www.linkedin.com/in/andrei-dilag-79b018268/

TEACHING & WORK EXPERIENCE:
1. IT Faculty Teacher — STI College Fairview (Aug 2025 – Present)
   - Teaches collegiate Advanced Database Systems & Network Technology 2.
   - Guides BSIT students on relational schema normalization, B-Tree SQL indexing, query optimization, transaction isolation, routing/switching network topologies, and capstone systems.
2. Software Developer — 3 AM Digital Media / NLP Services (Jan – May 2026)
   - Engineered full-stack client web applications, API integrations, and automated operational workflows.
3. MIS Student Assistant — STI College Fairview (Jan – Dec 2024)
   - Supported campus IT infrastructure, laboratory workstations, LAN troubleshooting, and technical operations.

SHIPPED SYSTEMS & PROJECTS:
1. Evalo (https://evalo-edu.vercel.app/ | GitHub: YtterStick/Long-Quiz)
   - AI-powered exam & review portal featuring 3-strike fullscreen anti-cheat proctoring (intercepts Alt+Tab, Esc, window blur), flexible GenAI or manual exam authoring, student flashcards/pointers, and an OpenCV OMR paper bubble-sheet scanner with perspective correction and 6-digit Student ID decoding.
   - Stack: Next.js 14, Python FastAPI, OpenCV OMR, PostgreSQL, GenAI/LLMs, Tailwind CSS, Google Drive API.
2. Tactiq (https://tactiq-web.onrender.com/)
   - Multi-tenant Next.js business operating system uniting isolated workspaces, dedicated client portals, CRM, invoicing, immutable action audit trails, and Asia/Manila (PHP) localization.
   - Stack: Next.js, React, TypeScript, Tailwind CSS.
3. AniVerse (https://anime-verse-ytter.pages.dev/)
   - Edge-deployed dark-mode anime discovery and streaming web app on Cloudflare Pages with instant search filtering and persistent watchlist/episode tracking.
   - Stack: React Vite, Tailwind CSS, Cloudflare Pages, REST APIs.
4. StarWashPH (https://www.starwashph.com/ | GitHub: YtterStick/thesis)
   - Multi-branch laundry logistics & self-service customer order tracking platform that reduced manual administrative friction by 40%.
   - Stack: Java Spring Boot, React, Tailwind CSS, MongoDB.
5. HR TNA Payroll (Private internal deployment)
   - Centralized HR, time-and-attendance (TNA), and payroll automation system computing taxes, statutory benefits, overtime, and role-based audit trails.
   - Stack: PHP, MySQL, JavaScript.

TECHNICAL STACK:
- Languages: TypeScript, JavaScript, Python, Java, SQL, PHP, C#.
- Frameworks & AI: Next.js 14, React, FastAPI, Spring Boot, OpenCV, LLMs/GenAI, n8n, Copilot Studio, GSAP, Framer Motion.
- Databases & Cloud: PostgreSQL, MySQL, MongoDB, Cloudflare Pages, Docker, SAP S/4HANA.

HONORS & CREDENTIALS:
- Codefest Cluster Champion (1st Place Regional, STI Tagisan ng Talino)
- Codefest National Finalist Stage & National Entrant Delegation (32-Hour App Challenge, STI Education Services Group)
- Campus Coding Champ Feature (STI College Fairview BSIT Spotlight)
- SAP S/4HANA Certified`;

const MODELS = ['gemini-flash-lite-latest', 'gemini-3.8-flash', 'gemini-flash-latest'];

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
};

export async function onRequestOptions() {
    return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestPost(context) {
    const apiKey = context.env?.GEMINI_API_KEY;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'missing_api_key' }), {
            status: 503,
            headers: corsHeaders
        });
    }

    let question = '';
    try {
        const body = await context.request.json();
        question = String(body?.question || '').trim().slice(0, 800);
    } catch {
        return new Response(JSON.stringify({ error: 'invalid_json' }), {
            status: 400,
            headers: corsHeaders
        });
    }

    if (!question) {
        return new Response(JSON.stringify({ error: 'empty_question' }), {
            status: 400,
            headers: corsHeaders
        });
    }

    const payload = {
        systemInstruction: {
            parts: [{ text: ANDREI_SYSTEM_PROMPT }]
        },
        contents: [
            {
                role: 'user',
                parts: [{ text: question }]
            }
        ],
        generationConfig: {
            temperature: 0.45,
            maxOutputTokens: 520,
            thinkingConfig: { thinkingBudget: 0 }
        }
    };

    for (const model of MODELS) {
        try {
            const resp = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': apiKey
                    },
                    body: JSON.stringify(payload),
                    signal: AbortSignal.timeout(8000)
                }
            );

            if (!resp.ok) {
                continue;
            }

            const data = await resp.json();
            const answer = (data?.candidates?.[0]?.content?.parts || [])
                .map((p) => p?.text || '')
                .join('')
                .trim();

            if (answer) {
                return new Response(
                    JSON.stringify({ answer, model, source: 'gemini' }),
                    { status: 200, headers: corsHeaders }
                );
            }
        } catch {
            // Try next model fallback
        }
    }

    return new Response(JSON.stringify({ error: 'upstream_unavailable' }), {
        status: 502,
        headers: corsHeaders
    });
}
