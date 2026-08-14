/**
 * platforms.js
 * -----------------------------------------------------------------------
 * Static metadata describing the categories posts can belong to, and the
 * lifecycle states a scheduled post can be in. Centralized here so color
 * coding stays consistent across the grid, chips, modal, and legend.
 * -----------------------------------------------------------------------
 */

export const PLATFORMS = [
  { id: 'instagram', label: 'Instagram', color: '#D6336C' },
  { id: 'x', label: 'X / Twitter', color: '#1D9BF0' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
  { id: 'blog', label: 'Blog', color: '#7048E8' },
  { id: 'newsletter', label: 'Newsletter', color: '#E8912D' },
];

export const STATUSES = [
  { id: 'draft', label: 'Draft' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'published', label: 'Published' },
];

export function getPlatform(id) {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0];
}
