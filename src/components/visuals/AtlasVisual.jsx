// const NODES = [
//   { t: 'notion', x: '18%', y: '22%' },
//   { t: 'drive', x: '72%', y: '28%' },
//   { t: 'transcript', x: '24%', y: '68%' },
//   { t: 'slack', x: '70%', y: '72%' },
// ]

// export default function AtlasVisual() {
//   return (
//     <>
//       <div className="h-[36px] border-b border-[#dde3dd] px-4 flex items-center justify-between">
//         <span className="font-mono text-[10px] text-[#6b756c]">atlas.graph • query planner</span>
//         <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-[#eef4ef]">3 sources</span>
//       </div>
//       <div className="relative flex-1 p-6 min-h-[240px]">
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border border-dashed border-[#d6ddd6]"></div>
//         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] h-[32%] rounded-full border border-[#cbd8cd] bg-[#f6f8f6] grid place-items-center font-mono text-[10px]">
//           query
//         </div>
//         {NODES.map((n) => (
//           <div
//             key={n.t}
//             className="absolute px-2.5 py-1 rounded-full bg-[#101512] text-white font-mono text-[10px]"
//             style={{ left: n.x, top: n.y }}
//           >
//             {n.t}
//           </div>
//         ))}
//         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
//           <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
//           <line x1="70%" y1="35%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
//           <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
//           <line x1="70%" y1="70%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
//         </svg>
//       </div>
//     </>
//   )
// }


const NODES = [
  { t: 'notion', x: '18%', y: '22%' },
  { t: 'drive', x: '72%', y: '28%' },
  { t: 'transcript', x: '24%', y: '68%' },
  { t: 'slack', x: '70%', y: '72%' },
]

export default function AtlasVisual() {
  return (
    <>
      <div className="h-[36px] border-b border-[#dde3dd] px-4 flex items-center justify-between">
        <span className="font-mono text-[10px] text-[#6b756c]">atlas.graph • query planner</span>
        <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-[#eef4ef]">3 sources</span>
      </div>
      <div className="relative flex-1 p-6 min-h-[240px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border border-dashed border-[#d6ddd6]"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] h-[32%] rounded-full border border-[#cbd8cd] bg-[#f6f8f6] grid place-items-center font-mono text-[10px]">
          query
        </div>
        {NODES.map((n) => (
          <div
            key={n.t}
            className="absolute px-2.5 py-1 rounded-full bg-[#101512] text-white font-mono text-[10px]"
            style={{ left: n.x, top: n.y }}
          >
            {n.t}
          </div>
        ))}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <line x1="30%" y1="30%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="70%" y1="35%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="70%" y1="70%" x2="50%" y2="50%" stroke="#9ab0a0" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>
    </>
  )
}