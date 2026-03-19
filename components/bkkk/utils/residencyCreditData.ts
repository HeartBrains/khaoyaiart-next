// Utility to parse and retrieve image credits from CSV data
export const RESIDENCY_CREDITS: Record<string, string[]> = {
  'emma-mccormick-goodhart': [
    'Emma McCormick Goodhart, "glai glaai", 2024. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Puttisin Choojesroom.'
  ],
  'natalie-bruck': [
    'Natalie Brück, "Working On The Imaginary Object", 2024, performance. Courtesy of the artist and Bangkok Kunsthalle. Photo by Sivakorn Charoenyothin.'
  ],
  'cole-lu': [
    'Cole Lu, "The Engineers", 2024, neem wood and linen. Courtesy of the artist, Nova Contemporary, and Bangkok Kunsthalle. Photo by Kanrapee Chokpaiboon, Krittawat Atthsis and Puttisin Choojesroom.'
  ],
  'nicolas-amato': [
    'Nicolas Amato, "Unwinding Architecture: the Poetics of the Snake", 2025, mixed media. Courtesy of the artist and Bangkok Kunsthalle.'
  ],
  'anthony-huberman': [
    'Anthony Huberman, "An Artist Led Approach", 2025. Courtesy of the curator and Bangkok Kunsthalle.'
  ],
  'spencer-sweeney': [
    'Spencer Sweeney, "Living Cinematheque", 2025. Courtesy of the artist and Bangkok Kunsthalle. Photo by Patsu Supakajohnwanich and Prapasiri Kasemkijkajorn.',
    'Spencer Sweeney, "Disco Hut", 2025. Courtesy of the artist and Bangkok Kunsthalle. Photo by Prapasiri Kasemkijkajorn.'
  ],
  'apichaya-wannakit': [
    'Apichaya Wannakit, "Legacy: between absence and eternity", 2025, oil on canvas. Courtesy of the artist, Bangkok Kunsthalle, and Palazzo Monti.',
    'Apichaya Wannakit, "Untitled", 2025, oil on canvas. Courtesy of the artist, Bangkok Kunsthalle, and Palazzo Monti.'
  ],
  'luca-lo-pinto': [
    'Luca Lo Pinto, "From Display to Discourse: Expanding the Role of the Curator", 2025. Courtesy of the curator and Bangkok Kunsthalle.'
  ],
  'eduardo-williams': [
    'Eduardo Williams, "Un gif larguísimo" (A Very Long Gif), 2022. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Patsu Supakajohnwanich.',
    'Eduardo Williams, screenings and workshop, 2025. Courtesy of the artist and Bangkok Kunsthalle. Photo by Krittawat Atthsis.'
  ],
  'rolf-sachs': [
    'Rolf Sachs, "Soul Searching", 2026. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Sirikanya Amarananthakit and Preecha Pattara.'
  ],
  'mafalda-von-hessen': [
    'Mafalda von Hessen, "Splendor in the City", 2026. Installation view, Bangkok Kunsthalle. Courtesy of the artist and Bangkok Kunsthalle. Photo by Sirikanya Amarananthakit and Preecha Pattara.'
  ]
};

/**
 * Get image credits for a specific artist by slug
 * @param slug The artist's slug
 * @returns Array of credit strings, or empty array if not found
 */
export function getResidencyCredits(slug: string): string[] {
  return RESIDENCY_CREDITS[slug] || [];
}

/**
 * Get a specific credit by index
 * @param slug The artist's slug
 * @param index The index of the credit (corresponds to gallery image index)
 * @returns Credit string or empty string if not found
 */
export function getResidencyCreditByIndex(slug: string, index: number): string {
  const credits = getResidencyCredits(slug);
  return credits[index] || credits[0] || '';
}
