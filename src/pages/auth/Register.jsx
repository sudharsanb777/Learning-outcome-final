import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, UserPlus, AlertCircle, User } from 'lucide-react';
import '../../styles/auth.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();
    const { register, error, setError } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = { name, email, password, role };
        const resultUser = await register(userData);

        if (resultUser) {
            if (resultUser.role === 'admin') navigate('/admin');
            else if (resultUser.role === 'faculty') navigate('/faculty');
            else if (resultUser.role === 'student') navigate('/student');
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <div className="auth-header">
                    <h2 className="auth-title">Create an Account</h2>
                    <p className="auth-subtitle">Join the Learning Outcome System</p>
                </div>

                <form onSubmit={handleRegister} className="auth-form">
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
                        <label className="form-label">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" />
                            <input
                                type="text"
                                className="form-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="Create a secure password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select 
                            className="form-input" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            style={{ paddingLeft: '1rem' }}
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? <LoadingSpinner size={18} /> : <UserPlus size={20} />}
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    <div className="auth-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', fontWeight: 500, textDecoration: 'none' }}>Sign In here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
