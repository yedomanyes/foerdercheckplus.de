const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Note: On Vercel, the filesystem is read-only. 
// Using /tmp/database.sqlite or a managed database is required for persistence.
// For now, we point to the local file, but warn about persistence.
const dbPath = path.resolve(process.cwd(), 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database connection error:', err.message);
    }
});

module.exports = db;
