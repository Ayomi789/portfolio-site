import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(__dirname)
const projectsFile = path.join(root, 'src/data/projects.json')
const uploadsDir = path.join(root, 'public/uploads')

// Dev-only CMS backend: the /admin panel calls these to persist project data
// and image uploads straight into the repo, so a rebuild bakes them in.
function cmsDevPlugin() {
  return {
    name: 'cms-dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/projects', async (req, res) => {
        try {
          if (req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json')
            res.end(fs.readFileSync(projectsFile, 'utf-8'))
            return
          }
          if (req.method === 'PUT') {
            const body = await readBody(req)
            const projects = JSON.parse(body)
            if (!Array.isArray(projects)) throw new Error('Expected an array of projects')
            fs.writeFileSync(projectsFile, JSON.stringify(projects, null, 2) + '\n')
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
            server.ws.send({ type: 'full-reload' })
            return
          }
          res.statusCode = 405
          res.end('Method not allowed')
        } catch (err) {
          res.statusCode = 500
          res.end(String(err?.message || err))
        }
      })

      server.middlewares.use('/api/upload', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('Method not allowed')
          return
        }
        try {
          const body = await readBody(req)
          const match = /^data:image\/(png|jpe?g|gif|webp|avif|svg\+xml);base64,(.+)$/.exec(body)
          if (!match) throw new Error('Expected a data:image URL payload')
          const ext = match[1] === 'jpeg' ? 'jpg' : match[1] === 'svg+xml' ? 'svg' : match[1]
          const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
          fs.mkdirSync(uploadsDir, { recursive: true })
          fs.writeFileSync(path.join(uploadsDir, name), Buffer.from(match[2], 'base64'))
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: true, url: `/uploads/${name}` }))
        } catch (err) {
          res.statusCode = 500
          res.end(String(err?.message || err))
        }
      })
    },
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cmsDevPlugin()],
})
