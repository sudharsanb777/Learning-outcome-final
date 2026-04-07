import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import '../../styles/variables.css';

const ManageCourses = () => {
    const { data, addEntity, updateEntity, deleteEntity } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [formData, setFormData] = useState({ code: '', title: '', credits: 3, facultyId: '', semester: '' });

    const facultyList = data.users.filter(u => u.role === 'faculty');

    const openModal = (course = null) => {
        if (course) {
            setEditingCourse(course);
            setFormData({ ...course });
        } else {
            setEditingCourse(null);
            setFormData({ code: '', title: '', credits: 3, facultyId: '', semester: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCourse(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            credits: parseInt(formData.credits, 10),
            facultyId: formData.facultyId ? parseInt(formData.facultyId, 10) : null
        };

        if (editingCourse) {
            updateEntity('courses', editingCourse.id, payload);
        } else {
            addEntity('courses', payload);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this Course?")) {
            deleteEntity('courses', id);
        }
    };

    return (
        <div className="manage-container">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h2>Manage Courses</h2>
                    <p className="text-muted">Create courses and assign faculty.</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                    <Plus size={18} /> Add New Course
                </button>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Code</th>
                            <th style={{ padding: '1rem' }}>Title</th>
                            <th style={{ padding: '1rem' }}>Credits</th>
                            <th style={{ padding: '1rem' }}>Semester</th>
                            <th style={{ padding: '1rem' }}>Faculty</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.courses.map(course => {
                            const faculty = facultyList.find(f => f.id === course.facultyId);
                            return (
                                <tr key={course.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{course.code}</td>
                                    <td style={{ padding: '1rem' }}>{course.title}</td>
                                    <td style={{ padding: '1rem' }}>{course.credits}</td>
                                    <td style={{ padding: '1rem' }}>{course.semester}</td>
                                    <td style={{ padding: '1rem' }}>{faculty ? faculty.name : <span style={{ color: '#9CA3AF' }}>Unassigned</span>}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button onClick={() => openModal(course)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', marginRight: '0.5rem' }}><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(course.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            );
                        })}
                        {data.courses.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>No courses found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '500px', maxWidth: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3>{editingCourse ? 'Edit Course' : 'Add New Course'}</h3>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Course Code</label>
                                <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="e.g. CS101" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Course Title</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Intro to Programming" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Credits</label>
                                    <input type="number" min="1" max="6" value={formData.credits} onChange={(e) => setFormData({...formData, credits: e.target.value})} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Semester</label>
                                    <input type="text" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} placeholder="e.g. Fall 2024" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Assign Faculty</label>
                                <select value={formData.facultyId} onChange={(e) => setFormData({...formData, facultyId: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                    <option value="">-- Select Faculty --</option>
                                    {facultyList.map(f => <option key={f.id} value={f.id}>{f.name} ({f.department})</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={closeModal} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', background: 'white', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>{editingCourse ? 'Save Changes' : 'Add Course'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCourses;
