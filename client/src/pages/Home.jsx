import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
    return (
        <div className="relative isolate overflow-hidden bg-primary text-text-main font-mono">
            {/* Strict monochrome pixel grid & CRT scanline overlay */}
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.07] bg-[linear-gradient(#33ff33_1px,transparent_1px),linear-gradient(90deg,#33ff33_1px,transparent_1px)] bg-size-[32px_32px]"
            />
            <div
                className="pointer-events-none fixed inset-0 z-40 opacity-[0.04] bg-[linear-gradient(to_bottom,transparent_50%,#000000_50%)] bg-size-[100%_4px]"
            />

            <div className="relative z-10">
                <HeroSection />
            </div>
            <div className="relative z-10">
                <ProjectsSection />
            </div>
            <div className="relative z-10">
                <AboutSection />
            </div>
            <div className="relative z-10">
                <ContactSection />
            </div>
        </div>
    );
};

export default Home;
