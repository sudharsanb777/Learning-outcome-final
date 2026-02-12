import React from 'react';
import { Bell, User } from 'lucide-react';

const Navbar = ({ role }) => {
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
            <h3 style={{ margin: 0, color: 'var(--text-main)' }}>Dashboard</h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                <button style={{ background: 'transparent', padding: 'var(--spacing-xs)', border: 'none' }}>
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
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>User</span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
