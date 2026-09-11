import { AreaField, LinesArea, SectionLabel, TabShell, TextField, inputCls, updateSec } from '../fields'

export default function SystemsTab({ doc, setDoc, saving, onSave }) {
  if (!doc) return <div className="mt-8 font-mono text-[12px] text-[#7a877e]">Loading…</div>
  const s = doc.systems ?? {}
  const set = (patch) => updateSec(doc, setDoc, 'systems', patch)
  const groups = s.groups ?? []

  const setGroup = (i, patch) => {
    set({ groups: groups.map((g, j) => (j === i ? { ...g, ...patch } : g)) })
  }

  const addGroup = () => set({ groups: [...groups, { h: '', items: [] }] })
  const removeGroup = (i) => set({ groups: groups.filter((_, j) => j !== i) })

  return (
    <TabShell title="Systems — capabilities" saving={saving} onSave={() => onSave(doc)}>
      <TextField
        label="Eyebrow"
        value={s.eyebrow}
        onChange={(v) => set({ eyebrow: v })}
        placeholder="[03] — CAPABILITIES"
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Heading — line 1" value={s.titleA} onChange={(v) => set({ titleA: v })} />
        <TextField label="Heading — line 2" value={s.titleB} onChange={(v) => set({ titleB: v })} />
      </div>
      <TextField
        label="Status badge"
        value={s.badge}
        onChange={(v) => set({ badge: v })}
        placeholder="Currently: Third year CS — Graduating 2028"
      />

      <div>
        <SectionLabel>Capability groups</SectionLabel>
        <div className="grid gap-3">
          {groups.map((g, i) => (
            <div key={i} className="rounded-[12px] border border-[#dde3dd] bg-[#fbfcfa] p-4">
              <div className="grid sm:grid-cols-[1fr_38px] gap-2">
                <input
                  className={inputCls}
                  placeholder="Group title (e.g. Frontend)"
                  value={g.h ?? ''}
                  onChange={(e) => setGroup(i, { h: e.target.value })}
                />
                <button
                  onClick={() => removeGroup(i)}
                  className="rounded-[10px] border border-[#dde3dd] bg-white hover:bg-[#101512] hover:text-white transition"
                  aria-label="Remove group"
                >
                  ✕
                </button>
              </div>
              <div className="mt-2">
                <textarea
                  className={inputCls}
                  rows={4}
                  placeholder={'One skill per line\n(e.g. React)'}
                  value={(g.items ?? []).join('\n')}
                  onChange={(e) => setGroup(i, { items: e.target.value.split('\n') })}
                />
              </div>
            </div>
          ))}
          <button
            onClick={addGroup}
            className="justify-self-start px-3 py-1.5 rounded-full border border-[#dde3dd] font-mono text-[11px] hover:bg-[#f3f5f3]"
          >
            + Add group
          </button>
        </div>
      </div>

      <LinesArea
        label="Bottom chips (one per line)"
        values={s.chips}
        onChange={(chips) => set({ chips })}
        rows={2}
      />
      <AreaField
        label="Closing note"
        value={s.note}
        onChange={(v) => set({ note: v })}
        rows={2}
      />
    </TabShell>
  )
}
