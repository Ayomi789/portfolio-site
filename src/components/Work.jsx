

import { useState } from 'react'
import { PROJECTS } from '../data/projects'
import NovaVisual from './visuals/NovaVisual'
import AtlasVisual from './visuals/AtlasVisual'
import CRMVisual from './visuals/CRMVisual'
import FitnessVisual from './visuals/FitnessVisual'
import Reveal from './Reveal'

const VISUALS = {
  nova: NovaVisual,
  atlas: AtlasVisual,
  crm: CRMVisual,
  cali: FitnessVisual,
}

// Fallback panel for projects added via the CMS that have no custom visual component.
function DefaultVisual({ name, tagline, type, stack }) {
  return (
    <div className="h-full min-h-[220px] p-6 flex flex-col justify-between bg-[#f6f8f6]">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690]">
        <span>{type || 'Project'}</span>
        <span className="w-[6px] h-[6px] rounded-full bg-[#0b8f68]" />
      </div>
      <div className="font-serif text-[clamp(22px,3vw,34px)] tracking-[-0.03em] leading-[1.02]">
        {name}
        <div className="mt-1 font-mono text-[11px] tracking-[0.08em] uppercase text-[#7a877e]">
          {tagline}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(stack || []).slice(0, 4).map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded-full bg-white border border-[#e3e8e3] font-mono text-[10px]"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectVisual({ project }) {
  const Custom = VISUALS[project.id]
  if (Custom) return <Custom />
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.name} preview`}
        className="h-full w-full min-h-[220px] object-cover"
      />
    )
  }
  return <DefaultVisual {...project} />
}

export default function Work() {
  const [active, setActive] = useState(null)

  return (
    <section id="work" className="max-w-[1360px] mx-auto px-6 lg:px-10 py-[56px] lg:py-[96px]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <div>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#0b8f68] flex items-center gap-2">
              <span className="w-[6px] h-[6px] rounded-full bg-[#0b8f68]"></span>[01] — SELECTED
              SYSTEMS
            </div>
            <h2 className="mt-4 font-serif text-[clamp(32px,4.5vw,56px)] leading-[0.95] tracking-[-0.04em] max-w-[16ch]">
              Four systems. Real constraints. Real users.
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="max-w-[40ch] font-mono text-[12.5px] leading-[1.7] text-[#5a665d]">
            No concept work. Each project shipped under time, cost, or user constraints. Click to open
            build notes.
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-[20px]">
        {PROJECTS.map((p, idx) => {
          return (
            <Reveal key={p.id} delay={Math.min(idx * 90, 270)}>
              <article className="group relative rounded-[28px] border border-[#dde3dd] bg-white overflow-hidden hover:shadow-soft transition-all duration-500">
                <div className="grid lg:grid-cols-12">
                  {/* info */}
                  <div className="lg:col-span-7 p-5 sm:p-[24px] lg:p-[32px] flex flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                      <div className="flex gap-3 sm:gap-4 min-w-0">
                        <div className="w-[38px] h-[38px] sm:w-[44px] sm:h-[44px] rounded-[11px] sm:rounded-[12px] bg-[#f3f5f3] border border-[#e3e8e3] grid place-items-center font-mono text-[12px] tracking-[0.04em] shrink-0">
                          {p.n}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="font-[800] tracking-[-0.03em] text-[19px] sm:text-[22px] leading-none">
                              {p.name}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-[10px] font-mono tracking-[0.08em] uppercase text-white ${p.accent}`}
                            >
                              {p.status}
                            </span>
                          </div>
                          <div className="mt-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-[#7a877e]">
                            {p.tagline} • {p.type}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="h-[32px] sm:h-[36px] px-3 rounded-full border border-[#dde3dd] grid place-items-center font-mono text-[10.5px] sm:text-[11px] hover:bg-[#101512] hover:text-white hover:border-[#101512] transition"
                            aria-label={`${p.name} live demo`}
                          >
                            Live ↗
                          </a>
                        )}
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="h-[32px] sm:h-[36px] px-3 rounded-full border border-[#dde3dd] grid place-items-center font-mono text-[10.5px] sm:text-[11px] hover:bg-[#101512] hover:text-white hover:border-[#101512] transition"
                            aria-label={`${p.name} GitHub repo`}
                          >
                            GitHub ↗
                          </a>
                        )}
                        <button
                          onClick={() => setActive(p)}
                          className="w-[36px] h-[36px] rounded-full border border-[#dde3dd] grid place-items-center group-hover:bg-[#101512] group-hover:text-white group-hover:border-[#101512] transition"
                          aria-label={`Open ${p.name} build notes`}
                        >
                          ↗
                        </button>
                      </div>
                    </div>

                    <p className="mt-5 sm:mt-6 text-[14.5px] sm:text-[15.5px] leading-[1.6] tracking-[-0.01em] text-[#2a342d] max-w-[56ch]">
                      {p.desc}
                    </p>

                    <div className="mt-6 sm:mt-7 grid grid-cols-3 gap-2 sm:gap-4">
                      {p.metrics.map((m) => (
                        <div
                          key={m.k}
                          className="rounded-[12px] sm:rounded-[14px] border border-[#e6eae6] bg-[#fbfcfa] px-2.5 py-2.5 sm:px-3.5 sm:py-3"
                        >
                          <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.08em] sm:tracking-[0.1em] uppercase text-[#8a9690]">
                            {m.k}
                          </div>
                          <div className="mt-1 font-[700] tracking-[-0.02em] text-[13px] sm:text-[14px]">
                            {m.v}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 sm:pt-8 flex flex-wrap items-center gap-2">
                      <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#8a9690] mr-1">
                        Stack:
                      </div>
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-full bg-[#f2f5f2] border border-[#e3e8e3] font-mono text-[11px]"
                        >
                          {s}
                        </span>
                      ))}
                      <button
                        onClick={() => setActive(p)}
                        className="lg:hidden ml-auto text-[12px] font-[600] underline underline-offset-4"
                      >
                        Open build notes
                      </button>
                    </div>
                  </div>

                  {/* visual */}
                  <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#dde3dd] bg-[#f6f8f6] p-3 sm:p-[18px] lg:p-[20px]">
                    <div className="h-full rounded-[18px] bg-white border border-[#dde3dd] overflow-hidden flex flex-col">
                      <ProjectVisual project={p} />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* modal */}
      {active && (
        <div className="fixed inset-0 z-[60] flex">
          <div
            onClick={() => setActive(null)}
            className="absolute inset-0 bg-[#0a0f0c]/60 backdrop-blur-[6px]"
          ></div>
          <div className="ml-auto relative w-full max-w-[560px] bg-[#fbfcfa] border-l border-[#dde3dd] overflow-auto">
            <div className="sticky top-0 bg-[#fbfcfa]/90 backdrop-blur border-b border-[#dde3dd] px-5 sm:px-8 h-[64px] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-[32px] h-[32px] rounded-[10px] bg-[#101512] text-white grid place-items-center font-mono text-[12px] shrink-0">
                  {active.n}
                </div>
                <div className="font-[700] tracking-[-0.02em] truncate text-[14px] sm:text-[15px] min-w-0">
                  <span className="sm:hidden">{active.name}</span>
                  <span className="hidden sm:inline">
                    {active.name} — {active.tagline}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActive(null)}
                className="w-[36px] h-[36px] rounded-full border border-[#dde3dd] grid place-items-center hover:bg-[#101512] hover:text-white transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-5 sm:p-8">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#7a877e]">
                Build notes
              </div>
              <div className="mt-6 space-y-8">
                <div>
                  <div className="font-[700] text-[13px] tracking-[-0.01em] mb-2">The problem</div>
                  <p className="text-[14px] leading-[1.7] text-[#2e3831]">{active.problem}</p>
                </div>
                <div>
                  <div className="font-[700] text-[13px] tracking-[-0.01em] mb-2">
                    How I built it
                  </div>
                  <p className="text-[14px] leading-[1.7] text-[#2e3831]">{active.build}</p>
                </div>
                {active.arch?.length > 0 && (
                  <div>
                    <div className="font-[700] text-[13px] tracking-[-0.01em] mb-3">Architecture</div>
                    <div className="rounded-[16px] border border-[#dde3dd] bg-white p-4 font-mono text-[10.5px] sm:text-[11px] leading-[1.7] sm:leading-[1.8] text-[#4a5750]">
                      {active.arch.map((line) => (
                        <div key={line} className="break-words">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {active.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full bg-[#101512] text-white font-mono text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {(active.link || active.repo) && (
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {active.link && (
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-full bg-[#101512] text-white font-[600] text-[13px] hover:opacity-90 transition"
                    >
                      View live ↗
                    </a>
                  )}
                  {active.repo && (
                    <a
                      href={active.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-full border border-[#101512] font-[600] text-[13px] hover:bg-[#101512] hover:text-white transition"
                    >
                      GitHub repo ↗
                    </a>
                  )}
                </div>
              )}
              <div className="mt-10 p-4 rounded-[16px] bg-[#eef4ef] border border-[#d6e2d8] font-mono text-[11px] leading-[1.6] text-[#2a3d31]">
                Want the deep dive? I write detailed build logs for each system — tradeoffs,
                failures, costs. Ask me for the private repo walkthrough.
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}