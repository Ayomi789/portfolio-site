

import { PRINCIPLES } from '../data/projects'
import Reveal from './Reveal'

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="border-y border-[#dde3dd] bg-[#101512] text-[#e8ece8] relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      ></div>
      <div className="relative max-w-[1360px] mx-auto px-6 lg:px-10 py-[72px] lg:py-[88px]">
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#8ad0b6] flex items-center gap-2">
                <span className="w-[6px] h-[6px] rounded-full bg-[#2fe090]"></span>[02] — PHILOSOPHY
              </div>
              <h2 className="mt-6 font-serif text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-[-0.04em]">
                Show, don't tell.
                <br />
                <span className="italic font-[300] opacity-[0.9]">Build systems.</span>
              </h2>
              <p className="mt-6 text-[15px] leading-[1.7] text-[#aebeb3] max-w-[36ch]">
                I'm an ambitious Computer Science student becoming a serious full-stack and AI systems
                developer — by doing the work. Not by describing it.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={120}>
            <div className="grid sm:grid-cols-2 gap-[1px] bg-[#1e3126] border border-[#1e3126] rounded-[20px] overflow-hidden">
              {PRINCIPLES.map((p) => (
                <div key={p.t} className="bg-[#111e16] p-7 lg:p-8 hover:bg-[#16281d] transition">
                  <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#6ea68e] mb-4">
                    Principle
                  </div>
                  <div className="font-[700] tracking-[-0.02em] text-[18px] leading-[1.2]">{p.t}</div>
                  <div className="mt-3 text-[13.5px] leading-[1.7] text-[#a7b8ac]">{p.d}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}