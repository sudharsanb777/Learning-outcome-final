import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function buildDatabase() {
    console.log("Connecting to TiDB...");
    try {
        const pool = mysql.createPool({
            host: 'gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com',
            user: 'hZBMbeLxjADoHDk.root',
            password: 'DJFDwp2K0VavV6Fe',
            database: 'test',
            port: 4000,
            ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true },
            multipleStatements: true
        });

        console.log("Reading schema.sql...");
        const schemaPath = path.resolve('backend/database/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log("Executing schema.sql...");
        await pool.query(schemaSql);
        
        console.log("SUCCESS! Tables created successfully!");
        process.exit(0);
    } catch (err) {
        console.error("FAILED TO BUILD DB:", err);
        process.exit(1);
    }
}

buildDatabase();
