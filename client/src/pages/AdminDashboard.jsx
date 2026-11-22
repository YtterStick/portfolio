import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProjectsManager from '../components/admin/ProjectsManager';
import InquiriesManager from '../components/admin/InquiriesManager';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('inquiries');
    const { logout } = useAuth();

    return (
        <div className="min-h-screen bg-primary flex flex-col md:flex-row font-mono text-xs">
            {/* Terminal Sidebar */}
            <aside className="w-full md:w-64 bg-secondary border-b md:border-b-0 md:border-r border-border flex flex-col">
                <div className="p-4 border-b border-border bg-primary">
                    <div className="text-text-main font-bold">SYS://ADMIN_CONSOLE</div>
                    <div className="text-[10px] text-accent">PORTFOLIO_OS v2.6</div>
                </div>

                <nav className="flex md:flex-col p-3 gap-2 flex-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab('inquiries')}
                        className={`flex-1 md:flex-none text-left px-3 py-2.5 border font-bold cursor-pointer transition-colors duration-150 ${
                            activeTab === 'inquiries'
                                ? 'bg-primary text-accent border-accent'
                                : 'bg-primary text-text-muted border-border hover:text-text-main'
                        }`}
                    >
                        [ 01. INQUIRIES {activeTab === 'inquiries' ? '█' : ''} ]
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab('projects')}
                        className={`flex-1 md:flex-none text-left px-3 py-2.5 border font-bold cursor-pointer transition-colors duration-150 ${
                            activeTab === 'projects'
                                ? 'bg-primary text-accent border-accent'
                                : 'bg-primary text-text-muted border-border hover:text-text-main'
                        }`}
                    >
                        [ 02. PROJECTS {activeTab === 'projects' ? '█' : ''} ]
                    </button>
                </nav>

                <div className="p-3 border-t border-border">
                    <button
                        type="button"
                        onClick={logout}
                        className="w-full px-3 py-2 bg-primary border border-border text-text-muted hover:border-accent hover:text-accent font-bold cursor-pointer transition-colors duration-150"
                    >
                        [ LOGOUT_SESSION ]
                    </button>
                </div>
            </aside>

            {/* Main Terminal Pane */}
            <main className="flex-1 overflow-y-auto bg-primary">
                <header className="sticky top-0 z-30 bg-secondary border-b border-border px-6 py-3 flex justify-between items-center">
                    <h2 className="text-xs font-bold text-text-main uppercase">
                        /VAR/ADM/{activeTab.toUpperCase()}
                    </h2>
                    <span className="px-2 py-0.5 bg-primary border border-border text-accent font-bold text-[10px]">
                        ROOT: AD
                    </span>
                </header>

                <div className="p-6 max-w-6xl mx-auto">
                    {activeTab === 'inquiries' ? <InquiriesManager /> : <ProjectsManager />}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
