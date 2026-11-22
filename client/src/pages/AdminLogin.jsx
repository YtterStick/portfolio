import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'ERROR: ACCESS_DENIED — INVALID_CREDENTIALS');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-6 font-mono text-xs">
            <div className="w-full max-w-md term-card">
                <div className="bg-primary border-b border-border px-5 py-3 flex justify-between items-center">
                    <span className="text-text-main font-bold">ROOT_AUTH // /ADMIN/LOGIN</span>
                    <span className="text-accent text-[10px]">● SSH_TTY</span>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    <div>
                        <h1 className="text-xl font-bold text-text-main uppercase mb-1">
                            SYSTEM_ADMIN_CONSOLE
                        </h1>
                        <p className="text-text-muted">
                            Authentication required to access portfolio database.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-primary border border-accent text-accent font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-text-main font-bold mb-1.5">
                                &gt; ADMIN_EMAIL:_
                            </label>
                            <input
                                type="email"
                                required
                                className="w-full bg-primary border border-border px-3.5 py-2.5 text-text-main outline-none focus:border-accent"
                                placeholder="admin@andrei.dev"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-text-main font-bold mb-1.5">
                                &gt; SECRET_KEY:_
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full bg-primary border border-border px-3.5 py-2.5 text-text-main outline-none focus:border-accent"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary text-accent font-bold py-3 border border-accent hover:bg-accent hover:text-primary transition-colors duration-150 cursor-pointer disabled:opacity-50"
                        >
                            {isLoading ? '[ AUTHENTICATING... ]' : '[ AUTHENTICATE --LOGIN -> ]'}
                        </button>
                    </form>

                    <div className="pt-4 border-t border-border text-center">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="px-3.5 py-1.5 bg-primary border border-border text-text-muted hover:border-accent hover:text-accent font-bold cursor-pointer transition-colors duration-150"
                        >
                            [ &lt;- RETURN_TO_PORTFOLIO ]
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
