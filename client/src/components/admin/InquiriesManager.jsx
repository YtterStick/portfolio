import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEnvelope, FaTag } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const InquiriesManager = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchInquiries = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get('http://localhost:5000/api/inquiries', config);
            setInquiries(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`http://localhost:5000/api/inquiries/${id}`, { status: newStatus }, config);
            fetchInquiries();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inquiry?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/inquiries/${id}`, config);
                fetchInquiries();
            } catch (error) {
                console.error('Error deleting inquiry:', error);
            }
        }
    };

    if (loading) return <div className="text-accent animate-pulse">Loading inquiries...</div>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8 border-l-4 border-accent pl-4">Client Inquiries</h2>

            <div className="grid gap-6">
                {inquiries.length === 0 ? (
                    <p className="text-gray-500 italic">No inquiries found in the database.</p>
                ) : (
                    inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-secondary/40 backdrop-blur-md p-6 rounded-2xl border border-gray-800 hover:border-accent/30 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/10 transition-colors"></div>

                            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-bold text-white">{inquiry.name}</h3>
                                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full ${inquiry.status === 'new' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            inquiry.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                'bg-gray-700/50 text-gray-400 border border-gray-600'
                                            }`}>
                                            {inquiry.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3 text-accent text-sm font-bold">
                                        <FaTag size={10} /> {inquiry.subject || 'No Subject'}
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                                        <span className="flex items-center gap-1.5"><FaEnvelope className="text-accent/50" /> {inquiry.email}</span>
                                        <span className="text-gray-600">|</span>
                                        <span>Sent on {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <div className="bg-primary/30 p-4 rounded-xl border border-gray-800/50 text-gray-300 leading-relaxed italic">
                                        "{inquiry.message}"
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 justify-center min-w-[160px]">
                                    <select
                                        value={inquiry.status}
                                        onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                                        className="bg-primary border border-gray-700 text-white text-xs rounded-lg p-2.5 focus:ring-accent focus:border-accent block w-full outline-none transition-all"
                                    >
                                        <option value="new">Mark as New</option>
                                        <option value="contacted">Mark as Contacted</option>
                                        <option value="closed">Mark as Closed</option>
                                    </select>

                                    <div className="flex gap-2">
                                        <a href={`mailto:${inquiry.email}`} className="flex-1 bg-accent text-primary font-bold py-2 rounded-lg text-xs hover:bg-accent-hover transition-colors flex items-center justify-center gap-2">
                                            <FaEnvelope size={12} /> Reply
                                        </a>
                                        <button onClick={() => handleDelete(inquiry._id)} className="bg-red-500/10 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-500/20">
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default InquiriesManager;
