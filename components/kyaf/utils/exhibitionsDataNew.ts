/**
 * Exhibitions Data Architecture
 * Following DATA_ARCHITECTURE_DETAIL_LISTING.md patterns
 */

import { formatDateDisplay, formatDateRange } from './dateHelpers';
import { IMG_GOD_ASSET, IMG_MUSIC_ON_THE_MOVE_ASSET } from "./imageConstants";

/**
 * Exhibition Interface (Modern Bilingual Structure)
 */
export interface Exhibition {
  // Identifiers
  id: string;
  slug: string;
  
  // Bilingual Content
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
  
  // Date display
  dateDisplay: {
    en: string;
    th: string;
  };
  
  // Status & Classification
  status: 'current' | 'upcoming' | 'past';
  year: string;
  
  // Categories
  categories: {
    en: string[];
    th: string[];
  };
  
  // Media
  featuredImage: string;
  gallery?: string[];
  imageCredits: string;
  
  // Preview text for listings
  listingSummary: {
    en: string;
    th: string;
  };
  
  // Additional metadata
  tags?: {
    en: string[];
    th: string[];
  };
  specifications?: {
    en: Record<string, string>;
    th: Record<string, string>;
  };
}

// Image constants
const IMG_MADRID = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.7+Madrid+Circle--Madrid+Circle-+drone+images-+uncredit+1-20923d09-1920w.jpg";
const IMG_FOG = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.3+Khao+Yai+Fog+Forest--Fog+Forest-+Chittawan+Limcharoen+COVER-c7dba651-1920w.jpg";
const IMG_ARAYA = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.2+Two+Planets+Series--Two+Planets+Series-+Krittawat+and+Puttisin+2+COVER-16547eea-1920w.jpg";
const IMG_MAMAN = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.1+Maman--Maman-+Andrea+Rossetti+4+COVER-1d82473f-1920w.jpg";
const IMG_KBAR = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.4+K-BAR--K-BAR-+Krittawat+and+Puttisin+9+-+Copy-56978dd7-1920w.jpg";
const IMG_PULSUS = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.8+Pulsus+Vitae--Pulsus+Vitae-+Ratsiree+Rattanawan+2+COVER-883ca6cf-1920w.jpg";
const IMG_GOD = "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.5+GOD--God-+Andrea+Rossetti+2+COVER-e46b7ff7-1920w.jpg";
const IMG_LIGHT = IMG_FOG; // Reuse for past exhibition

/**
 * Exhibitions Data
 * All exhibitions with proper bilingual structure
 */
export const exhibitions: Exhibition[] = [
  // ═══════════════════════════════════════════════════════
  // CURRENT EXHIBITIONS
  // ═══════════════════════════════════════════════════════
  {
    id: "1",
    slug: "madrid-circle",
    title: {
      en: "Madrid Circle",
      th: "Madrid Circle"
    },
    artist: {
      en: "Richard Long",
      th: "ริชาร์ด ลอง"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan, Chonnipa Pokachaiyapat",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ, ชลนิภา โพธาไชยพัฒน์"
    },
    dateDisplay: {
      en: "Permanent",
      th: "ถาวร"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Land Art', 'Installation', 'Richard Long'],
      th: ['ศิลปะภูมิประเทศ', 'ศิลปะจัดวาง', 'ริชาร์ด ลอง']
    },
    featuredImage: IMG_MADRID,
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.7+Madrid+Circle--Madrid+Circle-+drone+images-+uncredit+1-20923d09-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.7+Madrid+Circle--Madrid+Circle-+Nawaphon+Phokrachang+4-31ed8dfd-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.7+Madrid+Circle--Madrid+Circle-+Andrea+Rossetti+3-4dc293b4-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.7+Madrid+Circle--Madrid+Circle-+Andrea+Rossetti+2-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.7+Madrid+Circle--Madrid+Circle-+Nut+Fotofixed+3-454080ee-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.7+Madrid+Circle--Madrid+Circle-+Chittawan+Limcharoen+3-3511e0a2-1920w.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Chittawan Limcharoen, Chinnakit Ruenma, and Nawaphon Phokrachang",
    listingSummary: {
      en: "A perfect circle of slate slabs placed on a plateau delivering an interpretation of Infinity.",
      th: "วงกลมสมบูรณ์ของแผ่นหินชนวนที่วางอยู่บนที่ราบสูง สื่อถึงความเป็นอนันต์"
    },
    tags: {
      en: ["Land Art", "Richard Long", "Slate Sculpture", "Minimalism", "Buddhist Art", "Infinity", "Outdoor Installation", "Contemporary Art", "Khao Yai Art", "Meditation"],
      th: ["ศิลปะภูมิประเทศ", "ริชาร์ด ลอง", "ประติมากรรมหินชนวน", "มินิมอล", "ศิลปะพุทธ", "อนันต์", "ศิลปะจัดวางกลางแจ้ง", "ศิลปะร่วมสมัย", "ศิลปะเขาใหญ่", "การทำสมาธิ"]
    },
    specifications: {
      en: { "material": "Slate slabs", "location": "High plateau overlook", "theme": "Geological vs Earthling time" },
      th: { "วัสดุ": "แผ่นหินชนวน", "สถานที่": "จุดชมวิวบนที่ราบสูง", "ธีม": "เวลาทางธรณีวิทยา vs เวลาของมนุษย์" }
    }
  },
  {
    id: "2",
    slug: "khao-yai-fog-forrest",
    title: {
      en: "Khao Yai Fog Forest",
      th: "ป่าหมอกเขาใหญ่"
    },
    artist: {
      en: "Fujiko Nakaya",
      th: "ฟูจิโกะ นากายะ"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan, Chonnipa Pokachaiyapat",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ, ชลนิภา โพธาไชยพัฒน์"
    },
    dateDisplay: {
      en: "Permanent (Activates 3x daily)",
      th: "ถาวร (ทำงาน 3 ครั้งต่อวัน)"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Fog Sculpture', 'Installation', 'Fujiko Nakaya'],
      th: ['ประติมากรรมหมอก', 'ศิลปะจัดวาง', 'ฟูจิโกะ นากายะ']
    },
    featuredImage: IMG_FOG,
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.3+Khao+Yai+Fog+Forest--Fog+Forest-+Nawaphon+7-9d59518f-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.3+Khao+Yai+Fog+Forest--Fog+Forest-+Chinnakit+Ruenma+2-d5883836-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.3+Khao+Yai+Fog+Forest--Fog+Forest-+Andrea+Rossetti+5-4db5c43c-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions--Fog+Forest-+Andrea+Rossetti+5-8cfccc3d-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.3+Khao+Yai+Fog+Forest--Fog+Forest-+Ratsiree+Rattanawan+5-0ae1fb88-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.3+Khao+Yai+Fog+Forest--Fog+Forest-+Nut+Fotofixed+8-fa797dad-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.3+Khao+Yai+Fog+Forest--Fog+Forest-+Chittawan+Limcharoen+9-6cddc9f2-1920w.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Nawaphon Phokrachang, Chittawan Limcharoen, Nut Fotofixed, and Ratsiree Rattanawan",
    listingSummary: {
      en: "A 'fog sculpture' that activates three times a day to produce an intense water mist.",
      th: "ประติมากรรมหมอกที่จะทำงานสามครั้งต่อวันเพื่อสร้างละอองน้ำหนาทึบ"
    },
    tags: {
      en: ["Fog Sculpture", "Fujiko Nakaya", "Interactive Art", "Japanese Artist", "Sustainable Art", "Landscape Architecture", "Atmospheric Art", "Immersive Experience", "Khao Yai Fog", "Eco-friendly"],
      th: ["ประติมากรรมหมอก", "ฟูจิโกะ นากายะ", "ศิลปะเชิงโต้ตอบ", "ศิลปินญี่ปุ่น", "ศิลปะยั่งยืน", "สถาปัตยกรรมภูมิทัศน์", "ศิลปะบรรยากาศ", "ประสบการณ์ดื่มด่ำ", "หมอกเขาใหญ่", "เป็นมิตรกับสิ่งแวดล้อม"]
    },
    specifications: {
      en: { "duration": "20-minute intervals", "technology": "Atmospheric water generator", "architect": "Atsushi Kitagawara Architects" },
      th: { "ระยะเวลา": "ช่วงละ 20 นาที", "เทคโนโลยี": "เครื่องกำเนิดน้ำจากบรรยากาศ", "สถาปนิก": "Atsushi Kitagawara Architects" }
    }
  },
  {
    id: "3",
    slug: "god",
    title: {
      en: "GOD",
      th: "GOD"
    },
    artist: {
      en: "Francesco Arena",
      th: "ฟรานเชสโก อารีนา"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan, Chonnipa Pokachaiyapat",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ, ชลนิภา โพธาไชยพัฒน์"
    },
    dateDisplay: {
      en: "Permanent",
      th: "ถาวร"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Sculpture', 'Conceptual', 'Francesco Arena'],
      th: ['ประติมากรรม', 'ศิลปะเชิงแนวคิด', 'ฟรานเชสโก อารีนา']
    },
    featuredImage: IMG_GOD,
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.5+GOD--God-+Krittawat+Atthsis+and+Puttisin+Choojesroom+3-3f75a7fb-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.5+GOD--God-+Andrea+Rossetti+4-cdd63439-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.5+GOD--God-+Chinnakit+Ruenma+3-2988be7d-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.5+GOD--God-+Nut+Fotofixed+7-7f488e6b-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.5+GOD--AF-152-abe088f2-1920w.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Chinnakit Ruenma, Chittawan Limcharoen, Krittawat Atthsis, and Puttisin Choojesroom",
    listingSummary: {
      en: "A conceptual sculpture where the word 'GOD' becomes hidden inside stone.",
      th: "ประติมากรรมเชิงแนวคิดที่คำว่า 'GOD' ถูกซ่อนอยู่ในหิน"
    },
    tags: {
      en: ["Francesco Arena", "Conceptual Art", "Limestone Sculpture", "Italian Artist", "Minimalist Art", "Divine Concept", "Public Art", "Site Specific", "Sculpture", "Abstract Art"],
      th: ["ฟรานเชสโก อารีนา", "ศิลปะเชิงแนวคิด", "ประติมากรรมหินปูน", "ศิลปินอิตาลี", "ศิลปะมินิมอล", "แนวคิดเกี่ยวกับเทพเจ้า", "ศิลปะสาธารณะ", "เฉพาะพื้นที่", "ประติมากรรม", "ศิลปะนามธรรม"]
    },
    specifications: {
      en: { "material": "Limestone", "concept": "Invisible divinity", "installation": "Forest floor" },
      th: { "วัสดุ": "หินปูน", "แนวคิด": "ความเป็นเทพเจ้าที่มองไม่เห็น", "การติดตั้ง": "พื้นป่า" }
    }
  },
  {
    id: "4",
    slug: "two-planets-series",
    title: {
      en: "Two Planets Series",
      th: "ชุดผลงาน Two Planets"
    },
    artist: {
      en: "Araya Rasdjarmrearnsook",
      th: "อารยา ราษฎร์จำเริญสุข"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan, Chonnipa Pokachaiyapat",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ, ชลนิภา โพธาไชยพัฒน์"
    },
    dateDisplay: {
      en: "Permanent",
      th: "ถาวร"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Video Installation', 'Social', 'Araya Rasdjarmrearnsook'],
      th: ['วิดีโอจัดวาง', 'สังคม', 'อารยา ราษฎร์จำเริญสุข']
    },
    featuredImage: IMG_ARAYA,
    gallery: [
     
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.2+Two+Planets+Series--Two+Planets+Series-+Andrea+Rossetti+2-3dd84dc5.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Krittawat Atthsis, Puttisin Choojesroom, and Chinnakit Ruenma",
    listingSummary: {
      en: "Video installations showing reactions of locals to reproductions of worldwide masterpieces.",
      th: "วิดีโอจัดวางที่แสดงปฏิกิริยาของชาวบ้านต่อผลงานศิลปะระดับโลก"
    },
    tags: {
      en: ["Araya Rasdjarmrearnsook", "Video Art", "Thai Contemporary Art", "Mise en Abyme", "Cultural Dialogue", "Masterpiece Parody", "Social Experiment", "Art Film", "Southeast Asian Art", "Digital Media"],
      th: ["อารยา ราษฎร์จำเริญสุข", "วิดีโออาร์ต", "ศิลปะร่วมสมัยไทย", "Mise en Abyme", "บทสนทนาทางวัฒนธรรม", "ล้อเลียนงานมาสเตอร์พีซ", "การทดลองทางสังคม", "ภาพยนตร์ศิลปะ", "ศิลปะเอเชียตะวันออกเฉียงใต้", "สื่อดิจิทัล"]
    },
    specifications: {
      en: { "medium": "Video installation", "featured_works": "Manet, Millet", "location": "Outdoor screening in forest" },
      th: { "สื่อ": "วิดีโอจัดวาง", "ผลงานที่นำเสนอ": "Manet, Millet", "สถานที่": "การฉายภาพกลางแจ้งในป่า" }
    }
  },
  {
    id: "5",
    slug: "pulsus-vitae",
    title: {
      en: "Pulsus Vitae",
      th: "Pulsus Vitae"
    },
    artist: {
      en: "Scenocosme",
      th: "Scenocosme"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ"
    },
    dateDisplay: {
      en: "Permanent",
      th: "ถาวร"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Interactive', 'Sound', 'Bio-feedback'],
      th: ['ศิลปะเชิงโต้ตอบ', 'เสียง', 'การตอบสนองทางชีวภาพ']
    },
    featuredImage: IMG_PULSUS,
    gallery: [
      
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.8+Pulsus+Vitae--Pulsus+Vitae-+Ratsiree+Rattanawan+3-e99b8676.jpg"
    ],
    imageCredits: "Photo by Chittawan Limcharoen and Ratsiree Rattanawan",
    listingSummary: {
      en: "A sound installation that features a living tree acting as a bridge between earth and sky.",
      th: "ศิลปะจัดวางเสียงที่มีต้นไม้มีชีวิตทำหน้าที่เป็นสะพานเชื่อมระหว่างโลกและท้องฟ้า"
    },
    tags: {
      en: ["Bio-feedback", "Interactive Sound", "Nature Art", "Heartbeat Sync", "Digital Arts", "Environmental Art", "Sensory Experience", "Bio-Art", "Forest Healing", "Technological Art"],
      th: ["ไบโอฟีดแบ็ค", "เสียงเชิงโต้ตอบ", "ศิลปะธรรมชาติ", "การประสานจังหวะหัวใจ", "ศิลปะดิจิทัล", "ศิลปะสิ่งแวดล้อม", "ประสบการณ์ทางประสาทสัมผัส", "Bio-Art", "การบำบัดด้วยป่า", "ศิลปะเทคโนโลยี"]
    },
    specifications: {
      en: { "medium": "Bio-feedback / Sound", "interaction": "Tactile / Auditory", "theme": "Interconnectivity" },
      th: { "สื่อ": "ไบโอฟีดแบ็ค / เสียง", "การโต้ตอบ": "การสัมผัส / การได้ยิน", "ธีม": "ความเชื่อมโยงระหว่างกัน" }
    }
  },
  {
    id: "6",
    slug: "k-bar",
    title: {
      en: "K-BAR",
      th: "K-BAR"
    },
    artist: {
      en: "Elmgreen & Dragset",
      th: "เอล์มกรีน และ แดร็กเซ็ต"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan, Chonnipa Pokachaiyapat",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ, ชลนิภา โพธาไชยพัฒน์"
    },
    dateDisplay: {
      en: "Permanent",
      th: "ถาวร"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Installation', 'Mixed Media', 'Land Art'],
      th: ['ศิลปะจัดวาง', 'สื่อผสม', 'ศิลปะภูมิประเทศ']
    },
    featuredImage: IMG_KBAR,
    gallery: [
      
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.4+K-BAR--K-BAR-+Krittawat+and+Puttisin+15-a159cc93.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Chinnakit Ruenma, Rungkit Tangtongpon, Nut Fotofixed, Krittawat Atthsis, and Puttisin Choojesroom",
    listingSummary: {
      en: "An intimate bar installation that oscillates between invitation and refusal, transforming hospitality into contemplation.",
      th: "ผลงานจัดวางบาร์ที่สลับกันระหว่างคำเชิญและการปฏิเสธ เปลี่ยนความเป็นน้ำหนึ่งใจเดียวกันให้กลายเป็นการไตร่ตรอง"
    },
    tags: {
      en: ["Elmgreen & Dragset", "Installation", "Mixed Media", "Land Art", "Conceptual Art", "Site-Specific", "Martin Kippenberger", "Scandinavian Art", "Contemporary Art"],
      th: ["เอล์มกรีน และ แดร็กเซ็ต", "ศิลปะจัดวาง", "สื่อผสม", "ศิลปะภูมิประเทศ", "ศิลปะเชิงแนวคิด", "เฉพาะพื้นที่", "มาร์ติน คิปเพนแบร์เกอร์", "ศิลปะสแกนดิเนเวีย", "ศิลปะร่วมสมัย"]
    },
    specifications: {
      en: { "material": "Mixed Media", "capacity": "6 guests", "opening": "Second Saturday of each month" },
      th: { "วัสดุ": "สื่อผสม", "ความจุ": "6 ท่าน", "เปิด": "วันเสาร์ที่สองของทุกเดือน" }
    }
  },
  {
    id: "7",
    slug: "pilgrimage-to-eternity",
    title: {
      en: "Pilgrimage to Eternity",
      th: "การแสวงบุญสู่นิรันดร"
    },
    artist: {
      en: "ubatsat",
      th: "อุบาสก"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan, Chonnipa Pokachaiyapat",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ, ชลนิภา โพธาไชยพัฒน์"
    },
    dateDisplay: {
      en: "Permanent",
      th: "ถาวร"
    },
    status: 'current',
    year: "2024",
    categories: {
      en: ['Land Art 2.0', 'Site-Specific', 'Buddhist Philosophy'],
      th: ['ศิลปะภูมิประเทศ 2.0', 'เฉพาะพื้นที่', 'ปรัชญาพุทธ']
    },
    featuredImage: IMG_GOD, // Placeholder - reusing GOD image
    gallery: [
     
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.6+Pilgrimage+to+Eternity--Pilgrimage+to+Eternity-+Krittawat+-+Puttisin+25-55f3c7c1.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Nut Fotofixed, Krittawat Atthsis, and Puttisin Choojesroom",
    listingSummary: {
      en: "Nine sculptural elements that form a deconstructed stupa, inviting a pilgrimage through the forest.",
      th: "องค์ประกอบประติมากรรม 9 ชิ้นที่ประกอบเป็นเจดีย์แบบถอดออก เชิญชวนให้แสวงบุญผ่านป่า"
    },
    tags: {
      en: ["ubatsat", "Thai Artist", "Land Art 2.0", "Buddhist Philosophy", "Stupa", "Impermanence", "Site-Specific", "Conceptual Art", "Thai Contemporary Art"],
      th: ["อุบาสก", "ศิลปินไทย", "ศิลปะภูมิประเทศ 2.0", "ปรัชญาพุทธ", "เจดีย์", "ความไม่เที่ยง", "เฉพาะพื้นที่", "ศิลปะเชิงแนวคิด", "ศิลปะร่วมสมัยไทย"]
    },
    specifications: {
      en: { "material": "Mixed Media", "elements": "9 sculptures", "theme": "Anicca (Impermanence)" },
      th: { "วัสดุ": "สื่อผสม", "องค์ประกอบ": "ประติมากรรม 9 ชิ้น", "ธีม": "อนิจจัง (ความไม่เที่ยง)" }
    }
  },
  {
    id: "8",
    slug: "maman",
    title: {
      en: "Maman",
      th: "Maman"
    },
    artist: {
      en: "Louise Bourgeois",
      th: "หลุยส์ บูร์ชัวส์"
    },
    curator: {
      en: "Stefano Rabolli Pansera, Ratsiree Rattanawan, Chonnipa Pokachaiyapat",
      th: "สเตฟาโน ราโบลลี พันเซรา, รัตน์ศิรี รัตนวรรณ, ชลนิภา โพธาไชยพัฒน์"
    },
    dateDisplay: {
      en: "August 2024 - 2025",
      th: "สิงหาคม 2024 - 2025"
    },
    status: 'past',
    year: "2024",
    categories: {
      en: ['Sculpture', 'Monumental', 'Louise Bourgeois'],
      th: ['ประติมากรรม', 'ขนาดใหญ่', 'หลุยส์ บูร์ชัวส์']
    },
    featuredImage: IMG_MAMAN,
    gallery: [
     
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Khao+Yai+Art+Forest+Images+for+Website-3.+Exhibitions-3.1+Maman--Maman-+Krittawat+and+Puttisin+1%281%29-e747e931.jpg"
    ],
    imageCredits: "Photo by Andrea Rossetti, Nawaphon Phokrachang, Rungkit tungtongpol, Pongsakorn Sukreuangrong, Krittawat Atthsis, and Puttisin Choojesroom",
    listingSummary: {
      en: "The iconic monumental spider sculpture symbolizing the artist's mother.",
      th: "ประติมกรรมแมงมุมขนาดใหญ่ที่เป็นสัญลักษณ์ สื่อถึงแม่ของศิลปิน"
    },
    tags: {
      en: ["Louise Bourgeois", "Maman Sculpture", "Spider Art", "Bronze Sculpture", "Feminist Art", "Iconic Art", "Public Installation", "Maternal Theme", "Modern Art", "Pak Chong Art"],
      th: ["หลุยส์ บูร์ชัวส์", "ประติมากรรม Maman", "ศิลปะแมงมุม", "ประติมากรรมสำริด", "ศิลปะสตรีนิยม", "ศิลปะที่เป็นสัญลักษณ์", "ศิลปะจัดวางสาธารณะ", "ธีมความเป็นแม่", "ศิลปะสมัยใหม่", "ศิลปะปากช่อง"]
    },
    specifications: {
      en: { "material": "Bronze, stainless steel, marble", "height": "9 meters", "location": "Entrance area (Public access)" },
      th: { "วัสดุ": "สำริด, สแตนเลส, หินอ่อน", "ความสูง": "9 เมตร", "สถานที่": "บริเวณทางเข้า (เข้าชมได้ทั่วไป)" }
    }
  },

  // ═══════════════════════════════════════════════════════
  // PAST EXHIBITIONS
  // ═══════════════════════════════════════════════════════
  {
    id: "9",
    slug: "light-shadow-2025",
    title: {
      en: "Light & Shadow",
      th: "แสงและเงา (Light & Shadow)"
    },
    artist: {
      en: "Elena Vora",
      th: "เอเลนา โวรา"
    },
    curator: {
      en: "Curated by Stefano Rabolli Pansera",
      th: "ภัณฑารักษ์โดย สเตฟาโน ราโบลลี พันเซรา"
    },
    dateDisplay: {
      en: "Past Exhibition (Nov 2025)",
      th: "นิทรรศการที่ผ่านมา (พ.ย. 2025)"
    },
    status: 'past',
    year: "2025",
    categories: {
      en: ['Installation', 'Light Art', 'Site-Specific'],
      th: ['ศิลปะจัดวาง', 'ศิลปะแสง', 'เฉพาะพื้นที่']
    },
    featuredImage: IMG_LIGHT,
    gallery: [IMG_LIGHT],
    imageCredits: "Archive",
    listingSummary: {
      en: "An immersive light installation that transformed the forest into a luminous dreamscape.",
      th: "ศิลปะจัดวางแสงแบบอิมเมอร์ซีฟที่เปลี่ยนผืนป่าให้กลายเป็นดินแดนแห่งความฝันอันสว่างไสว"
    },
    tags: {
      en: ["Light Art", "Elena Vora", "Night Exhibition", "Projection Mapping", "Forest Art", "Immersive", "Site-specific"],
      th: ["ศิลปะแสง", "เอเลนา โวรา", "นิทรรศการกลางคืน", "Projection Mapping", "ศิลปะป่า", "Immersive", "เฉพาะพื้นที่"]
    },
    specifications: {
      en: { "technology": "LED & Projection", "duration": "Nightly 18:00 - 22:00", "location": "Bamboo Grove" },
      th: { "เทคโนโลยี": "LED และการฉายภาพ", "ระยะเวลา": "ทุกคืน 18:00 - 22:00", "สถานที่": "สวนไผ่" }
    }
  },
  {
    id: "10",
    slug: "earth-tones-2025",
    title: {
      en: "Earth Tones",
      th: "เอิร์ธโทน (Earth Tones)"
    },
    artist: {
      en: "Somsak Chai",
      th: "สมศักดิ์ ชัย"
    },
    curator: {
      en: "Curated by Stefano Rabolli Pansera",
      th: "ภัณฑารักษ์โดย สเตฟาโน ราโบลลี พันเซรา"
    },
    dateDisplay: {
      en: "Past Exhibition (Oct 2025)",
      th: "นิทรรศการที่ผ่านมา (ต.ค. 2025)"
    },
    status: 'past',
    year: "2025",
    categories: {
      en: ['Ceramics', 'Sculpture', 'Nature'],
      th: ['เซรามิก', 'ประติมากรรม', 'ธรรมชาติ']
    },
    featuredImage: IMG_FOG,
    gallery: [IMG_FOG],
    imageCredits: "Archive",
    listingSummary: {
      en: "A collection of ceramic sculptures fired in open pits, reflecting the raw elements of nature.",
      th: "คอลเลกชันประติมากรรมเซรามิกที่ผ่านการเผาในหลุมเปิด สะท้อนถึงธาตุแท้ของธรรมชาติ"
    },
    tags: {
      en: ["Ceramics", "Somsak Chai", "Clay Art", "Natural Materials", "Sculpture", "Thai Artist", "Process Art"],
      th: ["เซรามิก", "สมศักดิ์ ชัย", "ศิลปะดินเหนียว", "วัสดุธรรมชาติ", "ประติมากรรม", "ศิลปินไทย", "Process Art"]
    },
    specifications: {
      en: { "material": "Local Clay", "technique": "Pit Firing", "location": "Open Field" },
      th: { "วัสดุ": "ดินท้องถิ่น", "เทคนิค": "การเผาแบบหลุม", "สถานที่": "ลานกลางแจ้ง" }
    }
  }
];

/**
 * Get exhibition by slug
 */
export function getExhibitionBySlug(slug: string): Exhibition | undefined {
  return exhibitions.find(ex => ex.slug === slug);
}

/**
 * Get exhibitions by status
 */
export function getExhibitionsByStatus(status: 'current' | 'upcoming' | 'past'): Exhibition[] {
  return exhibitions.filter(ex => ex.status === status);
}

/**
 * Get all exhibitions for a specific year
 */
export function getExhibitionsByYear(year: string): Exhibition[] {
  return exhibitions.filter(ex => ex.year === year);
}