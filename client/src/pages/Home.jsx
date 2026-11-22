import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
    return (
        <div className="relative isolate overflow-hidden bg-primary text-text-main font-mono">
            {/* Subtle architectural workstation grid */}
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035] bg-[linear-gradient(#f3f4f6_1px,transparent_1px),linear-gradient(90deg,#f3f4f6_1px,transparent_1px)] bg-size-[48px_48px]"
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
