# Bangkok Kunsthalle - Architecture & Best Practices Guide

## 📚 Table of Contents
1. [Project Structure](#project-structure)
2. [Bilingual/Multilingual Architecture](#bilingual-multilingual-architecture)
3. [Layout System & Spacing](#layout-system--spacing)
4. [Typography System](#typography-system)
5. [Navigation & Routing](#navigation--routing)
6. [Data Management Patterns](#data-management-patterns)
7. [Component Architecture](#component-architecture)
8. [Configuration System](#configuration-system)
9. [Status-First Logic Pattern](#status-first-logic-pattern)
10. [Responsive Design](#responsive-design)
11. [Best Practices Checklist](#best-practices-checklist)

---

## 1. Project Structure

### Directory Organization
```
/
├── App.tsx                          # Main application entry (uses state-based routing)
├── Guidelines.md                    # Project-specific design rules
├── components/
│   ├── layout/                      # Global layout components
│   │   ├── Header.tsx              # Transparent/sticky header
│   │   ├── Footer.tsx              # Site footer
│   │   └── MenuOverlay.tsx         # Full-screen animated menu
│   ├── pages/                       # Page components
│   │   ├── HomePage.tsx
│   │   ├── ExhibitionsPage.tsx     # Listing pages
│   │   ├── ExhibitionDetailPage.tsx # Detail pages
│   │   └── sections/               # Page-specific sections
│   ├── ui/                          # Reusable UI components (ShadCN)
│   │   ├── carousel.tsx
│   │   ├── button.tsx
│   │   └── ...
│   └── search/                      # Search functionality
│       ├── ExpandingSearch.tsx
│       └── SearchDialog.tsx
├── utils/
│   ├── languageContext.tsx          # Language state management
│   ├── translations.ts              # UI translation strings
│   ├── siteConfig.ts               # Feature toggles & settings
│   ├── exhibitionsDataNew.ts       # Content data (bilingual)
│   ├── exhibitionHelpers.ts        # Business logic (filtering)
│   ├── types.ts                    # TypeScript interfaces
│   └── assets.ts                   # Asset paths
├── styles/
│   └── globals.css                  # Design system tokens & base styles
└── imports/                         # CSV data, SVGs, images
```

### Key Principles
- **Separation of Concerns**: Pages, layouts, UI components are clearly separated
- **Utils for Logic**: Business logic lives in `/utils`, not in components
- **Centralized Configuration**: All toggles and settings in `siteConfig.ts`
- **Type Safety**: TypeScript interfaces in dedicated `types.ts` file

---

## 2. Bilingual/Multilingual Architecture

### Language Context System
**File**: `/utils/languageContext.tsx`

```tsx
// Provider wraps entire app
<LanguageProvider>
  <App />
</LanguageProvider>

// Any component can access language
const { language, setLanguage, t } = useLanguage();
```

### Translation Layers

#### Layer 1: UI Translations (Static)
**File**: `/utils/translations.ts`
- Navigation labels
- Button text
- Common UI elements
- Search placeholders

```tsx
// Usage in components
{t('nav.exhibitions')}  // "Exhibitions" or "นิทรรศการ"
{t('common.readMore')}  // "Read More" or "อ่านเพิ่มเติม"
```

#### Layer 2: Content Data (Dynamic)
**File**: `/utils/exhibitionsDataNew.ts` (and similar data files)
- All content objects have both languages

```tsx
export interface Exhibition {
  title: {
    en: string;
    th: string;
  };
  artist: {
    en: string;
    th: string;
  };
  // ...
}
```

#### Layer 3: Helper Functions
Convert bilingual data to display format:

```tsx
export function exhibitionToWPPost(
  exhibition: Exhibition, 
  language: 'en' | 'th'
): WPPost {
  return {
    title: exhibition.title[language],
    artist: exhibition.artist[language],
    // ...
  };
}
```

### Date Formatting
- **English**: "10 March 2026" (using ` - ` with spaces, NOT en-dash)
- **Thai**: "10 มีนาคม 2569" (Buddhist Era = CE year + 543)
- Centralized in `formatDateDisplay()` function

### Thai Typography
**Special Rule**: Thai text requires 30% more line-height

```tsx
// In components:
className={language === 'th' ? 'leading-[1.82em]' : 'leading-normal'}

// Or use utility class:
className="thai-text"
```

**File**: `/styles/globals.css`
```css
.thai-text {
  line-height: 1.82em;
}
```

---

## 3. Layout System & Spacing

### Percentage-Based Margins
**Never use fixed px for outer margins**

```tsx
// ✅ CORRECT
<div className="px-[5%]">

// ❌ WRONG
<div className="px-12">
```

### Hero Section Spacing
**Rule**: Headers are NEVER overlays; content must push below header

```tsx
// Hero sections always use top margin to clear fixed header
<section className="mt-20 md:mt-24">
  {/* Content */}
</section>
```

- Mobile: `mt-20` (80px)
- Desktop: `md:mt-24` (96px)

### Content Width Pattern
**Right Content Rule**: Detail pages use 50% right column

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Left: Image/Carousel */}
  <div>...</div>
  
  {/* Right: Content - Always 50% on desktop */}
  <div className="w-full md:w-1/2">
    {/* Title, artist, date, description */}
  </div>
</div>
```

---

## 4. Typography System

### The 5-4 Rule
**5 Font Sizes, 4 Font Weights**

**File**: `/styles/globals.css`
```css
--font-size-sm: 0.875rem;    /* 14px - Size 1 */
--font-size-base: 1rem;       /* 16px - Size 2 */
--font-size-lg: 1.25rem;      /* 20px - Size 3 */
--font-size-xl: 1.75rem;      /* 28px - Size 4 */
--font-size-2xl: 2.25rem;     /* 36px - Size 5 */

--font-weight-light: 300;     /* Weight 1 */
--font-weight-normal: 400;    /* Weight 2 */
--font-weight-medium: 500;    /* Weight 3 */
--font-weight-bold: 700;      /* Weight 4 */
```

### Guidelines Implementation
**File**: `/Guidelines.md`
```md
## font consistent ##
- make font size consistent for entire website, 
  adjust to 5 font sizes, font's weight to 4 weight
```

### Tailwind Class Restriction
**NEVER use Tailwind font classes** (except for specific exceptions)

```tsx
// ❌ AVOID
<h1 className="text-2xl font-bold">

// ✅ USE CSS variables instead
<h1>Title</h1>  // Inherits from globals.css h1 styling
```

**Exception**: Moving Image detail pages can use `text-2xl` for statement content

---

## 5. Navigation & Routing

### State-Based Routing
**Not using React Router** - Uses simple state management

**File**: `/App.tsx`
```tsx
const [currentPage, setCurrentPage] = useState<Page>('home');
const [selectedSlug, setSelectedSlug] = useState<string | undefined>();
const [backPage, setBackPage] = useState<Page | undefined>();

const handleNavigate = (page: string, slug?: string, sectionId?: string) => {
  // Handle detail page navigation
  // Set back page for breadcrumbs
  // Scroll to sections if sectionId provided
};
```

### Navigation Pattern
```tsx
// Listing → Detail
onNavigate('exhibition-detail', 'exhibition-slug')

// Section navigation (no scroll to top)
onNavigate('shop', undefined, 'bookings')

// Simple page navigation
onNavigate('about')
```

### Transparent Header Pattern
```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Header changes from transparent → solid on scroll
<Header 
  isTransparent={!scrolled}
  isScrolled={scrolled}
/>
```

### Menu Overlay Pattern
**Full-screen animated menu with:**
- Left side: Background image (hidden on mobile)
- Right side: Navigation links
- Motion animations with stagger effect
- Language switcher in footer

```tsx
<MenuOverlay 
  isOpen={isMenuOpen}
  onClose={() => setIsMenuOpen(false)}
  onNavigate={handleNavigate}
  activePage={currentPage}
/>
```

---

## 6. Data Management Patterns

### Status-First Logic
**Critical Pattern**: Always check explicit `status` field BEFORE calculating from dates

**File**: `/utils/exhibitionHelpers.ts`
```tsx
export function getCurrentExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  return exhibitions.filter(exhibition => {
    // Priority 1: Check explicit status tag
    if (exhibition.status === 'current') return true;
    if (exhibition.status === 'upcoming' || exhibition.status === 'past') return false;
    
    // Priority 2: Fall back to date calculation if status doesn't match
    const startDate = new Date(exhibition.fromDate);
    const endDate = new Date(exhibition.toDate);
    return today >= startDate && today <= endDate;
  });
}
```

**Why?**: Allows manual override of date-based logic for special cases

### Data Structure Pattern
```tsx
export interface Exhibition {
  id: string;
  slug: string;                    // URL-safe identifier
  title: { en: string; th: string; };
  artist: { en: string; th: string; };
  fromDate: string;                // ISO format: "2026-03-10"
  toDate: string;                  // Or "Onwards" for ongoing
  status: 'current' | 'upcoming' | 'past';  // Manual override
  featuredImage?: string;
  gallery?: string[];              // Array of image URLs
}
```

### Filtering Helpers Pattern
Create dedicated helper files for each content type:
- `exhibitionHelpers.ts` - Exhibition filtering
- `movingImageHelpers.ts` - Moving image filtering
- `residencyHelpers.ts` - Residency filtering

Benefits:
- Consistent logic across pages
- Easy to test
- Reusable in multiple components

---

## 7. Component Architecture

### Detail Page Template
**All detail pages use identical structure:**

```tsx
export function DetailPage({ slug, onNavigate, backPage }) {
  const { language } = useLanguage();
  const data = getDataBySlug(slug, language);
  
  return (
    <div className="w-full bg-white pb-24 min-h-screen">
      {/* Carousel/Image Section - NO fixed height */}
      <div className="w-full relative group">
        <Carousel>
          {/* Images at natural aspect ratio */}
        </Carousel>
        {/* Dots navigation (not thumbnails) */}
      </div>
      
      {/* Content Section */}
      <div className="px-[5%] py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column often empty */}
          <div></div>
          
          {/* Right column: consolidated format */}
          <div className="w-full">
            <h1>{data.title}</h1>
            <p>{data.artist}</p>
            <p>{data.date}</p>
            {data.curator && <p>Curated by {data.curator}</p>}
            <div className={language === 'th' ? 'leading-[1.82em]' : ''}>
              {data.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Carousel Pattern
**Always use dots, never thumbnails**

```tsx
<Carousel>
  <CarouselContent>
    {images.map((src, index) => (
      <CarouselItem key={index}>
        <img 
          src={src} 
          className="w-full h-auto block"  // No fixed height!
        />
      </CarouselItem>
    ))}
  </CarouselContent>
  
  {/* Dots positioned absolutely */}
  <div className="absolute bottom-8 right-[5%]">
    {images.map((_, index) => (
      <button 
        onClick={() => scrollTo(index)}
        className={`w-2 h-2 rounded-full ${
          current === index ? 'bg-white' : 'bg-white/50'
        }`}
      />
    ))}
  </div>
</Carousel>
```

### Listing Page Pattern
```tsx
export function ListingPage({ targetSectionId, onNavigate }) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('current');
  
  // Get filtered data
  const currentItems = getCurrentItems(language);
  const upcomingItems = getUpcomingItems(language);
  const pastItems = getPastItems(language);
  
  // Scroll to section if targetSectionId provided
  useEffect(() => {
    if (targetSectionId === 'current-items') {
      setActiveTab('current');
      scrollToSection('current-items');
    }
  }, [targetSectionId]);
  
  return (
    <div className="mt-20 md:mt-24 min-h-screen">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Grid of items */}
      </Tabs>
    </div>
  );
}
```

---

## 8. Configuration System

### Centralized Feature Toggles
**File**: `/utils/siteConfig.ts`

```tsx
export const siteConfig = {
  // Menu visibility
  menu: {
    home: true,
    exhibitions: true,
    movingImage: true,
    search: true,
    languageSwitcher: true,
  },
  
  // Section visibility (affects submenus AND listing pages)
  visibility: {
    exhibitions: {
      upcoming: true,
      current: true,
      past: true,
    },
    movingImage: {
      upcoming: true,
      current: true,
      past: true,
    },
    shop: {
      bookings: true,
      products: true,
    },
  },
  
  // Editable messages
  emptyStates: {
    comingSoon: {
      th: 'เร็วๆ นี้',
      en: 'Coming Soon'
    },
  }
};
```

### Usage in Components
```tsx
// Conditionally render menu items
{siteConfig.menu.exhibitions && (
  <MenuItem>{t('nav.exhibitions')}</MenuItem>
)}

// Show/hide sections
{siteConfig.visibility.exhibitions.upcoming && (
  <TabsContent value="upcoming">
    {upcomingExhibitions.map(...)}
  </TabsContent>
)}

// Empty states
{items.length === 0 && (
  <p>{getEmptyStateMessage('comingSoon', language)}</p>
)}
```

**Benefits:**
- Non-technical users can toggle features
- Single source of truth
- Consistent behavior across site

---

## 9. Status-First Logic Pattern

### The Problem
Date-based filtering alone is fragile:
- Edge cases (timezone issues)
- Need to manually control what shows where
- Want to feature upcoming events early

### The Solution
**Always check explicit status FIRST, dates SECOND**

```tsx
// ✅ CORRECT: Status-first logic
function getCurrentItems() {
  return items.filter(item => {
    // Priority 1: Explicit status
    if (item.status === 'current') return true;
    if (item.status === 'upcoming' || item.status === 'past') return false;
    
    // Priority 2: Fallback to date logic
    const now = new Date();
    return item.startDate <= now && item.endDate >= now;
  });
}

// ❌ WRONG: Date-only logic
function getCurrentItems() {
  return items.filter(item => {
    const now = new Date();
    return item.startDate <= now && item.endDate >= now;
  });
}
```

### Benefits
1. **Manual Override**: Can force an item to show in specific section
2. **Early Promotion**: Show "upcoming" item in "current" for special cases
3. **Archive Control**: Keep item visible even after end date
4. **Testing**: Easy to test with hardcoded statuses

### Implementation Across Content Types
Apply this pattern to:
- ✅ Exhibitions (exhibitionHelpers.ts)
- ✅ Moving Image Programs (movingImageHelpers.ts)
- ✅ Activities (activityHelpers.ts)
- ✅ Residencies (residencyHelpers.ts)

---

## 10. Responsive Design

### Mobile-First Patterns

#### Spacing
```tsx
// Padding scales with viewport
px-[5%]              // 5% padding always

// Different top margins for mobile/desktop
mt-20 md:mt-24       // Hero sections
py-12 md:py-24       // Section padding
```

#### Grid Layouts
```tsx
// Stack on mobile, 2 columns on desktop
grid grid-cols-1 md:grid-cols-2

// 2 columns mobile, 3 desktop, 4 wide screens
grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```

#### Text Scaling
```tsx
// Responsive text (use sparingly per guidelines)
text-xl md:text-2xl lg:text-3xl
```

#### Hide/Show by Breakpoint
```tsx
// Hide on mobile
hidden md:block

// Show only on mobile
md:hidden

// Menu overlay left image
hidden md:block w-1/2
```

### Aspect Ratios
Use ShadCN's AspectRatio component:
```tsx
<AspectRatio ratio={16/9}>
  <img src={...} className="object-cover" />
</AspectRatio>
```

---

## 11. Best Practices Checklist

### Before Starting a Similar Project

#### ✅ Structure
- [ ] Set up `/components/layout`, `/components/pages`, `/components/ui` structure
- [ ] Create `/utils` for business logic, types, configs
- [ ] Separate data files from component files

#### ✅ Multilingual Setup
- [ ] Create language context provider
- [ ] Build translation system (UI vs. content layers)
- [ ] Ensure all data structures support multiple languages
- [ ] Add date formatting helpers for each language
- [ ] Implement Thai text line-height adjustment (if applicable)

#### ✅ Design System
- [ ] Define typography system in `globals.css` (limit font sizes/weights)
- [ ] Use CSS variables instead of Tailwind classes
- [ ] Set up percentage-based spacing system
- [ ] Create design guidelines document

#### ✅ Navigation
- [ ] Decide: State-based routing vs. React Router
- [ ] Implement transparent header pattern
- [ ] Create full-screen menu overlay
- [ ] Add language switcher

#### ✅ Content Management
- [ ] Define content types (Exhibition, Activity, etc.)
- [ ] Create TypeScript interfaces
- [ ] Implement status-first filtering logic
- [ ] Build helper functions for each content type
- [ ] Set up CSV import workflow (if needed)

#### ✅ Configuration
- [ ] Create centralized `siteConfig.ts`
- [ ] Add feature toggles for menu items
- [ ] Add visibility controls for sections
- [ ] Create editable empty state messages

#### ✅ Detail Pages
- [ ] Create reusable detail page template
- [ ] Use dots (not thumbnails) for carousels
- [ ] Implement dynamic image height (not fixed)
- [ ] Use 50% right column for content
- [ ] Add consolidated metadata format

#### ✅ Listing Pages
- [ ] Implement tab-based filtering
- [ ] Add section scroll functionality
- [ ] Show empty states when no content
- [ ] Use language-aware filtering

### Code Quality Checks

```tsx
// ✅ Good patterns
- const { language, t } = useLanguage();
- const items = getItems(language);
- className={language === 'th' ? 'leading-[1.82em]' : ''}
- onClick={() => onNavigate('page', slug)}
- if (item.status === 'current') return true;

// ❌ Avoid
- Hard-coded text strings
- Fixed px margins for layout
- Date-only filtering (no status check)
- Tailwind text-* and font-* classes
- Fixed height carousels
- Thumbnail carousels on detail pages
```

---

## 📝 Summary

This architecture provides:

1. **Scalability**: Easy to add new languages, pages, content types
2. **Maintainability**: Clear separation of concerns, centralized config
3. **Flexibility**: Feature toggles, status-first logic allow manual control
4. **Consistency**: Design system enforced via CSS variables & guidelines
5. **Type Safety**: TypeScript interfaces ensure data integrity
6. **Performance**: Optimized image loading, efficient filtering
7. **Accessibility**: Semantic HTML, keyboard navigation, screen reader support

### Key Innovations
- **Status-First Logic**: Manual override of date-based filtering
- **Bilingual Data Structures**: Every string has `{ en, th }` format
- **Percentage Spacing**: Layout adapts to any screen size
- **Typography System**: Limited to 5 sizes, 4 weights for consistency
- **Centralized Config**: Non-technical users can toggle features

### Apply to Your Next Project
This architecture is ideal for:
- Art galleries and museums
- Cultural institutions
- Event venues
- Exhibition spaces
- Portfolio websites
- Any content-heavy, multilingual site

Clone this pattern and customize the content types, styling, and features to match your specific needs!
