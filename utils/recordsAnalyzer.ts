// @ts-nocheck
/**
 * Records Analyzer
 * Analyzes and categorizes all records by status
 */

import { getExhibitionsWithStatus } from './exhibitionsDataNew';
import { movingImagePrograms } from './movingImageData';
import { residencyData } from './residencyData';
import { determineStatus, Status } from './dateStatusHelper';

interface RecordSummary {
  slug: string;
  title: string;
  artist?: string;
  dates: string;
  status: Status;
}

interface CategorySummary {
  category: string;
  upcoming: RecordSummary[];
  current: RecordSummary[];
  past: RecordSummary[];
  total: number;
}

/**
 * Analyzes all records across categories
 */
export function analyzeAllRecords(): CategorySummary[] {
  const results: CategorySummary[] = [];

  // 1. EXHIBITIONS
  const exhibitions = getExhibitionsWithStatus();
  const exhibitionsSummary: CategorySummary = {
    category: 'EXHIBITIONS',
    upcoming: [],
    current: [],
    past: [],
    total: exhibitions.length
  };

  exhibitions.forEach(ex => {
    const record: RecordSummary = {
      slug: ex.slug,
      title: ex.title.en,
      artist: ex.artist.en,
      dates: ex.dateDisplay.en,
      status: ex.status
    };

    if (ex.status === 'upcoming') exhibitionsSummary.upcoming.push(record);
    else if (ex.status === 'current') exhibitionsSummary.current.push(record);
    else if (ex.status === 'past') exhibitionsSummary.past.push(record);
  });

  results.push(exhibitionsSummary);

  // 2. MOVING IMAGE
  const movingImageSummary: CategorySummary = {
    category: 'MOVING IMAGE',
    upcoming: [],
    current: [],
    past: [],
    total: movingImagePrograms.length
  };

  movingImagePrograms.forEach(mi => {
    const status = determineStatus(mi.fromDate, mi.toDate);
    const record: RecordSummary = {
      slug: mi.slug,
      title: mi.title.en,
      artist: mi.curator?.en,
      dates: mi.dateDisplay.en,
      status
    };

    if (status === 'upcoming') movingImageSummary.upcoming.push(record);
    else if (status === 'current') movingImageSummary.current.push(record);
    else if (status === 'past') movingImageSummary.past.push(record);
  });

  results.push(movingImageSummary);

  // 3. RESIDENCY
  const residencySummary: CategorySummary = {
    category: 'RESIDENCY',
    upcoming: [],
    current: [],
    past: [],
    total: residencyData.length
  };

  residencyData.forEach(res => {
    const status = determineStatus(res.fromDate, res.toDate);
    const record: RecordSummary = {
      slug: res.slug,
      title: res.title.en,
      artist: res.artist.en,
      dates: res.dateDisplay.en,
      status
    };

    if (status === 'upcoming') residencySummary.upcoming.push(record);
    else if (status === 'current') residencySummary.current.push(record);
    else if (status === 'past') residencySummary.past.push(record);
  });

  results.push(residencySummary);

  return results;
}

/**
 * Prints formatted summary to console
 */
export function printRecordsSummary(): string {
  const analysis = analyzeAllRecords();
  let output = '\n';
  output += '═══════════════════════════════════════════════════════════════════════\n';
  output += '                    BANGKOK KUNSTHALLE RECORDS STATUS                  \n';
  output += '                        Updated: March 17, 2026                        \n';
  output += '═══════════════════════════════════════════════════════════════════════\n\n';

  analysis.forEach(category => {
    output += `\n━━━ ${category.category} (Total: ${category.total}) ━━━\n\n`;

    // UPCOMING
    if (category.upcoming.length > 0) {
      output += `  ✨ UPCOMING (${category.upcoming.length}):\n`;
      category.upcoming.forEach(record => {
        output += `     • ${record.title}\n`;
        if (record.artist) output += `       Artist: ${record.artist}\n`;
        output += `       Dates: ${record.dates}\n`;
        output += `       Slug: ${record.slug}\n\n`;
      });
    }

    // CURRENT
    if (category.current.length > 0) {
      output += `  🎨 CURRENT (${category.current.length}):\n`;
      category.current.forEach(record => {
        output += `     • ${record.title}\n`;
        if (record.artist) output += `       Artist: ${record.artist}\n`;
        output += `       Dates: ${record.dates}\n`;
        output += `       Slug: ${record.slug}\n\n`;
      });
    }

    // PAST
    if (category.past.length > 0) {
      output += `  📚 PAST (${category.past.length}):\n`;
      category.past.forEach(record => {
        output += `     • ${record.title}\n`;
        if (record.artist) output += `       Artist: ${record.artist}\n`;
        output += `       Dates: ${record.dates}\n`;
        output += `       Slug: ${record.slug}\n\n`;
      });
    }
  });

  output += '\n═══════════════════════════════════════════════════════════════════════\n';
  output += '                           SUMMARY TOTALS                              \n';
  output += '═══════════════════════════════════════════════════════════════════════\n\n';

  const totals = {
    exhibitions: analysis[0].total,
    movingImage: analysis[1].total,
    residency: analysis[2].total,
    grand: analysis.reduce((sum, cat) => sum + cat.total, 0)
  };

  output += `  Exhibitions:     ${totals.exhibitions} records\n`;
  output += `  Moving Image:    ${totals.movingImage} records\n`;
  output += `  Residency:       ${totals.residency} records\n`;
  output += `  ─────────────────────────────\n`;
  output += `  GRAND TOTAL:     ${totals.grand} records\n\n`;

  const statusTotals = {
    upcoming: analysis.reduce((sum, cat) => sum + cat.upcoming.length, 0),
    current: analysis.reduce((sum, cat) => sum + cat.current.length, 0),
    past: analysis.reduce((sum, cat) => sum + cat.past.length, 0)
  };

  output += `\n  Status Breakdown:\n`;
  output += `  ✨ Upcoming:      ${statusTotals.upcoming} records\n`;
  output += `  🎨 Current:       ${statusTotals.current} records\n`;
  output += `  📚 Past:          ${statusTotals.past} records\n\n`;

  output += '═══════════════════════════════════════════════════════════════════════\n\n';

  return output;
}

