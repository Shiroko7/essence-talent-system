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
      { path: 'crypt', name: 'Places of the Dead', examples: 'Crypts, graveyards, ossuaries, temples of Myrkul, unburied battlefields' },
      { path: 'tyranny', name: 'Places of Dominion', examples: 'Temples of Bane, a tyrant’s throne room or fortress, conquered cities, slave pits' },
      { path: 'pestilence', name: 'Places of Sickness', examples: 'Plague towns, poisoned lands, sickrooms, sewers' },
      { path: 'shadow', name: 'The Dark', examples: 'Darkness, lightless underground, places of loss' },
      { path: 'tempest', name: 'The Storm', examples: 'At sea, inside a storm, shipwrecks' },
      { path: 'undertow', name: 'The Deep', examples: 'Shrines of Yhal’etsu, the open sea below the last light, any wreck or shore where someone drowned' },
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
    summary: 'A place you have made your own through cultivation, where your Dao Heart settles: your furnace, your training hall, your well. It can be moved or rebuilt, but it takes time to become yours. At Grandmaster you can enter it anywhere for an hour a day.',
    domains: [
      { path: 'alchemy', name: 'At the Furnace', examples: 'Within 30 feet of your alchemy furnace or workshop' },
      { path: 'heart', name: 'The Training Hall', examples: 'A sect training hall or dueling ground where you train, or any ground where you face a worthy opponent' },
      { path: 'mysteries', name: 'The Reflection', examples: 'Near a still reflection (a well, a pond, a mirror), or where the planes are thin' },
      { path: 'wisdom', name: 'The Archive', examples: 'A library or archive where you study, or a place whose history you have learned by heart' }
    ],
    tiers: tiers([
      ['Essence Restoration', 'Finish a short rest in your Sanctum to regain all expended Immortal Essence.'],
      ['Tempered Body', 'In your Sanctum, when you roll initiative, gain temporary hit points equal to 10 + your level.'],
      ['Natal Treasure', 'One extra attunement slot for a single item you refine into your natal treasure over a long rest in your Sanctum. It stays bound to you until you choose another.'],
      ['Dao Domain', 'Once per day, as an action or when you roll initiative, you enter your Sanctum for 1 hour, wherever you are. For that hour it never collapses in a clash, even if your side loses, but it still joins clashes and can make other domains collapse.'],
      ['Transcendence', 'You are no longer mortal, and no longer written into fate. Your creature type becomes Immortal, and effects that only work on specific creature types don’t affect you. A creature that targets you with divination, prophecy, or a curse takes 10d10 force damage, or half as much on a successful Constitution saving throw against your essence ability save DC.']
    ]),
    notes: ['Choose one Immortal path you have learned; only its Sanctum counts.']
  }
];

/** What a domain is called in each family, as it labels a domain line. */
export const DOMAIN_LABELS: Record<string, string> = Object.fromEntries(ATTUNEMENTS.map(a => [a.family, a.domainLabel]));

export const GENERAL_RULES = [
  'You hold one Attunement and one domain: a single Favored Domain, Consecrated Ground, or Sanctum, from one path you have learned.',
  'You gain the Attunement’s benefit for each tier you reach.',
  'The DM decides whether you are in your domain.'
];

/** Domain clashes: what happens when enemy domains meet. Player-facing; the odds stay off the page. */
export const DOMAIN_CLASH = {
  /** Domain rolls by level (creatures use their CR): a normal clash, and one where your path overcomes theirs. */
  levels: [13, 14, 15, 16, 17, 18, 19, 20].map(level => {
    const bonus = level > 13 ? `+${level - 13}` : '';
    return { level, clash: `${level < 17 ? '2d6' : '2d10'}${bonus}`, overcome: `${level < 17 ? '2d8' : '2d12'}${bonus}` };
  }),
  steps: [
    'Enemy domains clash at initiative, or at the start of the round after a new domain goes up.',
    'Every domain that’s up joins the clash on its side. Allied domains never clash with each other, so each side can bring any number of domains.',
    'One side holds the field and every other side challenges. The holder is the side whose domain the ground itself already is; otherwise the side with the higher level or CR; otherwise the side with the higher initiative.',
    'Every domain on every side makes its domain roll. Each side keeps only its highest roll.',
    'The highest roll wins, and the holders win ties. Every domain on every other side collapses. With more than two sides, all of them roll at once.'
  ],
  sovereign: 'Some Great Grandmasters hold their domain so firmly that it can’t be challenged while they have more than half their hit points.',
  /** Matchups with no roll: they never reach the dice. */
  coexist: 'Stays out of the clash and stays up. Applies when your domain coexists with every enemy domain.',
  opposite: 'Both domains collapse before the roll.'
};

/** Path pairs that coexist (either way round), with the reason. Immortal paths coexist with nothing. */
export const COEXIST: [string, string, string][] = [
  ['sky', 'fire', 'Wind fans the flame.'], ['tempest', 'water', 'Umberlee’s storms ride the open sea.'],
  ['lunar', 'love', 'Selûne’s moonlight and Sune’s beauty: lovers meet under the moon.'], ['love', 'providence', 'Bonds give the will to endure.'],
  ['ruin', 'shadow', 'Murder done in the dark.'], ['ruin', 'pestilence', 'Blade and plague serve the same end.'],
  ['tempest', 'undertow', 'Umberlee sinks the ships; the deep keeps them.'], ['shadow', 'undertow', 'The deep is as lightless as Shar’s dark.'],
  ['water', 'undertow', 'The deep is still the sea.'], ['pestilence', 'shadow', 'Talona is Shar’s ally: plague spreads in the dark.'],
  ['lunar', 'sky', 'The moon rides the open sky.'], ['earth', 'shadow', 'Shar keeps her caverns in the stone.'],
  ['ruin', 'crypt', 'Bhaal and Myrkul are two of the Dead Three: murder fills the grave.'],
  ['ruin', 'tyranny', 'Bhaal and Bane are two of the Dead Three, who won their power from Jergal together.'],
  ['crypt', 'tyranny', 'Myrkul chose the dead because every subject of Bane’s ends up his.']
];

/**
 * The first path overcomes the second, with the reason. Immortal paths are overcome by nothing and
 * overcome only Divine paths.
 */
export const OVERCOMES: [string, string, string][] = [
  ['wood', 'earth', 'Roots split stone.'], ['earth', 'water', 'Banks contain the river.'], ['water', 'fire', 'The tide drowns the flame.'],
  ['fire', 'metal', 'The forge melts the blade.'], ['metal', 'wood', 'The axe fells the tree.'],
  ['fire', 'wood', 'Fire burns Wood.'], ['earth', 'fire', 'Ash smothers the flame.'], ['metal', 'earth', 'The mine hollows the mountain.'],
  ['water', 'metal', 'Water rusts Metal.'], ['wood', 'water', 'Roots drink the spring dry.'],
  ['fire', 'shadow', 'Firelight drives back the dark.'], ['sky', 'pestilence', 'The clean wind scatters the miasma.'],
  ['lunar', 'water', 'The tides answer to Selûne.'], ['lunar', 'tempest', 'Selûne’s light guides ships home through Umberlee’s storms.'],
  ['shadow', 'love', 'Shar is the mistress of loss: forgetting hollows out every bond.'],
  ['love', 'wood', 'Beasts of the wild answer to kinship, as in Animal Friendship and Dominate Beast.'],
  ['pestilence', 'wood', 'Talona’s blight withers the green.'], ['pestilence', 'water', 'Poisoned wells.'], ['pestilence', 'love', 'Talona’s rot spoils Sune’s beauty.'],
  ['tempest', 'fire', 'Umberlee’s rain drowns the fire.'], ['tempest', 'sky', 'The storm front swallows the local winds.'],
  ['providence', 'ruin', 'Ilmater endures every torment Loviatar devises.'],
  ['alchemy', 'pestilence', 'Every poison has its antidote.'],
  ['heart', 'ruin', 'A tempered body shrugs off pain; a steady Dao Heart sees through deceit.'],
  ['mysteries', 'lunar', 'Fishing the Moon from the Well: the reflection takes the moon itself.'],
  ['mysteries', 'shadow', 'Space folds around any hiding place.'],
  ['undertow', 'lunar', 'Moonlight never reaches below the last light.'], ['undertow', 'fire', 'Nothing burns in the deep.'],
  ['undertow', 'metal', 'The pressure of the deep crushes iron.'], ['earth', 'undertow', 'Stone doesn’t drown.'],
  ['lunar', 'ruin', 'Selûne’s light exposes Mask’s thieves.'],
  ['crypt', 'wood', 'Myrkul’s autumn strips every bough.'],
  ['providence', 'tyranny', 'Ilmater breaks the chains Bane forges.'],
  ['wisdom', 'shadow', 'What is remembered can’t be lost to Shar’s forgetting.']
];

/** Opposite paths (either way round), with the reason. */
export const OPPOSITES: [string, string, string][] = [
  ['sky', 'earth', 'Heaven and earth.'], ['lunar', 'shadow', 'Selûne and Shar, moonlight and the dark.'],
  ['love', 'ruin', 'Sune’s devotion against murder and betrayal.'], ['pestilence', 'providence', 'Talona’s plague against Ilmater’s healing.'],
  ['sky', 'undertow', 'Heaven and the abyss.']
];

export type Matchup = 'coexist' | 'overcome' | 'overcome-by' | 'opposite' | 'clash';

/** How path a's domain meets path b's, and why. */
export const matchup = (a: string, b: string): { kind: Matchup; why: string } => {
  if (a === b) return { kind: 'coexist', why: 'The same path.' };
  const either = (list: [string, string, string][]) => list.find(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const coexist = either(COEXIST);
  if (coexist) return { kind: 'coexist', why: coexist[2] };
  const opposite = either(OPPOSITES);
  if (opposite) return { kind: 'opposite', why: opposite[2] };
  const over = OVERCOMES.find(([x, y]) => x === a && y === b);
  if (over) return { kind: 'overcome', why: over[2] };
  const under = OVERCOMES.find(([x, y]) => x === b && y === a);
  if (under) return { kind: 'overcome-by', why: under[2] };
  return { kind: 'clash', why: 'They clash evenly.' };
};
