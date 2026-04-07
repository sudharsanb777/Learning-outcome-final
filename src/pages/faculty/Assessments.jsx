import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, User, CheckCircle } from 'lucide-react';
import '../../styles/variables.css';

const Assessments = () => {
    const { data, addEntity, updateEntity } = useData();
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [selectedAssessmentType, setSelectedAssessmentType] = useState('Midterm');
    const [saveStatus, setSaveStatus] = useState('');

    // Mocking logged in faculty ID
    const CURRENT_FACULTY_ID = 2; 

    // Derived data
    const assignedCourses = data.courses.filter(c => c.facultyId === CURRENT_FACULTY_ID);
    const course = assignedCourses.find(c => c.id === parseInt(selectedCourseId));
    
    const courseCLOs = selectedCourseId ? data.clos.filter(clo => clo.courseId === parseInt(selectedCourseId)) : [];
    const enrolledStudents = selectedCourseId 
        ? data.enrollments
            .filter(e => e.courseId === parseInt(selectedCourseId))
            .map(e => data.users.find(u => u.id === e.studentId))
            .filter(Boolean)
        : [];

    const existingScores = data.assessments.filter(a => a.courseId === parseInt(selectedCourseId) && a.type === selectedAssessmentType);
    
    const [scoresToSave, setScoresToSave] = useState({});

    // When course or type changes, we build a local state dictionary to handle edits easily
    React.useEffect(() => {
        if (selectedCourseId) {
            const initialScores = {};
            enrolledStudents.forEach(st => {
                courseCLOs.forEach(clo => {
                    const existing = existingScores.find(s => s.studentId === st.id && s.cloId === clo.id);
                    initialScores[`${st.id}-${clo.id}`] = existing ? existing.score : '';
                });
            });
            setScoresToSave(initialScores);
        }
    }, [selectedCourseId, selectedAssessmentType, data.assessments]);

    const handleScoreChange = (studentId, cloId, value) => {
        const val = value === '' ? '' : Math.max(0, Math.min(100, parseInt(value, 10)));
        setScoresToSave(prev => ({ ...prev, [`${studentId}-${cloId}`]: val }));
    };

    const handleSave = () => {
        setSaveStatus('Saving...');
        const cid = parseInt(selectedCourseId);

        Object.keys(scoresToSave).forEach(key => {
            const [studentId, cloId] = key.split('-').map(Number);
            const score = scoresToSave[key];
            
            const existing = existingScores.find(s => s.studentId === studentId && s.cloId === cloId);

            if (score !== '' && score !== null && !isNaN(score)) {
                if (existing) {
                    // update
                    updateEntity('assessments', existing.id, { score: parseInt(score) });
                } else {
                    // insert
                    addEntity('assessments', {
                        studentId,
                        courseId: cid,
                        cloId,
                        score: parseInt(score),
                        type: selectedAssessmentType
                    });
                }
            }
        });

        setTimeout(() => setSaveStatus('Saved!'), 500);
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const assessmentTypes = ['Quiz 1', 'Quiz 2', 'Midterm', 'Assignment', 'Project', 'Final'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="page-header">
                <h2>Student Assessments</h2>
                <p className="text-muted">Enter marks mapped directly to Course Learning Outcomes.</p>
            </div>

            <div className="card">
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            <BookOpen size={18} color="var(--primary-color)" /> Select Course
                        </label>
                        <select 
                            value={selectedCourseId} 
                            onChange={(e) => setSelectedCourseId(e.target.value)} 
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                        >
                            <option value="">-- Choose a Course --</option>
                            {assignedCourses.map(course => (
                                <option key={course.id} value={course.id}>{course.code} - {course.title}</option>
                            ))}
                        </select>
                    </div>

                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            <CheckCircle size={18} color="var(--primary-color)" /> Assessment Type
                        </label>
                        <select 
                            value={selectedAssessmentType} 
                            onChange={(e) => setSelectedAssessmentType(e.target.value)} 
                            disabled={!selectedCourseId}
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                        >
                            {assessmentTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {selectedCourseId && courseCLOs.length > 0 && enrolledStudents.length > 0 && (
                <div className="card" style={{ overflowX: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3>{course?.code} - {selectedAssessmentType} Marks</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {saveStatus && <span style={{ color: saveStatus === 'Saved!' ? '#10B981' : '#6B7280', fontWeight: '500' }}>{saveStatus}</span>}
                            <button className="btn btn-primary" onClick={handleSave} style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                                Save Marks
                            </button>
                        </div>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F9FAFB' }}>
                                <th style={{ padding: '1rem', border: '1px solid var(--border-color)', textAlign: 'left', minWidth: '200px' }}>Student</th>
                                {courseCLOs.map(clo => (
                                    <th key={clo.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', textAlign: 'center' }} title={clo.description}>
                                        {clo.code}
                                        <div style={{ fontSize: '0.7rem', fontWeight: 'normal', color: '#6B7280' }}>(Out of 100)</div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {enrolledStudents.map(student => (
                                <tr key={student.id}>
                                    <td style={{ padding: '0.75rem 1rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={18} color="#9CA3AF" />
                                        <span>{student.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>({student.email})</span>
                                    </td>
                                    {courseCLOs.map(clo => (
                                        <td key={clo.id} style={{ padding: '0.75rem', border: '1px solid var(--border-color)' }}>
                                            <input 
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={scoresToSave[`${student.id}-${clo.id}`] !== undefined ? scoresToSave[`${student.id}-${clo.id}`] : ''}
                                                onChange={(e) => handleScoreChange(student.id, clo.id, e.target.value)}
                                                style={{ width: '100%', padding: '0.5rem', textAlign: 'center', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                                                placeholder="-"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedCourseId && courseCLOs.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                    <p>No CLOs defined for this course.</p>
                </div>
            )}

            {selectedCourseId && enrolledStudents.length === 0 && (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                    <p>No students enrolled in this course.</p>
                </div>
            )}
        </div>
    );
};

export default Assessments;
