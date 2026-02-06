import React from 'react';
import { Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind } from 'lucide-react';
import { Ability, EssencePath as EssencePathType, EssencePathId, TIERS } from '../../types/essence';
import EssenceTier from './EssenceTier';
import { isTierUnlocked } from '../../utils/essenceUtils';

interface EssencePathProps {
  path: EssencePathType;
  abilities: Ability[];
  selectedAbilities: string[];
  characterLevel: number;
  activeFilter: string;
  onToggleAbility: (ability: Ability) => void;
}

const getAbilitySortPriority = (ability: Ability): number => {
  if (ability.isPassive) return 0;
  if (ability.isActive) return 1;
  if (ability.isCantrip) return 2;
  if (ability.isSpell) {
    const spellLevelMap: Record<string, number> = {
      'cantrip': 0, '1st': 1, '2nd': 2, '3rd': 3, '4th': 4,
      '5th': 5, '6th': 6, '7th': 7, '8th': 8, '9th': 9,
    };
    return 3 + (spellLevelMap[ability.tier.toString()] || 0);
  }
  return 10;
};

// Essence color configurations for icons
const ESSENCE_ICON_COLORS: Record<EssencePathId, string> = {
  water: '#4a9eff',
  fire: '#ff6b4a',
  earth: '#c49a6c',
  metal: '#a8b4c4',
  wood: '#5dba6f',
  poison: '#9b4dca',
  acid: '#a8e04a',
  lightning: '#c084fc',
  wind: '#7dd3fc',
};

const EssencePath: React.FC<EssencePathProps> = ({
  path,
  abilities,
  selectedAbilities,
  characterLevel,
  activeFilter,
  onToggleAbility
}) => {
  const getEssenceIcon = (id: EssencePathId) => {
    const iconProps = { size: 20, style: { color: ESSENCE_ICON_COLORS[id] } };
    switch (id) {
      case 'water': return <Droplet {...iconProps} />;
      case 'fire': return <Flame {...iconProps} />;
      case 'earth': return <Mountain {...iconProps} />;
      case 'metal': return <Sword {...iconProps} />;
      case 'wood': return <TreeDeciduous {...iconProps} />;
      case 'poison': return <Skull {...iconProps} />;
      case 'acid': return <FlaskConical {...iconProps} />;
      case 'lightning': return <Zap {...iconProps} />;
      case 'wind': return <Wind {...iconProps} />;
      default: return null;
    }
  };

  const abilitiesByTier = TIERS.map(tier => {
    let tierAbilities = abilities.filter(ability => {
      if (['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'].includes(ability.tier)) {
        return ability.tier === tier.id;
      }

      if (['cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'].includes(ability.tier)) {
        if (tier.id === 'initiate' && (ability.tier === 'cantrip' || ability.tier === '1st' || ability.tier === '2nd')) return true;
        if (tier.id === 'adept' && (ability.tier === '3rd' || ability.tier === '4th')) return true;
        if (tier.id === 'master' && (ability.tier === '5th' || ability.tier === '6th')) return true;
        if (tier.id === 'grandmaster' && (ability.tier === '7th' || ability.tier === '8th')) return true;
        if (tier.id === 'greatgrandmaster' && (ability.tier === '9th')) return true;
      }

      return false;
    });

    if (activeFilter !== 'all') {
      if (activeFilter === 'active') tierAbilities = tierAbilities.filter(a => a.isActive);
      else if (activeFilter === 'passive') tierAbilities = tierAbilities.filter(a => a.isPassive);
      else if (activeFilter === 'cantrip') tierAbilities = tierAbilities.filter(a => a.isCantrip);
      else if (activeFilter === 'spell') tierAbilities = tierAbilities.filter(a => a.isSpell);
    }

    tierAbilities.sort((a, b) => getAbilitySortPriority(a) - getAbilitySortPriority(b));

    const unlocked = isTierUnlocked(tier.id, selectedAbilities, abilities, characterLevel);

    return { tier, abilities: tierAbilities, unlocked };
  });

  return (
    <div className="space-y-6">
      {/* Path Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-gold-subtle">
        <div
          className={`w-10 h-10 rounded-lg bg-charcoal border border-gold-subtle flex items-center justify-center ${path.glowClass}`}
        >
          {getEssenceIcon(path.id)}
        </div>
        <div>
          <h2 className="font-display text-xl tracking-wide text-ivory">
            {path.name} Path
          </h2>
          <p className="text-xs text-mist font-body">
            Essence of {path.name.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Tiers */}
      {abilitiesByTier.map(({ tier, abilities, unlocked }) => (
        <EssenceTier
          key={tier.id}
          tier={tier}
          path={path}
          abilities={abilities}
          isUnlocked={unlocked}
          selectedAbilities={selectedAbilities}
          onToggleAbility={onToggleAbility}
        />
      ))}
    </div>
  );
};

export default EssencePath;
