import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import '../../styles/variables.css';

const ManagePLOs = () => {
    const { data, addEntity, updateEntity, deleteEntity } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlo, setEditingPlo] = useState(null);
    const [formData, setFormData] = useState({ code: '', description: '', status: 'Active' });

    const openModal = (plo = null) => {
        if (plo) {
            setEditingPlo(plo);
            setFormData({ code: plo.code, description: plo.description, status: plo.status });
        } else {
            setEditingPlo(null);
            setFormData({ code: '', description: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPlo(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPlo) {
            updateEntity('plos', editingPlo.id, formData);
        } else {
            addEntity('plos', formData);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this PLO?")) {
            deleteEntity('plos', id);
        }
    };

    return (
        <div className="manage-container">
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div>
                    <h2>Manage Program Learning Outcomes (PLOs)</h2>
                    <p className="text-muted">Create and manage the expected outcomes for the program.</p>
                </div>
                <button className="btn btn-primary" onClick={() => openModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                    <Plus size={18} /> Add New PLO
                </button>
            </div>

            <div className="card">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                            <th style={{ padding: '1rem' }}>Code</th>
                            <th style={{ padding: '1rem' }}>Description</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.plos.map(plo => (
                            <tr key={plo.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>{plo.code}</td>
                                <td style={{ padding: '1rem' }}>{plo.description}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem',
                                        backgroundColor: plo.status === 'Active' ? '#D1FAE5' : '#FEE2E2',
                                        color: plo.status === 'Active' ? '#065F46' : '#991B1B'
                                    }}>
                                        {plo.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <button onClick={() => openModal(plo)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', marginRight: '0.5rem' }}><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(plo.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {data.plos.length === 0 && (
                            <tr>
                                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#6B7280' }}>No PLOs found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', width: '500px', maxWidth: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3>{editingPlo ? 'Edit PLO' : 'Add New PLO'}</h3>
                            <button onClick={closeModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>PLO Code</label>
                                <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} placeholder="e.g. PLO1" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the expected outcome..." required rows="4" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', resize: 'vertical' }}></textarea>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Status</label>
                                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button type="button" onClick={closeModal} style={{ padding: '0.5rem 1rem', border: '1px solid var(--border-color)', background: 'white', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '0.5rem 1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>{editingPlo ? 'Save Changes' : 'Add PLO'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagePLOs;
