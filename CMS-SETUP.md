# Portfolio CMS — Setup Guide

## How it works

The admin panel at **`/admin`** works in two modes:

- **Local (`npm run dev`)** — saves write straight to `src/data/projects.json` and the site hot-reloads.
- **Remote (deployed site)** — saves ask for a password, commit `projects.json` (+ any uploaded images) to the GitHub repo, and Vercel rebuilds the live site automatically (~1 min). This means you can update projects from any browser.

## One-time deployment setup

1. **Create the repo** `portfolio-site` under your GitHub account and push this project:

   ```
   git init
   git add .
   git commit -m "portfolio + cms"
   git remote add origin https://github.com/Ayomi789/portfolio-site.git
   git push -u origin main
   ```

2. **Create a GitHub token** (for the save API):
   - GitHub → Settings → Developer settings → Fine-grained personal access tokens → Generate
   - Repository access: **Only select repositories** → `portfolio-site`
   - Permissions: **Contents → Read and write** (nothing else)
   - Copy the token

3. **Deploy on Vercel**: vercel.com → Add New Project → import `Ayomi789/portfolio-site`.
   Vercel auto-detects Vite (build `npm run build`, output `dist`) and the `api/save.js` function.

4. **Set environment variables** in Vercel (Project → Settings → Environment Variables):

   | Name | Value |
   |---|---|
   | `ADMIN_PASSWORD` | any strong password you'll type into /admin |
   | `GITHUB_TOKEN` | the fine-grained token from step 2 |
   | `GITHUB_REPO` | `Ayomi789/portfolio-site` |
   | `GITHUB_BRANCH` | `main` |

   Then redeploy once so the variables take effect.

5. Open `https://<your-project>.vercel.app/admin` — edit something, save, enter the password.
   The commit lands in the repo and the site rebuilds.

## Notes

- The password is asked once per browser and stored in `localStorage` (`cms-password`); a rejected
  password clears it and prompts again.
- Uploads in remote mode are staged in the browser and committed on save (max 8 images per save).
- If you ever change the token or repo, update the env vars and redeploy.
