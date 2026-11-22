import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScroll } from '../context/ScrollContext';
import { projectsData } from '../data/projects';

const getDomainLabel = (project) => {
    if (project.isPrivate) return 'PRIVATE_ENTERPRISE';
    if (!project.liveLink || project.liveLink === '#') {
        return `${project.title.toLowerCase().replace(/\s+/g, '_')}.app`;
    }
    try {
        return new URL(project.liveLink).hostname.replace(/^www\./, '');
    } catch {
        return `${project.title.toLowerCase().replace(/\s+/g, '_')}.app`;
    }
};

const WindowHeader = ({ index, project }) => (
    <div className="flex items-center justify-between px-4 py-2.5 bg-primary border-b border-border text-[11px] font-mono">
        <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 bg-accent shrink-0" />
            <span className="text-text-main font-bold truncate">
                0{index + 1} // {project.title.toUpperCase()}
            </span>
        </div>
        <span className="text-text-muted truncate max-w-[45%] text-[10px]">
            {getDomainLabel(project)}
        </span>
    </div>
);

const ProjectThumbnail = ({ src, alt, category, className = 'aspect-video w-full' }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={`relative ${className} dither-wrap bg-primary overflow-hidden`}>
            {!imgError && src ? (
                <img
                    src={src}
                    alt={alt}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top dither-img group-hover:scale-[1.02]"
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-primary text-center border border-border/50">
                    <span className="text-xs font-bold text-text-main uppercase tracking-wider mb-1">
                        {alt} // PREVIEW_FRAME
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">
                        SYS_ASSET: {category}
                    </span>
                </div>
            )}
            <div className="absolute bottom-2.5 left-3 z-10">
                <span className="px-2.5 py-0.5 bg-primary/95 border border-border text-accent text-[10px] font-bold uppercase tracking-wider">
                    [ {category} ]
                </span>
            </div>
        </div>
    );
};

const FlagshipProjectCard = ({ project, index, setSelectedProject }) => (
    <div
        onClick={() => setSelectedProject(project)}
        className="term-card grid grid-cols-1 lg:grid-cols-12 group cursor-pointer font-mono"
    >
        {/* Left: Large Dithered 16:9 Screenshot */}
        <div className="lg:col-span-7 flex flex-col bg-primary border-b lg:border-b-0 lg:border-r border-border">
            <WindowHeader index={index} project={project} />
            <ProjectThumbnail
                src={project.image}
                alt={project.title}
                category={project.category}
            />
        </div>

        {/* Right: Flagship Case Study Pitch */}
        <div className="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 text-[11px] text-accent font-bold mb-2">
                    <span className="w-1.5 h-1.5 bg-accent inline-block" />
                    <span>FLAGSHIP_0{index + 1} // PRODUCTION</span>
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2.5 uppercase group-hover:text-accent transition-colors duration-150">
                    {project.title}
                </h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-5">
                    {project.valueProp || project.description}
                </p>

                {project.highlight && (
                    <div className="bg-primary border border-border px-3.5 py-2.5 mb-5 text-xs">
                        <span className="text-accent font-bold">OUTCOME: </span>
                        <span className="text-text-main">{project.highlight}</span>
                    </div>
                )}

                {/* Clean Monochrome Tech Tags */}
                <div className="mb-6">
                    <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2">
                        TECH_STACK
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 5).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 bg-primary border border-border text-text-main text-[11px]"
                            >
                                [ {tech} ]
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-4 border-t border-border mt-auto">
                <span className="px-3.5 py-1.5 bg-primary border border-accent text-accent group-hover:bg-accent group-hover:text-primary text-xs font-bold transition-colors duration-150">
                    [ VIEW_README.MD -&gt; ]
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.githubLink && project.githubLink !== '#' && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-primary border border-border text-text-main hover:border-accent hover:text-accent text-xs font-bold transition-colors duration-150"
                        >
                            [ SRC ]
                        </a>
                    )}
                    {project.liveLink && project.liveLink !== '#' && !project.isPrivate && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 bg-primary text-accent border border-accent hover:bg-accent hover:text-primary text-xs font-bold transition-colors duration-150"
                        >
                            [ LAUNCH_LIVE ↗ ]
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const AdditionalProjectCard = ({ project, index, setSelectedProject }) => {
    return (
        <div
            onClick={() => setSelectedProject(project)}
            className="term-card flex flex-col group cursor-pointer h-full font-mono"
        >
            <WindowHeader index={index} project={project} />
            <div className="border-b border-border shrink-0">
                <ProjectThumbnail
                    src={project.image}
                    alt={project.title}
                    category={project.category}
                />
            </div>

            <div className="p-5 sm:p-6 flex flex-col grow">
                <div className="flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-text-main mb-2 uppercase group-hover:text-accent transition-colors duration-150">
                        {project.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                        {project.valueProp || project.description}
                    </p>

                    {project.highlight && (
                        <div className="bg-primary border border-border px-3 py-2 mb-4 text-xs truncate">
                            <span className="text-accent font-bold">IMPACT: </span>
                            <span className="text-text-main">{project.highlight}</span>
                        </div>
                    )}

                    {/* Clean Monochrome Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
                        {project.techStack.slice(0, 4).map((tech, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 bg-primary border border-border text-text-muted text-[11px]"
                            >
                                [ {tech} ]
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-2 pt-3.5 border-t border-border mt-auto">
                    <span className="px-3 py-1.5 bg-primary border border-border text-text-main group-hover:border-accent group-hover:text-accent text-xs font-bold transition-colors duration-150">
                        [ VIEW_README.MD -&gt; ]
                    </span>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {project.githubLink && project.githubLink !== '#' && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 bg-primary border border-border text-text-muted hover:border-accent hover:text-accent text-xs font-bold transition-colors duration-150"
                            >
                                [ SRC ]
                            </a>
                        )}
                        {project.isPrivate ? (
                            <span className="px-2.5 py-1.5 bg-primary border border-border text-text-muted text-[11px] font-bold">
                                [ PRIVATE_ENTERPRISE ]
                            </span>
                        ) : (
                            project.liveLink && project.liveLink !== '#' && (
                                <a
                                    href={project.liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 bg-primary text-accent border border-accent hover:bg-accent hover:text-primary text-xs font-bold transition-colors duration-150"
                                >
                                    [ LIVE ↗ ]
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsSection = () => {
    const [projects] = useState(projectsData);
    const [selectedProject, setSelectedProject] = useState(null);
    const { lenis } = useScroll();

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
        <section id="projects" className="py-24 sm:py-32 bg-primary border-b border-border font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Directory Listing Header */}
                <div className="mb-12 term-card p-6 sm:p-8">
                    <div className="text-xs text-accent font-bold mb-2">
                        root@andrei-dev:/srv/production/work# ls -la --flagship
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-text-main uppercase tracking-tight mb-2.5 text-balance">
                        02 // SELECTED_WORK &amp; FLAGSHIP_SYSTEMS
                    </h2>
                    <p className="text-text-muted text-xs sm:text-sm max-w-3xl leading-relaxed">
                        Top 3 flagship platforms engineered with Generative AI, computer vision proctoring, multi-tenant Next.js SaaS architecture, and Cloudflare Edge delivery—followed by additional enterprise deployments.
                    </p>
                </div>

                {/* Top 3 Flagship Projects: Evalo, Tactiq, AniVerse */}
                <div className="space-y-8 mb-16">
                    {flagshipProjects.map((project, index) => (
                        <FlagshipProjectCard
                            key={project._id || index}
                            project={project}
                            index={index}
                            setSelectedProject={setSelectedProject}
                        />
                    ))}
                </div>

                {/* Additional Systems Sub-Header + 2-Column Row */}
                {additionalProjects.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
                            <div className="flex items-center gap-2.5">
                                <span className="w-2 h-2 bg-accent inline-block" />
                                <h3 className="text-sm sm:text-base font-bold text-text-main uppercase tracking-wider">
                                    ADDITIONAL_SYSTEMS // ENTERPRISE &amp; INTERNAL TOOLS
                                </h3>
                            </div>
                            <span className="text-[11px] text-text-muted">
                                {additionalProjects.length} MODULES
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
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

            {/* Technical README / Case Study Modal */}
            {typeof document !== 'undefined' && selectedProject && createPortal(
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs overflow-y-auto font-mono"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="term-card w-full max-w-4xl max-h-[92vh] flex flex-col my-auto"
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        {/* Modal Top Bar */}
                        <div className="flex items-center justify-between px-5 py-3 bg-primary border-b border-border text-xs">
                            <div className="flex items-center gap-2 truncate">
                                <span className="w-2 h-2 bg-accent shrink-0" />
                                <span className="text-text-main font-bold truncate">
                                    MAN(1) // {selectedProject.title.toUpperCase()}_CASE_STUDY.MD
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="px-3 py-1 bg-primary text-accent font-bold hover:bg-accent hover:text-primary border border-accent cursor-pointer transition-colors duration-150"
                            >
                                [ X ESC ]
                            </button>
                        </div>

                        {/* Scrollable Manual Body */}
                        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
                            {/* Dithered Banner */}
                            <div className="border border-border bg-primary">
                                <ProjectThumbnail
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    category={selectedProject.category}
                                    className="h-52 sm:h-68 w-full border-b border-border"
                                />
                                <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <span className="text-accent text-xs font-bold uppercase block">
                                            CATEGORY // {selectedProject.category}
                                        </span>
                                        <h3 className="text-xl sm:text-3xl font-bold text-text-main uppercase mt-1">
                                            {selectedProject.title}
                                        </h3>
                                        {selectedProject.subtitle && (
                                            <p className="text-text-muted text-xs mt-1">
                                                {selectedProject.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2.5 shrink-0">
                                        {selectedProject.isPrivate ? (
                                            <span className="px-4 py-2 bg-secondary text-text-muted font-bold text-xs border border-border">
                                                [ PRIVATE_ENTERPRISE ]
                                            </span>
                                        ) : (
                                            selectedProject.liveLink && selectedProject.liveLink !== '#' && (
                                                <a
                                                    href={selectedProject.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-primary text-accent font-bold text-xs border border-accent hover:bg-accent hover:text-primary transition-colors duration-150"
                                                >
                                                    [ LAUNCH_APPLICATION ↗ ]
                                                </a>
                                            )
                                        )}
                                        {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                                            <a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-primary text-text-main font-bold text-xs border border-border hover:border-accent hover:text-accent transition-colors duration-150"
                                            >
                                                [ VIEW_SOURCE_REPO ]
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Case Study Problem / Solution / Impact */}
                            {selectedProject.caseStudy && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-border">
                                    <div className="p-4 bg-primary border border-border">
                                        <div className="text-text-main font-bold text-xs mb-2 border-b border-border pb-1.5">
                                            01 // THE_BUSINESS_PROBLEM
                                        </div>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            {selectedProject.caseStudy.problem}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-primary border border-border">
                                        <div className="text-text-main font-bold text-xs mb-2 border-b border-border pb-1.5">
                                            02 // ARCHITECTURAL_SOLUTION
                                        </div>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            {selectedProject.caseStudy.solution}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-primary border border-accent">
                                        <div className="text-accent font-bold text-xs mb-2 border-b border-border pb-1.5">
                                            03 // MEASURABLE_IMPACT
                                        </div>
                                        <p className="text-text-main text-xs leading-relaxed font-semibold">
                                            {selectedProject.caseStudy.impact}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Telemetry Metrics */}
                            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                                <div className="pt-2 border-t border-border">
                                    <div className="text-text-main font-bold text-xs mb-3 uppercase">
                                        &gt; SYSTEM_SPECIFICATIONS &amp; TELEMETRY
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {selectedProject.metrics.map((metric, idx) => (
                                            <div key={idx} className="p-3.5 bg-primary border border-border">
                                                <div className="text-[10px] text-text-muted uppercase">
                                                    {metric.label}
                                                </div>
                                                <div className="text-xs sm:text-sm font-bold text-accent mt-1">
                                                    {metric.value}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Key Features */}
                            {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                                <div className="pt-2 border-t border-border">
                                    <div className="text-text-main font-bold text-xs mb-3 uppercase">
                                        &gt; CORE_MODULES_IMPLEMENTED
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedProject.keyFeatures.map((feat, fIdx) => (
                                            <div key={fIdx} className="p-4 bg-primary border border-border">
                                                <div className="font-bold text-text-main text-xs mb-1">
                                                    + {feat.title}
                                                </div>
                                                <p className="text-text-muted text-xs leading-relaxed">
                                                    {feat.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tech Stack */}
                            <div className="pt-2 border-t border-border">
                                <div className="text-text-main font-bold text-xs mb-2.5 uppercase">
                                    &gt; DEPENDENCIES &amp; STACK
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-primary text-text-main text-xs border border-border"
                                        >
                                            [ {tech} ]
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
