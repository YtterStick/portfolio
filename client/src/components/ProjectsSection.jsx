import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useScroll } from '../context/ScrollContext';
import axios from 'axios';
import { projectsData } from '../data/projects';

const ProjectCard = ({ project, index, setSelectedProject }) => {
    return (
        <motion.div
            layoutId={`project-${project._id}`}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-secondary rounded-xl overflow-hidden border border-border hover:border-accent/40 transition-all duration-300 group cursor-pointer h-full flex flex-col"
            onClick={() => setSelectedProject(project)}
        >
            <div className="relative overflow-hidden h-56">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <span className="text-accent text-[10px] font-semibold tracking-[0.15em] uppercase mb-1 block">{project.category}</span>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                </div>
            </div>
            <div className="p-6 grow flex flex-col justify-between">
                <div>
                    <p className="text-text-muted text-sm line-clamp-3 mb-4 leading-relaxed font-light">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, i) => (
                            <span key={i} className="text-xs bg-primary/80 text-text-muted px-3 py-1 rounded-md border border-border">{tech}</span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
                    <span className="text-sm text-white group-hover:text-accent font-medium transition-colors duration-300 flex items-center gap-2">
                        View Details <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                    <div className="flex gap-3">
                        <a href={project.githubLink} className="text-text-muted hover:text-white transition-colors duration-300" key="github" onClick={(e) => e.stopPropagation()} aria-label="GitHub">
                            <FaGithub size={16} />
                        </a>
                        <a href={project.liveLink} className="text-text-muted hover:text-white transition-colors duration-300" key="live" onClick={(e) => e.stopPropagation()} aria-label="Live Demo">
                            <FaExternalLinkAlt size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const [projects, setProjects] = useState(projectsData);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const { lenis } = useScroll();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get('/api/projects');
                if (data && data.length > 0) {
                    setProjects(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects, using local data:', error);
                setProjects(projectsData);
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProject) {
            lenis?.stop();
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            lenis?.start();
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };
    }, [selectedProject, lenis]);

    return (
        <section id="projects" className={`py-28 bg-primary relative transition-all duration-300 ${selectedProject ? 'z-50' : ''}`}>
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight">Selected Work</h2>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg font-light">
                        Real-world applications built with modern technologies and a focus on user experience.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={project._id} project={project} index={index} setSelectedProject={setSelectedProject} />
                    ))}
                </div>

            </div>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="bg-secondary w-full max-w-4xl rounded-xl overflow-hidden border border-border max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                                data-lenis-prevent
                            >
                                <div className="relative h-64 md:h-80">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-lg p-2 transition-colors duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-8 md:p-10">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-white mb-2">{selectedProject.title}</h3>
                                            <span className="text-accent font-medium text-sm">{selectedProject.category}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-primary border border-border rounded-lg hover:border-accent/50 transition-colors duration-300 text-white text-sm"
                                            >
                                                <FaGithub /> Code
                                            </a>
                                            <a
                                                href={selectedProject.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-semibold rounded-lg hover:bg-accent-hover transition-colors duration-300 text-sm"
                                            >
                                                <FaExternalLinkAlt /> Live Demo
                                            </a>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-3">About the Project</h4>
                                            <p className="text-text-muted leading-relaxed">{selectedProject.description}</p>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map((tech, i) => (
                                                    <span key={i} className="px-4 py-2 bg-primary/60 text-accent text-sm rounded-lg border border-accent/20">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section >
    );
};

export default ProjectsSection;
