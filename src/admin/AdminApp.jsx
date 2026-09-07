import { useEffect, useRef, useState } from 'react'
import rawProjects from '../data/projects.json'

const EMPTY = {
  id: '',
  name: '',
  tagline: '',
  type: '',
  desc: '',
  problem: '',
  build: '',
  stack: [],
  metrics: [],
  status: 'In Development',
  inProduction: false,
  arch: [],
  color: '#0b8f68',
  accent: 'bg-[#0b8f68]',
  image: '',
  link: '',
  repo: '',
}

const STATUSES = ['Architecture Live', 'In Beta Testing', 'In Development', 'Shipped']
const ACCENTS = [
  ['Green', 'bg-[#0b8f68]'],
  ['Sand', 'bg-[#b5aa92]'],
  ['Dark', 'bg-[#090908]'],
  ['Teal', 'bg-[#0f766e]'],
  ['Slate', 'bg-[#475569]'],
]

// Max image size per upload — larger files are rejected before upload
// so a phone photo can't bloat the repo on every save.
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

// In production there is no local upload endpoint — files picked for upload are
// staged here and committed to the repo together with the next save.
const pendingUploads = new Map() // '/uploads/<name>' -> data:image/...;base64,...

function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function getPassword(reprompt) {
  if (!reprompt) {
    const saved = localStorage.getItem('cms-password')
    if (saved) return saved
  }
  const pw = window.prompt(
    reprompt
      ? 'That password was rejected — enter the admin password again:'
      : 'Enter the admin password (set as ADMIN_PASSWORD on Vercel):'
  )
  if (pw) localStorage.setItem('cms-password', pw)
  return pw || null
}

export default function AdminApp() {
  const isDev = import.meta.env.DEV
  const [authed, setAuthed] = useState(isDev || sessionStorage.getItem('cms-authed') === '1')

  if (!authed) {
    return (
      <LoginScreen
        onAuthed={(pw) => {
          sessionStorage.setItem('cms-authed', '1')
          localStorage.setItem('cms-password', pw)
          setAuthed(true)
        }}
      />
    )
  }
  return <AdminPanel />
}

function LoginScreen({ onAuthed }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setChecking(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'X-Admin-Password': pw },
      })
      if (!res.ok) {
        setError(
          res.status === 429
            ? 'Too many attempts — try again in a few minutes'
            : 'Wrong password — try again'
        )
        setChecking(false)
        return
      }
      onAuthed(pw)
    } catch {
      setError('Could not reach the server — check your connection')
      setChecking(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans text-[#101512] grid place-items-center px-6">
      <form onSubmit={submit} className="w-full max-w-[380px]">
        <div className="w-[48px] h-[48px] rounded-[14px] bg-[#101512] text-white grid place-items-center font-serif text-[20px]">
          A
        </div>
        <h1 className="mt-6 font-serif text-[32px] tracking-[-0.03em] leading-none">
          Content management
        </h1>
        <p className="mt-2 text-[14px] text-[#5a665d]">Enter the admin password to continue.</p>
        <input
          type="password"
          autoFocus
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          className={
            'mt-6 w-full rounded-[10px] border bg-white px-3 py-2.5 text-[14px] outline-none focus:border-[#0b8f68] ' +
            (error ? 'border-[#c2542e]' : 'border-[#dde3dd]')
          }
        />
        {error && <div className="mt-2 font-mono text-[11px] text-[#c2542e]">{error}</div>}
        <button
          type="submit"
          disabled={checking || !pw}
          className="mt-4 w-full px-5 py-2.5 rounded-full bg-[#101512] text-white text-[13px] font-[600] hover:opacity-90 disabled:opacity-40"
        >
          {checking ? 'Checking…' : 'Log in'}
        </button>
      </form>
    </div>
  )
}

function AdminPanel() {
  const [projects, setProjects] = useState(null)
  const [editing, setEditing] = useState(null) // null = list view, { project, index } = editing a copy
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const isDev = import.meta.env.DEV

  useEffect(() => {
    if (!isDev) {
      // Production: the current projects are baked into this build.
      setProjects(rawProjects)
      return
    }
    fetch('/api/projects')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [isDev])

  function flash(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  async function persist(next, msg) {
    setSaving(true)
    try {
      if (isDev) {
        const res = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(next),
        })
        if (!res.ok) throw new Error(await res.text())
      } else {
        const uploads = [...pendingUploads.entries()].map(([path, data]) => ({ path, data }))
        const password = getPassword(false)
        if (!password) throw new Error('Password required')
        const res = await fetch('/api/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Admin-Password': password },
          body: JSON.stringify({ projects: next, uploads }),
        })
        if (res.status === 401) {
          localStorage.removeItem('cms-password')
          const retry = getPassword(true)
          if (!retry) throw new Error('Password required')
          const res2 = await fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Admin-Password': retry },
            body: JSON.stringify({ projects: next, uploads }),
          })
          if (!res2.ok) throw new Error((await res2.json()).error || `Save failed (${res2.status})`)
        } else if (!res.ok) {
          throw new Error((await res.json()).error || `Save failed (${res.status})`)
        }
        uploads.forEach(([path]) => pendingUploads.delete(path))
      }
      setProjects(next)
      flash(isDev ? msg : msg + ' — committed, site rebuilding (~1 min)')
    } catch (err) {
      flash(`Save failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  function move(idx, dir) {
    const next = [...projects]
    const [item] = next.splice(idx, 1)
    next.splice(idx + dir, 0, item)
    persist(next, 'Reordered')
  }

  function remove(idx) {
    if (!confirm(`Delete "${projects[idx].name}"? This cannot be undone.`)) return
    persist(projects.filter((_, i) => i !== idx), 'Project deleted')
  }

  function saveProject(project, originalIndex) {
    const clean = {
      ...project,
      id: project.id || slugify(project.name || '') || `project-${Date.now()}`,
      inProduction: !!project.inProduction,
      arch: (project.arch ?? []).map((l) => l.trim()).filter(Boolean),
      stack: project.stack.filter(Boolean),
      metrics: project.metrics.filter((m) => m.k && m.v),
    }
    delete clean._preview
    const next = [...projects]
    if (originalIndex === -1) next.push(clean)
    else next[originalIndex] = clean
    persist(next, originalIndex === -1 ? 'Project added' : 'Project updated')
    setEditing(null)
  }

  if (!projects) {
    return <div className="min-h-screen grid place-items-center font-mono text-[13px]">Loading…</div>
  }

  return (
    <div className="min-h-screen bg-[#fbfcfa] font-sans text-[#101512]">
      <div className="max-w-[880px] mx-auto px-6 py-12">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#0b8f68]">
              CONTENT MANAGEMENT
            </div>
            <h1 className="mt-2 font-serif text-[36px] tracking-[-0.03em] leading-none">Projects</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-[13px] underline underline-offset-4">
              View site ↗
            </a>
            <button
              onClick={() => setEditing({ ...EMPTY, metrics: [{ k: '', v: '' }] })}
              className="px-4 py-2 rounded-full bg-[#101512] text-white text-[13px] font-[600] hover:opacity-90"
            >
              + New project
            </button>
          </div>
        </div>

        <div className="mt-4 font-mono text-[11px] text-[#7a877e]">
          {isDev ? (
            <>Local mode — saves write to src/data/projects.json instantly.</>
          ) : (
            <>Remote mode — saves commit to GitHub with your password and the site redeploys automatically.</>
          )}
        </div>

        {toast && (
          <div className="mt-6 px-4 py-2.5 rounded-[12px] bg-[#eef4ef] border border-[#d6e2d8] font-mono text-[12px]">
            {toast}
          </div>
        )}

        {editing ? (
          <ProjectForm
            initial={editing.project ?? editing}
            originalIndex={editing.project ? editing.index : -1}
            onCancel={() => setEditing(null)}
            onSave={saveProject}
            saving={saving}
          />
        ) : (
          <div className="mt-8 grid gap-3">
            {projects.length === 0 && (
              <div className="rounded-[16px] border border-dashed border-[#c8d2ca] p-8 text-center font-mono text-[12px] text-[#7a877e]">
                No projects yet — add your first one.
              </div>
            )}
            {projects.map((p, i) => (
              <div
                key={p.id + i}
                className="min-w-0 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-[16px] border border-[#dde3dd] bg-white px-4 sm:px-5 py-4"
              >
                <div className="w-[36px] h-[36px] rounded-[10px] bg-[#f3f5f3] border border-[#e3e8e3] grid place-items-center font-mono text-[12px] shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1 basis-[150px]">
                  <div className="font-[700] text-[15px] truncate">{p.name}</div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#7a877e] truncate">
                    {p.tagline} • {p.type}
                  </div>
                </div>
                {p.image ? (
                  <img src={p.image} alt="" className="w-[44px] h-[32px] object-cover rounded-[6px] border border-[#e3e8e3]" />
                ) : null}
                <div className="flex items-center gap-1.5 ml-auto">
                  <IconBtn label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>↑</IconBtn>
                  <IconBtn label="Move down" disabled={i === projects.length - 1} onClick={() => move(i, 1)}>↓</IconBtn>
                  <IconBtn label="Edit" onClick={() => setEditing({ project: p, index: i })}>✎</IconBtn>
                  <IconBtn label="Delete" onClick={() => remove(i)}>✕</IconBtn>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 font-mono text-[11px] leading-[1.7] text-[#8a9690]">
          {isDev
            ? 'Changes are written to src/data/projects.json — run npm run build to publish them. Uploaded images go to public/uploads/.'
            : 'Each save commits projects.json (and any new images) to the portfolio repo; Vercel rebuilds the live site automatically.'}
        </div>
      </div>
    </div>
  )
}

function IconBtn({ children, onClick, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-[30px] h-[30px] rounded-full border border-[#dde3dd] grid place-items-center text-[12px] hover:bg-[#101512] hover:text-white transition disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-inherit"
    >
      {children}
    </button>
  )
}

const inputCls =
  'w-full rounded-[10px] border border-[#dde3dd] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#0b8f68]'

function Field({ label, children }) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690] mb-1.5">{label}</div>
      {children}
    </label>
  )
}

function CustomSelect({ value, onChange, options, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = options.find((o) => o.value === value) ?? { value, label: value }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={inputCls + ' flex items-center justify-between gap-2 text-left'}
      >
        <span className="flex items-center gap-2 truncate">
          {current.swatch && (
            <span className={`w-[12px] h-[12px] rounded-full shrink-0 ${current.swatch}`} />
          )}
          <span className="truncate">{current.label}</span>
        </span>
        <span
          className={`shrink-0 text-[11px] text-[#8a9690] transition-transform ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="absolute z-20 mt-1.5 w-full rounded-[12px] border border-[#dde3dd] bg-white shadow-soft overflow-hidden py-1 max-h-[240px] overflow-auto">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-[14px] transition hover:bg-[#f3f5f3] ${
                o.value === value ? 'font-[700]' : ''
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 truncate">
                  {o.swatch && (
                    <span className={`w-[12px] h-[12px] rounded-full shrink-0 ${o.swatch}`} />
                  )}
                  <span className="truncate">{o.label}</span>
                </span>
                {o.value === value && <span className="text-[#0b8f68] shrink-0">✓</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function ProjectForm({ initial, originalIndex, onSave, onCancel, saving }) {
  const [p, setP] = useState(initial)
  const [uploading, setUploading] = useState(false)
  const isDev = import.meta.env.DEV
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value })

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > MAX_UPLOAD_BYTES) {
      alert(
        `That image is ${(file.size / 1048576).toFixed(1)}MB — max 5MB. Compress it and try again.`
      )
      e.target.value = ''
      return
    }
    setUploading(true)
    try {
      const dataUrl = await readFileAsDataUrl(file)
      if (isDev) {
        // Dev: upload straight to the local server.
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: dataUrl,
        })
        const json = await res.json()
        if (!json.ok) throw new Error(json.error || 'Upload failed')
        setP((prev) => ({ ...prev, image: json.url, _preview: undefined }))
      } else {
        // Production: stage the image; it is committed to the repo on save.
        const ext = (file.name.split('.').pop() || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png'
        const path = `/uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        pendingUploads.set(path, dataUrl)
        setP((prev) => ({ ...prev, image: path, _preview: dataUrl }))
      }
    } catch (err) {
      alert(`Upload failed: ${err.message}`)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="mt-8 rounded-[20px] border border-[#dde3dd] bg-white p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-[700] text-[18px] tracking-[-0.02em]">
          {originalIndex === -1 ? 'New project' : `Edit — ${initial.name}`}
        </h2>
        <button onClick={onCancel} className="text-[13px] underline underline-offset-4">
          Cancel
        </button>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Field label="Name *">
          <input className={inputCls} value={p.name} onChange={set('name')} placeholder="Project name" />
        </Field>
        <Field label="Tagline">
          <input className={inputCls} value={p.tagline} onChange={set('tagline')} placeholder="One-liner" />
        </Field>
        <Field label="Type / category">
          <input className={inputCls} value={p.type} onChange={set('type')} placeholder="AI SYSTEMS / INFRA" />
        </Field>
        <Field label="Status">
          <CustomSelect
            label="Status"
            value={p.status}
            onChange={(v) => setP({ ...p, status: v })}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
          />
        </Field>
        <Field label="Live demo / case study URL">
          <input className={inputCls} value={p.link} onChange={set('link')} placeholder="https://…" />
        </Field>
        <Field label="GitHub repo URL">
          <input className={inputCls} value={p.repo} onChange={set('repo')} placeholder="https://github.com/…" />
        </Field>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-[#dde3dd] bg-[#fbfcfa] px-3 py-2.5">
        <input
          id="inProduction"
          type="checkbox"
          checked={!!p.inProduction}
          onChange={(e) => setP({ ...p, inProduction: e.target.checked })}
          className="w-[16px] h-[16px] accent-[#0b8f68]"
        />
        <label htmlFor="inProduction" className="text-[13px]">
          In production <span className="text-[#8a9690]">— counts toward “X in production” on the homepage</span>
        </label>
      </div>

      <div className="mt-4 grid gap-4">
        <Field label="Description (card text)">
          <textarea className={inputCls} rows={3} value={p.desc} onChange={set('desc')} />
        </Field>
        <Field label="The problem (build notes)">
          <textarea className={inputCls} rows={2} value={p.problem} onChange={set('problem')} />
        </Field>
        <Field label="How I built it (build notes)">
          <textarea className={inputCls} rows={2} value={p.build} onChange={set('build')} />
        </Field>
        <Field label="Architecture (one per line — shown in build notes)">
          <textarea
            className={inputCls}
            rows={4}
            value={(p.arch ?? []).join('\n')}
            onChange={(e) => setP({ ...p, arch: e.target.value.split('\n') })}
            placeholder="— Request → Gateway → Router"
          />
        </Field>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <Field label="Stack (comma separated)">
          <input
            className={inputCls}
            value={p.stack.join(', ')}
            onChange={(e) => setP({ ...p, stack: e.target.value.split(',').map((s) => s.trimStart()) })}
          />
        </Field>
        <Field label="Badge color">
          <CustomSelect
            label="Badge color"
            value={p.accent}
            onChange={(v) => setP({ ...p, accent: v })}
            options={ACCENTS.map(([label, cls]) => ({ value: cls, label, swatch: cls }))}
          />
        </Field>
      </div>

      <div className="mt-4">
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690] mb-1.5">Metrics</div>
        <div className="grid gap-2">
          {p.metrics.map((m, i) => (
            <div key={i} className="grid grid-cols-[1fr_1fr_38px] gap-2">
              <input
                className={inputCls}
                placeholder="Label (e.g. query latency)"
                value={m.k}
                onChange={(e) => {
                  const metrics = [...p.metrics]
                  metrics[i] = { ...m, k: e.target.value }
                  setP({ ...p, metrics })
                }}
              />
              <input
                className={inputCls}
                placeholder="Value (e.g. 620ms)"
                value={m.v}
                onChange={(e) => {
                  const metrics = [...p.metrics]
                  metrics[i] = { ...m, v: e.target.value }
                  setP({ ...p, metrics })
                }}
              />
              <button
                onClick={() => setP({ ...p, metrics: p.metrics.filter((_, j) => j !== i) })}
                className="rounded-[10px] border border-[#dde3dd] hover:bg-[#101512] hover:text-white transition"
                aria-label="Remove metric"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => setP({ ...p, metrics: [...p.metrics, { k: '', v: '' }] })}
            className="justify-self-start px-3 py-1.5 rounded-full border border-[#dde3dd] font-mono text-[11px] hover:bg-[#f3f5f3]"
          >
            + Add metric
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690] mb-1.5">
          Card visual — image (optional)
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            className={inputCls + ' flex-1 min-w-[240px]'}
            placeholder="Image URL or upload below (leave empty for default visual)"
            value={p.image}
            onChange={set('image')}
          />
          <label className="px-4 py-2 rounded-full border border-[#dde3dd] font-mono text-[11px] cursor-pointer hover:bg-[#f3f5f3]">
            {uploading ? 'Reading…' : 'Upload image'}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
        </div>
        {(p._preview || p.image) && (
          <img
            src={p._preview || p.image}
            alt="Preview"
            className="mt-3 max-h-[140px] rounded-[10px] border border-[#e3e8e3] object-cover"
          />
        )}
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={() => onSave(p, originalIndex)}
          disabled={saving || !p.name}
          className="px-5 py-2.5 rounded-full bg-[#101512] text-white text-[13px] font-[600] hover:opacity-90 disabled:opacity-40"
        >
          {saving ? 'Saving…' : originalIndex === -1 ? 'Add project' : 'Save changes'}
        </button>
        <span className="font-mono text-[11px] text-[#8a9690]">
          {isDev ? 'Writes to projects.json and reloads the site' : 'Commits to GitHub and redeploys the live site'}
        </span>
      </div>
    </div>
  )
}
