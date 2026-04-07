import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);
const API_BASE_URL = 'http://localhost:5000/api';

export const DataProvider = ({ children }) => {
    // Initialize data structure matching what API returns
    const [data, setData] = useState({
        users: [],
        plos: [],
        courses: [],
        clos: [],
        mappings: [],
        enrollments: [],
        assessments: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initial fetch of all data from backend
    const fetchAllData = async () => {
        setLoading(true);
        try {
            const endpoints = ['users', 'plos', 'courses', 'clos', 'mappings', 'enrollments', 'assessments'];
            const responses = await Promise.all(
                endpoints.map(async endpoint => {
                    const res = await fetch(`${API_BASE_URL}/${endpoint}`);
                    if (!res.ok) {
                        const errText = await res.text();
                        throw new Error(`Failed to fetch ${endpoint} (Status: ${res.status}): ${errText}`);
                    }
                    return res.json();
                })
            );
            
            const newData = {};
            endpoints.forEach((endpoint, index) => {
                newData[endpoint] = responses[index];
            });
            
            setData(newData);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch initial data:", err);
            setError("Could not connect to the backend server. Make sure it is running.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    // Generic Add Entity via API
    const addEntity = async (entityType, newItem) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${entityType}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });
            const createdItem = await response.json();
            
            // Update local state immediately for snappy UI
            setData(prev => ({
                ...prev,
                [entityType]: [...prev[entityType], createdItem]
            }));
            return createdItem;
        } catch (err) {
            console.error(`Error adding ${entityType}:`, err);
        }
    };

    // Generic Update Entity via API
    const updateEntity = async (entityType, id, updatedItem) => {
        try {
            await fetch(`${API_BASE_URL}/${entityType}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedItem)
            });

            // Update local state immediately
            setData(prev => ({
                ...prev,
                [entityType]: prev[entityType].map(item => 
                    item.id === id ? { ...item, ...updatedItem } : item
                )
            }));
        } catch (err) {
            console.error(`Error updating ${entityType}:`, err);
        }
    };

    // Generic Delete Entity via API
    const deleteEntity = async (entityType, id) => {
        try {
            await fetch(`${API_BASE_URL}/${entityType}/${id}`, {
                method: 'DELETE'
            });

            // Update local state immediately
            setData(prev => ({
                ...prev,
                [entityType]: prev[entityType].filter(item => item.id !== id)
            }));
        } catch (err) {
            console.error(`Error deleting ${entityType}:`, err);
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
            <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid #E5E7EB', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p>Connecting to Server...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>;
    }

    if (error) {
        return <div style={{ padding: '2rem', color: '#B91C1C', backgroundColor: '#FEE2E2', textAlign: 'center' }}>
            <h2>Connection Error</h2>
            <p>{error}</p>
        </div>;
    }

    return (
        <DataContext.Provider value={{
            data,
            addEntity,
            updateEntity,
            deleteEntity,
            refreshData: fetchAllData
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
