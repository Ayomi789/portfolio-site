// Vercel serverless function — login check for the admin panel.
// The panel is hidden behind a login screen until this endpoint
// confirms the password from the ADMIN_PASSWORD env var.
import { checkAdminPassword } from '../lib/server-auth.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Password')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const check = checkAdminPassword(req)
  if (!check.ok) {
    return res.status(check.status).json({ error: check.error })
  }
  return res.status(200).json({ ok: true })
}
