# Data Architecture: Detail Pages & Listing Pages

## 🎯 Overview
This document explains the complete data architecture pattern for managing **listing pages** (galleries, grids, archives) and **detail pages** (individual items) in a content-driven website. Based on the Bangkok Kunsthalle project, this pattern ensures consistency, scalability, and bilingual support.

---

## 📚 Table of Contents
1. [Core Concepts](#core-concepts)
2. [Data Structure Layers](#data-structure-layers)
3. [The Listing Page Architecture](#the-listing-page-architecture)
4. [The Detail Page Architecture](#the-detail-page-architecture)
5. [The Connection: Slug-Based Routing](#the-connection-slug-based-routing)
6. [Status-First Filtering Pattern](#status-first-filtering-pattern)
7. [Bilingual Data Pattern](#bilingual-data-pattern)
8. [Helper Functions Architecture](#helper-functions-architecture)
9. [Component Patterns](#component-patterns)
10. [Complete Implementation Example](#complete-implementation-example)
11. [Reusable Templates](#reusable-templates)

---

## 1. Core Concepts

### The Two-Page Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT ECOSYSTEM                        │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
    ┌──────────────────┐           ┌──────────────────┐
    │  LISTING PAGE    │           │  DETAIL PAGE     │
    │  (Many items)    │──slug───► │  (One item)      │
    │                  │           │                  │
    │  • Filter items  │           │  • Full content  │
    │  • Grid/list     │           │  • Gallery       │
    │  • Tabs/sections │           │  • Metadata      │
    │  • Preview cards │           │  • Description   │
    └──────────────────┘           └──────────────────┘
```

### Key Principles

1. **Single Source of Truth**: One data file per content type
2. **Slug-Based Navigation**: Unique identifier connects listing → detail
3. **Status-First Filtering**: Explicit status overrides date calculation
4. **Bilingual by Design**: Every string has `{ en, th }` structure
5. **Helper Functions**: Business logic separated from components
6. **Type Safety**: TypeScript interfaces ensure data integrity

---

## 2. Data Structure Layers

### Layer 1: Core Data Interface

```tsx
// /utils/exhibitionsDataNew.ts

export interface Exhibition {
  // Identifiers
  id: string;                    // Unique ID: "1", "2", "3"
  slug: string;                  // URL-safe: "nine-plus-five-works"
  
  // Bilingual Content
  title: {
    en: string;                  // "Nine Plus Five Works"
    th: string;                  // "เก้าบวกห้างาน"
  };
  artist: {
    en: string;                  // "Michel Auder"
    th: string;                  // "มิเชล โอเดอร์"
  };
  curator: {
    en: string;                  // "Gridthiya Gaweewong"
    th: string;                  // "กฤติยา กาวีวงศ์"
  };
  
  // Dates (ISO format for calculations)
  fromDate: string;              // "2024-12-07"
  toDate: string;                // "2025-05-31" or "Onwards"
  
  // Formatted dates (display)
  dateDisplay: {
    en: string;                  // "7 December 2024 - 31 May 2025"
    th: string;                  // "7 ธันวาคม 2567 - 31 พฤษภาคม 2568"
  };
  
  // Status & Classification
  status: 'current' | 'upcoming' | 'past';  // Manual override
  year: string;                  // "2024"
  tags?: string;                 // "painting, video art"
  
  // Media
  featuredImage?: string;        // First image URL
  gallery?: string[];            // Array of all images
  imageCredits: string;          // Photo credits
}
```

### Layer 2: Display Data Interface (WPPost)

```tsx
// /utils/types.ts

export interface WPPost {
  // Core identifiers
  id: string;
  slug: string;
  type: 'activity' | 'exhibition' | 'post';
  
  // Display content (already in selected language)
  title: string;                 // "Nine Plus Five Works" (not bilingual object)
  content: string;               // Full HTML content
  date: string;                  // Formatted date string
  
  // Categories & taxonomy
  categories?: string[];
  
  // Media
  featuredImage?: {
    sourceUrl: string;
    altText: string;
  };
  gallery?: string[];            // Image URLs
  
  // Additional metadata (flexible)
  acf?: {
    artist?: string;
    subtitle?: string;
    location?: string;
    schedule?: Array<{
      title: string;
      details: string;
    }>;
    additionalContent?: string;
    [key: string]: any;
  };
}
```

### Layer 3: Detail Content (Separate Storage)

```tsx
// /utils/detailContent.ts

export interface DetailContent {
  slug: string;                  // Matches Exhibition.slug
  category: 'Exhibition' | 'Moving Image Program' | 'Residency';
  content: string;               // Full HTML description
}

export const DETAIL_CONTENT: DetailContent[] = [
  {
    slug: 'nine-plus-five-works',
    category: 'Exhibition',
    content: `<p>Full exhibition description...</p>`
  },
  // ...
];

// Bilingual detail content
export const DETAIL_CONTENT_THAI: DetailContent[] = [
  {
    slug: 'nine-plus-five-works',
    category: 'Exhibition',
    content: `<p>คำอธิบายนิทรรศการฉบับเต็ม...</p>`
  },
  // ...
];
```

---

## 3. The Listing Page Architecture

### Data Flow: Raw Data → Filtered Lists → Display

```
┌─────────────────────────────────────────────────────────────┐
│  1. RAW DATA                                                │
│  exhibitions = [ ex1, ex2, ex3, ..., ex16 ]                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  2. STATUS-FIRST FILTERING                                  │
│  • Check explicit status field first                        │
│  • Fall back to date calculation                            │
│  • Sort by date (newest first)                              │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ Current │    │ Upcoming│    │  Past   │
    │ [ex1]   │    │ [ex2]   │    │ [ex3..] │
    └────┬────┘    └────┬────┘    └────┬────┘
         │              │              │
         └──────────────┼──────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│  3. TAB-BASED DISPLAY                                       │
│  • Three tabs: Current | Upcoming | Past                    │
│  • Each shows filtered items                                │
│  • Click card → navigate to detail page with slug           │
└─────────────────────────────────────────────────────────────┘
```

### Listing Page Component Structure

```tsx
// /components/pages/ExhibitionsPage.tsx

export function ExhibitionsPage({ onNavigate, targetSectionId }: Props) {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('current-exhibitions');
  
  // Reference date (can be dynamic or fixed)
  const today = new Date(2026, 2, 10);  // March 10, 2026
  
  // ═══════════════════════════════════════════════════════════
  // FILTERING: Status-First Pattern
  // ═══════════════════════════════════════════════════════════
  
  const currentExhibitions = exhibitions
    .filter(ex => {
      // Priority 1: Explicit status
      if (ex.status === 'current') return true;
      if (ex.status === 'upcoming' || ex.status === 'past') return false;
      
      // Priority 2: Date calculation
      const start = new Date(ex.fromDate);
      const end = ex.toDate === 'Onwards' 
        ? new Date(9999, 11, 31) 
        : new Date(ex.toDate);
      return today >= start && today <= end;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime());
  
  const upcomingExhibitions = exhibitions
    .filter(ex => {
      if (ex.status === 'upcoming') return true;
      if (ex.status === 'current' || ex.status === 'past') return false;
      
      const start = new Date(ex.fromDate);
      return today < start;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime());
  
  const pastExhibitions = exhibitions
    .filter(ex => {
      if (ex.status === 'past') return true;
      if (ex.status === 'current' || ex.status === 'upcoming') return false;
      
      if (ex.toDate === 'Onwards') return false;
      const end = new Date(ex.toDate);
      return today > end;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime());
  
  // ═══════════════════════════════════════════════════════════
  // RENDER: Tab-based layout with cards
  // ═══════════════════════════════════════════════════════════
  
  return (
    <div className="mt-20 md:mt-24 min-h-screen px-[5%]">
      {/* Navigation tabs */}
      <div className="flex gap-8 border-b sticky top-20 bg-white z-10">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              scrollToSection(section.id);
            }}
            className={activeSection === section.id ? 'border-b-2 border-black' : ''}
          >
            {section.label} ({section.count})
          </button>
        ))}
      </div>
      
      {/* Current Exhibitions */}
      <section id="current-exhibitions" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentExhibitions.map(ex => (
            <ExhibitionCard
              key={ex.slug}
              exhibition={ex}
              language={language}
              onClick={() => onNavigate('exhibition-detail', ex.slug)}
            />
          ))}
        </div>
      </section>
      
      {/* Upcoming & Past sections similar... */}
    </div>
  );
}
```

### Card Component Pattern

```tsx
// Reusable card for listing pages

interface ExhibitionCardProps {
  exhibition: Exhibition;
  language: 'en' | 'th';
  onClick: () => void;
}

function ExhibitionCard({ exhibition, language, onClick }: ExhibitionCardProps) {
  return (
    <div onClick={onClick} className="cursor-pointer group">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={exhibition.featuredImage || exhibition.gallery?.[0]} 
          alt={exhibition.title[language]}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      
      {/* Meta */}
      <div className="mt-4 flex flex-col gap-0">
        <h3>{exhibition.title[language]}</h3>
        <p>{exhibition.artist[language]}</p>
        <p className="text-gray-600">{exhibition.dateDisplay[language]}</p>
      </div>
    </div>
  );
}
```

---

## 4. The Detail Page Architecture

### Data Flow: Slug → Find Item → Render Full Content

```
┌─────────────────────────────────────────────────────────────┐
│  USER CLICKS CARD                                           │
│  onNavigate('exhibition-detail', 'nine-plus-five-works')    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  DETAIL PAGE RECEIVES SLUG                                  │
│  slug = "nine-plus-five-works"                              │
│  language = "en" (from context)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌──────────────────┐           ┌──────────────────┐
│  FIND IN DATA    │           │  GET DETAIL      │
│  exhibitions     │           │  CONTENT         │
│  .find(slug)     │           │  by slug         │
└────────┬─────────┘           └────────┬─────────┘
         │                               │
         └───────────────┬───────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  CONVERT TO DISPLAY FORMAT                                  │
│  exhibitionToWPPost(exhibition, language)                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  RENDER DETAIL PAGE                                         │
│  • Carousel with gallery images                             │
│  • Title, artist, date, curator                             │
│  • Full description (HTML)                                  │
│  • Back button to listing                                   │
└─────────────────────────────────────────────────────────────┘
```

### Detail Page Component Structure

```tsx
// /components/pages/ExhibitionDetailPage.tsx

interface ExhibitionDetailPageProps {
  onNavigate: (page: string) => void;
  slug?: string;
  backPage?: string;  // Where to go back (exhibitions, archives, etc.)
}

export function ExhibitionDetailPage({ onNavigate, slug, backPage }: Props) {
  const { language, t } = useLanguage();
  const [postData, setPostData] = useState<WPPost | undefined>();
  const [detailContent, setDetailContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  // ═══════════════════════════════════════════════════════════
  // DATA FETCHING: Find by slug
  // ═══════════════════════════════════════════════════════════
  
  useEffect(() => {
    if (!slug) return;
    
    // 1. Find exhibition by slug
    const exhibition = exhibitions.find(e => e.slug === slug);
    if (!exhibition) {
      setLoading(false);
      return;
    }
    
    // 2. Convert to display format (WPPost) with language
    const displayData = exhibitionToWPPost(exhibition, language);
    setPostData(displayData);
    
    // 3. Get full detail content in current language
    const content = getDetailContentByLanguage(slug, language) || '';
    setDetailContent(content);
    
    setLoading(false);
  }, [slug, language]);
  
  // ═══════════════════════════════════════════════════════════
  // CAROUSEL LOGIC
  // ═══════════════════════════════════════════════════════════
  
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);
  
  const scrollTo = (index: number) => api?.scrollTo(index);
  
  if (loading) return <LoadingState />;
  if (!postData) return <NotFoundState />;
  
  const galleryImages = postData.gallery && postData.gallery.length > 0
    ? postData.gallery
    : (postData.featuredImage ? [postData.featuredImage.sourceUrl] : []);
  
  // ═══════════════════════════════════════════════════════════
  // RENDER: Standard detail page template
  // ═══════════════════════════════════════════════════════════
  
  return (
    <div className="w-full bg-white pb-24 min-h-screen">
      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 1: Carousel (No fixed height!)                */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="w-full relative group">
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {galleryImages.map((src, index) => (
              <CarouselItem key={index}>
                {/* ✅ h-auto for dynamic height */}
                <img 
                  src={src} 
                  alt={`${postData.title} ${index + 1}`}
                  className="w-full h-auto block"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Hover arrows */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        
        {/* ✅ Dots navigation (not thumbnails) */}
        {galleryImages.length > 1 && (
          <div className="absolute bottom-8 right-[5%] flex gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === index ? 'bg-white scale-125' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Back button */}
        <div className="absolute bottom-8 left-[5%]">
          <button 
            onClick={() => onNavigate(backPage || 'exhibitions')}
            className="flex items-center gap-2 text-white"
          >
            <ArrowLeft /> {t('common.back')}
          </button>
        </div>
      </div>
      
      {/* ────────────────────────────────────────────────────── */}
      {/* SECTION 2: Content (50% right column)                 */}
      {/* ────────────────────────────────────────────────────── */}
      <div className="px-[5%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column: Empty on desktop */}
          <div className="hidden md:block"></div>
          
          {/* Right column: All metadata & content */}
          <div className="w-full">
            {/* Consolidated meta block */}
            <div className="flex flex-col gap-0 leading-tight">
              <h1>{postData.title}</h1>
              <p>{postData.acf?.artist}</p>
              <p className="text-gray-600">{postData.date}</p>
            </div>
            
            {/* Curator section (separate with mt-8) */}
            {postData.acf?.curator && (
              <div className="mt-8 flex flex-col gap-0 leading-tight">
                <p className="text-gray-600">
                  {language === 'th' ? 'ภัณฑารักษ์โดย' : 'Curated by'}
                </p>
                <p>{postData.acf.curator}</p>
              </div>
            )}
            
            {/* Full description */}
            <div 
              className={`mt-8 ${language === 'th' ? 'leading-[1.82em]' : ''}`}
              dangerouslySetInnerHTML={{ __html: detailContent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 5. The Connection: Slug-Based Routing

### What is a Slug?

A **slug** is a URL-safe identifier:
- Unique for each item
- Human-readable
- No spaces or special characters
- Uses hyphens for word separation

```tsx
// Examples:
"Nine Plus Five Works"          → "nine-plus-five-works"
"nostalgia for unity"           → "nostalgia-for-unity"
"MEND PIECE"                    → "mend-piece"
"Like Nouns Slipping Into Verbs" → "like-nouns-slipping-into-verbs"
```

### Navigation Flow

```tsx
// 1. LISTING PAGE: Click triggers navigation
<ExhibitionCard 
  onClick={() => onNavigate('exhibition-detail', 'nine-plus-five-works')}
/>

// 2. APP.TSX: State update
const handleNavigate = (page: string, slug?: string) => {
  setCurrentPage('exhibition-detail');
  setSelectedSlug('nine-plus-five-works');
  setBackPage('exhibitions');  // Remember where we came from
};

// 3. DETAIL PAGE: Receives slug
<ExhibitionDetailPage 
  slug="nine-plus-five-works"
  backPage="exhibitions"
/>

// 4. DETAIL PAGE: Finds data
const exhibition = exhibitions.find(e => e.slug === 'nine-plus-five-works');
```

### Why Slugs (Not IDs)?

```tsx
// ❌ Using numeric IDs
URL: /exhibition/3
// - Not human-readable
// - No SEO value
// - Fragile if IDs change

// ✅ Using slugs
URL: /exhibition/nine-plus-five-works
// - Human-readable
// - SEO-friendly
// - Stable identifier
// - Can be shared/bookmarked
```

---

## 6. Status-First Filtering Pattern

### The Problem

**Date-only filtering is fragile:**
- What if you want to feature an upcoming exhibition early?
- What if an exhibition should stay "current" after end date?
- What about timezone edge cases?
- Manual curation is needed

### The Solution: Status-First Logic

```tsx
// ✅ CORRECT: Check status field FIRST

function getCurrentExhibitions(today: Date) {
  return exhibitions.filter(ex => {
    // ═══════════════════════════════════════════════════════
    // PRIORITY 1: Explicit Status
    // ═══════════════════════════════════════════════════════
    if (ex.status === 'current') return true;
    if (ex.status === 'upcoming' || ex.status === 'past') return false;
    
    // ═══════════════════════════════════════════════════════
    // PRIORITY 2: Fallback to Date Calculation
    // ═══════════════════════════════════════════════════════
    const start = new Date(ex.fromDate);
    const end = ex.toDate === 'Onwards' 
      ? new Date(9999, 11, 31)  // Ongoing = far future
      : new Date(ex.toDate);
    
    return today >= start && today <= end;
  });
}
```

### Data Structure

```tsx
export const exhibitions: Exhibition[] = [
  {
    id: "1",
    slug: "nine-plus-five-works",
    title: { en: "Nine Plus Five Works", th: "..." },
    fromDate: "2024-12-07",
    toDate: "2025-05-31",
    status: 'current',  // ✅ Manual override: show in "current" even if dates say otherwise
  },
  {
    id: "2",
    slug: "nostalgia-for-unity",
    fromDate: "2025-06-01",
    toDate: "2025-10-15",
    status: 'upcoming',  // ✅ Force to "upcoming" even if calculated as "current"
  },
];
```

### Use Cases

1. **Early Promotion**: Show upcoming exhibition in "current" section
2. **Extended Stay**: Keep past exhibition in "current" for archive purposes
3. **Testing**: Override dates for preview without changing actual dates
4. **Special Events**: Manual curation for featured content

---

## 7. Bilingual Data Pattern

### Structure: All Strings as Objects

```tsx
// ✅ CORRECT: Bilingual from the start

interface Exhibition {
  title: {
    en: string;
    th: string;
  };
  artist: {
    en: string;
    th: string;
  };
  dateDisplay: {
    en: string;
    th: string;
  };
}

// ❌ WRONG: Single language requires refactor later

interface Exhibition {
  title: string;
  artist: string;
  dateDisplay: string;
}
```

### Date Formatting Function

```tsx
// Centralized bilingual date formatter

function formatDateDisplay(fromDate: string, toDate: string): { en: string, th: string } {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthsTH = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  
  const from = new Date(fromDate);
  const to = new Date(toDate);
  
  const fromDay = from.getDate();
  const fromMonth = months[from.getMonth()];
  const fromMonthTH = monthsTH[from.getMonth()];
  const fromYear = from.getFullYear();
  const fromYearTH = fromYear + 543;  // Buddhist Era
  
  // Same for 'to' date...
  
  // ✅ Using spaced hyphen ( - ) per guidelines
  return {
    en: `${fromDay} ${fromMonth} ${fromYear} - ${toDay} ${toMonth} ${toYear}`,
    th: `${fromDay} ${fromMonthTH} ${fromYearTH} - ${toDay} ${toMonthTH} ${toYearTH}`
  };
}
```

### Conversion to Display Format

```tsx
// Convert bilingual data to single-language display

export function exhibitionToWPPost(
  exhibition: Exhibition, 
  language: 'en' | 'th'
): WPPost {
  return {
    id: exhibition.id,
    slug: exhibition.slug,
    type: 'exhibition',
    
    // ✅ Extract language-specific strings
    title: exhibition.title[language],
    date: exhibition.dateDisplay[language],
    content: '',
    
    featuredImage: exhibition.featuredImage ? {
      sourceUrl: exhibition.featuredImage,
      altText: exhibition.title[language]
    } : undefined,
    
    gallery: exhibition.gallery,
    
    acf: {
      artist: exhibition.artist[language],
      curator: exhibition.curator[language],
    }
  };
}
```

---

## 8. Helper Functions Architecture

### Pattern: Separate Business Logic

```
/utils/
├── exhibitionsDataNew.ts       # Raw data + Exhibition interface
├── exhibitionHelpers.ts        # Filtering functions
├── detailContent.ts            # Full descriptions (EN)
├── detailContentThaiData.ts    # Full descriptions (TH)
└── types.ts                    # Shared interfaces (WPPost)
```

### Helper File Structure

```tsx
// /utils/exhibitionHelpers.ts

import { WPPost } from './types';
import { exhibitions, exhibitionToWPPost } from './exhibitionsDataNew';

// Reference date (can be made dynamic)
const today = new Date(2026, 2, 10);

// ═══════════════════════════════════════════════════════════════
// PUBLIC API: Export these functions
// ═══════════════════════════════════════════════════════════════

export function getUpcomingExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  return exhibitions
    .filter(ex => {
      // Status-first logic
      if (ex.status === 'upcoming') return true;
      if (ex.status === 'current' || ex.status === 'past') return false;
      
      // Date fallback
      const start = new Date(ex.fromDate);
      return start > today;
    })
    .sort((a, b) => new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime())
    .map(ex => exhibitionToWPPost(ex, language));
}

export function getCurrentExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  // Similar pattern...
}

export function getPastExhibitions(language: 'en' | 'th' = 'en'): WPPost[] {
  // Similar pattern...
}

export function getExhibitionBySlug(slug: string, language: 'en' | 'th' = 'en'): WPPost | undefined {
  const exhibition = exhibitions.find(ex => ex.slug === slug);
  return exhibition ? exhibitionToWPPost(exhibition, language) : undefined;
}
```

### Usage in Components

```tsx
// /components/pages/ExhibitionsPage.tsx

import { getCurrentExhibitions, getUpcomingExhibitions, getPastExhibitions } from '../../utils/exhibitionHelpers';

export function ExhibitionsPage() {
  const { language } = useLanguage();
  
  // ✅ Simple, clean component code
  const currentExhibitions = getCurrentExhibitions(language);
  const upcomingExhibitions = getUpcomingExhibitions(language);
  const pastExhibitions = getPastExhibitions(language);
  
  return (
    <div>
      {/* Render filtered lists */}
    </div>
  );
}
```

**Benefits:**
- ✅ Components stay clean
- ✅ Logic is testable
- ✅ Reusable across pages (ExhibitionsPage, ArchivesPage, HomePage)
- ✅ Easy to update filtering rules in one place

---

## 9. Component Patterns

### Pattern 1: Listing Page Template

```tsx
// Reusable for ANY content type (exhibitions, activities, blog posts)

export function ListingPage<T extends { slug: string }>({
  title,
  sections,
  onNavigate,
  targetSectionId
}: ListingPageProps<T>) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  
  // Scroll to section if targetSectionId provided
  useEffect(() => {
    if (targetSectionId) {
      setActiveSection(targetSectionId);
      scrollToSection(targetSectionId);
    }
  }, [targetSectionId]);
  
  return (
    <div className="mt-20 md:mt-24 min-h-screen px-[5%]">
      {/* Sticky navigation tabs */}
      <nav className="sticky top-20 bg-white border-b z-10">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              scrollToSection(section.id);
            }}
            className={activeSection === section.id ? 'active' : ''}
          >
            {section.label} ({section.items.length})
          </button>
        ))}
      </nav>
      
      {/* Sections */}
      {sections.map(section => (
        <section key={section.id} id={section.id} className="py-16">
          {section.items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map(item => (
                <ItemCard
                  key={item.slug}
                  item={item}
                  onClick={() => onNavigate('detail-page', item.slug)}
                />
              ))}
            </div>
          ) : (
            <EmptyState message={section.emptyMessage} />
          )}
        </section>
      ))}
    </div>
  );
}
```

### Pattern 2: Detail Page Template

```tsx
// Standard structure for ALL detail pages

export function DetailPage({ slug, onNavigate, backPage }: DetailPageProps) {
  const { language } = useLanguage();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch data by slug
  useEffect(() => {
    const item = findBySlug(slug, language);
    setData(item);
    setLoading(false);
  }, [slug, language]);
  
  if (loading) return <LoadingState />;
  if (!data) return <NotFoundState />;
  
  return (
    <div className="w-full bg-white pb-24 min-h-screen">
      {/* ══════════════════════════════════════════════════ */}
      {/* CAROUSEL SECTION (Dynamic height, dots nav)      */}
      {/* ══════════════════════════════════════════════════ */}
      <CarouselSection 
        images={data.gallery}
        title={data.title}
        onBack={() => onNavigate(backPage || 'listing-page')}
      />
      
      {/* ══════════════════════════════════════════════════ */}
      {/* CONTENT SECTION (50% right column)               */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="px-[5%] py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="hidden md:block" />  {/* Empty left */}
          
          <div className="w-full">
            {/* Meta block */}
            <MetaBlock 
              title={data.title}
              subtitle={data.artist}
              date={data.date}
              curator={data.curator}
              language={language}
            />
            
            {/* Description */}
            <div 
              className={`mt-8 ${language === 'th' ? 'leading-[1.82em]' : ''}`}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 10. Complete Implementation Example

### Step 1: Define Data Structure

```tsx
// /utils/productsData.ts

export interface Product {
  id: string;
  slug: string;
  title: { en: string; th: string; };
  description: { en: string; th: string; };
  price: number;
  currency: string;
  images: string[];
  category: 'electronics' | 'clothing' | 'books';
  stock: number;
  status: 'available' | 'coming-soon' | 'sold-out';
}

export const products: Product[] = [
  {
    id: "1",
    slug: "wireless-headphones",
    title: {
      en: "Wireless Headphones",
      th: "หูฟังไร้สาย"
    },
    description: {
      en: "Premium wireless headphones with noise cancellation",
      th: "หูฟังไร้สายพรีเมียมพร้อมตัดเสียงรบกวน"
    },
    price: 2990,
    currency: "THB",
    images: [
      "https://example.com/headphones-1.jpg",
      "https://example.com/headphones-2.jpg"
    ],
    category: 'electronics',
    stock: 15,
    status: 'available'
  },
  // ...more products
];
```

### Step 2: Create Helper Functions

```tsx
// /utils/productHelpers.ts

import { products, Product } from './productsData';

export function getAvailableProducts(language: 'en' | 'th' = 'en') {
  return products
    .filter(p => p.status === 'available' && p.stock > 0)
    .map(p => convertToDisplay(p, language));
}

export function getProductsByCategory(category: string, language: 'en' | 'th' = 'en') {
  return products
    .filter(p => p.category === category)
    .map(p => convertToDisplay(p, language));
}

export function getProductBySlug(slug: string, language: 'en' | 'th' = 'en') {
  const product = products.find(p => p.slug === slug);
  return product ? convertToDisplay(product, language) : undefined;
}

function convertToDisplay(product: Product, language: 'en' | 'th') {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title[language],
    description: product.description[language],
    price: product.price,
    currency: product.currency,
    images: product.images,
    category: product.category,
    stock: product.stock,
    status: product.status
  };
}
```

### Step 3: Build Listing Page

```tsx
// /components/pages/ShopPage.tsx

import { getAvailableProducts, getProductsByCategory } from '../../utils/productHelpers';

export function ShopPage({ onNavigate }) {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const products = selectedCategory === 'all'
    ? getAvailableProducts(language)
    : getProductsByCategory(selectedCategory, language);
  
  return (
    <div className="mt-20 md:mt-24 px-[5%]">
      {/* Category filter */}
      <div className="flex gap-4 mb-8">
        <button onClick={() => setSelectedCategory('all')}>All</button>
        <button onClick={() => setSelectedCategory('electronics')}>Electronics</button>
        <button onClick={() => setSelectedCategory('clothing')}>Clothing</button>
      </div>
      
      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product.slug}
            onClick={() => onNavigate('product-detail', product.slug)}
            className="cursor-pointer"
          >
            <img src={product.images[0]} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price} {product.currency}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Step 4: Build Detail Page

```tsx
// /components/pages/ProductDetailPage.tsx

import { getProductBySlug } from '../../utils/productHelpers';

export function ProductDetailPage({ slug, onNavigate }) {
  const { language } = useLanguage();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    const data = getProductBySlug(slug, language);
    setProduct(data);
  }, [slug, language]);
  
  if (!product) return <div>Product not found</div>;
  
  return (
    <div className="w-full bg-white pb-24">
      {/* Image carousel */}
      <Carousel>
        {product.images.map((img, i) => (
          <CarouselItem key={i}>
            <img src={img} className="w-full h-auto" />
          </CarouselItem>
        ))}
      </Carousel>
      
      {/* Product info */}
      <div className="px-[5%] py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div />
          <div>
            <h1>{product.title}</h1>
            <p className="text-2xl">{product.price} {product.currency}</p>
            <p className="mt-4">{product.description}</p>
            <button className="mt-8 px-6 py-3 bg-black text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 11. Reusable Templates

### Generic Listing Page

```tsx
// Copy this template for any content type

interface ListingPageProps<T> {
  title: string;
  getData: (language: string) => T[];
  renderCard: (item: T, onClick: () => void) => React.ReactNode;
  onNavigate: (page: string, slug: string) => void;
  detailPageName: string;
}

export function GenericListingPage<T extends { slug: string }>({
  title,
  getData,
  renderCard,
  onNavigate,
  detailPageName
}: ListingPageProps<T>) {
  const { language } = useLanguage();
  const items = getData(language);
  
  return (
    <div className="mt-20 md:mt-24 px-[5%] min-h-screen">
      <h1>{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {items.map(item => renderCard(item, () => onNavigate(detailPageName, item.slug)))}
      </div>
    </div>
  );
}
```

### Generic Detail Page

```tsx
// Copy this template for any content type

interface DetailPageProps<T> {
  slug: string;
  getData: (slug: string, language: string) => T | undefined;
  renderContent: (item: T, language: string) => React.ReactNode;
  onNavigate: (page: string) => void;
  backPage: string;
}

export function GenericDetailPage<T extends { images: string[]; title: string }>({
  slug,
  getData,
  renderContent,
  onNavigate,
  backPage
}: DetailPageProps<T>) {
  const { language } = useLanguage();
  const [item, setItem] = useState<T | undefined>();
  
  useEffect(() => {
    const data = getData(slug, language);
    setItem(data);
  }, [slug, language]);
  
  if (!item) return <div>Not found</div>;
  
  return (
    <div className="w-full bg-white pb-24">
      <Carousel>
        {item.images.map((img, i) => (
          <CarouselItem key={i}>
            <img src={img} className="w-full h-auto" />
          </CarouselItem>
        ))}
      </Carousel>
      
      <div className="px-[5%] py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div />
          <div>
            {renderContent(item, language)}
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 📝 Summary

### The Complete Data Flow

```
1. DATA LAYER
   ├── Raw bilingual data (Exhibition interface)
   ├── Helper functions (filter, sort, convert)
   └── Detail content (separate storage)

2. LISTING PAGE
   ├── Import helper functions
   ├── Get filtered lists (getCurrentExhibitions())
   ├── Render cards with onClick → slug
   └── Navigate to detail page

3. NAVIGATION
   ├── Slug passed via onNavigate('detail-page', slug)
   ├── App.tsx updates state
   └── DetailPage receives slug

4. DETAIL PAGE
   ├── Find item by slug
   ├── Convert to display format (language-specific)
   ├── Render carousel + content
   └── Back button to listing
```

### Key Architectural Decisions

1. **Slug-Based Routing**: Stable, SEO-friendly identifiers
2. **Status-First Filtering**: Manual override of date logic
3. **Bilingual Data Structure**: `{ en, th }` for all strings
4. **Helper Function Pattern**: Logic separated from components
5. **Standard Templates**: Consistent UX across all detail pages
6. **Dynamic Image Heights**: No fixed heights, natural aspect ratios
7. **Dots Navigation**: Always use dots, never thumbnails
8. **50% Right Column**: Standard layout for all detail pages

### Apply to Your Project

1. ✅ Define your content type interface
2. ✅ Create data file with bilingual structure
3. ✅ Build helper functions for filtering
4. ✅ Use listing page template
5. ✅ Use detail page template
6. ✅ Connect with slug-based navigation

**This pattern scales to ANY content-driven website!** 🚀
