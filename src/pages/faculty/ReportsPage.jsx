import React from 'react';
import DataTable from '../../components/common/DataTable';
import { Download } from 'lucide-react';

const ReportsPage = () => {
    // Mock Data for Reports
    const mappingMatrix = [
        { clo: 'CLO-1', plo1: 'High', plo2: '-', plo3: 'Low' },
        { clo: 'CLO-2', plo1: '-', plo2: 'Medium', plo3: '-' },
        { clo: 'CLO-3', plo1: 'High', plo2: 'High', plo3: 'Medium' },
    ];

    const mappingColumns = [
        { key: 'clo', header: 'CLO' },
        { key: 'plo1', header: 'PLO-1' },
        { key: 'plo2', header: 'PLO-2' },
        { key: 'plo3', header: 'PLO-3' },
    ];

    const courseAttainment = [
        { course: 'CS101', clo1: '85%', clo2: '70%', clo3: '90%' },
        { course: 'CS201', clo1: '78%', clo2: '82%', clo3: '88%' },
    ];

    const courseColumns = [
        { key: 'course', header: 'Course' },
        { key: 'clo1', header: 'CLO-1 Attainment' },
        { key: 'clo2', header: 'CLO-2 Attainment' },
        { key: 'clo3', header: 'CLO-3 Attainment' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2>Reports & Analytics</h2>
                    <p className="text-muted">View detailed attainment reports.</p>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--primary-color)', color: 'white' }}>
                    <Download size={18} /> Export PDF
                </button>
            </div>

            <div className="card">
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>CLO - PLO Mapping Matrix</h3>
                <DataTable columns={mappingColumns} data={mappingMatrix} />
            </div>

            <div className="card">
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Course-wise Attainment Report</h3>
                <DataTable columns={courseColumns} data={courseAttainment} />
            </div>
        </div>
    );
};

export default ReportsPage;
