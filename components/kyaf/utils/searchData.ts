// @ts-nocheck
import { exhibitions } from './exhibitionsDataNew';
import { activities } from './activitiesDataNew';
import { createBilingualPost } from './dataAdapter';
import { RECORDS } from './records';
import { ARTISTS_DATA } from './residencyData';
import { translations } from './translations';

export interface SearchDocument {
  id: string;
  title: string;
  content: string;
  keywords: string;
  page: string;
  slug?: string;
  lang: 'en' | 'th';
}

interface StaticPageConfig {
  id: string;
  page: string;
  titleKey: string;
  contentKey?: string;
  content?: { en: string; th: string };
  keywords: string;
}

const STATIC_PAGES_CONFIG: StaticPageConfig[] = [
  { 
    id: 'home', 
    page: 'home', 
    titleKey: 'nav.home', 
    content: { 
      en: 'Khao Yai Art Forest is a multidisciplinary platform for contemporary art in Thailand.', 
      th: 'Khao Yai Art Forest เป็นพื้นที่ทางศิลปะร่วมสมัยและพหุสาขาวิชาในประเทศไทย' 
    }, 
    keywords: 'art contemporary thailand platform bangkok main ศิลปะ ร่วมสมัย ไทย กรุงเทพ' 
  },
  { 
    id: 'about', 
    page: 'about', 
    titleKey: 'nav.aboutUs', 
    contentKey: 'about.description', 
    keywords: 'history vision team background mission story who we are ประวัติ วิสัยทัศน์ ทีมงาน' 
  },
  { 
    id: 'vision', 
    page: 'vision', 
    titleKey: 'nav.vision', 
    contentKey: 'about.vision.content', 
    keywords: 'mission goals creativity dialogue future strategy manifesto พันธกิจ เป้าหมาย' 
  },
  { 
    id: 'visit', 
    page: 'visit', 
    titleKey: 'nav.visit', 
    contentKey: 'visit.title', 
    keywords: 'location map hours directions ticket access transport address ที่ตั้ง แผนที่ เวลาทำการ' 
  },
  { 
    id: 'exhibitions', 
    page: 'exhibitions', 
    titleKey: 'nav.exhibitions', 
    content: { 
      en: 'Discover our current, upcoming, and past exhibitions.', 
      th: 'ค้นพบนิทรรศการปัจจุบัน นิทรรศการที่กำลังจะมาถึง และนิทรรศการที่ผ่านมา' 
    }, 
    keywords: 'show gallery display art artists calendar schedule นิทรรศการ ศิลปะ ศิลปิน' 
  },
  { 
    id: 'activities', 
    page: 'activities', 
    titleKey: 'nav.activities', 
    content: { 
      en: 'Join our educational programs, workshops, artist talks, and special events.', 
      th: 'เข้าร่วมโปรแกรมการศึกษา เวิร์กช็อป การบรรยายของศิลปิน และกิจกรรมพิเศษของเรา' 
    }, 
    keywords: 'events workshops education talks programs learning public กิจกรรม เวิร์กช็อป การศึกษา' 
  },
  { 
    id: 'blog', 
    page: 'blog', 
    titleKey: 'nav.blog', 
    content: { 
      en: 'Read the latest updates, articles, interviews, and insights.', 
      th: 'อ่านข่าวสารล่าสุด บทความ บทสัมภาษณ์ และข้อมูลเชิงลึก' 
    }, 
    keywords: 'articles updates press reviews insights journalism media บทความ ข่าวสาร สื่อ' 
  },
  { 
    id: 'support', 
    page: 'support', 
    titleKey: 'nav.support', 
    content: { 
      en: 'Help us sustain our mission by becoming a patron or donor.', 
      th: 'ช่วยสนับสนุนพันธกิจของเราโดยการเป็นผู้มีอุปการคุณหรือผู้บริจาค' 
    }, 
    keywords: 'donate patron sponsorship funding membership giving philanthropy บริจาค สนับสนุน' 
  },
  { 
    id: 'contact', 
    page: 'contact', 
    titleKey: 'nav.contact', 
    content: { 
      en: 'Get in touch with us for inquiries, press information, or collaborations.', 
      th: 'ติดต่อเราสำหรับการสอบถาม ข้อมูลสื่อมวลชน หรือความร่วมมือ' 
    }, 
    keywords: 'email phone address press inquiries connect hello ติดต่อ อีเมล โทรศัพท์' 
  },
  { 
    id: 'press', 
    page: 'press', 
    titleKey: 'nav.press', 
    contentKey: 'press.title', 
    keywords: 'media news kit release journalism download coverage สื่อ ข่าว ประชาสัมพันธ์' 
  },
  { 
    id: 'founder', 
    page: 'founder', 
    titleKey: 'nav.founder', 
    contentKey: 'about.foundingDirector', 
    keywords: 'biography leadership owner director profile ผู้ก่อตั้ง ผู้อำนวยการ' 
  },
  { 
    id: 'team', 
    page: 'team', 
    titleKey: 'nav.team', 
    contentKey: 'team.team', 
    keywords: 'staff curators management jobs careers hiring ทีมงาน ภัณฑารักษ์' 
  },
  { 
    id: 'residency', 
    page: 'residency', 
    titleKey: 'nav.residency', 
    contentKey: 'residency.description', 
    keywords: 'artist-in-residence studio program development exchange housing ศิลปินพำนัก' 
  },
  { 
    id: 'archives', 
    page: 'archives', 
    titleKey: 'nav.archives', 
    content: { 
      en: 'Explore our digital archives of past events and exhibitions.', 
      th: 'สำรวจคลังข้อมูลดิจิทัลของกิจกรรมและนิทรรศการที่ผ่านมาของเรา' 
    }, 
    keywords: 'history past events database records library collection ประวัติ คลังข้อมูล' 
  },
  { 
    id: 'khaoyai', 
    page: 'khaoyai', 
    titleKey: 'nav.khaoyai', 
    contentKey: 'khaoyai.title', 
    keywords: 'kyaf khao yai art film festival nature เขาใหญ่ ศิลปะ ภาพยนตร์' 
  },
  { 
    id: 'shop', 
    page: 'shop', 
    titleKey: 'nav.shop', 
    contentKey: 'shop.title', 
    keywords: 'store merchandise books gifts buy ร้านค้า สินค้า หนังสือ' 
  },
];

/**
 * Strip HTML tags from a string
 */
function stripHtml(html: string): string {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Create search documents for static pages
 */
function indexStaticPages(): SearchDocument[] {
  const documents: SearchDocument[] = [];

  STATIC_PAGES_CONFIG.forEach(config => {
    const enContent = config.contentKey 
      ? (translations.en[config.contentKey as keyof typeof translations.en] || '') 
      : (config.content?.en || '');

    const thContent = config.contentKey 
      ? (translations.th[config.contentKey as keyof typeof translations.th] || '') 
      : (config.content?.th || '');

    // English version
    documents.push({
      id: `${config.id}-en`,
      title: translations.en[config.titleKey as keyof typeof translations.en] || config.titleKey,
      content: typeof enContent === 'string' ? enContent : '',
      keywords: config.keywords,
      page: config.page,
      lang: 'en'
    });

    // Thai version
    documents.push({
      id: `${config.id}-th`,
      title: translations.th[config.titleKey as keyof typeof translations.th] || config.titleKey,
      content: typeof thContent === 'string' ? thContent : '',
      keywords: config.keywords,
      page: config.page,
      lang: 'th'
    });
  });

  return documents;
}

/**
 * Create search documents for exhibitions
 */
function indexExhibitions(): SearchDocument[] {
  const documents: SearchDocument[] = [];

  exhibitions.forEach(exhibition => {
    const bilingualPost = createBilingualPost(exhibition);
    
    // English version
    const enPost = bilingualPost.en;
    documents.push({
      id: `exhibition-${exhibition.slug}-en`,
      title: enPost.title,
      content: stripHtml(enPost.content) || exhibition.listingSummary.en,
      keywords: `exhibition art show ${enPost.categories?.join(' ') || ''} ${enPost.acf?.artist || ''}`,
      page: 'exhibition-detail',
      slug: exhibition.slug,
      lang: 'en'
    });

    // Thai version
    const thPost = bilingualPost.th;
    documents.push({
      id: `exhibition-${exhibition.slug}-th`,
      title: thPost.title,
      content: stripHtml(thPost.content) || exhibition.listingSummary.th,
      keywords: `นิทรรศการ ศิลปะ ${thPost.categories?.join(' ') || ''} ${thPost.acf?.artist || ''}`,
      page: 'exhibition-detail',
      slug: exhibition.slug,
      lang: 'th'
    });
  });

  return documents;
}

/**
 * Create search documents for activities
 */
function indexActivities(): SearchDocument[] {
  const documents: SearchDocument[] = [];

  activities.forEach(activity => {
    const bilingualPost = createBilingualPost(activity);
    
    // English version
    const enPost = bilingualPost.en;
    documents.push({
      id: `activity-${activity.slug}-en`,
      title: enPost.title,
      content: stripHtml(enPost.content) || activity.listingSummary.en,
      keywords: `activity event ${enPost.categories?.join(' ') || ''}`,
      page: 'activity-detail',
      slug: activity.slug,
      lang: 'en'
    });

    // Thai version
    const thPost = bilingualPost.th;
    documents.push({
      id: `activity-${activity.slug}-th`,
      title: thPost.title,
      content: stripHtml(thPost.content) || activity.listingSummary.th,
      keywords: `กิจกรรม ${thPost.categories?.join(' ') || ''}`,
      page: 'activity-detail',
      slug: activity.slug,
      lang: 'th'
    });
  });

  return documents;
}

/**
 * Create search documents for legacy records (archives)
 */
function indexRecords(): SearchDocument[] {
  const documents: SearchDocument[] = [];
  const exhibitionSlugs = new Set(exhibitions.map(ex => ex.slug));
  const activitySlugs = new Set(activities.map(act => act.slug));
  
  RECORDS.forEach(record => {
    // Skip if already in new data structure
    if (exhibitionSlugs.has(record.slug) || activitySlugs.has(record.slug)) {
      return;
    }

    let page = '';
    let keywords = '';

    if (record.category === 'activity' || record.category === 'event') {
      page = 'activity-detail';
      keywords = `activity event ${record.status} ${record.description || ''}`;
    } else if (record.category === 'exhibition') {
      page = 'exhibition-detail';
      keywords = `exhibition art show ${record.status} ${record.description || ''}`;
    }

    if (page) {
      const content = `${record.description || ''} (${record.date})`;

      // English version
      documents.push({
        id: `record-${record.id}-en`,
        title: record.title,
        content,
        keywords,
        page,
        slug: record.slug,
        lang: 'en'
      });

      // Thai version
      documents.push({
        id: `record-${record.id}-th`,
        title: record.title,
        content,
        keywords,
        page,
        slug: record.slug,
        lang: 'th'
      });
    }
  });

  return documents;
}

/**
 * Create search documents for artists
 */
function indexArtists(): SearchDocument[] {
  const documents: SearchDocument[] = [];

  ARTISTS_DATA.forEach(artist => {
    const bioContent = stripHtml(`${artist.bio} ${artist.statement}`);

    // English version
    documents.push({
      id: `artist-${artist.slug}-en`,
      title: artist.name,
      content: bioContent,
      keywords: `artist resident residency ${artist.period} ${artist.category}`,
      page: 'artist-detail',
      slug: artist.slug,
      lang: 'en'
    });

    // Thai version
    documents.push({
      id: `artist-${artist.slug}-th`,
      title: artist.nameTH || artist.name,
      content: bioContent,
      keywords: `ศิลปิน ศิลปินพำนัก ${artist.periodTH || artist.period} ${artist.category}`,
      page: 'artist-detail',
      slug: artist.slug,
      lang: 'th'
    });
  });

  return documents;
}

/**
 * Build complete search index
 * Combines all searchable content from the site
 */
export async function getFullSearchData(): Promise<SearchDocument[]> {
  const data: SearchDocument[] = [
    ...indexStaticPages(),
    ...indexExhibitions(),
    ...indexActivities(),
    ...indexRecords(),
    ...indexArtists()
  ];

  return data;
}