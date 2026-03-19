/**
 * Residencies Data
 * Metadata only - detailed bio and statements are in detailContent.ts
 */

export interface Residency {
  id: number;
  slug: string;
  name: string;
  nameTH: string;
  period: string;
  periodTH: string;
  image: string;
  category: 'current' | 'upcoming' | 'past';
  bio: string;
  bioTH: string;
  statement: string;
  statementTH: string;
  gallery: string[];
}

export const residencies: Residency[] = [
  // Data removed - structure kept for future use
];

/**
 * Helper function to get residency by slug
 * @param slug - The residency slug
 * @returns The residency data or null if not found
 */
export function getResidencyBySlug(slug: string): Residency | null {
  const residency = residencies.find(r => r.slug === slug);
  return residency || null;
}