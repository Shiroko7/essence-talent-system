import { TierId, SpellLevel, Ability, Tier, TIERS, FilterType, FilterPill, FILTER_PILLS, getTierCost, calculateEssencePoints } from './essence';

export type CultivationVersion = 'v2';
export type CultivationPathId = string;
export type CultivationTradition = 'primordial' | 'divine';

export interface CultivationPath {
  id: CultivationPathId;
  name: string;
  tradition: CultivationTradition;
  traditionLabel: string;
  concept: string;
  thematicFoundation?: string;
  description: string;
  color: string;
  textColor: string;
  borderColor: string;
  glowClass: string;
  badgeClass: string;
  accentColor: string;
}

export interface CultivationPathGroup {
  id: CultivationTradition;
  label: string;
  color: string;
}

export interface CultivationCatalog {
  version: CultivationVersion;
  title: string;
  subtitle: string;
  principle: string;
  groups: CultivationPathGroup[];
  paths: CultivationPath[];
}

export interface CultivationCharacter {
  level: number;
  selectedAbilities: string[];
  activeEssenceByPath: Record<CultivationPathId, number>;
  version?: string;
  migrationNotice?: string;
}

const palettes = {
  wood: ['bg-emerald-600/30', 'text-emerald-400', 'border-emerald-500/50', 'shadow-glow-wood', 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40', '#5dba6f'],
  fire: ['bg-orange-600/30', 'text-orange-400', 'border-orange-500/50', 'shadow-glow-fire', 'bg-orange-950/70 text-orange-300 border-orange-500/40', '#ff6b4a'],
  earth: ['bg-amber-700/30', 'text-amber-400', 'border-amber-600/50', 'shadow-glow-earth', 'bg-amber-950/70 text-amber-300 border-amber-600/40', '#c49a6c'],
  metal: ['bg-slate-500/30', 'text-slate-300', 'border-slate-400/50', 'shadow-glow-metal', 'bg-slate-900/70 text-slate-200 border-slate-400/40', '#a8b4c4'],
  water: ['bg-blue-600/30', 'text-blue-400', 'border-blue-500/50', 'shadow-glow-water', 'bg-blue-950/70 text-blue-300 border-blue-500/40', '#4a9eff'],
  sky: ['bg-cyan-600/30', 'text-cyan-300', 'border-cyan-400/50', 'shadow-glow-sky', 'bg-cyan-950/70 text-cyan-200 border-cyan-400/40', '#67e8f9'],
  alchemy: ['bg-teal-600/30', 'text-teal-300', 'border-teal-400/50', 'shadow-glow-alchemy', 'bg-teal-950/70 text-teal-200 border-teal-400/40', '#5eead4'],
  lunar: ['bg-indigo-400/25', 'text-indigo-200', 'border-indigo-300/50', 'shadow-glow-moon', 'bg-indigo-950/70 text-indigo-200 border-indigo-400/40', '#c7d2fe'],
  love: ['bg-rose-500/25', 'text-rose-300', 'border-rose-400/50', 'shadow-glow-love', 'bg-rose-950/70 text-rose-200 border-rose-400/40', '#fb7185'],
  ruin: ['bg-red-600/25', 'text-red-300', 'border-red-500/50', 'shadow-glow-ruin', 'bg-red-950/80 text-red-200 border-red-500/50', '#f87171'],
  pestilence: ['bg-lime-700/25', 'text-lime-300', 'border-lime-500/50', 'shadow-glow-pestilence', 'bg-lime-950/80 text-lime-200 border-lime-500/50', '#a3e635'],
  shadow: ['bg-purple-900/40', 'text-purple-300', 'border-purple-600/50', 'shadow-glow-void', 'bg-purple-950/80 text-purple-200 border-purple-600/50', '#a855f7'],
  tempest: ['bg-sky-600/30', 'text-sky-300', 'border-sky-400/50', 'shadow-glow-tempest', 'bg-sky-950/80 text-sky-200 border-sky-400/40', '#38bdf8'],
  providence: ['bg-amber-500/25', 'text-amber-300', 'border-amber-400/50', 'shadow-glow-providence', 'bg-amber-950/70 text-amber-200 border-amber-400/40', '#fbbf24']
} as const;

type PaletteId = keyof typeof palettes;
const makePath = (
  id: CultivationPathId,
  name: string,
  tradition: CultivationTradition,
  concept: string,
  description: string,
  paletteId: PaletteId,
  thematicFoundation?: string
): CultivationPath => {
  const [color, textColor, borderColor, glowClass, badgeClass, accentColor] = palettes[paletteId];
  const traditionLabel = tradition === 'primordial' ? 'Primordial' : 'Divine';
  return { id, name, tradition, traditionLabel, concept, description, color, textColor, borderColor, glowClass, badgeClass, accentColor, thematicFoundation };
};

const paths: CultivationPath[] = [
  makePath('wood', 'Wood', 'primordial', 'Growth and living transformation', 'Plants, roots, forests, and the resilient growth of living things.', 'wood'),
  makePath('fire', 'Fire', 'primordial', 'Heat and energetic transformation', 'Flame, combustion, heat, and the release of energy.', 'fire'),
  makePath('earth', 'Earth', 'primordial', 'Mass and physical stability', 'Stone, soil, terrain, weight, and grounded defense.', 'earth'),
  makePath('metal', 'Metal', 'primordial', 'Refinement and directed force', 'Metal, ore, magnetism, forged edges, weapons, and armor.', 'metal'),
  makePath('water', 'Water', 'primordial', 'Flow and dissolution', 'Water, ice, mist, tides, and fluid adaptation.', 'water'),
  makePath('sky', 'Sky', 'primordial', 'Air and electrical force', 'Air, pressure, flight, sound carried through air, and direct lightning.', 'sky'),
  makePath('alchemy', 'Alchemy', 'primordial', 'Transformation of substances', 'Formulas, medicines, acids, refining, and the recombination of matter.', 'alchemy'),
  makePath('lunar', 'Lunar', 'divine', 'Moon, stars, and celestial cycles', 'Moonlight, stars, navigation, dreams, reflection, and foresight.', 'lunar', 'Selûne'),
  makePath('love', 'Love', 'divine', 'Affection and emotional bonds', 'Beauty, attraction, devotion, empathy, and the bonds between people.', 'love', 'Sune'),
  makePath('ruin', 'Ruin', 'divine', 'Violence and deliberate undoing', 'Murder, pain, deception, thievery, and the collapse of a chosen foe.', 'ruin', 'Bhaal, Cyric, and Loviatar'),
  makePath('pestilence', 'Pestilence', 'divine', 'Affliction and corruption', 'Disease, poison, curses, contagion, and resistance to corruption.', 'pestilence', 'Talona'),
  makePath('shadow', 'Shadow', 'divine', 'Darkness and concealment', 'Darkness, concealment, absence, and the Shadow Weave.', 'shadow', 'Shar'),
  makePath('tempest', 'Tempest', 'divine', 'Weather and storm authority', 'Storm fronts, rain, thunder, violent seas, and maritime peril.', 'tempest', 'Umberlee'),
  makePath('providence', 'Providence', 'divine', 'Endurance, hope, and freedom', 'Protection, healing, perseverance, bearing burdens, and liberation from bonds.', 'providence', 'Ilmater')
];

export const CULTIVATION_CATALOGS: Record<CultivationVersion, CultivationCatalog> = {
  v2: {
    version: 'v2',
    title: 'Seven Primordial and Seven Divine',
    subtitle: 'Seven Primordial Paths and Seven Divine Portfolios',
    principle: 'The Primordial paths shape physical reality; the Divine paths express distinct portfolios.',
    groups: [
      { id: 'primordial', label: 'Primordial', color: 'emerald' },
      { id: 'divine', label: 'Divine Portfolios', color: 'indigo' }
    ],
    paths
  }
};

export function getCultivationCatalog(version: CultivationVersion): CultivationCatalog {
  return CULTIVATION_CATALOGS[version];
}

export function getCultivationPath(id: CultivationPathId): CultivationPath | undefined {
  return paths.find(path => path.id === id);
}

export {
  TIERS,
  FILTER_PILLS,
  getTierCost,
  calculateEssencePoints
};
export type {
  TierId,
  SpellLevel,
  Ability,
  Tier,
  FilterType,
  FilterPill
};
