import React from 'react';

const DashboardCard = ({ title, value, icon, trend, color }) => {
    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', borderLeft: `4px solid ${color || 'var(--primary-color)'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>{title}</span>
                {icon && <span style={{ color: color || 'var(--primary-color)' }}>{icon}</span>}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {value}
            </div>
            {trend && (
                <div style={{ fontSize: '0.8rem', color: trend > 0 ? 'var(--success)' : 'var(--danger)' }}>
                    {trend > 0 ? '+' : ''}{trend}% from last month
                </div>
            )}
        </div>
    );
};

export default DashboardCard;
