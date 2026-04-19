import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import '../../styles/auth.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login, error, setError } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const resultUser = await login(email, password);
        
        if (resultUser) {
            if (resultUser.role === 'admin') navigate('/admin');
            else if (resultUser.role === 'faculty') navigate('/faculty');
            else if (resultUser.role === 'student') navigate('/student');
            else setError('Unknown role for this account.');
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your account</p>
                </div>

                <form onSubmit={handleLogin} className="auth-form">
                    {error && (
                        <div style={{
                            backgroundColor: '#FEF2F2',
                            color: '#EF4444',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '1rem'
                        }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" />
                            <input
                                type="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" />
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? <LoadingSpinner size={18} /> : <LogIn size={20} />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="auth-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: 500, textDecoration: 'none' }}>Sign Up here</Link>
                        </p>
                    </div>

                    <div className="auth-footer" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'left', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Demo accounts (Password: password123):</p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <li><b>Admin:</b> admin@uni.edu</li>
                            <li><b>Faculty:</b> jane.smith@uni.edu</li>
                            <li><b>Student:</b> alice.williams@uni.edu</li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
