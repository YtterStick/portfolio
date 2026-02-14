import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-primary/95 border-t border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-tighter">
                            Andrei<span className="text-accent">.</span>
                        </h3>
                        <p className="text-gray-400 max-w-xs">
                            Crafting digital experiences with code and creativity.
                            Building the future, one pixel at a time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#hero" className="text-gray-400 hover:text-accent transition-colors">Home</a></li>
                            <li><a href="#about" className="text-gray-400 hover:text-accent transition-colors">About</a></li>
                            <li><a href="#projects" className="text-gray-400 hover:text-accent transition-colors">Projects</a></li>
                            <li><a href="#contact" className="text-gray-400 hover:text-accent transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact - Redundant but useful */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Quezon City, Philippines</li>
                            <li><a href="tel:09150475513" className="hover:text-accent transition-colors">09150475513</a></li>
                            <li><a href="mailto:andreidilag12@gmail.com" className="hover:text-accent transition-colors">andreidilag12@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Andrei Dilag. All rights reserved.
                    </p>

                    <div className="flex space-x-6">
                        <SocialIcon href="https://github.com/YtterStick" icon={<FaGithub />} label="GitHub" />
                        <SocialIcon href="https://www.linkedin.com/in/andrei-dilag-79b018268/" icon={<FaLinkedin />} label="LinkedIn" />
                        <SocialIcon href="#" icon={<FaTwitter />} label="Twitter" />
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-600 text-xs flex items-center justify-center gap-1">
                    Made with <FaHeart className="text-red-500" /> using React & Tailwind
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
        className="text-gray-400 hover:text-white transition-colors text-xl"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Footer;
