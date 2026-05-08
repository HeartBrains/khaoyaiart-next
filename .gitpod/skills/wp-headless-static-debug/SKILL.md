---
name: wp-headless-static-debug
description: Debug and fix common issues in Next.js static export projects backed by a WordPress headless CMS. Use when a page shows a 404, images are missing/broken, or data fields are blank on a statically exported Next.js + WordPress site. Triggers on "image not showing", "feature image missing", "detail page 404", "blank field", "period not showing", "FALLBACK_SLUGS", "generateStaticParams", "wp-mappers", "crossOrigin image", "new post 404", "static export 404".
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

## Static params 404

**Symptom:** A new WP post's detail page returns 404. Existing posts work fine.

**Root cause:** `dynamicParams = false` in `app/<site>/<cpt>/[slug]/page.tsx` means only slugs returned by `generateStaticParams` at build time get a static file. New posts added after the last build have no file.

**Diagnosis:**
1. Check `app/<site>/<cpt>/[slug]/page.tsx` for `dynamicParams = false`
2. Check `FALLBACK_SLUGS` — is the new slug missing?
3. Check if `fetchCPT` is returning the new slug (it may be filtered by `meta.site`)

**Fix — immediate:** Add the new slug to `FALLBACK_SLUGS`.

**Fix — structural:** Refactor `generateStaticParams` to always merge WP results with `FALLBACK_SLUGS`:

```ts
export const dynamicParams = false;

// Keep in sync with WP. Safety net if WP is unreachable at build time.
const FALLBACK_SLUGS = ['slug-1', 'slug-2' /* add new slugs here */];

export async function generateStaticParams() {
  const posts = await fetchCPT('<cpt-name>', '<site>');
  if (posts.length === 0) {
    console.warn('[generateStaticParams] <path>: WP returned no posts — falling back to FALLBACK_SLUGS. Check WP connectivity.');
  }
  const wpSlugs = posts.map(p => p.slug);
  const merged = Array.from(new Set([...wpSlugs, ...FALLBACK_SLUGS]));
  return merged.map(slug => ({ slug }));
}
```

This makes `FALLBACK_SLUGS` a permanent safety net rather than a replacement for WP data.

**When a new WP post causes a 404:** Add its slug to `FALLBACK_SLUGS` AND trigger a rebuild.

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
