/**
 * Patch notes for V2.2: the Navigation path and what moved into it. A snapshot of the change;
 * ability names must match the catalog names so the notes can open their full text.
 */

export const PATCH = {
  slug: 'v2-2',
  version: 'V2.2',
  name: 'Guiding Stars',
  date: '2026-11-01',
  title: 'Guiding Stars and the Navigation Path',
  summary: 'A new Divine path, Navigation, the Portfolio of Selûne: star-reading, charts, and travel by land and sea. Lunar keeps the moon and the stars themselves, with new abilities of its own.',
  image: '/og/patch-notes-v2-2.png'
};

/** Everything new in the path. The moved abilities are listed separately, in MOVED. */
export const NEW_TECHNIQUES = [
  'True Bearing', 'Wanderer’s Road', 'Zenith Mark',
  'Meteor Trail', 'Safest Course', 'Hold the Course',
  'Asterism', 'Star Road',
  'Tears of Selûne', 'Voyage Among the Stars'
];

export const NEW_CANTRIPS = ['Internal Compass', 'Starry Wisp'];

export const NEW_SPELLS = [
  'Guiding Star', 'Longstrider', 'Guiding Bolt', 'Easy Trail',
  'Star Scry', 'Sagittarius’s Bow', 'Billowing Sails', 'Sailor’s Shanty',
  'Guiding Light', 'Compelling Fate', 'Lucky Stars',
  'Ghostly Crew', 'Celestial Pyre',
  'Bless Vessel',
  'Find the Path', 'Star Step',
  'Cosmic Canvas', 'Starry Vision',
  'Awaken Ship Guardian',
  'Night Sky'
];

export const CONSECRATED_GROUND = {
  name: 'The Charted Way',
  examples: 'Lighthouses, observatories, chart rooms, any ship or caravan holding its course'
};

/** The path's Domain Expansions, one line each. */
export const DOMAIN_LINES: { name: string; text: string }[] = [
  { name: 'Wanderer’s Road', text: 'Difficult terrain doesn’t slow you in combat either.' },
  { name: 'Storm Navigator', text: 'The advantage applies in any weather.' },
  { name: 'Zenith Mark', text: 'You can target one more creature.' },
  { name: 'Meteor Trail', text: 'If the attack misses, the target still takes half damage.' },
  { name: 'Asterism', text: 'You choose which creatures the lines ignore.' }
];

/** Navigation's domain matchups. Every other path clashes with it evenly. */
export const MATCHUPS: { path: string; result: string; why: string }[] = [
  { path: 'lunar', result: 'Coexist', why: 'The sky Selûne lights is the sky her navigators read.' },
  { path: 'sky', result: 'Coexist', why: 'The stars are read from the open sky.' },
  { path: 'water', result: 'Coexist', why: 'Sailors steer by the stars and ride the water.' },
  { path: 'tempest', result: 'Navigation overcomes', why: 'Selûne’s stars guide ships home through Umberlee’s storms.' },
  { path: 'undertow', result: 'Overcomes Navigation', why: 'No star can be read below the last light.' },
  { path: 'mysteries', result: 'Overcomes Navigation', why: 'Fold the road and every chart is wrong.' },
  { path: 'shadow', result: 'Opposites', why: 'Selûne and Shar, the stars and the dark.' }
];

/** Abilities that moved into Navigation, with the path they left. */
export const MOVED: { name: string; from: string }[] = [
  { name: 'Storm Navigator', from: 'tempest' },
  { name: 'Locate Creature', from: 'lunar' }
];

/** Lunar's Consecrated Ground, as it read in V2.1 and as it reads now. */
export const LUNAR_DOMAIN = {
  before: 'Under the Moon: moonlit or starlit nights, the open sea at night, observatories',
  after: 'Under the Night Sky: moonlit or starlit nights, temples of Selûne, shores at a full-moon tide'
};

/** Lunar's older techniques that changed, one line each. */
export const LUNAR_CHANGES: { name: string; text: string }[] = [
  { name: 'Waning Moon Sabers', text: 'Now takes an action. On Consecrated Ground, you can use it as a bonus action instead.' },
  { name: 'Moonfall Condemnation', text: 'Can only be used on Consecrated Ground.' }
];

/** Everything new in Lunar. */
export const LUNAR_TECHNIQUES = ['Moonsight', 'Moonblood', 'Silver Ray', 'Shower of Stars', 'Moonbound Form', 'Phases of the Moon', 'Moonburst', 'Selûne’s Pack', 'Full Moon'];

export const LUNAR_CANTRIPS = ['Starburst', 'Howl'];

export const LUNAR_SPELLS = [
  'Aspect of the Wolf', 'By the Light of the Moon', 'Alter Moon Phase', 'Moonbeam Form', 'Potency of the Pack', 'Fount of Moonlight',
  'Field of Stars', 'Labyrinthine Howl', 'Starfall', 'Summon Star', 'Moonfall', 'Supernova'
];

/** Lunar's Domain Expansions, one line each. */
export const LUNAR_DOMAIN_LINES: { name: string; text: string }[] = [
  { name: 'Moonsight', text: 'Both ranges double.' },
  { name: 'Silver Ray', text: 'You have advantage on the attack roll.' },
  { name: 'Moonbound Form', text: 'You’re one size larger, and your reach is 5 feet longer.' },
  { name: 'Phases of the Moon', text: 'You choose its starting phase.' },
  { name: 'Moonburst', text: 'You choose which creatures in the area it affects.' }
];
