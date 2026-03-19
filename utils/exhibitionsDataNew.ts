import { WPPost } from './types';
import { getDetailContentByLanguage } from './detailContent';
export type ExhibitionWithStatus = Exhibition & { status: Status };
import { determineStatus, Status } from './dateStatusHelper';

export interface Exhibition {
  id: string;
  slug: string;
  title: {
    en: string;
    th: string;
  };
  artist: {
    en: string;
    th: string;
  };
  curator: {
    en: string;
    th: string;
  };
  fromDate: string;
  toDate: string;
  dateDisplay: {
    en: string;
    th: string;
  };
  year: string;
  status?: 'current' | 'upcoming' | 'past';
  imageCredits: string;
  featuredImage?: string;
  gallery?: string[];
  tags?: string;
}

function formatDateDisplay(fromDate: string, toDate: string): { en: string, th: string } {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthsTH = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  
  const from = new Date(fromDate);
  const to = new Date(toDate);
  
  const fromDay = from.getDate();
  const fromMonth = months[from.getMonth()];
  const fromMonthTH = monthsTH[from.getMonth()];
  const fromYear = from.getFullYear();
  const fromYearTH = fromYear + 543;
  
  const toDay = to.getDate();
  const toMonth = months[to.getMonth()];
  const toMonthTH = monthsTH[to.getMonth()];
  const toYear = to.getFullYear();
  const toYearTH = toYear + 543;
  
  // Check if it's ongoing
  if (toDate === 'Onwards') {
    return {
      en: `${fromDay} ${fromMonth} ${fromYear} - Onwards`,
      th: `${fromDay} ${fromMonthTH} ${fromYearTH} - เป็นต้นไป`
    };
  }
  
  return {
    en: `${fromDay} ${fromMonth} ${fromYear} - ${toDay} ${toMonth} ${toYear}`,
    th: `${fromDay} ${fromMonthTH} ${fromYearTH} - ${toDay} ${toMonthTH} ${toYearTH}`
  };
}

export const exhibitions: Exhibition[] = [
  {
    id: '1',
    slug: 'nine-plus-five-works',
    title: {
      en: 'Nine Plus Five Works',
      th: 'Nine Plus Five Works'
    },
    artist: {
      en: 'Michel Auder',
      th: 'มิเชล โอเดอร์'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย'
    },
    fromDate: '2024-01-12',
    toDate: '2024-03-10',
    dateDisplay: formatDateDisplay('2024-01-12', '2024-03-10'),
    year: '2024',
    status: 'past',
    imageCredits: 'Michel Auder, "Nine Plus Five Works", 2024. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Preecha Pattara and Samatcha Apaisuwan.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Nine+Plus+Five+Works+Opening-+Samatcha+Apaisuwan+23+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Flowers+of+Thailand-+2023-+installation+with+two+digital+video+4K-+color-+sound-+courtesy+of+the+artist.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Nine+Plus+Five+Works+Exhibition+Images-+Preecha+Pattara+31.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Nine+Plus+Five+Works+Opening-+Samatcha+Apaisuwan+23.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Nine+Plus+Five+Works+Opening-+Samatcha+Apaisuwan+31.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.1+Nine+Plus+Five+Works--Nine+Plus+Five+Works+Opening-+Samatcha+Apaisuwan+32.jpg'
    ],
    tags: 'Video art, Experimental film, France, Portraiture, Travelogue'
  },
  {
    id: '2',
    slug: 'nostalgia-for-unity',
    title: {
      en: 'nostalgia for unity',
      th: 'ความคิดถึงสำหรับความเป็นหนึ่งเดียว'
    },
    artist: {
      en: 'Korakrit Arunanondchai',
      th: 'กรกฤต อรุณานนท์ชัย'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย'
    },
    fromDate: '2024-05-31',
    toDate: '2024-10-31',
    dateDisplay: formatDateDisplay('2024-05-31', '2024-10-31'),
    year: '2024',
    status: 'past',
    imageCredits: 'Korakrit Arunanondchai, "nostalgia for unity", 2024. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Samatcha Apaisuwan.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.2+nostalgia+for+unity--nostalgia+for+unity-+Samatcha+Apaisuwan+1+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.2+nostalgia+for+unity--nostalgia+for+unity-+Artit+Punyanutaruk+10.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.2+nostalgia+for+unity--nostalgia+for+unity-+Artit+Punyanutaruk+20.jpg'
    ],
    tags: 'Site-specific, Installation, Thailand, Ritual, Ecology'
  },
  {
    id: '3',
    slug: 'mend-piece',
    title: {
      en: 'MEND PIECE',
      th: 'MEND PIECE'
    },
    artist: {
      en: 'Yoko Ono',
      th: 'โยโกะ โอโนะ'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย'
    },
    fromDate: '2024-08-30',
    toDate: '2024-12-22',
    dateDisplay: formatDateDisplay('2024-08-30', '2024-12-22'),
    year: '2024',
    status: 'past',
    imageCredits: 'Yoko Ono, "MEND PIECE", A4 Arts Foundation, Cape Town version, 1966/2018. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Andrea Rossetti.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.3+MEND+PIECE--Mend+Piece-+Andrea+Rossetti+2+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.3+MEND+PIECE--Mend+Piece-+Andrea+Rossetti+2.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.3+MEND+PIECE--Mend+Piece-+Andrea+Rossetti+11.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.3+MEND+PIECE--Mend+Piece-+Andrea+Rossetti+10.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.3+MEND+PIECE--Mend+Piece-+Andrea+Rossetti+3.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.3+MEND+PIECE--Mend+Piece-+Andrea+Rossetti+1.jpg'
    ],
    tags: 'Participatory art, Conceptual art, Fluxus, Healing, Community'
  },
  {
    id: '4',
    slug: 'like-nouns-slipping-into-verbs',
    title: {
      en: 'Like Nouns Slipping Into Verbs',
      th: 'เหมือนคำนามที่ลื่นไหลเข้าไปในคำกริยา'
    },
    artist: {
      en: 'Richard Nonas',
      th: 'ริชาร์ด โนนัส'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย'
    },
    fromDate: '2025-01-10',
    toDate: '2025-03-30',
    dateDisplay: formatDateDisplay('2025-01-10', '2025-03-30'),
    year: '2025',
    imageCredits: 'Richard Nonas, "Like Nouns Slipping Into Verbs", 2025. Installation view, Bangkok Kunsthalle. Courtesy of The Richard Nonas Estate and Bangkok Kunsthalle. Photo by Krittawat Atthsis and Puttisin Choojesroom.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.4+Like+Nouns+Slipping+Into+Verbs--Like+Nouns+Slipping+Into+Verbs-+Puttisin+Choojesroom+24+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.4+Like+Nouns+Slipping+Into+Verbs--Like+Nouns+Slipping+Into+Verbs-+Krittawat+Atthsis+17.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.4+Like+Nouns+Slipping+Into+Verbs--Like+Nouns+Slipping+Into+Verbs-+Puttisin+Choojesroom+24.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.4+Like+Nouns+Slipping+Into+Verbs--Like+Nouns+Slipping+Into+Verbs-+Krittawat+Atthsis+32.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.4+Like+Nouns+Slipping+Into+Verbs--Like+Nouns+Slipping+Into+Verbs-+Krittawat+Atthsis+49.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.4+Like+Nouns+Slipping+Into+Verbs--Like+Nouns+Slipping+Into+Verbs-+Krittawat+Atthsis+43.jpg'
    ],
    tags: 'Minimalism, Sculpture, Anthropological, Spatial, USA'
  },
  {
    id: '5',
    slug: 'calligraphic-abstraction',
    title: {
      en: 'Calligraphic Abstraction',
      th: 'นามธรรมแบบลายมือ'
    },
    artist: {
      en: 'Tang Chang',
      th: 'ตั้ง ช้าง'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนน์, และเจมมิกา สินถาวลัย'
    },
    fromDate: '2025-02-01',
    toDate: '2025-07-13',
    dateDisplay: formatDateDisplay('2025-02-01', '2025-07-13'),
    year: '2025',
    imageCredits: 'Tang Chang, \"Calligraphic Abstraction\", 2025. Installation view, Bangkok Kunsthalle. Courtesy of The Tang Chang Private Museum and Bangkok Kunsthalle. Photo by Puttisin Choojesroom.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.5+Calligraphic+Abstraction--Calligraphic+Abstraction-+Puttisin+Choojesroom+11+-+Copy.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.5+Calligraphic+Abstraction--Calligraphic+Abstraction-+Puttisin+Choojesroom+2.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.5+Calligraphic+Abstraction--Calligraphic+Abstraction-+Puttisin+Choojesroom+11.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.5+Calligraphic+Abstraction--Calligraphic+Abstraction-+Puttisin+Choojesroom+30.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.5+Calligraphic+Abstraction--Calligraphic+Abstraction-+Puttisin+Choojesroom+35.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.5+Calligraphic+Abstraction--Calligraphic+Abstraction-+Puttisin+Choojesroom+66.jpg'
    ],
    tags: 'Painting, Calligraphy, Abstract, Sino-Thai, Spirituality'
  },
  {
    id: '6',
    slug: 'painting-as-event',
    title: {
      en: 'Painting as Event',
      th: 'การวาดภาพในฐานะเหตุการณ์'
    },
    artist: {
      en: 'Xie Fan',
      th: 'เซี่ย ฟาน'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย'
    },
    fromDate: '2025-03-30',
    toDate: '2025-05-04',
    dateDisplay: formatDateDisplay('2025-03-30', '2025-05-04'),
    year: '2025',
    imageCredits: 'Xie Fan, "Painting as Event", 2025. Installation view, Bangkok Kunsthalle. Courtesy of the artist, Marguo, and Bangkok Kunsthalle. Photo by the artist, Puttisin Choojesroom, and Panusorn Lertvananont.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.6+Painting+as+Event--Xie+Fan-+Dining+Experience+Puttisin+9+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.6+Painting+as+Event--Painting+as+Event-+courtesy+of+Panusorn+Lertvananont+23.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.6+Painting+as+Event--Painting+as+Event-+courtesy+of+Panusorn+Lertvananont+17.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.6+Painting+as+Event--Painting+as+Event-+courtesy+of+the+artist+4.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.6+Painting+as+Event--Xie+Fan-+Dining+Experience+Puttisin+9.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.6+Painting+as+Event--Xie+Fan-+Dining+Experience+Puttisin+17.jpg'
    ],
    tags: 'Performance, Gastronomy, Ceramics, Materiality, China'
  },
  {
    id: '7',
    slug: 'poetics-of-horizontality',
    title: {
      en: 'Poetics of Horizontality',
      th: 'กวีนิพนธ์ของความเป็นแนวนอน'
    },
    artist: {
      en: 'Nalattaphorn Nanta and Siriwan Simingam',
      th: 'นลัทธพร นันทา และ สิริวรรณ สิมมิงแกม'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, แะเจมมิกา สินถาวลัย'
    },
    fromDate: '2025-05-09',
    toDate: '2025-08-22',
    dateDisplay: formatDateDisplay('2025-05-09', '2025-08-22'),
    year: '2025',
    imageCredits: 'Nalattaphorn Nanta and Siriwan Simingam, "Poetics of Horizontality", 2025. Installation view, Bangkok Kunsthalle. Courtesy of the artists and Bangkok Kunsthalle. Photo by Puttisin Choojesroom and Krittapas Lersvananont.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.7+Poetics+of+Horizontality--Poetics+of+Horizontality-+courtesy+of+Krittapas+Lersvananont+4+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.7+Poetics+of+Horizontality--Poetics+of+Horizontality-+Puttisin+Choojesroom+42.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.7+Poetics+of+Horizontality--Poetics+of+Horizontality-+Puttisin+Choojesroom+31.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.7+Poetics+of+Horizontality--Poetics+of+Horizontality-+Puttisin+Choojesroom+45.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.7+Poetics+of+Horizontality--Poetics+of+Horizontality-+Puttisin+Choojesroom+44.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.7+Poetics+of+Horizontality--Poetics+of+Horizontality-+courtesy+of+Krittapas+Lersvananont+4.jpg'
    ],
    tags: 'Thailand, Architecture, Memory, Pop-Surrealist, Care'
  },
  {
    id: '8',
    slug: 'this-page-is-intentionally-left-blank',
    title: {
      en: 'This page is intentionally left _____.',
      th: 'หน้านี้ถูกทิ้งไว้อย่างตั้งใจ _____.'
    },
    artist: {
      en: 'Nat Setthana, Anusorn Thanyapalit, Theetat Thunkijjanukij, and Krack! Printmaking Collective',
      th: 'ณัฐ เศรษฐนะ, อนุสรณ์ ธัญญะปลิต, ธีรทัศน์ ธรรมกิจจานุกิจ, และ Krack! Printmaking Collective'
    },
    curator: {
      en: 'Yoonglai Collective',
      th: 'ยุ้งหล้าย คอลเล็คทีฟ'
    },
    fromDate: '2025-06-13',
    toDate: '2025-08-17',
    dateDisplay: formatDateDisplay('2025-06-13', '2025-08-17'),
    year: '2025',
    imageCredits: 'Yoonglai Collective, \"This page is intentionally left _____.\", 2025. Installation view, Bangkok Kunsthalle. Courtesy of the curators, artists, and Bangkok Kunsthalle. Photo by Samatcha Apaisuwan and Puttisin Choojesroom.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--This+Page+is+Intentionally+Left+_____.-+Puttisin+Choojesroom+10.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--This+Page+is+Intentionally+Left+_____.-+Puttisin+Choojesroom+10.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--This+Page+is+Intentionally+Left+_____.-+Samatcha+Apaisuwan+28.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--This+Page+is+Intentionally+Left+_____.-+Samatcha+Apaisuwan+15.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--Anusorn+Thanyapalit-+Samatcha+Apaisuwan+21.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--Anusorn+Thanyapalit-+Samatcha+Apaisuwan+14.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--Anusorn+Thanyapalit-+Samatcha+Apaisuwan+11.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.8+This+page+is+intentionally+left+_____.--Nat+Setthana-+Samatcha+Apaisuwan+3.jpg'
    ],
    tags: 'Publishing, Language, Southeast Asia, Collective, Site-specific'
  },
  {
    id: '9',
    slug: 'mitta-del-santi',
    title: {
      en: 'Mitta del Santi',
      th: 'มิตตา เดล ซันตี'
    },
    artist: {
      en: 'Ploenchan Vinyaratn',
      th: 'เปลื้องจันทร์ วินญรัตน์'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, เจมมิกา สินถาวลัย'
    },
    fromDate: '2025-09-26',
    toDate: '2026-02-08',
    dateDisplay: formatDateDisplay('2025-09-26', '2026-02-08'),
    year: '2025',
    imageCredits: 'Ploenchan Vinyaratn, "Mitta del Santi", 2025. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Warun Wanapaiboon.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.9+Mitta+del+Santi--Mitta+del+Santi-+courtesy+of+Warun+Wanapaiboon+1+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.9+Mitta+del+Santi--Mitta+del+Santi-+courtesy+of+Warun+Wanapaiboon+8.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.9+Mitta+del+Santi--Mitta+del+Santi-+courtesy+of+Warun+Wanapaiboon+1.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.9+Mitta+del+Santi--Mitta+del+Santi-+courtesy+of+Warun+Wanapaiboon+13.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.9+Mitta+del+Santi--Mitta+del+Santi-+courtesy+of+Warun+Wanapaiboon+9.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.9+Mitta+del+Santi--Mitta+del+Santi-+courtesy+of+Warun+Wanapaiboon+3.jpg'
    ],
    tags: 'Textile, Sustainability, Thailand, Weaving, Ecological'
  },
  {
    id: '10',
    slug: 'vernacular-objects',
    title: {
      en: 'Vernacular Objects',
      th: 'วัตถุพื้นถิ่น'
    },
    artist: {
      en: '',
      th: ''
    },
    curator: {
      en: 'Mark Chearavanont',
      th: 'มาร์ค เชียรวนนท์'
    },
    fromDate: '2025-11-27',
    toDate: '2026-03-15',
    dateDisplay: formatDateDisplay('2025-11-27', '2026-03-15'),
    year: '2025',
    imageCredits: 'Mark Chearavanont, "Vernacular Objects", 2025. Installation view, Bangkok Kunsthalle. Courtesy of the curator and Bangkok Kunsthalle. Photo by Prapasiri Kasemkijkajorn.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.10+Vernacular+Objects--Vernacular+Objects-+Prapasiri+Kasemkijkajorn+58+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.10+Vernacular+Objects--Vernacular+Objects-+Prapasiri+Kasemkijkajorn+6.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.10+Vernacular+Objects--Vernacular+Objects-+Prapasiri+Kasemkijkajorn+35.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.10+Vernacular+Objects--Vernacular+Objects-+Prapasiri+Kasemkijkajorn+17.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.10+Vernacular+Objects--Vernacular+Objects-+Prapasiri+Kasemkijkajorn+49.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.10+Vernacular+Objects--Vernacular+Objects-+Prapasiri+Kasemkijkajorn+58.jpg'
    ],
    tags: 'Ready-made, Material culture, Thailand, Curatorial, Urban'
  },
  {
    id: '11',
    slug: 'description-without-place',
    title: {
      en: 'Description Without Place',
      th: 'คำอธิบายโดยปราศจากสถานที่'
    },
    artist: {
      en: 'Absalon',
      th: 'อับซาลอน'
    },
    curator: {
      en: 'Stefano Rabolli Pansera, Mark Chearavanont, Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา, มาร์ค เชียรวนนท์, และเจมมิกา สินถาวลัย'
    },
    fromDate: '2025-12-13',
    toDate: '2026-05-31',
    dateDisplay: formatDateDisplay('2025-12-13', '2026-05-31'),
    year: '2025',
    imageCredits: 'Absalon, "Description Without Place", 2025. Installation view, Bangkok Kunsthalle. Courtesy of The Estate of Absalon and Bangkok Kunsthalle. Photo by Samatcha Apaisuwan.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.11+Description+Without+Place--Description+Without+Place-+Samatcha+Apaisuwan+2+-+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.11+Description+Without+Place--Description+Without+Place-+Samatcha+Apaisuwan+5.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.11+Description+Without+Place--Description+Without+Place-+Samatcha+Apaisuwan+8.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.11+Description+Without+Place--Description+Without+Place-+Samatcha+Apaisuwan+40.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.11+Description+Without+Place--Description+Without+Place-+Samatcha+Apaisuwan+2.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.11+Description+Without+Place--Description+Without+Place-+Samatcha+Apaisuwan+48.jpg'
    ],
    tags: 'Architecture, Israel/France, Habitation, Sculpture, Philosophy'
  },
  {
    id: '12',
    slug: 'forever-love-soul-engine',
    title: {
      en: 'FOREVER LOVE SOUL ENGINE',
      th: 'FOREVER LOVE SOUL ENGINE'
    },
    artist: {
      en: 'Pansan Klongdee',
      th: 'ปันสรร คล้องดี'
    },
    curator: {
      en: 'Mark Chearavanont',
      th: 'มาร์ค เชียรวนนท์'
    },
    fromDate: '2026-02-06',
    toDate: '2026-03-15',
    dateDisplay: formatDateDisplay('2026-02-06', '2026-03-15'),
    year: '2026',
    imageCredits: 'Pansan Klongdee, "FOREVER LOVE SOUL ENGINE", 2026. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Samatcha Apaisuwan and Napat Roongrawewan.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.12+FOREVER+LOVE+SOUL+ENGINE--FOREVER+LOVE+SOUL+ENGINE-+Uncredt-10.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.12+FOREVER+LOVE+SOUL+ENGINE--FOREVER+LOVE+SOUL+ENGINE-+Samatcha+Apaisuwan+23.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.12+FOREVER+LOVE+SOUL+ENGINE--FOREVER+LOVE+SOUL+ENGINE-+Napat+Roongrawewan+28.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.12+FOREVER+LOVE+SOUL+ENGINE--FOREVER+LOVE+SOUL+ENGINE-+Samatcha+Apaisuwan+29.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.12+FOREVER+LOVE+SOUL+ENGINE--FOREVER+LOVE+SOUL+ENGINE-+Napat+Roongrawewan+29.jpg'
    ],
    tags: 'Sound art, Performance, Techno-animism, Thailand, Installation'
  },
  {
    id: '13',
    slug: 'blind-spots-panels-paravents-and-screens',
    title: {
      en: 'Blind Spots: Panels, Paravents and Screens',
      th: 'จุดบอด: แผง ฉากกั้น และจอ'
    },
    artist: {
      en: 'Apichaya Wannakit',
      th: 'อภิชญา วรรณกิจ'
    },
    curator: {
      en: 'Stefano Rabolli Pansera',
      th: 'สเตฟาโน ราบอลลี ปันเซรา'
    },
    fromDate: '2026-02-20',
    toDate: '2026-05-31',
    dateDisplay: formatDateDisplay('2026-02-20', '2026-05-31'),
    year: '2026',
    imageCredits: 'Apichaya Wannakit, "Blind Spots: Panels, Paravents and Screens", 2026, Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Ratsiree Rattanawan.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.13+Blind+Spots--On+the+tables-+Ratsiree+2+COVER.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.13+Blind+Spots--Blind+Spots-+Ratsiree+1.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.13+Blind+Spots--Another+Two-+Ratsiree+2.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.13+Blind+Spots--On+the+tables-+Ratsiree+2.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.13+Blind+Spots--By+the+river-+Ratsiree+2.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.13+Blind+Spots--Silence+eyes-+Ratsiree+1.jpg'
    ],
    tags: 'Painting, Thailand, Memory, Identity, Architecture'
  },
  {
    id: '14',
    slug: 'soul-searching',
    title: {
      en: 'Soul Searching',
      th: 'การค้นหาจิตวิญญาณ'
    },
    artist: {
      en: 'Rolf Sachs',
      th: 'โรล์ฟ ซัคส์'
    },
    curator: {
      en: 'Ponpavee Rittirongkhajorn',
      th: 'พลพวี ฤทธิ์รองขจร'
    },
    fromDate: '2026-02-05',
    toDate: '2026-04-19',
    dateDisplay: formatDateDisplay('2026-02-05', '2026-04-19'),
    year: '2026',
    imageCredits: 'Rolf Sachs, "Soul Searching", 2026, Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Krittawat Atthsis and Preecha Pattara.',
    featuredImage: 'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.14+Soul+Searching--%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87+Bangkok+portraits-595.jpg',
    gallery: [
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.14+Soul+Searching--%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87+Bangkok+portraits-595.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.14+Soul+Searching--%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87+untitled-42.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.14+Soul+Searching--Rolf+Sachs-+Krittawat+22.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.14+Soul+Searching--Rolf+Sachs-+Preecha+Pattara+9.jpg',
      'https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.14+Soul+Searching--Rolf+Sachs-+Preecha+Pattara+27.jpg'
    ],
    tags: 'Photography, Portraiture, Switzerland, Participatory, Community'
  },
  {
    id: '15',
    slug: 'splendor-in-the-city',
    title: {
      en: 'Splendor in the City',
      th: 'ความรุ่งเรืองในเมือง'
    },
    artist: {
      en: 'Mafalda von Hessen',
      th: 'มาฟัลดา ฟอน เฮสเซน'
    },
    curator: {
      en: 'Ponpavee Rittirongkhajorn',
      th: 'พลพวี ฤทธิ์รองขจร'
    },
    fromDate: '2026-02-05',
    toDate: '2026-04-19',
    dateDisplay: formatDateDisplay('2026-02-05', '2026-04-19'),
    year: '2026',
    imageCredits: 'Mafalda von Hessen, "Splendor in the City", 2026, Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Krittawat Atthsis and Preecha Pattara.',
    featuredImage: 'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.15+Splendor+in+the+City--Mafalda-+Preecha+Pattara+3+COVER-1920w.jpg',
    gallery: [
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.15+Splendor+in+the+City--Mafalda-+Preecha+Pattara+3-1920w.jpg',
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.15+Splendor+in+the+City--Mafalada-+Ponpavee+1-1920w.jpg',
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.15+Splendor+in+the+City--Mafalda-+Krittawat+Atthsis+12-1920w.jpg',
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.15+Splendor+in+the+City--Mafalda-+Preecha+Pattara+19-1920w.jpg',
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.15+Splendor+in+the+City--Mafalda-+Krittawat+Atthsis+14-1920w.jpg'
    ],
    tags: 'Painting, Germany, Urban ecology, Materiality, Observation'
  },
  {
    id: '16',
    slug: 'a-bit-fountain-and-a-bit-not',
    title: {
      en: 'A Bit Fountain and a Bit Not',
      th: 'น้ำพุนิดหน่อยและไม่ใช่นิดหน่อย'
    },
    artist: {
      en: 'Not Vital',
      th: 'นอต ไวทัล'
    },
    curator: {
      en: 'Stefano Rabolli Pansera and Gemmica Sinthawalai',
      th: 'สเตฟาโน ราบอลลี ปันเซรา และเจมมิกา สินถาวลัย'
    },
    fromDate: '2026-03-07',
    toDate: 'Onwards',
    dateDisplay: formatDateDisplay('2026-03-07', 'Onwards'),
    year: '2026',
    imageCredits: 'Not Vital, \"A Bit Fountain and a Bit Not\", 2026, Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Krittawat Atthsis and Preecha Pattara.',
    featuredImage: 'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.16+A+Bit+Fountain+and+a+Bit+Not--A+Bit+Fountain+and+a+Bit+Not+1+COVER-1920w.jpg',
    gallery: [
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.16+A+Bit+Fountain+and+a+Bit+Not--A+Bit+Fountain+and+a+Bit+Not+1-1920w.jpg',
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.16+A+Bit+Fountain+and+a+Bit+Not--A+Bit+Fountain+and+a+Bit+Not+3-1920w.jpg',
      'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-3.+Exhibition-3.16+A+Bit+Fountain+and+a+Bit+Not--A+Bit+Fountain+and+a+Bit+Not+2-1920w.jpg'
    ],
    tags: 'Installation, Switzerland, Water, Architecture, Permanent'
  },
  {
    id: '17',
    slug: 'dial-a-poem-thailand',
    title: {
      en: 'Dial-A-Poem Thailand',
      th: 'Dial-A-Poem Thailand'
    },
    artist: {
      en: '',
      th: ''
    },
    curator: {
      en: '',
      th: ''
    },
    fromDate: '2026-04-10',
    toDate: '2026-07-31',
    dateDisplay: formatDateDisplay('2026-04-10', '2026-07-31'),
    year: '2026',
    status: 'upcoming',
    imageCredits: '',
    featuredImage: '',
    gallery: [],
    tags: 'Poetry, Sound art, Thailand, Interactive, Communication'
  }
];

// Helper function to convert Exhibition to WPPost format
export function exhibitionToWPPost(exhibition: Exhibition, language: 'en' | 'th'): WPPost {
  // Get detail content from detailContent.ts based on language
  const content = getDetailContentByLanguage(exhibition.slug, language) || '';
  
  return {
    id: exhibition.id,
    type: 'exhibition' as const,
    title: exhibition.title[language],
    slug: exhibition.slug,
    content: content,
    featuredImage: (exhibition.featuredImage || exhibition.gallery?.[0]) ? { sourceUrl: exhibition.featuredImage || exhibition.gallery![0], altText: exhibition.title[language] } : undefined,
    date: exhibition.dateDisplay[language],
    categories: ['Exhibition'],
    gallery: exhibition.gallery,
    acf: {
      artist: exhibition.artist[language],
      curator: exhibition.curator[language],
      imageCredits: exhibition.imageCredits
    }
  };
}

// Helper function to get all exhibitions with computed status
export function getExhibitionsWithStatus(): ExhibitionWithStatus[] {
  return exhibitions.map(exhibition => ({
    ...exhibition,
    status: determineStatus(exhibition.fromDate, exhibition.toDate)
  }));
}

// Helper function to get exhibition by slug with computed status
export function getExhibitionBySlug(slug: string): ExhibitionWithStatus | undefined {
  const exhibition = exhibitions.find(ex => ex.slug === slug);
  if (!exhibition) return undefined;
  
  return {
    ...exhibition,
    status: determineStatus(exhibition.fromDate, exhibition.toDate)
  };
}

// Helper function to filter exhibitions by status
export function getExhibitionsByStatus(status: Status): ExhibitionWithStatus[] {
  return getExhibitionsWithStatus().filter(ex => ex.status === status);
}

// Helper function to get current exhibition(s)
export function getCurrentExhibitions(): ExhibitionWithStatus[] {
  return getExhibitionsByStatus('current');
}

// Helper function to get upcoming exhibitions
export function getUpcomingExhibitions(): ExhibitionWithStatus[] {
  return getExhibitionsByStatus('upcoming');
}

// Helper function to get past exhibitions
export function getPastExhibitions(): ExhibitionWithStatus[] {
  return getExhibitionsByStatus('past');
}