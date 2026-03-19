/**
 * Date Formatting Helpers
 * Centralized date formatting for bilingual support
 */

const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const ENGLISH_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Convert CE year to Buddhist Era (BE)
 * BE = CE + 543
 */
export function toBuddhistYear(year: number): number {
  return year + 543;
}

/**
 * Parse ISO date string to Date object
 */
export function parseISODate(dateString: string): Date | null {
  if (!dateString || dateString === 'Onwards' || dateString === 'ต่อเนื่อง') {
    return null;
  }
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Format date for display
 * English: "10 March 2026" (using ' - ' with spaces, NOT en-dash)
 * Thai: "10 มีนาคม 2569" (Buddhist Era)
 */
export function formatDateDisplay(
  dateString: string,
  language: 'en' | 'th'
): string {
  if (dateString === 'Onwards') return language === 'th' ? 'ต่อเนื่อง' : 'Onwards';
  if (dateString === 'ต่อเนื่อง') return language === 'th' ? 'ต่อเนื่อง' : 'Onwards';

  const date = parseISODate(dateString);
  if (!date) return dateString;

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  if (language === 'th') {
    return `${day} ${THAI_MONTHS[month]} ${toBuddhistYear(year)}`;
  } else {
    return `${day} ${ENGLISH_MONTHS[month]} ${year}`;
  }
}

/**
 * Format date range for display
 * English: "10 March 2026 - 20 April 2026"
 * Thai: "10 มีนาคม 2569 - 20 เมษายน 2569"
 */
export function formatDateRange(
  fromDate: string,
  toDate: string,
  language: 'en' | 'th'
): string {
  const from = formatDateDisplay(fromDate, language);
  const to = formatDateDisplay(toDate, language);

  // If either is "Onwards", handle specially
  if (toDate === 'Onwards' || toDate === 'ต่อเนื่อง') {
    return `${from} ${language === 'th' ? 'เป็นต้นไป' : 'Onwards'}`;
  }

  return `${from} - ${to}`;
}

/**
 * Get current date for filtering
 */
export function getCurrentDate(): Date {
  return new Date();
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateString: string): boolean {
  const date = parseISODate(dateString);
  if (!date) return false;
  return date < getCurrentDate();
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = parseISODate(dateString);
  if (!date) return false;
  return date > getCurrentDate();
}

/**
 * Check if current date is between two dates
 */
export function isDateInRange(fromDate: string, toDate: string): boolean {
  const from = parseISODate(fromDate);
  const to = parseISODate(toDate);
  const now = getCurrentDate();

  if (!from) return false;
  if (toDate === 'Onwards' || toDate === 'ต่อเนื่อง') {
    return now >= from;
  }
  if (!to) return false;

  return now >= from && now <= to;
}
