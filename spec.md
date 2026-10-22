# Cross-site related content

## Goal

Allow WordPress editors to relate published content records across Bangkok Kunsthalle (BK) and Khao Yai Art Forest (KYAF). Show those relations on the headless detail pages, grouped by the related record’s content type, with every link pointing to the record’s correct site and detail route.

This spec replaces the previously completed smart-404 spec. The previous spec is preserved at [docs/spec-immediate-detail-access.md](docs/spec-immediate-detail-access.md).

## Requirements

### WordPress editor

- Extend the existing custom WordPress code/plugin that stores related records. Keep its existing storage format and preserve saved relations; do not migrate or clear relation data unless discovery shows the current schema cannot support cross-site selection.
- Let editors select any **published record with a supported headless detail route**, regardless of whether its site is BK or KYAF or whether its content type matches the current record.
- Make each candidate identifiable by title, content type, and owning site. Exclude the current record, unpublished records, duplicate selections, and records without a valid site/type/slug route.
- Keep relations one-way. Adding A → B must not add B → A automatically.

### Headless site

- Expose the relation data through the WordPress REST API in a form the static build and client-side detail fallback can use. Each resolved item needs at least its WordPress ID, type, slug, title, and owning site; include a featured image when available.
- Render a related-content section on detail pages when a record has related items. Group items by related record type. Records of the same type from BK and KYAF appear together in that group, rather than in separate site groups.
- Match each brand’s current detail-page design and reuse its established card/list patterns. Use the linked record’s site and type to generate its URL; do not rely on a WordPress admin permalink.
- Keep relations directional: an item appears on A’s page when A relates to it, and does not appear on B’s page unless B has its own relation to A.
- Work for statically generated detail pages and for detail pages rendered by the runtime smart 404 shell.

## Constraints and current architecture

- The headless site is a Next.js static export backed by WordPress at `content.khaoyaiart.org`. Related data must be available during build and to the existing client-side fallback; there is no Next.js server runtime.
- Internal site IDs are `bkkk` and `kyaf`. Public route prefixes are `/bk/` for `bkkk` and `/kyaf/` for `kyaf`. The shared route resolver must preserve this mapping.
- Existing detail routes cover exhibitions, activities, artists (`residency_artist` records), and blog on both sites. BK also has a moving-image detail route. Team and press records do not currently have detail routes and therefore are not picker candidates under the agreed scope.
- Route support needs an implementation-time audit: `app/not-found.tsx` recognizes `moving-image` in its route matcher, but its detail shell currently renders moving-image only for `bkkk`. Do not offer KYAF moving-image records until that route is actually supported.
- `fetchCPT(cpt, site)` filters records to one site. Resolving a cross-site relation must not accidentally drop the related record through that site filter. Use the relation API response or an ID-based lookup that can resolve both sites.
- The related-record field and picker are not defined in the checked-in plugins. The live/custom WordPress plugin and its field schema must be located before implementation. Reuse the established field where possible and keep the implementation deployable to WordPress separately from the static-site code.
- Before writing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` as required by the repository instructions.

## Architecture

1. **WordPress relation provider:** The existing custom plugin owns the editor field and relation storage. Its candidate query spans the supported content types and both site values, returns published records only, and exposes enough metadata to identify each candidate. The relation remains a directed reference.
2. **REST contract:** The plugin or current REST integration exposes selected relations as IDs and/or resolved record summaries. The response must be public-safe and must not expose drafts or private fields. Preserve ordering from the WordPress relation field if it has an explicit selection order.
3. **Headless model and route resolver:** Add a shared related-record model and a single route resolver based on the related record’s site and type. Map `bkkk` to `/bk/`, `kyaf` to `/kyaf/`, and use only routes confirmed to exist. Unresolvable records must not produce guessed links.
4. **Detail rendering:** Both brand component trees consume the same relation model. Their visual wrappers follow each brand’s existing design. The rendering groups resolved records by type and combines BK and KYAF records within each type group.
5. **Static and runtime data paths:** Integrate the relation contract with build-time detail data and the client-side detail fetch used by the smart 404 shell so both paths show the same related items and canonical links.

## Implementation steps

1. Locate the live/custom WordPress plugin and identify the existing relation field, stored value shape, candidate query, and REST exposure. Inventory published detail routes by site and content type; map `residency_artist` to `/artists/` and resolve the KYAF moving-image discrepancy before considering that type eligible.
2. Extend the existing picker to query all published, routable records from both sites. Preserve the current relation storage and existing selections; show title, type, and site in candidate results; retain one-way behavior.
3. Expose selected relations through the WordPress REST API with the fields needed by the headless site. Confirm cross-site records can be resolved without site-filter loss.
4. Implement the shared related-record mapping and canonical route resolver for every supported site/type combination. Handle missing site, type, slug, or unpublished targets without emitting broken links.
5. Add the grouped related-content section to BK and KYAF detail pages, using their current visual patterns. Include all supported detail types and keep same-type records from both sites together.
6. Verify manually in WordPress and on both site variants: select same-site and cross-site records, inspect REST responses, confirm one-way behavior and type grouping, and follow links to the correct site. Verify both a generated detail page and the runtime smart-404 path after a rebuild.
7. Package/deploy the WordPress plugin update separately, then rebuild and publish the static site through the repository’s established deploy workflow.

## Success criteria

- Editors can find and select any published, routable record from either BK or KYAF, including records of a different type from the current record.
- Draft, private, deleted, unsupported-route, self, and duplicate candidates are not offered or rendered.
- Existing saved relations remain intact, and a relation remains one-way unless separately selected on the other record.
- REST data identifies each selected record’s type and owning site and is usable by both static and client-side detail rendering.
- Detail pages show related records grouped by type, with BK and KYAF records of the same type together and styled consistently with the page’s brand.
- Every related link resolves to the correct public route: `/bk/...` for `bkkk` and `/kyaf/...` for `kyaf`.
- Same-site and cross-site relations behave consistently on both BK and KYAF pages, including after static rebuild and through the runtime smart 404 shell.
