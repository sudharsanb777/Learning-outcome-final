import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X, BookOpen } from 'lucide-react';
import '../../styles/variables.css';

const ManageCLOs = () => {
    const { data, addEntity, updateEntity, deleteEntity } = useData();
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCLO, setEditingCLO] = useState(null);
    const [formData, setFormData] = useState({ code: '', description: '', bloomLevel: 'Remember' });

    // Mocking logged in faculty ID to 2 (Dr. Jane Smith) for demo purposes
    // In a real app, this would come from Auth Context
    const CURRENT_FACULTY_ID = 2; 

    const assignedCourses = data.courses.filter(c => c.facultyId === CURRENT_FACULTY_ID);
    const displayedCLOs = selectedCourseId ? data.clos.filter(clo => clo.courseId === parseInt(selectedCourseId)) : [];

    const openModal = (clo = null) => {
        if (!selectedCourseId) {
            alert('Please select a course first.');
            return;
        }
        if (clo) {
            setEditingCLO(clo);
            setFormData({ code: clo.code, description: clo.description, bloomLevel: clo.bloomLevel });
        } else {
            setEditingCLO(null);
            setFormData({ code: '', description: '', bloomLevel: 'Remember' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCLO(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData, courseId: parseInt(selectedCourseId) };

        if (editingCLO) {
            updateEntity('clos', editingCLO.id, payload);
        } else {
            addEntity('clos', payload);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this CLO?")) {
            deleteEntity('clos', id);
        }
    };

    return (
        <div className="manage-container">
            <div className="page-header" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <h2>Manage Course Learning Outcomes (CLOs)</h2>
                <p className="text-muted">Define outcomes for the courses you teach.</p>
            </div>

            <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <BookOpen size={24} color="var(--primary-color)" />
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Select Course to Manage CLOs</label>
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

            {selectedCourseId && (
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                        <h3>CLOs for {assignedCourses.find(c => c.id === parseInt(selectedCourseId))?.code}</h3>
                        <button className="btn btn-primary" onClick={() => openModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                            <Plus size={18} /> Add New CLO
                        </button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Code</th>
                                <th style={{ padding: '1rem' }}>Description</th>
                                <th style={{ padding: '1rem' }}>Bloom's Taxonomy Level</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedCLOs.map(clo => (
                                <tr key={clo.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{clo.code}</td>
                                    <td style={{ padding: '1rem' }}>{clo.description}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem',
                                            backgroundColor: '#E0E7FF', color: '#3730A3'
                                        }}>
                                            {clo.bloomLevel}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button onClick={() => openModal(clo)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', marginRight: '0.5rem' }}><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(clo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                            {displayedCLOs.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>No CLOs found for this course.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '500px', maxWidth: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3>{editingCLO ? 'Edit CLO' : 'Add New CLO'}</h3>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>CLO Code</label>
                                <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="e.g. CLO1" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the outcome..." required rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', resize: 'vertical' }}></textarea>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Bloom's Taxonomy Level</label>
                                <select value={formData.bloomLevel} onChange={(e) => setFormData({...formData, bloomLevel: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                    {['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'].map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={closeModal} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', background: 'white', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>{editingCLO ? 'Save Changes' : 'Add CLO'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCLOs;
