# Spec: Add "Curated by" to Activity and KYAF Exhibition Detail Pages

## Problem Statement
The curator credit is missing from the left column of Activity detail pages (both /bk and /kyaf) and from the KYAF Exhibition detail page. The `curator_en` / `curator_th` fields exist in WP and are already mapped for exhibitions but not for activities.

## Requirements

### 1. BK Activity Detail Page
- Show `Curated by [name]` in the left column
- Position: below `dateDisplay`, above `additionalInfo`
- Only render if curator value is non-empty

### 2. KYAF Activity Detail Page
- Same as BK: show `Curated by [name]` below `dateDisplay`, above `additionalInfo`
- Only render if curator value is non-empty

### 3. KYAF Exhibition Detail Page
- Show `Curated by [name]` in the left column
- Position: below `additionalInfo` (Medium/Location block), above `imageCredits`
- Only render if curator value is non-empty

### 4. WP Mapper: mapActivity
- Add `curator: { en: m(post, 'curator_en'), th: m(post, 'curator_th') || m(post, 'curator_en') }` to `mapActivity` return object

## Display Format
- Label: `Curated by`
- Same text style as surrounding metadata: `text-xl md:text-2xl font-normal text-black leading-tight`
- Example: `Curated by Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai`

## Acceptance Criteria
- [ ] BK Activity detail left column shows "Curated by [name]" below date
- [ ] KYAF Activity detail left column shows "Curated by [name]" below date
- [ ] KYAF Exhibition detail left column shows "Curated by [name]" below additionalInfo
- [ ] Field hidden when curator is empty
- [ ] `mapActivity` includes `curator` field
- [ ] Build passes with no TypeScript errors

## Implementation Steps
1. Add `curator` to `mapActivity` in `lib/wp-mappers.ts`
2. Add curator line to BK `ActivityDetailPage.tsx` (below dateDisplay)
3. Add curator line to KYAF `ActivityDetailPage.tsx` (below dateDisplay)
4. Add curator line to KYAF `ExhibitionDetailPage.tsx` (below additionalInfo, above imageCredits)
5. Run build to verify
