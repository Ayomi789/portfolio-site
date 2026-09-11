import { useEffect, useState } from 'react'
import { SITE } from '../data/site'

const NAV = [
  { l: 'Work', h: '#work' },
  { l: 'Philosophy', h: '#philosophy' },
  { l: 'Systems', h: '#stack' },
  { l: 'Contact', h: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-[40] backdrop-blur-[14px] border-b transition-all ${
        scrolled
          ? 'bg-[rgba(251,252,250,0.9)] border-[#dde3dd]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-3 group">
          <div className="w-[32px] h-[32px] rounded-[9px] bg-[#101512] text-white flex items-center justify-center font-mono text-[12px] tracking-[-0.02em] group-hover:bg-[#0b8f68] transition-colors">
            AS
          </div>
          <div className="leading-[1.05]">
            <div className="font-[700] tracking-[-0.03em] text-[14px]">{SITE.header.name}</div>
            <div className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#6b756c]">
              {SITE.header.tagline}
            </div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((i) => (
            <a
              key={i.l}
              href={i.h}
              className="font-mono text-[11px] tracking-[0.12em] uppercase font-medium text-[#5a665d] hover:text-[#101512] transition"
            >
              {i.l}
            </a>
          ))}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="ml-2 inline-flex items-center gap-2 h-[34px] px-4 rounded-full bg-[#101512] text-white text-[12.5px] font-semibold tracking-[-0.01em] hover:bg-[#0f2217] transition"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[#2fe090] animate-pulse"></span>
            {SITE.header.availability}
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-[36px] h-[36px] rounded-full border border-[#dde3dd] flex flex-col items-center justify-center gap-[4px]"
          aria-label="Toggle menu"
        >
          <span
            className={`w-[14px] h-[1.5px] bg-[#101512] transition-all ${
              open ? 'rotate-45 translate-y-[3px]' : ''
            }`}
          ></span>
          <span
            className={`w-[14px] h-[1.5px] bg-[#101512] transition-all ${
              open ? '-rotate-45 -translate-y-[2px]' : ''
            }`}
          ></span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#dde3dd] bg-[#fbfcfa] px-6 py-6 flex flex-col gap-4">
          {NAV.map((i) => (
            <a
              key={i.l}
              onClick={() => setOpen(false)}
              href={i.h}
              className="font-mono text-[13px] tracking-[0.08em] uppercase"
            >
              {i.l}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 h-[40px] px-4 rounded-full bg-[#101512] text-white text-[13px] font-semibold tracking-[-0.01em]"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[#2fe090] animate-pulse"></span>
            {SITE.header.availability}
          </a>
        </div>
      )}
    </header>
  )
}