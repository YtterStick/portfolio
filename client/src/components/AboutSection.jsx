import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaDownload, FaLinkedin, FaJava } from 'react-icons/fa';
import { SiExpress, SiTailwindcss, SiMongodb, SiOracle } from 'react-icons/si';
import resumePdf from '../assets/resume.pdf';

const AboutSection = () => {
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
            role: 'IT Support Specialist — Management Information System',
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
            description: 'Comprehensive coursework covering HTML, CSS, SASS, SQL, JavaScript, and Node.js across the full stack.'
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pt-20 border-t border-border">
                    {/* Technical Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold text-white mb-8 border-b border-border pb-4">Technical Skills</h3>
                        <div className="space-y-5">
                            {technicalSkills.map((category, catIndex) => (
                                <div key={catIndex} className="bg-primary/60 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-accent/30 transition-colors duration-300">
                                    <h4 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">{category.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((item, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="bg-secondary text-text-muted text-xs px-3 py-1.5 rounded-lg border border-border/50 font-medium"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Programming Skills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold text-white mb-8 border-b border-border pb-4">Programming Skills</h3>
                        <div className="space-y-5">
                            {programmingSkills.map((category, catIndex) => (
                                <div key={catIndex} className="bg-primary/60 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-accent/30 transition-colors duration-300">
                                    <h4 className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">{category.category}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {category.items.map((item, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="bg-secondary text-text-muted text-xs px-3 py-1.5 rounded-lg border border-border/50 font-medium"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
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
                                className="bg-primary/40 backdrop-blur-sm p-8 rounded-xl border border-border hover:border-accent/30 transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-text-muted bg-surface px-3 py-1 rounded-full">{cert.year}</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2 leading-tight">{cert.title}</h4>
                                    <p className="text-accent text-xs font-semibold uppercase tracking-[0.15em] mb-4">{cert.org}</p>
                                    <p className="text-text-muted/70 text-sm font-light leading-relaxed">{cert.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
