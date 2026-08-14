/**
 * dateUtils.js
 * -----------------------------------------------------------------------
 * Small, dependency-free date helpers covering the "temporal data
 * modeling" and "mapping data to a calendar layout" concerns from the
 * experiment theory. No date library is used deliberately, so every
 * transformation (month grid, week strip, ISO keys) is visible and
 * inspectable.
 * -----------------------------------------------------------------------
 */

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** Local-date ISO key (YYYY-MM-DD) — avoids UTC-shift bugs from toISOString(). */
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function fromISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date) {
  return isSameDay(date, new Date());
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function addMonths(date, n) {
  const d = new Date(date);
  d.setDate(1); // avoid month-length rollover surprises
  d.setMonth(d.getMonth() + n);
  return d;
}

export function startOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getWeekDays(date) {
  const start = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/**
 * Builds a full 6-week (42-day) month grid, including the trailing days
 * of the previous month and leading days of the next month needed to
 * fill complete weeks — the standard "month view" layout pattern.
 */
export function getMonthGrid(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  const gridStart = startOfWeek(firstOfMonth);

  const days = Array.from({ length: 42 }, (_, i) => {
    const d = addDays(gridStart, i);
    return {
      date: d,
      iso: toISODate(d),
      inCurrentMonth: d.getMonth() === month,
      isToday: isToday(d),
    };
  });

  // group into weeks of 7 for row-based rendering
  const weeks = [];
  for (let i = 0; i < 42; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

export function formatMonthYear(date) {
  return `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDayLong(date) {
  return `${WEEKDAY_LABELS[date.getDay()]}, ${MONTH_LABELS[date.getMonth()]} ${date.getDate()}`;
}

/** Formats a "HH:MM" 24h string as a compact 12h label, e.g. "09:30" -> "9:30 AM". */
export function formatTime(hhmm) {
  if (!hhmm) return '';
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}
