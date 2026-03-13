const db = require('../../../lib/db');

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        db.get("SELECT * FROM programs WHERE id = ?", [id], (err, row) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            if (!row) return res.status(404).json({ error: 'Program not found' });
            res.status(200).json(row);
        });
    } else if (req.method === 'PUT') {
        const { title, slug, shortDesc, content, category, region, fundingAmount, status, imageUrl, buttons } = req.body;
        db.run(
            `UPDATE programs SET title=?, slug=?, shortDesc=?, content=?, category=?, region=?, fundingAmount=?, status=?, imageUrl=?, buttons=?, updatedAt=CURRENT_TIMESTAMP 
             WHERE id=?`,
            [title, slug, shortDesc, content, category, region, fundingAmount, status, imageUrl, JSON.stringify(buttons || []), id],
            function(err) {
                if (err) return res.status(500).json({ error: 'Database error' });
                res.status(200).json({ success: true });
            }
        );
    } else if (req.method === 'DELETE') {
        db.run("DELETE FROM programs WHERE id = ?", [id], function(err) {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.status(200).json({ success: true });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
