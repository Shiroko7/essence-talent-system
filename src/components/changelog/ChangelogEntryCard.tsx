import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, Edit, Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind, Compass } from 'lucide-react';
import { ChangelogEntry } from '../../types/changelog';
import { ESSENCE_PATHS, EssencePathId } from '../../types/essence';
import AbilityMarkdown from '../essences/AbilityMarkdown';
import { importEssenceData } from '../../utils/essenceData';

let abilityMetaCache: Map<string, { author?: string; location?: string }> | null = null;

function getAbilityMetadata(id: string, name: string): { author?: string; location?: string } {
  if (!abilityMetaCache) {
    abilityMetaCache = new Map();
    try {
      const data = importEssenceData();
      const all = [
        ...Object.values(data.abilities).flat(),
        ...Object.values(data.cantrips).flat(),
        ...Object.values(data.spells).flat(),
      ];
      for (const ab of all) {
        const meta = { author: ab.author, location: ab.location };
        if (ab.id) abilityMetaCache.set(ab.id, meta);
        if (ab.name) abilityMetaCache.set(ab.name.toLowerCase(), meta);
      }
    } catch {
      // ignore
    }
  }

  const byId = abilityMetaCache.get(id);
  if (byId && (byId.author || byId.location)) return byId;

  const byName = abilityMetaCache.get(name.toLowerCase());
  if (byName && (byName.author || byName.location)) return byName;

  return {};
}

interface ChangelogEntryCardProps {
  entry: ChangelogEntry;
}

const highlightDiff = (oldText: string, newText: string) => {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);

  let prefixEnd = 0;
  while (prefixEnd < Math.min(oldWords.length, newWords.length) && oldWords[prefixEnd] === newWords[prefixEnd]) {
    prefixEnd++;
  }

  let suffixStart = 0;
  while (
    suffixStart < Math.min(oldWords.length - prefixEnd, newWords.length - prefixEnd) &&
    oldWords[oldWords.length - 1 - suffixStart] === newWords[newWords.length - 1 - suffixStart]
  ) {
    suffixStart++;
  }

  const oldMiddle = oldWords.slice(prefixEnd, oldWords.length - suffixStart);
  const newMiddle = newWords.slice(prefixEnd, newWords.length - suffixStart);

  return {
    prefix: oldWords.slice(0, prefixEnd).join(''),
    oldMiddle: oldMiddle.join(''),
    newMiddle: newMiddle.join(''),
    suffix: oldWords.slice(oldWords.length - suffixStart).join('')
  };
};

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

const getEssenceStyles = (id: EssencePathId): string => {
  const styles: Record<EssencePathId, string> = {
    water: 'bg-essence-water/20 text-essence-water border border-essence-water/30',
    fire: 'bg-essence-fire/20 text-essence-fire border border-essence-fire/30',
    earth: 'bg-essence-earth/20 text-essence-earth border border-essence-earth/30',
    metal: 'bg-essence-metal/20 text-essence-metal border border-essence-metal/30',
    wood: 'bg-essence-wood/20 text-essence-wood border border-essence-wood/30',
    poison: 'bg-essence-poison/20 text-essence-poison border border-essence-poison/30',
    acid: 'bg-essence-acid/20 text-essence-acid border border-essence-acid/30',
    lightning: 'bg-essence-lightning/20 text-essence-lightning border border-essence-lightning/30',
    wind: 'bg-essence-wind/20 text-essence-wind border border-essence-wind/30',
  };
  return styles[id] || 'bg-charcoal text-mist border border-gold-subtle';
};

const ChangelogEntryCard: React.FC<ChangelogEntryCardProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [descViewMode, setDescViewMode] = useState<'diff' | 'preview'>('diff');

  const normalizedEssenceType = entry.essenceType === 'air' ? 'wind' : entry.essenceType;
  const essencePath = ESSENCE_PATHS.find(p => p.id === normalizedEssenceType);

  const fallbackMeta = getAbilityMetadata(entry.ability.id, entry.ability.name);
  const effectiveAuthor = entry.ability.author || fallbackMeta.author;
  const effectiveLocation = entry.ability.location || fallbackMeta.location;

  const getChangeBadge = () => {
    switch (entry.changeType) {
      case 'added':
        return {
          icon: <Plus className="w-3.5 h-3.5" />,
          className: 'bg-type-active/20 text-type-active border border-type-active/30',
          label: 'Added'
        };
      case 'removed':
        return {
          icon: <Trash2 className="w-3.5 h-3.5" />,
          className: 'bg-essence-fire/20 text-essence-fire border border-essence-fire/30',
          label: 'Removed'
        };
      case 'modified':
        return {
          icon: <Edit className="w-3.5 h-3.5" />,
          className: 'bg-gold/20 text-gold border border-gold/30',
          label: 'Modified'
        };
    }
  };

  const badge = getChangeBadge();
  const hasChanges = entry.changes && entry.changes.length > 0;

  return (
    <div className="arcane-card arcane-card-hover p-4">
      <div className="flex items-start gap-3">
        {/* Change type badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-display tracking-wide flex-shrink-0 ${badge.className}`}>
          {badge.icon}
          <span>{badge.label}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Ability name and essence badge */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-display text-base tracking-wide text-ivory">
              {entry.ability.name}
            </h3>
            <span className={`px-2 py-0.5 rounded text-xs font-display tracking-wide flex items-center gap-1 ${getEssenceStyles(normalizedEssenceType as EssencePathId)}`}>
              {getEssenceIcon(normalizedEssenceType as EssencePathId)}
              {essencePath?.name || normalizedEssenceType}
            </span>
            <span className="arcane-badge">
              Tier {entry.ability.tier}
            </span>
            {(effectiveAuthor || effectiveLocation) && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-display tracking-wide bg-charcoal/80 text-parchment/90 border border-gold-subtle/40">
                <Compass size={12} className="text-gold/70 flex-shrink-0" />
                <span>
                  {effectiveAuthor && <span className="text-gold-bright">{effectiveAuthor}</span>}
                  {effectiveAuthor && effectiveLocation && <span className="text-gold/40 mx-1">•</span>}
                  {effectiveLocation && <span className="text-mist">{effectiveLocation}</span>}
                </span>
              </span>
            )}
          </div>

          {/* Show description for added/removed abilities */}
          {(entry.changeType === 'added' || entry.changeType === 'removed') && entry.ability.description && (
            <div className={`mt-3 p-3 rounded ${
              entry.changeType === 'added'
                ? 'bg-type-active/10 border border-type-active/20'
                : 'bg-essence-fire/10 border border-essence-fire/20'
            }`}>
              <AbilityMarkdown content={entry.ability.description} className="text-sm" />
            </div>
          )}

          {/* Expandable changes section for modifications */}
          {hasChanges && (
            <div className="mt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-sm text-gold hover:text-gold-bright transition-colors font-display tracking-wide"
              >
                {isExpanded ? (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Hide changes</span>
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span>Show {entry.changes?.length || 0} change{(entry.changes?.length || 0) > 1 ? 's' : ''}</span>
                  </>
                )}
              </button>

              {isExpanded && entry.changes && (
                <div className="mt-3 space-y-3 pl-4 border-l-2 border-gold-subtle">
                  {entry.changes.map((change, index) => (
                    <div key={index} className="text-sm">
                      {change.field === 'description' ? (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-display text-xs tracking-wider text-mist uppercase">
                              {change.field}
                            </div>
                            <div className="inline-flex rounded-md border border-gold-subtle/40 bg-charcoal/80 p-0.5 text-xs">
                              <button
                                type="button"
                                onClick={() => setDescViewMode('diff')}
                                className={`px-2 py-0.5 rounded transition-all font-display text-xs ${
                                  descViewMode === 'diff'
                                    ? 'bg-gold/20 text-gold-bright border border-gold/40'
                                    : 'text-mist hover:text-parchment'
                                }`}
                              >
                                Diff View
                              </button>
                              <button
                                type="button"
                                onClick={() => setDescViewMode('preview')}
                                className={`px-2 py-0.5 rounded transition-all font-display text-xs ${
                                  descViewMode === 'preview'
                                    ? 'bg-gold/20 text-gold-bright border border-gold/40'
                                    : 'text-mist hover:text-parchment'
                                }`}
                              >
                                Rendered Preview
                              </button>
                            </div>
                          </div>

                          {descViewMode === 'diff' ? (
                            <div className="space-y-2">
                              {(() => {
                                const diff = highlightDiff(String(change.oldValue), String(change.newValue));
                                return (
                                  <>
                                    <div className="bg-essence-fire/10 border border-essence-fire/20 rounded p-3">
                                      <div className="text-xs text-essence-fire font-mono mb-2 flex items-center gap-1">
                                        <span className="opacity-60">−</span> Removed
                                      </div>
                                      <div className="text-parchment/80 text-sm whitespace-pre-wrap break-words font-body">
                                        <span>{diff.prefix}</span>
                                        {diff.oldMiddle && <span className="bg-essence-fire/30 text-essence-fire rounded px-0.5">{diff.oldMiddle}</span>}
                                        <span>{diff.suffix}</span>
                                      </div>
                                    </div>
                                    <div className="bg-type-active/10 border border-type-active/20 rounded p-3">
                                      <div className="text-xs text-type-active font-mono mb-2 flex items-center gap-1">
                                        <span className="opacity-60">+</span> Added
                                      </div>
                                      <div className="text-parchment/80 text-sm whitespace-pre-wrap break-words font-body">
                                        <span>{diff.prefix}</span>
                                        {diff.newMiddle && <span className="bg-type-active/30 text-type-active rounded px-0.5">{diff.newMiddle}</span>}
                                        <span>{diff.suffix}</span>
                                      </div>
                                    </div>
                                  </>
                                );
                              })()}
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="bg-type-active/10 border border-type-active/20 rounded p-3">
                                <div className="text-xs text-type-active font-mono mb-2 flex items-center gap-1 font-semibold">
                                  <span className="opacity-60">+</span> New Description
                                </div>
                                <AbilityMarkdown content={String(change.newValue)} className="text-sm" />
                              </div>
                              <details className="text-xs text-mist group">
                                <summary className="cursor-pointer hover:text-gold transition-colors py-1 flex items-center gap-1 font-display">
                                  <span>View previous description</span>
                                </summary>
                                <div className="bg-essence-fire/10 border border-essence-fire/20 rounded p-3 mt-2">
                                  <div className="text-xs text-essence-fire font-mono mb-2 flex items-center gap-1 font-semibold">
                                    <span className="opacity-60">−</span> Previous Description
                                  </div>
                                  <AbilityMarkdown content={String(change.oldValue)} className="text-sm" />
                                </div>
                              </details>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="font-display text-xs tracking-wider text-mist uppercase mb-2">
                            {change.field}
                          </div>
                          <div className="flex items-center gap-2 text-mist flex-wrap font-body">
                            <span className="text-essence-fire line-through bg-essence-fire/10 px-2 py-1 rounded border border-essence-fire/20">{String(change.oldValue)}</span>
                            <span className="text-gold/40">→</span>
                            <span className="text-type-active bg-type-active/10 px-2 py-1 rounded border border-type-active/20">{String(change.newValue)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangelogEntryCard;
