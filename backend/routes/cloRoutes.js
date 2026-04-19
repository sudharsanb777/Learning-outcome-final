import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all CLOs
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM clos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new CLO
router.post('/', async (req, res) => {
    const { courseId, code, description, bloomLevel } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO clos ("courseId", code, description, "bloomLevel") VALUES ($1, $2, $3, $4) RETURNING id',
            [courseId, code, description, bloomLevel]
        );
        res.status(201).json({ id: rows[0].id, courseId, code, description, bloomLevel });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update CLO
router.put('/:id', async (req, res) => {
    const { courseId, code, description, bloomLevel } = req.body;
    try {
        await pool.query(
            'UPDATE clos SET "courseId" = $1, code = $2, description = $3, "bloomLevel" = $4 WHERE id = $5',
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
        await pool.query('DELETE FROM clos WHERE id = $1', [req.params.id]);
        res.json({ message: 'CLO deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
