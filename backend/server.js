import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import ploRoutes from './routes/ploRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import cloRoutes from './routes/cloRoutes.js';
import mappingRoutes from './routes/mappingRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/plos', ploRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/clos', cloRoutes);
app.use('/api/mappings', mappingRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assessments', assessmentRoutes);

import fs from 'fs';
import path from 'path';
import pool from './config/db.js';

app.get('/api/build-db', async (req, res) => {
    try {
        const schemaPath = path.resolve('database/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        const statements = schema.split(';').filter(s => s.trim().length > 0);
        for (let statement of statements) {
            await pool.query(statement + ';');
        }
        res.json({ message: "WOW! Database tables and schema successfully built in TiDB!" });
    } catch (err) {
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});
app.get('/api/seed-db', async (req, res) => {
    try {
        const users = [
            { id: 1, name: 'Aisha Khan', email: 'admin@uni.edu', role: 'admin', status: 'Active', department: 'Administration', enrollmentYear: null, major: null },
            { id: 2, name: 'Dr. Jane Smith', email: 'jane.smith@uni.edu', role: 'faculty', status: 'Active', department: 'Computer Science', enrollmentYear: null, major: null },
            { id: 3, name: 'Dr. Robert Brown', email: 'robert.brown@uni.edu', role: 'faculty', status: 'Active', department: 'Software Engineering', enrollmentYear: null, major: null },
            { id: 6, name: 'Dr. Emily Clarke', email: 'emily.clarke@uni.edu', role: 'faculty', status: 'Active', department: 'Information Systems', enrollmentYear: null, major: null },
            { id: 4, name: 'Alice Williams', email: 'alice.williams@uni.edu', role: 'student', status: 'Active', department: 'Computer Science', enrollmentYear: 2023, major: 'CS' },
            { id: 5, name: 'Bob Johnson', email: 'bob.johnson@uni.edu', role: 'student', status: 'Active', department: 'Computer Science', enrollmentYear: 2023, major: 'CS' },
            { id: 7, name: 'Charlie Davies', email: 'charlie.davies@uni.edu', role: 'student', status: 'Active', department: 'Software Engineering', enrollmentYear: 2022, major: 'SE' }
        ];
        for (const user of users) {
             await pool.query(
                `INSERT IGNORE INTO users (id, name, email, password, role, status, department, enrollmentYear, major) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [user.id, user.name, user.email, '$2a$10$C82A2H9Wn8/wSReeMvI9nOmT9yqjG2S3IebTjUZZW9kP/868hC1Bq', user.role, user.status, user.department, user.enrollmentYear, user.major]
            );
        }
        res.json({ message: "SUCCESS! Accounts injected. You can login as admin!" });
    } catch (err) {
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});


app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running beautifully connected to MySQL!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
