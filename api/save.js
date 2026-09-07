// Vercel serverless function — remote save for the CMS.
// The hosted /admin panel POSTs here with a password; this function commits
// projects.json (+ any uploaded images) to the portfolio repo via the GitHub API.
// The push triggers a Vercel rebuild, so the live site updates a minute later.
//
// Required environment variables (set in Vercel project settings):
//   ADMIN_PASSWORD — the password the admin panel asks for
//   GITHUB_TOKEN   — fine-grained PAT: only this repo, Contents: Read and write
//   GITHUB_REPO    — e.g. "Ayomi789/portfolio-site" (falls back to this)
//   GITHUB_BRANCH  — defaults to "main"

import { checkAdminPassword } from '../lib/server-auth.js'

const REPO_DEFAULT = 'Ayomi789/portfolio-site'
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

function gh(token, path, opts = {}) {
  return fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  })
}

async function putFile(token, repo, branch, filePath, content, message) {
  const get = await gh(token, `/repos/${repo}/contents/${encodeURI(filePath)}?ref=${branch}`)
  const sha = get.ok ? (await get.json()).sha : null
  const res = await gh(token, `/repos/${repo}/contents/${encodeURI(filePath)}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  })
  if (!res.ok) throw new Error(`GitHub rejected ${filePath}: ${res.status} ${await res.text()}`)
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  try {
    const check = checkAdminPassword(req)
    if (!check.ok) {
      return res.status(check.status).json({ error: check.error })
    }
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      return res.status(500).json({
        error: 'Server not configured: set GITHUB_TOKEN env var in Vercel.',
      })
    }

    const repo = process.env.GITHUB_REPO || REPO_DEFAULT
    const branch = process.env.GITHUB_BRANCH || 'main'
    const { projects, uploads = [] } = req.body || {}

    if (!Array.isArray(projects)) {
      return res.status(400).json({ error: 'Expected projects array' })
    }
    if (uploads.length > 8) {
      return res.status(400).json({ error: 'Too many uploads in one save' })
    }

    // Images first, so they exist by the time the rebuild picks up projects.json.
    for (const up of uploads) {
      if (!/^\/uploads\/[\w.-]+$/.test(up.path) || !/^data:image\//.test(up.data)) {
        return res.status(400).json({ error: `Invalid upload: ${up.path}` })
      }
      const binary = Buffer.from(up.data.split(',')[1] || '', 'base64')
      if (binary.length > MAX_UPLOAD_BYTES) {
        return res.status(400).json({ error: `Image too large (max 5MB): ${up.path}` })
      }
      await putFile(token, repo, branch, `public${up.path}`, binary, `cms: upload image`)
    }

    await putFile(
      token,
      repo,
      branch,
      'src/data/projects.json',
      JSON.stringify(projects, null, 2) + '\n',
      'cms: update projects'
    )

    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ error: String(err?.message || err) })
  }
}
