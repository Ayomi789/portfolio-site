// Vercel serverless function — login check for the admin panel.
// The panel is hidden behind a login screen until this endpoint
// confirms the password from the ADMIN_PASSWORD env var.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Password')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const password = process.env.ADMIN_PASSWORD
  if (!password) {
    return res.status(500).json({ error: 'Server not configured: set ADMIN_PASSWORD env var.' })
  }
  if (req.headers['x-admin-password'] !== password) {
    return res.status(401).json({ error: 'Wrong password' })
  }
  return res.status(200).json({ ok: true })
}
