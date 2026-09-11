import { AreaField, RowEditor, SectionLabel, TabShell, TextField, updateSec } from '../fields'

export default function PhilosophyTab({ doc, setDoc, saving, onSave }) {
  if (!doc) return <div className="mt-8 font-mono text-[12px] text-[#7a877e]">Loading…</div>
  const p = doc.philosophy ?? {}
  const set = (patch) => updateSec(doc, setDoc, 'philosophy', patch)

  return (
    <TabShell title="Philosophy — section" saving={saving} onSave={() => onSave(doc)}>
      <TextField
        label="Eyebrow"
        value={p.eyebrow}
        onChange={(v) => set({ eyebrow: v })}
        placeholder="[02] — PHILOSOPHY"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Heading — line 1" value={p.titleA} onChange={(v) => set({ titleA: v })} />
        <TextField
          label="Heading — accent (italic)"
          value={p.titleAccent}
          onChange={(v) => set({ titleAccent: v })}
        />
      </div>
      <AreaField label="Intro text" value={p.text} onChange={(v) => set({ text: v })} rows={3} />
      <div>
        <SectionLabel>Principle cards</SectionLabel>
        <RowEditor
          rows={p.principles}
          columns={[
            { key: 't', label: 'Title' },
            { key: 'd', label: 'Description', area: true },
          ]}
          onChange={(principles) => set({ principles })}
          addLabel="+ Add principle"
        />
      </div>
    </TabShell>
  )
}
