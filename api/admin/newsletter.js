const db = require('../../lib/db');

export default function handler(req, res) {
    if (req.method === 'GET') {
        db.all("SELECT * FROM newsletter ORDER BY createdAt DESC", [], (err, rows) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(200).json(rows);
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
