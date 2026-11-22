import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { projectsData } from '../../data/projects';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [currentProject, setCurrentProject] = useState({
        title: '',
        category: '',
        description: '',
        techStack: '',
        image: '',
        githubLink: '',
        liveLink: ''
    });

    const fetchProjects = async () => {
        try {
            const { data } = await axios.get('/api/projects');
            if (data && data.length > 0) {
                setProjects(data);
            } else {
                setProjects(projectsData);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects, using local data:', error);
            setProjects(projectsData);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => {
        setCurrentProject({ ...currentProject, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            ...currentProject,
            techStack: typeof currentProject.techStack === 'string'
                ? currentProject.techStack.split(',').map((s) => s.trim())
                : currentProject.techStack
        };

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            if (currentProject._id) {
                await axios.put(`/api/projects/${currentProject._id}`, projectData, config);
            } else {
                await axios.post('/api/projects', projectData, config);
            }

            fetchProjects();
            setIsEditing(false);
            resetForm();
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const resetForm = () => {
        setCurrentProject({
            title: '',
            category: '',
            description: '',
            techStack: '',
            image: '',
            githubLink: '',
            liveLink: ''
        });
    };

    const handleEdit = (project) => {
        setCurrentProject({
            ...project,
            techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('DELETE PROJECT RECORD?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`/api/projects/${id}`, config);
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    if (loading) return <div className="text-accent font-mono">[LOADING_PROJECTS...]</div>;

    return (
        <div className="space-y-6 font-mono text-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-text-main uppercase border-l-4 border-accent pl-3">
                    PROJECT_DIRECTORY_INDEX
                </h2>
                <button
                    type="button"
                    onClick={() => {
                        resetForm();
                        setIsEditing(true);
                    }}
                    className="bg-accent text-primary px-4 py-2 font-bold border border-accent hover:bg-primary hover:text-accent cursor-pointer transition-none"
                >
                    [ + NEW_PROJECT_ENTRY ]
                </button>
            </div>

            {isEditing && (
                <div className="bg-secondary p-6 border border-accent">
                    <h3 className="text-sm font-bold text-accent mb-4 uppercase">
                        {currentProject._id ? '&gt; EDIT_PROJECT_NODE' : '&gt; CREATE_PROJECT_NODE'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-accent font-bold mb-1">PROJECT_TITLE</label>
                                <input name="title" value={currentProject.title} onChange={handleChange} className="w-full bg-primary border border-border px-3 py-2 text-text-main outline-none focus:border-accent" required />
                            </div>
                            <div>
                                <label className="block text-accent font-bold mb-1">CATEGORY</label>
                                <input name="category" value={currentProject.category} onChange={handleChange} className="w-full bg-primary border border-border px-3 py-2 text-text-main outline-none focus:border-accent" required />
                            </div>
                            <div>
                                <label className="block text-accent font-bold mb-1">IMAGE_PATH</label>
                                <input name="image" value={currentProject.image} onChange={handleChange} className="w-full bg-primary border border-border px-3 py-2 text-text-main outline-none focus:border-accent" required />
                            </div>
                            <div>
                                <label className="block text-accent font-bold mb-1">TECH_STACK (CSV)</label>
                                <input name="techStack" value={currentProject.techStack} onChange={handleChange} className="w-full bg-primary border border-border px-3 py-2 text-text-main outline-none focus:border-accent" required />
                            </div>
                            <div>
                                <label className="block text-accent font-bold mb-1">GITHUB_URL</label>
                                <input name="githubLink" value={currentProject.githubLink} onChange={handleChange} className="w-full bg-primary border border-border px-3 py-2 text-text-main outline-none focus:border-accent" />
                            </div>
                            <div>
                                <label className="block text-accent font-bold mb-1">LIVE_URL</label>
                                <input name="liveLink" value={currentProject.liveLink} onChange={handleChange} className="w-full bg-primary border border-border px-3 py-2 text-text-main outline-none focus:border-accent" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-accent font-bold mb-1">DESCRIPTION</label>
                            <textarea name="description" value={currentProject.description} onChange={handleChange} rows="3" className="w-full bg-primary border border-border px-3 py-2 text-text-main outline-none focus:border-accent resize-none" required />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-primary border border-border text-text-muted hover:bg-accent hover:text-primary font-bold cursor-pointer transition-none">
                                [ CANCEL ]
                            </button>
                            <button type="submit" className="px-5 py-2 bg-accent text-primary font-bold border border-accent hover:bg-primary hover:text-accent cursor-pointer transition-none">
                                [ COMMIT_CHANGES ]
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div key={project._id} className="bg-secondary border border-border hover:border-accent p-4 flex gap-4 group">
                        <div className="w-24 h-20 dither-wrap border border-border shrink-0">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover dither-img" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="text-sm font-bold text-text-main uppercase">{project.title}</h4>
                                <p className="text-[10px] text-accent font-bold uppercase mb-1">[{project.category}]</p>
                                <div className="flex flex-wrap gap-1">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] bg-primary text-text-muted px-1.5 py-0.5 border border-border">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <button type="button" onClick={() => handleEdit(project)} className="px-2 py-1 bg-primary border border-border text-accent hover:bg-accent hover:text-primary font-bold cursor-pointer transition-none">
                                    [ EDIT ]
                                </button>
                                <button type="button" onClick={() => handleDelete(project._id)} className="px-2 py-1 bg-primary border border-border text-text-muted hover:bg-accent hover:text-primary font-bold cursor-pointer transition-none">
                                    [ DEL ]
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsManager;
