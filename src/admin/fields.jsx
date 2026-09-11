import { useEffect, useState } from 'react'
import rawSite from '../data/site.json'

export const inputCls =
  'w-full rounded-[10px] border border-[#dde3dd] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#0b8f68]'

export function Field({ label, children }) {
  return (
    <label className="block">
      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690] mb-1.5">{label}</div>
      {children}
    </label>
  )
}

export function TextField({ label, value, onChange, placeholder }) {
  return (
    <Field label={label}>
      <input
        className={inputCls}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Field>
  )
}

export function AreaField({ label, value, onChange, rows = 3, placeholder }) {
  return (
    <Field label={label}>
      <textarea
        className={inputCls}
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Field>
  )
}

// Textarea bound to a string array, one item per line.
export function LinesArea({ label, values, onChange, rows = 3, placeholder }) {
  return (
    <Field label={label}>
      <textarea
        className={inputCls}
        rows={rows}
        value={(values ?? []).join('\n')}
        onChange={(e) => onChange(e.target.value.split('\n'))}
        placeholder={placeholder}
      />
    </Field>
  )
}

// Generic row editor for arrays of flat objects, e.g. [{k, v}].
// columns: [{ key, label, area? }] — area renders a textarea instead of an input.
export function RowEditor({ rows, columns, onChange, addLabel = '+ Add row' }) {
  const list = rows ?? []

  const setCell = (i, key) => (e) => {
    onChange(list.map((r, j) => (j === i ? { ...r, [key]: e.target.value } : r)))
  }

  const removeRow = (i) => onChange(list.filter((_, j) => j !== i))

  const addRow = () => {
    const blank = {}
    columns.forEach((c) => {
      blank[c.key] = ''
    })
    onChange([...list, blank])
  }

  return (
    <div>
      <div className="grid gap-2">
        {list.map((row, i) => (
          <div
            key={i}
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr)) 38px` }}
          >
            {columns.map((c) =>
              c.area ? (
                <textarea
                  key={c.key}
                  className={inputCls}
                  rows={2}
                  placeholder={c.label}
                  value={row[c.key] ?? ''}
                  onChange={setCell(i, c.key)}
                />
              ) : (
                <input
                  key={c.key}
                  className={inputCls}
                  placeholder={c.label}
                  value={row[c.key] ?? ''}
                  onChange={setCell(i, c.key)}
                />
              )
            )}
            <button
              onClick={() => removeRow(i)}
              className="rounded-[10px] border border-[#dde3dd] hover:bg-[#101512] hover:text-white transition"
              aria-label="Remove row"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={addRow}
          className="justify-self-start px-3 py-1.5 rounded-full border border-[#dde3dd] font-mono text-[11px] hover:bg-[#f3f5f3]"
        >
          {addLabel}
        </button>
      </div>
    </div>
  )
}

export function SectionLabel({ children }) {
  return (
    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690] mb-1.5">
      {children}
    </div>
  )
}

// Card wrapper shared by every content tab: title + save button.
export function TabShell({ title, saving, onSave, children }) {
  return (
    <div className="mt-8 rounded-[20px] border border-[#dde3dd] bg-white p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-[700] text-[18px] tracking-[-0.02em]">{title}</h2>
        <button
          onClick={onSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-full bg-[#101512] text-white text-[13px] font-[600] hover:opacity-90 disabled:opacity-40"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
      <div className="mt-6 grid gap-4">{children}</div>
    </div>
  )
}

// Loads the full site doc (dev API or baked-in build) for section tabs.
export function useSiteDoc(isDev) {
  const [doc, setDoc] = useState(null)

  useEffect(() => {
    if (!isDev) {
      setDoc(JSON.parse(JSON.stringify(rawSite)))
      return
    }
    fetch('/api/site')
      .then((r) => r.json())
      .then(setDoc)
      .catch(() => setDoc(JSON.parse(JSON.stringify(rawSite))))
  }, [isDev])

  return [doc, setDoc]
}

// Merges a patch into one top-level section of the doc.
export function updateSec(doc, setDoc, sec, patch) {
  setDoc({ ...doc, [sec]: { ...(doc[sec] ?? {}), ...patch } })
}
