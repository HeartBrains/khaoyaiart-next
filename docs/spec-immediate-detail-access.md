# Spec: Immediate detail page access via smart 404 fallback

## Problem

When a new record is added to WordPress, the detail page (e.g. `/kyaf/exhibitions/new-slug`) returns a 404 on Hostinger until CI finishes building (~2-3 min). The user wants the page to be accessible immediately via client-side fetch, with the proper static HTML replacing it after CI completes.

## How it works

Hostinger static hosting serves `404.html` for any URL that has no matching file. Currently `404.html` is Next.js's generic "This page could not be found." page.

The fix: replace `404.html` with a **smart shell** that:
1. Reads `window.location.pathname` on load
2. Detects the site (`bkkk` or `kyaf`) and CPT type (`exhibitions`, `activities`, `moving-image`, `residency`, `blog`, `artists`) from the URL
3. Renders the appropriate detail client component with the slug
4. Shows the full detail page content fetched from WP API at runtime

Once CI builds the proper static `index.html` for that slug, Hostinger serves it directly and the 404 fallback is no longer used for that URL.

## URL patterns to handle

| URL pattern | Site | Component |
|-------------|------|-----------|
| `/kyaf/exhibitions/:slug` | kyaf | `ExhibitionDetailClientPage` |
| `/bkkk/exhibitions/:slug` | bkkk | `ExhibitionDetailClientPage` |
| `/kyaf/activities/:slug` | kyaf | `ActivityDetailClientPage` |
| `/bkkk/activities/:slug` | bkkk | `ActivityDetailClientPage` |
| `/bkkk/moving-image/:slug` | bkkk | `MovingImageDetailClientPage` |
| `/kyaf/residency/:slug` | kyaf | residency detail |
| `/bkkk/residency/:slug` | bkkk | residency detail |
| `/kyaf/blog/:slug` | kyaf | blog detail |
| `/bkkk/blog/:slug` | bkkk | blog detail |
| `/kyaf/artists/:slug` | kyaf | artist detail |
| `/bkkk/artists/:slug` | bkkk | artist detail |
| Anything else | — | Generic 404 message |

## Implementation approach

### Option: Custom `app/not-found.tsx`

Create `app/not-found.tsx` as a client component that:
- Uses `usePathname()` (or `window.location.pathname` since it's client-only)
- Matches the URL against known patterns
- Renders the correct `*DetailClientPage` component with the extracted slug
- Falls back to a styled 404 message for unrecognised URLs

Next.js will build this as `out/404.html` automatically.

### Key detail

The `*DetailClientPage` components already exist and already fetch data from WP API at runtime — no new fetch logic needed. The 404 page just needs to route to the right one based on the URL.

## Acceptance Criteria

- Visiting `/kyaf/exhibitions/brand-new-slug` immediately after adding to WP shows the detail page (not a blank 404)
- Visiting a genuinely non-existent URL shows a styled 404 message
- After CI builds, the proper static page is served (no change needed — Hostinger serves `index.html` over `404.html` when the file exists)
- Both BKKK and KYAF sites work
- All CPT types (exhibitions, activities, moving-image, residency, blog, artists) work

## Implementation Steps

1. Create `app/not-found.tsx` as a `'use client'` component
2. Use `useEffect` + `useState` to read `window.location.pathname` (avoid SSR issues)
3. Parse pathname → extract `site`, `cpt`, `slug`
4. Render the matching `*DetailClientPage` component, or a styled 404 for unknown routes
5. Wrap in the appropriate layout (KYAF or BKKK) based on site
6. Run `npm run build` — verify `out/404.html` contains the smart shell
7. Commit and push
