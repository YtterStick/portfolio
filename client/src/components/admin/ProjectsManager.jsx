import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
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
            const { data } = await axios.get('http://localhost:5000/api/projects');
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
                ? currentProject.techStack.split(',').map(s => s.trim())
                : currentProject.techStack
        };

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            if (currentProject._id) {
                await axios.put(`http://localhost:5000/api/projects/${currentProject._id}`, projectData, config);
            } else {
                await axios.post('http://localhost:5000/api/projects', projectData, config);
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
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/projects/${id}`, config);
                fetchProjects();
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    if (loading) return <div className="text-accent animate-pulse">Loading projects...</div>;

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-white border-l-4 border-accent pl-4">Project Portfolio</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setIsEditing(true);
                    }}
                    className="bg-accent text-primary px-6 py-2.5 rounded-xl flex items-center gap-2 font-black hover:bg-accent-hover transition-all shadow-lg shadow-accent/20"
                >
                    <FaPlus /> Add New Project
                </button>
            </div>

            {isEditing && (
                <div className="bg-secondary/40 backdrop-blur-md p-8 rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        {currentProject._id ? <FaEdit className="text-accent" /> : <FaPlus className="text-accent" />}
                        {currentProject._id ? 'Edit Project' : 'Create New Project'}
                    </h3>
                    <form onSubmit={handleSubmit} className="relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project Title</label>
                                <input name="title" value={currentProject.title} onChange={handleChange} placeholder="e.g., Star Wash" className="w-full bg-primary/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                                <input name="category" value={currentProject.category} onChange={handleChange} placeholder="e.g., Thesis Project" className="w-full bg-primary/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Image URL</label>
                                <input name="image" value={currentProject.image} onChange={handleChange} placeholder="https://..." className="w-full bg-primary/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tech Stack (comma separated)</label>
                                <input name="techStack" value={currentProject.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="w-full bg-primary/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">GitHub Link</label>
                                <input name="githubLink" value={currentProject.githubLink} onChange={handleChange} placeholder="https://github.com/..." className="w-full bg-primary/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Link</label>
                                <input name="liveLink" value={currentProject.liveLink} onChange={handleChange} placeholder="https://..." className="w-full bg-primary/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all" />
                            </div>
                        </div>
                        <div className="space-y-2 mb-8">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Description</label>
                            <textarea name="description" value={currentProject.description} onChange={handleChange} placeholder="Detail your role, challenges, and solutions..." rows="4" className="w-full bg-primary/50 border border-gray-700/50 rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-all resize-none" required />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white font-bold transition-all">Cancel</button>
                            <button type="submit" className="bg-green-600/20 text-green-400 border border-green-500/30 px-8 py-2.5 rounded-xl font-black hover:bg-green-600 hover:text-white transition-all">
                                {currentProject._id ? 'Update Project' : 'Publish Project'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div key={project._id} className="bg-secondary/40 backdrop-blur-md rounded-2xl border border-gray-800 p-5 flex gap-5 group hover:border-accent/30 transition-all">
                        <div className="w-24 h-24 rounded-xl overflow-hidden shadow-inner flex-shrink-0 border border-gray-700">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <h4 className="text-lg font-bold text-white mb-1">{project.title}</h4>
                                <p className="text-xs text-accent font-bold uppercase tracking-wider mb-2">{project.category}</p>
                                <div className="flex flex-wrap gap-1.5 line-clamp-1">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] bg-primary/50 text-gray-400 px-2 py-0.5 rounded border border-gray-800">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && <span className="text-[10px] text-gray-600">+{project.techStack.length - 3}</span>}
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button onClick={() => handleEdit(project)} className="text-accent/60 hover:text-accent p-2 rounded-lg bg-accent/5 transition-all" title="Edit Project">
                                    <FaEdit size={16} />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="text-red-500/60 hover:text-red-500 p-2 rounded-lg bg-red-500/5 transition-all" title="Delete Project">
                                    <FaTrash size={16} />
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
