

import { useEffect, useState } from 'react'
import Reveal from './Reveal'

const TYPED = 'orchestrate_models(['

const HERO_STATS = [
  { k: 'Focus', v: 'AI Orchestration\n+ App Systems' },
  { k: 'Currently', v: 'Building Atlas\nKnowledge Graph' },
  { k: 'Next', v: 'Open sourcing\nNOVA core' },
]

const CARD_METRICS = [
  { l: 'req/s', v: '247', sub: '+12%' },
  { l: 'p95', v: '38ms', sub: 'stable' },
  { l: 'cost', v: '-$31%', sub: 'this week' },
]

const STACK_CHIPS = ['TS', 'Python', 'Postgres', 'Qdrant', 'Redis', 'Docker']

export default function Hero() {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      setTyped(TYPED.slice(0, i))
      i++
      if (i > TYPED.length) clearInterval(iv)
    }, 90)
    return () => clearInterval(iv)
  }, [])

  return (
    <section className="relative border-b border-[#dde3dd]">
      {/* grid bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7ece7_1px,transparent_1px),linear-gradient(to_bottom,#e7ece7_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.9]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbfcfa] via-transparent to-[#fbfcfa]"></div>
      </div>

      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-0">
          {/* left */}
          <Reveal className="lg:col-span-7 min-w-0">
            <div className="pt-[56px] lg:pt-[84px] pb-[48px] lg:pb-[88px] lg:pr-[48px] lg:border-r border-[#dde3dd]">
              <div className="inline-flex flex-wrap items-center gap-2.5 pl-1 pr-3 py-1 rounded-full bg-white border border-[#dde3dd] shadow-card max-w-full">
                <span className="w-[24px] h-[24px] rounded-full bg-[#101512] text-white grid place-items-center font-mono text-[10px] shrink-0">
                  ↗
                </span>
                <span className="font-mono text-[10.5px] sm:text-[11px] tracking-[0.06em] uppercase text-[#3b4640]">
                  Computer Science student → Full-stack & AI builder
                </span>
              </div>

              <h1 className="mt-8 font-serif font-[400] leading-[0.92] tracking-[-0.04em] text-[clamp(36px,10vw,92px)]">
                Building <span className="italic font-[300]">practical</span>
                <br />
                AI systems
                <br />
                that ship.
              </h1>

              <div className="mt-8 grid md:grid-cols-[1.1fr_0.9fr] gap-6">
                <p className="text-[18px] leading-[1.6] tracking-[-0.015em] text-[#2e3831] max-w-[44ch]">
                  I'm Abdullateef — a full-stack developer obsessed with making AI actually usable. No
                  wrapper demos. Real software with real users, observability, and edge cases handled.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-[2px] bg-[#0b8f68] rounded-full"></div>
                    <p className="font-mono text-[12px] leading-[1.6] text-[#4f5a52]">
                      Philosophy:{' '}
                      <span className="text-[#101512] font-medium">Show, not tell.</span> If it's not
                      deployed, it doesn't exist. My work lives in repos, not slides.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase text-[#6e7a70]">
                    <span className="w-1 h-1 rounded-full bg-[#0b8f68]"></span> Based in UK • Remote •
                    GMT
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="h-[44px] px-6 rounded-full bg-[#101512] text-white inline-flex items-center gap-2 font-[600] text-[14px] tracking-[-0.01em] hover:bg-[#0f2217] transition shadow-soft"
                >
                  View systems →
                </a>
                <a
                  href="/cv/AbdullateefSalako_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="h-[44px] px-6 rounded-full bg-white border border-[#dde3dd] inline-flex items-center gap-2 font-[600] text-[14px] tracking-[-0.01em] hover:border-[#101512] transition"
                >
                  Contact / CV <span className="font-mono text-[10px] opacity-60">↗</span>
                </a>
                <div className="hidden md:inline-flex ml-2 items-center gap-2 h-[44px] px-4 rounded-full bg-[#eaf3ec] border border-[#d6e2d8] font-mono text-[11px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-[#0b8f68] animate-pulse"></span> 4
                  systems shipped • 2 in production
                </div>
              </div>

              <div className="mt-14 pt-8 border-t border-[#dde3dd] grid grid-cols-3 gap-6 max-w-[520px]">
                {HERO_STATS.map((it) => (
                  <div key={it.k}>
                    <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#8a9690] mb-2">
                      {it.k}
                    </div>
                    <div className="font-[600] text-[13px] leading-[1.35] tracking-[-0.01em] whitespace-pre-line">
                      {it.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* right - engineered card */}
          <Reveal className="lg:col-span-5 min-w-0" delay={120}>
            <div className="pt-[24px] lg:pt-[84px] pb-[48px] lg:pl-[40px] min-w-0">
              <div className="relative rounded-[24px] border border-[#dde3dd] bg-white shadow-soft overflow-hidden">
                <div className="h-[44px] border-b border-[#dde3dd] px-5 flex items-center justify-between bg-[#f6f8f6]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <span className="w-[8px] h-[8px] rounded-full bg-[#ff5f56]"></span>
                      <span className="w-[8px] h-[8px] rounded-full bg-[#ffbd2e]"></span>
                      <span className="w-[8px] h-[8px] rounded-full bg-[#27c93f]"></span>
                    </div>
                    <span className="font-mono text-[11px] text-[#5e6b60]">nova://orchestrator.ts — main</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-[#101512] text-white">
                    LIVE
                  </span>
                </div>

                <div className="p-5 font-mono text-[11.5px] leading-[1.7]">
                  <div className="text-[#7a877e]">// routing layer • cost-aware • fallbacks</div>
                  <div className="mt-2">
                    <span className="text-[#a0aca1]">1</span>{' '}
                    <span className="text-[#101512]">{typed}</span>
                    <span className="inline-block w-[7px] h-[13px] bg-[#101512] translate-y-[2px] ml-0.5"></span>
                  </div>
                  <div className="pl-6">
                    <span className="text-[#0b8f68]">provider:</span>{' '}
                    <span className="text-[#101512]">'openai'</span>{' '}
                    <span className="text-[#7a877e]">|</span>{' '}
                    <span className="text-[#101512]">'anthropic'</span>,
                  </div>
                  <div className="pl-6">
                    <span className="text-[#0b8f68]">fallbackChain:</span> [groq, ollama.local],
                  </div>
                  <div className="pl-6">
                    <span className="text-[#0b8f68]">eval:</span> trace &amp; score,
                  </div>
                  <div className="pl-3">])</div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {CARD_METRICS.map((s) => (
                      <div
                        key={s.l}
                        className="rounded-[14px] border border-[#e4e9e4] bg-[#fbfcfa] p-3"
                      >
                        <div className="text-[10px] uppercase tracking-[0.1em] text-[#8a9690]">
                          {s.l}
                        </div>
                        <div className="mt-1 text-[15px] font-[700] tracking-[-0.02em]">{s.v}</div>
                        <div className="text-[10px] text-[#0b8f68]">{s.sub}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[12px] bg-[#101512] text-[#c8d0c9] p-3.5 flex items-center gap-3">
                    <div className="w-[28px] h-[28px] rounded-[8px] bg-[#1a2a20] grid place-items-center text-[#2fe090]">
                      ◍
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] leading-none text-white font-medium">
                        atlas.query("how does fallback work?")
                      </div>
                      <div className="mt-1 text-[10px] opacity-70 truncate">
                        → Found 3 sources • 94% citation match • 2 graph hops
                      </div>
                    </div>
                    <div className="w-[18px] h-[18px] rounded-full bg-[#2fe090] text-[#101512] grid place-items-center text-[10px]">
                      ↗
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-[#dde3dd] bg-[#f6f8f6] flex items-center justify-between font-mono text-[10px] tracking-[0.06em] uppercase text-[#6f7b72]">
                  <span>System diagram / observability on</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#0b8f68]"></span> operational
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-[16px] border border-[#dde3dd] bg-white p-4">
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690]">
                    Stack depth
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {STACK_CHIPS.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded-full bg-[#f2f5f2] border border-[#e2e8e2] font-mono text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[16px] border border-[#101512] bg-[#101512] text-white p-4 relative overflow-hidden">
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase opacity-60">
                    Design mantra
                  </div>
                  <div className="mt-2 font-serif text-[18px] leading-[1.15]">
                    Engineered,
                    <br />
                    not decorated.
                  </div>
                  <div className="absolute right-3 bottom-3 w-[28px] h-[28px] rounded-full border border-white/20 grid place-items-center">
                    ✦
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}