import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaDownload, 
    FaLinkedin, 
    FaChevronLeft, 
    FaChevronRight, 
    FaExternalLinkAlt
} from 'react-icons/fa';

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState('technical');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const spotlights = [
        {
            image: '/codefest-champ.jpg',
            caption: 'STI Tagisan ng Talino: Codefest Cluster Champion',
            badge: 'Cluster Champion',
            link: 'https://www.facebook.com/photo/?fbid=1129894329173285&set=pcb.1129900962505955'
        },
        {
            image: '/codefest-national-award.jpg',
            caption: 'STI Tagisan ng Talino: National Finalist Stage Award Ceremony',
            badge: 'National Finalist',
            link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
        },
        {
            image: '/codefest-champion-again.jpg',
            caption: 'Codefest National Entrant Team',
            badge: 'National Stage',
            link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
        },
        {
            image: '/recognition-andrei.jpg',
            caption: 'Meet Our Coding Champ: BSIT Student Feature',
            badge: 'Campus Feature',
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

    // Auto-slide by default every 4.5 seconds (pauses when hovered/dragged)
    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(nextSlide, 4500);
        return () => clearInterval(timer);
    }, [nextSlide, isHovered]);

    // Allow user to move / swipe the image freely
    const handleDragEnd = (event, info) => {
        const threshold = 40;
        const velocityThreshold = 180;

        if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
            nextSlide();
        } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
            prevSlide();
        }
    };

    const technicalSkills = [
        {
            category: 'AI & Large Language Models',
            items: ['Generative AI (GenAI)', 'LLM Prompt Engineering', 'Multimodal AI', 'Semantic Routing', 'Fine-Tuning', 'n8n Workflow Automation', 'Microsoft Copilot Studio', 'Agent 365']
        },
        {
            category: 'Advance Database & Data Engineering',
            items: ['Relational Data Modeling', 'Complex SQL & Indexing', 'PostgreSQL / Supabase', 'MySQL', 'MongoDB', 'ACID Transactions', 'Query Optimization', 'Stored Procedures & Triggers', 'Data Normalization']
        },
        {
            category: 'Network Technology & Infrastructure',
            items: ['Enterprise Routing & Switching', 'VLAN Configuration', 'IPv4/IPv6 Subnetting', 'TCP/IP Protocol Suite', 'Network Troubleshooting', 'Packet Inspection', 'Network Security Policies']
        },
        {
            category: 'Backend & Systems Architecture',
            items: ['Python FastAPI', 'Java Spring Boot', 'Node.js / Express', 'RESTful APIs', 'OpenCV (OMR & CV)', 'Authentication (JWT / RBAC)', 'End-to-End System Design']
        },
        {
            category: 'Frontend & UI Engineering',
            items: ['React Vite', 'Next.js 14', 'Tailwind CSS', 'Framer Motion', 'JavaScript (ES6+)', 'TypeScript', 'Responsive Design', 'SASS / SCSS']
        },
        {
            category: 'DevOps & Enterprise Tools',
            items: ['Git & GitHub', 'CI/CD Pipelines', 'Docker', 'Google Cloud / Drive APIs', 'SAP S/4HANA', 'Agile / Scrum']
        }
    ];

    const programmingSkills = [
        {
            category: 'Python',
            items: ['FastAPI', 'OpenCV (Computer Vision)', 'NumPy', 'Automation Scripts', 'AsyncIO', 'Data Parsing']
        },
        {
            category: 'Java',
            items: ['Spring Boot', 'Spring Data JPA', 'Hibernate', 'Maven', 'Gradle', 'Java Swing']
        },
        {
            category: 'JavaScript & TypeScript',
            items: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'ES6+ Syntax', 'DOM & Canvas APIs']
        },
        {
            category: 'Database Query Languages',
            items: ['SQL (PostgreSQL, MySQL)', 'Mongoose / MongoDB Aggregations', 'Database Indexing', 'Schema Migration']
        },
        {
            category: 'C# & .NET',
            items: ['ASP.NET Core', 'Entity Framework', 'OOP Architecture', 'System Integration']
        },
        {
            category: 'PHP',
            items: ['Laravel', 'Server-Side Scripting', 'REST API Construction', 'Composer']
        }
    ];

    const experience = [
        {
            year: '2025 – Present',
            role: 'Faculty Teacher — Advance Database & Network Technology 2',
            company: 'STI College Fairview',
            highlight: 'Educator & Curriculum Mentor',
            description: 'Instructing and mentoring IT college students in advanced database engineering, complex SQL architectures, and enterprise computer networking.',
            details: [
                'Instructed Advance Database coursework covering relational data modeling, query optimization, indexing, ACID transactions, normalization, and stored procedures.',
                'Facilitated Network Technology 2 hands-on labs focusing on enterprise routing & switching, VLANs, subnetting, TCP/IP protocols, and network troubleshooting.',
                'Designed practical hands-on assessments, real-world coding challenges, and guided student capstone architectures.',
                'Fostered high-standard coding ethics, industry-grade database schema design, and technical problem-solving capabilities.'
            ]
        },
        {
            year: '2026',
            role: 'Software Developer — NLP Business Development Services',
            company: '3 AM Digital Media',
            highlight: 'AI Integration & Backend APIs',
            description: 'Developed and optimized software solutions focusing on NLP-driven business development.',
            details: [
                'Contributed to the design and implementation of backend systems and APIs.',
                'Assisted in integrating AI models into business applications.',
                'Collaborated with a cross-functional team to deliver scalable software solutions.',
                'Applied modern development practices to ensure code quality and performance.'
            ]
        },
        {
            year: '2024',
            role: 'Student Assistant — Management Information System',
            company: 'STI College Fairview',
            highlight: 'Infrastructure & Support',
            description: 'Technical troubleshooting, system maintenance, and supporting academic systems.',
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
        <section id="about" className="py-16 sm:py-28 bg-secondary relative overflow-hidden">
            {/* Subtle ambient background — GPU radial gradient with 0 blur overhead */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.08]">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-[radial-gradient(circle,rgba(99,102,241,0.5)_0%,transparent_70%)]" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(99,102,241,0.4)_0%,transparent_70%)]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Top Row: About Story & Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-14 sm:mb-20">
                    {/* About Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-4">
                            <span>About Me</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 sm:mb-8 tracking-tight">
                            Full-Stack Developer
                        </h2>
                        <div className="text-text-muted text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-5 font-light">
                            <p>
                                I am a <span className="text-white font-medium">Full-Stack Developer and Educator</span>. While I teach Advance Database and Network Technology at STI College Fairview, <span className="text-accent font-medium">software development is my true passion and primary goal</span>.
                            </p>
                            <p>
                                I specialize in building complete, production-ready web applications and AI-integrated platforms using <span className="text-white font-medium">React, Next.js, Python FastAPI, Java Spring Boot, and Node.js</span>—focusing on clean architecture, high speed, and intuitive UX.
                            </p>
                            <p>
                                Recognized as a <span className="text-accent font-medium">CodeFest Champion and National Finalist</span>, I thrive on turning complex problems into scalable digital systems like Evalo and enterprise software tools.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
                            <a
                                href="/andrei_dilag_resume.pdf"
                                download="andrei_dilag_resume.pdf"
                                className="w-full sm:w-auto px-6 py-3.5 sm:py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-white/10 text-sm"
                            >
                                <FaDownload /> Download Resume
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-6 py-3.5 sm:py-3 border border-border/80 text-white font-medium rounded-xl hover:border-accent hover:text-accent transition-colors duration-300 flex items-center justify-center gap-2 text-sm"
                            >
                                <FaLinkedin /> Connect on LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    {/* Experience Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold text-white mb-8 border-b border-border/60 pb-4 flex items-center justify-between">
                            <span>Professional Experience</span>
                            <span className="text-xs font-normal text-text-muted">Education & Industry</span>
                        </h3>
                        <div className="space-y-10 border-l border-border/80 pl-7 relative mt-8">
                            {experience.map((item, index) => (
                                <div key={index} className="relative group">
                                    <div className="absolute -left-8.75 top-1.5 w-4 h-4 bg-accent rounded-full border-4 border-secondary group-hover:scale-125 transition-transform duration-300 shadow-md shadow-accent/40" />
                                    
                                    <div className="flex flex-wrap justify-between items-start mb-1 gap-2">
                                        <h4 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                                            {item.role}
                                        </h4>
                                        <span className="text-accent text-[11px] font-semibold tracking-wider uppercase bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap border border-accent/20">
                                            {item.year}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 mb-3">
                                        <p className="text-text-muted text-sm font-medium">{item.company}</p>
                                        {item.highlight && (
                                            <span className="text-[10px] text-text-muted/60 bg-primary/60 px-2 py-0.5 rounded border border-border/40">
                                                {item.highlight}
                                            </span>
                                        )}
                                    </div>

                                    <ul className="space-y-2 mt-3">
                                        {item.details.map((detail, dIndex) => (
                                            <li key={dIndex} className="text-text-muted/80 font-light flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                                                <span className="text-accent mt-1 shrink-0">•</span>
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Skills Section */}
                <div className="pt-14 sm:pt-20 border-t border-border/60 mt-12 sm:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-10 sm:mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3 sm:mb-4">Core Competencies & Skills</h2>
                        <p className="text-text-muted max-w-xl mx-auto text-xs sm:text-base font-light px-2">
                            Synthesizing strong academic fundamentals with modern enterprise and AI tooling.
                        </p>
                        
                        {/* Tab Buttons: Responsive Segmented Control */}
                        <div className="flex justify-center mt-6 sm:mt-8">
                            <div className="inline-flex p-1 bg-primary/70 border border-border/60 rounded-xl sm:rounded-full w-full sm:w-auto max-w-md">
                                <button 
                                    onClick={() => setActiveTab('technical')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-300 text-center ${
                                        activeTab === 'technical' 
                                            ? 'bg-accent text-white shadow-lg shadow-accent/30' 
                                            : 'text-text-muted hover:text-white'
                                    }`}
                                >
                                    <span className="sm:hidden">Technical Skills</span>
                                    <span className="hidden sm:inline">Technical & Architectural Skills</span>
                                </button>
                                <button 
                                    onClick={() => setActiveTab('programming')}
                                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-300 text-center ${
                                        activeTab === 'programming' 
                                            ? 'bg-accent text-white shadow-lg shadow-accent/30' 
                                            : 'text-text-muted hover:text-white'
                                    }`}
                                >
                                    <span className="sm:hidden">Languages & Stacks</span>
                                    <span className="hidden sm:inline">Programming Languages & Frameworks</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Tab Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {(activeTab === 'technical' ? technicalSkills : programmingSkills).map((category, catIndex) => (
                            <motion.div 
                                key={`${activeTab}-${catIndex}`}
                                initial={{ opacity: 0, scale: 0.96 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: catIndex * 0.04 }}
                                className="group bg-primary/40 backdrop-blur-md p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-border/50 hover:border-accent/50 hover:bg-primary/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                
                                <h4 className="text-xs font-semibold text-accent tracking-widest uppercase mb-3 sm:mb-4 relative z-10">
                                    {category.category}
                                </h4>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 relative z-10 pt-1">
                                    {category.items.map((item, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="bg-secondary/90 text-text-muted text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-border/40 font-medium hover:bg-accent/15 hover:text-white hover:border-accent/40 transition-all duration-200 cursor-default"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="mt-28 pt-24 border-t border-border/60">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif font-bold text-white mb-4">Certifications & Accolades</h2>
                        <p className="text-text-muted max-w-2xl mx-auto font-light">
                            Recognition for competitive hackathon triumphs and enterprise certifications.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: index * 0.07 }}
                                viewport={{ once: true }}
                                className="group bg-primary/40 backdrop-blur-md p-7 rounded-2xl border border-border/50 hover:border-accent/50 hover:bg-primary/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
                            >
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-5">
                                        <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-400">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted bg-secondary/90 px-3 py-1 rounded-full border border-border/30">
                                            {cert.year}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-1.5 leading-snug">
                                        {cert.title}
                                    </h4>
                                    <p className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">
                                        {cert.org}
                                    </p>
                                    <p className="text-text-muted/80 text-xs sm:text-sm font-light leading-relaxed">
                                        {cert.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Spotlight Gallery Section: Fast, Auto-slides by default, Movable on Drag */}
                <div className="mt-16 sm:mt-28 pt-14 sm:pt-24 border-t border-border/60">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 sm:mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3">
                            <span>Achievements Showcase</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">Spotlight Gallery</h2>
                        <p className="text-text-muted max-w-2xl mx-auto text-xs sm:text-base font-light px-2">
                            Moments captured from championship hackathons and academic recognitions.
                        </p>
                    </motion.div>

                    {/* Fast, Clean Carousel Container */}
                    <div 
                        className="relative max-w-4xl mx-auto"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Image Viewer Stage with Natural Drag & Move */}
                        <div className="overflow-hidden rounded-2xl border border-border/70 bg-primary/80 relative shadow-2xl h-72 sm:h-110 lg:h-125 select-none flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.4}
                                    onDragEnd={handleDragEnd}
                                    className="w-full h-full relative flex items-center justify-center cursor-grab active:cursor-grabbing"
                                >
                                    <img
                                        src={spotlights[currentSlide].image}
                                        alt={spotlights[currentSlide].caption}
                                        className="w-full h-full object-contain pointer-events-none drop-shadow-lg"
                                        draggable="false"
                                        loading="lazy"
                                    />

                                    {/* Caption Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 bg-linear-to-t from-primary via-primary/85 to-transparent pointer-events-none z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                                        <div>
                                            <span className="text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase text-accent bg-accent/15 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-accent/25 inline-block mb-1 sm:mb-2">
                                                {spotlights[currentSlide].badge}
                                            </span>
                                            <p className="text-white font-semibold text-sm sm:text-xl leading-snug drop-shadow-md line-clamp-2 sm:line-clamp-none">
                                                {spotlights[currentSlide].caption}
                                            </p>
                                        </div>
                                        {spotlights[currentSlide].link && (
                                            <a
                                                href={spotlights[currentSlide].link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pointer-events-auto shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-secondary/90 hover:bg-accent border border-border/60 hover:border-accent text-white text-xs font-medium transition-all duration-300 flex items-center gap-1.5 sm:gap-2 shadow-md w-fit"
                                            >
                                                Verify Post <FaExternalLinkAlt size={10} />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Floating Left & Right Chevrons */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-accent text-white border border-white/10 hover:border-accent/40 flex items-center justify-center transition-all duration-300 z-20 shadow-xl cursor-pointer"
                                aria-label="Previous Slide"
                            >
                                <FaChevronLeft size={14} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-accent text-white border border-white/10 hover:border-accent/40 flex items-center justify-center transition-all duration-300 z-20 shadow-xl cursor-pointer"
                                aria-label="Next Slide"
                            >
                                <FaChevronRight size={14} />
                            </button>
                        </div>

                        {/* Thumbnail Indicators */}
                        <div className="flex justify-center items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
                            {spotlights.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`relative rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                                        index === currentSlide
                                            ? 'ring-2 ring-accent scale-105 shadow-lg shadow-accent/30 opacity-100 w-14 sm:w-20 h-10 sm:h-14'
                                            : 'opacity-40 hover:opacity-80 w-10 sm:w-16 h-8 sm:h-12 border border-border/60'
                                    }`}
                                    aria-label={`Jump to slide ${index + 1}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.caption}
                                        className="w-full h-full object-cover"
                                    />
                                    {index === currentSlide && (
                                        <div className="absolute inset-0 bg-accent/20" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
