# Pre-cross-site behavior audit and regression recovery

## Goal

Use the last known pre-cross-site build as the behavior baseline, identify site functions that were lost or changed afterward, and restore them with focused changes on the current `master` branch. Preserve the cross-site related-content feature while bringing back the earlier behavior.

The baseline identified by the user is the successful GitHub Actions build on `master` for commit `d9cb7429` (`SSG rebuild 2026-10-17T02:43:45Z`). The repo does not contain that commit and the configured GitHub remote does not resolve it, so this recovery uses the user's six-item regression list, the provided screenshot, and current live/build behavior as its evidence. It cannot claim a line-by-line comparison to the Oct 17 source tree. The user reports that the following behavior is missing or incorrect:

1. Menu/control behavior associated with the slideshow image is missing.
2. Images embedded within page content are missing.
3. The “Additional Info” area should return to its larger presentation from the baseline.
4. Related-content image proportions and item ordering/layout are distorted.
5. The menu’s side-switching behavior and logo placement on the opposite side are missing.
6. Videos embedded within page content are missing.

## Requirements

- Compare current behavior with all recoverable baseline evidence before changing implementation code; record when the exact source or generated output is unavailable.
- Inspect all site routes and shared components affected by the changes after the baseline, rather than limiting the audit to the related-content component.
- Trace each reported regression to its data source, mapper, route/page component, shared UI, or generated static output. Record the responsible files and affected routes in a regression matrix.
- Restore the six reported behaviors to match the baseline on the routes and viewport sizes where each applies:
  - slideshow image menu and controls;
  - images embedded in content;
  - larger Additional Info presentation;
  - related-content proportions and ordering/layout;
  - menu side-switching and opposite-side logo placement;
  - embedded content videos.
- Keep current cross-site related-content selection and rendering functional. Related records must continue resolving to the correct site: internal site ID `bkkk` uses `/bk/`, and `kyaf` uses `/kyaf/`.
- Preserve existing WordPress relation values and plugin behavior. Do not change the field schema or relation storage unless the audit proves that a frontend regression cannot be corrected without it.
- Implement each recovery as the smallest targeted change that restores baseline behavior. Do not reset `master` to the October 17 build or broadly revert the cross-site feature.
- Check both statically generated pages and the existing runtime detail-page fallback where supported.
- After implementation, build the static frontend and inspect its generated output before using the repository’s established GitHub deployment trigger.

## Constraints and known facts

- Work on `master`; do not base changes on a `dev` branch.
- The current checkout is `/workspaces/khaoyaiart-next`, with `origin` set to `HeartBrains/khaoyaiart-next`.
- The checked-out repository does not contain commit `d9cb7429`; fetching that SHA from the configured remote failed, and the GitHub API did not resolve it. The user’s screenshot identifies it as a completed `master` build. Do not silently substitute October 9 commit `9fde9f5` for the October 17 baseline. Implementation may proceed from the user's regression list and verifiable current behavior while clearly recording this comparison limit.
- The worktree has a pre-existing untracked `.devcontainer/` directory. Leave it untouched.
- The public URL prefix `/bk/` maps to internal site ID `bkkk`; `/kyaf/` maps to `kyaf`. Preserve this mapping in route resolution and detail fallback handling.
- WordPress is headless at `content.khaoyaiart.org`; the frontend is a static export with build-time WordPress data and client-side fallback for supported detail pages. There is no Next.js server runtime.
- Before writing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` and follow the repository-specific Next.js rules.
- Do not install or mutate WordPress plugins as part of frontend recovery unless the regression audit establishes a specific WordPress-side cause. If plugin changes become necessary, keep them separately scoped and package/push the plugin source or ZIP without installing it on WordPress.

## Architecture and audit method

1. **Baseline acquisition:** Resolve the exact full SHA behind `d9cb7429` from the GitHub Actions run, a retained Git ref, checkout, or build artifact. Verify its parent and tree before treating it as the source baseline. If only a static artifact is recoverable, use it for visual and behavior comparison and record that source-level attribution remains limited.
2. **Behavior inventory:** Enumerate current BK and KYAF routes, shared layouts, detail templates, menus, content renderers, media components, and related-content components. For each of the six reported items, record baseline behavior, current behavior, affected templates/routes, likely owner, and the verification method.
3. **Regression attribution:** Compare source commits after the baseline and inspect generated output separately. Distinguish source regressions from stale SSG output or missing WordPress response data. Identify the smallest responsible code path for each issue.
4. **Focused recovery:** Apply targeted frontend fixes on current `master`. Keep site-specific presentation in the established BK/KYAF component trees, and keep shared behavior in existing shared components only where both sites use the same contract. Preserve cross-site relation resolution and canonical URLs.
5. **Verification:** Compare representative baseline and current pages, then verify every affected route/site combination, responsive menu positions, inline images and video, Additional Info sizing, slideshow controls, and related-content layout/order. Confirm cross-site related links still use `/bk/` or `/kyaf/` correctly.
6. **Static release:** Rebuild the static export through the repository workflow, inspect representative generated files, and use the established GitHub trigger after the recovered behavior is reviewable.

## Implementation steps

1. Attempt to retrieve the full `d9cb7429` revision or its corresponding successful build artifact. Keep the current `master` worktree as the implementation target; if retrieval fails, document the evidence limit and use the user's regression list and live/build behavior.
2. Create a route-by-route regression matrix for the six reported behaviors and identify any additional behavior differences found by comparing shared layouts, detail pages, and generated output.
3. Trace each regression to the first source change after the baseline that explains it; document whether its cause is a frontend component, data mapping/API response, CSS/layout, or stale SSG output.
4. Prepare a minimal recovery design for each confirmed regression, including any interaction between restored behavior and cross-site related content. Do not implement a broad rollback.
5. Implement the approved focused recovery on current `master`, preserving one-way relations, existing WordPress data, and correct site/type/slug routing.
6. Build and manually verify the affected pages against the baseline. Verify both BK and KYAF where applicable, desktop and narrow viewport behavior for the menu/layout, and static plus runtime detail rendering where supported.
7. Review the final diff for unrelated changes, then rebuild and publish through the existing GitHub workflow. Do not install WordPress plugin updates as part of this frontend-only recovery.

## Success criteria

- The October 17 baseline recovery limitation is clearly recorded; behavior claims are limited to the user's supplied regression list and observed current output.
- A regression matrix covers all six reported behaviors and the affected routes/components; any other discovered losses are added with evidence before implementation.
- Slideshow image menu/control behavior matches the baseline.
- Inline content images and embedded videos render on the same supported pages as in the baseline.
- Additional Info returns to the baseline’s larger presentation.
- Related-content cards preserve the baseline’s intended image proportions and ordering/layout while continuing to show cross-site records with correct links.
- The menu retains its side-switching behavior and opposite-side logo placement across relevant viewport sizes.
- Existing BK/KYAF route mapping, WordPress relation data, and cross-site relation behavior remain intact.
- The generated static output contains the recovered behavior, and supported runtime detail fallback pages behave consistently.
- The implementation diff contains only the changes needed for verified regressions and the associated generated build output.
