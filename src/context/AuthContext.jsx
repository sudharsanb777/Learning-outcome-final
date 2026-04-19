import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Retrieve logged-in user from localStorage on initial load
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [error, setError] = useState('');

    const login = async (email, password) => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (!res.ok) {
                setError(data.error || 'Login failed');
                return false;
            }

            setCurrentUser(data.user);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            return data.user;
        } catch (err) {
            setError('Network error. Could not reach server.');
            return false;
        }
    };

    const register = async (userData) => {
        setError('');
        try {
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Registration failed');
                return false;
            }

            // Automatically log them in
            setCurrentUser(data.user);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            return data.user;
        } catch (err) {
            setError('Network error. Could not reach server.');
            return false;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
