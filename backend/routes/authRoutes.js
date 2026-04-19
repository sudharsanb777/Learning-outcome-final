import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, role, department, major } = req.body;
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Name, email, password, and role are required." });
    }

    try {
        // Check if user already exists
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert new user
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password, role, status, department, enrollmentYear, major) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [name, email, hashedPassword, role, 'Active', department || null, null, major || null]
        );

        res.status(201).json({ 
            message: "User registered successfully",
            user: { id: result.insertId, name, email, role }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        res.json({
            message: "Login successful",
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                role: user.role, 
                department: user.department 
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
