/**
 * Attunement rules for the Essence Dao. Elemental Attunement is adapted from the
 * campaign vault (publish.obsidian.md/leatrux/Homebrew/Essences/Elemental+Attunement)
 * for the V2 paths; Portfolio (Divine) and Dao (Immortal) Attunement are built on the same frame.
 */

export const VAULT_URL = 'https://publish.obsidian.md/leatrux/Homebrew/Essences/Elemental+Attunement';

/** Link preview text and image (see vite.config.ts). */
export const RULES_PREVIEW = {
  title: 'Attunement · Essence Dao Rules',
  summary: 'Where the world answers your Dao: Elemental Favored Domains, Divine Consecrated Ground, and the Immortal Sanctum, with what each grants at every tier.',
  image: '/og/rules-attunement.png'
};

export interface Domain {
  /** V2 path ID. */
  path: string;
  name: string;
  examples: string;
}

export interface TierBenefit {
  tier: string;
  levels: string;
  name: string;
  text: string;
}

export interface Attunement {
  id: string;
  name: string;
  /** V2 family ID. */
  family: string;
  domainLabel: string;
  summary: string;
  domains: Domain[];
  tiers: TierBenefit[];
  notes: string[];
}

const LEVELS: [string, string][] = [
  ['Initiate', '1–4'], ['Adept', '5–8'], ['Master', '9–12'], ['Grandmaster', '13–16'], ['Great Grandmaster', '17–20']
];

const tiers = (benefits: [string, string][]): TierBenefit[] =>
  benefits.map(([name, text], i) => ({ tier: LEVELS[i][0], levels: LEVELS[i][1], name, text }));

export const ATTUNEMENTS: Attunement[] = [
  {
    id: 'elemental',
    name: 'Elemental Attunement',
    family: 'primordial',
    domainLabel: 'Favored Domain',
    summary: 'Your power answers in the environment of your element.',
    domains: [
      { path: 'wood', name: 'Forests / Jungles', examples: 'Forests, jungles, overgrown ruins, druid groves' },
      { path: 'fire', name: 'Volcanic / Desert', examples: 'Volcanoes, deserts, lava flows, geysers' },
      { path: 'earth', name: 'Underground / Rocky', examples: 'Caves, underground complexes, rocky hills, quarries' },
      { path: 'metal', name: 'Urban / Forged', examples: 'Cities, fortresses, mines, smithies' },
      { path: 'water', name: 'Aquatic / Coastal', examples: 'Oceans, rivers, lakes, swamps, glaciers' },
      { path: 'sky', name: 'Mountains / Open Sky', examples: 'Mountain peaks, windy heights, high towers, lightning-struck places' }
    ],
    tiers: tiers([
      ['Essence Restoration', 'Finish a short rest in your Favored Domain to regain all expended Primordial Essence.'],
      ['Domain Movement', 'In your Favored Domain, gain a speed equal to your walking speed for every kind of movement it allows: fly, swim, burrow, or climb.'],
      ['Elemental Attunement Slot', 'One extra attunement slot for elemental items. Attune in your Favored Domain; the item stays attuned when you leave.'],
      ['Domain Manifestation', 'Once per day, as an action or when you roll initiative, turn the area within 1 mile into your Favored Domain for 1 hour.'],
      ['Essence Supremacy', 'In your Favored Domain, the abilities of its path ignore resistance and treat immunity as resistance.']
    ]),
    notes: ['Choose one Primordial path you have learned; only its Favored Domain counts.']
  },
  {
    id: 'divine',
    name: 'Portfolio Attunement',
    family: 'divine',
    domainLabel: 'Consecrated Ground',
    summary: 'Wherever your portfolio is revered or lived out: its temples and churches, any place with many of its followers, and wherever it is happening.',
    domains: [
      { path: 'lunar', name: 'Under the Moon', examples: 'Moonlit or starlit nights, the open sea at night, observatories' },
      { path: 'love', name: 'Places of Beauty', examples: 'Festivals, weddings, theatres, gardens in bloom' },
      { path: 'ruin', name: 'Places of Undoing', examples: 'Battlefields, execution grounds, the scene of a murder' },
      { path: 'pestilence', name: 'Places of Sickness', examples: 'Plague towns, poisoned lands, sickrooms, sewers' },
      { path: 'shadow', name: 'The Dark', examples: 'Darkness, lightless underground, places of loss' },
      { path: 'tempest', name: 'The Storm', examples: 'At sea, inside a storm, shipwrecks' },
      { path: 'providence', name: 'Places of Suffering', examples: 'Infirmaries, refugee camps, prisons, battle’s aftermath' }
    ],
    tiers: tiers([
      ['Essence Restoration', 'Finish a short rest on Consecrated Ground to regain all expended Divine Essence.'],
      ['Omen', 'Gain one inspiration when you finish a short or long rest on Consecrated Ground, or when you roll initiative on it.'],
      ['Relic Attunement Slot', 'One extra attunement slot for holy relics and items of your portfolio. Attune on Consecrated Ground; the item stays attuned when you leave.'],
      ['Consecration', 'Once per day, as an action or when you roll initiative, consecrate the area within 1 mile to your portfolio for 1 hour.'],
      ['Honorific Name', 'Your followers know your honorific name, and you hear it whenever it is spoken on the same plane. When you use a Divine ability, you can use it through any willing creature that knows your name and is on the same plane as you or on your Consecrated Ground: it comes from their body instead of yours, using your action and your Essence.']
    ]),
    notes: ['Choose one Divine path you have learned; only its Consecrated Ground counts.', 'Openly betray your portfolio and you lose these benefits until you atone.']
  },
  {
    id: 'immortal',
    name: 'Dao Attunement',
    family: 'human',
    domainLabel: 'Sanctum',
    summary: 'A place you have made your own through cultivation, where your Dao Heart settles: your furnace, your training hall, your well. It can be moved or rebuilt, but it takes time to become yours. At Grandmaster it follows you everywhere.',
    domains: [
      { path: 'alchemy', name: 'At the Furnace', examples: 'Within 30 feet of your alchemy furnace or workshop' },
      { path: 'heart', name: 'The Training Hall', examples: 'A sect training hall or dueling ground where you train, or any ground where you face a worthy opponent' },
      { path: 'mysteries', name: 'The Reflection', examples: 'Near a still reflection (a well, a pond, a mirror), or where the planes are thin' }
    ],
    tiers: tiers([
      ['Essence Restoration', 'Finish a short rest in your Sanctum to regain all expended Immortal Essence.'],
      ['Tempered Body', 'In your Sanctum, when you roll initiative, gain temporary hit points equal to 10 + your level.'],
      ['Natal Treasure', 'One extra attunement slot for a single item you refine into your natal treasure over a long rest in your Sanctum. It stays bound to you until you choose another.'],
      ['Dao Domain', 'Your Dao Heart belongs to you alone. From now on, you are always in your Sanctum, wherever you go.'],
      ['Transcendence', 'You are no longer mortal, and no longer written into fate. Your creature type becomes Immortal, and effects that only work on specific creature types don’t affect you. A creature that targets you with divination, prophecy, or a curse takes 10d10 force damage, or half as much on a successful Constitution saving throw against your essence ability save DC.']
    ]),
    notes: ['Choose one Immortal path you have learned; only its Sanctum counts.']
  }
];

export const GENERAL_RULES = [
  'You hold one Attunement and one domain: a single Favored Domain, Consecrated Ground, or Sanctum, from one path you have learned.',
  'You gain the Attunement’s benefit for each tier you reach.',
  'The DM decides whether you are in your domain.'
];
