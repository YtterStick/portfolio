const LIVE_SITE_URL = import.meta.env.VITE_SITE_URL || 'https://portfolio-tnu.pages.dev';
const LIVE_SITE_LABEL = LIVE_SITE_URL.replace(/^https?:\/\//, '').replace(/\/$/, '');

const Footer = () => {
    return (
        <footer className="relative z-10 border-t border-white/[0.08] py-14">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-1.5">
                        <div className="tech-label text-text-main">
                            ANDREI DILAG — FULL-STACK ENGINEER &amp; IT FACULTY
                        </div>
                        <p className="text-xs text-text-muted">
                            Quezon City, Metro Manila, Philippines •{' '}
                            <a
                                href={LIVE_SITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-text-main hover:underline"
                            >
                                {LIVE_SITE_LABEL} ↗
                            </a>
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 tech-label">
                        <a
                            href="https://github.com/YtterStick"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-text-main transition-colors"
                        >
                            GITHUB ↗
                        </a>
                        <a
                            href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-muted hover:text-text-main transition-colors"
                        >
                            LINKEDIN ↗
                        </a>
                        <a
                            href="/andrei_dilag_resume.pdf"
                            download="andrei_dilag_resume.pdf"
                            className="text-text-muted hover:text-text-main transition-colors"
                        >
                            RESUME.PDF ↗
                        </a>
                        <a
                            href="#hero"
                            className="text-text-muted hover:text-text-main transition-colors"
                        >
                            TOP ↑
                        </a>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-2 tech-label text-text-muted">
                    <span>&copy; {new Date().getFullYear()} ANDREI DILAG. ALL RIGHTS RESERVED.</span>
                    <span>EDITION // 2026</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
