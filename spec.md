# Align production related-content design with dev

## Goal

Keep the correct cross-site related records currently shown on `khaoyaiart.org`, while matching the related-content design and layout shown on `dev.khaoyaiart.org` in the user-provided comparison screenshot. Apply the design to **all related-content sections on BK and KYAF detail pages**. Treat dev as a visual reference only; make the implementation on `master` and publish it to production.

The comparison is for the BK exhibition detail page `/bk/exhibitions/spirits-melt-to-flesh/`. Production currently has the desired cross-site records but presents them as a carousel under a generic “Related content” heading, with oversized/wide cards. The dev screenshot shows a stronger “Related Activities” heading and a two-column card grid with portrait images, titles, and dates beneath. The user confirmed that this layout should apply across all BK and KYAF detail pages.

## Requirements

- Preserve the cross-site relation data that is currently correct on production. Do not replace it with dev content or dev API data.
- Match the dev screenshot's related-content presentation for the agreed scope, including group heading treatment, card grid, image proportions/cropping, typography, and spacing.
- Keep same-type BK and KYAF records in the same group and retain the current production relation ordering unless the user confirms another order.
- Every card must link to the correct site and detail route: `bkkk` records use `/bk/`; `kyaf` records use `/kyaf/`.
- Preserve the prior display requirement: show a related record's date below its title and omit the site name.
- Make the layout usable at narrow and wide viewport sizes; prevent horizontal overflow and ensure every card remains reachable.
- Apply the agreed layout consistently to the agreed detail-page/site scope, including generated detail pages. Keep the existing runtime detail fallback compatible where it renders related records.
- Do not modify WordPress relation storage, editor fields, or plugins for this presentation change.

## Constraints and current architecture

- Work on `master`; do not develop on or merge from the `dev` branch.
- `khaoyaiart.org` is the production frontend. `www.khaoyaiart.org` redirects to it. `dev.khaoyaiart.org` is a separate visual reference and must not be the deployment target.
- The current checkout is `/workspaces/khaoyaiart-next`; the deployed production revision is `82fd194dbd4a22ef7c47d872a5f10422667619fd`.
- The frontend is a Next.js static export backed by WordPress at `content.khaoyaiart.org`. The shared `components/RelatedContent.tsx` component groups relation records and currently renders them in a carousel. Data mapping and canonical route generation are in `lib/`.
- Keep the data and presentation responsibilities separate: retain the production related-record model, grouping, ordering, and `relatedContentHref` routing while changing the shared card presentation to match the approved dev reference.
- The recent Hostinger sync targeted `/home/u202460562/domains/khaoyaiart.org/public_html`; WordPress files under the `content.khaoyaiart.org` document root were not changed.
- Before writing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` as required by `AGENTS.md`.
- Avoid removing generated files during manual deployment. The prior sync kept old assets and backed up replaced files under `/home/u202460562/.backups/kyaf-static-before-82fd194dbd`.

## Proposed architecture

1. Keep production's current cross-site record resolution and route builder as the source of truth.
2. Update the shared related-content renderer's presentation to reproduce the approved dev layout. Use responsive CSS grid/card styles rather than importing dev branch code or changing the relation API.
3. Keep the related type groups and each group's production item order intact. Display the existing title, date, and image fields with the established language fallback.
4. Rebuild the static export on `master`, inspect representative generated detail pages, then publish those files to the production document root using the repository's GitHub workflow and the verified Hostinger route if CI output alone does not refresh the domain.

## Implementation steps

1. Compare `components/RelatedContent.tsx` and its supporting styles with the dev screenshot; identify the smallest presentation-only changes needed for the approved layout.
2. Implement the responsive related-card grid on `master`, preserving production's cross-site data, grouping, selection order, and canonical links.
3. Run the static build and inspect representative BK and KYAF generated detail pages across all supported detail types. Verify records from both sites remain present, dates appear below titles, site names are absent, and card links resolve to the correct prefixes.
4. Push the source change to `master`, allow GitHub Actions to generate and commit `out/`, and verify the production URL serves the new output. Do not deploy to `dev.khaoyaiart.org` or modify WordPress.

## Success criteria

- All BK and KYAF detail pages with related content visually match the dev reference's related-content heading, card grid, image proportions, typography, and spacing at desktop and narrow widths.
- Production continues to show the correct cross-site related records, in the existing selected order, with each site's records grouped together by type.
- Cards show the date below the title and do not display a site label.
- Each card opens the correct `/bk/` or `/kyaf/` detail page.
- The static build succeeds, generated output contains the approved design, and the production URL serves the new build.
- Changes stay on `master`; the dev branch, dev host, WordPress content, and relation-field storage remain unchanged.
