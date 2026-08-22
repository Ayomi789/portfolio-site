const PREREQS = ['P', 'P', '•', '•']

export default function FitnessVisual() {
  return (
    <>
      <div className="flex-1 grid grid-cols-[1.2fr_0.8fr] gap-3 p-3">
        <div className="rounded-[16px] border border-[#101512] bg-[#101512] text-white p-4 flex flex-col">
          <div className="font-mono text-[10px] opacity-60">TODAY</div>
          <div className="mt-2 font-[800] text-[16px] leading-[1.1]">
            Front Lever
            <br />
            Progression
          </div>
          <div className="mt-auto flex gap-1.5">
            {PREREQS.map((v, i) => (
              <div
                key={i}
                className={`w-[22px] h-[22px] rounded-full grid place-items-center text-[10px] ${
                  v === 'P' ? 'bg-white text-black' : 'bg-white/15'
                }`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-[14px] bg-[#f1f4f1] border border-[#dde3dd] p-3">
            <div className="font-mono text-[9px] uppercase opacity-60">Prereq check</div>
            <div className="mt-2 text-[12px] font-[600] leading-[1.2]">
              20s hollow hold → unlocked
            </div>
            <div className="mt-2 h-[4px] rounded-full bg-[#dde3dd] overflow-hidden">
              <div className="h-full w-[80%] bg-[#0b8f68]"></div>
            </div>
          </div>
          <div className="rounded-[14px] bg-white border border-[#dde3dd] p-3 font-mono text-[10px]">
            Next: Scapular pulls x8
            <br />
            <span className="opacity-60">Tempo 3-1-1</span>
          </div>
        </div>
      </div>
    </>
  )
}