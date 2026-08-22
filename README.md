# portfolio-site

Personal developer portfolio of Abdullateef Salako — Full-Stack & AI Systems Developer.

- **Live**: https://portfolio.ife.is-a.dev
- **Admin / CMS**: https://portfolio.ife.is-a.dev/admin (password-protected)

## Updating content

Projects are managed through the built-in CMS at `/admin` — no code edits needed:

- **From anywhere**: open `/admin` on the live site, log in, edit. Saving commits
  `src/data/projects.json` (and any uploaded images) to this repo via the GitHub API,
  and Vercel redeploys the live site automatically (~1 min).
- **Locally**: `npm run dev` → http://localhost:5199/admin — saves write straight to
  `src/data/projects.json` with instant hot-reload, no password needed.

Each project supports: name, tagline, type, status, description, problem/build notes,
architecture lines, stack, metrics, badge color, live-demo URL, GitHub URL, and an
optional card image (upload or URL; falls back to a custom visual component or a
clean default panel).

## Stack

React 19 + Vite 7 + Tailwind CSS 4. Deployed on Vercel (auto-deploy from `main`).
Serverless functions in `api/` power the remote CMS (login check + GitHub-committed saves).

## Repo layout

```
api/                 serverless functions (auth + save)
src/admin/           CMS admin panel (login + editor)
src/components/      portfolio sections
src/data/projects.js single source of truth for projects
public/cv/           CV served at /cv/
CMS-SETUP.md         full CMS + deployment guide
```
