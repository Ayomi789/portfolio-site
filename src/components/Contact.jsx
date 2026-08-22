

import { useState } from 'react'
import Reveal from './Reveal'

const EMAIL = 'abdullateef.salako6@gmail.com'

const INTRO_ROWS = [
  { k: 'You are', p: 'A team building AI infra, devtools, or practical B2B software' },
  { k: 'I am', p: 'Full-stack & AI systems generalist who ships end-to-end' },
  { k: 'We should talk if', p: 'You value production-ready systems over prototypes' },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="border-t border-[#dde3dd] bg-[#f6f8f6]">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-[64px] lg:py-[80px] grid lg:grid-cols-12 gap-10 items-start">
        <Reveal className="lg:col-span-6">
          <div>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#0b8f68]">
              [04] — CONTACT
            </div>
            <h2 className="mt-4 font-serif text-[clamp(32px,4.5vw,52px)] leading-[0.9] tracking-[-0.04em]">
              Let's build
              <br />
              something practical.
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-[#3d4a40] max-w-[42ch]">
              I'm looking for teams building real AI products, not AI demos. If you're shipping
              software that needs to work in production — reach out.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={copyEmail}
                className="h-[44px] px-5 rounded-full bg-[#101512] text-white inline-flex items-center gap-2 font-[600] text-[13px] hover:bg-[#0f2217] transition"
              >
                {copied ? 'Copied ✓' : EMAIL} <span className="opacity-60">⎘</span>
              </button>
              <a
                href="https://github.com/Ayomi789"
                onClick={(e) => e.preventDefault()}
                className="h-[44px] px-5 rounded-full bg-white border border-[#dde3dd] inline-flex items-center gap-2 font-[600] text-[13px] hover:border-[#101512] transition"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/abdullateef-salako-18764b2a9?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                onClick={(e) => e.preventDefault()}
                className="h-[44px] px-5 rounded-full bg-white border border-[#dde3dd] inline-flex items-center gap-2 font-[600] text-[13px] hover:border-[#101512] transition"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal className="lg:col-span-6" delay={120}>
          <div className="rounded-[24px] border border-[#dde3dd] bg-white p-6 lg:p-8 shadow-card">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-[#8a9690]">
                Quick intro
              </div>
              <div className="font-mono text-[10px] px-2 py-1 rounded-full bg-[#eef4ef]">
                Response {'<'} 12h
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {INTRO_ROWS.map((r) => (
                <div
                  key={r.k}
                  className="grid grid-cols-[110px_1fr] gap-4 text-[13.5px] leading-[1.5] py-3 border-b border-[#eef1ee] last:border-0"
                >
                  <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-[#8a9690] pt-0.5">
                    {r.k}
                  </div>
                  <div className="tracking-[-0.01em]">{r.p}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="rounded-[12px] bg-[#101512] text-white p-4">
                <div className="opacity-60 uppercase tracking-[0.08em] text-[10px]">Location</div>
                <div className="mt-1">
                  Lagos, Nigeria
                  <br />
                  Open to remote / Lagos Nigeria
                </div>
              </div>
              <div className="rounded-[12px] bg-[#f3f5f3] border border-[#dde3dd] p-4">
                <div className="opacity-60 uppercase tracking-[0.08em] text-[10px]">
                  Availability
                </div>
                <div className="mt-1 text-[#101512] font-[600]">
                  Intern / New Grad
                  <br />
                  Full-time • Summer 2026
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-[#dde3dd]">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between font-mono text-[11px] tracking-[0.06em] uppercase text-[#7a877e]">
          <div>© {new Date().getFullYear()} Abdullateef Salako — Built with intention, not templates.</div>
          <div className="hidden md:flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[#0b8f68]"></span> All systems operational
            </span>
            <span>Engineered, not decorated</span>
          </div>
        </div>
      </div>
    </section>
  )
}