# Detail Page Carousel Implementation Guide

## Overview
This document explains the current carousel/slider implementation used across all detail pages (Exhibition, Moving Image, Artist, Activity, Residency) in the Bangkok Kunsthalle website.

---

## Current Carousel System

### Technology Stack
- **Component Library**: ShadCN Carousel component (`/components/ui/carousel.tsx`)
- **Underlying Library**: Embla Carousel (via ShadCN wrapper)
- **Auto-play Plugin**: `embla-carousel-autoplay`

### Navigation Types

The carousel currently uses **TWO navigation methods simultaneously**:

#### 1. **Arrow Buttons (Hover-Activated)**
- **Location**: Overlaid on left and right sides of carousel
- **Visibility**: Hidden by default, appears on hover (`opacity-0 group-hover:opacity-100`)
- **Components**: `<CarouselPrevious>` and `<CarouselNext>`
- **Styling**: 
  - Size: `h-12 w-12` (48px × 48px)
  - Background: Semi-transparent black (`bg-black/30` → `hover:bg-black/50`)
  - No border (`border-none`)
  - White icon color (`text-white`)
- **Behavior**: Only shown when there are multiple images (`galleryImages.length > 1`)

```tsx
{galleryImages.length > 1 && (
  <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
    <CarouselPrevious className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
    <CarouselNext className="pointer-events-auto static transform-none h-12 w-12 bg-black/30 hover:bg-black/50 border-none text-white" />
  </div>
)}
```

#### 2. **Dot Navigation (Always Visible)**
- **Location**: Bottom-right corner of carousel (`bottom-8 right-6 md:right-[5%]`)
- **Type**: Small circular dots representing each image
- **Behavior**: 
  - Click any dot to jump directly to that image
  - Active dot is larger and fully opaque
  - Inactive dots are semi-transparent
- **Styling**:
  - Size: `w-2 h-2` (8px × 8px)
  - Shape: `rounded-full`
  - Active state: `bg-white scale-125` (white, 125% larger)
  - Inactive state: `bg-white/50` (50% opacity white)
  - Hover state: `hover:bg-white/75` (75% opacity)
- **Behavior**: Only shown when there are multiple images

```tsx
{galleryImages.length > 1 && (
  <div className="absolute bottom-8 right-6 md:right-[5%] z-20 flex gap-2">
    {galleryImages.map((_, index) => (
      <button
        key={index}
        onClick={() => scrollTo(index)}
        className={`w-2 h-2 rounded-full transition-all duration-300 ${
          current === index 
            ? 'bg-white scale-125' 
            : 'bg-white/50 hover:bg-white/75'
        }`}
        aria-label={`Go to image ${index + 1}`}
      />
    ))}
  </div>
)}
```

---

## State Management

### Carousel API State
```tsx
const [api, setApi] = useState<CarouselApi>()
const [current, setCurrent] = useState(0)
```

- **`api`**: Reference to Embla Carousel API for programmatic control
- **`current`**: Index of currently displayed image (0-based)

### Tracking Current Slide
```tsx
useEffect(() => {
  if (!api) return
  setCurrent(api.selectedScrollSnap())
  api.on("select", () => setCurrent(api.selectedScrollSnap()))
}, [api])
```

- Listens to Embla's `select` event to update current slide index
- Updates `current` state whenever user navigates (via arrows, dots, or swipe)

### Programmatic Navigation
```tsx
const scrollTo = (index: number) => api?.scrollTo(index);
```

- Used by dot navigation to jump to specific slides
- Called when user clicks any dot

---

## Auto-play Configuration

### Plugin Setup
```tsx
const plugin = useRef(
  Autoplay({ delay: 4000, stopOnInteraction: true })
)
```

- **Delay**: 4 seconds between slides
- **Stop on Interaction**: Pauses auto-play when user interacts (click, hover, drag)

### Carousel Options
```tsx
<Carousel
  setApi={setApi}
  plugins={[plugin.current]}
  className="w-full bg-black"
  opts={{ align: "start", loop: true }}
>
```

- **Loop**: Infinite scrolling (first → last → first)
- **Align**: Slides align to start of viewport

---

## Image Rendering

### Gallery Source Priority
```tsx
const baseGallery = postData.gallery && postData.gallery.length > 0 
  ? postData.gallery 
  : (postData.featuredImage ? [postData.featuredImage.sourceUrl] : []);
```

1. **Primary**: Use `postData.gallery` array (multiple images)
2. **Fallback**: Use `postData.featuredImage` (single image)
3. **Empty**: Show "No images available" message

### Image Loading Strategy
```tsx
<img
  src={src}
  alt={`${postData.title} Gallery ${index + 1}`}
  className="w-full h-auto block"
  loading={index === 0 ? "eager" : "lazy"}
  onError={(e) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  }}
/>
```

- **First image**: Eager loading (immediate)
- **Other images**: Lazy loading (load on demand)
- **Error handling**: Hide broken images instead of showing broken icon

---

## Conditional Rendering Logic

### Single Image vs Multiple Images

**Single Image**:
- ✅ Carousel still renders (for consistency)
- ❌ No arrow buttons shown
- ❌ No dot navigation shown

**Multiple Images**:
- ✅ Carousel with all images
- ✅ Arrow buttons (on hover)
- ✅ Dot navigation (always visible)

```tsx
{galleryImages.length > 1 && (
  // Navigation elements only render if > 1 image
)}
```

---

## Positioning & Layout

### Hero Section Structure
```
┌─────────────────────────────────────────┐
│  Carousel Container (w-full, bg-black)  │
│  ┌────────────────────────────────────┐ │
│  │  [<]  Image Content       [>]      │ │ ← Arrows (hover)
│  │                                    │ │
│  │                           ● ○ ○ ○  │ │ ← Dots (bottom-right)
│  │  [Back Button]                     │ │ ← Back button (bottom-left)
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Z-Index Hierarchy
- Carousel content: `z-0` (base layer)
- Dot navigation: `z-20` (above carousel)
- Back button: `z-20` (same level as dots, different corner)
- Navigation arrows: No explicit z-index (rendered in overlay div)

---

## User Interactions

### Available Navigation Methods
1. **Click Arrows**: Previous/Next buttons (desktop hover required)
2. **Click Dots**: Jump to specific image directly
3. **Keyboard**: Left/Right arrow keys (Embla default)
4. **Touch/Swipe**: Drag gesture on mobile (Embla default)
5. **Auto-play**: Automatic progression every 4 seconds

### Hover States
- **Arrows**: Fade in from transparent to visible
- **Arrow Buttons**: Darken background on hover
- **Dots**: Increase opacity on hover

---

## Accessibility

### ARIA Labels
```tsx
aria-label={`Go to image ${index + 1}`}
```

- Each dot button has descriptive label for screen readers

### Keyboard Navigation
- Embla Carousel provides native keyboard support
- Left/Right arrows navigate slides
- Tab key focuses interactive elements (arrows, dots)

---

## Differences from Previous Implementation

### Moving Image Detail Page
- **Old**: Used `react-slick` with Slick Carousel
- **New**: Uses ShadCN Carousel (Embla) with dots
- **Change Date**: Recent update per MOVING_IMAGE_HERO_SETUP.md

### Exhibition Detail Page
- Always used ShadCN Carousel with **BOTH** arrows and dots
- No changes needed - this is the reference implementation

---

## Design System Alignment

### Swiss Minimalist Principles
- ✅ Clean dot indicators (no ornate design)
- ✅ Simple geometric shapes (circles)
- ✅ Monochrome color scheme (white/black)
- ✅ Hidden navigation unless needed (arrows on hover)
- ✅ Consistent spacing and proportions

### Responsive Behavior
- **Mobile**: 
  - Dots at `right-6` (24px from right edge)
  - Touch/swipe primary interaction
  - Arrows still available on tap/hold
- **Desktop**: 
  - Dots at `right-[5%]` (5% viewport width from right)
  - Hover reveals arrows
  - All navigation methods available

---

## Future Considerations

### Potential Migration Path (If Needed)
If the decision is made to use **dots-only navigation** across all pages:

1. **Remove**: Arrow button div (lines 117-120 in ExhibitionDetailPage.tsx)
2. **Keep**: Dot navigation system (lines 132-147)
3. **Result**: Cleaner mobile experience, consistent with minimalist design
4. **Benefit**: Less UI clutter, simpler interaction model

### Alternative: Arrows-Only Navigation
Currently **NOT used** on any detail pages, but could be implemented by:
1. **Remove**: Dot navigation section
2. **Keep**: Arrow buttons
3. **Make permanent**: Remove hover-only visibility

**Note**: Current implementation (arrows + dots) provides maximum flexibility for users.

---

## Related Files

- `/components/pages/ExhibitionDetailPage.tsx` - Reference implementation
- `/components/pages/MovingImageDetailPage.tsx` - Recently updated to match
- `/components/pages/ArtistDetailPage.tsx` - Uses same pattern
- `/components/pages/ActivityDetailPage.tsx` - Uses same pattern
- `/components/ui/carousel.tsx` - ShadCN Carousel component
- `/DETAIL_CONTENT_ARCHITECTURE.md` - Overall detail page structure guide

---

**Last Updated**: March 17, 2026  
**Author**: Bangkok Kunsthalle Development Team
