import { useState, useEffect, useCallback } from 'react';

const TerminalIdCard = () => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="mb-6 border border-border bg-primary p-4 flex flex-col sm:flex-row items-center sm:items-stretch gap-4">
            {/* Monochrome / Pixelated Portrait Frame */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 border border-accent/60 dither-wrap bg-secondary">
                {!imgError ? (
                    <img
                        src="/grad_pic.png"
                        alt="Andrei Dilag Portrait"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover object-top dither-img"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-accent font-bold text-lg">
                        AD
                    </div>
                )}
                <span className="absolute bottom-1 right-1 z-10 w-2 h-2 bg-accent" title="Active" />
            </div>

            {/* Structured Terminal ID Metadata */}
            <div className="flex-1 flex flex-col justify-between text-xs w-full">
                <div className="flex items-center justify-between border-b border-border pb-1.5 mb-2">
                    <span className="font-bold text-text-main tracking-wider">ID // ANDREI_DILAG</span>
                    <span className="text-[10px] text-accent font-bold">[ ACTIVE ]</span>
                </div>
                <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between gap-2">
                        <span className="text-text-muted">ROLE:</span>
                        <span className="text-text-main font-semibold text-right">IT Faculty &amp; Full-Stack Eng</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        <span className="text-text-muted">INST:</span>
                        <span className="text-accent font-semibold text-right">STI College Fairview</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        <span className="text-text-muted">COURSES:</span>
                        <span className="text-text-main text-right">Adv. DB &amp; Net Tech 2</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        <span className="text-text-muted">TERM:</span>
                        <span className="text-text-muted text-right">AUG 2025 – PRESENT</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServiceInteractivePreview = ({ index }) => {
    const [tenant, setTenant] = useState('CLIENT_PORTAL');
    const [step, setStep] = useState(2);
    const [optimized, setOptimized] = useState(true);

    if (index === 0) {
        const tenantData = {
            CLIENT_PORTAL: { metric: '98.4% CSAT', status: 'SYNC_OK', badge: 'RBAC:CLIENT' },
            ADMIN_CONSOLE: { metric: 'PHP 412K', status: 'MULTI_SITE', badge: 'RBAC:OWNER' },
            API_GATEWAY: { metric: '14ms p95', status: 'JWT_LOCK', badge: 'FASTAPI+NEXT' }
        };
        const active = tenantData[tenant];
        return (
            <div className="mb-4 p-3.5 bg-primary border border-border text-[11px]">
                <div className="flex gap-1.5 mb-2.5">
                    {Object.keys(tenantData).map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTenant(t)}
                            className={`flex-1 py-1 px-1.5 text-[10px] font-bold border cursor-pointer transition-colors duration-150 truncate ${
                                tenant === t
                                    ? 'bg-secondary text-accent border-accent'
                                    : 'bg-secondary text-text-muted border-border hover:text-text-main'
                            }`}
                        >
                            [ {t.split('_')[0]} ]
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-between px-2.5 py-2 bg-secondary border border-border">
                    <div>
                        <span className="text-[9px] text-text-muted block">{active.status}</span>
                        <span className="text-text-main font-bold">{active.metric}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-primary text-accent border border-border">
                        [ {active.badge} ]
                    </span>
                </div>
            </div>
        );
    }

    if (index === 1) {
        const nodes = ['01:WEBHOOK', '02:LLM_CV', '03:DB_COMMIT'];
        return (
            <div className="mb-4 p-3.5 bg-primary border border-border text-[11px]">
                <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] text-text-muted">PIPELINE_TRACE</span>
                    <button
                        type="button"
                        onClick={() => setStep((s) => (s + 1) % 3)}
                        className="text-[10px] px-2 py-0.5 bg-primary text-accent border border-accent hover:bg-accent hover:text-primary font-bold cursor-pointer transition-colors duration-150"
                    >
                        [ + STEP_NODE ]
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                    {nodes.map((node, i) => (
                        <button
                            key={node}
                            type="button"
                            onClick={() => setStep(i)}
                            className={`p-1.5 border text-center cursor-pointer transition-colors duration-150 ${
                                step === i
                                    ? 'bg-secondary text-accent border-accent font-bold'
                                    : 'bg-secondary border-border text-text-muted hover:text-text-main'
                            }`}
                        >
                            <span className="text-[9px] block truncate">{node}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-4 p-3.5 bg-primary border border-border text-[11px]">
            <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] text-text-muted">ENGINE_MODE</span>
                <button
                    type="button"
                    onClick={() => setOptimized((o) => !o)}
                    className="text-[10px] px-2 py-0.5 border border-accent bg-primary text-accent hover:bg-accent hover:text-primary font-bold cursor-pointer transition-colors duration-150"
                >
                    {optimized ? '[ ACID_AUTO: ON ]' : '[ MANUAL_CSV: OFF ]'}
                </button>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                    <span className="text-text-muted">BATCH_TIME:</span>
                    <span className="text-accent font-bold">
                        {optimized ? '0.4s (Zero Errors)' : '4.5h (Manual)'}
                    </span>
                </div>
                <div className="w-full h-1.5 bg-secondary border border-border overflow-hidden">
                    <div
                        className={`h-full transition-all duration-200 ${
                            optimized ? 'w-1/6 bg-accent' : 'w-11/12 bg-text-muted'
                        }`}
                    />
                </div>
            </div>
        </div>
    );
};

const AboutSection = () => {
    const [skillTab, setSkillTab] = useState('fullstack');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const spotlights = [
        {
            image: '/codefest-champ.jpg',
            caption: 'STI Tagisan ng Talino: Codefest Cluster Champion',
            link: 'https://www.facebook.com/photo/?fbid=1129894329173285&set=pcb.1129900962505955'
        },
        {
            image: '/codefest-national-award.jpg',
            caption: 'STI Tagisan ng Talino: National Finalist Award Ceremony',
            link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
        },
        {
            image: '/codefest-champion-again.jpg',
            caption: 'Codefest National Entrant Team',
            link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
        },
        {
            image: '/recognition-andrei.jpg',
            caption: 'Meet Our Coding Champ: BSIT Student Feature',
            link: 'https://www.facebook.com/fairview.sti.edu/posts/-meet-%F0%9D%90%80%F0%9D%90%A7%F0%9D%90%9D%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%A2-%F0%9D%90%83%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%A0-our-coding-champ-and-2nd-year-bs-in-information-technology-st/892945256201528/'
        }
    ];

    const totalSlides = spotlights.length;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(nextSlide, 4500);
        return () => clearInterval(timer);
    }, [nextSlide, isHovered]);

    const services = [
        {
            title: 'Custom Web & SaaS Applications',
            stack: 'Next.js • React • FastAPI • Spring Boot',
            outcome: 'Turn product ideas into fast, conversion-focused web platforms and multi-tenant SaaS applications built for scale, security, and clean UX.',
            deliverables: ['Customer Portals & MVPs', 'RESTful APIs & Auth (JWT/RBAC)', 'Responsive UI Systems']
        },
        {
            title: 'AI & Workflow Automation',
            stack: 'LLMs • n8n • Copilot Studio • Computer Vision',
            outcome: 'Automate repetitive operational tasks, document processing, and decision workflows with practical AI integrations that save hours every week.',
            deliverables: ['Custom LLM Assistants', 'n8n & Copilot Workflows', 'OpenCV / OMR Vision Pipelines']
        },
        {
            title: 'Enterprise & Internal Tools',
            stack: 'Payroll • Logistics • Dashboards • SQL',
            outcome: 'Replace error-prone spreadsheets with reliable internal systems, real-time operations dashboards, and high-throughput database architectures.',
            deliverables: ['Payroll & HR Systems', 'Multi-Site Logistics Tracking', 'Query & Schema Optimization']
        }
    ];

    const skillGroups = {
        fullstack: {
            label: '01. FULLSTACK & AI',
            rows: [
                {
                    group: 'Frontend & UI',
                    items: ['React Vite', 'Next.js 14', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Responsive UI']
                },
                {
                    group: 'Backend & APIs',
                    items: ['Python FastAPI', 'Java Spring Boot', 'Node.js / Express', 'Laravel (PHP)', 'ASP.NET Core', 'REST / JWT / RBAC']
                },
                {
                    group: 'AI & Automation',
                    items: ['Generative AI / LLMs', 'Prompt Engineering', 'OpenCV (OMR & CV)', 'n8n Workflows', 'Microsoft Copilot Studio', 'Agent 365']
                }
            ]
        },
        database: {
            label: '02. DATABASE & NETWORK',
            rows: [
                {
                    group: 'Advanced Database',
                    items: ['PostgreSQL / Supabase', 'MySQL', 'MongoDB', 'Relational Modeling', 'Complex SQL & Indexing', 'ACID Transactions', 'Query Optimization', 'Stored Procedures']
                },
                {
                    group: 'Network Technology',
                    items: ['Enterprise Routing & Switching', 'VLAN Configuration', 'IPv4/IPv6 Subnetting', 'TCP/IP Protocol Suite', 'Packet Inspection', 'Network Troubleshooting']
                }
            ]
        },
        devops: {
            label: '03. DEVOPS & TOOLS',
            rows: [
                {
                    group: 'Cloud & Deployment',
                    items: ['Cloudflare Pages & Workers', 'Docker', 'CI/CD Pipelines', 'Google Cloud / Drive APIs', 'Git & GitHub']
                },
                {
                    group: 'Enterprise & Delivery',
                    items: ['SAP S/4HANA', 'Agile / Scrum', 'End-to-End System Design', 'Schema Migrations', 'Technical Curriculum Mentoring']
                }
            ]
        }
    };

    const experience = [
        {
            hash: 'a9f4c21',
            branch: 'HEAD -> main, faculty',
            year: 'AUG 2025 – PRESENT',
            role: 'IT Faculty Teacher — Advanced Database & Network Technology 2',
            company: 'STI College Fairview',
            highlight: 'Educator & Curriculum Mentor',
            details: [
                'Instructing college IT students in Advanced Database engineering: relational data modeling, query optimization, indexing, ACID transactions, normalization, and stored procedures.',
                'Facilitating Network Technology 2 hands-on labs covering enterprise routing & switching, VLANs, subnetting, TCP/IP protocols, and network troubleshooting.',
                'Designing practical coding assessments and mentoring student capstone system architectures.'
            ]
        },
        {
            hash: '7b3e104',
            branch: 'origin/industry-nlp',
            year: 'JAN 2026 – MAY 2026',
            role: 'Software Developer — NLP Business Development Services',
            company: '3 AM Digital Media',
            highlight: 'Concurrent Industry Role • AI & Backend APIs',
            details: [
                'Contributed to the architecture and implementation of production backend systems and APIs.',
                'Integrated NLP & AI models into business development applications with cross-functional teams.'
            ]
        },
        {
            hash: '2c1d889',
            branch: 'tag: v1.0-mis',
            year: 'JAN 2024 – DEC 2024',
            role: 'Student Assistant — Management Information System',
            company: 'STI College Fairview',
            highlight: 'Infrastructure & Support',
            details: [
                'Maintained campus IT infrastructure, updated student record databases for compliance, and presented systems during institutional evaluations.'
            ]
        }
    ];

    const certificates = [
        {
            title: 'Codefest National Entrant',
            year: '2024 – 2025',
            org: 'STI Education Services Group',
            description: '32-hour national mobile app finalist challenge.'
        },
        {
            title: 'Codefest Cluster Champion',
            year: '2024 – 2025',
            org: 'STI Education Services Group',
            description: '1st place regional mobile app hackathon champion.'
        },
        {
            title: 'Codefest Local Champion',
            year: '2024 – 2025',
            org: 'STI Fairview',
            description: '1st place branch mobile app development champion.'
        },
        {
            title: 'SAP S/4HANA Certification',
            year: '2025',
            org: 'STI College',
            description: 'Enterprise resource planning & process integration.'
        },
        {
            title: 'Full Stack Web Development',
            year: '2022',
            org: 'Course Certification',
            description: 'Modern web engineering with React & Node.js.'
        },
        {
            title: 'MIS Student Assistantship',
            year: '2023 – 2024',
            org: 'STI College Fairview',
            description: 'Campus IT operations & database administration.'
        }
    ];

    const activeSkillGroup = skillGroups[skillTab];

    return (
        <section className="py-24 sm:py-32 bg-primary border-b border-border font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
                {/* 1. Services / What I Can Build Section (03) */}
                <div id="services">
                    <div className="mb-8 term-card p-6 sm:p-7">
                        <div className="text-xs text-accent font-bold mb-1.5">
                            root@andrei-dev:/usr/bin/services# ./list_capabilities --business-outcomes
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-main uppercase text-balance">
                            03 // WHAT_I_CAN_BUILD_FOR_YOU (SERVICES)
                        </h2>
                        <p className="text-text-muted text-xs sm:text-sm mt-1.5 text-balance">
                            Translating modern full-stack engineering and AI into reliable systems that save time, reduce errors, and scale with your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {services.map((service, sIdx) => (
                            <div key={sIdx} className="term-card p-6 flex flex-col">
                                <div className="flex-1 flex flex-col">
                                    <div className="min-h-[30px] mb-3.5 flex items-center justify-between gap-2 border-b border-border pb-2">
                                        <span className="text-[11px] font-mono text-accent font-bold truncate">
                                            {service.stack}
                                        </span>
                                        <span className="text-[10px] text-text-muted">MOD_0{sIdx + 1}</span>
                                    </div>
                                    <ServiceInteractivePreview index={sIdx} />
                                    <h3 className="text-base sm:text-lg font-bold text-text-main mb-2 uppercase text-balance">
                                        {service.title}
                                    </h3>
                                    <p className="text-text-muted text-xs leading-relaxed mb-5">
                                        {service.outcome}
                                    </p>
                                </div>
                                <ul className="space-y-1.5 pt-3.5 border-t border-border mt-auto text-xs">
                                    {service.deliverables.map((item, dIdx) => (
                                        <li key={dIdx} className="text-text-main flex items-center gap-2">
                                            <span className="text-accent font-bold">+</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Profile ID Card + Git Log Career Timeline (04) */}
                <div id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-5 term-card p-6 sm:p-7 flex flex-col justify-between">
                        <div>
                            <div className="text-xs text-text-main font-bold border-b border-border pb-2.5 mb-5 flex items-center justify-between">
                                <span>04 // PROFILE_SPEC.TXT</span>
                                <span className="text-accent text-[10px]">[ VERIFIED ]</span>
                            </div>

                            {/* High-Contrast Monochrome Terminal ID Card */}
                            <TerminalIdCard />

                            <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-4 uppercase text-balance">
                                IT Faculty Teacher &amp; Full-Stack Engineer
                            </h2>
                            <div className="text-text-muted text-xs sm:text-sm leading-relaxed space-y-3.5">
                                <p>
                                    I serve as an{' '}
                                    <span className="text-accent font-semibold">IT Faculty Teacher at STI College Fairview</span>{' '}
                                    (Aug 2025 – Present), teaching Advanced Database &amp; Network Technology 2 while engineering production software for businesses and startups.
                                </p>
                                <p>
                                    My dual track in academia and industry keeps my fundamentals razor-sharp—from relational data modeling, indexing, and ACID reliability to modern full-stack delivery with{' '}
                                    <span className="text-text-main font-semibold">Next.js, React, Python FastAPI, Java Spring Boot, and AI workflows</span>.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-5 border-t border-border">
                            <a
                                href="/andrei_dilag_resume.pdf"
                                download="andrei_dilag_resume.pdf"
                                className="px-4 py-2.5 bg-primary text-accent font-bold text-xs border border-accent hover:bg-accent hover:text-primary text-center transition-colors duration-150"
                            >
                                [ DOWNLOAD_RESUME.PDF ↓ ]
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 bg-primary text-text-main font-bold text-xs border border-border hover:border-accent hover:text-accent text-center transition-colors duration-150"
                            >
                                [ CONNECT_LINKEDIN ↗ ]
                            </a>
                        </div>
                    </div>

                    {/* Git Commit Log Experience Timeline */}
                    <div className="lg:col-span-7 term-card p-6 sm:p-7">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2.5 mb-5 text-xs">
                            <span className="text-text-main font-bold">
                                git log --graph --decorate --career
                            </span>
                            <span className="text-text-muted">3 COMMITS</span>
                        </div>

                        <div className="space-y-4">
                            {experience.map((item, index) => (
                                <div
                                    key={index}
                                    className={`border bg-primary p-4 sm:p-5 ${
                                        index === 0 ? 'border-accent/60' : 'border-border'
                                    }`}
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2 pb-2 border-b border-border">
                                        <div>
                                            <span className="text-accent font-bold">* commit {item.hash}</span>{' '}
                                            <span className="text-text-muted">({item.branch})</span>
                                        </div>
                                        <span className="px-2 py-0.5 bg-secondary border border-border text-text-main text-[10px] font-bold uppercase">
                                            [ {item.year} ]
                                        </span>
                                    </div>

                                    <h4 className="text-sm sm:text-base font-bold text-text-main">
                                        {item.role}
                                    </h4>
                                    <div className="text-xs text-text-muted mt-0.5 mb-3">
                                        {item.company} — {item.highlight}
                                    </div>

                                    <ul className="space-y-1.5 text-xs text-text-muted">
                                        {item.details.map((detail, dIndex) => (
                                            <li key={dIndex} className="flex items-start gap-2 leading-relaxed">
                                                <span className="text-accent shrink-0">+</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Interactive Tabbed Core Competencies & Compact 2-Column Certifications */}
                <div id="skills" className="space-y-8">
                    {/* Interactive 3-Tab Skills Panel */}
                    <div className="term-card p-6 sm:p-7">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-4 mb-5">
                            <div>
                                <div className="text-[11px] text-accent font-bold">
                                    /PROC/SKILLS // INTERACTIVE_STACK_VIEWER
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-text-main uppercase">
                                    CORE_COMPETENCIES &amp; STACK
                                </h2>
                            </div>

                            {/* 3 Interactive Terminal Tabs */}
                            <div className="flex flex-wrap gap-1.5">
                                {Object.entries(skillGroups).map(([key, group]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setSkillTab(key)}
                                        className={`px-3 py-1.5 text-[11px] font-bold border cursor-pointer transition-colors duration-150 ${
                                            skillTab === key
                                                ? 'bg-primary text-accent border-accent'
                                                : 'bg-primary text-text-muted border-border hover:text-text-main'
                                        }`}
                                    >
                                        [ {group.label} ]
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="divide-y divide-border border border-border bg-primary">
                            {activeSkillGroup.rows.map((row, idx) => (
                                <div key={`${skillTab}-${idx}`} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                    <div className="sm:w-48 shrink-0 text-xs font-bold text-text-main uppercase">
                                        {row.group}
                                    </div>
                                    <div className="flex flex-wrap gap-2 flex-1">
                                        {row.items.map((item, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 bg-secondary border border-border text-text-main text-[11px]"
                                            >
                                                [ {item} ]
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compact 2-Column Certifications & Archive Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-8 term-card p-6 sm:p-7">
                            <div className="border-b border-border pb-3 mb-5 flex items-center justify-between">
                                <div>
                                    <div className="text-[11px] text-accent font-bold">
                                        /VAR/LOG/ACCOLADES // VERIFIED
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-bold text-text-main uppercase">
                                        CERTIFICATIONS &amp; AWARDS
                                    </h2>
                                </div>
                                <span className="text-[10px] text-text-muted">6 ENTRIES</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {certificates.map((cert, index) => (
                                    <div key={index} className="p-3.5 bg-primary border border-border space-y-1">
                                        <div className="flex items-center justify-between gap-2 text-xs">
                                            <span className="font-bold text-text-main uppercase truncate">
                                                {cert.title}
                                            </span>
                                            <span className="text-[10px] text-accent shrink-0">
                                                [ {cert.year} ]
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-text-muted">
                                            {cert.org} — {cert.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Compact Spotlight Archive Switcher */}
                        <div
                            className="lg:col-span-4 term-card p-5 flex flex-col justify-between"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-border text-[11px]">
                                <span className="text-text-main font-bold">
                                    ARCHIVE // 0{currentSlide + 1}/0{totalSlides}
                                </span>
                                <div className="flex gap-1.5">
                                    <button
                                        type="button"
                                        onClick={prevSlide}
                                        className="px-2 py-0.5 bg-primary border border-border text-text-muted hover:border-accent hover:text-accent cursor-pointer transition-colors duration-150"
                                    >
                                        [ &lt; ]
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextSlide}
                                        className="px-2 py-0.5 bg-primary border border-border text-text-muted hover:border-accent hover:text-accent cursor-pointer transition-colors duration-150"
                                    >
                                        [ &gt; ]
                                    </button>
                                </div>
                            </div>
                            <div className="h-48 dither-wrap border border-border mb-3 bg-primary">
                                <img
                                    src={spotlights[currentSlide].image}
                                    alt={spotlights[currentSlide].caption}
                                    className="w-full h-full object-cover object-center dither-img"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex items-center justify-between gap-2 text-[11px]">
                                <span className="text-text-muted truncate">
                                    {spotlights[currentSlide].caption}
                                </span>
                                {spotlights[currentSlide].link && (
                                    <a
                                        href={spotlights[currentSlide].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:underline shrink-0 font-bold"
                                    >
                                        [ VERIFY ↗ ]
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
