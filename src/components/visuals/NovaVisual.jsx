import { useMemo } from 'react'

const ROUTES = [
  { model: ' z-ai/glm-5.2', ms: '182ms', ok: true },
  { model: 'stepfun-ai/step-3.7-flas', ms: 'fallback', ok: false },
  { model: 'minimaxai/minimax-m3', ms: '241ms', ok: true },
  { model: 'openai/gpt-oss-120b', ms: '241ms', ok: true },
] 

export default function NovaVisual() {
  const bars = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        i,
        key: i,
        height: `${20 + Math.sin(i) * 30 + Math.random() * 40}%`,
        isAccent: i % 6 === 0,
      })),
    []
  )

  return (
    <>
      <div className="h-[36px] border-b border-[#dde3dd] px-4 flex items-center gap-2 font-mono text-[10px] text-[#6b756c]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0b8f68] animate-pulse"></span> router • live
        trace
      </div>
      <div className="p-4 space-y-3 font-mono text-[11px]">
        {ROUTES.map((r) => (
          <div
            key={r.model}
            className="flex items-center justify-between rounded-[10px] border border-[#e6eae6] px-3 py-2.5 bg-[#fbfcfa]"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-[6px] h-[6px] rounded-full ${r.ok ? 'bg-[#0b8f68]' : 'bg-[#d1d5d1]'}`}
              ></span>
              {r.model}
            </div>
            <div className={`${r.ok ? 'text-[#0b8f68]' : 'text-[#9aa8a0]'} text-[10px]`}>{r.ms}</div>
          </div>
        ))}
        <div className="mt-2 h-[68px] rounded-[10px] bg-[#101512] p-3 flex items-end gap-[3px]">
          {bars.map((b) => (
            <div
              key={b.key}
              style={{ height: b.height }}
              className={`flex-1 rounded-[2px] ${b.isAccent ? 'bg-[#2fe090]' : 'bg-[#2a3d31]'}`}
            ></div>
          ))}
        </div>
      </div>
    </>
  )
}