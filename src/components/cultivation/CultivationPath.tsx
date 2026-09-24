import React, { useState } from 'react';
import { Ability, TIERS } from '../../types/essence';
import { CultivationPath as CultivationPathType } from '../../types/cultivation';
import CultivationTier from './CultivationTier';
import CultivationAbilityDetailsModal from './CultivationAbilityDetailsModal';
import { getCultivationPathIcon } from './CultivationIcon';
import { isTierUnlocked } from '../../utils/cultivationUtils';

interface CultivationPathProps {
  path: CultivationPathType;
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

const CultivationPath: React.FC<CultivationPathProps> = ({
  path,
  abilities,
  selectedAbilities,
  characterLevel,
  activeFilter,
  onToggleAbility
}) => {
  const [detailsAbility, setDetailsAbility] = useState<Ability | null>(null);

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
      <div className="p-4 rounded-lg bg-charcoal/40 border border-gold-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-lg bg-charcoal border border-gold-subtle flex items-center justify-center ${path.glowClass}`}>
            {getCultivationPathIcon(path.id, path.accentColor, 24)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded text-[11px] font-display uppercase tracking-wider ${path.badgeClass}`}>
                {path.traditionLabel}
              </span>
              {path.thematicFoundation && (
                <span className="text-xs text-mist font-body">
                  • {path.thematicFoundation}
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl tracking-wide text-ivory">
              {path.name} Path
            </h2>
            <p className="text-xs text-fog font-body mt-0.5 max-w-2xl">
              <span className="text-parchment font-medium">{path.concept}: </span>
              {path.description}
            </p>
          </div>
        </div>
      </div>

      {/* Tiers List */}
      <div className="space-y-6">
        {abilitiesByTier.map(({ tier, abilities, unlocked }) => (
          <CultivationTier
            key={tier.id}
            tier={tier}
            path={path}
            abilities={abilities}
            isUnlocked={unlocked}
            selectedAbilities={selectedAbilities}
            onToggleAbility={onToggleAbility}
            onShowDetails={(a) => setDetailsAbility(a)}
          />
        ))}
      </div>

      {/* Ability Details Modal */}
      {detailsAbility && (
        <CultivationAbilityDetailsModal
          ability={detailsAbility}
          path={path}
          isSelected={selectedAbilities.includes(detailsAbility.id)}
          isLocked={!isTierUnlocked(detailsAbility.tier, selectedAbilities, abilities, characterLevel)}
          onClose={() => setDetailsAbility(null)}
          onToggle={() => {
            onToggleAbility(detailsAbility);
          }}
        />
      )}
    </div>
  );
};

export default CultivationPath;
