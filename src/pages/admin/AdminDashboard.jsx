import React from 'react';
import DashboardCard from '../../components/dashboard/DashboardCard';
import DataTable from '../../components/common/DataTable';
import { Users, GraduationCap, BookOpen, Target } from 'lucide-react';

const AdminDashboard = () => {
    // Mock Data
    const stats = [
        { title: 'Total Users', value: '1,240', icon: <Users size={24} />, trend: 12, color: '#3B82F6' },
        { title: 'Total Courses', value: '45', icon: <BookOpen size={24} />, trend: 5, color: '#10B981' },
        { title: 'Total CLOs', value: '180', icon: <Target size={24} />, trend: 8, color: '#F59E0B' },
        { title: 'Total PLOs', value: '12', icon: <GraduationCap size={24} />, trend: 0, color: '#EF4444' },
    ];

    const recentUsers = [
        { id: 1, name: 'John Doe', role: 'Faculty', email: 'john@uni.edu', status: 'Active' },
        { id: 2, name: 'Jane Smith', role: 'Student', email: 'jane@uni.edu', status: 'Active' },
        { id: 3, name: 'Bob Johnson', role: 'Student', email: 'bob@uni.edu', status: 'Inactive' },
        { id: 4, name: 'Alice Williams', role: 'Faculty', email: 'alice@uni.edu', status: 'Active' },
    ];

    const userColumns = [
        { key: 'name', header: 'Name' },
        { key: 'role', header: 'Role' },
        { key: 'email', header: 'Email' },
        {
            key: 'status', header: 'Status', render: (status) => (
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    backgroundColor: status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                    color: status === 'Active' ? '#065F46' : '#991B1B'
                }}>
                    {status}
                </span>
            )
        },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
                <h2>Admin Overview</h2>
                <p className="text-muted">Welcome back, Administrator.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-md)' }}>
                {stats.map((stat, index) => (
                    <DashboardCard key={index} {...stat} />
                ))}
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                    <h3>Recent Users</h3>
                    <button>View All</button>
                </div>
                <DataTable columns={userColumns} data={recentUsers} />
            </div>
        </div>
    );
};

export default AdminDashboard;
