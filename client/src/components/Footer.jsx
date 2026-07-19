import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative z-10 bg-primary border-t border-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white tracking-tight">
                            Andrei<span className="text-accent">.</span>
                        </h3>
                        <p className="text-text-muted text-sm font-light max-w-xs leading-relaxed">
                            Full-stack developer building modern web and mobile applications.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 tracking-widest uppercase">Navigation</h4>
                        <ul className="space-y-2">
                            <li><a href="#hero" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm">Home</a></li>
                            <li><a href="#about" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm">About</a></li>
                            <li><a href="#projects" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm">Work</a></li>
                            <li><a href="#contact" className="text-text-muted hover:text-accent transition-colors duration-300 text-sm">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 tracking-widest uppercase">Contact</h4>
                        <ul className="space-y-2 text-text-muted text-sm">
                            <li className="font-light">Quezon City, Philippines</li>
                            <li><a href="tel:09150475513" className="hover:text-accent transition-colors duration-300">09150475513</a></li>
                            <li><a href="mailto:andreidilag12@gmail.com" className="hover:text-accent transition-colors duration-300">andreidilag12@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-text-muted/60 text-xs mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Andrei Dilag. All rights reserved.
                    </p>

                    <div className="flex space-x-5">
                        <SocialIcon href="https://github.com/YtterStick" icon={<FaGithub />} label="GitHub" />
                        <SocialIcon href="https://www.linkedin.com/in/andrei-dilag-79b018268/" icon={<FaLinkedin />} label="LinkedIn" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-muted hover:text-accent transition-colors duration-300 text-lg"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;
