import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Target, ChevronDown, ChevronUp } from 'lucide-react';
import '../../styles/variables.css';

const StudentCourses = () => {
    const { data } = useData();
    const [expandedCourse, setExpandedCourse] = useState(null);

    // Mocking logged in student ID
    const CURRENT_STUDENT_ID = 4; // Alice Williams

    const enrollments = data.enrollments.filter(e => e.studentId === CURRENT_STUDENT_ID);
    const myCourses = enrollments.map(e => data.courses.find(c => c.id === e.courseId)).filter(Boolean);

    const toggleExpand = (courseId) => {
        if (expandedCourse === courseId) {
            setExpandedCourse(null);
        } else {
            setExpandedCourse(courseId);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div className="page-header">
                <h2>My Enrolled Courses</h2>
                <p className="text-muted">View your current courses and their expected learning outcomes.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {myCourses.map(course => {
                    const faculty = data.users.find(u => u.id === course.facultyId);
                    const clos = data.clos.filter(clo => clo.courseId === course.id);
                    const isExpanded = expandedCourse === course.id;

                    return (
                        <div key={course.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                            <div 
                                style={{ 
                                    padding: '1.5rem', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center', 
                                    cursor: 'pointer',
                                    borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none',
                                    backgroundColor: isExpanded ? '#F9FAFB' : 'white'
                                }}
                                onClick={() => toggleExpand(course.id)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', borderRadius: 'var(--radius-md)' }}>
                                        <BookOpen size={24} color="#3B82F6" />
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{course.code} - {course.title}</h3>
                                        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
                                            <span><strong>Credits:</strong> {course.credits}</span>
                                            <span><strong>Semester:</strong> {course.semester}</span>
                                            <span><strong>Instructor:</strong> {faculty ? faculty.name : 'TBA'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ color: '#9CA3AF' }}>
                                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                </div>
                            </div>

                            {isExpanded && (
                                <div style={{ padding: '1.5rem', backgroundColor: 'white' }}>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#374151' }}>
                                        <Target size={18} color="var(--primary-color)" /> Course Learning Outcomes (CLOs)
                                    </h4>
                                    
                                    {clos.length > 0 ? (
                                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                            {clos.map(clo => (
                                                <li key={clo.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#F9FAFB', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                                    <div style={{ fontWeight: 'bold', color: '#374151', minWidth: '60px' }}>{clo.code}</div>
                                                    <div style={{ flex: 1, color: '#4B5563' }}>{clo.description}</div>
                                                    <div>
                                                        <span style={{ padding: '2px 8px', backgroundColor: '#E0E7FF', color: '#3730A3', borderRadius: '12px', fontSize: '0.75rem' }}>
                                                            {clo.bloomLevel}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div style={{ padding: '1rem', textAlign: 'center', color: '#6B7280', fontStyle: 'italic', backgroundColor: '#F9FAFB', borderRadius: 'var(--radius-md)' }}>
                                            No Course Learning Outcomes have been defined for this course yet.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {myCourses.length === 0 && (
                    <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#6B7280' }}>
                        <p>You are not currently enrolled in any courses.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentCourses;
