import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lom_db',
    port: process.env.DB_PORT || 5432,
    max: 10
});

const initialData = {
        users: [
            { name: 'Aisha Khan', email: 'admin@uni.edu', role: 'admin', status: 'Active', department: 'Administration', enrollmentYear: null, major: null },
            { name: 'Dr. Jane Smith', email: 'jane.smith@uni.edu', role: 'faculty', status: 'Active', department: 'Computer Science', enrollmentYear: null, major: null },
            { name: 'Dr. Robert Brown', email: 'robert.brown@uni.edu', role: 'faculty', status: 'Active', department: 'Software Engineering', enrollmentYear: null, major: null },
            { name: 'Dr. Emily Clarke', email: 'emily.clarke@uni.edu', role: 'faculty', status: 'Active', department: 'Information Systems', enrollmentYear: null, major: null },
            { name: 'Alice Williams', email: 'alice.williams@uni.edu', role: 'student', status: 'Active', department: 'Computer Science', enrollmentYear: 2023, major: 'CS' },
            { name: 'Bob Johnson', email: 'bob.johnson@uni.edu', role: 'student', status: 'Active', department: 'Computer Science', enrollmentYear: 2023, major: 'CS' },
            { name: 'Charlie Davies', email: 'charlie.davies@uni.edu', role: 'student', status: 'Active', department: 'Software Engineering', enrollmentYear: 2022, major: 'SE' },
        ],
    plos: [
      { code: 'PLO1', description: 'Engineering Knowledge: Apply knowledge of mathematics, science, engineering fundamentals.', status: 'Active' },
      { code: 'PLO2', description: 'Problem Analysis: Identify, formulate, review research literature, and analyze complex engineering problems.', status: 'Active' },
      { code: 'PLO3', description: 'Design/Development of Solutions: Design solutions for complex engineering problems.', status: 'Active' },
    ],
    courses: [
      { code: 'CS101', title: 'Introduction to Programming', credits: 3, facultyId: 2, semester: 'Fall 2023' },
      { code: 'CS201', title: 'Data Structures and Algorithms', credits: 4, facultyId: 3, semester: 'Spring 2024' },
    ],
    clos: [
      { courseId: 1, code: 'CLO1', description: 'Understand basic programming constructs.', bloomLevel: 'Understand' },
      { courseId: 1, code: 'CLO2', description: 'Write simple programs using functions and loops.', bloomLevel: 'Apply' },
      { courseId: 2, code: 'CLO1', description: 'Analyze the time and space complexity of algorithms.', bloomLevel: 'Analyze' },
    ],
    mappings: [
      { cloId: 1, ploId: 1, level: 3 },
      { cloId: 2, ploId: 2, level: 2 },
      { cloId: 3, ploId: 2, level: 3 },
    ],
    enrollments: [
      { studentId: 5, courseId: 1, semester: 'Fall 2023' },
      { studentId: 6, courseId: 1, semester: 'Fall 2023' },
      { studentId: 5, courseId: 2, semester: 'Spring 2024' },
    ],
    assessments: [
      { studentId: 5, courseId: 1, cloId: 1, score: 85, type: 'Midterm' },
      { studentId: 5, courseId: 1, cloId: 2, score: 90, type: 'Final' },
      { studentId: 6, courseId: 1, cloId: 1, score: 70, type: 'Midterm' },
    ]
};

async function seedDatabase() {
    console.log('Connecting to PostgreSQL...');
    let client;
    try {
        client = await pool.connect();
        console.log('Connected.');

        // 1. Run schema.sql to create Tables
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        console.log('Executing schema.sql...');
        await client.query(schema);
        console.log('Tables created successfully.');

        // 2. Insert Data
        console.log('Seeding Users...');
        for (const user of initialData.users) {
            await client.query(
                `INSERT INTO users (name, email, role, status, department, "enrollmentYear", major) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [user.name, user.email, user.role, user.status, user.department, user.enrollmentYear, user.major]
            );
        }

        console.log('Seeding PLOs...');
        for (const plo of initialData.plos) {
            await client.query(
                'INSERT INTO plos (code, description, status) VALUES ($1, $2, $3)',
                [plo.code, plo.description, plo.status]
            );
        }

        console.log('Seeding Courses...');
        for (const course of initialData.courses) {
            await client.query(
                'INSERT INTO courses (code, title, credits, "facultyId", semester) VALUES ($1, $2, $3, $4, $5)',
                [course.code, course.title, course.credits, course.facultyId, course.semester]
            );
        }

        console.log('Seeding CLOs...');
        for (const clo of initialData.clos) {
            await client.query(
                'INSERT INTO clos ("courseId", code, description, "bloomLevel") VALUES ($1, $2, $3, $4)',
                [clo.courseId, clo.code, clo.description, clo.bloomLevel]
            );
        }

        console.log('Seeding Mappings...');
        for (const mapping of initialData.mappings) {
            await client.query(
                'INSERT INTO mappings ("cloId", "ploId", level) VALUES ($1, $2, $3)',
                [mapping.cloId, mapping.ploId, mapping.level]
            );
        }

        console.log('Seeding Enrollments...');
        for (const enrollment of initialData.enrollments) {
            await client.query(
                'INSERT INTO enrollments ("studentId", "courseId", semester) VALUES ($1, $2, $3)',
                [enrollment.studentId, enrollment.courseId, enrollment.semester]
            );
        }

        console.log('Seeding Assessments...');
        for (const assessment of initialData.assessments) {
            await client.query(
                'INSERT INTO assessments ("studentId", "courseId", "cloId", score, type) VALUES ($1, $2, $3, $4, $5)',
                [assessment.studentId, assessment.courseId, assessment.cloId, assessment.score, assessment.type]
            );
        }

        console.log('🎉 Database seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        if (client) client.release();
        await pool.end();
        process.exit();
    }
}

seedDatabase();
