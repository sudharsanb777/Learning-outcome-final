import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM courses');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new course
router.post('/', async (req, res) => {
    const { code, title, credits, semester, facultyId } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO courses (code, title, credits, semester, facultyId) VALUES (?, ?, ?, ?, ?)',
            [code, title, credits, semester, facultyId || null]
        );
        res.status(201).json({ id: result.insertId, code, title, credits, semester, facultyId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update course
router.put('/:id', async (req, res) => {
    const { code, title, credits, semester, facultyId } = req.body;
    try {
        await pool.query(
            'UPDATE courses SET code = ?, title = ?, credits = ?, semester = ?, facultyId = ? WHERE id = ?',
            [code, title, credits, semester, facultyId || null, req.params.id]
        );
        res.json({ message: 'Course updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE course
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
        res.json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
