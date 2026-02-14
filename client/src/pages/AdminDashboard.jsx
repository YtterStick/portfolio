import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectsManager from '../components/admin/ProjectsManager';
import InquiriesManager from '../components/admin/InquiriesManager';
import { FaProjectDiagram, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('inquiries');
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-primary flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-20 md:w-72 bg-secondary/30 backdrop-blur-3xl border-r border-gray-800 flex flex-col transition-all duration-300">
                <div className="p-6 mb-8 mt-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary font-black text-xl shadow-lg shadow-accent/20">
                            A
                        </div>
                        <h1 className="text-xl font-black text-white tracking-tighter hidden md:block">Console <span className="text-accent text-[8px] uppercase tracking-widest block font-bold -mt-1 opacity-50">Portfolio v2</span></h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('inquiries')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${activeTab === 'inquiries'
                                ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/10'
                                : 'text-gray-500 hover:bg-gray-800/50 hover:text-white'
                            }`}
                        title="Inquiries"
                    >
                        <FaEnvelope className={`${activeTab === 'inquiries' ? '' : 'text-accent/40 group-hover:text-accent'} transition-colors`} />
                        <span className="hidden md:block">Inquiries</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all group ${activeTab === 'projects'
                                ? 'bg-accent text-primary font-bold shadow-lg shadow-accent/10'
                                : 'text-gray-500 hover:bg-gray-800/50 hover:text-white'
                            }`}
                        title="Projects"
                    >
                        <FaProjectDiagram className={`${activeTab === 'projects' ? '' : 'text-accent/40 group-hover:text-accent'} transition-colors`} />
                        <span className="hidden md:block">Projects</span>
                    </button>
                </nav>

                <div className="p-4 mt-auto mb-6">
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-all group"
                        title="Logout"
                    >
                        <FaSignOutAlt />
                        <span className="hidden md:block">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-primary relative custom-scrollbar">
                {/* Header/Title Bar */}
                <header className="sticky top-0 z-30 bg-primary/80 backdrop-blur-md border-b border-gray-800/50 px-8 py-6 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-white tracking-tight first-letter:text-accent uppercase text-xs tracking-widest opacity-60">
                        {activeTab} Management
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-blue-500 p-[1px]">
                            <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">AD</div>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-6xl mx-auto">
                    <div className="animate-in fade-in duration-700">
                        {activeTab === 'inquiries' ? <InquiriesManager /> : <ProjectsManager />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
