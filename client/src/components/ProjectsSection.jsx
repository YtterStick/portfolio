import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScroll } from '../context/ScrollContext';
import { projectsData } from '../data/projects';

const getDomainLabel = (liveLink, title) => {
    if (!liveLink || liveLink === '#') return `${title.toLowerCase().replace(/\s+/g, '_')}.bin`;
    try {
        const host = new URL(liveLink).hostname.replace(/^www\./, '');
        if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
            return 'hr-tna-payroll.internal';
        }
        return host;
    } catch {
        return `${title.toLowerCase().replace(/\s+/g, '_')}.bin`;
    }
};

const getAsciiBar = (idx) => {
    const bars = [
        { pct: '96%', bar: '[██████████]' },
        { pct: '92%', bar: '[█████████░]' },
        { pct: '88%', bar: '[█████████░]' },
        { pct: '90%', bar: '[█████████░]' }
    ];
    return bars[idx % bars.length];
};

const AsciiWindowHeader = ({ index, title, domain }) => (
    <div className="flex items-center justify-between px-3 py-2 bg-primary border-b border-border text-[11px] font-mono">
        <span className="text-accent font-bold truncate">
            ╔══[ 0{index + 1} // {title.toUpperCase()}.EXE ]
        </span>
        <span className="text-text-muted truncate max-w-[45%] text-[10px]">
            [{domain}]
        </span>
    </div>
);

const FlagshipProjectCard = ({ project, setSelectedProject }) => (
    <div
        onClick={() => setSelectedProject(project)}
        className="mb-8 border border-accent bg-secondary grid grid-cols-1 lg:grid-cols-12 group cursor-pointer font-mono"
    >
        {/* Left: Dithered 16:9 Screenshot with ASCII Window Chrome */}
        <div className="lg:col-span-7 flex flex-col bg-primary border-b lg:border-b-0 lg:border-r border-border">
            <AsciiWindowHeader
                index={0}
                title={project.title}
                domain={getDomainLabel(project.liveLink, project.title)}
            />
            <div className="relative aspect-video w-full dither-wrap border-b border-border lg:border-b-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-video w-full object-cover object-top dither-img"
                    loading="lazy"
                />
                <div className="absolute bottom-2 left-2 z-10">
                    <span className="px-2 py-0.5 bg-primary border border-accent text-accent text-[10px] font-bold uppercase">
                        [ {project.category} ]
                    </span>
                </div>
            </div>
        </div>

        {/* Right: Technical Directory Spec */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between">
            <div>
                <div className="text-[11px] text-accent font-bold mb-2">
                    &gt; FLAGSHIP_EXECUTABLE // STATUS: PRODUCTION
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-2 uppercase">
                    {project.title}
                </h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-4">
                    {project.valueProp || project.description}
                </p>

                {project.highlight && (
                    <div className="bg-primary border border-border px-3 py-2 mb-4 text-xs">
                        <span className="text-accent font-bold">[OUTCOME]: </span>
                        <span className="text-text-main">{project.highlight}</span>
                    </div>
                )}

                {/* ASCII Tech Stack Progress / Stat Block */}
                <div className="border border-border bg-primary p-3 mb-5 space-y-1 text-[11px]">
                    <div className="text-text-muted text-[10px] pb-1 border-b border-border mb-1">
                        +--[ TECH_STACK_TELEMETRY ]--------------+
                    </div>
                    {project.techStack.slice(0, 4).map((tech, i) => {
                        const stat = getAsciiBar(i);
                        return (
                            <div key={i} className="flex items-center justify-between gap-2">
                                <span className="text-text-main truncate">{tech}</span>
                                <span className="text-accent shrink-0">
                                    {stat.bar} {stat.pct}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-border mt-auto">
                <span className="px-3 py-1.5 bg-primary border border-accent text-accent group-hover:bg-accent group-hover:text-primary text-xs font-bold transition-none">
                    [ READ_MANUAL.MD -&gt; ]
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.githubLink && project.githubLink !== '#' && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 bg-primary border border-border text-text-main hover:bg-accent hover:text-primary hover:border-accent text-xs font-bold transition-none"
                        >
                            [ SRC ]
                        </a>
                    )}
                    {project.liveLink && project.liveLink !== '#' && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-accent text-primary border border-accent hover:bg-primary hover:text-accent text-xs font-bold transition-none"
                        >
                            [ LAUNCH_LIVE ↗ ]
                        </a>
                    )}
                </div>
            </div>
        </div>
    </div>
);

const ProjectCard = ({ project, index, setSelectedProject }) => {
    return (
        <div
            onClick={() => setSelectedProject(project)}
            className="border border-border hover:border-accent bg-secondary flex flex-col group cursor-pointer h-full font-mono"
        >
            <AsciiWindowHeader
                index={index + 1}
                title={project.title}
                domain={getDomainLabel(project.liveLink, project.title)}
            />
            <div className="relative aspect-video w-full dither-wrap border-b border-border shrink-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="aspect-video w-full object-cover object-top dither-img"
                    loading="lazy"
                />
                <div className="absolute bottom-2 left-2 z-10">
                    <span className="px-2 py-0.5 bg-primary border border-accent text-accent text-[10px] font-bold uppercase">
                        [ {project.category} ]
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col grow">
                <div className="flex-1 flex flex-col">
                    <h3 className="text-lg sm:text-xl font-bold text-text-main mb-2 uppercase">
                        {project.title}
                    </h3>
                    <p className="text-text-muted text-xs leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
                        {project.valueProp || project.description}
                    </p>

                    {project.highlight && (
                        <div className="bg-primary border border-border px-3 py-2 mb-4 text-xs truncate">
                            <span className="text-accent font-bold">[IMPACT]: </span>
                            <span className="text-text-main">{project.highlight}</span>
                        </div>
                    )}

                    {/* ASCII Progress Bar Stat Block */}
                    <div className="border border-border bg-primary p-3 mb-5 mt-auto space-y-1 text-[11px]">
                        {project.techStack.slice(0, 4).map((tech, i) => {
                            const stat = getAsciiBar(i);
                            return (
                                <div key={i} className="flex items-center justify-between gap-2">
                                    <span className="text-text-main truncate">{tech}</span>
                                    <span className="text-accent shrink-0">
                                        {stat.bar} {stat.pct}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-border mt-auto">
                    <span className="px-2.5 py-1 bg-primary border border-border text-text-main group-hover:bg-accent group-hover:text-primary group-hover:border-accent text-xs font-bold transition-none">
                        [ VIEW_README.MD -&gt; ]
                    </span>
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        {project.githubLink && project.githubLink !== '#' && (
                            <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-primary border border-border text-text-muted hover:bg-accent hover:text-primary hover:border-accent text-xs font-bold transition-none"
                            >
                                [ SRC ]
                            </a>
                        )}
                        {project.liveLink && project.liveLink !== '#' && (
                            <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 bg-accent text-primary border border-accent hover:bg-primary hover:text-accent text-xs font-bold transition-none"
                            >
                                [ LIVE ↗ ]
                            </a>
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
        <section id="projects" className="py-16 sm:py-24 bg-primary border-b border-border font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Directory Listing Header */}
                <div className="mb-10 border border-border bg-secondary p-4 sm:p-6">
                    <div className="text-xs text-accent font-bold mb-2">
                        root@andrei-dev:/srv/production/work# ls -la --case-studies
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-text-main uppercase tracking-tight mb-2">
                        02 // SELECTED_WORK &amp; CASE_STUDIES
                    </h2>
                    <p className="text-text-muted text-xs sm:text-sm max-w-3xl">
                        total 5 // Production-grade systems engineered with Generative AI, computer vision proctoring, multi-tenant SaaS architectures, and enterprise databases. Click any node to inspect its technical README manual.
                    </p>
                </div>

                {/* Flagship Spotlight */}
                {projects[0] && (
                    <FlagshipProjectCard
                        project={projects[0]}
                        setSelectedProject={setSelectedProject}
                    />
                )}

                {/* 2x2 Inventory Grid */}
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

            {/* Technical README / Retro Manual Modal */}
            {typeof document !== 'undefined' && selectedProject && createPortal(
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6 bg-black/90 overflow-y-auto font-mono"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="bg-secondary w-full max-w-4xl border-2 border-accent max-h-[92vh] flex flex-col my-auto"
                        onClick={(e) => e.stopPropagation()}
                        data-lenis-prevent
                    >
                        {/* Modal Top Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-primary border-b border-accent text-xs">
                            <span className="text-accent font-bold truncate">
                                ╔══[ MAN(1) // {selectedProject.title.toUpperCase()}_CASE_STUDY.MD ]
                            </span>
                            <button
                                type="button"
                                onClick={() => setSelectedProject(null)}
                                className="px-2.5 py-0.5 bg-accent text-primary font-bold hover:bg-primary hover:text-accent border border-accent cursor-pointer transition-none"
                            >
                                [ X ESC ]
                            </button>
                        </div>

                        {/* Scrollable Manual Body */}
                        <div className="p-4 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm">
                            {/* Dithered Banner */}
                            <div className="border border-border bg-primary">
                                <div className="h-48 sm:h-64 w-full dither-wrap border-b border-border">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover object-top dither-img"
                                    />
                                </div>
                                <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <span className="text-accent text-xs font-bold uppercase block">
                                            [ CATEGORY: {selectedProject.category} ]
                                        </span>
                                        <h3 className="text-xl sm:text-3xl font-bold text-text-main uppercase mt-1">
                                            {selectedProject.title}
                                        </h3>
                                        {selectedProject.subtitle && (
                                            <p className="text-text-muted text-xs mt-0.5">
                                                {selectedProject.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 shrink-0">
                                        {selectedProject.liveLink && selectedProject.liveLink !== '#' && (
                                            <a
                                                href={selectedProject.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-accent text-primary font-bold text-xs border border-accent hover:bg-primary hover:text-accent transition-none"
                                            >
                                                [ LAUNCH_APPLICATION ↗ ]
                                            </a>
                                        )}
                                        {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                                            <a
                                                href={selectedProject.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-primary text-text-main font-bold text-xs border border-border hover:bg-accent hover:text-primary hover:border-accent transition-none"
                                            >
                                                [ VIEW_SOURCE_REPO ]
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ASCII Divider */}
                            <div className="text-text-muted text-[11px] overflow-hidden whitespace-nowrap select-none">
                                +----------------------------------------------------------------------------------------------------+
                            </div>

                            {/* Case Study Problem / Solution / Impact */}
                            {selectedProject.caseStudy && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-primary border border-border">
                                        <div className="text-accent font-bold text-xs mb-2 border-b border-border pb-1">
                                            [01 // THE_BUSINESS_PROBLEM]
                                        </div>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            {selectedProject.caseStudy.problem}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-primary border border-border">
                                        <div className="text-accent font-bold text-xs mb-2 border-b border-border pb-1">
                                            [02 // ARCHITECTURAL_SOLUTION]
                                        </div>
                                        <p className="text-text-muted text-xs leading-relaxed">
                                            {selectedProject.caseStudy.solution}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-primary border border-accent">
                                        <div className="text-accent font-bold text-xs mb-2 border-b border-border pb-1">
                                            [03 // MEASURABLE_IMPACT]
                                        </div>
                                        <p className="text-text-main text-xs leading-relaxed font-bold">
                                            {selectedProject.caseStudy.impact}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Telemetry Metrics */}
                            {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                                <div>
                                    <div className="text-accent font-bold text-xs mb-3 uppercase">
                                        &gt; SYSTEM_SPECIFICATIONS &amp; TELEMETRY:
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {selectedProject.metrics.map((metric, idx) => (
                                            <div key={idx} className="p-3 bg-primary border border-border">
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
                                <div>
                                    <div className="text-accent font-bold text-xs mb-3 uppercase">
                                        &gt; CORE_MODULES_IMPLEMENTED:
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {selectedProject.keyFeatures.map((feat, fIdx) => (
                                            <div key={fIdx} className="p-3.5 bg-primary border border-border">
                                                <div className="font-bold text-text-main text-xs mb-1">
                                                    [+] {feat.title}
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
                            <div>
                                <div className="text-accent font-bold text-xs mb-2 uppercase">
                                    &gt; DEPENDENCIES &amp; STACK:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-primary text-text-main text-xs border border-border"
                                        >
                                            [{tech}]
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
