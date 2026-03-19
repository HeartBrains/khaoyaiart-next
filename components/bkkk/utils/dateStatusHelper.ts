/**
 * Date Status Helper
 * Automatically determines status (current/upcoming/past) based on date ranges
 */

export type Status = 'current' | 'upcoming' | 'past';

/**
 * Get current date in Bangkok timezone (UTC+7)
 */
export function getCurrentDate(): Date {
  // Create date in Bangkok timezone
  const now = new Date();
  // Get current UTC time
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  // Bangkok is UTC+7
  const bangkokTime = new Date(utc + (7 * 3600000));
  
  // Return date with time set to start of day for comparison
  bangkokTime.setHours(0, 0, 0, 0);
  return bangkokTime;
}

/**
 * Parse date string in format 'YYYY-MM-DD' to Date object
 */
export function parseDate(dateString: string | undefined | null): Date {
  if (!dateString) return new Date(0);
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * Determine status based on from date and to date
 * @param fromDate - Start date in format 'YYYY-MM-DD'
 * @param toDate - End date in format 'YYYY-MM-DD' or 'Onwards'
 * @returns Status: 'upcoming', 'current', or 'past'
 */
export function determineStatus(fromDate: string | undefined | null, toDate: string | undefined | null): Status {
  if (!fromDate || !toDate) return 'past';
  const today = getCurrentDate();
  
  // Handle special case: "Onwards" means ongoing indefinitely
  if (toDate === 'Onwards') {
    const start = parseDate(fromDate);
    return today >= start ? 'current' : 'upcoming';
  }
  
  const start = parseDate(fromDate);
  const end = parseDate(toDate);
  
  // Upcoming: today is before start date
  if (today < start) {
    return 'upcoming';
  }
  
  // Past: today is after end date
  if (today > end) {
    return 'past';
  }
  
  // Current: today is between start and end (inclusive)
  return 'current';
}

/**
 * Determine status based on a period string
 * @param period - Period string like "January - February 2024" or "2024-01-12" to "2024-03-10"
 * @param fromDate - Optional explicit from date in format 'YYYY-MM-DD'
 * @param toDate - Optional explicit to date in format 'YYYY-MM-DD'
 * @returns Status: 'upcoming', 'current', or 'past'
 */
export function determineStatusFromPeriod(
  period: string,
  fromDate?: string,
  toDate?: string
): Status {
  // If explicit dates provided, use those
  if (fromDate && toDate) {
    return determineStatus(fromDate, toDate);
  }
  
  // For residencies, we'll need to rely on explicit dates
  // This is a fallback that returns 'past' by default
  return 'past';
}

/**
 * Check if a date range is currently active
 */
export function isCurrentlyActive(fromDate: string, toDate: string): boolean {
  return determineStatus(fromDate, toDate) === 'current';
}

/**
 * Check if a date range is upcoming
 */
export function isUpcoming(fromDate: string, toDate: string): boolean {
  return determineStatus(fromDate, toDate) === 'upcoming';
}

/**
 * Check if a date range is past
 */
export function isPast(fromDate: string, toDate: string): boolean {
  return determineStatus(fromDate, toDate) === 'past';
}

/**
 * Sort items by status priority: current > upcoming > past
 * Within each status, sort by date (upcoming/current: oldest first, past: newest first)
 */
export function sortByStatusAndDate<T extends { fromDate: string; toDate: string }>(
  items: T[]
): T[] {
  return items.sort((a, b) => {
    const statusA = determineStatus(a.fromDate, a.toDate);
    const statusB = determineStatus(b.fromDate, b.toDate);
    
    // Priority order: current > upcoming > past
    const statusPriority = { current: 0, upcoming: 1, past: 2 };
    
    if (statusA !== statusB) {
      return statusPriority[statusA] - statusPriority[statusB];
    }
    
    // Within same status, sort by date
    const dateA = parseDate(a.fromDate).getTime();
    const dateB = parseDate(b.fromDate).getTime();
    
    // For past items, show newest first (descending)
    if (statusA === 'past') {
      return dateB - dateA;
    }
    
    // For current and upcoming, show oldest first (ascending)
    return dateA - dateB;
  });
}
