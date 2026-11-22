import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { useScroll } from '../context/ScrollContext';
import axios from 'axios';
import { projectsData } from '../data/projects';

const getDomainLabel = (liveLink, title) => {
    if (!liveLink || liveLink === '#') return `${title.toLowerCase().replace(/\s+/g, '-')}.app`;
    try {
        const host = new URL(liveLink).hostname.replace(/^www\./, '');
        if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
            return 'hr-tna-payroll.internal';
        }
        return host;
    } catch {
        return `${title.toLowerCase().replace(/\s+/g, '-')}.app`;
    }
};

const BrowserTopBar = ({ domain }) => (
    <div className="flex items-center justify-between px-3.5 py-2 bg-[#0d0d14] border-b border-border/60 shrink-0">
        <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500/70" />
            <span className="w-2 h-2 rounded-full bg-amber-400/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
        </div>
        <span className="text-[10px] font-mono text-text-muted/80 bg-primary/80 px-2.5 py-0.5 rounded-md border border-border/50 truncate max-w-[70%]">
            {domain}
        </span>
        <span className="w-6" aria-hidden="true" />
    </div>
);

const FlagshipProjectCard = ({ project, setSelectedProject }) => (
    <motion.div
        layoutId={`project-${project._id}`}
        whileHover={{ y: -4, transition: { duration: 0.25 } }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-40px" }}
        className="mb-6 sm:mb-8 rounded-2xl overflow-hidden border border-accent/35 hover:border-accent/70 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)] transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group cursor-pointer bg-secondary/85 backdrop-blur-md"
        onClick={() => setSelectedProject(project)}
    >
        {/* Left: Browser-Framed 16:9 Screenshot */}
        <div className="lg:col-span-7 flex flex-col bg-primary border-b lg:border-b-0 lg:border-r border-border/60">
            <BrowserTopBar domain={getDomainLabel(project.liveLink, project.title)} />
            <div className="relative overflow-hidden aspect-video w-full bg-primary">
                <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-video w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-secondary/90 via-secondary/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/90 border border-accent/40 text-accent-hover text-[10px] font-bold tracking-[0.16em] uppercase backdrop-blur-sm">
                        {project.category}
                    </span>
                </div>
            </div>
        </div>

        {/* Right: Executive Summary */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Flagship Case Study</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-accent-hover transition-colors duration-300 mb-3">
                    {project.title}
                </h3>
                <p className="text-text-muted text-sm sm:text-base leading-relaxed font-light mb-5 line-clamp-3">
                    {project.valueProp || project.description}
                </p>

                {project.highlight && (
                    <div className="bg-primary/70 border border-border/60 rounded-xl px-4 py-2.5 mb-5 flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-text-main">
                            {project.highlight}
                        </span>
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                    {project.techStack.slice(0, 4).map((tech, i) => (
                        <span
                            key={i}
                            className="text-[11px] bg-primary/80 text-zinc-300 px-2.5 py-1 rounded-lg border border-border/60 group-hover:border-accent/35 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-border/50 mt-auto">
                <span className="text-sm text-white group-hover:text-accent font-semibold transition-colors duration-300 flex items-center gap-1.5">
                    Read Case Study <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.githubLink && project.githubLink !== '#' && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-lg bg-primary/70 text-text-muted hover:text-white hover:bg-primary border border-border/50 transition-all duration-300"
                            aria-label="GitHub Repository"
                            title="View GitHub Code"
                        >
                            <FaGithub size={15} />
                        </a>
                    )}
                    {project.liveLink && project.liveLink !== '#' && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-sm shadow-accent/40 text-xs font-semibold flex items-center gap-1.5"
                            aria-label="Live Demo"
                            title="Open Live Application"
                        >
                            <span>Live</span>
                            <FaExternalLinkAlt size={11} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
);

const ProjectCard = ({ project, index, setSelectedProject }) => {
    return (
        <motion.div
            layoutId={`project-${project._id}`}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-40px" }}
            className="rounded-2xl overflow-hidden border border-border/70 hover:border-accent/60 hover:shadow-[0_0_30px_rgba(99,102,241,0.18)] transition-all duration-300 flex flex-col group cursor-pointer bg-secondary/80 backdrop-blur-md h-full"
            onClick={() => setSelectedProject(project)}
        >
            {/* Browser-Framed 16:9 Project Thumbnail with Single Category Badge */}
            <BrowserTopBar domain={getDomainLabel(project.liveLink, project.title)} />
            <div className="relative overflow-hidden aspect-video w-full bg-primary shrink-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-video w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-secondary via-secondary/70 to-transparent pointer-events-none" />
                
                {/* Category Badge */}
                <div className="absolute bottom-3 left-4 z-10">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/85 border border-accent/40 text-accent-hover text-[10px] font-bold tracking-[0.16em] uppercase backdrop-blur-sm shadow-sm">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex flex-col grow">
                <div className="flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-accent-hover transition-colors duration-300 mb-2">
                        {project.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed font-light mb-4 line-clamp-2 min-h-[2.75rem]">
                        {project.valueProp || project.description}
                    </p>

                    {/* Compact Highlight Strip */}
                    {project.highlight && (
                        <div className="bg-primary/65 border border-border/50 rounded-xl px-3.5 py-2 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="text-xs font-semibold text-text-main truncate">
                                {project.highlight}
                            </span>
                        </div>
                    )}

                    {/* Top 4 Tech Stack Pills (Max 1 Row) */}
                    <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap mb-5 mt-auto">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="text-[11px] bg-primary/80 text-zinc-300 px-2.5 py-1 rounded-lg border border-border/60 group-hover:border-accent/35 transition-colors shrink-0"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-border/50 mt-auto">
                    <span className="text-xs sm:text-sm text-white group-hover:text-accent font-medium transition-colors duration-300 flex items-center gap-1.5">
                        View Details <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {project.githubLink && project.githubLink !== '#' && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-primary/70 text-text-muted hover:text-white hover:bg-primary border border-border/50 transition-all duration-300"
                                aria-label="GitHub Repository"
                                title="View GitHub Code"
                            >
                                <FaGithub size={15} />
                            </a>
                        )}
                        {project.liveLink && project.liveLink !== '#' && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-accent text-white hover:bg-accent-hover transition-all duration-300 shadow-sm shadow-accent/40"
                                aria-label="Live Demo"
                                title="Open Live Application"
                            >
                                <FaExternalLinkAlt size={12} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const [projects, setProjects] = useState(projectsData);
    const [selectedProject, setSelectedProject] = useState(null);
    const { lenis } = useScroll();

    // Projects are statically curated and bundled with zero network latency
    // Ready immediately on initial render without 500 console errors

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

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedProject(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <section id="projects" className={`py-16 sm:py-28 bg-primary relative transition-all duration-300 ${selectedProject ? 'z-50' : ''}`}>
            {/* Ambient Background Glows — GPU accelerated */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-125 bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-100 h-100 bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] sm:text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4">
                        <span>Selected Work</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 sm:mb-6 tracking-tight text-balance">
                        Featured Engineering Projects
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-light leading-relaxed px-2 text-balance">
                        Production-grade applications leveraging Generative AI, secure exam proctoring, enterprise architectures, and robust cloud services.
                    </p>
                </motion.div>

                {/* Flagship Spotlight */}
                {projects[0] && (
                    <FlagshipProjectCard
                        project={projects[0]}
                        setSelectedProject={setSelectedProject}
                    />
                )}

                {/* Balanced 2x2 Grid for Remaining Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                    {projects.slice(1).map((project, index) => (
                        <ProjectCard
                            key={project._id || index}
                            project={project}
                            index={index}
                            setSelectedProject={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            {/* Rich Detailed Project Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="bg-secondary w-full max-w-4xl rounded-2xl overflow-hidden border border-border/70 max-h-[92vh] flex flex-col shadow-2xl relative my-auto"
                                onClick={(e) => e.stopPropagation()}
                                data-lenis-prevent
                            >
                                {/* Modal Header Banner */}
                                <div className="relative h-48 sm:h-72 w-full shrink-0 overflow-hidden bg-primary">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-black/30" />
                                    
                                    {/* Close Button */}
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/60 hover:bg-black/90 text-white rounded-full p-2 sm:p-2.5 transition-all duration-300 border border-white/10 hover:border-white/30 z-20 cursor-pointer"
                                        aria-label="Close Modal"
                                    >
                                        <FaTimes size={14} />
                                    </button>

                                    {/* Overlay Title */}
                                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mb-1.5 sm:mb-2">
                                            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-accent/90 text-white text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase rounded-full">
                                                {selectedProject.category}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                                            {selectedProject.title}
                                        </h3>
                                        {selectedProject.subtitle && (
                                            <p className="text-accent-hover text-xs sm:text-sm font-medium mt-0.5 sm:mt-1">
                                                {selectedProject.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Modal Body (Scrollable) */}
                                <div className="p-4 sm:p-10 overflow-y-auto space-y-6 sm:space-y-8">
                                    {/* Action Links */}
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pb-6 border-b border-border/60">
                                        {selectedProject.liveLink && selectedProject.liveLink !== '#' && (
                                            <a
                                                href={selectedProject.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-hover transition-all duration-300 text-sm shadow-lg shadow-accent/25 w-full sm:w-auto"
                                            >
                                                <FaExternalLinkAlt /> Launch Live Application
                                            </a>
                                        )}
                                        {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                                            <a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 px-6 py-3.5 sm:py-3 bg-primary border border-border/70 rounded-xl hover:border-accent/50 hover:bg-primary/90 transition-all duration-300 text-white text-sm w-full sm:w-auto"
                                            >
                                                <FaGithub size={16} /> View GitHub Source
                                            </a>
                                        )}
                                    </div>

                                    {/* Case Study / System Overview */}
                                    <div className="space-y-4">
                                        <h4 className="text-lg font-semibold text-white">
                                            Case Study Overview
                                        </h4>
                                        <p className="text-text-muted leading-relaxed text-sm sm:text-base font-light">
                                            {selectedProject.description}
                                        </p>
                                        {selectedProject.caseStudy && (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                                                <div className="p-4 rounded-xl bg-primary/60 border border-border/50">
                                                    <div className="text-[11px] font-bold uppercase tracking-wider text-rose-300 mb-1.5">
                                                        The Business Problem
                                                    </div>
                                                    <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-light">
                                                        {selectedProject.caseStudy.problem}
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-primary/60 border border-border/50">
                                                    <div className="text-[11px] font-bold uppercase tracking-wider text-accent-hover mb-1.5">
                                                        The Solution
                                                    </div>
                                                    <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-light">
                                                        {selectedProject.caseStudy.solution}
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                                                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                                                        Measurable Impact
                                                    </div>
                                                    <p className="text-text-main text-xs sm:text-sm leading-relaxed font-medium">
                                                        {selectedProject.caseStudy.impact}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Key Performance / Architecture Metrics */}
                                    {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                                                Key Architecture & Performance Highlights
                                            </h4>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {selectedProject.metrics.map((metric, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="p-4 bg-primary/70 rounded-xl border border-border/50 text-center"
                                                    >
                                                        <div className="text-sm sm:text-base font-bold text-white mb-1">
                                                            {metric.value}
                                                        </div>
                                                        <div className="text-[11px] text-text-muted uppercase tracking-wider">
                                                            {metric.label}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Key Features Breakdown */}
                                    {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
                                                Core Capabilities & Engineering Highlights
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {selectedProject.keyFeatures.map((feat, fIdx) => (
                                                    <div
                                                        key={fIdx}
                                                        className="p-4 bg-primary/50 rounded-xl border border-border/40 hover:border-accent/30 transition-all"
                                                    >
                                                        <div className="font-semibold text-white text-sm mb-1.5 flex items-center gap-2">
                                                            <FaCheckCircle className="text-accent text-xs" />
                                                            {feat.title}
                                                        </div>
                                                        <p className="text-text-muted text-xs leading-relaxed font-light">
                                                            {feat.desc}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Technologies Used */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                                            Technology Stack
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.techStack.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-4 py-2 bg-primary/70 text-text-main text-xs sm:text-sm rounded-lg border border-accent/20 font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};

export default ProjectsSection;
