# Detail Content Architecture: Separating Long-Form Content from Metadata

## 🎯 Overview
This guide explains the **separation of concerns** pattern used in Bangkok Kunsthalle where long-form content (full descriptions, essays, biographies) is stored separately from metadata (titles, dates, artists). This architecture enables clean data management, bilingual content, and flexible content updates.

---

## 📚 Table of Contents
1. [The Problem: Why Separate Content?](#the-problem-why-separate-content)
2. [The Solution: Three-Layer Architecture](#the-solution-three-layer-architecture)
3. [DetailContent Structure](#detailcontent-structure)
4. [Bilingual Content Pattern](#bilingual-content-pattern)
5. [Helper Functions](#helper-functions)
6. [Integration with Detail Pages](#integration-with-detail-pages)
7. [Data Flow Diagram](#data-flow-diagram)
8. [Complete Implementation Example](#complete-implementation-example)
9. [CSV Import Workflow](#csv-import-workflow)
10. [Best Practices](#best-practices)
11. [Reusable Templates](#reusable-templates)

---

## 1. The Problem: Why Separate Content?

### ❌ Anti-Pattern: Everything in One Object

```tsx
// DON'T DO THIS: Mixing metadata with long-form content

export const exhibitions = [
  {
    id: "1",
    slug: "nine-plus-five-works",
    title: "Nine Plus Five Works",
    artist: "Michel Auder",
    fromDate: "2024-12-07",
    toDate: "2025-05-31",
    // ❌ PROBLEM: 5000+ character essay mixed with metadata
    fullDescription: `<p>"Nine Plus Five Works" (2024) inaugurated Bangkok 
    Kunsthalle through two interwoven trajectories: five works engaging 
    nature and nine tracing the evolution of Michel Auder across genres...
    [continues for 5000+ characters]...</p><p>Artist Biography: Michel Auder 
    (b. 1945, France) is a filmmaker who has been creating experimental 
    movies and video art since the late 1960s...</p>`,
    // This makes the data file huge, hard to read, and difficult to edit
  },
  // ...15 more exhibitions with 5000+ character descriptions each
];
```

**Problems:**
- ❌ Data file becomes 50,000+ lines long
- ❌ Hard to find and edit specific descriptions
- ❌ Difficult to version control (large diffs)
- ❌ Can't easily import from CMS/CSV
- ❌ Bilingual content doubles the size
- ❌ Poor separation between "data" and "content"

---

### ✅ Solution: Separate Content Storage

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 1: Metadata (Short, Structured)                     │
│  /utils/exhibitionsDataNew.ts                              │
│  • id, slug, title, artist, dates                          │
│  • 200 lines for 16 exhibitions                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  LAYER 2: Long-Form Content (English)                      │
│  /utils/detailContent.ts                                   │
│  • Full descriptions, essays, biographies                  │
│  • Mapped by slug                                          │
│  • 2000+ lines                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  LAYER 3: Long-Form Content (Thai)                         │
│  /utils/detailContentThaiData.ts                           │
│  • Thai translations of all descriptions                   │
│  • Same slug mapping                                       │
│  • 2000+ lines                                             │
└─────────────────────────────────────────────────────────────┘
```

**Benefits:**
- ✅ Clean separation of concerns
- ✅ Easy to locate and edit content
- ✅ Manageable file sizes
- ✅ Simple CSV import workflow
- ✅ Independent bilingual updates
- ✅ Better version control

---

## 2. The Solution: Three-Layer Architecture

### Layer 1: Metadata (exhibitionsDataNew.ts)

```tsx
// /utils/exhibitionsDataNew.ts
// ONLY metadata, NO long-form content

export interface Exhibition {
  id: string;
  slug: string;                     // Key that connects to content
  title: { en: string; th: string; };
  artist: { en: string; th: string; };
  curator: { en: string; th: string; };
  fromDate: string;                 // ISO format
  toDate: string;
  dateDisplay: { en: string; th: string; };
  year: string;
  status: 'current' | 'upcoming' | 'past';
  featuredImage?: string;
  gallery?: string[];
  imageCredits: string;
  tags?: string;
}

export const exhibitions: Exhibition[] = [
  {
    id: "1",
    slug: "nine-plus-five-works",  // ← This is the connection key
    title: {
      en: "Nine Plus Five Works",
      th: "เก้าบวกห้างาน"
    },
    artist: {
      en: "Michel Auder",
      th: "มิเชล โอเดอร์"
    },
    // ... metadata only, NO description here
  },
  // ... more exhibitions
];
```

### Layer 2: English Content (detailContent.ts)

```tsx
// /utils/detailContent.ts
// ONLY long-form English content

export interface DetailContent {
  slug: string;                     // Must match Exhibition.slug
  category: 'Exhibition' | 'Moving Image Program' | 'Residency';
  content: string;                  // Full HTML content
}

export const DETAIL_CONTENT: DetailContent[] = [
  {
    slug: 'nine-plus-five-works',   // ← Matches Exhibition.slug
    category: 'Exhibition',
    content: `
      <p>"Nine Plus Five Works" (2024) inaugurated Bangkok Kunsthalle 
      through two interwoven trajectories: five works engaging nature 
      and nine tracing the evolution of Michel Auder across genres. 
      The exhibition unfolded as both a promenade through the building 
      and a parcours through Auder's life.</p>
      
      <p>In the first group, Auder frames his relationship to nature 
      through time. Representing natural phenomena required a specific 
      editing technique capable of accommodating their nuanced 
      temporality.</p>
      
      <!-- ... 20 more paragraphs ... -->
      
      <p>Artist Biography</p>
      
      <p>Michel Auder (b. 1945, France) is a filmmaker who has been 
      creating experimental movies and video art since the late 1960s. 
      Auder is a poet of visual observation—his films bear an affinity 
      to literary forms and can best be described as filmic poetry.</p>
      
      <!-- ... biography continues ... -->
    `
  },
  {
    slug: 'nostalgia-for-unity',
    category: 'Exhibition',
    content: `<p>In "nostalgia for unity" (2024)...</p><!-- ... -->`
  },
  // ... 16 exhibitions + 6 moving image programs + residencies
];
```

### Layer 3: Thai Content (detailContentThaiData.ts)

```tsx
// /utils/detailContentThaiData.ts
// ONLY long-form Thai content

export interface DetailContentThai {
  slug: string;                     // Same slug as English
  category: 'Exhibition' | 'Moving Image Program' | 'Residency';
  content: string;                  // Thai HTML content
}

export const DETAIL_CONTENT_THAI: DetailContentThai[] = [
  {
    slug: 'nine-plus-five-works',   // ← Same slug
    category: 'Exhibition',
    content: `
      <p>"Nine Plus Five Works" (2024) เปิดตัว Bangkok Kunsthalle 
      ผ่านเส้นทางสองเส้นที่เกี่ยวพันกัน: ผลงานห้าชิ้นที่เกี่ยวข้อง
      กับธรรมชาติและเก้าชิ้นที่ติดตามวิวัฒนาการของมิเชล โอเดอร์
      ข้ามแนว นิทรรศการแฉเป็นทั้งการเดินเล่นผ่านอาคารและการ
      เดินทางผ่านชีวิตของโอเดอร์</p>
      
      <!-- ... Thai translation continues ... -->
      
      <p>ประวัติศิลปิน</p>
      
      <p>มิเชล โอเดอร์ (เกิด พ.ศ. 2488, ฝรั่งเศส) เป็นผู้สร้าง
      ภาพยนตร์ที่สร้างภาพยนตร์ทดลองและวิดีโออาร์ตตั้งแต่ปลาย
      ทศวรรษ 1960</p>
      
      <!-- ... Thai biography continues ... -->
    `
  },
  // ... same exhibitions, Thai translations
];
```

---

## 3. DetailContent Structure

### Interface Definition

```tsx
// /utils/detailContent.ts

export interface DetailContent {
  slug: string;                     // Unique identifier
  category: 'Exhibition' | 'Moving Image Program' | 'Residency';
  content: string;                  // Full HTML string
}
```

### Content Organization by Category

```tsx
export const DETAIL_CONTENT: DetailContent[] = [
  // ══════════════════════════════════════════════════════════
  // EXHIBITIONS (16 items)
  // ══════════════════════════════════════════════════════════
  {
    slug: 'nine-plus-five-works',
    category: 'Exhibition',
    content: `...`
  },
  {
    slug: 'nostalgia-for-unity',
    category: 'Exhibition',
    content: `...`
  },
  {
    slug: 'mend-piece',
    category: 'Exhibition',
    content: `...`
  },
  // ... 13 more exhibitions
  
  // ══════════════════════════════════════════════════════════
  // MOVING IMAGE PROGRAMS (6 items)
  // ══════════════════════════════════════════════════════════
  {
    slug: 'infringes',
    category: 'Moving Image Program',
    content: `...`
  },
  {
    slug: 'shapeshifting-spaces',
    category: 'Moving Image Program',
    content: `...`
  },
  // ... 4 more programs
  
  // ══════════════════════════════════════════════════════════
  // RESIDENCIES (1 item)
  // ══════════════════════════════════════════════════════════
  {
    slug: 'eduardo-williams',
    category: 'Residency',
    content: `...`
  },
];
```

### HTML Content Format

The `content` field contains **rich HTML** with semantic structure:

```html
<!-- Typical exhibition content structure -->
<p>Opening paragraph introducing the exhibition concept.</p>

<p>Second paragraph diving deeper into themes.</p>

<p>Discussion of specific artworks or installation elements.</p>

<p>More analysis paragraphs...</p>

<p> Artist Biography </p>  <!-- Note: spaces around "Artist Biography" -->

<p>Artist Name (b. YEAR, Country) brief intro sentence.</p>

<p>Career highlights and achievements.</p>

<p>Recent work and exhibitions.</p>
```

**Important Pattern:**
- Paragraphs are wrapped in `<p>` tags
- "Artist Biography" section has spaces: `<p> Artist Biography </p>`
- No inline styles (styling applied by CSS)
- HTML is properly escaped for Thai characters

---

## 4. Bilingual Content Pattern

### Parallel Structure

```tsx
// ENGLISH: /utils/detailContent.ts
export const DETAIL_CONTENT: DetailContent[] = [
  {
    slug: 'nine-plus-five-works',
    category: 'Exhibition',
    content: `<p>English description...</p>`
  }
];

// THAI: /utils/detailContentThaiData.ts
export const DETAIL_CONTENT_THAI: DetailContentThai[] = [
  {
    slug: 'nine-plus-five-works',   // ← SAME SLUG
    category: 'Exhibition',         // ← SAME CATEGORY
    content: `<p>คำอธิบายภาษาไทย...</p>`  // ← TRANSLATED CONTENT
  }
];
```

### Lookup by Slug

Both arrays use the **same slug** as the key:

```tsx
// Find English content
const englishContent = DETAIL_CONTENT.find(d => d.slug === 'nine-plus-five-works');
// Returns: { slug: '...', category: 'Exhibition', content: '<p>English...</p>' }

// Find Thai content
const thaiContent = DETAIL_CONTENT_THAI.find(d => d.slug === 'nine-plus-five-works');
// Returns: { slug: '...', category: 'Exhibition', content: '<p>ไทย...</p>' }
```

### Sync Requirements

**Critical:** Both files must be kept in sync:

```tsx
// ✅ CORRECT: Same slugs in both files
// detailContent.ts
{ slug: 'nine-plus-five-works', ... }
{ slug: 'nostalgia-for-unity', ... }
{ slug: 'mend-piece', ... }

// detailContentThaiData.ts
{ slug: 'nine-plus-five-works', ... }  // ← Same order preferred
{ slug: 'nostalgia-for-unity', ... }
{ slug: 'mend-piece', ... }

// ❌ WRONG: Missing or mismatched slugs
// detailContent.ts
{ slug: 'nine-plus-five-works', ... }
{ slug: 'nostalgia-for-unity', ... }

// detailContentThaiData.ts
{ slug: 'nine-plus-five-works', ... }
{ slug: 'nostalgia-unity', ... }       // ❌ Typo! Won't match
```

---

## 5. Helper Functions

### Basic Lookup Functions

```tsx
// /utils/detailContent.ts

// Import Thai content
import { getDetailContentThai } from './detailContentThaiData';

// ══════════════════════════════════════════════════════════════
// ENGLISH CONTENT HELPERS
// ══════════════════════════════════════════════════════════════

export function getDetailContent(slug: string): string | undefined {
  const detail = DETAIL_CONTENT.find(d => d.slug === slug);
  return detail?.content;
}

export function getDetailsByCategory(
  category: 'Exhibition' | 'Moving Image Program' | 'Residency'
): DetailContent[] {
  return DETAIL_CONTENT.filter(d => d.category === category);
}

// ══════════════════════════════════════════════════════════════
// BILINGUAL CONTENT HELPER (Main API)
// ══════════════════════════════════════════════════════════════

export function getDetailContentByLanguage(
  slug: string, 
  language: 'en' | 'th'
): string | undefined {
  if (language === 'th') {
    return getDetailContentThai(slug);
  }
  return getDetailContent(slug);
}
```

### Thai Content Helpers

```tsx
// /utils/detailContentThaiData.ts

export function getDetailContentThai(slug: string): string | undefined {
  const detail = DETAIL_CONTENT_THAI.find(d => d.slug === slug);
  return detail?.content;
}

export function getDetailsByCategoryThai(
  category: 'Exhibition' | 'Moving Image Program' | 'Residency'
): DetailContentThai[] {
  return DETAIL_CONTENT_THAI.filter(d => d.category === category);
}
```

---

## 6. Integration with Detail Pages

### Complete Data Fetching Flow

```tsx
// /components/pages/ExhibitionDetailPage.tsx

import { useLanguage } from '../../utils/languageContext';
import { exhibitions, exhibitionToWPPost } from '../../utils/exhibitionsDataNew';
import { getDetailContentByLanguage } from '../../utils/detailContent';

export function ExhibitionDetailPage({ slug }: Props) {
  const { language } = useLanguage();
  const [postData, setPostData] = useState<WPPost>();
  const [detailContent, setDetailContent] = useState<string>('');
  
  useEffect(() => {
    if (!slug) return;
    
    // ════════════════════════════════════════════════════════
    // STEP 1: Get metadata from exhibitionsDataNew.ts
    // ════════════════════════════════════════════════════════
    const exhibition = exhibitions.find(e => e.slug === slug);
    if (!exhibition) return;
    
    // ════════════════════════════════════════════════════════
    // STEP 2: Convert to display format (language-specific)
    // ════════════════════════════════════════════════════════
    const displayData = exhibitionToWPPost(exhibition, language);
    setPostData(displayData);
    
    // ════════════════════════════════════════════════════════
    // STEP 3: Get full content from detailContent.ts
    // ════════════════════════════════════════════════════════
    const content = getDetailContentByLanguage(slug, language) || '';
    setDetailContent(content);
    
  }, [slug, language]);
  
  if (!postData) return <div>Not found</div>;
  
  return (
    <div>
      {/* Carousel with postData.gallery */}
      <Carousel>...</Carousel>
      
      {/* Content section */}
      <div className="px-[5%] py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div /> {/* Empty left column */}
          
          <div>
            {/* Metadata from postData */}
            <h1>{postData.title}</h1>
            <p>{postData.acf?.artist}</p>
            <p>{postData.date}</p>
            {postData.acf?.curator && (
              <div className="mt-8">
                <p>{language === 'th' ? 'ภัณฑารักษ์โดย' : 'Curated by'}</p>
                <p>{postData.acf.curator}</p>
              </div>
            )}
            
            {/* Full description from detailContent */}
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

## 7. Data Flow Diagram

### Complete Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│  USER NAVIGATES TO DETAIL PAGE                              │
│  URL: /exhibition/nine-plus-five-works                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  DETAIL PAGE COMPONENT                                      │
│  • Receives slug: "nine-plus-five-works"                    │
│  • Gets language from context: "en" or "th"                 │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌──────────────────────┐       ┌──────────────────────┐
│  GET METADATA        │       │  GET FULL CONTENT    │
│                      │       │                      │
│  exhibitions.find()  │       │  getDetailContent    │
│  by slug             │       │  ByLanguage()        │
│                      │       │                      │
│  Returns:            │       │  Returns:            │
│  • title (bilingual) │       │  • HTML content      │
│  • artist            │       │  • In selected lang  │
│  • dates             │       │                      │
│  • gallery images    │       │                      │
└──────────┬───────────┘       └──────────┬───────────┘
           │                               │
           ▼                               ▼
┌──────────────────────┐       ┌──────────────────────┐
│  CONVERT TO DISPLAY  │       │  LANGUAGE SWITCH     │
│                      │       │                      │
│  exhibitionToWPPost  │       │  if (language==='th')│
│  (exhibition, 'en')  │       │    return THAI[]     │
│                      │       │  else                │
│  Extracts:           │       │    return ENGLISH[]  │
│  • title.en          │       │                      │
│  • artist.en         │       │                      │
│  • dateDisplay.en    │       │                      │
└──────────┬───────────┘       └──────────┬───────────┘
           │                               │
           └───────────────┬───────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  RENDER DETAIL PAGE                                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  CAROUSEL (from metadata.gallery)                   │   │
│  │  • Image 1, Image 2, Image 3, ...                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  METADATA (from displayData)                        │   │
│  │  • Title: "Nine Plus Five Works"                    │   │
│  │  • Artist: "Michel Auder"                           │   │
│  │  • Date: "7 December 2024 - 31 May 2025"            │   │
│  │  • Curated by: "Gridthiya Gaweewong"                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  FULL DESCRIPTION (from detailContent)              │   │
│  │  <div dangerouslySetInnerHTML={detailContent} />    │   │
│  │  • Exhibition concept (5+ paragraphs)               │   │
│  │  • Artist biography (3+ paragraphs)                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Complete Implementation Example

### Step 1: Define Metadata Structure

```tsx
// /utils/blogPostsData.ts

export interface BlogPost {
  id: string;
  slug: string;
  title: { en: string; th: string; };
  author: { en: string; th: string; };
  publishDate: string;
  dateDisplay: { en: string; th: string; };
  category: 'Essay' | 'Interview' | 'News';
  featuredImage: string;
  excerpt: { en: string; th: string; };  // Short preview
  tags: string[];
  status: 'published' | 'draft' | 'scheduled';
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-contemporary-art",
    title: {
      en: "The Future of Contemporary Art in Southeast Asia",
      th: "อนาคตของศิลปะร่วมสมัยในเอเชียตะวันออกเฉียงใต้"
    },
    author: {
      en: "Gridthiya Gaweewong",
      th: "กฤติยา กาวีวงศ์"
    },
    publishDate: "2026-01-15",
    dateDisplay: {
      en: "15 January 2026",
      th: "15 มกราคม 2569"
    },
    category: 'Essay',
    featuredImage: "https://example.com/future-art.jpg",
    excerpt: {
      en: "An exploration of emerging trends in contemporary art...",
      th: "การสำรวจแนวโน้มที่เกิดขึ้นใหม่ในศิลปะร่วมสมัย..."
    },
    tags: ['contemporary art', 'Southeast Asia', 'essay'],
    status: 'published'
  },
  // ... more posts
];
```

### Step 2: Create English Content File

```tsx
// /utils/blogDetailContent.ts

import { getDetailContentThai } from './blogDetailContentThai';

export interface BlogDetailContent {
  slug: string;
  category: 'Essay' | 'Interview' | 'News';
  content: string;  // Full article HTML
}

export const BLOG_DETAIL_CONTENT: BlogDetailContent[] = [
  {
    slug: 'future-of-contemporary-art',
    category: 'Essay',
    content: `
      <p>Contemporary art in Southeast Asia is undergoing a profound 
      transformation. From Bangkok to Jakarta, Manila to Kuala Lumpur, 
      a new generation of artists is redefining what it means to create 
      in the 21st century.</p>
      
      <p>This essay examines three key trends shaping the region's 
      artistic landscape: the rise of collective practices, the 
      integration of traditional and digital media, and the increasing 
      engagement with environmental themes.</p>
      
      <h2>Collective Practices</h2>
      
      <p>Unlike the Western emphasis on individual genius, many Southeast 
      Asian artists are embracing collaborative models...</p>
      
      <!-- ... 20 more paragraphs ... -->
      
      <h2>Conclusion</h2>
      
      <p>The future of contemporary art in Southeast Asia is bright, 
      diverse, and deeply rooted in local contexts while maintaining 
      global relevance.</p>
      
      <p><strong>About the Author</strong></p>
      
      <p>Gridthiya Gaweewong is an independent curator and writer based 
      in Bangkok and Chiang Mai. She is the Artistic Director of Bangkok 
      Art Biennale and co-founder of Bangkok Kunsthalle.</p>
    `
  },
  // ... more blog posts
];

// Helper functions
export function getBlogDetailContent(slug: string): string | undefined {
  const detail = BLOG_DETAIL_CONTENT.find(d => d.slug === slug);
  return detail?.content;
}

export function getBlogDetailContentByLanguage(
  slug: string, 
  language: 'en' | 'th'
): string | undefined {
  if (language === 'th') {
    return getDetailContentThai(slug);
  }
  return getBlogDetailContent(slug);
}
```

### Step 3: Create Thai Content File

```tsx
// /utils/blogDetailContentThai.ts

export interface BlogDetailContentThai {
  slug: string;
  category: 'Essay' | 'Interview' | 'News';
  content: string;
}

export const BLOG_DETAIL_CONTENT_THAI: BlogDetailContentThai[] = [
  {
    slug: 'future-of-contemporary-art',  // Same slug!
    category: 'Essay',
    content: `
      <p>ศิลปะร่วมสมัยในเอเชียตะวันออกเฉียงใต้กำลังเปลี่ยนแปลง
      อย่างลึกซึ้ง จากกรุงเทพฯ ไปจนถึงจาการ์ตา มะนิลาไปจนถึง
      กัวลาลัมเปอร์ ศิลปินรุ่นใหม่กำลังนิยามใหม่ว่าการสร้างสรรค์
      ในศตวรรษที่ 21 หมายความว่าอย่างไร</p>
      
      <p>บทความนี้ตรวจสอบแนวโน้มสำคัญสามประการที่กำหนดทิศทาง
      ศิลปะของภูมิภาค...</p>
      
      <h2>การปฏิบัติแบบร่วมกัน</h2>
      
      <p>แตกต่างจากการเน้นอัจฉริยะของบุคคลในตะวันตก ศิลปิน
      เอเชียตะวันออกเฉียงใต้หลายคนกำลังยอมรับรูปแบบการทำงาน
      ร่วมกัน...</p>
      
      <!-- ... Thai translation continues ... -->
    `
  },
];

export function getDetailContentThai(slug: string): string | undefined {
  const detail = BLOG_DETAIL_CONTENT_THAI.find(d => d.slug === slug);
  return detail?.content;
}
```

### Step 4: Use in Detail Page

```tsx
// /components/pages/BlogDetailPage.tsx

import { blogPosts } from '../../utils/blogPostsData';
import { getBlogDetailContentByLanguage } from '../../utils/blogDetailContent';

export function BlogDetailPage({ slug }: Props) {
  const { language } = useLanguage();
  const [post, setPost] = useState<BlogPost>();
  const [content, setContent] = useState<string>('');
  
  useEffect(() => {
    // Get metadata
    const postData = blogPosts.find(p => p.slug === slug);
    setPost(postData);
    
    // Get full content
    const fullContent = getBlogDetailContentByLanguage(slug, language) || '';
    setContent(fullContent);
  }, [slug, language]);
  
  if (!post) return <div>Post not found</div>;
  
  return (
    <div className="max-w-4xl mx-auto px-[5%] py-12">
      {/* Featured image */}
      <img src={post.featuredImage} className="w-full h-auto" />
      
      {/* Metadata */}
      <div className="mt-8">
        <h1>{post.title[language]}</h1>
        <p>{post.author[language]}</p>
        <p>{post.dateDisplay[language]}</p>
        <p>{post.category}</p>
      </div>
      
      {/* Full article content */}
      <div 
        className={`mt-12 prose ${language === 'th' ? 'leading-[1.82em]' : ''}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
```

---

## 9. CSV Import Workflow

### Why CSV?

Many cultural institutions use **Google Sheets or Excel** to manage content:
- Non-technical staff can edit
- Easy collaboration
- Version history built-in
- Export to CSV for import

### CSV Structure

```csv
slug,category,content
nine-plus-five-works,Exhibition,"<p>""Nine Plus Five Works"" (2024) inaugurated Bangkok Kunsthalle...</p><p>Artist Biography: Michel Auder (b. 1945, France)...</p>"
nostalgia-for-unity,Exhibition,"<p>In ""nostalgia for unity"" (2024)...</p>"
mend-piece,Exhibition,"<p>The 1960s was a time of social change...</p>"
```

**Important:**
- HTML content must be **escaped** (quotes become `""`)
- Line breaks preserved inside quoted fields
- UTF-8 encoding for Thai characters

### Import Script Pattern

```tsx
// /scripts/importDetailContent.ts

import fs from 'fs';
import csv from 'csv-parser';

interface CSVRow {
  slug: string;
  category: string;
  content: string;
}

const results: CSVRow[] = [];

fs.createReadStream('imports/detail_content.csv')
  .pipe(csv())
  .on('data', (row: CSVRow) => {
    results.push(row);
  })
  .on('end', () => {
    // Generate TypeScript file
    const tsContent = `
export interface DetailContent {
  slug: string;
  category: 'Exhibition' | 'Moving Image Program' | 'Residency';
  content: string;
}

export const DETAIL_CONTENT: DetailContent[] = [
${results.map(row => `  {
    slug: '${row.slug}',
    category: '${row.category}',
    content: \`${row.content.replace(/`/g, '\\`')}\`
  }`).join(',\n')}
];
    `;
    
    fs.writeFileSync('utils/detailContent.ts', tsContent);
    console.log('✅ Detail content imported successfully!');
  });
```

### Manual Process (Simpler)

1. **Export from Google Sheets** → Download as CSV
2. **Open CSV** → Copy content column
3. **Paste into detailContent.ts** → Update each object manually
4. **Format HTML** → Clean up line breaks
5. **Test** → Verify slug matches

---

## 10. Best Practices

### ✅ DO: Keep Slugs Consistent

```tsx
// Metadata file
{ slug: 'nine-plus-five-works', ... }

// English content
{ slug: 'nine-plus-five-works', ... }  // ✅ Same

// Thai content
{ slug: 'nine-plus-five-works', ... }  // ✅ Same
```

### ✅ DO: Use Same Order (Recommended)

```tsx
// Makes diffing easier, not required but helpful

// English
DETAIL_CONTENT = [
  { slug: 'nine-plus-five-works', ... },
  { slug: 'nostalgia-for-unity', ... },
  { slug: 'mend-piece', ... }
]

// Thai (same order)
DETAIL_CONTENT_THAI = [
  { slug: 'nine-plus-five-works', ... },
  { slug: 'nostalgia-for-unity', ... },
  { slug: 'mend-piece', ... }
]
```

### ✅ DO: Use Semantic HTML

```tsx
content: `
  <p>Paragraph text.</p>
  <h2>Section heading</h2>
  <p>More text.</p>
  <ul>
    <li>List item</li>
  </ul>
  <blockquote>Quote text</blockquote>
`
```

### ✅ DO: Separate Sections Clearly

```tsx
content: `
  <!-- Exhibition description -->
  <p>Main exhibition text...</p>
  <p>More exhibition analysis...</p>
  
  <!-- Artist biography -->
  <p> Artist Biography </p>
  <p>Artist name and background...</p>
  <p>Career highlights...</p>
`
```

### ❌ DON'T: Mix Content with Metadata

```tsx
// ❌ WRONG: Don't put content in metadata file
export const exhibitions = [{
  slug: 'exhibition-1',
  title: 'Title',
  fullDescription: `<p>Long content...</p>`,  // ❌ Keep separate!
}];
```

### ❌ DON'T: Inline Styles

```tsx
// ❌ WRONG: Inline styles
content: `<p style="color: red; font-size: 18px;">Text</p>`

// ✅ CORRECT: Use semantic HTML, style with CSS
content: `<p class="highlight">Text</p>`
// Or just: `<p>Text</p>` and style all <p> tags globally
```

### ❌ DON'T: Hardcode Language

```tsx
// ❌ WRONG: Hardcoded English in component
<div dangerouslySetInnerHTML={{ __html: getDetailContent(slug) }} />

// ✅ CORRECT: Language-aware
<div dangerouslySetInnerHTML={{ 
  __html: getDetailContentByLanguage(slug, language) 
}} />
```

---

## 11. Reusable Templates

### Generic Detail Content Structure

```tsx
// /utils/[contentType]DetailContent.ts

export interface [Type]DetailContent {
  slug: string;
  category: string;  // Adjust to your categories
  content: string;
}

export const [TYPE]_DETAIL_CONTENT: [Type]DetailContent[] = [
  {
    slug: 'item-slug',
    category: 'Category Name',
    content: `
      <p>Opening paragraph introducing the topic.</p>
      
      <p>Main content paragraphs with analysis, description, or story.</p>
      
      <h2>Section Heading</h2>
      
      <p>More detailed content under this section.</p>
      
      <p><strong>Author Bio / Artist Bio / About</strong></p>
      
      <p>Background information about the creator or subject.</p>
    `
  },
];

// Helper functions
export function get[Type]DetailContent(slug: string): string | undefined {
  const detail = [TYPE]_DETAIL_CONTENT.find(d => d.slug === slug);
  return detail?.content;
}

export function get[Type]DetailContentByLanguage(
  slug: string, 
  language: 'en' | 'th'
): string | undefined {
  if (language === 'th') {
    return get[Type]DetailContentThai(slug);
  }
  return get[Type]DetailContent(slug);
}
```

### Checklist for New Content Type

1. ✅ Create metadata interface and file
2. ✅ Create English detail content file
3. ✅ Create Thai detail content file
4. ✅ Add helper functions for lookup
5. ✅ Integrate with detail page component
6. ✅ Test slug matching works
7. ✅ Test language switching works
8. ✅ Verify HTML renders correctly
9. ✅ Check Thai line-height applied

---

## 📝 Summary

### The Three-File Pattern

```
1. METADATA FILE
   /utils/exhibitionsDataNew.ts
   └─► Small, structured data
       • id, slug, title, dates, images
       • Bilingual fields: { en, th }
       • ~200 lines for 16 items

2. ENGLISH CONTENT FILE
   /utils/detailContent.ts
   └─► Long-form English content
       • Mapped by slug
       • Full HTML descriptions
       • ~2000+ lines

3. THAI CONTENT FILE
   /utils/detailContentThaiData.ts
   └─► Long-form Thai content
       • Same slug mapping
       • Translated HTML
       • ~2000+ lines
```

### Key Principles

1. **Separation of Concerns**: Metadata ≠ Content
2. **Slug-Based Mapping**: One unique key connects all layers
3. **Parallel Structures**: English and Thai files mirror each other
4. **Helper Functions**: Centralized lookup logic
5. **Language Switching**: `getDetailContentByLanguage(slug, language)`
6. **HTML Content**: Rich formatting in `content` field
7. **Type Safety**: TypeScript interfaces enforce structure

### Benefits

✅ **Maintainability**: Easy to find and edit specific content  
✅ **Scalability**: Add new items without bloating data files  
✅ **Bilingual**: Independent content management per language  
✅ **Import-Friendly**: CSV → TypeScript workflow  
✅ **Version Control**: Smaller diffs, clearer history  
✅ **Team-Friendly**: Non-technical editors can work in Google Sheets  

### Apply to Your Project

This pattern works for **any content type**:
- Blog posts / Articles
- Product descriptions
- Team member bios
- Case studies
- Documentation pages
- Event descriptions

**Copy the structure, adjust to your needs, and enjoy clean content architecture!** 🚀
