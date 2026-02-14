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
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post('http://localhost:5000/api/inquiries', formData, config);
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Inquiry error:', error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-secondary relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Have a project in mind or want to discuss a collaboration? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="bg-primary/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-800 h-full">
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg text-accent">
                                        <FaPhoneAlt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Phone</p>
                                        <a href="tel:09150475513" className="text-white hover:text-accent transition-colors font-medium">
                                            09150475513
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg text-accent">
                                        <FaEnvelope size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Email</p>
                                        <a href="mailto:andreidilag12@gmail.com" className="text-white hover:text-accent transition-colors font-medium break-all">
                                            andreidilag12@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-accent/10 p-3 rounded-lg text-accent">
                                        <FaMapMarkerAlt size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Location</p>
                                        <p className="text-white font-medium">
                                            Quezon City, Philippines
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h4 className="text-white font-semibold mb-4">Availability</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    I am currently available for freelance projects and internships.
                                    Feel free to reach out!
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-primary p-8 md:p-10 rounded-2xl shadow-xl border border-gray-800 relative min-h-[500px] flex flex-col justify-center">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <motion.div
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                        >
                                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">Message Dispatched!</h3>
                                    <p className="text-gray-400 text-lg max-w-sm mx-auto">
                                        Thank you for reaching out. I've received your inquiry and will respond within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setStatus('')}
                                        className="mt-8 text-accent font-bold hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-secondary border border-gray-700/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                                                placeholder="Your Full Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-secondary border border-gray-700/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-secondary border border-gray-700/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-gray-600"
                                            placeholder="What is this about?"
                                        />
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-gray-400 text-sm font-medium mb-2 uppercase tracking-widest">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows="4"
                                            className="w-full bg-secondary border border-gray-700/50 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none placeholder:text-gray-600"
                                            placeholder="Write your message here..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full bg-accent text-primary font-black py-5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group shadow-lg shadow-accent/10"
                                    >
                                        {status === 'sending' ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Sending Message...
                                            </span>
                                        ) : (
                                            <>
                                                Send Message
                                                <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>

                                    {status === 'error' && (
                                        <p className="mt-4 text-red-500 text-center text-sm font-medium">
                                            Ops! Something went wrong. Please try again.
                                        </p>
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
