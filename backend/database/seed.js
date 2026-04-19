import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true, // Needed to run schema.sql
    connectionLimit: 10
});

const initialData = {
        users: [
            { id: 1, name: 'Aisha Khan', email: 'admin@uni.edu', role: 'admin', status: 'Active', department: 'Administration', enrollmentYear: null, major: null },
            { id: 2, name: 'Dr. Jane Smith', email: 'jane.smith@uni.edu', role: 'faculty', status: 'Active', department: 'Computer Science', enrollmentYear: null, major: null },
            { id: 3, name: 'Dr. Robert Brown', email: 'robert.brown@uni.edu', role: 'faculty', status: 'Active', department: 'Software Engineering', enrollmentYear: null, major: null },
            { id: 6, name: 'Dr. Emily Clarke', email: 'emily.clarke@uni.edu', role: 'faculty', status: 'Active', department: 'Information Systems', enrollmentYear: null, major: null },
            { id: 4, name: 'Alice Williams', email: 'alice.williams@uni.edu', role: 'student', status: 'Active', department: 'Computer Science', enrollmentYear: 2023, major: 'CS' },
            { id: 5, name: 'Bob Johnson', email: 'bob.johnson@uni.edu', role: 'student', status: 'Active', department: 'Computer Science', enrollmentYear: 2023, major: 'CS' },
            { id: 7, name: 'Charlie Davies', email: 'charlie.davies@uni.edu', role: 'student', status: 'Active', department: 'Software Engineering', enrollmentYear: 2022, major: 'SE' },
        ],
    plos: [
      { id: 1, code: 'PLO1', description: 'Engineering Knowledge: Apply knowledge of mathematics, science, engineering fundamentals.', status: 'Active' },
      { id: 2, code: 'PLO2', description: 'Problem Analysis: Identify, formulate, review research literature, and analyze complex engineering problems.', status: 'Active' },
      { id: 3, code: 'PLO3', description: 'Design/Development of Solutions: Design solutions for complex engineering problems.', status: 'Active' },
    ],
    courses: [
      { id: 1, code: 'CS101', title: 'Introduction to Programming', credits: 3, facultyId: 2, semester: 'Fall 2023' },
      { id: 2, code: 'CS201', title: 'Data Structures and Algorithms', credits: 4, facultyId: 3, semester: 'Spring 2024' },
    ],
    clos: [
      { id: 1, courseId: 1, code: 'CLO1', description: 'Understand basic programming constructs.', bloomLevel: 'Understand' },
      { id: 2, courseId: 1, code: 'CLO2', description: 'Write simple programs using functions and loops.', bloomLevel: 'Apply' },
      { id: 3, courseId: 2, code: 'CLO1', description: 'Analyze the time and space complexity of algorithms.', bloomLevel: 'Analyze' },
    ],
    mappings: [
      { id: 1, cloId: 1, ploId: 1, level: 3 },
      { id: 2, cloId: 2, ploId: 2, level: 2 },
      { id: 3, cloId: 3, ploId: 2, level: 3 },
    ],
    enrollments: [
      { id: 1, studentId: 4, courseId: 1, semester: 'Fall 2023' },
      { id: 2, studentId: 5, courseId: 1, semester: 'Fall 2023' },
      { id: 3, studentId: 4, courseId: 2, semester: 'Spring 2024' },
    ],
    assessments: [
      { id: 1, studentId: 4, courseId: 1, cloId: 1, score: 85, type: 'Midterm' },
      { id: 2, studentId: 4, courseId: 1, cloId: 2, score: 90, type: 'Final' },
      { id: 3, studentId: 5, courseId: 1, cloId: 1, score: 70, type: 'Midterm' },
    ]
};

async function seedDatabase() {
    console.log('Connecting to MySQL...');
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Connected.');

        // 1. Run schema.sql to create DB and Tables
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        console.log('Executing schema.sql...');
        await connection.query(schema);
        console.log('Database and Tables created successfully.');

        // Ensure we are using the new DB exclusively for the following inserts
        await connection.query('USE lom_db;');

        // 2. Insert Data
        console.log('Seeding Users...');
        for (const user of initialData.users) {
            await connection.query(
                'INSERT INTO users (id, name, email, role, status, department, enrollmentYear, major) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [user.id, user.name, user.email, user.role, user.status, user.department, user.enrollmentYear, user.major]
            );
        }

        console.log('Seeding PLOs...');
        for (const plo of initialData.plos) {
            await connection.query(
                'INSERT INTO plos (id, code, description, status) VALUES (?, ?, ?, ?)',
                [plo.id, plo.code, plo.description, plo.status]
            );
        }

        console.log('Seeding Courses...');
        for (const course of initialData.courses) {
            await connection.query(
                'INSERT INTO courses (id, code, title, credits, facultyId, semester) VALUES (?, ?, ?, ?, ?, ?)',
                [course.id, course.code, course.title, course.credits, course.facultyId, course.semester]
            );
        }

        console.log('Seeding CLOs...');
        for (const clo of initialData.clos) {
            await connection.query(
                'INSERT INTO clos (id, courseId, code, description, bloomLevel) VALUES (?, ?, ?, ?, ?)',
                [clo.id, clo.courseId, clo.code, clo.description, clo.bloomLevel]
            );
        }

        console.log('Seeding Mappings...');
        for (const mapping of initialData.mappings) {
            await connection.query(
                'INSERT INTO mappings (id, cloId, ploId, level) VALUES (?, ?, ?, ?)',
                [mapping.id, mapping.cloId, mapping.ploId, mapping.level]
            );
        }

        console.log('Seeding Enrollments...');
        for (const enrollment of initialData.enrollments) {
            await connection.query(
                'INSERT INTO enrollments (id, studentId, courseId, semester) VALUES (?, ?, ?, ?)',
                [enrollment.id, enrollment.studentId, enrollment.courseId, enrollment.semester]
            );
        }

        console.log('Seeding Assessments...');
        for (const assessment of initialData.assessments) {
            await connection.query(
                'INSERT INTO assessments (id, studentId, courseId, cloId, score, type) VALUES (?, ?, ?, ?, ?, ?)',
                [assessment.id, assessment.studentId, assessment.courseId, assessment.cloId, assessment.score, assessment.type]
            );
        }

        console.log('🎉 Database seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

seedDatabase();
