import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all CLOs
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new CLO
router.post('/', async (req, res) => {
    const { courseId, code, description, bloomLevel } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO clos (courseId, code, description, bloomLevel) VALUES (?, ?, ?, ?)',
            [courseId, code, description, bloomLevel]
        );
        res.status(201).json({ id: result.insertId, courseId, code, description, bloomLevel });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update CLO
router.put('/:id', async (req, res) => {
    const { courseId, code, description, bloomLevel } = req.body;
    try {
        await pool.query(
            'UPDATE clos SET courseId = ?, code = ?, description = ?, bloomLevel = ? WHERE id = ?',
            [courseId, code, description, bloomLevel, req.params.id]
        );
        res.json({ message: 'CLO updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE CLO
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM clos WHERE id = ?', [req.params.id]);
        res.json({ message: 'CLO deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
