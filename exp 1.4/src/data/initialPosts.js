import { toISODate, addDays } from '../utils/dateUtils';

/**
 * Seed data for the "posts" domain — generated relative to today so the
 * demo always shows a populated, relevant-looking calendar regardless of
 * when the app is opened.
 */
const today = new Date();
const iso = (offset) => toISODate(addDays(today, offset));

export const initialPosts = [
  {
    id: 'p1',
    title: 'Product teaser reel',
    platform: 'instagram',
    date: iso(-2),
    time: '11:00',
    status: 'published',
    notes: 'Short vertical clip announcing the new feature.',
  },
  {
    id: 'p2',
    title: 'Launch day announcement',
    platform: 'x',
    date: iso(0),
    time: '09:00',
    status: 'scheduled',
    notes: 'Pin to profile for 24 hours after posting.',
  },
  {
    id: 'p3',
    title: 'Founder AMA thread',
    platform: 'x',
    date: iso(0),
    time: '17:30',
    status: 'scheduled',
    notes: '',
  },
  {
    id: 'p4',
    title: 'Behind the scenes carousel',
    platform: 'instagram',
    date: iso(1),
    time: '13:00',
    status: 'draft',
    notes: 'Need final image exports from design.',
  },
  {
    id: 'p5',
    title: 'Weekly product update',
    platform: 'linkedin',
    date: iso(3),
    time: '10:00',
    status: 'scheduled',
    notes: '',
  },
  {
    id: 'p6',
    title: 'Engineering deep-dive',
    platform: 'blog',
    date: iso(5),
    time: '08:00',
    status: 'draft',
    notes: 'Draft with the platform team before publishing.',
  },
  {
    id: 'p7',
    title: 'Monthly newsletter',
    platform: 'newsletter',
    date: iso(6),
    time: '07:00',
    status: 'scheduled',
    notes: 'Include changelog and customer spotlight.',
  },
  {
    id: 'p8',
    title: 'Customer story spotlight',
    platform: 'linkedin',
    date: iso(-5),
    time: '12:00',
    status: 'published',
    notes: '',
  },
  {
    id: 'p9',
    title: 'Poll: what should we build next?',
    platform: 'x',
    date: iso(8),
    time: '15:00',
    status: 'draft',
    notes: '',
  },
];
