import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen } from 'lucide-react';
import '../../styles/variables.css';

const CLOPLOMapping = () => {
    const { data, addEntity, updateEntity, deleteEntity } = useData();
    const [selectedCourseId, setSelectedCourseId] = useState('');

    // Mocking logged in faculty ID
    const CURRENT_FACULTY_ID = 2; 

    const assignedCourses = data.courses.filter(c => c.facultyId === CURRENT_FACULTY_ID);
    const activePLOs = data.plos.filter(p => p.status === 'Active');
    const courseCLOs = selectedCourseId ? data.clos.filter(clo => clo.courseId === parseInt(selectedCourseId)) : [];

    const getMappingLevel = (cloId, ploId) => {
        const mapping = data.mappings.find(m => m.cloId === cloId && m.ploId === ploId);
        return mapping ? mapping.level : 0;
    };

    const toggleMapping = (cloId, ploId) => {
        const existingMapping = data.mappings.find(m => m.cloId === cloId && m.ploId === ploId);
        
        if (existingMapping) {
            let nextLevel = existingMapping.level + 1;
            if (nextLevel > 3) {
                // Delete mapping if cycle goes past 3 (High)
                deleteEntity('mappings', existingMapping.id);
            } else {
                updateEntity('mappings', existingMapping.id, { level: nextLevel });
            }
        } else {
            // Create new mapping at level 1 (Low)
            addEntity('mappings', { cloId, ploId, level: 1 });
        }
    };

    const getCorrelationLabel = (level) => {
        switch(level) {
            case 1: return { text: 'Low', color: '#FEF08A', textColor: '#854D0E' }; // Yellow
            case 2: return { text: 'Med', color: '#FDBA74', textColor: '#9A3412' }; // Orange
            case 3: return { text: 'High', color: '#86EFAC', textColor: '#166534' }; // Green
            default: return { text: '-', color: 'transparent', textColor: '#D1D5DB' };
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="page-header">
                <h2>CLO-PLO Mapping Map</h2>
                <p className="text-muted">Map your Course Learning Outcomes to Program Learning Outcomes.</p>
            </div>

            <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <BookOpen size={24} color="var(--primary-color)" />
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Select Course to Map</label>
                        <select 
                            value={selectedCourseId} 
                            onChange={(e) => setSelectedCourseId(e.target.value)} 
                            style={{ width: '100%', maxWidth: '400px', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                        >
                            <option value="">-- Choose a Course --</option>
                            {assignedCourses.map(course => (
                                <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {selectedCourseId && courseCLOs.length > 0 && (
                <div className="card" style={{ overflowX: 'auto' }}>
                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>Mapping Matrix</h3>
                        <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>Click cells to cycle through levels: Low (1) → Med (2) → High (3) → None</p>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th style={{ padding: '1rem', border: '1px solid var(--border-color)', backgroundColor: '#F9FAFB', textAlign: 'left', width: '200px' }}>CLOs \ PLOs</th>
                                {activePLOs.map(plo => (
                                    <th key={plo.id} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: '#F9FAFB', cursor: 'help' }} title={plo.description}>
                                        {plo.code}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {courseCLOs.map(clo => (
                                <tr key={clo.id}>
                                    <td style={{ padding: '1rem', border: '1px solid var(--border-color)', textAlign: 'left', fontWeight: '500', cursor: 'help' }} title={clo.description}>
                                        {clo.code}
                                    </td>
                                    {activePLOs.map(plo => {
                                        const level = getMappingLevel(clo.id, plo.id);
                                        const { text, color, textColor } = getCorrelationLabel(level);
                                        return (
                                            <td 
                                                key={`${clo.id}-${plo.id}`} 
                                                onClick={() => toggleMapping(clo.id, plo.id)}
                                                style={{ 
                                                    padding: '1rem', 
                                                    border: '1px solid var(--border-color)', 
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s ease',
                                                    backgroundColor: color,
                                                    color: textColor,
                                                    fontWeight: level > 0 ? 'bold' : 'normal'
                                                }}
                                            >
                                                {text !== '-' ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                                        <span>{text}</span>
                                                        <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>({level})</span>
                                                    </div>
                                                ) : text}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedCourseId && courseCLOs.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                    <p>No CLOs defined for this course yet.</p>
                    <p>Go to "Manage CLOs" to create them before mapping.</p>
                </div>
            )}
        </div>
    );
};

export default CLOPLOMapping;
