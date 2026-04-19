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
        const bcrypt = await import('bcryptjs');
        const defaultPassword = await bcrypt.hash('password123', 10);
        
        for (const user of users) {
             await pool.query(
                `INSERT IGNORE INTO users (id, name, email, password, role, status, department, enrollmentYear, major) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [user.id, user.name, user.email, defaultPassword, user.role, user.status, user.department, user.enrollmentYear, user.major]
            );
        }

        const plos = [
            { id: 1, code: 'PLO1', description: 'Engineering Knowledge', status: 'Active' },
            { id: 2, code: 'PLO2', description: 'Problem Analysis', status: 'Active' },
            { id: 3, code: 'PLO3', description: 'Design/Development of Solutions', status: 'Active' }
        ];
        for (const plo of plos) {
            await pool.query(`INSERT IGNORE INTO plos (id, code, description, status) VALUES (?, ?, ?, ?)`, [plo.id, plo.code, plo.description, plo.status]);
        }

        const courses = [
            { id: 1, code: 'CS101', title: 'Introduction to Programming', credits: 3, facultyId: 2, semester: 'Fall 2023' },
            { id: 2, code: 'CS201', title: 'Data Structures and Algorithms', credits: 4, facultyId: 2, semester: 'Spring 2024' }
        ];
        for (const course of courses) {
            await pool.query(`INSERT IGNORE INTO courses (id, code, title, credits, facultyId, semester) VALUES (?, ?, ?, ?, ?, ?)`, [course.id, course.code, course.title, course.credits, course.facultyId, course.semester]);
        }

        const clos = [
            { id: 1, courseId: 1, code: 'CLO1', description: 'Understand basic programming constructs.', bloomLevel: 'Understand' },
            { id: 2, courseId: 1, code: 'CLO2', description: 'Write simple programs using functions and loops.', bloomLevel: 'Apply' },
            { id: 3, courseId: 2, code: 'CLO1', description: 'Analyze the time and space complexity of algorithms.', bloomLevel: 'Analyze' }
        ];
        for (const clo of clos) {
            await pool.query(`INSERT IGNORE INTO clos (id, courseId, code, description, bloomLevel) VALUES (?, ?, ?, ?, ?)`, [clo.id, clo.courseId, clo.code, clo.description, clo.bloomLevel]);
        }

        const mappings = [
            { id: 1, cloId: 1, ploId: 1, level: 3 },
            { id: 2, cloId: 2, ploId: 2, level: 2 },
            { id: 3, cloId: 3, ploId: 2, level: 3 }
        ];
        for (const mapping of mappings) {
            await pool.query(`INSERT IGNORE INTO mappings (id, cloId, ploId, level) VALUES (?, ?, ?, ?)`, [mapping.id, mapping.cloId, mapping.ploId, mapping.level]);
        }

        const enrollments = [
            { id: 1, studentId: 4, courseId: 1, semester: 'Fall 2023' },
            { id: 2, studentId: 5, courseId: 1, semester: 'Fall 2023' },
            { id: 3, studentId: 4, courseId: 2, semester: 'Spring 2024' }
        ];
        for (const enrollment of enrollments) {
            await pool.query(`INSERT IGNORE INTO enrollments (id, studentId, courseId, semester) VALUES (?, ?, ?, ?)`, [enrollment.id, enrollment.studentId, enrollment.courseId, enrollment.semester]);
        }

        const assessments = [
            { id: 1, studentId: 4, courseId: 1, cloId: 1, score: 85, type: 'Midterm' },
            { id: 2, studentId: 4, courseId: 1, cloId: 2, score: 90, type: 'Final' },
            { id: 3, studentId: 5, courseId: 1, cloId: 1, score: 70, type: 'Midterm' }
        ];
        for (const assessment of assessments) {
            await pool.query(`INSERT IGNORE INTO assessments (id, studentId, courseId, cloId, score, type) VALUES (?, ?, ?, ?, ?, ?)`, [assessment.id, assessment.studentId, assessment.courseId, assessment.cloId, assessment.score, assessment.type]);
        }

        res.json({ message: "SUCCESS! All mock data has been injected!" });
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
