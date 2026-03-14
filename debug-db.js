const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

function queryAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

async function run() {
    try {
        console.log('--- Table: contacts ---');
        const info = await queryAll("PRAGMA table_info(contacts)");
        console.log(JSON.stringify(info, null, 2));

        console.log('--- Sample Data check ---');
        const count = await queryAll("SELECT COUNT(*) as count FROM contacts");
        console.log('Total contacts:', count[0].count);
    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        db.close();
    }
}

run();
