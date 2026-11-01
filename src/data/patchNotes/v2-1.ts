/**
 * Patch notes for V2.1: the Undertow path, domain clashes, the Ruin rebalance, the spell pass,
 * ability tags and a format cleanup. A snapshot of the change; ability names must match the catalog
 * names so the notes can open their full text.
 */

import type { PathAbilities } from './v2-0';

export const PATCH = {
  slug: 'v2-1',
  version: 'V2.1',
  name: 'Domain Expansion',
  date: '2026-10-28',
  title: 'Domain Expansion and the Undertow Path',
  summary: 'A new Divine path, Undertow, the Portfolio of Yhal’etsu. Enemy domains now clash. Ruin is rebalanced around its Consecrated Ground, abilities get tags, and every spell is rewritten from its source with 13 new ones.',
  image: '/og/patch-notes-v2.png'
};

/** Ruin's changes, one line each. "On Consecrated Ground" parts are the ability's Domain Expansion. */
export const RUIN_CHANGES: { name: string; text: string }[] = [
  { name: 'Mark for Death', text: 'Now requires concentration, except on Consecrated Ground.' },
  { name: 'Blood Tithe', text: 'Temporary hit points are now equal to your proficiency bonus, or your character level on Consecrated Ground.' },
  { name: 'Mark of Doom', text: 'Can only be used on Consecrated Ground. The mark still lasts 24 hours wherever the target goes.' },
  { name: 'Whip’s Kiss', text: 'Now once per turn. On Consecrated Ground it deals extra damage equal to your proficiency bonus.' },
  { name: 'Crown of Agony', text: 'Now takes a bonus action to use.' },
  { name: 'Heart Crusher Grip (Nilo)', text: 'On Consecrated Ground, its range is 60 feet.' },
  { name: 'Blood Scent', text: 'On Consecrated Ground, its extra damage die is a d6.' },
  { name: 'Searing Gaze', text: 'On Consecrated Ground, you have advantage on the Intimidation check.' },
  { name: 'Assassin’s Shroud', text: 'On Consecrated Ground, the extra damage is 3d6.' },
  { name: 'Blazing Presence', text: 'On Consecrated Ground, its save DC is 2 higher.' }
];

/** The Immortal Attunement's Grandmaster benefit, as it read in V2.0 and as it reads now. */
export const DAO_DOMAIN = {
  before: 'Your Dao Heart belongs to you alone. From now on, you are always in your Sanctum, wherever you go.',
  after: 'Once per day, as an action or when you roll initiative, you enter your Sanctum for 1 hour, wherever you are. For that hour it never collapses in a clash, even if your side loses, but it still joins clashes and can make other domains collapse.'
};

export const NEW_TAGS =['Action', 'Bonus action', 'Reaction', 'Free action', 'Attack replacement', 'On hit', 'Once per turn', 'Concentration', 'Ritual'];

/** Techniques that were written as spells (Casting Time, Range, Components…) and now read like techniques. */
export const STAT_BLOCK_REWRITES: PathAbilities[] = [
  { path: 'ruin', talents: ['Decay', 'Bhaal’s Tribute', 'Mark for Death', 'Mark of Doom'] },
  { path: 'pestilence', talents: ['Corrosive Touch', 'Creeping Pestilence', 'Pestilent Cloud', 'Lingering Touch', 'Blessed Immunity'] },
  { path: 'providence', talents: ['Touch of Respite', 'Boon of Fortitude', 'Gift of Enduring Faith', 'Endurance of Ilmater', 'Agony of the Martyr'] },
  { path: 'shadow', talents: ['Netherdark Fist', 'Armor of Darkness', 'Darkbolt'] },
  { path: 'love', talents: ['Attraction/Disdain'] },
  { path: 'heart', talents: ['Pommel Strike', 'Iron Stance (Brace)', 'Skirmisher’s Volley (Mobile Shot)', 'Supreme Heart-Reflection Sword', 'Azure Dragon Ascending the Waves'] }
];

/** Techniques whose text never said how they are used; the tag now does. */
export const ACTIVATION_SET: { tags: string[]; names: string[] }[] = [
  {
    tags: ['Action'],
    names: ['Lightning Javelin', 'Arc Chain', 'Thunderous Roar', 'Lightning Cage', 'Miasmic Cloud', 'Raincaller', 'Thunderous Entrance', 'Immovable Mountain', 'Frozen Insight', 'Tide of Emotions', 'Rain of Revelation', 'Metal Sense', 'Enhanced Armor', 'Martyr’s Flame Aura', 'Liberation’s Gale', 'Echoing Footsteps', 'Needle Barrage', 'Stormborn Presence', 'Thunderstep']
  },
  { tags: ['Bonus action'], names: ['Acidic Embrace'] },
  { tags: ['Free action', 'Once per turn'], names: ['Wind Sprint'] }
];

export const LEVEL_CHANGES: { name: string; path: string; before: string; after: string }[] = [
  { name: 'Pogmo’s Pot', path: 'metal', before: '9th', after: '3rd' },
  { name: 'Pillar of Force', path: 'metal', before: '5th', after: '2nd' },
  { name: 'Enspelled Armament', path: 'metal', before: '3rd', after: '2nd' },
  { name: 'Ride the Lightning', path: 'tempest', before: '5th', after: '4th' },
  { name: 'Investiture of Venom', path: 'pestilence', before: '6th', after: '5th' },
  { name: 'Thorn Armor', path: 'wood', before: '3rd', after: '1st' },
  { name: 'Summon Plant', path: 'wood', before: '4th', after: '2nd' },
  { name: 'Swallow Magic', path: 'shadow', before: '2nd', after: '1st' },
  { name: 'Warding Wind', path: 'sky', before: '1st', after: '2nd' },
  { name: 'Freedom of the Winds', path: 'sky', before: '3rd', after: '5th' }
];

/** One spell per level a path was missing, chosen for theme. */
export const NEW_SPELLS: PathAbilities[] = [
  { path: 'alchemy', spells: ['Otiluke’s Acid Cloud'] },
  { path: 'earth', spells: ['Living Burial'] },
  { path: 'love', spells: ['Fast Friends'] },
  { path: 'lunar', spells: ['Clairvoyance'] },
  { path: 'metal', spells: ['Ring Strike', 'Iron Garden'] },
  { path: 'pestilence', spells: ['Contagious Touch', 'Afflict Line'] },
  { path: 'ruin', spells: ['Murderous Twin', 'Assassin’s Promise'] },
  { path: 'sky', spells: ['Mordenkainen’s Electric Arc'] },
  { path: 'tempest', spells: ['Demolishing Smite', 'Storm Form'] }
];

/** Opening this on 5e.tools loads every homebrew and partnered source the paths use, except unlisted ones. */
export const HOMEBREW_URL = 'https://5e.tools/index.html#blankhash,loadexthomebrew:abidalzims~abyss~bb1000s~belzormm~bookofebontides~cofsa~cthulhutorchlight~dapc~dm17~dndbeyonddrops~elminsters%20guide%20to%20magic~expccodex~fftforbiddentome~grimhollowpg24~grimloresgrimoire~helianasguidetomonsterhunting~kpdm~kt-cll~northlandsworldbook~oranasexpandedspellbook~spellsthatdontsuck~taldoreicampaignsettingreborn~talesfromtheshadows~teb~theelementalspellbookspellsoficefireandlightning~theharbinger~valdaplayerpack~valdaplayerpack2~yag';
