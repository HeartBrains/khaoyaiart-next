import { getDetailContent } from './detailContent';
import { getDetailContentThai } from './detailContentThaiData';

export interface ArtistDetail {
  id: number;
  slug: string;
  name: string;
  nameTH: string;
  period: string;
  periodTH: string;
  featuredImage: string;
  status: 'current' | 'past' | 'upcoming';
  gallery: string[];
}

export const ARTISTS_DATA: ArtistDetail[] = [
  {
    id: 8,
    slug: 'upcoming-artist-2026',
    name: "To Be Announced",
    nameTH: "จะประกาศในเร็วๆ นี้",
    period: "April - June 2026",
    periodTH: "เมษายน - มิถุนายน 2569",
    featuredImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop",
    status: 'upcoming',
    gallery: [
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 1,
    slug: 'emma-mccormick-goodhart',
    name: "Emma McCormick Goodhart",
    nameTH: "เอ็มมา แมคคอร์มิก กู๊ดฮาร์ท",
    period: "January - February 2024",
    periodTH: "มกราคม - กุมภาพันธ์ 2567",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.1+Emma+McCormick+Goodhart--glai+glaai-+Puttisin+Choojesroom+4+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.1+Emma+McCormick+Goodhart--glai+glaai-+Puttisin+Choojesroom+13-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.1+Emma+McCormick+Goodhart--glai+glaai-+Puttisin+Choojesroom+21-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.1+Emma+McCormick+Goodhart--glai+glaai-+Puttisin+Choojesroom+11-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.1+Emma+McCormick+Goodhart--glai+glaai-+Puttisin+Choojesroom+4-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.1+Emma+McCormick+Goodhart--glai+glaai-+Puttisin+Choojesroom+6-1920w.jpg"
    ]
  },
  {
    id: 2,
    slug: 'natalie-bruck',
    name: "Natalie Brück",
    nameTH: "นาตาลี บรึค",
    period: "July - September 2024",
    periodTH: "กรกฎาคม - กันยายน 2567",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.2+Natalie+Br%C3%BCck--Working+On+The+Imaginary+Object-+Sivakorn+Charoenyothin+1+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.2+Natalie+Br%C3%BCck--Working+On+The+Imaginary+Object-+Sivakorn+Charoenyothin+2-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.2+Natalie+Br%C3%BCck--Working+On+The+Imaginary+Object-+Sivakorn+Charoenyothin+5-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.2+Natalie+Br%C3%BCck--Working+On+The+Imaginary+Object-+Sivakorn+Charoenyothin+6-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.2+Natalie+Br%C3%BCck--Working+On+The+Imaginary+Object-+Sivakorn+Charoenyothin+3-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.2+Natalie+Br%C3%BCck--Working+On+The+Imaginary+Object-+Sivakorn+Charoenyothin+1-1920w.jpg"
    ]
  },
  {
    id: 3,
    slug: 'cole-lu',
    name: "Cole Lu",
    nameTH: "โคล ลู",
    period: "October 2024",
    periodTH: "ตุลาคม 2567",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.3+Cole+Lu--Cole+Lu-+The+Engineers-+Kanrapee+Chokpaiboon+2+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.3+Cole+Lu--Cole+Lu-+The+Engineers-+Kanrapee+Chokpaiboon+19-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.3+Cole+Lu--The+Engineers-+Krittawat+Atthsis+and+Puttisin+Choojesroom+2-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.3+Cole+Lu--Cole+Lu-+The+Engineers-+Kanrapee+Chokpaiboon+20-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.3+Cole+Lu--The+Engineers-+Krittawat+Atthsis+and+Puttisin+Choojesroom+3-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.3+Cole+Lu--Cole+Lu-+The+Engineers-+Kanrapee+Chokpaiboon+2-1920w.jpg"
    ]
  },
  {
    id: 9,
    slug: 'nicolas-amato',
    name: "Nicolas Amato",
    nameTH: "นิโกลาส อามาโต",
    period: "January - February 2025",
    periodTH: "มกราคม - กุมภาพันธ์ 2568",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.4+Nicolas+Amato--Unwinding+Architecture-+Bangkok+Kunsthalle+1+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.4+Nicolas+Amato--Unwinding+Architecture-+Bangkok+Kunsthalle+7-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.4+Nicolas+Amato--Unwinding+Architecture-+Bangkok+Kunsthalle+1-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.4+Nicolas+Amato--Unwinding+Architecture-+Bangkok+Kunsthalle+16-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.4+Nicolas+Amato--Unwinding+Architecture-+Bangkok+Kunsthalle+9-1920w.jpg"
    ]
  },
  {
    id: 4,
    slug: 'anthony-huberman',
    name: "Anthony Huberman",
    nameTH: "แอนโทนี ฮิวเบอร์แมน",
    period: "February - March 2025",
    periodTH: "กุมภาพันธ์ - มีนาคม 2568",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.5+Anthony+Huberman--An+Artist+Led+Approach-+Bangkok+Kunsthalle+1+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.5+Anthony+Huberman--An+Artist+Led+Approach-+Bangkok+Kunsthalle+1-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.5+Anthony+Huberman--An+Artist+Led+Approach-+Bangkok+Kunsthalle+4-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.5+Anthony+Huberman--An+Artist+Led+Approach-+Bangkok+Kunsthalle+2-1920w.jpg"
    ]
  },
  {
    id: 5,
    slug: 'spencer-sweeney',
    name: "Spencer Sweeney",
    nameTH: "สเปนเซอร์ สวีนีย์",
    period: "July - December 2025",
    periodTH: "กรกฎาคม - ธันวาคม 2568",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.6+Spencer+Sweeney--Living+Cinematheque-+Prapasiri+Kasemkijkajorn+6+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.6+Spencer+Sweeney--Living+Cinematheque-+Prapasiri+Kasemkijkajorn+5-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.6+Spencer+Sweeney--Living+Cinematheque-+Prapasiri+Kasemkijkajorn+6-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.6+Spencer+Sweeney--Living+Cinematheque-+Patsu+Supakajohnwanich+11-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.6+Spencer+Sweeney--Disco+Hut-+Prapasiri+Kasemkijkajorn-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.6+Spencer+Sweeney--Living+Cinematheque-+Patsu+Supakajohnwanich+6-1920w.jpg"
    ]
  },
  {
    id: 6,
    slug: 'luca-lo-pinto',
    name: "Luca Lo Pinto",
    nameTH: "ลูก้า โล ปินโต",
    period: "August - September 2025",
    periodTH: "สิงหาคม - กันยายน 2568",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.7+Luca+Lo+Pinto--From+Display+to+Discourse-+Bangkok+Kunsthalle+7+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.7+Luca+Lo+Pinto--From+Display+to+Discourse-+Bangkok+Kunsthalle+7-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.7+Luca+Lo+Pinto--From+Display+to+Discourse-+Bangkok+Kunsthalle+4-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.7+Luca+Lo+Pinto--From+Display+to+Discourse-+Bangkok+Kunsthalle+5-1920w.jpg"
    ]
  },
  {
    id: 7,
    slug: 'eduardo-williams',
    name: "Eduardo Williams",
    nameTH: "เอดูอาร์โด วิลเลียมส์",
    period: "November - December 2025",
    periodTH: "พฤศจิกายน - ธันวาคม 2568",
    featuredImage: "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.8+Eduardo+Williams--A+Very+Long+Gif-+Patsu+Supakajohnwanich+2+COVER-1920w.jpg",
    status: 'past',
    gallery: [
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.8+Eduardo+Williams--A+Very+Long+Gif-+Patsu+Supakajohnwanich+2-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.8+Eduardo+Williams--Teddy+workshop-+Krittawat+Atthsis+16-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.8+Eduardo+Williams--Teddy+workshop-+Krittawat+Atthsis+3-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.8+Eduardo+Williams--Teddy+workshop-+Krittawat+Atthsis+10-1920w.jpg",
      "https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.8+Eduardo+Williams--Parsi14+copy-1920w.jpg"
    ]
  },
  {
    id: 10,
    slug: 'apichaya-wannakit',
    name: "Apichaya Wannakit",
    nameTH: "อภิชญา วรรณกิจ",
    period: "January - February 2026",
    periodTH: "มกราคม - กุมภาพันธ์ 2569",
    featuredImage: "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.9+Apichaya+Wannakit--Apichaya+Wannakit-+Legacy+between+absence+and+eternity+4+COVER.jpg",
    status: 'past',
    gallery: [
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.9+Apichaya+Wannakit--WhatsApp+Image+2025-12-24+at+15.01.33.jpeg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.9+Apichaya+Wannakit--WhatsApp+Image+2025-12-24+at+15.09.40.jpeg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.9+Apichaya+Wannakit--WhatsApp+Image+2025-12-24+at+15.01.32+%281%29.jpeg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.9+Apichaya+Wannakit--Apichaya+Wannakit-+Legacy+between+absence+and+eternity+4.jpg"
    ]
  },
  {
    id: 11,
    slug: 'rolf-sachs',
    name: "Rolf Sachs",
    nameTH: "โรล์ฟ ซัคส์",
    period: "January - March 2026",
    periodTH: "มกราคม - มีนาคม 2569",
    featuredImage: "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.10+Rolf+Sachs--DSC00813+COVER.jpg",
    status: 'past',
    gallery: [
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.10+Rolf+Sachs--%E0%B8%AA%E0%B8%B3%E0%B9%80%E0%B8%99%E0%B8%B2%E0%B8%82%E0%B8%AD%E0%B8%87+Bangkok+portraits-60.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.10+Rolf+Sachs--Rolf+Sachs-+Sirikanya+27.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.10+Rolf+Sachs--DSC00813.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.10+Rolf+Sachs--Rolf+Sachs-+Preecha+Pattara+1.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.10+Rolf+Sachs--Rolf+Sachs-+Preecha+Pattara+31.jpg"
    ]
  },
  {
    id: 12,
    slug: 'mafalda-von-hessen',
    name: "Mafalda von Hessen",
    nameTH: "มาฟัลดา ฟอน เฮสเซน",
    period: "January - March 2026",
    periodTH: "มกราคม - มีนาคม 2569",
    featuredImage: "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.11+Mafalda+von+Hessen--Mafalda-+Preecha+Pattara+6+COVER.jpg",
    status: 'past',
    gallery: [
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.11+Mafalda+von+Hessen--Mafalda-+Sirikanya+9.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.11+Mafalda+von+Hessen--Mafalada-+Ponpavee+20.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.11+Mafalda+von+Hessen--Mafalda-+Preecha+Pattara+2.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.11+Mafalda+von+Hessen--Mafalda-+Preecha+Pattara+6.jpg",
      "https://irp.cdn-website.com/5516674f/dms3rep/multi/Puma_Images+for+Website-Bangkok+Kunsthalle+Images+for+Website-6.+Residency-6.11+Mafalda+von+Hessen--Mafalda-+Preecha+Pattara+17.jpg"
    ]
  }
];

// Helper function to get full artist details with content
export function getArtistWithContent(slug: string, language: 'en' | 'th' = 'en') {
  const artist = ARTISTS_DATA.find(a => a.slug === slug);
  if (!artist) return null;

  const content = language === 'th' 
    ? getDetailContentThai(slug) 
    : getDetailContent(slug);

  return {
    ...artist,
    content: content || ''
  };
}