---
name: wp-headless-static-debug
description: Debug and fix common issues in Next.js static export projects backed by a WordPress headless CMS. Use when a page shows a 404, images are missing/broken, data fields are blank, or a mapper field needs bilingual support on a statically exported Next.js + WordPress site. Triggers on "image not showing", "feature image missing", "detail page 404", "blank field", "period not showing", "FALLBACK_SLUGS", "generateStaticParams", "wp-mappers", "crossOrigin image", "new post 404", "static export 404", "add bilingual field", "additionalInfo", "collaboration field", "in collaboration".
---

# WP Headless Static Export — Debug & Fix

## Project context

- Framework: Next.js App Router, `output: "export"` (fully static, no server runtime)
- CMS: WordPress headless, REST API at `content.khaoyaiart.org/wp-json/wp/v2`
- Hosting: Hostinger static hosting — serves pre-built files from `out/`
- Deploy: GitHub Actions (`deploy.yml`) triggers on push to `master` matching `app/**`, `components/**`, `lib/**`, `utils/**`, `public/**`, `next.config.ts`, `package.json`
- CI flow: `npm ci` → `npm run build` → commits `out/` back to `master` → Hostinger serves it

## Diagnostic workflow

### Step 1 — Identify the symptom category

| Symptom | Go to |
|---|---|
| Image shows fallback/blank on a listing page | [Image CORS issue](#image-cors-issue) |
| Detail page returns 404 after new WP post added | [Static params 404](#static-params-404) |
| Field is blank on detail page despite data in WP | [Mapper field key mismatch](#mapper-field-key-mismatch) |
| Need to show a field differently for one specific record | [Per-record display override](#per-record-display-override) |
| Need to add EN/TH bilingual support to a mapper field | [Adding bilingual mapper fields](#adding-bilingual-mapper-fields) |

### Step 2 — Inspect the raw WP data first

Before touching code, confirm what WP actually returns:

```bash
curl "https://content.khaoyaiart.org/wp-json/wp/v2/<rest_base>?per_page=2&_=$(date +%s)" \
  | grep -o '"meta":{[^}]*}'
```

Replace `<rest_base>` with the CPT REST base (see `lib/wp-api.ts` `REST_BASE` map). This reveals the actual meta key names and values — compare against what `lib/wp-mappers.ts` reads.

---

## Image CORS issue

**Symptom:** Images from `content.khaoyaiart.org/wp-content/uploads/` show a fallback or are hidden, even though the URL is valid.

**Root cause:** `crossOrigin="anonymous"` on the `<img>` (or a component that spreads props onto `<img>`) forces CORS mode. The WP media server returns no `Access-Control-Allow-Origin` header → browser blocks the load → `onError` fires → image hidden.

**Diagnosis:**
1. Find the listing page component (e.g. `components/<site>/components/pages/<CPT>Page.tsx`)
2. Search for `crossOrigin` in the card component
3. Check `ImageWithFallback` — it spreads all props onto a plain `<img>`, so any `crossOrigin` prop reaches the DOM

**Fix:** Remove `crossOrigin="anonymous"` from the `<ImageWithFallback>` call. Plain `<img>` tags load WP-hosted images fine without CORS mode. Only add `crossOrigin` when you need Canvas pixel access or SRI verification.

**Rule:** Never add `crossOrigin` to display-only images from servers you don't control CORS headers on.

---

## Per-record display override

**Symptom:** One specific exhibition (or other record) needs to display a different field in a slot that normally shows something else (e.g. show "In Collaboration with X" instead of curator name on the list card).

**Pattern:** Hardcode a slug condition in the listing page component. Do NOT create a new WP field — use an existing field that already holds the correct data on the detail page.

**Steps:**
1. Find what field the detail page already renders for that record (e.g. `additionalInfo` rendered via `<RichContent>` in `ExhibitionDetailPage.tsx`).
2. Confirm the field is mapped in `lib/wp-mappers.ts` for that CPT.
3. In the listing card component (e.g. `ExhibitionsPage.tsx`), add a slug check:

```tsx
{item.slug === 'target-slug' && item.additionalInfo?.[language] ? (
  <div className="text-xl md:text-2xl font-normal text-black leading-tight">
    <RichContent content={item.additionalInfo[language] || item.additionalInfo.en} />
  </div>
) : (
  <p className="text-xl md:text-2xl font-normal text-black leading-tight">
    {item.artist[language] || item.curator?.[language]}
  </p>
)}
```

4. Import `RichContent` from `@/utils/richContent` if rendering HTML.
5. All other records are unaffected.

**Important:** After changing a mapper field shape (e.g. `string` → `{ en, th }`), update every component that reads that field — check with:
```bash
grep -rn "\.additionalInfo" components/ lib/ app/ --include="*.tsx" --include="*.ts"
```

---

## Adding bilingual mapper fields

**Symptom:** A mapper field is a plain `string` but needs EN/TH language support.

**Pattern:** Change the field from `m(post, 'field_key')` to an object with `en`/`th` keys. The TH key is conventionally `field_key_th`.

**In `lib/wp-mappers.ts`:**
```ts
// Before
additionalInfo: m(post, 'additional_info'),

// After
additionalInfo: {
  en: m(post, 'additional_info'),
  th: m(post, 'additional_info_th') || m(post, 'additional_info'),
},
```

**Update all consumers** — the shape change is a breaking change for any component reading the field:
```bash
grep -rn "\.additionalInfo" components/ lib/ app/ --include="*.tsx" --include="*.ts"
```

For each consumer, update from `data.additionalInfo` to `data.additionalInfo[language] || data.additionalInfo.en`.

**Note:** Only change the mapper for the specific CPT that needs it (e.g. `mapBkkkExhibition`). Other CPT mappers (Activity, Artist, MovingImage) that also have `additionalInfo` remain as plain strings unless they also need bilingual support.

**After the change:** The SSG rebuild CI will automatically regenerate `out/` with the updated JS chunks on the next push to `master`. A transient 404 on detail pages resolves once the rebuild completes (~2–3 min).

---

## Static params 404

**Symptom:** A new WP post's detail page returns 404. Existing posts work fine.

**Architecture:** Two-layer fallback system:
1. **Static pages** in `out/` — built from slugs returned by `generateStaticParams` (WP API + `FALLBACK_SLUGS`). Served directly by Hostinger.
2. **`app/not-found.tsx` smart shell** — Hostinger serves `out/404.html` for any URL with no matching file. `not-found.tsx` reads `window.location.pathname`, matches known CPT routes, and renders the correct `*DetailClientPage` client component dynamically from WP API. This handles new slugs immediately without a rebuild.

**Root cause of 404:** `dynamicParams = false` means only pre-built slugs get a static file. New slugs fall through to `not-found.tsx`. If `not-found.tsx` itself crashes (e.g. due to a JS error in a shared component), ALL detail pages 404.

**Diagnosis:**
1. Check `app/<site>/<cpt>/[slug]/page.tsx` for `dynamicParams = false`
2. Check `FALLBACK_SLUGS` — is the new slug missing? (Less critical — `not-found.tsx` handles it dynamically)
3. Check if a recent code change broke a shared component used by `not-found.tsx` (e.g. mapper shape change causing a runtime JS error)
4. Check if the SSG rebuild CI ran after the last code push — a transient 404 resolves once `out/` is regenerated (~2–3 min)

**Fix — immediate (new slug missing from static build):** Add the slug to `FALLBACK_SLUGS`. The `not-found.tsx` fallback will serve it dynamically in the meantime.

**Fix — structural:** Refactor `generateStaticParams` to always merge WP results with `FALLBACK_SLUGS`:

```ts
export const dynamicParams = false;

// Safety net if WP is unreachable at build time. Add new slugs here.
const FALLBACK_SLUGS = ['slug-1', 'slug-2'];

export async function generateStaticParams() {
  const posts = await fetchCPT('<cpt-name>', '<site>');
  if (posts.length === 0) {
    console.warn('[generateStaticParams] WP returned no posts — using FALLBACK_SLUGS only.');
  }
  const wpSlugs = posts.map(p => p.slug);
  const merged = Array.from(new Set([...wpSlugs, ...FALLBACK_SLUGS]));
  return merged.map(slug => ({ slug }));
}
```

**When ALL detail pages 404 after a code change:** The issue is likely a runtime JS error in a shared component (not a missing slug). Check for breaking shape changes in mappers or shared utilities. The SSG rebuild will fix it once the new `out/` is deployed.

---

## Mapper field key mismatch

**Symptom:** A field (e.g. period, role, title) is blank on the detail page despite having data in WP.

**Root cause:** `lib/wp-mappers.ts` reads the wrong ACF/JetEngine meta key for that CPT. Keys differ between CPT types — copying a mapper from one CPT to another without updating keys causes silent empty strings.

**Diagnosis:**
1. Find the mapper in `lib/wp-mappers.ts` for the affected CPT
2. Note the string passed to `m(post, '...')` for the blank field
3. Fetch the raw WP data and inspect `meta` keys (see Step 2 above)
4. Compare — if the key doesn't exist on that CPT, `m()` returns `''`

**CPT meta key reference:** Read `references/cpt-meta-keys.md` for the known field map per CPT.

**Fix:** Update the `m(post, '...')` call to use the correct key confirmed from the live WP API response.

---

## WP plugin changes

Whenever `bkkk-menu-config.php` is modified:
1. Increment the `Version:` header (semver — patch for fixes, minor for new features)
2. Repackage the zip: `cd wp-plugin && zip -r bkkk-menu-config.zip bkkk-menu-config/`
3. Commit both `bkkk-menu-config.php` and `bkkk-menu-config.zip`
4. Share the download link with the user so they can re-upload in WP admin:
   `https://github.com/HeartBrains/khaoyaiart-next/raw/master/wp-plugin/bkkk-menu-config.zip`

---

## Deploy flow

After making fixes:

```bash
git checkout -b <initials>/fix-<area>
git add <changed files>
git commit -m "fix(<scope>): <description>

Co-authored-by: Ona <no-reply@ona.com>"
git push -u origin <branch>
# Open PR → merge to master → CI builds and commits out/ automatically
```

Branch naming: `<initials>/fix-<area>` (e.g. `hb/fix-bk-residency`)  
Commit style: conventional commits — `fix(<scope>): <description>`

Merging to `master` with changes in `app/**`, `components/**`, or `lib/**` triggers the deploy workflow automatically.

---

## Local build fallback (when CI is broken)

**When to use:** CI (`deploy.yml`) fails at checkout (expired `GH_PAT` secret) or any other step, so `out/` is never rebuilt. Hostinger still serves the stale `out/`. Build and commit `out/` manually.

**Check CI status first:**
```bash
curl -s "https://api.github.com/repos/HeartBrains/khaoyaiart-next/actions/runs?branch=master&per_page=3" \
  | grep -o '"conclusion":"[^"]*"' | head -3
```
If `"failure"` appears, proceed with local build.

**Install Node (no Node in devcontainer by default):**
```bash
curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir /tmp/fnm --skip-shell
/tmp/fnm/fnm install 20 --fnm-dir /tmp/fnm-versions
export PATH="/tmp/fnm-versions/node-versions/v20.20.2/installation/bin:$PATH"
```

**Build and verify:**
```bash
cd /workspaces/khaoyaiart-next
npm ci
npm run build
# Spot-check the changed page — e.g. for /kyaf/visit:
grep -o "YourChangedText" out/kyaf/visit/index.html
```

**Commit and push `out/`:**
```bash
git add out/
git commit -m "SSG rebuild $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
git push origin master
```

Hostinger picks up the new `out/` immediately on push. No CI needed.
