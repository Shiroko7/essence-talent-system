import React, { useState, useMemo } from 'react';
import { Check, ChevronDown, ChevronUp, Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind } from 'lucide-react';
import {
  Ability,
  EssencePathId,
  ESSENCE_PATHS,
  TIERS,
  FilterType,
  TierId,
  SpellLevel
} from '../../types/essence';
import FilterPills from './FilterPills';
import SearchInput from './SearchInput';
import { getFilteredAbilities } from '../../utils/essenceUtils';
import { fuzzySearch } from '../../utils/fuzzySearch';

interface AbilitySummaryProps {
  allAbilities: Record<EssencePathId, Ability[]>;
  cantrips: Record<EssencePathId, Ability[]>;
  spells: Record<EssencePathId, Ability[]>;
  selectedAbilities: string[];
  onToggleView: () => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const getSpellCharacterTier = (spellLevel: SpellLevel): TierId => {
  if (spellLevel === 'cantrip' || spellLevel === '1st' || spellLevel === '2nd') {
    return 'initiate';
  } else if (spellLevel === '3rd' || spellLevel === '4th') {
    return 'adept';
  } else if (spellLevel === '5th' || spellLevel === '6th') {
    return 'master';
  } else if (spellLevel === '7th' || spellLevel === '8th') {
    return 'grandmaster';
  } else if (spellLevel === '9th') {
    return 'greatgrandmaster';
  }
  return 'initiate';
};

const getAbilitySortPriority = (ability: Ability): number => {
  const spellLevelMap: Record<string, number> = {
    '9th': 0, '8th': 1, '7th': 2, '6th': 3, '5th': 4,
    '4th': 5, '3rd': 6, '2nd': 7, '1st': 8, 'cantrip': 9,
  };

  if (ability.isSpell) {
    return (spellLevelMap[ability.tier.toString()] || 10);
  }
  if (ability.isCantrip) return 11;
  if (ability.isActive) return 12;
  if (ability.isPassive) return 13;
  return 14;
};

const getTierPriority = (tier: TierId): number => {
  const tierMap: Record<string, number> = {
    'greatgrandmaster': 0, 'grandmaster': 1, 'master': 2, 'adept': 3, 'initiate': 4
  };
  return tierMap[tier] || 10;
};

const getTierDisplayName = (tier: TierId): string => {
  const displayNames: Record<string, string> = {
    'greatgrandmaster': 'Great Grandmaster',
    'grandmaster': 'Grandmaster',
    'master': 'Master',
    'adept': 'Adept',
    'initiate': 'Initiate'
  };
  return displayNames[tier] || tier.toString();
};

const AbilitySummary: React.FC<AbilitySummaryProps> = ({
  allAbilities,
  cantrips,
  spells,
  selectedAbilities,
  onToggleView,
  searchTerm = '',
  onSearchChange = () => {}
}) => {
  const getEssenceIcon = (id: EssencePathId) => {
    const iconProps = { size: 14, className: "inline" };
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

  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [selectedPaths, setSelectedPaths] = useState<EssencePathId[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const allAbilitiesList = useMemo(() => {
    const result: Ability[] = [];

    ESSENCE_PATHS.forEach(path => {
      const pathAbilities = [
        ...(allAbilities[path.id] || []),
        ...(cantrips[path.id] || []),
        ...(spells[path.id] || [])
      ].filter(ability => selectedAbilities.includes(ability.id));

      result.push(...pathAbilities);
    });

    return result;
  }, [allAbilities, cantrips, spells, selectedAbilities]);

  const filteredAbilities = useMemo(() => {
    let result = allAbilitiesList;

    if (selectedPaths.length > 0) {
      result = result.filter(ability => {
        const pathId = ability.id.split('_')[0] as EssencePathId;
        return selectedPaths.includes(pathId);
      });
    }

    result = getFilteredAbilities(result, selectedFilter);

    if (searchTerm) {
      result = fuzzySearch(result, searchTerm);
    }

    return result;
  }, [allAbilitiesList, selectedPaths, selectedFilter, searchTerm]);

  const groupedAbilities = useMemo(() => {
    const tierGroups = new Map<TierId, Ability[]>();

    TIERS.forEach(tier => {
      tierGroups.set(tier.id, []);
    });

    filteredAbilities.forEach(ability => {
      let characterTier: TierId;

      if (ability.isSpell || ability.isCantrip) {
        characterTier = getSpellCharacterTier(ability.tier as SpellLevel);
      } else {
        characterTier = ability.tier as TierId;
      }

      tierGroups.get(characterTier)?.push(ability);
    });

    tierGroups.forEach(abilities => {
      abilities.sort((a, b) => {
        return getAbilitySortPriority(a) - getAbilitySortPriority(b);
      });
    });

    const result = Array.from(tierGroups.entries())
      .filter(([_, abilities]) => abilities.length > 0)
      .map(([tier, abilities]) => ({
        tier: tier as TierId,
        abilities
      }));

    result.sort((a, b) => {
      return getTierPriority(a.tier) - getTierPriority(b.tier);
    });

    return result;
  }, [filteredAbilities]);

  const togglePath = (pathId: EssencePathId) => {
    setSelectedPaths(prev => {
      if (prev.includes(pathId)) {
        return prev.filter(id => id !== pathId);
      } else {
        return [...prev, pathId];
      }
    });
  };

  const toggleAllPaths = () => {
    if (selectedPaths.length === ESSENCE_PATHS.length) {
      setSelectedPaths([]);
    } else {
      setSelectedPaths(ESSENCE_PATHS.map(path => path.id));
    }
  };

  const getPathName = (abilityId: string) => {
    const pathId = abilityId.split('_')[0] as EssencePathId;
    const path = ESSENCE_PATHS.find(p => p.id === pathId);
    return path?.name || 'Unknown';
  };

  const getAbilityTypeInfo = (ability: Ability) => {
    if (ability.isPassive) {
      return { label: 'Passive', className: 'bg-type-passive/20 text-type-passive border border-type-passive/30' };
    } else if (ability.isActive) {
      return { label: 'Active', className: 'bg-type-active/20 text-type-active border border-type-active/30' };
    } else if (ability.isCantrip) {
      return { label: 'Cantrip', className: 'bg-type-cantrip/20 text-type-cantrip border border-type-cantrip/30' };
    } else if (ability.isSpell) {
      return { label: `${ability.tier} Spell`, className: 'bg-type-spell/20 text-type-spell border border-type-spell/30' };
    }
    return { label: 'Unknown', className: 'bg-charcoal text-mist' };
  };

  const formatDescription = (description: string) => {
    if (description.startsWith('http')) {
      return (
        <div>
          <p className="mb-2 text-parchment/80">This ability references an external spell. For detailed information:</p>
          <a
            href={description}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-bright"
          >
            View spell details
          </a>
        </div>
      );
    }

    const sentences = description.split(/(?<=[.!?])\s+/g);
    const paragraphs: string[] = [];
    let currentParagraph = '';

    sentences.forEach((sentence, index) => {
      currentParagraph += sentence + (index < sentences.length - 1 ? ' ' : '');

      if (currentParagraph.length > 150 || sentence.includes('\n') || index === sentences.length - 1) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = '';
      }
    });

    return paragraphs.map((paragraph, index) => (
      <p key={index} className={index > 0 ? "mt-3" : ""}>
        {paragraph}
      </p>
    ));
  };

  const highlightText = (text: string, term: string) => {
    if (!term.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${term})`, 'gi'));

    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === term.toLowerCase()
            ? <span key={i} className="bg-gold/30 text-gold-bright px-1 rounded">{part}</span>
            : part
        )}
      </>
    );
  };

  return (
    <div className="w-full arcane-panel p-5">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col w-full md:flex-row items-start md:items-center gap-4 md:gap-6">
            <FilterPills
              selectedFilter={selectedFilter}
              onFilterChange={(filter) => setSelectedFilter(filter)}
            />

            <div className="w-full max-w-md ml-auto">
              <SearchInput
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
                placeholder="Search selected abilities..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        {/* Multi-select dropdown for path filter */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="arcane-btn flex items-center gap-2"
          >
            <span>
              {selectedPaths.length === 0
                ? "All Paths"
                : selectedPaths.length === ESSENCE_PATHS.length
                  ? "All Paths"
                  : `${selectedPaths.length} Path${selectedPaths.length !== 1 ? 's' : ''} Selected`}
            </span>
            {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isDropdownOpen && (
            <div className="absolute z-20 mt-2 w-64 arcane-card border border-gold-subtle rounded shadow-lg">
              <div className="p-2 border-b border-gold-subtle">
                <button
                  onClick={toggleAllPaths}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm rounded hover:bg-charcoal font-body text-parchment transition-colors"
                >
                  <span>{selectedPaths.length === ESSENCE_PATHS.length ? "Deselect All" : "Select All"}</span>
                  {selectedPaths.length === ESSENCE_PATHS.length && <Check size={16} className="text-gold" />}
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto p-2">
                {ESSENCE_PATHS.map(path => (
                  <button
                    key={path.id}
                    onClick={() => togglePath(path.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-charcoal rounded transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-essence-${path.id}`}>{getEssenceIcon(path.id)}</span>
                      <span className="text-parchment font-body">{path.name}</span>
                    </div>
                    {selectedPaths.includes(path.id) && <Check size={16} className="text-gold" />}
                  </button>
                ))}
              </div>

              <div className="p-2 border-t border-gold-subtle">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full px-3 py-2 text-sm arcane-btn"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onToggleView}
          className="arcane-btn arcane-btn-primary"
        >
          Switch to Tree View
        </button>
      </div>

      <div className="space-y-8">
        <h2 className="font-display text-xl tracking-wide text-ivory border-b border-gold-subtle pb-3">
          Selected Abilities Summary
        </h2>

        {groupedAbilities.length === 0 ? (
          <div className="arcane-card p-8 text-center">
            <p className="text-fog font-body">No abilities selected or no matches found with the current filters.</p>
            <p className="mt-2 text-sm text-mist font-body">Select abilities from the Tree View or adjust your filters.</p>
            {searchTerm && (
              <p className="mt-2 text-sm text-mist font-body">Your search for "{searchTerm}" returned no results.</p>
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {groupedAbilities.map(({ tier, abilities }) => (
              <div key={tier} className="space-y-6">
                <h3 className="font-display text-lg tracking-wide text-gold border-b border-gold-subtle pb-2">
                  {getTierDisplayName(tier)}
                </h3>

                <div className="space-y-4">
                  {abilities.map(ability => {
                    const pathId = ability.id.split('_')[0] as EssencePathId;
                    const pathName = getPathName(ability.id);
                    const { label: typeLabel, className: typeClassName } = getAbilityTypeInfo(ability);

                    return (
                      <div
                        key={ability.id}
                        className="arcane-card p-5"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-display text-lg tracking-wide text-ivory flex items-center gap-2">
                              <span className={`text-essence-${pathId}`}>{getEssenceIcon(pathId)}</span>
                              {searchTerm ? highlightText(ability.name, searchTerm) : ability.name}
                            </h4>
                            <div className="text-sm text-mist mt-1 flex items-center gap-1 font-body">
                              {pathName} Path • {ability.tier.toString().charAt(0).toUpperCase() + ability.tier.toString().slice(1)}
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded text-xs font-display tracking-wide ${typeClassName}`}>
                            {typeLabel}
                          </span>
                        </div>

                        <div className="arcane-card p-4">
                          <h5 className="font-display text-xs tracking-wider text-gold uppercase mb-3">Description</h5>
                          <div className="text-parchment/90 leading-relaxed text-left font-body">
                            {ability.description.startsWith('http')
                              ? formatDescription(ability.description)
                              : searchTerm
                                ? highlightText(ability.description, searchTerm)
                                : formatDescription(ability.description)
                            }
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AbilitySummary;
