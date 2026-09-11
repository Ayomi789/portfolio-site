import { AreaField, LinesArea, RowEditor, SectionLabel, TabShell, TextField, updateSec } from '../fields'

export default function ContactTab({ doc, setDoc, saving, onSave }) {
  if (!doc) return <div className="mt-8 font-mono text-[12px] text-[#7a877e]">Loading…</div>
  const c = doc.contact ?? {}
  const set = (patch) => updateSec(doc, setDoc, 'contact', patch)
  const setBlock = (key) => (patch) => set({ [key]: { ...(c[key] ?? {}), ...patch } })

  return (
    <TabShell title="Contact — section" saving={saving} onSave={() => onSave(doc)}>
      <TextField
        label="Eyebrow"
        value={c.eyebrow}
        onChange={(v) => set({ eyebrow: v })}
        placeholder="[04] — CONTACT"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Heading — line 1" value={c.titleA} onChange={(v) => set({ titleA: v })} />
        <TextField label="Heading — line 2" value={c.titleB} onChange={(v) => set({ titleB: v })} />
      </div>
      <AreaField label="Intro text" value={c.text} onChange={(v) => set({ text: v })} rows={3} />

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField
          label="Card label"
          value={c.introLabel}
          onChange={(v) => set({ introLabel: v })}
        />
        <TextField
          label="Response badge"
          value={c.response}
          onChange={(v) => set({ response: v })}
          placeholder="Response < 12h"
        />
      </div>

      <div>
        <SectionLabel>Quick-intro rows</SectionLabel>
        <RowEditor
          rows={c.introRows}
          columns={[
            { key: 'k', label: 'Label' },
            { key: 'p', label: 'Text', area: true },
          ]}
          onChange={(introRows) => set({ introRows })}
          addLabel="+ Add row"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <TextField
            label="Location card — title"
            value={c.location?.title}
            onChange={(v) => setBlock('location')({ title: v })}
          />
          <div className="mt-2">
            <LinesArea
              label="Location card — lines"
              values={c.location?.lines}
              onChange={(lines) => setBlock('location')({ lines })}
              rows={2}
            />
          </div>
        </div>
        <div>
          <TextField
            label="Availability card — title"
            value={c.availability?.title}
            onChange={(v) => setBlock('availability')({ title: v })}
          />
          <div className="mt-2">
            <LinesArea
              label="Availability card — lines"
              values={c.availability?.lines}
              onChange={(lines) => setBlock('availability')({ lines })}
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Footer — name" value={c.footerName} onChange={(v) => set({ footerName: v })} />
        <TextField label="Footer — note" value={c.footerNote} onChange={(v) => set({ footerNote: v })} />
        <TextField
          label="Footer — status line"
          value={c.footerStatus}
          onChange={(v) => set({ footerStatus: v })}
        />
        <TextField label="Footer — tagline" value={c.footerTag} onChange={(v) => set({ footerTag: v })} />
      </div>
    </TabShell>
  )
}
