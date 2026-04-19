import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all assessments
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM assessments');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new assessment
router.post('/', async (req, res) => {
    const { studentId, courseId, cloId, score, type } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO assessments ("studentId", "courseId", "cloId", score, type) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [studentId, courseId, cloId, score, type]
        );
        res.status(201).json({ id: rows[0].id, studentId, courseId, cloId, score, type });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update assessment score
router.put('/:id', async (req, res) => {
    const { score } = req.body;
    try {
        await pool.query(
            'UPDATE assessments SET score = $1 WHERE id = $2',
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
        await pool.query('DELETE FROM assessments WHERE id = $1', [req.params.id]);
        res.json({ message: 'Assessment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
