import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import '../../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Mock login logic
        if (email.toLowerCase().includes('admin')) {
            navigate('/admin');
        } else if (email.toLowerCase().includes('faculty')) {
            navigate('/faculty');
        } else if (email.toLowerCase().includes('student')) {
            navigate('/student');
        } else {
            setError('Invalid credentials. Please check your email and password.');
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
                            gap: '0.5rem'
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

                    <button type="submit" className="auth-button">
                        <LogIn size={20} />
                        Sign In
                    </button>

                    <div className="auth-footer">
                        <p>Demo Credentials: <b>admin</b>, <b>faculty</b>, or <b>student</b> in email.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
