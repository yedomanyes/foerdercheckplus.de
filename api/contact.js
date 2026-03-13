const db = require('../../lib/db');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, subject, category, message } = req.body;

    if (!firstName || !lastName || !email || !subject || !message) {
        return res.status(400).json({ error: 'All required fields must be filled.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }

    db.run(
        'INSERT INTO contacts (firstName, lastName, email, subject, category, message) VALUES (?, ?, ?, ?, ?, ?)',
        [firstName, lastName, email, subject, category, message],
        function(err) {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({ success: true, id: this.lastID });
        }
    );
}
