const db = require('../../lib/db');

export default function handler(req, res) {
    if (req.method === 'GET') {
        db.all("SELECT * FROM programs ORDER BY createdAt DESC", [], (err, rows) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(200).json(rows);
        });
    } else if (req.method === 'POST') {
        const { title, slug, shortDesc, content, category, region, fundingAmount, status, imageUrl, buttons } = req.body;
        db.run(
            `INSERT INTO programs (title, slug, shortDesc, content, category, region, fundingAmount, status, imageUrl, buttons) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, slug, shortDesc, content, category, region, fundingAmount, status || 'Entwurf', imageUrl, JSON.stringify(buttons || [])],
            function(err) {
                if (err) return res.status(500).json({ error: 'Database error' });
                res.status(201).json({ success: true, id: this.lastID });
            }
        );
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
