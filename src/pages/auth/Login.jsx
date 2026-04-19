import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import '../../styles/auth.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useData } from '../../context/DataContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { data } = useData();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate async auth check and use real seeded users if available
        setTimeout(() => {
            setLoading(false);
            
            // Allow logging in with just the username (e.g. 'jane.smith') instead of full email
            const searchEmail = email.includes('@') ? email : `${email}@uni.edu`;
            
            const found = data.users.find(u => u.email.toLowerCase() === searchEmail.toLowerCase());
            if (found) {
                if (found.role === 'admin') navigate('/admin');
                else if (found.role === 'faculty') navigate('/faculty');
                else if (found.role === 'student') navigate('/student');
                else setError('Unknown role for this account.');
            } else {
                setError('Invalid credentials. Please enter a seeded user email (see demo list).');
            }
        }, 600);
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

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? <LoadingSpinner size={18} /> : <LogIn size={20} />}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="auth-footer">
                        <p>Demo accounts (use email):</p>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.9rem' }}>
                            <li><b>Admin:</b> admin@uni.edu</li>
                            <li><b>Faculty:</b> jane.smith@uni.edu, robert.brown@uni.edu, emily.clarke@uni.edu</li>
                            <li><b>Students:</b> alice.williams@uni.edu, bob.johnson@uni.edu, charlie.davies@uni.edu</li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
