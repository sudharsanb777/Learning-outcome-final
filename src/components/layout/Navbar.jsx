import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={{
            height: '64px',
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--spacing-lg)',
            width: '100%'
        }}>
            <h3 style={{ margin: 0, color: 'var(--text-main)', textTransform: 'capitalize' }}>
                {role} Dashboard
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <button style={{ background: 'transparent', padding: 'var(--spacing-xs)', border: 'none', cursor: 'pointer' }}>
                    <Bell size={20} color="var(--text-muted)" />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <User size={18} />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, marginRight: '1rem' }}>
                        {currentUser?.name || 'User'}
                    </span>
                    <button 
                        onClick={handleLogout}
                        style={{ 
                            background: '#FEE2E2', 
                            color: '#EF4444', 
                            padding: '6px 12px', 
                            border: '1px solid #FECACA', 
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontWeight: 500
                        }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
