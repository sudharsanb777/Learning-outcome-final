import React, { useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Target, Award, TrendingUp } from 'lucide-react';
import '../../styles/variables.css';

const StudentPerformance = () => {
    const { data } = useData();

    // Mocking logged in student ID
    const CURRENT_STUDENT_ID = 4; // Alice Williams

    // Calculate aggregated PLO achievement
    const ploPerformance = useMemo(() => {
        const studentAssessments = data.assessments.filter(a => a.studentId === CURRENT_STUDENT_ID);
        const activePLOs = data.plos.filter(p => p.status === 'Active');
        
        // Structure to hold aggregated scores per PLO
        const ploScores = activePLOs.map(plo => ({
            ...plo,
            totalScore: 0,
            maxPossible: 0,
            relatedCLOs: 0
        }));

        // For each assessment, find which PLOs it affects via CLO mapping
        studentAssessments.forEach(assessment => {
            const correspondingMappings = data.mappings.filter(m => m.cloId === assessment.cloId);
            
            correspondingMappings.forEach(mapping => {
                const ploTarget = ploScores.find(p => p.id === mapping.ploId);
                if (ploTarget) {
                    // Weighted score based on mapping level (1, 2, or 3)
                    const weight = mapping.level;
                    ploTarget.totalScore += (assessment.score * weight);
                    ploTarget.maxPossible += (100 * weight);
                    ploTarget.relatedCLOs += 1;
                }
            });
        });

        // Calculate final percentages
        return ploScores.map(plo => ({
            ...plo,
            achievement: plo.maxPossible > 0 ? Math.round((plo.totalScore / plo.maxPossible) * 100) : 0,
            status: plo.maxPossible > 0 
                ? (plo.totalScore / plo.maxPossible) >= 0.7 ? 'Excellent' 
                : (plo.totalScore / plo.maxPossible) >= 0.5 ? 'Average' : 'Needs Improvement'
                : 'Not Assessed'
        }));
    }, [data, CURRENT_STUDENT_ID]);

    const getStatusColor = (status) => {
        switch(status) {
            case 'Excellent': return { bg: '#D1FAE5', text: '#065F46' };
            case 'Average': return { bg: '#FEF3C7', text: '#92400E' };
            case 'Needs Improvement': return { bg: '#FEE2E2', text: '#991B1B' };
            default: return { bg: '#F3F4F6', text: '#4B5563' };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="page-header">
                <h2>My Performance (OBE)</h2>
                <p className="text-muted">Track your progress toward achieving Program Learning Outcomes.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-md)' }}>
                {ploPerformance.map(plo => {
                    const colors = getStatusColor(plo.status);
                    return (
                        <div key={plo.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: 'var(--radius-md)', color: '#3B82F6' }}>
                                        <Target size={24} />
                                    </div>
                                    <h3 style={{ margin: 0 }}>{plo.code}</h3>
                                </div>
                                <span style={{
                                    padding: '4px 10px', 
                                    borderRadius: '12px', 
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    backgroundColor: colors.bg,
                                    color: colors.text
                                }}>
                                    {plo.status}
                                </span>
                            </div>

                            <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: '1.5', flex: 1 }}>
                                {plo.description}
                            </p>

                            <div style={{ marginTop: 'auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Award size={14} /> Achievement Level
                                    </span>
                                    <span style={{ fontWeight: 'bold', color: '#111827' }}>{plo.achievement}%</span>
                                </div>
                                
                                <div style={{ width: '100%', backgroundColor: '#E5E7EB', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                                    <div style={{
                                        backgroundColor: plo.achievement >= 70 ? '#10B981' : plo.achievement >= 50 ? '#F59E0B' : plo.achievement > 0 ? '#EF4444' : '#E5E7EB',
                                        height: '100%',
                                        width: `${plo.achievement}%`,
                                        borderRadius: '9999px',
                                        transition: 'width 1s ease-out'
                                    }}></div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                    <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <TrendingUp size={14} /> Based on {plo.relatedCLOs} mapped CLO assessments
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {ploPerformance.length === 0 && (
                <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                    <p>No active Program Learning Outcomes found.</p>
                </div>
            )}
        </div>
    );
};

export default StudentPerformance;
