const LIVE_SITE_URL = import.meta.env.VITE_SITE_URL || 'https://portfolio-tnu.pages.dev';
const LIVE_SITE_LABEL = LIVE_SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

const Footer = () => {
    return (
        <footer className="relative z-10 bg-primary border-t border-border py-16 font-mono text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* System Node */}
                    <div className="term-card p-5 space-y-3">
                        <div className="text-text-main font-bold text-xs tracking-wider uppercase border-b border-border pb-2 flex items-center justify-between">
                            <span>SYS_NODE // ANDREI.DEV</span>
                            <span className="w-2 h-2 bg-accent inline-block" />
                        </div>
                        <p className="text-text-muted leading-relaxed">
                            Full-stack software engineer &amp; IT educator building scalable web apps, AI workflows, and enterprise tools.
                        </p>
                        <div className="pt-1">
                            <a
                                href={LIVE_SITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-3 py-1.5 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary font-bold transition-colors duration-150"
                            >
                                [ {LIVE_SITE_LABEL} ↗ ]
                            </a>
                        </div>
                    </div>

                    {/* Directory Links */}
                    <div className="term-card p-5 space-y-3">
                        <div className="text-text-main font-bold text-xs tracking-wider uppercase border-b border-border pb-2">
                            DIRECTORY_INDEX
                        </div>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="#hero" className="inline-block px-2 py-0.5 text-text-muted hover:text-accent transition-colors duration-150">
                                    [ 01. /HOME ]
                                </a>
                            </li>
                            <li>
                                <a href="#projects" className="inline-block px-2 py-0.5 text-text-muted hover:text-accent transition-colors duration-150">
                                    [ 02. /WORK_CASE_STUDIES ]
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="inline-block px-2 py-0.5 text-text-muted hover:text-accent transition-colors duration-150">
                                    [ 03. /SERVICES_MODULES ]
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="inline-block px-2 py-0.5 text-text-muted hover:text-accent transition-colors duration-150">
                                    [ 04. /ABOUT_EXPERIENCE ]
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="inline-block px-2 py-0.5 text-text-muted hover:text-accent transition-colors duration-150">
                                    [ 05. /CONTACT_TERMINAL ]
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Comms Channel */}
                    <div className="term-card p-5 space-y-3">
                        <div className="text-text-main font-bold text-xs tracking-wider uppercase border-b border-border pb-2">
                            COMMS_COORDINATES
                        </div>
                        <ul className="space-y-2 text-text-muted">
                            <li>
                                <span className="text-text-main font-semibold">LOC :</span> Quezon City, Philippines
                            </li>
                            <li>
                                <span className="text-text-main font-semibold">MAIL:</span>{' '}
                                <a href="mailto:andreidilag12@gmail.com" className="text-text-main hover:text-accent transition-colors duration-150 break-all">
                                    andreidilag12@gmail.com
                                </a>
                            </li>
                        </ul>
                        <div className="pt-2 flex flex-wrap gap-2">
                            <a
                                href="https://github.com/YtterStick"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 border border-border bg-primary text-text-main hover:border-accent hover:text-accent font-bold transition-colors duration-150"
                            >
                                [ GITHUB ↗ ]
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 border border-border bg-primary text-text-main hover:border-accent hover:text-accent font-bold transition-colors duration-150"
                            >
                                [ LINKEDIN ↗ ]
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-text-muted text-[11px]">
                    <span>
                        // EOF &copy; {new Date().getFullYear()} ANDREI DILAG. ALL RIGHTS RESERVED.
                    </span>
                    <span className="text-text-muted">
                        WORKSTATION_OS // <span className="text-accent">UTF-8</span>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
