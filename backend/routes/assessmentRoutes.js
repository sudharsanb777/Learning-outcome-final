import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all assessments
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM assessments');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new assessment
router.post('/', async (req, res) => {
    const { studentId, courseId, cloId, score, type } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO assessments (studentId, courseId, cloId, score, type) VALUES (?, ?, ?, ?, ?)',
            [studentId, courseId, cloId, score, type]
        );
        res.status(201).json({ id: result.insertId, studentId, courseId, cloId, score, type });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update assessment score
router.put('/:id', async (req, res) => {
    const { score } = req.body;
    try {
        await pool.query(
            'UPDATE assessments SET score = ? WHERE id = ?',
            [score, req.params.id]
        );
        res.json({ message: 'Assessment updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE assessment
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM assessments WHERE id = ?', [req.params.id]);
        res.json({ message: 'Assessment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
