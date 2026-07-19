import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaDownload, FaLinkedin, FaJava } from 'react-icons/fa';
import { SiExpress, SiTailwindcss, SiMongodb, SiOracle } from 'react-icons/si';
import resumePdf from '../assets/resume.pdf';

const AboutSection = () => {
    const [activeTab, setActiveTab] = useState('technical');
    const [currentSlide, setCurrentSlide] = useState(0);

    const totalSlides = 3;

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, []);

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const technicalSkills = [
        {
            category: 'AI & Large Language Models',
            items: ['Generative AI (GenAI)', 'Foundation Models', 'LLMs', 'Multimodal AI', 'Fine-Tuning', 'Prompt Engineering', 'Semantic Routing', 'n8n', 'Microsoft Copilot Studio', 'Agent 365', 'Bedrock Agentcore']
        },
        {
            category: 'Backend Development',
            items: ['Java', 'Spring Boot', 'Node.js', 'Python', 'FastAPI', 'RESTful APIs', 'End-to-End (n2n) Architecture']
        },
        {
            category: 'Frontend, Mobile & UI',
            items: ['React Vite', 'Next.js', 'AJAX', 'SASS / SCSS', 'Tailwind CSS', 'JavaScript (ES6+)', 'TypeScript', 'HTML5/CSS3', 'Android Studio', 'Java Swing']
        },
        {
            category: 'Data Modeling & Architecture',
            items: ['SQL', 'Database Management', 'Data Warehousing', 'Data Mapping', 'Data Models']
        },
        {
            category: 'DevOps & Tools',
            items: ['Git', 'GitHub', 'CI/CD Pipelines', 'Docker', 'Enterprise Systems (SAP S/4HANA)', 'Agile/Scrum', 'System Logic Optimization']
        },
        {
            category: 'IT Support & MIS',
            items: ['Technical Troubleshooting', 'Server Management', 'Hardware Maintenance', 'System Diagnostics', 'Network Support', 'User Assistance']
        }
    ];

    const programmingSkills = [
        {
            category: 'Java',
            items: ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Maven', 'Gradle', 'Java Swing']
        },
        {
            category: 'Web Languages',
            items: ['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'HTML5', 'CSS3', 'SASS / SCSS', 'AJAX', 'Tailwind CSS']
        },
        {
            category: 'Mobile Development',
            items: ['Android Studio', 'Kotlin', 'Java (Mobile)', 'XML', 'Gradle', 'Flutter']
        },
        {
            category: '.NET & C#',
            items: ['ASP.NET Core', 'Entity Framework', 'OOP', 'System Integration']
        },
        {
            category: 'PHP',
            items: ['Laravel', 'Server-side scripting', 'RESTful API Construction', 'Composer']
        },
        {
            category: 'Python',
            items: ['Automation scripts', 'Data Parsing', 'Flask']
        }
    ];

    const experience = [
        {
            year: '2026',
            role: 'Software Developer — NLP Business Development Services',
            company: '3 AM Digital Media',
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
            year: '2023',
            org: 'STI College Fairview',
            description: 'Assisted in campus IT operations, maintaining systems, and supporting institutional assessments.'
        },
        {
            title: 'Student Assistantship',
            year: '2024',
            org: 'STI College Fairview',
            description: 'Provided technical support, troubleshooting, and system management assistance for the campus.'
        }
    ];

    const spotlights = [
        {
            image: '/codefest-champ.jpg',
            caption: 'STI Tagisan ng Talino: Codefest Cluster Champion',
            colSpan: 'md:col-span-2',
            link: 'https://www.facebook.com/photo/?fbid=1129894329173285&set=pcb.1129900962505955'
        },
        {
            image: '/codefest-champion-again.jpg',
            caption: 'Codefest National Entrant',
            colSpan: 'md:col-span-1',
            link: 'https://www.facebook.com/photo?fbid=468410408855890&set=pcb.468410498855881'
        },
        {
            image: '/recognition-andrei.jpg',
            caption: 'Meet Our Coding Champ: BSIT Student Feature',
            colSpan: 'md:col-span-3',
            link: 'https://www.facebook.com/fairview.sti.edu/posts/-meet-%F0%9D%90%80%F0%9D%90%A7%F0%9D%90%9D%F0%9D%90%AB%F0%9D%90%9E%F0%9D%90%A2-%F0%9D%90%83%F0%9D%90%A2%F0%9D%90%A5%F0%9D%90%9A%F0%9D%90%A0-our-coding-champ-and-2nd-year-bs-in-information-technology-st/892945256201528/'
        }
    ];

    return (
        <section id="about" className="py-28 bg-secondary relative overflow-hidden">
            {/* Subtle ambient background */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.08]">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/30 rounded-full blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Top Row: About Story & Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
                    {/* About Story */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 tracking-tight">About</h2>
                        <div className="text-text-muted text-lg leading-relaxed space-y-5 font-light">
                            <p>
                                Full-stack developer with a background in <span className="text-white font-medium">Information Technology</span> and specialized training in Java, C#, SQL, web, and mobile development.
                            </p>
                            <p>
                                Recognized as a <span className="text-accent font-medium">CodeFest Local and Cluster Champion</span> in Mobile App Hackathons, with national-level participation demonstrating high-pressure problem-solving and technical agility.
                            </p>
                        </div>

                        <div className="flex gap-4 mt-12">
                            <a
                                href={resumePdf}
                                download="Andrei_Dilag_Resume.pdf"
                                className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 flex items-center gap-2"
                            >
                                <FaDownload /> Download Resume
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 border border-border text-white font-medium rounded-lg hover:border-accent hover:text-accent transition-colors duration-300 flex items-center gap-2"
                            >
                                <FaLinkedin /> Connect
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
                        <h3 className="text-2xl font-semibold text-white mb-8 border-b border-border pb-4">Professional Experience</h3>
                        <div className="space-y-12 border-l border-border pl-8 relative mt-12">
                            {experience.map((item, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute -left-[39px] top-1 w-5 h-5 bg-accent rounded-full border-4 border-secondary"></div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-lg font-semibold text-white">{item.role}</h4>
                                        <span className="text-accent text-[10px] font-semibold tracking-widest uppercase bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">{item.year}</span>
                                    </div>
                                    <p className="text-text-muted text-sm mb-4 font-medium">{item.company}</p>
                                    <ul className="space-y-2">
                                        {item.details.map((detail, dIndex) => (
                                            <li key={dIndex} className="text-text-muted/70 font-light flex gap-2 text-sm leading-relaxed">
                                                <span className="text-accent mt-1">•</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Row: Skills */}
                <div className="pt-20 border-t border-border mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-serif font-bold text-white mb-8">Skills</h2>
                        
                        {/* Tab Buttons */}
                        <div className="flex justify-center gap-4 mb-12">
                            <button 
                                onClick={() => setActiveTab('technical')}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'technical' ? 'bg-accent text-white shadow-[0_0_15px_rgba(var(--color-accent),0.4)]' : 'bg-primary/40 text-text-muted hover:text-white border border-border/50 hover:border-accent/50'}`}
                            >
                                Technical Skills
                            </button>
                            <button 
                                onClick={() => setActiveTab('programming')}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === 'programming' ? 'bg-accent text-white shadow-[0_0_15px_rgba(var(--color-accent),0.4)]' : 'bg-primary/40 text-text-muted hover:text-white border border-border/50 hover:border-accent/50'}`}
                            >
                                Programming Skills
                            </button>
                        </div>
                    </motion.div>

                    {/* Tab Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(activeTab === 'technical' ? technicalSkills : programmingSkills).map((category, catIndex) => (
                            <motion.div 
                                key={`${activeTab}-${catIndex}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: catIndex * 0.05 }}
                                className="group bg-primary/40 backdrop-blur-md p-6 rounded-xl border border-border/50 hover:border-accent/50 hover:bg-primary/60 hover:shadow-[0_0_30px_rgba(var(--color-accent),0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Subtle hover gradient glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                
                                <h4 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4 relative z-10">{category.category}</h4>
                                <div className="flex flex-wrap gap-2 relative z-10 pt-2">
                                    {category.items.map((item, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="bg-secondary/80 text-text-muted text-xs px-3 py-1.5 rounded-lg border border-border/30 font-medium hover:bg-accent/10 hover:text-accent hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default shadow-sm"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certificates Section */}
                <div className="mt-28 pt-28 border-t border-border">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif font-bold text-white mb-4">Certifications & Achievements</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">Recognition for excellence in competitive development and technical coursework.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                viewport={{ once: true }}
                                className="group bg-primary/40 backdrop-blur-md p-8 rounded-xl border border-border/50 hover:border-accent/50 hover:bg-primary/60 hover:shadow-[0_0_30px_rgba(var(--color-accent),0.1)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            >
                                {/* Subtle hover gradient glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted bg-secondary/80 px-3 py-1 rounded-full border border-border/30">{cert.year}</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2 leading-tight">{cert.title}</h4>
                                    <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em] mb-4">{cert.org}</p>
                                    <p className="text-text-muted/70 text-sm font-light leading-relaxed">{cert.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Spotlight Gallery Section */}
                <div className="mt-28 pt-28 border-t border-border">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-serif font-bold text-white mb-4">Spotlight Gallery</h2>
                        <p className="text-text-muted max-w-2xl mx-auto">Moments captured during hackathons and technical competitions.</p>
                    </motion.div>

                    {/* Carousel */}
                    <div className="relative max-w-3xl mx-auto">
                        <div className="overflow-hidden rounded-xl border border-border/50 bg-primary/60">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="relative group h-[400px]"
                                >
                                    <a href={spotlights[currentSlide].link} target="_blank" rel="noopener noreferrer" className="block h-full">
                                        <img
                                            src={spotlights[currentSlide].image}
                                            alt={spotlights[currentSlide].caption}
                                            className="w-full h-full object-contain"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-0 left-0 right-0 p-8">
                                            <p className="text-white font-semibold text-xl leading-tight">{spotlights[currentSlide].caption}</p>
                                        </div>
                                    </a>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Prev / Next Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/60 border border-border/50 hover:bg-accent hover:border-accent text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-[-50px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary/60 border border-border/50 hover:bg-accent hover:border-accent text-white flex items-center justify-center transition-all duration-300 backdrop-blur-md"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>

                        {/* Dot Indicators */}
                        <div className="flex justify-center gap-3 mt-6">
                            {spotlights.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-accent w-8 shadow-[0_0_10px_rgba(var(--color-accent),0.5)]' : 'bg-border/50 hover:bg-text-muted'}`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
