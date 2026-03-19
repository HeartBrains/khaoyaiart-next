import { ASSETS } from './assets';

export type RecordCategory = 'exhibition' | 'activity' | 'event';
export type RecordStatus = 'current' | 'upcoming' | 'past';

export interface RecordItem {
  id: string;
  title: string;
  category: RecordCategory;
  status: RecordStatus;
  date: string; // Display date string
  startDate?: string; // ISO date for sorting if needed
  endDate?: string;
  image: string;
  description?: string; // Short description/artist name
  location?: string;
  slug?: string;
}

export const RECORDS: RecordItem[] = [
  // Current Exhibitions
  {
    id: 'exh-1',
    title: 'Search for Life I',
    category: 'exhibition',
    status: 'current',
    date: '22 Nov 2025 - 22 Jan 2026',
    image: ASSETS.EXHIBITION_TERRAZZO,
    description: 'Stephanie Comilang',
    slug: 'search-for-life-1'
  },
  
  // Upcoming Exhibitions
  {
    id: 'exh-2',
    title: 'Future Landscapes',
    category: 'exhibition',
    status: 'upcoming',
    date: '01 Feb 2026',
    image: ASSETS.EXHIBITION_BUTTERFLY,
    description: 'Group Exhibition',
    slug: 'future-landscapes'
  },

  // Current Activities
  {
    id: 'act-1',
    title: 'Neon Reveries',
    category: 'activity',
    status: 'current',
    date: '01 Oct – 01 Nov 2025',
    image: ASSETS.ACTIVITY_NEON,
    description: 'Wong Kar-Wai Screening Series',
    slug: 'neon-reveries'
  },

  // Upcoming Activities
  {
    id: 'act-2',
    title: 'Artist Talk: Stephanie Comilang',
    category: 'activity',
    status: 'upcoming',
    date: '15 Dec 2025',
    image: ASSETS.BLOG_1,
    description: 'In conversation with curator',
    slug: 'artist-talk-stephanie'
  },

  // Past (Archive) - Mixed
  {
    id: 'arch-1',
    title: 'Unwinding Architecture',
    category: 'exhibition',
    status: 'past',
    date: '10 Jan - 10 Mar 2025',
    image: ASSETS.BLOG_6,
    description: 'Retrospective',
    slug: 'unwinding-architecture'
  },
  {
    id: 'arch-2',
    title: 'Sound & Space Workshop',
    category: 'activity',
    status: 'past',
    date: '05 Mar 2025',
    image: ASSETS.BLOG_2,
    description: 'Interactive Workshop',
    slug: 'sound-space-workshop'
  },
  {
    id: 'arch-3',
    title: 'Annual Gala 2024',
    category: 'event',
    status: 'past',
    date: '20 Dec 2024',
    image: ASSETS.EVENT_HERO,
    description: 'Fundraising Event',
    slug: 'annual-gala-2024'
  },
  {
    id: 'arch-4',
    title: 'Digital Horizons',
    category: 'exhibition',
    status: 'past',
    date: '15 Aug - 15 Oct 2024',
    image: ASSETS.BLOG_4,
    description: 'New Media Art',
    slug: 'digital-horizons'
  },
   {
    id: 'arch-5',
    title: 'Traditional Dance Performance',
    category: 'activity',
    status: 'past',
    date: '12 Aug 2024',
    image: ASSETS.BLOG_5,
    description: 'Cultural Performance',
    slug: 'traditional-dance'
  }
];

// Mock API function
export async function fetchRecords(params?: { category?: RecordCategory | 'all', status?: RecordStatus | 'all' }): Promise<RecordItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let results = [...RECORDS];

  if (params?.category && params.category !== 'all') {
    results = results.filter(r => r.category === params.category);
  }

  if (params?.status && params.status !== 'all') {
    results = results.filter(r => r.status === params.status);
  }

  return results;
}
