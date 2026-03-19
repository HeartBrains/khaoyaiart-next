export interface ArtistDetail {
  id: number;
  slug: string;
  name: string;
  nameTH: string;
  period: string; // Used for "date" in ResidencyPage
  periodTH: string;
  image: string;
  category: 'current' | 'upcoming' | 'past';
  bio: string;
  bioTH: string;
  statement: string;
  statementTH: string;
  gallery: string[];
}

export const ARTISTS_DATA: ArtistDetail[] = [
  // Data removed - structure kept for future use
];