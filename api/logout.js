export default function handler(req, res) {
    if (req.method === 'POST') {
        // Since Vercel is stateless, we just respond with success.
        // The frontend should clear local session indicators.
        res.status(200).json({ success: true, message: "Logged out. Please clear client-side auth tokens." });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
