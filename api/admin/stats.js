const db = require('../../lib/db');

export default function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // In a real Vercel app, you would check a JWT/Session cookie here.
    // For now, we provide the endpoint structure.
    
    const stats = {};
    db.get("SELECT COUNT(*) as total FROM programs", [], (err, r) => {
        stats.totalPrograms = r ? r.total : 0;
        db.get("SELECT COUNT(*) as total FROM programs WHERE status = 'Veröffentlicht'", [], (err2, r2) => {
            stats.publishedPrograms = r2 ? r2.total : 0;
            db.get("SELECT COUNT(*) as total FROM contacts WHERE status = 'Neu'", [], (err4, r4) => {
                stats.newContacts = r4 ? r4.total : 0;
                db.get("SELECT COUNT(*) as total FROM newsletter", [], (errNewsletter, rNewsletter) => {
                    stats.newsletterCount = rNewsletter ? rNewsletter.total : 0;
                    res.status(200).json(stats);
                });
            });
        });
    });
}
