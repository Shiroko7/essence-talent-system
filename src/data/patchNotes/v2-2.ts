/**
 * Patch notes for V2.2: four new paths (Navigation, Crypt, Wisdom, and the sealed Tyranny), the
 * abilities that moved into them, and Lunar's new abilities. A snapshot of the change; ability names
 * must match the catalog names so the notes can open their full text.
 */

export const PATCH = {
  slug: 'v2-2',
  version: 'V2.2',
  name: 'Stars, Bones, and Names',
  date: '2026-11-03',
  title: 'Navigation, Crypt, Wisdom, and the Sealed Throne',
  summary: 'Four new paths: Navigation, the second Portfolio of Selûne; Crypt, the Portfolio of Myrkul; Wisdom, the Dao of memory, names, and deduction; and Tyranny, Bane’s Portfolio, sealed for now. Lunar keeps the moon and the stars themselves, with new abilities of its own.',
  image: '/og/patch-notes-v2-2.png'
};

export interface NewPath {
  id: string;
  /** "New Divine path", "New Immortal path". */
  kicker: string;
  /** What the path is about, for the page. */
  intro: string;
  /** Sealed paths can be seen but not learned. */
  sealed?: boolean;
  techniques: string[];
  cantrips: string[];
  /** New spells only. Spells that moved in are listed in MOVED. */
  spells: string[];
  domain: { label: string; name: string; examples: string };
  /** The path's Domain Expansions, one line each. */
  domainLines: { name: string; text: string }[];
  /** A note under the domain lines, such as a technique usable only in the domain. */
  domainNote?: string;
  /** The path's domain matchups. Every other path clashes with it evenly. */
  matchups: { path: string; result: string; why: string }[];
}

export const NEW_PATHS: NewPath[] = [
  {
    id: 'navigation',
    kicker: 'New Divine path',
    intro: 'The second Portfolio of Selûne. Lunar holds the moon and the stars themselves; Navigation holds the reading of them, for those who steer by the stars on land and at sea.',
    techniques: [
      'True Bearing', 'Wanderer’s Road', 'Zenith Mark',
      'Meteor Trail', 'Safest Course', 'Polestar',
      'Asterism', 'Star Road',
      'Tears of Selûne', 'Voyage Among the Stars'
    ],
    cantrips: ['Internal Compass', 'Starry Wisp'],
    spells: [
      'Guiding Star', 'Longstrider', 'Guiding Bolt', 'Easy Trail',
      'Star Scry', 'Sagittarius’s Bow', 'Billowing Sails', 'Sailor’s Shanty',
      'Guiding Light', 'Compelling Fate', 'Lucky Stars',
      'Ghostly Crew', 'Celestial Pyre',
      'Bless Vessel',
      'Find the Path', 'Star Step',
      'Cosmic Canvas', 'Starry Vision',
      'Awaken Ship Guardian',
      'Night Sky'
    ],
    domain: {
      label: 'Consecrated Ground',
      name: 'The Charted Way',
      examples: 'Lighthouses, observatories, chart rooms, any ship or caravan holding its course'
    },
    domainLines: [
      { name: 'Wanderer’s Road', text: 'Difficult terrain doesn’t slow you in combat either.' },
      { name: 'Storm Navigator', text: 'The advantage applies in any weather.' },
      { name: 'Zenith Mark', text: 'The mark lasts 8 hours.' },
      { name: 'Meteor Trail', text: 'If the attack misses, the target still takes half damage.' },
      { name: 'Asterism', text: 'You choose which creatures the lines ignore.' }
    ],
    domainNote: 'Tears of Selûne can be used only on Consecrated Ground.',
    matchups: [
      { path: 'lunar', result: 'Coexist', why: 'The sky Selûne lights is the sky her navigators read.' },
      { path: 'sky', result: 'Coexist', why: 'The stars are read from the open sky.' },
      { path: 'water', result: 'Coexist', why: 'Sailors steer by the stars and ride the water.' },
      { path: 'tempest', result: 'Navigation overcomes', why: 'Selûne’s stars guide ships home through Umberlee’s storms.' },
      { path: 'undertow', result: 'Overcomes Navigation', why: 'No star can be read below the last light.' },
      { path: 'mysteries', result: 'Overcomes Navigation', why: 'Fold the road and every chart is wrong.' },
      { path: 'shadow', result: 'Opposites', why: 'Selûne and Shar, the stars and the dark.' }
    ]
  },
  {
    id: 'crypt',
    kicker: 'New Divine path',
    intro: 'The Portfolio of Myrkul, taught by Song Tae-un in Sirius. Ruin is the kill; Crypt is what comes after it: corpses, bones, the dead who serve, decay, and old age.',
    techniques: [
      'Gravekeeper’s Sense', 'Grave Weariness', 'Bone Spear',
      'Ossuary Cage', 'Claim the Fallen', 'Marrow Armor',
      'Charnel Tide', 'Body of the Barrow',
      'Necropolis'
    ],
    cantrips: ['Death Recall'],
    spells: [
      'Bone Storm', 'Cursed with Undeath',
      'Necromantic Burst', 'Animate Ghoul',
      'Animate Dead', 'Summon Undead',
      'Wall of Bones', 'Graveburst',
      'Danse Macabre', 'Negative Energy Flood', 'Grave Ground', 'Waves of Exhaustion',
      'Create Undead', 'Dirge',
      'Withering Palm', 'Inevitability of the Grave',
      'Field of Bones',
      'Plague of Undead'
    ],
    domain: {
      label: 'Consecrated Ground',
      name: 'Places of the Dead',
      examples: 'Crypts, graveyards, ossuaries, temples of Myrkul, unburied battlefields'
    },
    domainLines: [
      { name: 'Gravekeeper’s Sense', text: 'Its range doubles.' },
      { name: 'Grave Weariness', text: 'You can target one more creature.' },
      { name: 'Bone Spear', text: 'It deals 4d10 piercing damage instead.' },
      { name: 'Ossuary Cage', text: 'It doesn’t require concentration.' }
    ],
    domainNote: 'Necropolis can be used only on Consecrated Ground. It covers all of it: healing is halved and death saving throws have disadvantage for the living creatures you choose.',
    matchups: [
      { path: 'ruin', result: 'Coexist', why: 'Bhaal and Myrkul are two of the Dead Three: murder fills the grave.' },
      { path: 'tyranny', result: 'Coexist', why: 'Myrkul chose the dead because every subject of Bane’s ends up his.' },
      { path: 'wood', result: 'Crypt overcomes', why: 'Myrkul’s autumn strips every bough.' }
    ]
  },
  {
    id: 'wisdom',
    kicker: 'New Immortal path',
    intro: 'The Dao of memory, names, and deduction, taught by Harphonia “Harpy” in Sirius. It works from what you have seen: what has happened, what a thing is, and what comes next. Names show what a thing is and can bind it with oaths and titles, but they never grant full control.',
    techniques: [
      'Call by Name', 'Gleaned Knowledge', 'Lost Thought', 'Remember Yourself',
      'Foreseen Retreat', 'Name the Habit', 'Sworn Oath', 'Drowned in Memory',
      'Litany of Names', 'Locked Archive', 'Imposed Oath', 'Learned at a Glance', 'Never Twice',
      'Bestow Title', 'Ten Thousand Lives Unlived'
    ],
    cantrips: ['Encode Thoughts', 'Transfer Lore', 'Psychic Shock'],
    spells: [
      'Identify', 'Comprehend Languages', 'Faultfinder', 'Perfect Recollection',
      'Borrowed Knowledge', 'Detect Thoughts', 'Read Object',
      'Tongues', 'Intellect Fortress',
      'Raulothim’s Psychic Lance', 'Know Vulnerabilities',
      'Legend Lore', 'Modify Memory', 'Eidetic Memory',
      'Probe Thoughts',
      'Echoes of the Departed', 'Name the Unseen',
      'Mind Blank',
      'Hindsight', 'Mass Modify Memory'
    ],
    domain: {
      label: 'Sanctum',
      name: 'The Archive',
      examples: 'A library or archive where you study, or a place whose history you have learned by heart'
    },
    domainLines: [
      { name: 'Call by Name', text: 'Its damage dice are d12s.' },
      { name: 'Lost Thought', text: 'The target has disadvantage on the saving throw.' },
      { name: 'Remember Yourself', text: 'You can target one more ally.' },
      { name: 'Name the Habit', text: 'It lasts up to 1 minute instead, and the target repeats the saving throw at the end of each of its turns, ending the effect on a success.' },
      { name: 'Sworn Oath', text: 'A creature that breaks it takes 6d12 force damage instead.' },
      { name: 'Imposed Oath', text: 'The target has disadvantage on the saving throw.' },
      { name: 'Foreseen Retreat', text: 'You can read one more creature.' },
      { name: 'Drowned in Memory', text: 'Its damage dice are d12s.' }
    ],
    matchups: [
      { path: 'shadow', result: 'Wisdom overcomes', why: 'What is remembered can’t be lost to Shar’s forgetting.' },
      { path: 'mysteries', result: 'Opposites', why: 'The Dao that can be named is not the eternal Dao. Both collapse before the roll, even under Dao Domain: the first Immortal opposites.' }
    ]
  },
  {
    id: 'tyranny',
    kicker: 'New Divine path, sealed',
    intro: 'The Portfolio of Bane: rule by fear and one iron will. Tyranny is sealed. You can read every ability in it, but nobody can learn it until it opens in the campaign. Until then, only NPCs use it.',
    sealed: true,
    techniques: [
      'Black Hand', 'Chains of the Black Lord',
      'Dread Gaze', 'Make an Example', 'Tribute of Fear',
      'Iron Command', 'Iron Legion',
      'Throne of Dread'
    ],
    cantrips: ['Eidolic Chains', 'Icon of Fear'],
    spells: [
      'Command', 'Cause Fear', 'Wrathful Smite', 'Compelled Duel',
      'Hold Person', 'Crown of Madness', 'Infernal Shackles', 'Power Word Kneel',
      'Fear', 'Enemies Abound', 'Chains of Perdition',
      'Phantasmal Killer', 'Commandment',
      'Hold Monster', 'Planar Binding', 'Power Word: Obey', 'Dark Lord’s Mantle',
      'Bound into Obedience', 'Aura of Terror', 'The Doom of Bane',
      'Sovereign Edict',
      'Crown of Glory',
      'Weird'
    ],
    domain: {
      label: 'Consecrated Ground',
      name: 'Places of Dominion',
      examples: 'Temples of Bane, a tyrant’s throne room or fortress, conquered cities, slave pits'
    },
    domainLines: [
      { name: 'Chains of the Black Lord', text: 'It is restrained instead of grappled.' },
      { name: 'Dread Gaze', text: 'You can target one more creature.' },
      { name: 'Make an Example', text: 'Enemies within 60 feet of you are affected instead.' },
      { name: 'Iron Command', text: 'Its damage dice are d10s.' }
    ],
    domainNote: 'Throne of Dread can be used only on Consecrated Ground, and it reaches every creature there that can see you.',
    matchups: [
      { path: 'ruin', result: 'Coexist', why: 'Bhaal and Bane are two of the Dead Three, who won their power from Jergal together.' },
      { path: 'crypt', result: 'Coexist', why: 'Myrkul chose the dead because every subject of Bane’s ends up his.' },
      { path: 'providence', result: 'Overcomes Tyranny', why: 'Ilmater breaks the chains Bane forges.' }
    ]
  }
];

/** Abilities that moved path, with the path they left. */
export const MOVED: { name: string; from: string; to: string }[] = [
  { name: 'Storm Navigator', from: 'tempest', to: 'navigation' },
  { name: 'Mage Hand', from: 'ruin', to: 'mysteries' },
  { name: 'Locate Creature', from: 'lunar', to: 'navigation' },
  { name: 'Chill Touch', from: 'ruin', to: 'crypt' },
  { name: 'Toll the Dead', from: 'ruin', to: 'crypt' },
  { name: 'Speak with Dead', from: 'ruin', to: 'crypt' },
  { name: 'Circle of Death', from: 'ruin', to: 'crypt' },
  { name: 'Finger of Death', from: 'ruin', to: 'crypt' },
  { name: 'Wail of the Banshee', from: 'ruin', to: 'crypt' },
  { name: 'Blight', from: 'pestilence', to: 'crypt' },
  { name: 'Abi-Dalzim’s Horrid Wilting', from: 'pestilence', to: 'crypt' },
  { name: 'Befuddlement', from: 'pestilence', to: 'wisdom' }
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

/** Existing paths that gain techniques in V2.2, in the order the page shows them. */
export const EXPANDED: {
  id: string; intro: string; techniques: string[]; domainLines: { name: string; text: string }[];
  changes?: { name: string; text: string }[];
}[] = [
  {
    id: 'water',
    intro: 'Water gets two Master techniques and its first Grandmaster tier, whose two strongest techniques work only in your Favored Domain, and its older techniques get Domain Expansions.',
    techniques: ['Hydraulic Torrent', 'Riding the Current', 'Arctic Rift', 'Four Strands of the Unbreaking Wave', 'Deluge'],
    domainLines: [
      { name: 'Ice Form', text: 'Your speed isn’t reduced.' },
      { name: 'Restorative Rain', text: 'Each creature that starts its turn in the rain also loses 1 level of exhaustion, once per use.' },
      { name: 'Hydroportation', text: 'It needs no water or mist.' },
      { name: 'Hydraulic Torrent', text: 'It pushes creatures 30 feet instead.' },
      { name: 'Riding the Current', text: 'It pushes the target 20 feet instead.' },
      { name: 'Four Strands of the Unbreaking Wave', text: 'Domain-bound: you can use it only in your Favored Domain.' },
      { name: 'Deluge', text: 'Domain-bound: you can use it only in your Favored Domain.' }
    ]
  },
  {
    id: 'mysteries',
    intro: 'Mysteries gets three new techniques in every tier from Initiate to Grandmaster: wells, reflections, and folded space and time.',
    techniques: [
      'Fall Through the Well', 'Not Yet', 'Crooked Road',
      'Echo of a Moment Ago', 'Fold the Distance', 'The Reflection Strikes Too',
      'Fall Through the Years', 'Stretched Distance', 'Ring of Mirrors',
      'Return to the Mark', 'Cut Away from the World', 'Only a Reflection'
    ],
    domainLines: [
      { name: 'Fall Through the Well', text: 'Its range is 120 feet.' },
      { name: 'Crooked Road', text: 'Its range is 120 feet.' },
      { name: 'Fold the Distance', text: 'Its range is 60 feet.' },
      { name: 'Fall Through the Years', text: 'It is a 60-foot cone.' },
      { name: 'Stretched Distance', text: 'The emanation is 60 feet.' }
    ]
  },
  {
    id: 'alchemy',
    intro: 'Alchemy gets crafted poisons, body grafts (claws, tentacles, wings), and new medicine from the Espora Tribe, and its older techniques get Domain Expansions. Pestilence keeps venom of the body; Alchemy brews doses and mists.',
    techniques: ['Lethargy Draught', 'Nightshade Tincture', 'Mindfog', 'Purple Worm Extract', 'Claw Graft', 'Tentacle Graft', 'Wing Graft', 'Healing Bomb', 'Living Suture'],
    domainLines: [
      { name: 'Quickening Draught', text: 'Your speed increases by 20 feet instead.' },
      { name: 'Enchanting Perfume', text: 'One ally within 30 feet also gains the benefit.' },
      { name: 'Strength Booster', text: 'The bonus is a d6 instead.' },
      { name: 'Caustic Bomb', text: 'You choose which creatures in the area it affects.' },
      { name: 'Miasmic Cloud', text: 'Its radius is 20 feet.' },
      { name: 'Acidic Embrace', text: 'If you’re wielding two weapons, it coats both.' },
      { name: 'Nightshade Tincture', text: 'Its range is 60 feet.' },
      { name: 'Erosion of Being', text: 'It deals 8d8 acid damage instead of 6d8.' },
      { name: 'Lethargy Draught', text: 'It falls unconscious for 10 minutes instead.' },
      { name: 'Claw Graft', text: 'Its damage dice are d10s.' },
      { name: 'Tentacle Graft', text: 'The escape DC is 2 higher.' },
      { name: 'Wing Graft', text: 'It lasts 10 minutes instead.' },
      { name: 'Healing Bomb', text: 'It restores an extra 2d8 hit points.' },
      { name: 'Living Suture', text: 'The part can have been severed within the last 24 hours.' }
    ],
    changes: [
      { name: 'Extended Reach', text: 'Moves from Adept to Initiate.' },
      { name: 'Explosive Savant', text: 'Moves from Adept to Master. Expanded Explosion stays at Adept, so the explosive passives now climb one per tier.' },
      { name: 'Acidic Precision', text: 'Moves from Initiate to Adept.' },
      { name: 'Chemical Expertise', text: 'Moves from Adept to Master.' }
    ]
  },
  {
    id: 'heart',
    intro: 'Heart gets Domain Expansions on its martial techniques: advantage on the attack, half damage on a miss, or a step after the strike.',
    techniques: [],
    domainLines: [
      { name: 'Radiant Vein Blade I: Twin Strike of Conviction', text: 'A miss doesn’t break the flow.' },
      { name: 'Radiant Vein Blade II: Aegis of the Righteous', text: 'You have advantage on the attack roll.' },
      { name: 'Radiant Vein Blade III: Cascading Judgment', text: 'You have advantage on the weapon attack roll.' },
      { name: 'Rush Attack', text: 'You have advantage on the attack roll.' },
      { name: 'Pommel Strike', text: 'You have advantage on the attack roll.' },
      { name: 'Concussive Smash', text: 'You have advantage on the attack roll.' },
      { name: 'Disarming Feint', text: 'You have advantage on the attack roll.' },
      { name: 'Skirmisher’s Volley (Mobile Shot)', text: 'You have advantage on the attack roll.' },
      { name: 'Venomous Bite (Gio)', text: 'You have advantage on the attack roll.' },
      { name: 'Tendon Sever (Maiming Strike)', text: 'If the attack misses, the target still takes half damage.' },
      { name: 'Sky-Piercing Execution', text: 'If the attack misses, the target still takes half damage.' },
      { name: 'Ascending Dragon Gale', text: 'You can then move up to half your speed without provoking opportunity attacks.' },
      { name: 'Iron Stance (Brace)', text: 'You gain temporary hit points equal to twice your PB.' }
    ]
  }
];

/** Techniques learned in stages, now linked as one series each. Names are the catalog's, stage by stage. */
export const STAGED: { path: string; stages: 'replace' | 'add'; names: string[] }[] = [
  { path: 'heart', stages: 'replace', names: ['Stone Fist I', 'Stone Fist II', 'Stone Fist III', 'Stone Fist IV', 'Stone Fist V'] },
  { path: 'pestilence', stages: 'replace', names: ['Toxic Skin Secretion I', 'Toxic Skin Secretion II', 'Toxic Skin Secretion III'] },
  { path: 'heart', stages: 'add', names: ['Radiant Vein Blade I: Twin Strike of Conviction', 'Radiant Vein Blade II: Aegis of the Righteous', 'Radiant Vein Blade III: Cascading Judgment'] },
  { path: 'shadow', stages: 'add', names: ['Netherdark Fist', 'Netherdark Fist II: Voidstride', 'Netherdark Fist III: Gravitic Collapse', 'Netherdark Fist IV: Reality Rend', 'Netherdark Fist V: Absolute Oblivion'] },
  { path: 'water', stages: 'add', names: ['Tide\'s Reflection Art I (Thalassios)', 'Tide\'s Reflection Art II (Thalassios)', 'Tide\'s Reflection Art III (Thalassios)'] },
  { path: 'alchemy', stages: 'add', names: ['Vital Essence Sublimation I (Nilo)', 'Vital Essence Sublimation II (Nilo)', 'Vital Essence Sublimation III (Nilo)'] }
];
