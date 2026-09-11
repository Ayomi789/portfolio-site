import { AreaField, TabShell, TextField, updateSec } from '../fields'

export default function WorkTab({ doc, setDoc, saving, onSave }) {
  if (!doc) return <div className="mt-8 font-mono text-[12px] text-[#7a877e]">Loading…</div>
  const w = doc.work ?? {}
  const set = (patch) => updateSec(doc, setDoc, 'work', patch)

  return (
    <TabShell title="Work — section heading" saving={saving} onSave={() => onSave(doc)}>
      <TextField
        label="Eyebrow"
        value={w.eyebrow}
        onChange={(v) => set({ eyebrow: v })}
        placeholder="[01] — SELECTED SYSTEMS"
      />
      <AreaField
        label="Heading rest (follows the auto-count, e.g. “Four systems.”)"
        value={w.titleRest}
        onChange={(v) => set({ titleRest: v })}
        rows={2}
      />
      <AreaField
        label="Sub copy"
        value={w.sub}
        onChange={(v) => set({ sub: v })}
        rows={2}
      />
      <p className="font-mono text-[11px] text-[#8a9690]">
        The project cards themselves live under the Projects tab. The leading number (“Four
        systems.”) updates automatically from the project count.
      </p>
    </TabShell>
  )
}
