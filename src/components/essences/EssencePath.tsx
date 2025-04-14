import React from 'react';
import { Ability, EssencePath as EssencePathType, TIERS } from '../../types/essence';
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

const EssencePath: React.FC<EssencePathProps> = ({
  path,
  abilities,
  selectedAbilities,
  characterLevel,
  activeFilter,
  onToggleAbility
}) => {
  // Group abilities by tier
  const abilitiesByTier = TIERS.map(tier => {
    // Filter abilities by tier and apply active filter
    let tierAbilities = abilities.filter(ability => {
      // For regular tier-based abilities
      if (['initiate', 'adept', 'master', 'grandmaster', 'greatgrandmaster'].includes(ability.tier)) {
        return ability.tier === tier.id;
      }
      
      // For spell levels, map them to tiers based on level requirement
      if (['cantrip', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th'].includes(ability.tier)) {
        if (tier.id === 'initiate' && (ability.tier === 'cantrip' || ability.tier === '1st' || ability.tier === '2nd')) {
          return true;
        }
        if (tier.id === 'adept' && (ability.tier === '3rd' || ability.tier === '4th')) {
          return true;
        }
        if (tier.id === 'master' && (ability.tier === '5th' || ability.tier === '6th')) {
          return true;
        }
        if (tier.id === 'grandmaster' && (ability.tier === '7th' || ability.tier === '8th')) {
          return true;
        }
      }
      
      return false;
    });
    
    // Apply filter if needed
    if (activeFilter !== 'all') {
      if (activeFilter === 'active') {
        tierAbilities = tierAbilities.filter(a => a.isActive);
      } else if (activeFilter === 'passive') {
        tierAbilities = tierAbilities.filter(a => a.isPassive);
      } else if (activeFilter === 'cantrip') {
        tierAbilities = tierAbilities.filter(a => a.isCantrip);
      } else if (activeFilter === 'spell') {
        tierAbilities = tierAbilities.filter(a => a.isSpell);
      }
    }
    
    const unlocked = isTierUnlocked(tier.id, selectedAbilities, abilities, characterLevel);
    
    return {
      tier,
      abilities: tierAbilities,
      unlocked
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <div className={`w-4 h-4 rounded-full ${path.color}`}></div>
        {path.name} Path
      </h2>
      
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
