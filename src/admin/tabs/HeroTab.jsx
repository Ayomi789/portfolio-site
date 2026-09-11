import { Field, LinesArea, RowEditor, SectionLabel, TabShell, TextField, updateSec } from '../fields'

export default function HeroTab({ doc, setDoc, saving, onSave }) {
  if (!doc) return <div className="mt-8 font-mono text-[12px] text-[#7a877e]">Loading…</div>
  const h = doc.hero ?? {}
  const set = (patch) => updateSec(doc, setDoc, 'hero', patch)

  return (
    <TabShell title="Hero — first screen" saving={saving} onSave={() => onSave(doc)}>
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Badge (desktop)" value={h.badge} onChange={(v) => set({ badge: v })} />
        <TextField label="Badge (mobile)" value={h.badgeShort} onChange={(v) => set({ badgeShort: v })} />
        <TextField label="Headline — start" value={h.titleA} onChange={(v) => set({ titleA: v })} />
        <TextField label="Headline — accent word (italic)" value={h.titleAccent} onChange={(v) => set({ titleAccent: v })} />
        <TextField label="Headline — line 2" value={h.titleB} onChange={(v) => set({ titleB: v })} />
        <TextField label="Headline — line 3" value={h.titleC} onChange={(v) => set({ titleC: v })} />
      </div>

      <Field label="Intro paragraph">
        <textarea
          className="w-full rounded-[10px] border border-[#dde3dd] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#0b8f68]"
          rows={3}
          value={h.intro ?? ''}
          onChange={(e) => set({ intro: e.target.value })}
        />
      </Field>

      <div className="grid sm:grid-cols-3 gap-4">
        <TextField label="Philosophy label" value={h.philosophyLabel} onChange={(v) => set({ philosophyLabel: v })} />
        <TextField label="Philosophy accent" value={h.philosophyAccent} onChange={(v) => set({ philosophyAccent: v })} />
        <TextField label="Location line" value={h.location} onChange={(v) => set({ location: v })} />
      </div>

      <Field label="Philosophy rest">
        <textarea
          className="w-full rounded-[10px] border border-[#dde3dd] bg-white px-3 py-2 text-[14px] outline-none focus:border-[#0b8f68]"
          rows={2}
          value={h.philosophyRest ?? ''}
          onChange={(e) => set({ philosophyRest: e.target.value })}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Primary button" value={h.primaryCta} onChange={(v) => set({ primaryCta: v })} />
        <TextField label="Secondary button" value={h.secondaryCta} onChange={(v) => set({ secondaryCta: v })} />
      </div>

      <div>
        <SectionLabel>Focus / Currently / Next rows</SectionLabel>
        <RowEditor
          rows={h.stats}
          columns={[
            { key: 'k', label: 'Label' },
            { key: 'v', label: 'Value (line break = new line)', area: true },
          ]}
          onChange={(stats) => set({ stats })}
          addLabel="+ Add row"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Code card — filename" value={h.cardFile} onChange={(v) => set({ cardFile: v })} />
        <TextField label="Code card — live badge" value={h.cardLive} onChange={(v) => set({ cardLive: v })} />
      </div>

      <TextField label="Code card — comment line" value={h.cardComment} onChange={(v) => set({ cardComment: v })} />

      <div className="grid sm:grid-cols-3 gap-4">
        <TextField label="Provider A" value={h.providerA} onChange={(v) => set({ providerA: v })} />
        <TextField label="Provider B" value={h.providerB} onChange={(v) => set({ providerB: v })} />
        <TextField label="Fallback line" value={h.fallback} onChange={(v) => set({ fallback: v })} />
      </div>

      <TextField label="Eval line" value={h.evalLabel} onChange={(v) => set({ evalLabel: v })} />

      <div>
        <SectionLabel>Code card — metric tiles</SectionLabel>
        <RowEditor
          rows={h.cardMetrics}
          columns={[
            { key: 'l', label: 'Label' },
            { key: 'v', label: 'Value' },
            { key: 'sub', label: 'Subtext' },
          ]}
          onChange={(cardMetrics) => set({ cardMetrics })}
          addLabel="+ Add metric"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Query demo — title" value={h.queryTitle} onChange={(v) => set({ queryTitle: v })} />
        <TextField label="Query demo — subtext" value={h.querySub} onChange={(v) => set({ querySub: v })} />
        <TextField label="Card footer — left" value={h.cardFooter} onChange={(v) => set({ cardFooter: v })} />
        <TextField label="Card footer — status" value={h.cardStatus} onChange={(v) => set({ cardStatus: v })} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField label="Stack card — title" value={h.stackTitle} onChange={(v) => set({ stackTitle: v })} />
        <TextField label="Mantra card — title" value={h.mantraTitle} onChange={(v) => set({ mantraTitle: v })} />
        <TextField label="Mantra — line 1" value={h.mantraA} onChange={(v) => set({ mantraA: v })} />
        <TextField label="Mantra — line 2" value={h.mantraB} onChange={(v) => set({ mantraB: v })} />
      </div>

      <LinesArea
        label="Stack chips (one per line)"
        values={h.stackChips}
        onChange={(stackChips) => set({ stackChips })}
        rows={3}
      />
    </TabShell>
  )
}
