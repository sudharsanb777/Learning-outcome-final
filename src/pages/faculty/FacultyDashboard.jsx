import React from 'react';
import DashboardCard from '../../components/dashboard/DashboardCard';
import ChartComponent from '../../components/dashboard/ChartComponent';
import { BookOpen, Target, FileText, CheckCircle } from 'lucide-react';

const FacultyDashboard = () => {
    const stats = [
        { title: 'My Courses', value: '3', icon: <BookOpen size={24} />, color: '#3B82F6' },
        { title: 'Total CLOs', value: '15', icon: <Target size={24} />, color: '#10B981' },
        { title: 'Pending Assessments', value: '2', icon: <FileText size={24} />, color: '#F59E0B' },
        { title: 'Completed Mappings', value: '12', icon: <CheckCircle size={24} />, color: '#8B5CF6' },
    ];

    const attainmentData = [
        { clo: 'CLO-1', attainment: 85 },
        { clo: 'CLO-2', attainment: 72 },
        { clo: 'CLO-3', attainment: 90 },
        { clo: 'CLO-4', attainment: 65 },
        { clo: 'CLO-5', attainment: 78 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
                <h2>Faculty Overview</h2>
                <p className="text-muted">Manage your courses and learning outcomes.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-md)' }}>
                {stats.map((stat, index) => (
                    <DashboardCard key={index} {...stat} />
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--spacing-md)' }}>
                <ChartComponent
                    title="CLO Attainment Overview"
                    data={attainmentData}
                    xKey="clo"
                    dataKey="attainment"
                    color="#3B82F6"
                />
                {/* Placeholder for another chart or widget */}
                <div className="card">
                    <h3>Recent Activities</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                            Updated Assessment for <strong>CS101</strong>
                        </li>
                        <li style={{ padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                            Mapped CLO-3 to PLO-2
                        </li>
                        <li style={{ padding: '10px 0' }}>
                            Submitted Grades for Assignment 1
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FacultyDashboard;
