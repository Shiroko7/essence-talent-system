export const lightningAbilities = [
    {
      id: 'lightning_initiate_static_reflexes',
      name: 'Static Reflexes',
      description: 'You gain advantage on Dexterity saving throws against effects that deal lightning damage or require quick reflexes, such as traps or spells.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'lightning_initiate_lightning_step',
      name: 'Lightning Step',
      description: 'As a bonus action, you can harness the power of lightning to enhance your movement. Your jump distance is tripled, and your movement does not provoke opportunity attacks until the end of your turn.',
      tier: 'initiate',
      isActive: true,
      isPassive: false,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'lightning_initiate_stormborn_presence',
      name: 'Stormborn Presence',
      description: 'When you make a Charisma (Persuasion) or Charisma (Intimidation) check to influence a group of people, you can invoke your stormy presence to gain advantage on the roll. ',
      tier: 'initiate',
      isActive: true,
      isPassive: false,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'lightning_initiate_storm_navigator',
      name: 'Storm Navigator',
      description: 'Your understanding of storms helps you predict their patterns and avoid hazards. You gain proficiency in Navigator’s Tools and have advantage on Wisdom (Survival) checks made to navigate or map out sea routes in stormy weather.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
      id: 'lightning_initiate_lightning_insight',
      name: 'Lightning Insight',
      description: 'When on or near water, you can use your connection to lightning to sense changes in weather. You can use a bonus action to gain advantage on Wisdom (Perception) checks to spot distant ships, landmarks, or other navigation hazards.',
      tier: 'initiate',
      isActive: false,
      isPassive: true,
      isSpell: false,
      isCantrip: false,
    },
    {
        id: 'lightning_adept_thunderous_speed',
        name: 'Thunderous Speed',
        description: 'Your movement speed increases by 10 feet. Additionally, you can take the Dash action as a bonus action.',
        tier: 'adept',
        isActive: false,
        isPassive: true,
        isSpell: false,
        isCantrip: false,
      },
      {
        id: 'lightning_adept_conductive_touch',
        name: 'Conductive Touch',
        description: 'When you hit a creature with a melee attack, you can choose to deal an extra 2d12 lightning damage.',
        tier: 'adept',
        isActive: true,
        isPassive: false,
        isSpell: false,
        isCantrip: false,
      },
      {
        id: 'lightning_adept_lightning_sense',
        name: 'Lightning Sense',
        description: 'You have developed a heightened sense of awareness in stormy or electrically charged environments. You gain advantage on Wisdom (Perception) checks to notice hidden details or track creatures in such conditions.',
        tier: 'adept',
        isActive: false,
        isPassive: true,
        isSpell: false,
        isCantrip: false,
      },
      {
        id: 'lightning_adept_electrostatic_charm',
        name: 'Electrostatic Charm',
        description: 'Your affinity with lightning allows you to charm and influence those you meet. You can use your Charisma (Deception) or Charisma (Performance) checks to impress or beguile others, gaining advantage in social situations where you can appeal to your stormy, dynamic persona.',
        tier: 'adept',
        isActive: true,
        isPassive: false,
        isSpell: false,
        isCantrip: false,
      },
      {
        id: 'lightning_adept_thunderous_entrance',
        name: 'Thunderous Entrance',
        description: 'You can make a dramatic entrance by creating a booming thunderclap that announces your presence. This effect grants you advantage on Charisma (Performance) checks to make a memorable first impression.',
        tier: 'adept',
        isActive: true,
        isPassive: false,
        isSpell: false,
        isCantrip: false,
      },
      {
        id: 'lightning_adept_thunderous_strike',
        name: 'Thunderous Strike',
        description: 'When you hit a creature with a melee weapon attack, you can channel the force of a thunderstorm into your strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn. This ability can only be used once per turn, and once a creature is stunned by this ability, it cannot be stunned again by it for 1 minute.',
        tier: 'adept',
        isActive: true,
        isPassive: false,
        isSpell: false,
        isCantrip: false,
      },
      {
        id: 'lightning_adept_lightning_javelin',
        name: 'Lightning Javelin',
        description: 'You hurl a javelin of lightning at a target within 60 feet. Make a ranged spell attack. On hit: 5d12 lightning damage and the target can\'t take reactions until the start of its next turn.',
        tier: 'adept',
        isActive: true,
        isPassive: false,
        isSpell: false,
        isCantrip: false,
      },
   ];
  
   export const lightningCantrips = [
    {
      id: 'lightning_cantrip_lightning_lure',
      name: 'Lightning Lure',
      description: 'https://www.dandwiki.com/wiki/Lightning_Lure_(5e_Spell) \"Lightning Lure (5e Spell)\"',
      tier: 'cantrip',
      isActive: false,
      isPassive: false,
      isSpell: false,
      isCantrip: true,
    },
    {
      id: 'lightning_cantrip_shocking_grasp',
      name: 'Shocking Grasp',
      description: 'https://www.dandwiki.com/wiki/Shocking_Grasp_(5e_Spell) \"Shocking Grasp (5e Spell)\"',
      tier: 'cantrip',
      isActive: false,
      isPassive: false,
      isSpell: false,
      isCantrip: true,
    },
   ];
  
export const lightningSpells = [
  {
    id: 'lightning_1st_level_witch_bolt',
    name: 'Witch Bolt',
    description: 'https://www.dandwiki.com/wiki/Witch_Bolt_(5e_Spell)',
    tier: '1st',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_3rd_level_call_lightning',
    name: 'Call Lightning',
    description: 'https://5e.tools/spells.html#call%20lightning_phb',
    tier: '3rd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_3rd_level_lightning_arrow',
    name: 'Lightning Arrow',
    description: 'https://5e.tools/spells.html#lightning%20arrow_phb',
    tier: '3rd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_3rd_level_lightning_bolt',
    name: 'Lightning Bolt',
    description: 'https://5e.tools/spells.html#lightning%20bolt_phb',
    tier: '3rd',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_4th_level_storm_sphere',
    name: 'Storm Sphere',
    description: 'https://5e.tools/spells.html#storm%20sphere_xge',
    tier: '4th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_6th_level_chain_lightning',
    name: 'Chain Lightning',
    description: 'https://5e.tools/spells.html#chain%20lightning_xphb',
    tier: '6th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_7th_level_teleport',
    name: 'Teleport',
    description: 'https://5e.tools/spells.html#teleport_xphb',
    tier: '7th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_8th_level_control_weather',
    name: 'Control Weather',
    description: 'https://5e.tools/spells.html#control%20weather_xphb',
    tier: '8th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
  {
    id: 'lightning_9th_level_storm_of_vengeance',
    name: 'Storm of Vengeance',
    description: 'https://5e.tools/spells.html#storm%20of%20vengeance_xphb',
    tier: '9th',
    isActive: false,
    isPassive: false,
    isSpell: true,
    isCantrip: false,
  },
];
