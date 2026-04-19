import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all mappings
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM mappings');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new mapping
router.post('/', async (req, res) => {
    const { cloId, ploId, level } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO mappings ("cloId", "ploId", level) VALUES ($1, $2, $3) RETURNING id',
            [cloId, ploId, level]
        );
        res.status(201).json({ id: rows[0].id, cloId, ploId, level });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update mapping
router.put('/:id', async (req, res) => {
    const { level } = req.body;
    try {
        await pool.query(
            'UPDATE mappings SET level = $1 WHERE id = $2',
            [level, req.params.id]
        );
        res.json({ message: 'Mapping updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE mapping
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM mappings WHERE id = $1', [req.params.id]);
        res.json({ message: 'Mapping deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
