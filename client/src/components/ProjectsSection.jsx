import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useScroll as useLenisScroll } from '../context/ScrollContext';
import { projectsData } from '../data/projects';

const getDomainLabel = (project) => {
    if (project.isPrivate) return 'PRIVATE ENTERPRISE';
    if (!project.liveLink || project.liveLink === '#') {
        return `${project.title.toLowerCase().replace(/\s+/g, '-')}.app`;
    }
    try {
        return new URL(project.liveLink).hostname.replace(/^www\./, '');
    } catch {
        return `${project.title.toLowerCase().replace(/\s+/g, '-')}.app`;
    }
};

const ProjectThumbnail = ({ src, alt, category, imgY, className = 'aspect-video w-full' }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={`relative ${className} bg-[#090909] overflow-hidden`}>
            {!imgError && src ? (
                <motion.img
                    src={src}
                    alt={alt}
                    style={imgY ? { y: imgY, scale: 1.08 } : undefined}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top editorial-img will-change-transform"
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-primary text-center">
                    <span className="tech-label text-text-main mb-1">{alt}</span>
                    <span className="tech-label text-text-muted">{category}</span>
                </div>
            )}
            <div className="absolute bottom-3 left-3 z-10">
                <span className="px-2.5 py-1 bg-primary/90 backdrop-blur-xs border border-white/15 tech-label text-text-main">
                    {category}
                </span>
            </div>
        </div>
    );
};

const FlagshipProjectCard = ({ project, index, setSelectedProject }) => {
    const cardRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start 0.96', 'end 0.04']
    });

    const y = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], reduceMotion ? [0, 0, 0, 0] : [56, 0, 0, -40]);
    const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], reduceMotion ? [1, 1, 1, 1] : [0.96, 1, 1, 0.97]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [0.3, 1, 1, 0.45]);
    const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-6%', '6%']);

    return (
        <motion.article
            ref={cardRef}
            style={{ y, scale, opacity }}
            className="editorial-card grid grid-cols-1 lg:grid-cols-12 group will-change-transform"
        >
            {/* Left: 16:9 Scroll-Parallax Preview */}
            <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] tech-label">
                    <span className="text-text-main">
                        (0{index + 1}) {project.title}
                    </span>
                    <span className="text-text-muted">{getDomainLabel(project)}</span>
                </div>
                <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Open ${project.title} case study`}
                    className="block w-full text-left cursor-pointer"
                >
                    <ProjectThumbnail
                        src={project.image}
                        alt={project.title}
                        category={project.category}
                        imgY={imgY}
                    />
                </button>
            </div>

            {/* Right: Editorial Case Study Summary */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                    <div className="tech-label text-text-muted mb-2">
                        FLAGSHIP 0{index + 1} — {project.category}
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-text-main mb-3 tracking-tight">
                        {project.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                        {project.valueProp || project.description}
                    </p>

                    {project.highlight && (
                        <div className="border-l-2 border-white/40 pl-3.5 py-1 mb-6">
                            <div className="tech-label text-text-muted mb-0.5">MEASURABLE OUTCOME</div>
                            <div className="text-sm text-text-main font-medium">{project.highlight}</div>
                        </div>
                    )}

                    <div className="mb-6">
                        <div className="tech-label text-text-muted mb-2">ARCHITECTURE &amp; STACK</div>
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack.slice(0, 5).map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 border border-white/10 bg-primary/60 tech-label text-text-muted"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-white/[0.08] mt-auto">
                    <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="tech-label text-text-main hover:underline cursor-pointer"
                    >
                        READ CASE STUDY ↗
                    </button>
                    <div className="flex items-center gap-3">
                        {project.githubLink && project.githubLink !== '#' && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tech-label text-text-muted hover:text-text-main transition-colors"
                            >
                                SOURCE ↗
                            </a>
                        )}
                        {project.liveLink && project.liveLink !== '#' && !project.isPrivate && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 border border-white/25 text-text-main hover:bg-white hover:text-primary tech-label transition-colors"
                            >
                                LIVE DEMO ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const AdditionalProjectCard = ({ project, index, setSelectedProject }) => {
    const cardRef = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start 0.96', 'end 0.04']
    });

    const y = useTransform(
        scrollYProgress,
        [0, 0.3, 0.72, 1],
        reduceMotion ? [0, 0, 0, 0] : [index % 2 === 0 ? 42 : 64, 0, 0, -28]
    );
    const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], reduceMotion ? [1, 1, 1, 1] : [0.965, 1, 1, 0.975]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.35, 1, 1, 0.5]);
    const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-5%', '5%']);

    return (
        <motion.article
            ref={cardRef}
            style={{ y, scale, opacity }}
            className="editorial-card flex flex-col group h-full will-change-transform"
        >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] tech-label">
                <span className="text-text-main">
                    (0{index + 1}) {project.title}
                </span>
                <span className="text-text-muted">{getDomainLabel(project)}</span>
            </div>

            <div className="border-b border-white/[0.08] shrink-0">
                <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Open ${project.title} case study`}
                    className="block w-full text-left cursor-pointer"
                >
                    <ProjectThumbnail
                        src={project.image}
                        alt={project.title}
                        category={project.category}
                        imgY={imgY}
                    />
                </button>
            </div>

            <div className="p-6 flex flex-col grow">
                <div className="flex-1 flex flex-col">
                    <h3 className="font-serif text-2xl sm:text-3xl text-text-main mb-2">
                        {project.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-5 line-clamp-2">
                        {project.valueProp || project.description}
                    </p>

                    {project.highlight && (
                        <div className="border-l-2 border-white/30 pl-3 py-0.5 mb-5 text-xs text-text-main">
                            {project.highlight}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 border border-white/10 bg-primary/60 tech-label text-text-muted"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-2 pt-4 border-t border-white/[0.08] mt-auto">
                    <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="tech-label text-text-main hover:underline cursor-pointer"
                    >
                        CASE STUDY ↗
                    </button>
                    <div className="flex items-center gap-3">
                        {project.githubLink && project.githubLink !== '#' && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tech-label text-text-muted hover:text-text-main transition-colors"
                            >
                                SOURCE ↗
                            </a>
                        )}
                        {project.isPrivate ? (
                            <span className="px-2.5 py-1 border border-white/15 tech-label text-text-muted">
                                PRIVATE ENTERPRISE
                            </span>
                        ) : (
                            project.liveLink && project.liveLink !== '#' && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 border border-white/25 text-text-main hover:bg-white hover:text-primary tech-label transition-colors"
                                >
                                    LIVE ↗
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const ProjectsSection = () => {
    const [projects] = useState(projectsData);
    const [selectedProject, setSelectedProject] = useState(null);
    const { lenis } = useLenisScroll();
    const sectionRef = useRef(null);
    const reduceMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const indexY = useTransform(scrollYProgress, [0, 1], [24, reduceMotion ? 0 : -28]);
    const titleY = useTransform(scrollYProgress, [0, 1], [40, reduceMotion ? 0 : -44]);
    const watermarkY = useTransform(scrollYProgress, [0, 1], [90, reduceMotion ? 0 : -110]);

    const flagshipProjects = projects.slice(0, 3);
    const additionalProjects = projects.slice(3);

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
        <section ref={sectionRef} id="projects" className="py-28 sm:py-40 border-b border-white/[0.08] relative overflow-hidden">
            {/* Scroll-Parallax Background Section Index Watermark */}
            <motion.div
                aria-hidden="true"
                style={{ y: watermarkY }}
                className="pointer-events-none select-none absolute right-6 top-16 font-serif italic text-[8rem] sm:text-[13rem] leading-none text-white/[0.025] will-change-transform"
            >
                (02)
            </motion.div>

            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
                {/* Parallax Editorial Section Header */}
                <div className="mb-16 max-w-3xl">
                    <motion.div
                        style={{ y: indexY }}
                        className="tech-label text-text-muted mb-3 will-change-transform"
                    >
                        (02) SELECTED WORK
                    </motion.div>
                    <motion.h2
                        style={{ y: titleY }}
                        className="display-serif text-text-main mb-5 text-balance will-change-transform"
                    >
                        Flagship platforms &amp; <em>production systems.</em>
                    </motion.h2>
                    <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                        Top 3 flagship deployments across AI EdTech, multi-tenant SaaS, and edge streaming—followed by enterprise logistics and payroll tooling.
                    </p>
                </div>

                {/* Top 3 Flagships */}
                <div className="space-y-12 mb-20">
                    {flagshipProjects.map((project, index) => (
                        <FlagshipProjectCard
                            key={project._id || index}
                            project={project}
                            index={index}
                            setSelectedProject={setSelectedProject}
                        />
                    ))}
                </div>

                {/* Additional Systems */}
                {additionalProjects.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
                            <span className="tech-label text-text-main">
                                ADDITIONAL SYSTEMS — ENTERPRISE &amp; INTERNAL TOOLS
                            </span>
                            <span className="tech-label text-text-muted">
                                0{additionalProjects.length} ARCHIVES
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            {additionalProjects.map((project, idx) => (
                                <AdditionalProjectCard
                                    key={project._id || idx}
                                    project={project}
                                    index={idx + 3}
                                    setSelectedProject={setSelectedProject}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Editorial Case Study Modal */}
            {typeof document !== 'undefined' && selectedProject && createPortal(
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedProject.title} Case Study`}
                        className="editorial-card w-full max-w-4xl max-h-[92vh] flex flex-col my-auto bg-secondary"
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        <div className="flex items-center justify-between px-6 py-4 bg-primary border-b border-white/[0.08]">
                            <span className="tech-label text-text-main truncate">
                                CASE STUDY // {selectedProject.title}
                            </span>
                            <button
                                type="button"
                                autoFocus
                                onClick={() => setSelectedProject(null)}
                                className="px-3 py-1 border border-white/20 tech-label text-text-main hover:bg-white hover:text-primary cursor-pointer transition-colors"
                            >
                                CLOSE [ESC]
                            </button>
                        </div>

                        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
                            <div className="border border-white/[0.08] bg-primary">
                                <ProjectThumbnail
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    category={selectedProject.category}
                                    className="h-56 sm:h-72 w-full border-b border-white/[0.08]"
                                />
                                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <span className="tech-label text-text-muted block mb-1">
                                            {selectedProject.category}
                                        </span>
                                        <h3 className="font-serif text-3xl sm:text-4xl text-text-main">
                                            {selectedProject.title}
                                        </h3>
                                        {selectedProject.subtitle && (
                                            <p className="text-text-muted text-sm mt-1">
                                                {selectedProject.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-3 shrink-0">
                                        {selectedProject.isPrivate ? (
                                            <span className="px-4 py-2 border border-white/15 tech-label text-text-muted">
                                                PRIVATE ENTERPRISE
                                            </span>
                                        ) : (
                                            selectedProject.liveLink && selectedProject.liveLink !== '#' && (
                                                <a
                                                    href={selectedProject.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-5 py-2.5 bg-text-main text-primary tech-label font-semibold hover:bg-white transition-colors"
                                                >
                                                    LAUNCH APPLICATION ↗
                                                </a>
                                            )
                                        )}
                                        {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                                            <a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-5 py-2.5 border border-white/20 text-text-main tech-label hover:border-white transition-colors"
                                            >
                                                VIEW SOURCE ↗
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {selectedProject.caseStudy && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <div className="p-5 bg-primary border border-white/[0.08]">
                                        <div className="tech-label text-text-muted mb-2">
                                            (01) THE BUSINESS PROBLEM
                                        </div>
                                        <p className="text-text-muted text-sm leading-relaxed">
                                            {selectedProject.caseStudy.problem}
                                        </p>
                                    </div>
                                    <div className="p-5 bg-primary border border-white/[0.08]">
                                        <div className="tech-label text-text-muted mb-2">
                                            (02) ARCHITECTURAL SOLUTION
                                        </div>
                                        <p className="text-text-muted text-sm leading-relaxed">
                                            {selectedProject.caseStudy.solution}
                                        </p>
                                    </div>
                                    <div className="p-5 bg-primary border border-white/25">
                                        <div className="tech-label text-text-main mb-2">
                                            (03) MEASURABLE IMPACT
                                        </div>
                                        <p className="text-text-main text-sm leading-relaxed font-medium">
                                            {selectedProject.caseStudy.impact}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                                <div>
                                    <div className="tech-label text-text-muted mb-3">
                                        KEY TELEMETRY &amp; SPECIFICATIONS
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        {selectedProject.metrics.map((metric, idx) => (
                                            <div key={idx} className="p-4 bg-primary border border-white/[0.08]">
                                                <div className="tech-label text-text-muted">
                                                    {metric.label}
                                                </div>
                                                <div className="text-base font-serif italic text-text-main mt-1">
                                                    {metric.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                                <div>
                                    <div className="tech-label text-text-muted mb-3">
                                        CORE MODULES IMPLEMENTED
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedProject.keyFeatures.map((feat, fIdx) => (
                                            <div key={fIdx} className="p-4 bg-primary border border-white/[0.08]">
                                                <div className="font-medium text-text-main text-sm mb-1">
                                                    {feat.title}
                                                </div>
                                                <p className="text-text-muted text-xs leading-relaxed">
                                                    {feat.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <div className="tech-label text-text-muted mb-2.5">
                                    TECHNOLOGY STACK
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-primary text-text-main tech-label border border-white/10"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

export default ProjectsSection;
