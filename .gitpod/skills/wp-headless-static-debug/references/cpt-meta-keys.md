# CPT Meta Key Reference

Known ACF/JetEngine meta keys per CPT, confirmed from live WP REST API responses.
Use this when debugging blank fields in `lib/wp-mappers.ts`.

## Table of contents
1. [residency-artist](#residency-artist)
2. [exhibition](#exhibition)
3. [activity](#activity)
4. [moving_image](#moving_image)
5. [blog / post](#blog--post)
6. [artist (kyaf)](#artist-kyaf)

---

## residency-artist

REST base: `residency_artist`  
Site filter: `meta.site === 'bkkk'` or `meta.site === 'kyaf'`

| Output field | WP meta key | Notes |
|---|---|---|
| `period` | `role_en` | Stores the residency date range, e.g. "January – March 2025" |
| `periodTH` | `role_th` → fallback `role_en` | |
| `role` | `role_en` | Same key as period — WP uses one field for both |
| `roleTH` | `role_th` → fallback `role_en` | |
| `bio` | `bio_en` → fallback `content.rendered` | |
| `bioTH` | `bio_th` → fallback `bio_en` | |
| `status` | `status` | Values: `current`, `past`, `upcoming` |
| `imageCredits` | `image_credits` | |
| `additionalInfo` | `additional_info` | |
| `ctaLabel` | `cta_label` | |
| `ctaUrl` | `cta_url` | |
| `featuredImage` | `featured_image_url` → fallback `featured_media` embed | |

**Does NOT have:** `date_display_en`, `date_display_th`

---

## exhibition

REST base: `exhibition`

| Output field | WP meta key | Notes |
|---|---|---|
| `period` | `date_display_en` | Human-readable date range |
| `periodTH` | `date_display_th` → fallback `date_display_en` | |
| `fromDate` | `from_date` | ISO date string |
| `toDate` | `to_date` | ISO date string |
| `year` | `year` | |
| `role` | `role_en` | Curator / organiser label |
| `roleTH` | `role_th` → fallback `role_en` | |

---

## activity

REST base: `activity`

| Output field | WP meta key | Notes |
|---|---|---|
| `period` | `date_display_en` | |
| `periodTH` | `date_display_th` → fallback `date_display_en` | |
| `tags` | `tags_en` | Comma-separated category tags |

---

## moving_image

REST base: `moving_image`

| Output field | WP meta key | Notes |
|---|---|---|
| `period` | `date_display_en` | |
| `periodTH` | `date_display_th` → fallback `date_display_en` | |

---

## blog / post

REST base: `posts` (standard WP post type)

Standard WP fields only — no custom meta keys for period/role.

---

## artist (kyaf)

REST base: `artist` (if applicable)

Confirm keys via live API — this CPT may differ from `residency-artist`.

---

## How to confirm a key

```bash
curl "https://content.khaoyaiart.org/wp-json/wp/v2/<rest_base>?per_page=1&_=$(date +%s)" \
  | grep -o '"meta":{[^}]*}'
```

Or for a specific post by slug:

```bash
curl "https://content.khaoyaiart.org/wp-json/wp/v2/<rest_base>?slug=<slug>&_=$(date +%s)" \
  | grep -o '"meta":{[^}]*}'
```
