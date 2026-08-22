

import { STACK_GROUPS } from '../data/projects'
import Reveal from './Reveal'

const CHIPS = ['TypeScript-first', 'Tested', 'Documented']

export default function Stack() {
  return (
    <section id="stack" className="max-w-[1360px] mx-auto px-6 lg:px-10 py-[72px] lg:py-[96px]">
      <div className="grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#0b8f68]">
              [03] — CAPABILITIES
            </div>
            <h2 className="mt-4 font-serif text-[36px] lg:text-[44px] leading-[0.95] tracking-[-0.04em]">
              Full-stack scope.
              <br />
              Systems depth.
            </h2>
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#dde3dd] bg-white px-4 py-2 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0b8f68]"></span>Currently: Third year CS
              — Graduating 2028
            </div>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={120}>
          <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#dde3dd] border border-[#dde3dd] rounded-[20px] overflow-hidden">
              {STACK_GROUPS.map((g) => (
                <div key={g.h} className="bg-[#fbfcfa] p-6">
                  <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#8a9690]">
                    {g.h}
                  </div>
                  <div className="mt-5 space-y-2.5">
                    {g.items.map((it) => (
                      <div
                        key={it}
                        className="flex items-center gap-2 text-[13px] leading-[1.3] tracking-[-0.01em]"
                      >
                        <span className="w-[4px] h-[4px] rounded-full bg-[#0b8f68]"></span>
                        {it}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[16px] bg-[#f3f5f3] border border-[#dde3dd] p-4 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#4a5750]">
              {CHIPS.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded-full bg-white border border-[#dde3dd]">
                  {c}
                </span>
              ))}
              <span className="opacity-70">
                — I care about maintainability more than cleverness.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}