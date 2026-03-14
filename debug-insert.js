const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

function runSql(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

async function testInsert() {
    try {
        console.log('--- Testing insertion ---');
        const payload = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            subject: 'Test Subject',
            category: 'Allgemeine Frage',
            message: 'Test message content'
        };

        const result = await runSql(
            'INSERT INTO contacts (firstName, lastName, email, subject, category, message) VALUES (?, ?, ?, ?, ?, ?)',
            [payload.firstName, payload.lastName, payload.email, payload.subject, payload.category, payload.message]
        );
        console.log('Insert successful, ID:', result.lastID);
    } catch (err) {
        console.error('INSERT ERROR:', err.message);
    } finally {
        db.close();
    }
}

testInsert();
