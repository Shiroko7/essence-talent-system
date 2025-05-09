export const earthAbilities = [
    {
      id: 'earth_initiate_stonecunning',
      name: 'Stonecunning',
      description: 'Gain proficiency in History. If already proficient, add double your proficiency bonus to History checks related to the origin of stonework.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_initiate_miners_touch',
      name: 'Miner\'s Touch',
      description: 'Gain proficiency with mason’s tools and miner’s tools.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_initiate_rock_whisperer',
      name: 'Rock Whisperer',
      description: 'You can communicate simple ideas with earth elementals and creatures of stone.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_active_earthen_ward',
      name: 'Earthen Ward',
      description: 'As a reaction, a surge of earth magic momentarily hardens your form. You gain temporary hit points equal to 1d10 + your Constitution modifier.',
      tier: 'active',
      isActive: true,
      isPassive: false,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_initiate_earth_sense',
      name: 'Earth Sense',
      description: 'You have advantage on Survival and Perception checks to navigate underground or in rocky terrain.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_initiate_stone_fist_1',
      name: 'Stone Fist I',
      description: 'Your unarmed strikes deal 1d6 bludgeoning damage and count as magical for overcoming resistance and immunity.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_initiate_pebble_barrage',
      name: 'Pebble Barrage',
      description: 'As an action, you hurl a barrage of pebbles at a creature within 30 feet. The target must make a Dexterity saving throw or be knocked prone and take 4d4 bludgeoning damage.',
      tier: 'initiate',
      isActive: true,
      isPassive: false,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_adept_earthen_resilience',
      name: 'Earthen Resilience',
      description: 'Gain proficiency in Constitution saving throws.',
      tier: 'adept',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_adept_terramancer',
      name: 'Terramancer',
      description: 'Gain expertise (double proficiency bonus) in Athletics when performing tasks involving lifting, pushing, or pulling heavy objects made of stone or earth.',
      tier: 'adept',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_adept_stone_camouflage',
      name: 'Stone Camouflage',
      description: 'You have advantage on Stealth checks to hide in rocky terrain or against stone surfaces.',
      tier: 'adept',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_adept_earthen_grasp',
      name: 'Earthen Grasp',
      description: 'As a bonus action, you can cause the ground to grasp a creature within 30 feet, restraining it for 1 minute. The restrained creature can make a Strength saving throw at the end of each of its turns to break free.',
      tier: 'adept',
      isActive: true,
      isPassive: false,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_adept_stone_armor',
      name: 'Stone Armor',
      description: 'As a bonus action, you can encase yourself in a layer of stone, granting you resistance to bludgeoning, piercing, and slashing damage for 1 minute.',
      tier: 'adept',
      isActive: true,
      isPassive: false,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_adept_stone_fist_2',
      name: 'Stone Fist II',
      description: 'Your unarmed strikes deal 1d8 bludgeoning damage and count as magical for overcoming resistance and immunity.',
      tier: 'adept',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'earth_adept_sandstorm',
      name: 'Sandstorm',
      description: 'As an action, you create a swirling storm of sand in a 20-foot radius centred on you. Each creature in the area must make a Constitution saving throw, taking 3d6 slashing damage on a failed save and becoming blinded until the end of their next turn, or half as much damage on a successful save. The storm lasts for 1 minute. The area is difficult terrain, any creature that starts its turn within the storm takes 1d6 damage.’',
      tier: 'adept',
      isActive: true,
      isPassive: false,
      isSpell: false,
      isCantrip: false,
    },
   ];
  
   export const earthCantrips = [
    {
      id: 'earth_cantrip_magic_stone',
      name: 'Magic Stone',
      description: 'https://5e.tools/spells.html#magic%20stone_xge',
      tier: 'cantrip',
      isActive: false,
      isPassive: false,
      isSpell: false,
      isCantrip: true,
    },
    {
      id: 'earth_cantrip_mold_earth',
      name: 'Mold Earth',
      description: 'https://5e.tools/spells.html#mold%20earth_xge',
      tier: 'cantrip',
      isActive: false,
      isPassive: false,
      isSpell: false,
      isCantrip: true,
    },
   ];
  
export const earthSpells = [
  {
    id: 'earth_1st_level_earth_tremor',
    name: 'Earth Tremor',
    description: 'https://5e.tools/spells.html#earth%20tremor_xge',
    tier: '1st',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_2nd_level_earthbind',
    name: 'Earthbind',
    description: 'https://5e.tools/spells.html#earthbind_xge',
    tier: '2nd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_2nd_level_maximilians_earthen_grasp',
    name: 'Maximilian\'s Earthen Grasp',
    description: 'https://5e.tools/spells.html#maximilian\'s%20earthen%20grasp_xge',
    tier: '2nd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_3rd_level_erupting_earth',
    name: 'Erupting Earth',
    description: 'https://5e.tools/spells.html#erupting%20earth_xge',
    tier: '3rd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_3rd_level_wall_of_sand',
    name: 'Wall of Sand',
    description: 'https://5e.tools/spells.html#wall%20of%20sand_xge',
    tier: '3rd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_3rd_level_meld_into_stone',
    name: 'Meld into Stone',
    description: 'https://5e.tools/spells.html#meld%20into%20stone_xphb',
    tier: '3rd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_4th_level_stone_shape',
    name: 'Stone Shape',
    description: 'https://5e.tools/spells.html#stone%20shape_xphb',
    tier: '4th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_4th_level_stoneskin',
    name: 'Stoneskin',
    description: 'https://5e.tools/spells.html#stoneskin_xphb',
    tier: '4th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_5th_level_transmute_rock',
    name: 'Transmute Rock',
    description: 'https://5e.tools/spells.html#transmute%20rock_xge',
    tier: '5th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_5th_level_wall_of_stone',
    name: 'Wall of Stone',
    description: 'https://5e.tools/spells.html#wall%20of%20stone_xphb',
    tier: '5th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_5th_level_destructive_wave',
    name: 'Destructive Wave',
    description: 'https://5e.tools/spells.html#destructive%20wave_xphb',
    tier: '5th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_6th_level_bones_of_the_earth',
    name: 'Bones of the Earth',
    description: 'https://5e.tools/spells.html#bones%20of%20the%20earth_xge',
    tier: '6th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_6th_level_flesh_to_stone',
    name: 'Flesh to Stone',
    description: 'https://5e.tools/spells.html#flesh%20to%20stone_xphb',
    tier: '6th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_6th_level_investiture_of_stone',
    name: 'Investiture of Stone',
    description: 'https://5e.tools/spells.html#investiture%20of%20stone_xge',
    tier: '6th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_6th_level_move_earth',
    name: 'Move Earth',
    description: 'https://5e.tools/spells.html#move%20earth_xphb',
    tier: '6th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_7th_level_reverse_gravity',
    name: 'Reverse Gravity',
    description: 'https://5e.tools/spells.html#reverse%20gravity_xphb',
    tier: '7th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_8th_level_earthquake',
    name: 'Earthquake',
    description: 'https://5e.tools/spells.html#earthquake_xphb',
    tier: '8th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_9th_level_meteor_swarm',
    name: 'Meteor Swarm',
    description: 'https://5e.tools/spells.html#meteor%20swarm_xphb',
    tier: '9th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'earth_9th_level_imprisonment',
    name: 'Imprisonment',
    description: 'https://5e.tools/spells.html#imprisonment_xphb',
    tier: '9th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
];
