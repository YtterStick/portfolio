import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';

const Home = () => {
    return (
        <div className="relative isolate overflow-hidden">
            {/* High-performance static ambient background rendered once by GPU */}
            <div
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.03] bg-[linear-gradient(rgba(99,102,241,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.4)_1px,transparent_1px)] bg-size-[80px_80px]"
            />
            <div
                className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 -z-10 w-[900px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)]"
            />

            <div className="relative z-10">
                <HeroSection />
            </div>
            <div className="relative z-10">
                <AboutSection />
            </div>
            <div className="relative z-10">
                <ProjectsSection />
            </div>
            <div className="relative z-10">
                <ContactSection />
            </div>
        </div>
    );
};

export default Home;
