const db = require('../../lib/db');

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
    }

    db.run(
        'INSERT INTO newsletter (email) VALUES (?)',
        [email],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(409).json({ error: 'Bereits abonniert.' });
                }
                return res.status(500).json({ error: 'Datenbankfehler.' });
            }
            res.status(200).json({ success: true, id: this.lastID });
        }
    );
}
