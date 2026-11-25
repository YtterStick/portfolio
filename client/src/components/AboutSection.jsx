import { useState, useEffect, useCallback } from 'react';

const EditorialIdCard = () => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="mb-8 border border-white/[0.08] bg-primary p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-5">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 border border-white/15 overflow-hidden bg-secondary">
                {!imgError ? (
                    <img
                        src="/grad_pic.png"
                        alt="Andrei Dilag Portrait"
                        onError={() => setImgError(true)}
                        className="w-full h-full object-cover object-top editorial-img"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-serif text-2xl text-text-main">
                        AD
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col justify-between w-full">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2.5">
                    <span className="tech-label text-text-main">ANDREI DILAG</span>
                    <span className="tech-label text-[#34d399]">● ACTIVE</span>
                </div>
                <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between gap-2">
                        <span className="tech-label text-text-muted">ROLE</span>
                        <span className="text-text-main font-medium text-right">IT Faculty &amp; Full-Stack Engineer</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        <span className="tech-label text-text-muted">INSTITUTION</span>
                        <span className="text-text-main text-right">STI College Fairview</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        <span className="tech-label text-text-muted">SUBJECTS</span>
                        <span className="text-text-muted text-right">Adv. Database &amp; Network Tech 2</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        <span className="tech-label text-text-muted">TENURE</span>
                        <span className="text-text-muted text-right">Aug 2025 – Present</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ServiceInteractivePreview = ({ index }) => {
    const [tenant, setTenant] = useState('CLIENT PORTAL');
    const [step, setStep] = useState(2);
    const [optimized, setOptimized] = useState(true);

    if (index === 0) {
        const tenantData = {
            'CLIENT PORTAL': { metric: '98.4% CSAT', status: 'LIVE SYNC', badge: 'RBAC: CLIENT' },
            'ADMIN CONSOLE': { metric: '₱412K MRR', status: 'MULTI-SITE', badge: 'RBAC: OWNER' },
            'API GATEWAY': { metric: '14ms p95', status: 'JWT VERIFIED', badge: 'FASTAPI + NEXT' }
        };
        const active = tenantData[tenant];
        return (
            <div className="mb-6 p-4 bg-primary border border-white/[0.08]">
                <div className="flex gap-1.5 mb-3">
                    {Object.keys(tenantData).map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTenant(t)}
                            className={`flex-1 py-1 px-1.5 tech-label border cursor-pointer transition-colors truncate ${
                                tenant === t
                                    ? 'bg-white/[0.06] text-text-main border-white/30'
                                    : 'text-text-muted border-white/[0.08] hover:text-text-main'
                            }`}
                        >
                            {t.split(' ')[0]}
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-between px-3 py-2 bg-secondary border border-white/[0.06]">
                    <div>
                        <span className="tech-label text-text-muted block">{active.status}</span>
                        <span className="font-serif italic text-lg text-text-main">{active.metric}</span>
                    </div>
                    <span className="tech-label px-2 py-0.5 border border-white/15 text-text-main">
                        {active.badge}
                    </span>
                </div>
            </div>
        );
    }

    if (index === 1) {
        const nodes = ['01 WEBHOOK', '02 LLM / CV', '03 DB COMMIT'];
        return (
            <div className="mb-6 p-4 bg-primary border border-white/[0.08]">
                <div className="flex items-center justify-between mb-3">
                    <span className="tech-label text-text-muted">PIPELINE TRACE</span>
                    <button
                        type="button"
                        onClick={() => setStep((s) => (s + 1) % 3)}
                        className="tech-label px-2.5 py-0.5 border border-white/25 text-text-main hover:bg-white hover:text-primary cursor-pointer transition-colors"
                    >
                        STEP NODE ↗
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                    {nodes.map((node, i) => (
                        <button
                            key={node}
                            type="button"
                            onClick={() => setStep(i)}
                            className={`p-2 border text-center cursor-pointer transition-colors ${
                                step === i
                                    ? 'bg-white/[0.06] text-text-main border-white/35'
                                    : 'border-white/[0.08] text-text-muted hover:text-text-main'
                            }`}
                        >
                            <span className="tech-label block truncate">{node}</span>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mb-6 p-4 bg-primary border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
                <span className="tech-label text-text-muted">ENGINE MODE</span>
                <button
                    type="button"
                    onClick={() => setOptimized((o) => !o)}
                    className="tech-label px-2.5 py-0.5 border border-white/25 text-text-main hover:bg-white hover:text-primary cursor-pointer transition-colors"
                >
                    {optimized ? 'ACID AUTO: ON' : 'MANUAL CSV: OFF'}
                </button>
            </div>
            <div className="space-y-2">
                <div className="flex justify-between tech-label">
                    <span className="text-text-muted">RECONCILIATION</span>
                    <span className="text-text-main">
                        {optimized ? '0.4s (Zero Errors)' : '4.5h (Manual)'}
                    </span>
                </div>
                <div className="w-full h-1.5 bg-white/[0.06] overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 ${
                            optimized ? 'w-1/6 bg-[#34d399]' : 'w-11/12 bg-white/35'
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
            stack: 'NEXT.JS • REACT • FASTAPI • SPRING BOOT',
            outcome: 'Turn product ideas into fast, conversion-focused web platforms and multi-tenant SaaS applications built for scale, security, and clean UX.',
            deliverables: ['Customer Portals & MVPs', 'RESTful APIs & Auth (JWT/RBAC)', 'Responsive UI Systems']
        },
        {
            title: 'AI & Workflow Automation',
            stack: 'LLMS • N8N • COPILOT STUDIO • OPENCV',
            outcome: 'Automate repetitive operational tasks, document processing, and decision workflows with practical AI integrations that save hours every week.',
            deliverables: ['Custom LLM Assistants', 'n8n & Copilot Workflows', 'OpenCV / OMR Vision Pipelines']
        },
        {
            title: 'Enterprise & Internal Tools',
            stack: 'PAYROLL • LOGISTICS • DASHBOARDS • SQL',
            outcome: 'Replace error-prone spreadsheets with reliable internal systems, real-time operations dashboards, and high-throughput database architectures.',
            deliverables: ['Payroll & HR Systems', 'Multi-Site Logistics Tracking', 'Query & Schema Optimization']
        }
    ];

    const skillGroups = {
        fullstack: {
            label: '(01) FULLSTACK & AI',
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
            label: '(02) DATABASE & NETWORK',
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
            label: '(03) DEVOPS & TOOLS',
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
        <div className="divide-y divide-white/[0.08]">
            {/* (03) DESIGN & ARCHITECTURE / SERVICES */}
            <section id="services" className="py-28 sm:py-40">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="mb-16 max-w-3xl">
                        <div className="tech-label text-text-muted mb-3">
                            (03) DESIGN &amp; ARCHITECTURE
                        </div>
                        <h2 className="display-serif text-text-main mb-5 text-balance">
                            Interactive capabilities &amp; <em>system modules.</em>
                        </h2>
                        <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                            Translating modern full-stack engineering and AI into reliable systems that save time, reduce errors, and scale with your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {services.map((service, sIdx) => (
                            <div key={sIdx} className="editorial-card p-6 sm:p-7 flex flex-col">
                                <div className="flex-1 flex flex-col">
                                    <div className="mb-4 flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                                        <span className="tech-label text-text-muted truncate">
                                            {service.stack}
                                        </span>
                                        <span className="tech-label text-text-main">(0{sIdx + 1})</span>
                                    </div>
                                    <ServiceInteractivePreview index={sIdx} />
                                    <h3 className="font-serif text-2xl sm:text-3xl text-text-main mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                                        {service.outcome}
                                    </p>
                                </div>
                                <ul className="space-y-2 pt-4 border-t border-white/[0.08] mt-auto text-xs">
                                    {service.deliverables.map((item, dIdx) => (
                                        <li key={dIdx} className="text-text-main flex items-center gap-2.5">
                                            <span className="tech-label text-text-muted">+</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* (04) ABOUT & EXPERIENCE */}
            <section id="about" className="py-28 sm:py-40">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="mb-16 max-w-3xl">
                        <div className="tech-label text-text-muted mb-3">
                            (04) ABOUT &amp; EXPERIENCE
                        </div>
                        <h2 className="display-serif text-text-main mb-5 text-balance">
                            Educator rigor meets <em>production speed.</em>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-5 editorial-card p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <EditorialIdCard />

                                <div className="text-text-muted text-sm sm:text-base leading-relaxed space-y-4">
                                    <p>
                                        I serve as an{' '}
                                        <span className="text-text-main font-medium">
                                            IT Faculty Teacher at STI College Fairview
                                        </span>{' '}
                                        (Aug 2025 – Present), instructing college IT students in Advanced Database &amp; Network Technology 2 while engineering production software for businesses and startups.
                                    </p>
                                    <p>
                                        Teaching relational modeling, query indexing, ACID transactions, and enterprise networking keeps my architectural fundamentals razor-sharp when shipping full-stack platforms with{' '}
                                        <span className="text-text-main font-medium">
                                            Next.js, React, Python FastAPI, Java Spring Boot, and AI workflows
                                        </span>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/[0.08]">
                                <a
                                    href="/andrei_dilag_resume.pdf"
                                    download="andrei_dilag_resume.pdf"
                                    className="px-5 py-2.5 bg-text-main text-primary tech-label font-semibold hover:bg-white transition-colors"
                                >
                                    DOWNLOAD RESUME ↗
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 border border-white/20 text-text-main tech-label hover:border-white transition-colors"
                                >
                                    LINKEDIN ↗
                                </a>
                            </div>
                        </div>

                        {/* Career Log */}
                        <div className="lg:col-span-7 editorial-card p-6 sm:p-8">
                            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6 tech-label">
                                <span className="text-text-main">CHRONOLOGICAL CAREER LOG</span>
                                <span className="text-text-muted">03 ENTRIES</span>
                            </div>

                            <div className="space-y-6">
                                {experience.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`p-5 bg-primary border ${
                                            index === 0 ? 'border-white/30' : 'border-white/[0.08]'
                                        }`}
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/[0.06]">
                                            <span className="tech-label text-text-main">
                                                (0{index + 1}) {item.company}
                                            </span>
                                            <span className="tech-label text-text-muted">
                                                {item.year}
                                            </span>
                                        </div>

                                        <h4 className="font-serif text-xl sm:text-2xl text-text-main mb-1">
                                            {item.role}
                                        </h4>
                                        <div className="tech-label text-text-muted mb-3">
                                            {item.highlight}
                                        </div>

                                        <ul className="space-y-1.5 text-xs sm:text-sm text-text-muted">
                                            {item.details.map((detail, dIndex) => (
                                                <li key={dIndex} className="flex items-start gap-2.5 leading-relaxed">
                                                    <span className="tech-label text-text-main mt-0.5">+</span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* (05) COMPETENCIES & ACCOLADES */}
            <section id="skills" className="py-28 sm:py-40">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
                    <div className="max-w-3xl">
                        <div className="tech-label text-text-muted mb-3">
                            (05) COMPETENCIES &amp; ACCOLADES
                        </div>
                        <h2 className="display-serif-md text-text-main text-balance">
                            Technical index &amp; <em>verified honors.</em>
                        </h2>
                    </div>

                    {/* Interactive 3-Tab Skills Matrix */}
                    <div className="editorial-card p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-4 mb-6">
                            <span className="tech-label text-text-main">
                                CORE COMPETENCIES &amp; STACK
                            </span>

                            <div className="flex flex-wrap gap-2">
                                {Object.entries(skillGroups).map(([key, group]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setSkillTab(key)}
                                        className={`px-3.5 py-1.5 tech-label border cursor-pointer transition-colors ${
                                            skillTab === key
                                                ? 'bg-text-main text-primary border-text-main font-semibold'
                                                : 'bg-primary text-text-muted border-white/15 hover:text-text-main'
                                        }`}
                                    >
                                        {group.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="divide-y divide-white/[0.08] border border-white/[0.08] bg-primary">
                            {activeSkillGroup.rows.map((row, idx) => (
                                <div key={`${skillTab}-${idx}`} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                    <div className="sm:w-48 shrink-0 tech-label text-text-main">
                                        {row.group}
                                    </div>
                                    <div className="flex flex-wrap gap-2 flex-1">
                                        {row.items.map((item, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 bg-secondary border border-white/10 tech-label text-text-muted"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Compact 2-Column Certifications & Archive Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-8 editorial-card p-6 sm:p-8">
                            <div className="border-b border-white/[0.08] pb-3 mb-5 flex items-center justify-between tech-label">
                                <span className="text-text-main">CERTIFICATIONS &amp; AWARDS</span>
                                <span className="text-text-muted">06 RECORDS</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                {certificates.map((cert, index) => (
                                    <div key={index} className="p-4 bg-primary border border-white/[0.08] space-y-1">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="font-serif text-lg text-text-main truncate">
                                                {cert.title}
                                            </span>
                                            <span className="tech-label text-text-muted shrink-0">
                                                {cert.year}
                                            </span>
                                        </div>
                                        <div className="text-xs text-text-muted">
                                            {cert.org} — {cert.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="lg:col-span-4 editorial-card p-6 flex flex-col justify-between"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.08] tech-label">
                                <span className="text-text-main">
                                    ARCHIVE 0{currentSlide + 1}/0{totalSlides}
                                </span>
                                <div className="flex gap-1.5">
                                    <button
                                        type="button"
                                        onClick={prevSlide}
                                        className="px-2.5 py-0.5 border border-white/15 text-text-muted hover:text-text-main cursor-pointer transition-colors"
                                    >
                                        ←
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextSlide}
                                        className="px-2.5 py-0.5 border border-white/15 text-text-muted hover:text-text-main cursor-pointer transition-colors"
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                            <div className="h-48 overflow-hidden border border-white/[0.08] mb-3 bg-primary">
                                <img
                                    src={spotlights[currentSlide].image}
                                    alt={spotlights[currentSlide].caption}
                                    className="w-full h-full object-cover object-center editorial-img"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-xs text-text-muted truncate">
                                    {spotlights[currentSlide].caption}
                                </span>
                                {spotlights[currentSlide].link && (
                                    <a
                                        href={spotlights[currentSlide].link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="tech-label text-text-main hover:underline shrink-0"
                                    >
                                        VERIFY ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutSection;
