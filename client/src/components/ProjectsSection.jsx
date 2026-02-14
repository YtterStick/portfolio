import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useScroll } from '../context/ScrollContext';
import axios from 'axios';
import { projectsData } from '../data/projects';

const ProjectCard = ({ project, index, setSelectedProject }) => {
    return (
        <motion.div
            layoutId={`project-${project._id}`}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-secondary rounded-2xl overflow-hidden shadow-xl border border-gray-800 hover:border-accent/50 transition-colors duration-300 group cursor-pointer h-full flex flex-col"
            onClick={() => setSelectedProject(project)}
        >
            <div className="relative overflow-hidden h-64">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <span className="text-accent text-xs font-bold tracking-widest uppercase mb-1 block">{project.category}</span>
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <p className="text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, i) => (
                            <span key={i} className="text-xs bg-primary text-gray-300 px-3 py-1 rounded-md border border-gray-700/50">{tech}</span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-800/50 mt-auto">
                    <span className="text-sm text-white group-hover:text-accent font-medium transition-colors flex items-center gap-2">
                        View Case Study <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                    <div className="flex gap-3">
                        <a href={project.githubLink} className="text-gray-500 hover:text-white transition-colors" key="github" onClick={(e) => e.stopPropagation()} aria-label="GitHub">
                            <FaGithub size={18} />
                        </a>
                        <a href={project.liveLink} className="text-gray-500 hover:text-white transition-colors" key="live" onClick={(e) => e.stopPropagation()} aria-label="Live Demo">
                            <FaExternalLinkAlt size={16} />
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
                const { data } = await axios.get('http://localhost:5000/api/projects');
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
        <section id="projects" className="py-24 bg-primary relative">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Featured Projects</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Selected works that demonstrate my technical capabilities and passion for problem-solving.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={project._id} project={project} index={index} setSelectedProject={setSelectedProject} />
                    ))}
                </div>

            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            layoutId={`project-${selectedProject._id}`}
                            className="bg-secondary w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                            data-lenis-prevent // Add this to prevent Lenis from hijacking scroll inside modal
                        >
                            <div className="relative h-64 md:h-96">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-8 md:p-10">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                                        <span className="text-accent font-medium">{selectedProject.category}</span>
                                    </div>
                                    <div className="flex gap-4">
                                        <a
                                            href={selectedProject.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 bg-primary border border-gray-700 rounded-lg hover:border-white transition-colors text-white"
                                        >
                                            <FaGithub /> Code
                                        </a>
                                        <a
                                            href={selectedProject.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-bold rounded-lg hover:bg-accent-hover transition-colors"
                                        >
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-3">About the Project</h4>
                                        <p className="text-gray-300 leading-relaxed text-lg">{selectedProject.description}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-3">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {selectedProject.techStack.map((tech, i) => (
                                                <span key={i} className="px-4 py-2 bg-primary/50 text-accent rounded-lg border border-accent/20">
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
            </AnimatePresence>
        </section >
    );
};

export default ProjectsSection;
