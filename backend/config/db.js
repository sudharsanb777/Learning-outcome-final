import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Using environment variables or fallback values
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lom_db',
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

export default pool;
