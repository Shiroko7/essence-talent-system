/**
 * Patch notes for the move from V1 (nine elemental essences) to V2 (cultivation
 * paths). This is a snapshot of the change, not a live diff: later catalog edits
 * belong in the changelog. Ability names are looked up in the catalogs to show
 * their tier and full text, so they must match the catalog names.
 */

export interface PathAbilities {
  /** V2 path ID (V1 essence ID for removed abilities). */
  path: string;
  talents?: string[];
  spells?: string[];
}

export interface MovedFrom {
  /** V1 essence ID. */
  from: string;
  status: 'kept' | 'renamed' | 'deleted';
  note: string;
  to: PathAbilities[];
}

export interface Rebalance {
  name: string;
  path: string;
  before: string;
  after: string;
  note?: string;
}

export const PATCH = {
  version: 'V2.0',
  name: 'Cultivation Paths',
  date: '2026-09-26',
  title: 'Essence System Overhaul: New Paths to Divinity and Immortality? Poison Path DELETED!?',
  /** Link preview text and image (see vite.config.ts). */
  summary: 'Nine essences became sixteen cultivation paths across three Essence pools: Primordial, Divine and Immortal. 218 new abilities, rebalances, and where every old ability went.',
  image: '/og/patch-notes-v2.png'
};

export const MOTIVATION = [
  "This is a major overhaul of the essence system. It isn't necessarily the final version, but it's likely very close.",
  "It doesn't change much about how the abilities themselves work. A handful moved up or down a tier; everything else plays the same. What changed is the layout: the nine essences are gone, replaced by sixteen cultivation paths drawn from three sources.",
  'The Dao is infinite. It cannot be spoken, and it cannot be mapped onto a handful of paths. V1 treated its nine essences as if they covered everything, which is how Wood and Acid ended up holding an absurd number of spells. V2 is my attempt to show the divine portfolios I completely failed to convey during the Leatrux arc. It also gives a home to the rogue abilities I handed out that belonged nowhere.',
  'The paths you see are the ones you have encountered on your journey and could learn. They are not a complete map of the cosmology. To round each path out, I added third-party spells from 5e.tools, so you can see its baseline all the way up to Great Grandmaster.'
];

export const QA: { q: string; a: string }[] = [
  {
    q: 'Do I need to update now?',
    a: "No. You don't have to switch until the Sirius arc ends. V2 has more options, though, so you can switch right away if you want to. This isn't the final version, but it's likely very close."
  },
  {
    q: 'My path was deleted? What the fuck, man?',
    a: 'There was too much overlap, and I needed to free up space to keep the paths manageable. Poison lives on in Pestilence and Alchemy, Lightning split between Sky and Tempest, and Acid mostly became Alchemy. Air was renamed Sky. The "Where did my abilities go?" section shows exactly where each of yours went.'
  },
  {
    q: 'What the fuck is Heart?',
    a: 'It is the path Sirius carved to reach the pinnacle of the world, and the foundation of the Bingsan Mun.'
  },
  {
    q: 'What the fuck is Mysteries?',
    a: 'It is the path of the Netherdark Emperor, Yuji: the understanding of all natural and magical laws, and the foundation of the Shadow Gate Sect.'
  },
  {
    q: 'Do I need to pick a side, or can I use all three?',
    a: 'You can use all three. Spreading across too many paths gives you somewhat diminished returns, since your Essence is split between pools, but you do you.'
  },
  {
    q: 'Does my path have any out-of-game implications?',
    a: 'It does. Think of it as shaping the kind of ending your character gets once the campaign is over.'
  }
];

export const DELETED_ESSENCES = ['wind', 'lightning', 'poison', 'acid'];

/** V2 paths that did not exist in V1. Sky is Air renamed, so it is not listed. */
export const NEW_PATH_IDS = ['lunar', 'love', 'ruin', 'pestilence', 'shadow', 'tempest', 'providence', 'alchemy', 'heart', 'mysteries'];

export const NEW_TALENTS: (PathAbilities & { teacher: string })[] = [
  {
    path: 'heart',
    teacher: 'Bingsan Mun Sect, Sirius. Radiant Vein Blade from Kelemvor; Stone Fist IV–V from the Llamarada Tribe.',
    talents: [
      'Radiant Vein Blade I: Twin Strike of Conviction', 'Rush Attack', 'Pommel Strike', 'Lacerating Edge',
      'Radiant Vein Blade II: Aegis of the Righteous', 'Iron Stance (Brace)', 'Concussive Smash', 'Disarming Feint',
      "Skirmisher's Volley (Mobile Shot)", 'Radiant Vein Blade III: Cascading Judgment', 'Tendon Sever (Maiming Strike)',
      'Stone Fist IV', 'Heartstopper (Sternum Shatter)', 'Unwavering Belief', 'Supreme Heart-Reflection Sword',
      'Divine Ocean-Splitting Record', 'Azure Dragon Ascending the Waves', 'Stone Fist V'
    ]
  },
  {
    path: 'mysteries',
    teacher: 'Shadow Sect, Sirius.',
    talents: ['Mouth of the Well', 'Illusory and Real', 'Unshaken Conviction', 'Fishing the Moon from the Well']
  },
  {
    path: 'shadow',
    teacher: 'Shar and the Netherdark Emperor "Yuji", Leatrux.',
    talents: [
      'Shadow Veil', 'Netherdark Fist', 'Netherdark Fist II: Voidstride', 'Armor of Darkness', 'Darkbolt',
      'Netherdark Fist III: Gravitic Collapse', 'Netherdark Fist IV: Reality Rend', 'Netherdark Fist V: Absolute Oblivion'
    ]
  },
  {
    path: 'ruin',
    teacher: 'Bhaal, Cyric and Loviatar, Leatrux.',
    talents: [
      'Blood Scent', "Bhaal's Tribute", "Whip's Kiss", 'Decay', 'Mark for Death', 'Blood Tithe', "Assassin's Shroud",
      'Mass Inflict Wounds', 'Crown of Agony', 'Mark of Doom'
    ]
  },
  {
    path: 'providence',
    teacher: 'Ilmater, Leatrux.',
    talents: ['Unbroken Spirit', 'Touch of Respite', 'Boon of Fortitude', 'Gift of Enduring Faith', 'Endurance of Ilmater', 'Agony of the Martyr']
  },
  {
    path: 'pestilence',
    teacher: 'Talona, Leatrux.',
    talents: ['Corrosive Touch', 'Creeping Pestilence', 'Pestilent Cloud', 'Lingering Touch', 'Blessed Immunity']
  },
  {
    path: 'love',
    teacher: 'Cyric, Leatrux.',
    talents: ['Attraction/Disdain']
  }
];

export const NEW_SPELLS: PathAbilities[] = [
  { path: 'wood', spells: ['Druidcraft', 'Wrath of Nature', 'Druid Grove', 'Summon Dinosaur', 'Arboreal Curse', 'Regenerate', 'Bloom', 'Forest Sanctuary', 'Primordial Rainforest', 'World Tree'] },
  { path: 'earth', spells: ['Jotun Form', 'Mighty Fortress', 'Rocks Fall', 'Invulnerability'] },
  { path: 'metal', spells: ['Magic Weapon', 'Forcecage', 'Iron Body'] },
  { path: 'water', spells: ['Ice Soldiers', 'Triumph of Ice', 'Glacial Cascade', 'Great Wave', 'Deep Freeze', 'Glacial Tide', 'Grand Flood', 'Ice Mountain'] },
  { path: 'sky', spells: ['Message', 'Arcanomagnetic Storm', 'Aura of Evasion', 'Lightning Ring', 'Roaring Winds of Limbo', 'Heavenstorm', 'Hurricane', 'Wind Wake'] },
  { path: 'lunar', spells: ['Dancing Lights', 'Faerie Fire', 'Moonbeam', 'See Invisibility', 'Divination', 'Dream', 'True Seeing', 'Crown of Stars', 'Dream of the Blue Veil', 'Moment of Prescience', 'Wyrd Sight'] },
  { path: 'love', spells: ['Friends', 'Vicious Mockery', 'Charm Person', 'Calm Emotions', 'Enthrall', 'Suggestion', 'Charm Monster', 'Compulsion', 'Dominate Person', 'Geas', 'Mass Suggestion', 'Tether Essence', 'Transfix', 'Antipathy/Sympathy', 'Dominate Monster', 'Telepathy', 'Obsession', 'Virus Charm'] },
  { path: 'ruin', spells: ['Chill Touch', 'Mage Hand', 'Mind Sliver', 'Toll the Dead', "Hunter's Mark", 'Inflict Wounds', 'Vampiric Touch', 'Mislead', 'Seeming', 'Harm', 'Dread Curse of Azathoth', 'Finger of Death', 'Power Word Maim', 'Power Word Pain', 'Doom of False Friends', 'Glibness', 'Power Word Stun', 'Power Word Kill', 'Psychic Scream', 'Wail of the Banshee', 'Wave of Oblivion', 'Wipe Face'] },
  { path: 'pestilence', spells: ['Bane', 'Remove Curse', 'Blight', 'Fleshcrawl', 'Symbol', "Abi-Dalzim's Horrid Wilting", 'Befuddlement', 'Creeping Death', 'Flense', 'Lifesink'] },
  { path: 'shadow', spells: ['Minor Illusion', 'Blindness/Deafness', 'Blur', 'Darkness', 'Mirror Image', 'Nondetection', 'Greater Invisibility', 'Shadow of Moil', 'Devouring Darkness', 'Shadow Form', 'Grace of Shar', 'Investiture of Shadow', 'Conjure Shadow Titan', 'Dying of the Light', 'Sequester', 'Void Star', 'Creeping Darkness', 'Dark Star', 'Maddening Darkness', 'Ravenous Void', 'Umbral Storm', 'Vision of Elapsing Eons'] },
  { path: 'tempest', spells: ['Thunderous Smite', 'Red Rain', 'Beast of Ragnarok'] },
  { path: 'providence', spells: ['Guidance', 'Resistance', 'Spare the Dying', 'Bless', 'Heroism', 'Aid', 'Warding Bond', 'Beacon of Hope', 'Death Ward', 'Freedom of Movement', 'Circle of Power', 'Holy Weapon', "Heroes' Feast", 'Power Word Fortify', 'Power Word Shield', 'Holy Aura', 'Perfection', 'Phoenix Flames'] },
  { path: 'alchemy', spells: ['Mending', "Tasha's Caustic Brew", 'Greater Restoration', 'Create Magen', 'Clone', 'Detonate', 'Mass Polymorph', 'Steal Immortality'] },
  { path: 'heart', spells: ['True Strike'] },
  { path: 'mysteries', spells: ['Prestidigitation', 'Gift of Alacrity', "Fortune's Favor", 'Rope Trick', 'Wristpocket', 'Blink', 'Slow', 'Dimension Door', 'Far Step', 'Teleportation Circle', 'Temporal Shunt', 'Arcane Gate', 'Scatter', "Mordenkainen's Magnificent Mansion", 'Plane Shift', 'Demiplane', 'Reality Break', 'Gate', 'Paradox', 'Time Ravage'] }
];

export const MOVED: MovedFrom[] = [
  {
    from: 'wind', status: 'renamed', note: 'Air is now Sky. Everything not listed here moved to Sky.',
    to: [
      { path: 'heart', talents: ['Ascending Dragon Gale', 'Cyclone Step', 'Gale Force Strike', 'Sky-Piercing Execution', 'Static Slipstream'] },
      { path: 'lunar', talents: ['Waning Moon Sabers', 'Lunar Wind Spiral'] },
      { path: 'shadow', talents: ['Echoing Footsteps', 'Umbral Form'], spells: ['Silence', 'Etherealness'] },
      { path: 'providence', talents: ['Fortune Favors the Swift', 'Liberation’s Gale'] },
      { path: 'water', talents: ['Misty Escape'], spells: ['Cone of Cold', "Otiluke's Freezing Sphere"] },
      { path: 'tempest', spells: ['Fog Cloud', 'Whirlwind', 'Control Weather', 'Storm of Vengeance'] },
      { path: 'pestilence', spells: ['Stinking Cloud', 'Cloudkill'] },
      { path: 'mysteries', spells: ['Haste', 'Reverse Gravity'] },
      { path: 'fire', spells: ['Incendiary Cloud'] }
    ]
  },
  {
    from: 'lightning', status: 'deleted', note: 'Direct lightning went to Sky; storm lightning went to Tempest.',
    to: [
      { path: 'sky', talents: ['Lightning Step', 'Static Reflexes', 'Arc Chain', 'Conductive Touch', 'Lightning Javelin', 'Lightning Sense', 'Lightning Cage'], spells: ['Shocking Grasp', 'Witch Bolt', 'Lightning Bolt', 'Chain Lightning'] },
      { path: 'tempest', talents: ['Lightning Insight', 'Storm Navigator', 'Stormborn Presence', 'Thunderous Entrance', 'Thunderous Strike', 'Extinguishing Lightning'], spells: ['Lightning Lure', 'Call Lightning', 'Lightning Arrow', 'Storm Sphere', 'Ride the Lightning', 'Control Weather', 'Storm of Vengeance'] },
      { path: 'heart', talents: ['Thunderous Speed'] },
      { path: 'mysteries', spells: ['Teleport'] }
    ]
  },
  {
    from: 'poison', status: 'deleted', note: 'Venom and disease went to Pestilence; brews, perfumes and mutagens went to Alchemy.',
    to: [
      { path: 'pestilence', talents: ['Venomous Touch', 'Toxic Skin Secretion I', 'Toxic Skin Secretion II', 'Toxic Skin Secretion III', 'Hallucinogenic Trance', 'Vestibular Trance', 'Venomous Precision', 'Venomous Strike'], spells: ['Poison Spray', 'Infestation', 'Purify Food and Drink', 'Ray of Sickness', 'Protection from Poison', 'Bestow Curse', "Syluné's Viper", 'Cloudkill', 'Contagion', 'Investiture of Venom'] },
      { path: 'alchemy', talents: ['Enchanting Perfume', 'Herbalist’s Knowledge', 'Quickening Draught', 'Strength Booster', 'Vital Essence Sublimation I (Nilo)', 'Vital Essence Sublimation II (Nilo)', 'Vital Essence Sublimation III (Nilo)', 'Mutagen Formula (Strength)', 'Mutagen Formula (Dexterity)', 'Mutagen Formula (Constitution)', 'Mutagen Formula (Intelligence)', 'Mutagen Formula (Wisdom)', 'Mutagen Formula (Charisma)', 'Pill of Focus', 'Apex Toxinator'], spells: ['Enlarge/Reduce'] },
      { path: 'lunar', talents: ['Moonlit Verdant Beam'], spells: ['Prismatic Spray', 'Prismatic Wall'] },
      { path: 'heart', talents: ['Venomous Bite (Gio)'] },
      { path: 'ruin', spells: ['Circle of Death'] },
      { path: 'shadow', spells: ['Swallow Magic'] }
    ]
  },
  {
    from: 'acid', status: 'deleted', note: 'Most of Acid became Alchemy. The rest scattered to wherever its effect fits.',
    to: [
      { path: 'alchemy', talents: ['Acidic Insight', 'Acidic Precision', 'Alchemy Proficiency', 'Caustic Bomb', 'Acidic Embrace', 'Chemical Expertise', 'Expanded Explosion', 'Explosive Savant', 'Extended Reach', 'Miasmic Cloud', 'Erosion of Being', 'Seven-Color Elixir'], spells: ['Acid Splash', 'Primal Savagery', 'Chaos Bolt', 'Chromatic Orb', 'Acid Arrow', 'Vitriolic Sphere', 'Disintegrate'] },
      { path: 'shadow', talents: ['Ethereal Phase Barrier'], spells: ["Elminster's Elusion", 'Hunger of Hadar', 'Antimagic Field'] },
      { path: 'lunar', spells: ['Magic Mirror', 'Prismatic Spray', 'Prismatic Wall'] },
      { path: 'metal', spells: ['Elemental Weapon', 'Wall of Force', 'Blade of Disaster'] },
      { path: 'providence', spells: ['Absorb Elements', 'Glyph of Warding'] },
      { path: 'pestilence', spells: ['Elemental Bane'] },
      { path: 'ruin', spells: ['Synaptic Static'] },
      { path: 'tempest', spells: ['Storm of Vengeance'] }
    ]
  },
  {
    from: 'water', status: 'kept', note: 'Everything not listed here stayed in Water.',
    to: [
      { path: 'lunar', talents: ['Lunar Tide', 'Moonlit Verdant Beam', 'Rain of Revelation', 'Draconic Regeneration of the Emerald Moon', 'Moonfall Condemnation'], spells: ["Alustriel's Mooncloak"] },
      { path: 'tempest', talents: ['Raincaller'], spells: ['Fog Cloud', 'Sleet Storm', 'Tidal Wave', 'Ice Storm', 'Maelstrom', 'Tsunami'] },
      { path: 'love', talents: ['Tide of Emotions'] },
      { path: 'heart', talents: ['Frozen Insight'] },
      { path: 'alchemy', spells: ['Grease', 'Vitriolic Sphere'] },
      { path: 'pestilence', spells: ['Detect Poison and Disease', 'Protection from Poison'] },
      { path: 'sky', spells: ['Misty Step'] },
      { path: 'mysteries', spells: ['Time Stop'] }
    ]
  },
  {
    from: 'wood', status: 'kept', note: 'Everything not listed here stayed in Wood.',
    to: [
      { path: 'heart', talents: ['Coiling Resilience', 'Entangling Reach', 'Heart Exchange'] },
      { path: 'providence', spells: ["Leomund's Tiny Hut", 'Spirit Guardians', 'Guardian of Faith', 'Planar Ally', 'Conjure Celestial'] },
      { path: 'pestilence', spells: ['Purify Food and Drink', 'Giant Insect', 'Contagion', 'Insect Plague'] },
      { path: 'shadow', spells: ['Unseen Servant', 'Pass without Trace', 'Phantom Steed', 'Creation'] },
      { path: 'love', spells: ['Animal Friendship', 'Speak with Animals', 'Dominate Beast'] },
      { path: 'alchemy', spells: ['Lesser Restoration', 'Animal Shapes', 'True Polymorph'] },
      { path: 'ruin', spells: ['Speak with Dead', 'Antilife Shell'] },
      { path: 'earth', spells: ['Conjure Elemental'] },
      { path: 'lunar', spells: ['Locate Creature'] }
    ]
  },
  {
    from: 'fire', status: 'kept', note: 'Everything not listed here stayed in Fire.',
    to: [
      { path: 'ruin', talents: ['Heart Crusher Grip (Nilo)', 'Searing Gaze', 'Blazing Presence', 'Frightful Pursuit'], spells: ['Hellish Rebuke'] },
      { path: 'providence', talents: ['Martyr’s Flame Aura'] },
      { path: 'shadow', talents: ['Shadowflame Dream'] }
    ]
  },
  {
    from: 'earth', status: 'kept', note: 'Everything not listed here stayed in Earth.',
    to: [
      { path: 'heart', talents: ['Stone Fist I', 'Stone Fist II', 'Stone Fist III'] },
      { path: 'mysteries', spells: ['Reverse Gravity'] },
      { path: 'fire', spells: ['Meteor Swarm'] },
      { path: 'metal', spells: ['Imprisonment'] },
      { path: 'tempest', spells: ['Destructive Wave'] }
    ]
  },
  {
    from: 'metal', status: 'kept', note: 'Everything not listed here stayed in Metal.',
    to: [
      { path: 'earth', talents: ['Gemsight'] },
      { path: 'lunar', spells: ['Arcane Aegis', 'Foresight'] },
      { path: 'alchemy', spells: ['Fabricate'] }
    ]
  }
];

export const RETIERED: Rebalance[] = [
  { name: 'Lunar Tide', path: 'lunar', before: 'Master', after: 'Adept' },
  { name: 'Lunar Wind Spiral', path: 'lunar', before: 'Master', after: 'Grandmaster' },
  { name: 'Moonfall Condemnation', path: 'lunar', before: 'Master', after: 'Grandmaster' }
];

export const STONE_FIST: { name: string; tier: string; before?: string; after: string }[] = [
  { name: 'Stone Fist I', tier: 'Initiate', before: 'd6', after: 'd4' },
  { name: 'Stone Fist II', tier: 'Adept', before: 'd8', after: 'd6' },
  { name: 'Stone Fist III', tier: 'Master', before: 'd10', after: 'd8' },
  { name: 'Stone Fist IV', tier: 'Grandmaster', after: 'd10' },
  { name: 'Stone Fist V', tier: 'Great Grandmaster', after: 'd12' }
];

export const REWORKED: Rebalance[] = [
  { name: 'Wind Sprint', path: 'sky', before: 'Rounds equal to your Wind essences', after: 'Rounds equal to your proficiency bonus', note: 'Per-essence counts no longer exist.' },
  { name: 'Sky-Piercing Execution', path: 'heart', before: 'Description unfinished', after: 'On a hit, the target makes a Strength save or falls up to 60 feet, lands prone and takes falling damage. On a success it stays airborne.' },
  { name: "Tide's Reflection Art II (Thalassios)", path: 'water', before: 'Detonating a Water Clone was free', after: 'Detonating a Water Clone costs 2 Essence each time', note: 'An intended nerf, added after the fact. It is also now correctly listed as active, since it uses a reaction.' },
  { name: 'Venomous Bite (Gio)', path: 'heart', before: 'Spell save DC', after: 'Essence ability save DC' },
  { name: 'Apex Toxinator', path: 'alchemy', before: 'Snake Horror conjured from pure poison', after: 'Snake Horror homunculus conjured with alchemical reagents', note: 'Flavor only; it works the same.' }
];

export const FIXES: { names: string[]; path?: string; text: string }[] = [
  { names: ['Glacial Shield', 'Entangling Reach'], text: 'They use a reaction or an action, so they are now correctly listed as active instead of passive.' },
  { names: ['Earthen Ward'], text: 'V1 listed it under a stray "Active" tier. It is now Adept.' },
  { names: ['Animal Friendship'], text: 'V1 listed it at both 1st and 2nd level. It is now a 1st-level Love spell.' }
];

export const REMOVED: PathAbilities[] = [
  { path: 'acid', spells: ["Dragon's Breath", 'Elemental Exhalation', 'Primordial Power', "Songal's Elemental Suffusion", 'Draconic Transformation'] },
  { path: 'fire', spells: ['Ember Belly'] },
  { path: 'wood', spells: ['Conjure Minor Elementals'] }
];
