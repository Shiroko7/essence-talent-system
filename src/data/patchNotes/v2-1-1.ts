/**
 * Patch notes for V2.1.1: Alchemy's expansion, path filters, staged techniques, and new colours
 * for Ruin and Shadow. A snapshot of the change; ability names must match the catalog names so
 * the notes can open their full text.
 */

export const PATCH = {
  slug: 'v2-1-1',
  version: 'V2.1.1',
  name: 'Craft and Stages',
  date: '2026-11-10',
  title: 'Alchemy, Path Filters, and Staged Techniques',
  summary: 'Alchemy gets crafted poisons, body grafts, new medicine, and Domain Expansions. Seven paths get filter chips, and techniques learned in stages are now linked, so each upgrade costs only the difference.',
  image: '/og/patch-notes-v2-1-1.png'
};

export const ALCHEMY = {
  techniques: ['Lethargy Draught', 'Mindfog', 'Purple Worm Extract', 'Claw Graft', 'Wing Graft', 'Healing Bomb', 'Vital Essence Sublimation IV (Nilo)', 'Suicide Fuse', 'Eight Trigrams Furnace', 'Myriad Poison Sanctum'],
  spells: ['Voracious Armor', 'Alter Self', 'Wine Bomb', 'Bolstering Brew', 'Sustaining Meditation', 'Polymorph', 'Cloak of Serpents', 'Doom of Serpent Coils', 'Needle Shower', 'Water to Poison', 'Sulfurous Squall', 'Immunity to Poison and Disease', 'Dust of Death', 'Alchemical Form', 'Create Homunculus', 'Perfect Toxin', 'Unstable Reaction', 'Toxic Pollen Storm', 'Corrosive Plume', 'Bite of the King'],
  domainLines: [
    { name: 'Quickening Draught', text: 'Your speed increases by 20 feet instead.' },
    { name: 'Enchanting Perfume', text: 'One ally within 30 feet also gains the benefit.' },
    { name: 'Strength Booster', text: 'The bonus is a d6 instead.' },
    { name: 'Caustic Bomb', text: 'You choose which creatures in the area it affects.' },
    { name: 'Miasmic Cloud', text: 'Its radius is 20 feet.' },
    { name: 'Acidic Embrace', text: 'If you’re wielding two weapons, it coats both.' },
    { name: 'Erosion of Being', text: 'It deals 8d8 acid damage instead of 6d8.' },
    { name: 'Lethargy Draught', text: 'It falls unconscious for 10 minutes instead.' },
    { name: 'Claw Graft', text: 'Its damage dice are d10s.' },
    { name: 'Wing Graft', text: 'It lasts 1 hour instead.' },
    { name: 'Healing Bomb', text: 'It restores 4d8 + your essence ability modifier instead.' }
  ],
  changes: [
    { name: 'Extended Reach', text: 'Moves from Adept to Initiate.' },
    { name: 'Explosive Savant', text: 'Moves from Adept to Master. Expanded Explosion stays at Adept, so the explosive passives now climb one per tier.' },
    { name: 'Acidic Precision', text: 'Moves from Initiate to Adept.' },
    { name: 'Chemical Expertise', text: 'Moves from Adept to Master, and adds 1d4 to Alchemist’s Supplies checks instead of +2.' }
  ]
};

/** Each faceted path and its filter chips, in catalog order. */
export const FILTERS: { path: string; facets: string; note?: string }[] = [
  { path: 'water', facets: 'Water, Ice' },
  { path: 'alchemy', facets: 'Acid, Medicine, Poison, Explosives, Transmutation' },
  { path: 'heart', facets: 'Unarmed, Blades, Spears, Blunt, Ranged, Body & Mind', note: 'Techniques that work with any weapon show under every weapon.' },
  { path: 'lunar', facets: 'Moonlight, Stars, Visions' },
  { path: 'providence', facets: 'Endurance, Martyrdom, Wards' },
  { path: 'ruin', facets: 'Murder, Pain, Strife' },
  { path: 'pestilence', facets: 'Disease, Venom, Curses' }
];

/** Techniques learned in stages, now linked as one series each. Names are the catalog's, stage by stage. */
export const STAGED: { path: string; stages: 'replace' | 'add'; names: string[] }[] = [
  { path: 'heart', stages: 'replace', names: ['Stone Fist I', 'Stone Fist II', 'Stone Fist III', 'Stone Fist IV', 'Stone Fist V'] },
  { path: 'pestilence', stages: 'replace', names: ['Toxic Skin Secretion I', 'Toxic Skin Secretion II', 'Toxic Skin Secretion III'] },
  { path: 'heart', stages: 'add', names: ['Radiant Vein Blade I: Twin Strike of Conviction', 'Radiant Vein Blade II: Aegis of the Righteous', 'Radiant Vein Blade III: Cascading Judgment'] },
  { path: 'shadow', stages: 'add', names: ['Netherdark Fist', 'Netherdark Fist II: Voidstride', 'Netherdark Fist III: Gravitic Collapse', 'Netherdark Fist IV: Reality Rend', 'Netherdark Fist V: Abyssal Annihilation'] },
  { path: 'water', stages: 'add', names: ['Tide\'s Reflection Art I (Thalassios)', 'Tide\'s Reflection Art II (Thalassios)', 'Tide\'s Reflection Art III (Thalassios)'] },
  { path: 'alchemy', stages: 'add', names: ['Vital Essence Sublimation I (Nilo)', 'Vital Essence Sublimation II (Nilo)', 'Vital Essence Sublimation III (Nilo)', 'Vital Essence Sublimation IV (Nilo)'] }
];

/** Abilities that changed path; they keep their IDs, and saved builds are re-checked. */
export const MOVED: { name: string; from: string; to: string }[] = [
  { name: 'Mage Hand', from: 'ruin', to: 'mysteries' }
];
