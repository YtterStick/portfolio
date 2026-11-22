import { useState, useEffect, useCallback } from 'react';

const ASCII_AVATAR = `
   ╔══════════════════╗
   ║   .----------.   ║
   ║  /   _    _   \\  ║
   ║ |   (o)  (o)   | ║
   ║ |      __      | ║
   ║  \\   \\____/   /  ║
   ║  /            \\  ║
   ║ /|  ANDREI.D  |\\ ║
   ╚══════════════════╝`;

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
            <div className="mb-4 p-3 bg-primary border border-border text-[11px]">
                <div className="flex gap-1 mb-2">
                    {Object.keys(tenantData).map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTenant(t)}
                            className={`flex-1 py-1 px-1 text-[9px] font-bold border cursor-pointer transition-none truncate ${
                                tenant === t
                                    ? 'bg-accent text-primary border-accent'
                                    : 'bg-secondary text-text-muted border-border hover:bg-accent hover:text-primary'
                            }`}
                        >
                            [{t.split('_')[0]}]
                        </button>
                    ))}
                </div>
                <div className="flex items-center justify-between px-2 py-1.5 bg-secondary border border-border">
                    <div>
                        <span className="text-[9px] text-text-muted block">{active.status}</span>
                        <span className="text-text-main font-bold">{active.metric}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 bg-primary text-accent border border-accent">
                        [{active.badge}]
                    </span>
                </div>
            </div>
        );
    }

    if (index === 1) {
        const nodes = ['01:WEBHOOK', '02:LLM_CV', '03:DB_COMMIT'];
        return (
            <div className="mb-4 p-3 bg-primary border border-border text-[11px]">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-text-muted">PIPELINE_TRACE</span>
                    <button
                        type="button"
                        onClick={() => setStep((s) => (s + 1) % 3)}
                        className="text-[10px] px-2 py-0.5 bg-secondary text-accent border border-accent hover:bg-accent hover:text-primary font-bold cursor-pointer transition-none"
                    >
                        [ + STEP_NODE ]
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {nodes.map((node, i) => (
                        <button
                            key={node}
                            type="button"
                            onClick={() => setStep(i)}
                            className={`p-1.5 border text-center cursor-pointer transition-none ${
                                step === i
                                    ? 'bg-accent text-primary border-accent font-bold'
                                    : 'bg-secondary border-border text-text-muted'
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
        <div className="mb-4 p-3 bg-primary border border-border text-[11px]">
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-text-muted">ENGINE_MODE</span>
                <button
                    type="button"
                    onClick={() => setOptimized((o) => !o)}
                    className="text-[10px] px-2 py-0.5 border border-accent bg-secondary text-accent hover:bg-accent hover:text-primary font-bold cursor-pointer transition-none"
                >
                    {optimized ? '[ ACID_AUTO: ON ]' : '[ MANUAL_CSV: OFF ]'}
                </button>
            </div>
            <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                    <span className="text-text-muted">BATCH_TIME:</span>
                    <span className="text-accent font-bold">
                        {optimized ? '0.4s [0_ERRORS]' : '4.5h [DRIFT_RISK]'}
                    </span>
                </div>
                <div className="text-accent text-[11px]">
                    {optimized ? 'LOAD: [██░░░░░░░░] 12%' : 'LOAD: [██████████] 99%'}
                </div>
            </div>
        </div>
    );
};

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState('technical');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const spotlights = [
        {
            image: '/codefest-champ.jpg',
            caption: 'STI Tagisan ng Talino: Codefest Cluster Champion',
            badge: 'CLUSTER_CHAMPION',
            link: 'https://www.facebook.com/photo/?fbid=1129894329173285&set=pcb.1129900962505955'
        },
        {
            image: '/codefest-national-award.jpg',
            caption: 'STI Tagisan ng Talino: National Finalist Stage Award Ceremony',
            badge: 'NATIONAL_FINALIST',
            link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
        },
        {
            image: '/codefest-champion-again.jpg',
            caption: 'Codefest National Entrant Team',
            badge: 'NATIONAL_STAGE',
            link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
        },
        {
            image: '/recognition-andrei.jpg',
            caption: 'Meet Our Coding Champ: BSIT Student Feature',
            badge: 'CAMPUS_FEATURE',
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

    const technicalSkills = [
        {
            category: 'AI & Large Language Models',
            level: '[█████████░] 94%',
            items: ['Generative AI (GenAI)', 'LLM Prompt Engineering', 'Multimodal AI', 'Semantic Routing', 'Fine-Tuning', 'n8n Workflow Automation', 'Microsoft Copilot Studio', 'Agent 365']
        },
        {
            category: 'Advanced Database & Data Engineering',
            level: '[██████████] 98%',
            items: ['Relational Data Modeling', 'Complex SQL & Indexing', 'PostgreSQL / Supabase', 'MySQL', 'MongoDB', 'ACID Transactions', 'Query Optimization', 'Stored Procedures & Triggers', 'Data Normalization']
        },
        {
            category: 'Network Technology & Infrastructure',
            level: '[█████████░] 92%',
            items: ['Enterprise Routing & Switching', 'VLAN Configuration', 'IPv4/IPv6 Subnetting', 'TCP/IP Protocol Suite', 'Network Troubleshooting', 'Packet Inspection', 'Network Security Policies']
        },
        {
            category: 'Backend & Systems Architecture',
            level: '[██████████] 96%',
            items: ['Python FastAPI', 'Java Spring Boot', 'Node.js / Express', 'RESTful APIs', 'OpenCV (OMR & CV)', 'Authentication (JWT / RBAC)', 'End-to-End System Design']
        },
        {
            category: 'Frontend & UI Engineering',
            level: '[█████████░] 95%',
            items: ['React Vite', 'Next.js 14', 'Tailwind CSS', 'Framer Motion', 'JavaScript (ES6+)', 'TypeScript', 'Responsive Design', 'SASS / SCSS']
        },
        {
            category: 'DevOps & Enterprise Tools',
            level: '[█████████░] 90%',
            items: ['Git & GitHub', 'CI/CD Pipelines', 'Docker', 'Google Cloud / Drive APIs', 'SAP S/4HANA', 'Agile / Scrum']
        }
    ];

    const programmingSkills = [
        {
            category: 'Python',
            level: '[██████████] 96%',
            items: ['FastAPI', 'OpenCV (Computer Vision)', 'NumPy', 'Automation Scripts', 'AsyncIO', 'Data Parsing']
        },
        {
            category: 'Java',
            level: '[█████████░] 92%',
            items: ['Spring Boot', 'Spring Data JPA', 'Hibernate', 'Maven', 'Gradle', 'Java Swing']
        },
        {
            category: 'JavaScript & TypeScript',
            level: '[██████████] 96%',
            items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'ES6+ Syntax', 'DOM & Canvas APIs']
        },
        {
            category: 'Database Query Languages',
            level: '[██████████] 98%',
            items: ['SQL (PostgreSQL, MySQL)', 'Mongoose / MongoDB Aggregations', 'Database Indexing', 'Schema Migration']
        },
        {
            category: 'C# & .NET',
            level: '[████████░░] 85%',
            items: ['ASP.NET Core', 'Entity Framework', 'OOP Architecture', 'System Integration']
        },
        {
            category: 'PHP',
            level: '[█████████░] 88%',
            items: ['Laravel', 'Server-Side Scripting', 'REST API Construction', 'Composer']
        }
    ];

    const experience = [
        {
            hash: 'a9f4c21',
            branch: 'HEAD -> main, faculty',
            year: 'Aug 2025 – Present',
            role: 'Faculty Teacher — Advanced Database & Network Technology 2',
            company: 'STI College Fairview',
            highlight: 'Educator & Curriculum Mentor',
            details: [
                'Instructed Advanced Database coursework covering relational data modeling, query optimization, indexing, ACID transactions, normalization, and stored procedures.',
                'Facilitated Network Technology 2 hands-on labs focusing on enterprise routing & switching, VLANs, subnetting, TCP/IP protocols, and network troubleshooting.',
                'Designed practical hands-on assessments, real-world coding challenges, and guided student capstone architectures.',
                'Fostered high-standard coding ethics, industry-grade database schema design, and technical problem-solving capabilities.'
            ]
        },
        {
            hash: '7b3e104',
            branch: 'origin/industry-nlp',
            year: 'Jan 2026 – May 2026',
            role: 'Software Developer — NLP Business Development Services',
            company: '3 AM Digital Media',
            highlight: 'Concurrent Industry Role • AI & Backend APIs',
            details: [
                'Contributed to the design and implementation of backend systems and APIs.',
                'Assisted in integrating AI models into business applications.',
                'Collaborated with a cross-functional team to deliver scalable software solutions.',
                'Applied modern development practices to ensure code quality and performance.'
            ]
        },
        {
            hash: '2c1d889',
            branch: 'tag: v1.0-mis',
            year: 'Jan 2024 – Dec 2024',
            role: 'Student Assistant — Management Information System',
            company: 'STI College Fairview',
            highlight: 'Infrastructure & Support',
            details: [
                'Resolved technical issues and maintained system functionality across campus infrastructure.',
                'Managed and updated student record databases for accuracy and compliance.',
                'Demonstrated and presented systems to evaluators during institutional assessments.',
                'Provided ongoing system management and troubleshooting support.'
            ]
        }
    ];

    const certificates = [
        {
            title: 'Codefest National Entrant',
            year: '2024 – 2025',
            org: 'STI Education Services Group',
            description: 'Advanced to the national stage, completing a 32-hour mobile app development challenge against top branches nationwide.'
        },
        {
            title: 'Codefest Cluster Champion',
            year: '2024 – 2025',
            org: 'STI Education Services Group',
            description: 'Won the regional round, building a mobile app in a 6-hour development challenge among competing branches.'
        },
        {
            title: 'Codefest Local Champion',
            year: '2024 – 2025',
            org: 'STI Fairview',
            description: 'Recognized as branch champion after a 6-hour mobile app hackathon, earning advancement to cluster level.'
        },
        {
            title: 'SAP S/4HANA',
            year: '2025',
            org: 'STI College',
            description: 'Certification in enterprise resource planning and business process integration using SAP systems.'
        },
        {
            title: 'Full Stack Web Development',
            year: '2022',
            org: 'Course Certification',
            description: 'Comprehensive training in modern web development technologies including React and Node.js.'
        },
        {
            title: 'Student Assistantship',
            year: '2023 – 2024',
            org: 'STI College Fairview',
            description: 'Assisted in campus IT operations, maintaining systems, and supporting institutional assessments.'
        }
    ];

    return (
        <section id="about" className="py-16 sm:py-24 bg-secondary border-b border-border font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Row: About Bio + ASCII Avatar & Git Commit Log Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    {/* Left: Profile & ASCII Avatar */}
                    <div className="lg:col-span-5 border border-border bg-primary p-5 sm:p-6 flex flex-col justify-between">
                        <div>
                            <div className="text-xs text-accent font-bold border-b border-border pb-2 mb-4">
                                ╔══[ 03 // CAT /ETC/ANDREI/PROFILE.TXT ]
                            </div>

                            {/* ASCII Avatar + Dithered Portrait Block */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 mb-5 p-3 bg-secondary border border-border">
                                <pre className="text-[9px] leading-[1.15] text-accent font-mono select-none shrink-0">
                                    {ASCII_AVATAR}
                                </pre>
                                <div className="text-xs space-y-1">
                                    <div className="text-accent font-bold">USR: ANDREI_DILAG</div>
                                    <div className="text-text-main">CLASS: FULL-STACK_ARCHITECT</div>
                                    <div className="text-text-muted">SUBCLASS: ADV_DB_EDUCATOR</div>
                                    <div className="text-accent text-[11px] pt-1">LVL: [██████████] 99</div>
                                </div>
                            </div>

                            <h2 className="text-xl sm:text-2xl font-bold text-text-main mb-4 uppercase text-balance">
                                Engineering Systems Built for Business Impact
                            </h2>
                            <div className="text-text-muted text-xs sm:text-sm leading-relaxed space-y-3">
                                <p>
                                    I partner with businesses, startup founders, and engineering teams to ship{' '}
                                    <span className="text-text-main font-bold">production-ready web applications, AI-integrated platforms, and enterprise internal tools</span>{' '}
                                    using React, Next.js, Python FastAPI, Java Spring Boot, and Node.js.
                                </p>
                                <p>
                                    Alongside shipping client and industry software, I serve as an{' '}
                                    <span className="text-accent font-bold">Advanced Database and Network Technology educator</span>{' '}
                                    at STI College Fairview—keeping my fundamentals razor-sharp in relational data modeling, query optimization, ACID reliability, and systems architecture.
                                </p>
                                <p>
                                    Recognized as a{' '}
                                    <span className="text-accent font-bold">CodeFest Champion and National Finalist</span>, I turn complex operational bottlenecks into fast, maintainable software that delivers measurable ROI.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2.5 mt-6 pt-4 border-t border-border">
                            <a
                                href="/andrei_dilag_resume.pdf"
                                download="andrei_dilag_resume.pdf"
                                className="px-4 py-2.5 bg-accent text-primary font-bold text-xs border border-accent hover:bg-primary hover:text-accent text-center transition-none"
                            >
                                [ DOWNLOAD_RESUME.PDF ↓ ]
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2.5 bg-secondary text-text-main font-bold text-xs border border-border hover:bg-accent hover:text-primary hover:border-accent text-center transition-none"
                            >
                                [ CONNECT_LINKEDIN ↗ ]
                            </a>
                        </div>
                    </div>

                    {/* Right: Git Commit Log Experience Timeline */}
                    <div className="lg:col-span-7 border border-border bg-primary p-5 sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2 mb-5 text-xs">
                            <span className="text-accent font-bold">
                                root@andrei-dev:~# git log --graph --decorate --career
                            </span>
                            <span className="text-text-muted">[3 COMMITS]</span>
                        </div>

                        <div className="space-y-6">
                            {experience.map((item, index) => (
                                <div key={index} className="border border-border bg-secondary p-4">
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2 pb-2 border-b border-border">
                                        <div>
                                            <span className="text-accent font-bold">* commit {item.hash}</span>{' '}
                                            <span className="text-text-muted">({item.branch})</span>
                                        </div>
                                        <span className="px-2 py-0.5 bg-primary border border-accent text-accent text-[10px] font-bold uppercase">
                                            [{item.year}]
                                        </span>
                                    </div>

                                    <h4 className="text-sm sm:text-base font-bold text-text-main">
                                        {item.role}
                                    </h4>
                                    <div className="text-xs text-text-muted mt-0.5 mb-3">
                                        Author: {item.company} &lt;{item.highlight}&gt;
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

                {/* Services / What I Can Build Section */}
                <div id="services" className="pt-14 border-t border-border mt-12">
                    <div className="mb-8 border border-border bg-primary p-4 sm:p-6">
                        <div className="text-xs text-accent font-bold mb-1">
                            root@andrei-dev:/usr/bin/services# ./list_capabilities --business-outcomes
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-main uppercase text-balance">
                            04 // WHAT_I_CAN_BUILD_FOR_YOU (SERVICES)
                        </h2>
                        <p className="text-text-muted text-xs sm:text-sm mt-1 text-balance">
                            Translating modern full-stack engineering and AI into reliable systems that save time, reduce errors, and scale with your business.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                        {services.map((service, sIdx) => (
                            <div
                                key={sIdx}
                                className="bg-primary p-5 border border-border hover:border-accent flex flex-col"
                            >
                                <div className="flex-1 flex flex-col">
                                    <div className="min-h-[30px] mb-3 flex items-center justify-between gap-2 border-b border-border pb-2">
                                        <span className="text-[10px] font-mono text-accent font-bold truncate">
                                            [{service.stack}]
                                        </span>
                                        <span className="text-[10px] text-text-muted">MOD_0{sIdx + 1}</span>
                                    </div>
                                    <ServiceInteractivePreview index={sIdx} />
                                    <h3 className="text-base sm:text-lg font-bold text-text-main mb-2 uppercase text-balance">
                                        {service.title}
                                    </h3>
                                    <p className="text-text-muted text-xs leading-relaxed mb-4">
                                        {service.outcome}
                                    </p>
                                </div>
                                <ul className="space-y-1.5 pt-3 border-t border-border mt-auto text-xs">
                                    {service.deliverables.map((item, dIdx) => (
                                        <li key={dIdx} className="text-text-main flex items-center gap-2">
                                            <span className="text-accent font-bold">[x]</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills Section */}
                <div id="skills" className="pt-14 border-t border-border mt-14">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border border-border bg-primary p-4 sm:p-6">
                        <div>
                            <div className="text-xs text-accent font-bold mb-1">
                                root@andrei-dev:/proc/skills# cat competencies.conf
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-text-main uppercase text-balance">
                                CORE_COMPETENCIES &amp; SKILL_MATRIX
                            </h2>
                            <p className="text-text-muted text-xs sm:text-sm mt-1 text-balance">
                                Synthesizing strong academic fundamentals with modern enterprise and AI tooling.
                            </p>
                        </div>

                        {/* Retro Segmented Toggle */}
                        <div className="inline-flex flex-wrap sm:flex-nowrap w-fit max-w-full border border-accent bg-secondary">
                            <button
                                type="button"
                                onClick={() => setActiveTab('technical')}
                                className={`px-3.5 py-2 text-xs font-bold cursor-pointer transition-none whitespace-nowrap ${
                                    activeTab === 'technical'
                                        ? 'bg-accent text-primary'
                                        : 'bg-secondary text-text-main hover:bg-accent hover:text-primary'
                                }`}
                            >
                                [ 01. TECHNICAL_ARCH ]
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('programming')}
                                className={`px-3.5 py-2 text-xs font-bold border-l border-accent cursor-pointer transition-none whitespace-nowrap ${
                                    activeTab === 'programming'
                                        ? 'bg-accent text-primary'
                                        : 'bg-secondary text-text-main hover:bg-accent hover:text-primary'
                                }`}
                            >
                                [ 02. LANG_STACKS ]
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(activeTab === 'technical' ? technicalSkills : programmingSkills).map((category, catIndex) => (
                            <div
                                key={`${activeTab}-${catIndex}`}
                                className="bg-primary p-5 border border-border hover:border-accent"
                            >
                                <div className="flex items-center justify-between gap-2 border-b border-border pb-2 mb-3">
                                    <h4 className="text-xs font-bold text-accent uppercase truncate">
                                        {category.category}
                                    </h4>
                                    <span className="text-[10px] text-text-main shrink-0">
                                        {category.level}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {category.items.map((item, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="bg-secondary text-text-main text-[11px] px-2.5 py-1 border border-border hover:border-accent hover:bg-accent hover:text-primary transition-none cursor-default"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="mt-14 pt-14 border-t border-border">
                    <div className="mb-8 border border-border bg-primary p-4 sm:p-6">
                        <div className="text-xs text-accent font-bold mb-1">
                            root@andrei-dev:/var/log/accolades# grep &quot;UNLOCKED&quot;
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-main uppercase text-balance">
                            CERTIFICATIONS &amp; HACKATHON_ACCOLADES
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {certificates.map((cert, index) => (
                            <div
                                key={index}
                                className="bg-primary p-5 border border-border hover:border-accent flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-border text-[11px]">
                                        <span className="text-accent font-bold">[ACHIEVEMENT_0{index + 1}]</span>
                                        <span className="text-text-muted">[{cert.year}]</span>
                                    </div>
                                    <h4 className="text-base font-bold text-text-main mb-1 uppercase">
                                        {cert.title}
                                    </h4>
                                    <p className="text-accent text-xs font-bold uppercase mb-2">
                                        &gt; {cert.org}
                                    </p>
                                    <p className="text-text-muted text-xs leading-relaxed">
                                        {cert.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Spotlight Dithered Gallery */}
                <div className="mt-14 pt-14 border-t border-border">
                    <div className="mb-8 border border-border bg-primary p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="text-xs text-accent font-bold mb-1">
                                root@andrei-dev:/media/archives# ./view_dither_reel.sh
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-text-main uppercase text-balance">
                                SPOTLIGHT_ARCHIVE_GALLERY
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={prevSlide}
                                className="px-3 py-1.5 bg-secondary border border-accent text-accent hover:bg-accent hover:text-primary text-xs font-bold cursor-pointer transition-none"
                            >
                                [ &lt; PREV ]
                            </button>
                            <span className="text-xs text-text-main px-2">
                                0{currentSlide + 1} / 0{totalSlides}
                            </span>
                            <button
                                type="button"
                                onClick={nextSlide}
                                className="px-3 py-1.5 bg-secondary border border-accent text-accent hover:bg-accent hover:text-primary text-xs font-bold cursor-pointer transition-none"
                            >
                                [ NEXT &gt; ]
                            </button>
                        </div>
                    </div>

                    <div
                        className="max-w-4xl mx-auto border border-accent bg-primary"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="px-3 py-2 border-b border-border flex justify-between items-center text-xs">
                            <span className="text-accent font-bold">
                                [{spotlights[currentSlide].badge}]
                            </span>
                            <span className="text-text-muted">DITHER_SHADER: ACTIVE</span>
                        </div>

                        <div className="h-72 sm:h-105 dither-wrap flex items-center justify-center bg-primary border-b border-border">
                            <img
                                src={spotlights[currentSlide].image}
                                alt={spotlights[currentSlide].caption}
                                className="w-full h-full object-contain dither-img"
                                loading="lazy"
                            />
                        </div>

                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-secondary">
                            <p className="text-text-main font-bold text-xs sm:text-sm">
                                &gt; {spotlights[currentSlide].caption}
                            </p>
                            {spotlights[currentSlide].link && (
                                <a
                                    href={spotlights[currentSlide].link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary text-xs font-bold transition-none shrink-0 w-fit"
                                >
                                    [ VERIFY_POST ↗ ]
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
