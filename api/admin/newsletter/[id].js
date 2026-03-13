const db = require('../../../lib/db');

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        db.run("DELETE FROM newsletter WHERE id = ?", [id], function(err) {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(200).json({ success: true });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
