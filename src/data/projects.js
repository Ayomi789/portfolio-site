import rawProjects from './projects.json'

// Card numbers are derived from order so reordering in the admin never needs manual renumbering.
export const PROJECTS = rawProjects.map((p, i) => ({
  ...p,
  n: String(i + 1).padStart(2, '0'),
}))


