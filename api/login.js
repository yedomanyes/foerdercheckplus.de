const db = require('../../lib/db');
const bcrypt = require('bcrypt');
// Note: Stateless Vercel functions cannot use local sessions (express-session).
// Long-term, a JWT or a shared session store (Redis) is needed.
// For now, we provide the logic, but advise on session management.

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // Recommendation: Respond with a JWT or set a secure cookie here.
            // Traditional sessions won't persist across serverless calls without a store.
            res.status(200).json({ 
                success: true, 
                user: { id: user.id, role: user.role },
                message: "Login successful. Session management required for persistence."
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
}
