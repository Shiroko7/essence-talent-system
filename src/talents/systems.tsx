import { Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind } from 'lucide-react';
import { Ability, EssencePathId, ESSENCE_PATHS } from '../types/essence';
import { importEssenceData } from '../utils/essenceData';
import { importCultivationData } from '../utils/cultivationData';
import { getCultivationPathIcon } from '../components/cultivation/CultivationIcon';
import { SystemPath, TalentSystem } from './model';

const V1_ACCENTS: Record<EssencePathId, string> = {
  water: '#4a9eff',
  fire: '#ff6b4a',
  earth: '#c49a6c',
  metal: '#a8b4c4',
  wood: '#5dba6f',
  poison: '#9b4dca',
  acid: '#a8e04a',
  lightning: '#c084fc',
  wind: '#7dd3fc'
};

const V1_ICONS: Record<EssencePathId, typeof Droplet> = {
  water: Droplet,
  fire: Flame,
  earth: Mountain,
  metal: Sword,
  wood: TreeDeciduous,
  poison: Skull,
  acid: FlaskConical,
  lightning: Zap,
  wind: Wind
};

const GROUP_ACCENTS: Record<string, string> = {
  primordial: '#34d399',
  divine: '#a5b4fc',
  human: '#f0abfc'
};

const mergePathAbilities = (
  ids: string[],
  abilities: Record<string, Ability[]>,
  cantrips: Record<string, Ability[]>,
  spells: Record<string, Ability[]>
) => Object.fromEntries(ids.map(id => [id, [...(abilities[id] || []), ...(cantrips[id] || []), ...(spells[id] || [])]]));

export const buildV1System = (): TalentSystem => {
  const { abilities, cantrips, spells } = importEssenceData();
  const paths: SystemPath[] = ESSENCE_PATHS.map(path => {
    const Icon = V1_ICONS[path.id];
    return {
      id: path.id,
      name: path.name,
      groupId: 'elements',
      concept: `Essence of ${path.name.toLowerCase()}`,
      accent: V1_ACCENTS[path.id],
      icon: (size = 18, color = V1_ACCENTS[path.id]) => <Icon size={size} style={{ color }} />
    };
  });
  return {
    version: 'v1',
    name: 'Elemental Essences',
    tagline: 'Nine elemental essences, five tiers of mastery each.',
    resourceName: 'Essence',
    sharedPools: false,
    groups: [{ id: 'elements', label: 'Elements', accent: '#c9a959' }],
    paths,
    abilitiesByPath: mergePathAbilities(paths.map(p => p.id), abilities, cantrips, spells)
  };
};

export const buildV2System = (): TalentSystem => {
  const { abilities, cantrips, spells, paths, groups, catalog } = importCultivationData('v2');
  const systemPaths: SystemPath[] = paths.map(path => ({
    id: path.id,
    name: path.name,
    groupId: path.tradition,
    concept: path.concept,
    description: path.description,
    patron: path.thematicFoundation,
    accent: path.accentColor,
    icon: (size = 18, color = path.accentColor) => getCultivationPathIcon(path.id, color, size)
  }));
  return {
    version: 'v2',
    name: 'Cultivation Paths',
    tagline: catalog.subtitle,
    resourceName: 'Essence',
    sharedPools: true,
    groups: groups.map(group => ({ id: group.id, label: group.label, accent: GROUP_ACCENTS[group.id] ?? '#c9a959' })),
    paths: systemPaths,
    abilitiesByPath: mergePathAbilities(systemPaths.map(p => p.id), abilities, cantrips, spells)
  };
};
