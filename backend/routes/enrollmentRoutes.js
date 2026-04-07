import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all enrollments
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM enrollments');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new enrollment
router.post('/', async (req, res) => {
    const { studentId, courseId, semester } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO enrollments (studentId, courseId, semester) VALUES (?, ?, ?)',
            [studentId, courseId, semester]
        );
        res.status(201).json({ id: result.insertId, studentId, courseId, semester });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE enrollment
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM enrollments WHERE id = ?', [req.params.id]);
        res.json({ message: 'Enrollment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
