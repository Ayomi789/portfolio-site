import rawProjects from './projects.json'

// Card numbers are derived from order so reordering in the admin never needs manual renumbering.
export const PROJECTS = rawProjects.map((p, i) => ({
  ...p,
  n: String(i + 1).padStart(2, '0'),
}))

export const PRINCIPLES = [
  {
    t: 'Show, not tell',
    d: 'Portfolio > resume. Real users > mock data. Ship software that solves a real problem first, then talk about it.',
  },
  {
    t: 'Practical over possible',
    d: "AI is not magic. It's plumbing, evals, fallbacks, and edge cases. I build systems that work when the demo ends.",
  },
  {
    t: 'Systematic, not clever',
    d: 'Clean architecture, boring tech where it counts, clear naming. Code is written for the next engineer, who is future-me.',
  },
  {
    t: 'Build in public, ship in private',
    d: 'Share the learning. Keep the craft serious. Document the tradeoffs, not just the outcomes.',
  },
]

export const STACK_GROUPS = [
  { h: 'Frontend', items: ['React / Next.js', 'TypeScript', 'Tailwind', 'Expo / RN', 'Framer Motion'] },
  { h: 'Backend & Data', items: ['Node.js', 'Python / FastAPI', 'PostgreSQL / RLS', 'Supabase', 'Redis / Queues'] },
  { h: 'AI Systems', items: ['LLM Orchestration', 'RAG / Qdrant', 'LangChain', 'Model Eval & Tracing', 'Prompt Systems'] },
  { h: 'Infra & Ship', items: ['Docker', 'Vercel / Fly', 'GitHub Actions', 'Observability', 'Product Analytics'] },
]
