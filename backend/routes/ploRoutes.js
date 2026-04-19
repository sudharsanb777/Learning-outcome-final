import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// GET all PLOs
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM plos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new PLO
router.post('/', async (req, res) => {
    const { code, description, status } = req.body;
    try {
        const { rows } = await pool.query(
            'INSERT INTO plos (code, description, status) VALUES ($1, $2, $3) RETURNING id',
            [code, description, status || 'Active']
        );
        res.status(201).json({ id: rows[0].id, code, description, status });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update PLO
router.put('/:id', async (req, res) => {
    const { code, description, status } = req.body;
    try {
        await pool.query(
            'UPDATE plos SET code = $1, description = $2, status = $3 WHERE id = $4',
            [code, description, status, req.params.id]
        );
        res.json({ message: 'PLO updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE PLO
router.delete('/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM plos WHERE id = $1', [req.params.id]);
        res.json({ message: 'PLO deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
