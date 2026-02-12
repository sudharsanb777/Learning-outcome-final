import React from 'react';
import DashboardCard from '../../components/dashboard/DashboardCard';
import ChartComponent from '../../components/dashboard/ChartComponent';
import { BookOpen, Award, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
    const stats = [
        { title: 'Enrolled Courses', value: '5', icon: <BookOpen size={24} />, color: '#3B82F6' },
        { title: 'CGPA', value: '3.8', icon: <Award size={24} />, color: '#10B981' },
        { title: 'PLO Attainment', value: 'High', icon: <TrendingUp size={24} />, color: '#F59E0B' },
    ];

    const ploAttainmentData = [
        { plo: 'PLO-1', score: 80 },
        { plo: 'PLO-2', score: 75 },
        { plo: 'PLO-3', score: 90 },
        { plo: 'PLO-4', score: 60 },
        { plo: 'PLO-5', score: 85 },
    ];

    const coursePerformanceData = [
        { course: 'CS101', score: 88 },
        { course: 'CS102', score: 76 },
        { course: 'CS201', score: 92 },
        { course: 'CS202', score: 85 },
        { course: 'MATH101', score: 70 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div>
                <h2>Student Overview</h2>
                <p className="text-muted">Track your academic progress and outcomes.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-md)' }}>
                {stats.map((stat, index) => (
                    <DashboardCard key={index} {...stat} />
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--spacing-md)' }}>
                <ChartComponent
                    title="PLO Attainment"
                    data={ploAttainmentData}
                    xKey="plo"
                    dataKey="score"
                    color="#8B5CF6"
                />
                <ChartComponent
                    title="Course Performance"
                    data={coursePerformanceData}
                    xKey="course"
                    dataKey="score"
                    color="#3B82F6"
                />
            </div>
        </div>
    );
};

export default StudentDashboard;
