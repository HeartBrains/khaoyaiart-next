<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## URL prefix mapping

The BK site uses `/bk/` in URLs but the internal site identifier is `bkkk`. The KYAF site uses `/kyaf/`.

| URL prefix | Internal site ID | Components folder |
|---|---|---|
| `/bk/` | `bkkk` | `components/bkkk/` |
| `/kyaf/` | `kyaf` | `components/kyaf/` |

**`app/not-found.tsx`** maps `/bk/` → `bkkk` in `matchRoute()`. If you add new site prefixes or CPTs, update both `matchRoute()` and `DetailShell` in that file.

## 404s on detail pages

Detail pages are statically built from WP slugs at build time (`generateStaticParams`). Slugs added to WP after the last build will 404 until either:
1. A rebuild runs (CI or local), OR
2. The `not-found.tsx` smart shell handles them at runtime (client-side fetch from WP API)

The smart shell covers: `exhibitions`, `activities`, `moving-image`, `artists`, `blog` for both `/bk/` and `/kyaf/`.

If a detail page 404s:
1. Confirm the slug exists in WP: `curl "https://content.khaoyaiart.org/wp-json/wp/v2/activity?slug=<slug>"`
2. Check `out/<site>/<cpt>/<slug>/` — if missing, the slug wasn't built
3. Check `not-found.tsx` `matchRoute()` handles the URL prefix
4. Run a local build (see `CLAUDE.md` local build fallback) and push `out/`
