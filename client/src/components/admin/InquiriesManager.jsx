import { useState, useEffect } from 'react';
import axios from 'axios';
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
            const { data } = await axios.get('/api/inquiries', config);
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
            await axios.put(`/api/inquiries/${id}`, { status: newStatus }, config);
            fetchInquiries();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('DELETE INQUIRY RECORD?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`/api/inquiries/${id}`, config);
                fetchInquiries();
            } catch (error) {
                console.error('Error deleting inquiry:', error);
            }
        }
    };

    if (loading) return <div className="text-accent font-mono">[LOADING_INQUIRIES...]</div>;

    return (
        <div className="space-y-6 font-mono text-xs">
            <h2 className="text-xl font-bold text-text-main uppercase border-l-4 border-accent pl-3">
                CLIENT_INQUIRIES_LOG
            </h2>

            <div className="grid gap-4">
                {inquiries.length === 0 ? (
                    <p className="text-text-muted">[EMPTY] No inquiries found in database.</p>
                ) : (
                    inquiries.map((inquiry) => (
                        <div key={inquiry._id} className="bg-secondary p-5 border border-border hover:border-accent">
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-base font-bold text-text-main uppercase">{inquiry.name}</h3>
                                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-primary border border-accent text-accent">
                                            [{inquiry.status}]
                                        </span>
                                    </div>
                                    <div className="text-accent font-bold">
                                        &gt; SUBJECT: {inquiry.subject || 'NO_SUBJECT'}
                                    </div>
                                    <div className="text-text-muted">
                                        FROM: {inquiry.email} | DATE: {new Date(inquiry.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="bg-primary p-3 border border-border text-text-main">
                                        &quot;{inquiry.message}&quot;
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 justify-center min-w-[160px]">
                                    <select
                                        value={inquiry.status}
                                        onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                                        className="bg-primary border border-border text-text-main text-xs p-2 focus:border-accent outline-none"
                                    >
                                        <option value="new">STATUS: NEW</option>
                                        <option value="contacted">STATUS: CONTACTED</option>
                                        <option value="closed">STATUS: CLOSED</option>
                                    </select>

                                    <div className="flex gap-2">
                                        <a
                                            href={`mailto:${inquiry.email}`}
                                            className="flex-1 bg-accent text-primary font-bold py-2 text-xs text-center border border-accent hover:bg-primary hover:text-accent transition-none"
                                        >
                                            [ REPLY ]
                                        </a>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(inquiry._id)}
                                            className="px-3 py-2 bg-primary text-text-muted border border-border hover:bg-accent hover:text-primary font-bold cursor-pointer transition-none"
                                        >
                                            [ DEL ]
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
