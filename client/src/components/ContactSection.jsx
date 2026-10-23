import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
        const apiEndpoint = API_BASE ? `${API_BASE}/api/inquiries` : '/api/inquiries';

        // Tier 1: Attempt backend API (/api/inquiries or configured VITE_API_URL)
        let backendSuccess = false;
        try {
            const res = await axios.post(apiEndpoint, formData, {
                headers: { 'Content-Type': 'application/json' },
                timeout: 7000
            });
            if (res.status >= 200 && res.status < 300) {
                backendSuccess = true;
            }
        } catch (apiError) {
            console.warn('Backend API submission skipped or unavailable; attempting direct delivery fallback...', apiError?.message);
        }

        if (backendSuccess) {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            return;
        }

        // Tier 2: Automatic failover to direct email delivery (FormSubmit -> andreidilag12@gmail.com)
        try {
            const fallbackRes = await fetch('https://formsubmit.co/ajax/andreidilag12@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    _subject: `New Portfolio Message: ${formData.subject || 'No Subject'} from ${formData.name}`,
                    message: formData.message
                })
            });

            const data = await fallbackRes.json();
            if (fallbackRes.ok && (data.success === true || data.success === 'true' || data.message)) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                return;
            }
        } catch (fallbackError) {
            console.error('Direct fallback delivery error:', fallbackError);
        }

        // Tier 3: If network error or adblocker prevented automated delivery
        setStatus('error');
    };

    return (
        <section id="contact" className="py-16 sm:py-28 bg-secondary relative overflow-hidden">
            {/* Background Decorations — GPU accelerated */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 sm:mb-6">Get In Touch</h2>
                    <p className="text-text-muted max-w-2xl mx-auto text-sm sm:text-lg font-light px-2">
                        Whether you need a full-stack developer for your team or a partner for your next project, I'd like to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="bg-primary/60 backdrop-blur-sm p-5 sm:p-8 rounded-2xl border border-border h-full">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg text-accent">
                                        <FaPhoneAlt size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted mb-1 tracking-widest uppercase">Phone</p>
                                        <a href="tel:09150475513" className="text-white hover:text-accent transition-colors duration-300 font-medium text-sm">
                                            09150475513
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg text-accent">
                                        <FaEnvelope size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted mb-1 tracking-widest uppercase">Email</p>
                                        <a href="mailto:andreidilag12@gmail.com" className="text-white hover:text-accent transition-colors duration-300 font-medium text-sm break-all">
                                            andreidilag12@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg text-accent">
                                        <FaMapMarkerAlt size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-text-muted mb-1 tracking-widest uppercase">Location</p>
                                        <p className="text-white font-medium text-sm">
                                            Quezon City, Philippines
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-6 border-t border-border">
                                <h4 className="text-white font-semibold mb-3 text-sm">Availability</h4>
                                <p className="text-text-muted text-sm leading-relaxed font-light">
                                    Currently available for full-time roles, contract work, and select freelance projects.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-primary p-5 sm:p-8 md:p-10 rounded-2xl border border-border relative min-h-125 flex flex-col justify-center">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                                        <motion.div
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white">Message Sent</h3>
                                    <p className="text-text-muted max-w-sm mx-auto font-light">
                                        Thank you for reaching out. I'll review your message and respond within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus('')}
                                        className="mt-6 text-accent font-semibold hover:underline text-sm"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                                        <div>
                                            <label className="block text-text-muted text-xs font-medium mb-1.5 sm:mb-2 tracking-[0.15em] uppercase">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 placeholder:text-text-muted/40"
                                                placeholder="Your Full Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-text-muted text-xs font-medium mb-1.5 sm:mb-2 tracking-[0.15em] uppercase">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-secondary border border-border rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 placeholder:text-text-muted/40"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 sm:mb-6">
                                        <label className="block text-text-muted text-xs font-medium mb-1.5 sm:mb-2 tracking-[0.15em] uppercase">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 placeholder:text-text-muted/40"
                                            placeholder="What is this about?"
                                        />
                                    </div>

                                    <div className="mb-6 sm:mb-8">
                                        <label className="block text-text-muted text-xs font-medium mb-1.5 sm:mb-2 tracking-[0.15em] uppercase">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full bg-secondary border border-border rounded-lg px-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 resize-none placeholder:text-text-muted/40"
                                            placeholder="Write your message here..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full bg-accent text-white font-semibold py-4 rounded-lg hover:bg-accent-hover transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {status === 'sending' ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending...
                                            </span>
                                        ) : (
                                            <>
                                                Send Message
                                                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 text-sm" />
                                            </>
                                        )}
                                    </button>

                                    {status === 'error' && (
                                        <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-center space-y-2">
                                            <p className="text-red-300 text-sm font-medium">
                                                Could not send message automatically over this connection.
                                            </p>
                                            <a
                                                href={`mailto:andreidilag12@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Andrei,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                                                className="inline-flex items-center gap-2 text-accent hover:underline text-sm font-semibold"
                                            >
                                                <FaEnvelope size={14} /> Click to send directly via your email app
                                            </a>
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
