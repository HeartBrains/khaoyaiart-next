@AGENTS.md

## Deploy & Hosting

**Stack:** Next.js App Router, `output: "export"` (fully static) · WordPress headless CMS (REST API at `content.khaoyaiart.org/wp-json/wp/v2`) · Hostinger static hosting

**How it works:** Hostinger serves pre-built files from the `out/` directory committed to `master`. GitHub Actions (`deploy.yml`) triggers on pushes to `master` that touch `app/**`, `components/**`, `lib/**`, `utils/**`, `public/**`, `next.config.ts`, or `package.json`. The CI flow is: `npm ci` → `npm run build` → commit `out/` back to `master` → Hostinger picks it up automatically.

### Normal deploy

Push source changes to `master`. CI builds and commits the new `out/` — no manual steps needed.

### Local build fallback (when CI is broken)

If CI fails (e.g. expired `GH_PAT` secret), `out/` is never rebuilt and Hostinger serves stale content. Build and push manually:

```bash
# Check CI status
curl -s "https://api.github.com/repos/HeartBrains/khaoyaiart-next/actions/runs?branch=master&per_page=3" \
  | grep -o '"conclusion":"[^"]*"' | head -3

# Install Node (devcontainer has none by default)
curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir /tmp/fnm --skip-shell
/tmp/fnm/fnm install 20 --fnm-dir /tmp/fnm-versions
export PATH="/tmp/fnm-versions/node-versions/v20.20.2/installation/bin:$PATH"

# Build
cd /workspaces/khaoyaiart-next
npm ci
npm run build

# Verify a changed page, then commit and push
grep -o "ExpectedText" out/kyaf/visit/index.html
git add out/
git commit -m "SSG rebuild $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
git push origin master
```
