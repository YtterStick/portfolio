import { useState } from 'react';
import axios from 'axios';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [toast, setToast] = useState(null);
    const [copied, setCopied] = useState(false);

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => {
            setToast((prev) => (prev?.message === message ? null : prev));
        }, 5000);
    };

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('andreidilag12@gmail.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            showToast('error', 'Could not copy automatically — copy andreidilag12@gmail.com manually.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim()
        };

        if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
            showToast('error', 'Please fill out all required fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
            showToast('error', 'Please enter a valid email address.');
            return;
        }

        setStatus('sending');
        setToast(null);

        const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT || import.meta.env.NEXT_PUBLIC_FORM_ENDPOINT || '').trim();
        const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

        if (FORM_ENDPOINT) {
            try {
                const res = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify(trimmed)
                });
                if (res.ok) {
                    setStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    showToast('success', 'Message transmitted. I will respond within 24 hours.');
                    return;
                }
            } catch (err) {
                console.warn('Configured form endpoint failed; falling back...', err);
            }
        }

        if (API_BASE) {
            try {
                const res = await axios.post(`${API_BASE}/api/inquiries`, trimmed, {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 7000
                });
                if (res.status >= 200 && res.status < 300) {
                    setStatus('success');
                    setFormData({ name: '', email: '', subject: '', message: '' });
                    showToast('success', 'Message transmitted. I will respond within 24 hours.');
                    return;
                }
            } catch (apiError) {
                console.warn('Backend API unavailable; attempting FormSubmit fallback...', apiError?.message);
            }
        }

        try {
            const fallbackRes = await fetch('https://formsubmit.co/ajax/andreidilag12@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: trimmed.name,
                    email: trimmed.email,
                    _subject: `New Portfolio Message: ${trimmed.subject} from ${trimmed.name}`,
                    message: trimmed.message
                })
            });

            const data = await fallbackRes.json();
            if (fallbackRes.ok && (data.success === true || data.success === 'true' || data.message)) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                showToast('success', 'Message transmitted. I will respond within 24 hours.');
                return;
            }
        } catch (fallbackError) {
            console.error('Direct fallback delivery error:', fallbackError);
        }

        setStatus('error');
        showToast('error', 'Automated relay blocked on this network — use the direct email link below.');
    };

    return (
        <section id="contact" className="py-28 sm:py-40">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
                <div className="mb-16 max-w-3xl">
                    <div className="tech-label text-text-muted mb-3">
                        (06) CONTACT
                    </div>
                    <h2 className="display-serif text-text-main mb-5 text-balance">
                        Have an idea? <em>Let’s build it.</em>
                    </h2>
                    <p className="text-text-muted text-base sm:text-lg leading-relaxed">
                        Available for full-time engineering roles, contract architecture, and custom software builds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Editorial Coordinates & Copy Email */}
                    <div className="lg:col-span-5 editorial-card p-6 sm:p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="tech-label text-text-main border-b border-white/[0.08] pb-3 flex items-center justify-between">
                                <span>DIRECT CHANNELS</span>
                                <span className="text-[#34d399]">● AVAILABLE</span>
                            </div>

                            <div className="space-y-5">
                                <div className="p-4 bg-primary border border-white/[0.08]">
                                    <div className="tech-label text-text-muted mb-1.5">ELECTRONIC MAIL</div>
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <a
                                            href="mailto:andreidilag12@gmail.com"
                                            className="text-sm font-medium text-text-main hover:underline break-all"
                                        >
                                            andreidilag12@gmail.com ↗
                                        </a>
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className="px-3 py-1 border border-white/20 text-text-main hover:bg-white hover:text-primary tech-label cursor-pointer transition-colors"
                                        >
                                            {copied ? 'COPIED ✓' : 'COPY EMAIL'}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 bg-primary border border-white/[0.08]">
                                    <div className="tech-label text-text-muted mb-2">PROFILES &amp; NETWORK</div>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href="https://www.linkedin.com/in/andrei-dilag-79b018268/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3.5 py-1.5 border border-white/15 tech-label text-text-main hover:bg-white hover:text-primary transition-colors"
                                        >
                                            LINKEDIN ↗
                                        </a>
                                        <a
                                            href="https://github.com/YtterStick"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3.5 py-1.5 border border-white/15 tech-label text-text-main hover:bg-white hover:text-primary transition-colors"
                                        >
                                            GITHUB ↗
                                        </a>
                                        <a
                                            href="/andrei_dilag_resume.pdf"
                                            download="andrei_dilag_resume.pdf"
                                            className="px-3.5 py-1.5 border border-white/15 tech-label text-text-main hover:bg-white hover:text-primary transition-colors"
                                        >
                                            RESUME.PDF ↗
                                        </a>
                                    </div>
                                </div>

                                <div className="p-4 bg-primary border border-white/[0.08]">
                                    <div className="tech-label text-text-muted mb-1">BASE LOCATION</div>
                                    <div className="text-sm text-text-main">
                                        Quezon City, Metro Manila, Philippines (UTC+8)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-5 border-t border-white/[0.08]">
                            <div className="tech-label text-text-main mb-1">RESPONSE SLA</div>
                            <p className="text-xs text-text-muted leading-relaxed">
                                Replies within 24 hours for project inquiries, technical interviews, and architecture consultations.
                            </p>
                        </div>
                    </div>

                    {/* Right: Minimalist Editorial Form */}
                    <div className="lg:col-span-7 editorial-card p-6 sm:p-8">
                        <div className="tech-label text-text-main border-b border-white/[0.08] pb-3 mb-6 flex justify-between">
                            <span>SEND AN INQUIRY</span>
                            <span className="text-text-muted">DIRECT DISPATCH</span>
                        </div>

                        {status === 'success' ? (
                            <div className="p-10 bg-primary border border-white/20 text-center space-y-4">
                                <div className="font-serif italic text-3xl text-text-main">
                                    Message received.
                                </div>
                                <p className="text-text-muted text-sm max-w-md mx-auto">
                                    Thank you for reaching out. I will review your inquiry and reply within 24 hours.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('')}
                                    className="px-5 py-2.5 border border-white/25 text-text-main hover:bg-white hover:text-primary tech-label cursor-pointer transition-colors"
                                >
                                    SEND ANOTHER MESSAGE ↗
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block tech-label text-text-muted mb-2">
                                            (01) YOUR NAME
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-primary border border-white/15 px-4 py-3 text-text-main text-sm placeholder:text-text-muted/50"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    <div>
                                        <label className="block tech-label text-text-muted mb-2">
                                            (02) EMAIL ADDRESS
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-primary border border-white/15 px-4 py-3 text-text-main text-sm placeholder:text-text-muted/50"
                                            placeholder="founder@company.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block tech-label text-text-muted mb-2">
                                        (03) SUBJECT
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-primary border border-white/15 px-4 py-3 text-text-main text-sm placeholder:text-text-muted/50"
                                        placeholder="Project build, SaaS architecture, or hiring inquiry"
                                    />
                                </div>

                                <div>
                                    <label className="block tech-label text-text-muted mb-2">
                                        (04) MESSAGE
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full bg-primary border border-white/15 px-4 py-3 text-text-main text-sm resize-none placeholder:text-text-muted/50"
                                        placeholder="Share your project scope, timeline, or role details..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-text-main text-primary tech-label font-semibold py-4 hover:bg-white transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    {status === 'sending'
                                        ? 'TRANSMITTING MESSAGE...'
                                        : 'SEND MESSAGE ↗'}
                                </button>

                                {toast && (
                                    <div
                                        role="status"
                                        className="p-3.5 border border-white/25 bg-primary tech-label text-text-main text-center"
                                    >
                                        {toast.message}
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="p-4 bg-primary border border-white/25 text-center space-y-2.5">
                                        <p className="text-text-muted text-xs">
                                            Automated relay was blocked by your network connection.
                                        </p>
                                        <a
                                            href={`mailto:andreidilag12@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Andrei,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                                            className="inline-block px-4 py-2 border border-white/25 text-text-main hover:bg-white hover:text-primary tech-label transition-colors"
                                        >
                                            OPEN IN EMAIL CLIENT ↗
                                        </a>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
