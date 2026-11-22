const LIVE_SITE_URL = import.meta.env.VITE_SITE_URL || 'https://portfolio-tnu.pages.dev';
const LIVE_SITE_LABEL = LIVE_SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

const Footer = () => {
    return (
        <footer className="relative z-10 bg-primary border-t border-border pt-10 pb-8 font-mono text-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ASCII Top Divider */}
                <div className="text-text-muted overflow-hidden whitespace-nowrap mb-8 select-none text-[11px]">
                    ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* System Node */}
                    <div className="border border-border bg-secondary p-4 space-y-2.5">
                        <div className="text-accent font-bold">
                            +--[ SYS_NODE // ANDREI.DEV ]--+
                        </div>
                        <p className="text-text-muted leading-relaxed">
                            Full-stack software engineer &amp; IT educator building scalable web apps, AI workflows, and enterprise tools.
                        </p>
                        <div>
                            <a
                                href={LIVE_SITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-2 py-1 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary font-bold transition-none"
                            >
                                [ HOST: {LIVE_SITE_LABEL} ↗ ]
                            </a>
                        </div>
                    </div>

                    {/* Directory Links */}
                    <div className="border border-border bg-secondary p-4 space-y-2.5">
                        <div className="text-accent font-bold">
                            +--[ DIRECTORY_INDEX ]---------+
                        </div>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="#hero" className="inline-block px-1.5 py-0.5 text-text-main hover:bg-accent hover:text-primary transition-none">
                                    [ 01. /HOME ]
                                </a>
                            </li>
                            <li>
                                <a href="#projects" className="inline-block px-1.5 py-0.5 text-text-main hover:bg-accent hover:text-primary transition-none">
                                    [ 02. /WORK_CASE_STUDIES ]
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="inline-block px-1.5 py-0.5 text-text-main hover:bg-accent hover:text-primary transition-none">
                                    [ 03. /ABOUT_GIT_LOG ]
                                </a>
                            </li>
                            <li>
                                <a href="#services" className="inline-block px-1.5 py-0.5 text-text-main hover:bg-accent hover:text-primary transition-none">
                                    [ 04. /SERVICES_MODULES ]
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="inline-block px-1.5 py-0.5 text-text-main hover:bg-accent hover:text-primary transition-none">
                                    [ 05. /CONTACT_TERMINAL ]
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Comms Channel */}
                    <div className="border border-border bg-secondary p-4 space-y-2.5">
                        <div className="text-accent font-bold">
                            +--[ COMMS_COORDINATES ]-------+
                        </div>
                        <ul className="space-y-1.5 text-text-main">
                            <li>LOC : Quezon City, Philippines</li>
                            <li>
                                TEL :{' '}
                                <a href="tel:+639150475513" className="text-accent hover:bg-accent hover:text-primary px-1 transition-none">
                                    +63 915 047 5513
                                </a>
                            </li>
                            <li>
                                MAIL:{' '}
                                <a href="mailto:andreidilag12@gmail.com" className="text-accent hover:bg-accent hover:text-primary px-1 transition-none break-all">
                                    andreidilag12@gmail.com
                                </a>
                            </li>
                        </ul>
                        <div className="pt-2 flex flex-wrap gap-2">
                            <a
                                href="https://github.com/YtterStick"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 border border-border bg-primary text-text-main hover:bg-accent hover:text-primary hover:border-accent font-bold transition-none"
                            >
                                [ GITHUB ↗ ]
                            </a>
                            <a
                                href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 border border-border bg-primary text-text-main hover:bg-accent hover:text-primary hover:border-accent font-bold transition-none"
                            >
                                [ LINKEDIN ↗ ]
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="border-t border-border pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-text-muted text-[11px]">
                    <span>
                        // EOF &copy; {new Date().getFullYear()} ANDREI DILAG. ALL RIGHTS RESERVED.
                    </span>
                    <span className="text-accent">
                        [ MODE: RETRO_ASCII_TERMINAL // UTF-8 ]
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
