import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaDownload, FaLinkedin } from 'react-icons/fa';

const AboutSection = () => {
    const skills = [
        { name: 'React', icon: <FaReact className="text-4xl text-blue-400" />, level: '90%' },
        { name: 'Node.js', icon: <FaNodeJs className="text-4xl text-green-500" />, level: '85%' },
        { name: 'MongoDB', icon: <FaDatabase className="text-4xl text-green-400" />, level: '80%' },
        { name: 'JavaScript', icon: <FaJsSquare className="text-4xl text-yellow-400" />, level: '95%' },
    ];

    const experience = [
        {
            year: '2025',
            role: 'Student Assistantship (MIS)',
            company: 'STI College Fairview',
            description: 'Technical troubleshooting, system maintenance, and presenting academic systems to evaluators.',
            details: [
                'Assisted in resolving technical issues and maintaining system functionality.',
                'Updated and managed student record databases.',
                'Helped demonstrate and present systems to judges during school events.',
                'Supported system management and troubleshooting tasks.'
            ]
        },
        {
            year: '2024',
            role: 'Student Assistantship (Admissions)',
            company: 'STI College Fairview',
            description: 'Administrative support, inquiry handling, and Oracle database management for enrollment.',
            details: [
                'Assisted prospective students and parents with inquiries about enrollment.',
                'Entered new enrollees’ information into Oracle database.',
                'Processed student enrollment and scanned documents for record-keeping.',
                'Provided front-line support to ensure smooth admissions operations.'
            ]
        }
    ];

    const certificates = [
        {
            title: 'Codefest National Entrant',
            year: '2024 - 2025',
            org: 'STI Education Services Group',
            description: 'Advanced to the national stage, completing a 32-hour mobile app development challenge against top STI branches.'
        },
        {
            title: 'Codefest Cluster Champion',
            year: '2024 - 2025',
            org: 'STI Education Services Group',
            description: 'Won the regional round, building a mobile app in a 6-hour development challenge among STI branches.'
        },
        {
            title: 'Codefest Local Champion',
            year: '2024 - 2025',
            org: 'STI Fairview',
            description: 'Recognized as branch champion after a 6-hour mobile app hackathon, earning the right to compete at cluster level.'
        },
        {
            title: 'SAP s/4HANA',
            year: '2025',
            org: 'STI College',
            description: 'Demonstrating knowledge in enterprise resource planning and business process integration.'
        },
        {
            title: 'Full Stack Web Development',
            year: '2022',
            org: 'Course Certification',
            description: 'Covering HTML, CSS, SASS, SQL, JS, and Node.js, gaining both front-end and back-end development experience.'
        }
    ];

    return (
        <section id="about" className="py-24 bg-secondary relative overflow-hidden">
            {/* Ambient Background Movement */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -180, 0],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                    {/* Left Column: Story & Experience */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Profile Summary</h2>
                            <div className="text-gray-300 text-lg leading-relaxed space-y-6 font-light">
                                <p>
                                    Currently completing a <span className="text-white font-medium">BSIT program at STI College Fairview</span> with specialized training in Java, C#, SQL, web, and mobile development.
                                </p>
                                <p>
                                    Recognized as a <span className="text-accent font-medium">CodeFest Local and Cluster Champion</span> in Mobile App Hackathons, with national-level participation demonstrating high-pressure problem-solving and technical agility.
                                </p>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/10"
                                >
                                    <FaDownload /> Download Resume
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 border border-gray-700 text-white font-medium rounded-lg hover:border-accent hover:text-accent transition-colors flex items-center gap-2"
                                >
                                    <FaLinkedin /> Connect
                                </a>
                            </div>
                        </motion.div>

                        {/* Experience Timeline */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Professional Experience</h3>
                            <div className="space-y-12 border-l border-gray-800 pl-8 relative">
                                {experience.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        viewport={{ once: true }}
                                        className="relative"
                                    >
                                        <div className="absolute -left-[39px] top-1 w-5 h-5 bg-accent rounded-full border-4 border-secondary"></div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-xl font-bold text-white">{item.role}</h4>
                                            <span className="text-accent text-xs font-bold tracking-widest bg-accent/10 px-3 py-1 rounded-full">{item.year}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4 font-medium">{item.company}</p>
                                        <ul className="space-y-2">
                                            {item.details.map((detail, dIndex) => (
                                                <li key={dIndex} className="text-gray-500 font-light flex gap-2">
                                                    <span className="text-accent">•</span>
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Skills */}
                    <div>
                        <div className="sticky top-24">
                            <h3 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Core Competencies</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-primary/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800 hover:border-accent/30 transition-all group"
                                    >
                                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">{skill.icon}</div>
                                        <h4 className="text-xl font-semibold text-white mb-3">{skill.name}</h4>
                                        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: skill.level }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="bg-accent h-full rounded-full"
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional Skills/Tags */}
                            <div className="mt-12">
                                <h4 className="text-lg font-semibold text-white mb-6">Development Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Java', 'C#', 'SQL', 'Oracle DB', 'Express.js', 'Tailwind CSS', 'Framer Motion', 'REST APIs'].map((tag, i) => (
                                        <span key={i} className="px-4 py-2 bg-primary/40 border border-gray-800 rounded-xl text-gray-400 text-sm hover:border-accent/40 hover:text-white transition-all cursor-default font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificates Section */}
                <div className="mt-24 pt-24 border-t border-gray-800">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Certifications & Achievements</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">Recognition for excellence in hackathons and technical coursework.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-primary/30 backdrop-blur-md p-8 rounded-[2rem] border border-gray-800/50 hover:border-accent/40 transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-gray-800/50 px-3 py-1 rounded-full">{cert.year}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2 leading-tight">{cert.title}</h4>
                                    <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">{cert.org}</p>
                                    <p className="text-gray-500 text-sm font-light leading-relaxed">{cert.description}</p>
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
