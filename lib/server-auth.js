import crypto from 'node:crypto'

// Shared password check for the CMS API functions (api/auth.js, api/save.js).
// - Constant-time comparison (no timing leak on the password).
// - Per-IP attempt throttling: 8 wrong tries locks the IP out for 15 minutes.
//   Note: state is per serverless instance, so this raises the cost of
//   brute-forcing rather than eliminating it — a long random ADMIN_PASSWORD
//   remains the real defense.

const attempts = new Map() // ip -> { fails, lockedUntil }
const MAX_FAILS = 8
const LOCK_MS = 15 * 60 * 1000

function getIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function safeEqual(a, b) {
  const ba = Buffer.from(a ?? '')
  const bb = Buffer.from(b ?? '')
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

export function checkAdminPassword(req) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return { ok: false, status: 500, error: 'Server not configured: set ADMIN_PASSWORD env var.' }
  }
  const ip = getIp(req)
  const now = Date.now()
  const rec = attempts.get(ip)
  if (rec && rec.lockedUntil > now) {
    return { ok: false, status: 429, error: 'Too many attempts — try again later.' }
  }
  const provided = req.headers['x-admin-password']
  if (typeof provided !== 'string' || !safeEqual(provided, expected)) {
    const fails = (rec ? rec.fails : 0) + 1
    attempts.set(ip, { fails, lockedUntil: fails >= MAX_FAILS ? now + LOCK_MS : 0 })
    if (attempts.size > 1000) {
      for (const [key, val] of attempts) {
        if (val.lockedUntil <= now && val.fails < MAX_FAILS) attempts.delete(key)
      }
    }
    return { ok: false, status: 401, error: 'Wrong password' }
  }
  attempts.delete(ip)
  return { ok: true }
}
