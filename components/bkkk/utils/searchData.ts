// @ts-nocheck
import { ARTISTS_DATA } from './residencyData';
import { translations } from './translations';
import { exhibitions } from './exhibitionsDataNew';
import { movingImagePrograms } from './movingImageData';
import { MOCK_POSTS_BILINGUAL } from './mockDataBilingual';
import { getDetailContentByLanguage } from './detailContent';

export interface SearchDocument {
  id: string;
  title: string;
  content: string;
  keywords: string;
  page: string;
  slug?: string;
  lang: 'en' | 'th';
}

const STATIC_PAGES_CONFIG = [
  { id: 'home', page: 'home', titleKey: 'nav.home', content: { en: 'Bangkok Kunsthalle is a multidisciplinary platform for contemporary art in Thailand.', th: 'บางกอก คุนสท์ฮัลเล่ เป็นพื้นที่ทางศิลปะร่วมสมัยและพหุสาขาวิชาในประเทศไทย' }, keywords: 'art contemporary thailand platform bangkok main ศิลปะ ร่วมสมัย ไทย กรุงเทพ' },
  { id: 'about', page: 'about', titleKey: 'nav.aboutUs', contentKey: 'about.description', keywords: 'history vision team background mission story who we are ประวัติ วิสัยทัศน์ ทีมงาน' },
  { id: 'vision', page: 'vision', titleKey: 'nav.vision', contentKey: 'about.vision.content', keywords: 'mission goals creativity dialogue future strategy manifesto พันธกิจ เป้าหมาย' },
  { id: 'visit', page: 'visit', titleKey: 'nav.visit', contentKey: 'visit.title', keywords: 'location map hours directions ticket access transport address ที่ตั้ง แผนที่ เวลาทำการ' },
  { id: 'exhibitions', page: 'exhibitions', titleKey: 'nav.exhibitions', content: { en: 'Discover our current, upcoming, and past exhibitions.', th: 'ค้นพบนิทรรศการปัจจุบัน นิทรรศการที่กำลังจะมาถึง และนิทรรศการที่ผ่านมา' }, keywords: 'show gallery display art artists calendar schedule นิทรรศการ ศิลปะ ศิลปิน' },
  { id: 'activities', page: 'activities', titleKey: 'nav.activities', content: { en: 'Join our educational programs, workshops, artist talks, and special events.', th: 'เข้าร่วมโปรแกรมการศึกษา เวิร์กช็อป การบรรยายของศิลปิน และกิจกรรมพิเศษของเรา' }, keywords: 'events workshops education talks programs learning public กิจกรรม เวิร์กช็อป การศึกษา' },
  { id: 'blog', page: 'blog', titleKey: 'nav.blog', content: { en: 'Read the latest updates, articles, interviews, and insights.', th: 'อ่านข่าวสารล่าสุด บทความ บทสัมภาษณ์ และข้อมูลเชิงลึก' }, keywords: 'articles updates press reviews insights journalism media บทความ ข่าวสาร สื่อ' },
  { id: 'support', page: 'support', titleKey: 'nav.support', content: { en: 'Help us sustain our mission by becoming a patron or donor.', th: 'ช่วยสนับสนุนพันธกิจของเราโดยการเป็นผู้มีอุปการคุณหรือผู้บริจาค' }, keywords: 'donate patron sponsorship funding membership giving philanthropy บริจาค สนับสนุน' },
  { id: 'contact', page: 'contact', titleKey: 'nav.contact', content: { en: 'Get in touch with us for inquiries, press information, or collaborations.', th: 'ติดต่อเราสำหรับการสอบถาม ข้อมูลสื่อมวลชน หรือความร่วมมือ' }, keywords: 'email phone address press inquiries connect hello ติดต่อ อีเมล โทรศัพท์' },
  { id: 'press', page: 'press', titleKey: 'nav.press', contentKey: 'press.title', keywords: 'media news kit release journalism download coverage สื่อ ข่าว ประชาสัมพันธ์' },
  { id: 'founder', page: 'founder', titleKey: 'nav.founder', contentKey: 'about.foundingDirector', keywords: 'biography leadership owner director profile ผู้ก่อตั้ง ผู้อำนวยการ' },
  { id: 'team', page: 'team', titleKey: 'nav.team', contentKey: 'team.team', keywords: 'staff curators management jobs careers hiring ทีมงาน ภัณฑารักษ์' },
  { id: 'residency', page: 'residency', titleKey: 'nav.residency', contentKey: 'residency.description', keywords: 'artist-in-residence studio program development exchange housing ศิลปินพำนัก' },
];

function stripHtml(html: string): string {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export async function getFullSearchData(): Promise<SearchDocument[]> {
  const data: SearchDocument[] = [];

  // 1. Static Pages (EN & TH)
  STATIC_PAGES_CONFIG.forEach(config => {
    // EN
    data.push({
      id: `${config.id}-en`,
      title: translations.en[config.titleKey as keyof typeof translations.en] || config.titleKey,
      content: config.contentKey 
        ? (translations.en[config.contentKey as keyof typeof translations.en] || '') 
        : (typeof config.content === 'object' ? config.content.en : ''),
      keywords: config.keywords,
      page: config.page,
      lang: 'en'
    });

    // TH
    data.push({
      id: `${config.id}-th`,
      title: translations.th[config.titleKey as keyof typeof translations.th] || config.titleKey,
      content: config.contentKey 
        ? (translations.th[config.contentKey as keyof typeof translations.th] || '') 
        : (typeof config.content === 'object' ? config.content.th : ''),
      keywords: config.keywords,
      page: config.page,
      lang: 'th'
    });
  });

  // 2. Records (Archives) - Currently assuming EN mostly, but we can duplicate for TH or just leave as EN
  // Since we don't have explicit TH translations for RECORDS in the file provided, we will map them to EN
  // and maybe provide a generic TH fallback if needed, or just let them be searchable in EN.
  // To make them searchable in TH mode, we should at least include them with lang='th' if we want them to appear in TH search results.
  // RECORDS.forEach(record => {
  //     // Check if already exists in MOCK_POSTS_BILINGUAL (to avoid duplicates if they overlap)
  //     // The logic in original file did this.
  //     const exists = Object.values(MOCK_POSTS_BILINGUAL).some(p => p.en.slug === record.slug);
  //     if (exists) return;

  //     let page = '';
  //     let keywords = '';

  //     if (record.category === 'activity' || record.category === 'event') {
  //       page = 'activity-detail';
  //       keywords = `activity event ${record.status} ${record.description || ''}`;
  //     } else if (record.category === 'exhibition') {
  //       page = 'exhibition-detail';
  //       keywords = `exhibition art show ${record.status} ${record.description || ''}`;
  //     }

  //     if (page) {
  //       // Add for EN
  //       data.push({
  //         id: `record-${record.id}-en`,
  //         title: record.title,
  //         content: `${record.description || ''} (${record.date})`,
  //         keywords: keywords,
  //         page: page,
  //         slug: record.slug,
  //         lang: 'en'
  //       });

  //       // Add for TH (using same content as fallback, so it appears in TH search)
  //       data.push({
  //         id: `record-${record.id}-th`,
  //         title: record.title, // Keep EN title
  //         content: `${record.description || ''} (${record.date})`,
  //         keywords: keywords,
  //         page: page,
  //         slug: record.slug,
  //         lang: 'th'
  //       });
  //     }
  // });

  // 3. Artists (Residency)
  ARTISTS_DATA.forEach(artist => {
      // Support both old and new data structure
      const enContent = artist.content || (artist.bio ? `${artist.bio}${artist.statement || ''}` : '');
      const thContent = artist.contentTH || (artist.bioTH ? `${artist.bioTH}${artist.statementTH || ''}` : enContent);
      
      // EN
      data.push({
          id: `artist-${artist.slug}-en`,
          title: artist.name,
          content: stripHtml(enContent),
          keywords: `artist resident residency ${artist.period} ${artist.status} ศิลปิน`,
          page: 'artist-detail',
          slug: artist.slug,
          lang: 'en'
      });
      // TH (Using proper Thai fields)
      data.push({
          id: `artist-${artist.slug}-th`,
          title: artist.nameTH || artist.name,
          content: stripHtml(thContent),
          keywords: `artist resident residency ${artist.periodTH || artist.period} ${artist.status} ศิลปิน พำนัก`,
          page: 'artist-detail',
          slug: artist.slug,
          lang: 'th'
      });
  });

  // 4. Exhibitions
  exhibitions.forEach(exhibition => {
    // Get detail content for both languages
    const enContent = getDetailContentByLanguage(exhibition.slug, 'en') || '';
    const thContent = getDetailContentByLanguage(exhibition.slug, 'th') || '';
    
    // EN
    data.push({
      id: `exhibition-${exhibition.slug}-en`,
      title: exhibition.title.en,
      content: stripHtml(enContent + ' ' + exhibition.artist.en),
      keywords: `exhibition art show ${exhibition.artist.en} ${exhibition.dateDisplay.en} นิทรรศการ ศิลปะ`,
      page: 'exhibition-detail',
      slug: exhibition.slug,
      lang: 'en'
    });

    // TH
    data.push({
      id: `exhibition-${exhibition.slug}-th`,
      title: exhibition.title.th,
      content: stripHtml(thContent + ' ' + exhibition.artist.th),
      keywords: `exhibition art show ${exhibition.artist.th} ${exhibition.dateDisplay.th} นิทรรศการ ศิลปะ`,
      page: 'exhibition-detail',
      slug: exhibition.slug,
      lang: 'th'
    });
  });

  // 5. Moving Image Programs
  movingImagePrograms.forEach(program => {
    // Get detail content from detailContent.ts instead of inline content
    const enContent = getDetailContentByLanguage(program.slug, 'en') || '';
    const thContent = getDetailContentByLanguage(program.slug, 'th') || '';
    
    // EN
    data.push({
      id: `moving-image-${program.id}-en`,
      title: program.title.en,
      content: stripHtml(enContent),
      keywords: `moving image film video cinema ${program.curator.en} ภาพยนตร์ วิดีโอ`,
      page: 'moving-image-detail',
      slug: program.slug,
      lang: 'en'
    });

    // TH
    data.push({
      id: `moving-image-${program.id}-th`,
      title: program.title.th,
      content: stripHtml(thContent),
      keywords: `moving image film video cinema ${program.curator.th} ภาพยนตร์ วิดีโอ ภาพเคลื่อนไหว`,
      page: 'moving-image-detail',
      slug: program.slug,
      lang: 'th'
    });
  });

  // 6. Blog Posts
  Object.values(MOCK_POSTS_BILINGUAL).forEach(postData => {
    // EN
    const enPost = postData.en;
    data.push({
      id: `blog-${enPost.slug}-en`,
      title: enPost.title,
      content: stripHtml(enPost.content),
      keywords: `blog article post ${enPost.author} ${enPost.categories.join(' ')} ${enPost.date} บทความ บล็อก`,
      page: 'blog-detail',
      slug: enPost.slug,
      lang: 'en'
    });

    // TH
    const thPost = postData.th;
    data.push({
      id: `blog-${thPost.slug}-th`,
      title: thPost.title,
      content: stripHtml(thPost.content),
      keywords: `blog article post ${thPost.author} ${thPost.categories.join(' ')} ${thPost.date} บทความ บล็อก`,
      page: 'blog-detail',
      slug: thPost.slug,
      lang: 'th'
    });
  });

  return data;
}