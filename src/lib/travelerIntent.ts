import { Destination } from '@/types';

export type TravelerIntent =
  | 'history-buff'
  | 'foodie'
  | 'adventure-seeker'
  | 'nature-lover'
  | 'family-explorer'
  | 'hidden-gem-hunter'
  | 'beach-bum'
  | 'general';

export interface IntentProfile {
  intent: TravelerIntent;
  label: string;
  description: string;
  topCategories: string[];
}

const INTENT_MAP: Record<TravelerIntent, { label: string; description: string; topCategories: string[] }> = {
  'history-buff': {
    label: 'History Buff',
    description: 'You love heritage sites and cultural landmarks',
    topCategories: ['heritage'],
  },
  'foodie': {
    label: 'Foodie',
    description: 'Culinary experiences are your priority',
    topCategories: ['culinary'],
  },
  'adventure-seeker': {
    label: 'Adventure Seeker',
    description: 'You crave thrilling outdoor activities',
    topCategories: ['adventure'],
  },
  'nature-lover': {
    label: 'Nature Lover',
    description: 'Natural beauty and scenic spots captivate you',
    topCategories: ['nature'],
  },
  'family-explorer': {
    label: 'Family Explorer',
    description: 'You seek family-friendly destinations',
    topCategories: ['family'],
  },
  'hidden-gem-hunter': {
    label: 'Hidden Gem Hunter',
    description: 'You love discovering off-the-beaten-path places',
    topCategories: ['hidden-gem'],
  },
  'beach-bum': {
    label: 'Beach Bum',
    description: 'Coastal and beach destinations are your calling',
    topCategories: ['beach'],
  },
  'general': {
    label: 'Explorer',
    description: 'A balanced mix of everything Jogja has to offer',
    topCategories: [],
  },
};

/**
 * Infer traveler intent from saved/bookmarked destinations.
 * Analyzes category distribution to determine dominant preference.
 */
export function inferTravelerIntent(savedDestinations: Destination[]): IntentProfile {
  if (!savedDestinations || savedDestinations.length < 2) {
    const fallback = INTENT_MAP['general'];
    return { intent: 'general', ...fallback };
  }

  const categoryCount: Record<string, number> = {};
  savedDestinations.forEach((dest) => {
    const cat = dest.category?.toLowerCase();
    if (cat) {
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    }
  });

  const sorted = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) {
    const fallback = INTENT_MAP['general'];
    return { intent: 'general', ...fallback };
  }

  const [topCategory, topCount] = sorted[0];
  const total = savedDestinations.length;
  const ratio = topCount / total;

  // Require at least 30% of saved destinations to be in one category
  if (ratio < 0.3) {
    const fallback = INTENT_MAP['general'];
    return { intent: 'general', ...fallback };
  }

  // Map category to intent
  const categoryToIntent: Record<string, TravelerIntent> = {
    heritage: 'history-buff',
    culinary: 'foodie',
    adventure: 'adventure-seeker',
    nature: 'nature-lover',
    family: 'family-explorer',
    'hidden-gem': 'hidden-gem-hunter',
    beach: 'beach-bum',
  };

  const intent = categoryToIntent[topCategory] || 'general';
  const profile = INTENT_MAP[intent];
  return { intent, ...profile };
}

/**
 * Order the "Continue Your Experience" cards based on traveler intent.
 * Cards matching the intent are promoted to the top.
 */
export function orderCardsByIntent<T extends { title: string }>(
  cards: T[],
  intentProfile: IntentProfile
): T[] {
  if (intentProfile.intent === 'general') return cards;

  const intentOrder: Record<TravelerIntent, string[]> = {
    'history-buff': ['Experiences', 'Private Guide', 'Stay Nearby', 'Eat Traditional', 'Local Shopping', 'Transportation'],
    'foodie': ['Eat Traditional', 'Local Shopping', 'Stay Nearby', 'Experiences', 'Private Guide', 'Transportation'],
    'adventure-seeker': ['Experiences', 'Transportation', 'Private Guide', 'Stay Nearby', 'Eat Traditional', 'Local Shopping'],
    'nature-lover': ['Experiences', 'Stay Nearby', 'Transportation', 'Eat Traditional', 'Private Guide', 'Local Shopping'],
    'family-explorer': ['Stay Nearby', 'Eat Traditional', 'Experiences', 'Transportation', 'Local Shopping', 'Private Guide'],
    'hidden-gem-hunter': ['Experiences', 'Local Shopping', 'Eat Traditional', 'Private Guide', 'Stay Nearby', 'Transportation'],
    'beach-bum': ['Transportation', 'Stay Nearby', 'Eat Traditional', 'Experiences', 'Local Shopping', 'Private Guide'],
    'general': [],
  };

  const order = intentOrder[intentProfile.intent] || [];
  if (order.length === 0) return cards;

  return [...cards].sort((a, b) => {
    const aIdx = order.indexOf(a.title);
    const bIdx = order.indexOf(b.title);
    const aOrder = aIdx === -1 ? 99 : aIdx;
    const bOrder = bIdx === -1 ? 99 : bIdx;
    return aOrder - bOrder;
  });
}
