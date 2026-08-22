const TICKETS = [
  { t: 'AC install — NW10', s: 'urgent', d: 'SLA: 2h' },
  { t: 'Warranty claim — SW8', s: 'in progress', d: 'Assigned: You' },
  { t: 'Quote — Kensington', s: 'done', d: '£1,240' },
]

function badgeClass(s) {
  if (s === 'urgent') return 'bg-[#101512] text-white'
  if (s === 'in progress') return 'bg-[#e8f1e9] text-[#2a3d31]'
  return 'bg-white border'
}

export default function CRMVisual() {
  return (
    <>
      <div className="h-[40px] border-b border-[#dde3dd] px-4 flex items-center gap-2">
        <div className="w-[20px] h-[20px] rounded-full bg-[#101512] text-white grid place-items-center font-mono text-[10px]">
          ≡
        </div>
        <span className="font-[700] text-[12px]">Tickets</span>
        <span className="ml-auto font-mono text-[10px] px-2 py-1 rounded-full bg-[#0b8f68] text-white">
          11 open
        </span>
      </div>
      <div className="p-3 space-y-2">
        {TICKETS.map((r) => (
          <div
            key={r.t}
            className="rounded-[12px] border border-[#e6eae6] bg-[#fbfcfa] px-3 py-3 flex items-center justify-between"
          >
            <div>
              <div className="font-[600] text-[12px]">{r.t}</div>
              <div className="font-mono text-[10px] text-[#7a877e]">{r.d}</div>
            </div>
            <div
              className={`font-mono text-[9px] uppercase tracking-[0.08em] px-2 py-1 rounded-full ${badgeClass(
                r.s
              )}`}
            >
              {r.s}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}