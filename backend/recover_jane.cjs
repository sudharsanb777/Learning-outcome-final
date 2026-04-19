const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function run() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'lom_db'
    });
    
    await conn.query(`INSERT INTO users (id, name, email, role, status, department) VALUES (2, 'Dr. Jane Smith', 'jane.smith@uni.edu', 'faculty', 'Active', 'Computer Science') ON DUPLICATE KEY UPDATE email='jane.smith@uni.edu'`);
    
    // Also make sure she has the CS101 course
    await conn.query(`INSERT IGNORE INTO courses (id, code, title, credits, facultyId, semester) VALUES (1, 'CS101', 'Introduction to Programming', 3, 2, 'Fall 2023')`);
    
    console.log('Jane Smith Restored with ID 2');
    process.exit(0);
}
run();
