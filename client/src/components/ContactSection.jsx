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
            showToast('error', 'ERROR: CLIPBOARD_ACCESS_DENIED — COPY andreidilag12@gmail.com MANUALLY');
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
            showToast('error', 'ERROR: MISSING_ARGS — ALL_FIELDS_REQUIRED');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
            showToast('error', 'ERROR: SYNTAX_ERR — INVALID_EMAIL_FORMAT');
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
                    showToast('success', 'SUCCESS: MESSAGE TRANSMITTED // ACK_200');
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
                    showToast('success', 'SUCCESS: MESSAGE TRANSMITTED // ACK_200');
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
                showToast('success', 'SUCCESS: MESSAGE TRANSMITTED // ACK_200');
                return;
            }
        } catch (fallbackError) {
            console.error('Direct fallback delivery error:', fallbackError);
        }

        setStatus('error');
        showToast('error', 'WARN: AUTO_RELAY_BLOCKED // USE_DIRECT_MAILTO_BELOW');
    };

    return (
        <section id="contact" className="py-24 sm:py-32 bg-primary font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 term-card p-6 sm:p-8">
                    <div className="text-xs text-accent font-bold mb-1.5">
                        root@andrei-dev:/dev/tcp/contact# ./open_comms_channel.sh
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-text-main uppercase text-balance">
                        05 // INITIATE_TRANSMISSION (CONTACT)
                    </h2>
                    <p className="text-text-muted text-xs sm:text-sm mt-1.5 text-balance">
                        Available for full-time engineering roles, contract architecture, and custom software builds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Terminal Connection Coordinates */}
                    <div className="lg:col-span-5 term-card p-6 sm:p-7 flex flex-col justify-between">
                        <div className="space-y-5">
                            <div className="text-xs text-text-main font-bold border-b border-border pb-2.5 flex items-center justify-between">
                                <span>CONNECTION_ENDPOINTS</span>
                                <span className="text-accent text-[10px]">● READY</span>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div className="p-3.5 bg-primary border border-border">
                                    <div className="text-[10px] text-text-muted">VOICE_TEL_ENDPOINT:</div>
                                    <a
                                        href="tel:+639150475513"
                                        className="text-sm font-bold text-text-main hover:text-accent inline-block mt-1 transition-colors duration-150"
                                    >
                                        +63 915 047 5513
                                    </a>
                                </div>

                                <div className="p-3.5 bg-primary border border-border">
                                    <div className="text-[10px] text-text-muted">SMTP_MAIL_ENDPOINT:</div>
                                    <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                                        <a
                                            href="mailto:andreidilag12@gmail.com"
                                            className="text-xs sm:text-sm font-bold text-text-main hover:text-accent transition-colors duration-150 break-all"
                                        >
                                            andreidilag12@gmail.com
                                        </a>
                                        <button
                                            type="button"
                                            onClick={handleCopyEmail}
                                            className="px-2.5 py-1 bg-secondary border border-accent text-accent hover:bg-accent hover:text-primary text-[10px] font-bold cursor-pointer transition-colors duration-150"
                                        >
                                            {copied ? '[ COPIED! ]' : '[ COPY ]'}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-3.5 bg-primary border border-border">
                                    <div className="text-[10px] text-text-muted">PHYSICAL_NODE:</div>
                                    <div className="text-sm font-bold text-text-main mt-1">
                                        Quezon City, Metro Manila, PH
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-7 pt-4 border-t border-border text-xs">
                            <div className="text-accent font-bold mb-1">STATUS: READY_FOR_DISPATCH</div>
                            <p className="text-text-muted leading-relaxed">
                                Response SLA: &lt; 24 hours for project inquiries, technical interviews, and architecture consultations.
                            </p>
                        </div>
                    </div>

                    {/* Right: Command-Line Contact Form */}
                    <div className="lg:col-span-7 term-card p-6 sm:p-8">
                        <div className="text-xs text-text-main font-bold border-b border-border pb-2.5 mb-6 flex justify-between">
                            <span>/BIN/SEND_PACKET --INTERACTIVE</span>
                            <span className="text-text-muted">TTY_INPUT</span>
                        </div>

                        {status === 'success' ? (
                            <div className="p-8 bg-primary border border-accent text-center space-y-4">
                                <div className="text-accent font-bold text-base sm:text-lg">
                                    SUCCESS: MESSAGE TRANSMITTED // ACK_200
                                </div>
                                <p className="text-text-muted text-xs max-w-md mx-auto">
                                    Packet logged. I will review your transmission and reply within 24 hours.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setStatus('')}
                                    className="px-4 py-2 bg-primary text-accent font-bold text-xs border border-accent hover:bg-accent hover:text-primary cursor-pointer transition-colors duration-150"
                                >
                                    [ + SEND_ANOTHER_PACKET ]
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-text-main font-bold mb-1.5">
                                            &gt; ENTER_NAME:_
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-primary border border-border px-3.5 py-2.5 text-text-main text-xs focus:outline-none focus:border-accent placeholder:text-text-muted/50"
                                            placeholder="JANE_DOE"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-text-main font-bold mb-1.5">
                                            &gt; ENTER_EMAIL:_
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-primary border border-border px-3.5 py-2.5 text-text-main text-xs focus:outline-none focus:border-accent placeholder:text-text-muted/50"
                                            placeholder="founder@company.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-text-main font-bold mb-1.5">
                                        &gt; ENTER_SUBJECT:_
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-primary border border-border px-3.5 py-2.5 text-text-main text-xs focus:outline-none focus:border-accent placeholder:text-text-muted/50"
                                        placeholder="PROJECT_BUILD // HIRING_INQUIRY"
                                    />
                                </div>

                                <div>
                                    <label className="block text-text-main font-bold mb-1.5">
                                        &gt; ENTER_MESSAGE_PAYLOAD:_
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="4"
                                        className="w-full bg-primary border border-border px-3.5 py-2.5 text-text-main text-xs focus:outline-none focus:border-accent resize-none placeholder:text-text-muted/50"
                                        placeholder="Type project scope, timeline, or role details..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-primary text-accent font-bold py-3.5 border border-accent hover:bg-accent hover:text-primary transition-colors duration-150 cursor-pointer disabled:opacity-50"
                                >
                                    {status === 'sending'
                                        ? '[ TRANSMITTING_PACKET... PLEASE_WAIT ]'
                                        : '[ TRANSMIT_MESSAGE --EXECUTE -> ]'}
                                </button>

                                {toast && (
                                    <div
                                        role="status"
                                        className={`p-3.5 border text-xs font-bold text-center ${
                                            toast.type === 'success'
                                                ? 'bg-primary border-accent text-accent'
                                                : 'bg-primary border-text-main text-text-main'
                                        }`}
                                    >
                                        {toast.message}
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="p-4 bg-primary border border-accent text-center space-y-2.5">
                                        <p className="text-text-main text-xs">
                                            FALLBACK_READY: Automated relay blocked by network policy.
                                        </p>
                                        <a
                                            href={`mailto:andreidilag12@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Andrei,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                                            className="inline-block px-4 py-2 bg-primary border border-accent text-accent hover:bg-accent hover:text-primary font-bold text-xs transition-colors duration-150"
                                        >
                                            [ LAUNCH_DEFAULT_MAIL_CLIENT ↗ ]
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
