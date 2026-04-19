import pool from './config/db.js';

async function testConnection() {
    try {
        console.log('Attempting to connect to PostgreSQL database...');
        const client = await pool.connect();
        console.log('Connected successfully!');
        client.release();
    } catch (err) {
        console.error('Connection failed with error:', err.message);
        console.error('Raw Error:', err);
    } finally {
        process.exit();
    }
}

testConnection();
