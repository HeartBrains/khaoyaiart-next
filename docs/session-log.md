# Session Log

## Changes made (uncommitted)

### `lib/wp-mappers.ts`
- Added `curator` field to `mapActivity`

### `components/bkkk/components/pages/ActivityDetailPage.tsx`
- Added "Curated by [name]" below date in left column

### `components/kyaf/components/pages/ActivityDetailPage.tsx`
- Added "Curated by [name]" below date in left column

### `components/kyaf/components/pages/ExhibitionDetailPage.tsx`
- Added "Curated by [name]" below additionalInfo, above imageCredits in left column

### `components/bkkk/components/layout/MenuOverlay.tsx`
- Fixed sub-menu items not closing menu on click (missing `onClose()`)

### `app/globals.css`
- Replaced invalid `[dangerouslySetInnerHTML]` CSS selectors with `.rich-content p` rule for paragraph spacing

### `utils/richContent.tsx`
- Updated to use `.rich-content` CSS class for paragraph spacing (inline styles removed)

## Previously merged (PR #3)
- `RichContent` utility: double paragraph spacing + auto-link URLs
- `max-h-[80vh]` on hero images (all detail pages)
- `additionalInfo` below date/curator on left column (all CPTs)
- `imageCredits` at bottom of left column (all CPTs)
- KYAF activities: `typeLabel` on left, bold content links
- Fixed `mapActivity` and `mapKyafExhibition` missing `additionalInfo`
- WP data: KYAF exhibitions `additional_info` filled (Medium + Location)
- WP data: Moving image `image_credits` filled
- Master content doc saved to `docs/master-content.txt`
