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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
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

app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running beautifully connected to MySQL!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
