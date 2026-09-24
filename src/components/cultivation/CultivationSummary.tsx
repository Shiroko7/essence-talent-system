import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { Ability, FilterType, getTierCost } from '../../types/essence';
import { CultivationPath, CultivationPathGroup, CultivationPathId } from '../../types/cultivation';
import FilterPills from '../essences/FilterPills';
import SearchInput from '../essences/SearchInput';
import { getFilteredAbilities } from '../../utils/cultivationUtils';
import { fuzzySearch } from '../../utils/fuzzySearch';
import { AbilityMarkdown } from '../essences/AbilityMarkdown';
import { getCultivationPathIcon } from './CultivationIcon';

interface CultivationSummaryProps {
  paths: CultivationPath[];
  groups: CultivationPathGroup[];
  allAbilities: Record<CultivationPathId, Ability[]>;
  cantrips: Record<CultivationPathId, Ability[]>;
  spells: Record<CultivationPathId, Ability[]>;
  selectedAbilities: string[];
  onToggleView: () => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const CultivationSummary: React.FC<CultivationSummaryProps> = ({
  paths,
  groups,
  allAbilities,
  cantrips,
  spells,
  selectedAbilities,
  onToggleView,
  searchTerm = '',
  onSearchChange = () => {}
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [expandedAbilities, setExpandedAbilities] = useState<Record<string, boolean>>({});

  const toggleAbilityExpand = (abilityId: string) => {
    setExpandedAbilities(prev => ({ ...prev, [abilityId]: !prev[abilityId] }));
  };

  const selectedAbilitiesList = useMemo(() => {
    const list: Array<Ability & { pathId: CultivationPathId }> = [];
    paths.forEach(path => {
      const pathAll = [
        ...(allAbilities[path.id] || []),
        ...(cantrips[path.id] || []),
        ...(spells[path.id] || [])
      ];
      pathAll.forEach(ability => {
        if (selectedAbilities.includes(ability.id)) list.push({ ...ability, pathId: path.id });
      });
    });
    return list;
  }, [paths, allAbilities, cantrips, spells, selectedAbilities]);

  const filteredAbilities = useMemo(() => {
    let result = getFilteredAbilities(selectedAbilitiesList, selectedFilter);
    if (searchTerm) result = fuzzySearch(result, searchTerm);
    return result as Array<Ability & { pathId: CultivationPathId }>;
  }, [selectedAbilitiesList, selectedFilter, searchTerm]);

  const groupedAbilities = useMemo(() => groups.map(group => ({
    group,
    paths: paths.map(path => ({
      path,
      abilities: filteredAbilities.filter(ability => ability.pathId === path.id)
    })).filter(item => item.abilities.length > 0)
  })).filter(item => item.paths.length > 0), [groups, paths, filteredAbilities]);

  return (
    <div className="arcane-panel p-5">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <FilterPills selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
          <div className="w-full max-w-md ml-auto">
            <SearchInput searchTerm={searchTerm} onSearchChange={onSearchChange} placeholder="Search learned abilities..." />
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gold-subtle">
          <span className="font-display text-sm text-gold tracking-wide">{filteredAbilities.length} Learned Abilities</span>
          <button onClick={onToggleView} className="arcane-btn text-xs">Switch to Talent Tree View</button>
        </div>
      </div>

      {filteredAbilities.length === 0 ? (
        <div className="text-center py-12 text-mist font-body">
          <Layers size={36} className="mx-auto mb-3 text-gold-dim" />
          <p className="text-lg">No learned abilities found matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedAbilities.map(({ group, paths: groupPaths }) => (
            <section key={group.id} className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-gold-subtle">
                <span className="px-2.5 py-0.5 rounded text-xs font-display uppercase tracking-wider bg-charcoal text-gold-bright border border-gold-subtle">
                  {group.label}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupPaths.map(({ path, abilities }) => (
                  <div key={path.id} className="arcane-card p-4">
                    <div className="flex items-center gap-2.5 pb-2 mb-3 border-b border-gold-subtle">
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-charcoal border border-gold-subtle">
                        {getCultivationPathIcon(path.id, path.accentColor, 18)}
                      </div>
                      <div>
                        <h4 className="font-display text-sm tracking-wide text-ivory">{path.name} Path</h4>
                        <span className="text-[11px] text-mist">{abilities.length} abilities</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {abilities.map(ability => {
                        const isExpanded = !!expandedAbilities[ability.id];
                        return (
                          <div key={ability.id} className="p-2.5 rounded bg-charcoal/50 border border-gold-subtle/50 text-xs">
                            <div onClick={() => toggleAbilityExpand(ability.id)} className="flex items-center justify-between cursor-pointer">
                              <div className="flex items-center gap-2">
                                <span className="font-display font-medium text-parchment hover:text-gold-bright transition-colors">{ability.name}</span>
                                <span className="px-1.5 py-0.2 rounded text-[10px] bg-charcoal text-gold font-display">{getTierCost(ability.tier)} pt</span>
                              </div>
                              <button className="text-mist hover:text-parchment" aria-label={`Toggle ${ability.name} details`}>
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </button>
                            </div>
                            {isExpanded && (
                              <div className="mt-2 pt-2 border-t border-gold-subtle/30 text-fog font-body">
                                <AbilityMarkdown content={ability.description} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default CultivationSummary;
