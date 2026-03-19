export interface Activity {
  id: string;
  slug: string;
  title: { en: string; th: string };
  dateDisplay: { en: string; th: string };
  status: 'current' | 'upcoming' | 'past';
  year: string;
  categories: { en: string[]; th: string[] };
  featuredImage: string;
  gallery?: string[];
  imageCredits?: string;
  listingSummary: { en: string; th: string };
  tags?: { en: string[]; th: string[] };
  typeLabel?: { en: string; th: string };
  artist?: { en: string; th: string };
}

const BASE = 'https://lirp.cdn-website.com/5516674f/dms3rep/multi/opt/Puma_5.+Activities-';

export const activities: Activity[] = [
  // ─── Concrete Ghosts ─────────────────────────────────────────────────────────
  {
    id: "1",
    slug: "concrete-ghosts",
    title: { en: "Concrete Ghosts", th: "Concrete Ghosts" },
    dateDisplay: { en: "22 March & 11 April 2026", th: "22 March & 11 April 2026" },
    status: 'past',
    year: "2026",
    categories: { en: [], th: [] },
    featuredImage: BASE + 'Concrete+Ghosts--BecomingHuman_Still9+COVER-1920w.jpg',
    gallery: [
      BASE + 'Concrete+Ghosts--BecomingHuman_Still9-1920w.jpg',
      BASE + 'Concrete+Ghosts--WhiteBuilding_4-1920w.jpg',
    ],
    listingSummary: { en: "", th: "" },
  },

  // ─── cluB pluto ──────────────────────────────────────────────────────────────
  {
    id: "2",
    slug: "club-pluto",
    title: { en: "cluB pluto", th: "cluB pluto" },
    dateDisplay: { en: "5 April 2026", th: "5 April 2026" },
    status: 'past',
    year: "2026",
    categories: { en: [], th: [] },
    featuredImage: BASE + 'cluB+pluto--cluB+pluto+COVER-1920w.jpg',
    gallery: [
      BASE + 'cluB+pluto--cluB+pluto-1920w.jpg',
      BASE + 'cluB+pluto--_DSC1299-1920w.jpg',
    ],
    listingSummary: { en: "", th: "" },
  },

  // ─── TagTEAMS 2026 ───────────────────────────────────────────────────────────
  {
    id: "3",
    slug: "tagteams-2026",
    title: { en: "TagTEAMS 2026", th: "TagTEAMS 2026" },
    dateDisplay: { en: "17 – 19 April 2026", th: "17 – 19 April 2026" },
    status: 'past',
    year: "2026",
    categories: { en: [], th: [] },
    featuredImage: BASE + 'TagTEAMS+2026--TagTEAMS+2026+COVER-1920w.jpg',
    gallery: [
      BASE + 'TagTEAMS+2026--TagTEAMS+2026-1920w.jpg',
    ],
    listingSummary: { en: "", th: "" },
  },
];

export function getActivityBySlug(slug: string): Activity | undefined {
  return activities.find(a => a.slug === slug);
}

export function getActivitiesByStatus(status: Activity['status']): Activity[] {
  return activities.filter(a => a.status === status);
}
