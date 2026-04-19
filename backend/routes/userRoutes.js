import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single user
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new user
router.post('/', async (req, res) => {
    const { name, email, role, status, department, enrollmentYear, major } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, role, status, department, enrollmentYear, major) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, role, status || 'Active', department || null, enrollmentYear || null, major || null]
        );
        res.status(201).json({ id: result.insertId, name, email, role, status, department, enrollmentYear, major });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    const { name, email, role, status, department, enrollmentYear, major } = req.body;
    try {
        await pool.query(
            'UPDATE users SET name = ?, email = ?, role = ?, status = ?, department = ?, enrollmentYear = ?, major = ? WHERE id = ?',
            [name, email, role, status, department || null, enrollmentYear || null, major || null, req.params.id]
        );
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
