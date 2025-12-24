import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, Edit, Droplet, Flame, Mountain, Sword, TreeDeciduous, Skull, FlaskConical, Zap, Wind } from 'lucide-react';
import { ChangelogEntry } from '../../types/changelog';
import { ESSENCE_PATHS, EssencePathId } from '../../types/essence';

interface ChangelogEntryCardProps {
  entry: ChangelogEntry;
}

// Simple word-level diff highlighting
const highlightDiff = (oldText: string, newText: string) => {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);

  // Find common prefix and suffix
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

// Helper function to get essence icon
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

const ChangelogEntryCard: React.FC<ChangelogEntryCardProps> = ({ entry }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Map legacy 'air' essence type to 'wind'
  const normalizedEssenceType = entry.essenceType === 'air' ? 'wind' : entry.essenceType;

  // Get essence path color
  const essencePath = ESSENCE_PATHS.find(p => p.id === normalizedEssenceType);
  const essenceColor = essencePath?.color || 'bg-gray-500';

  // Determine change badge styling
  const getChangeBadge = () => {
    switch (entry.changeType) {
      case 'added':
        return {
          icon: <Plus className="w-4 h-4" />,
          bg: 'bg-green-600',
          text: 'text-white',
          label: 'Added'
        };
      case 'removed':
        return {
          icon: <Trash2 className="w-4 h-4" />,
          bg: 'bg-red-600',
          text: 'text-white',
          label: 'Removed'
        };
      case 'modified':
        return {
          icon: <Edit className="w-4 h-4" />,
          bg: 'bg-blue-600',
          text: 'text-white',
          label: 'Modified'
        };
    }
  };

  const badge = getChangeBadge();
  const hasChanges = entry.changes && entry.changes.length > 0;

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex items-start gap-3">
        {/* Change type badge */}
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${badge.bg} ${badge.text} text-xs font-medium flex-shrink-0`}>
          {badge.icon}
          <span>{badge.label}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Ability name and essence badge */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="font-semibold text-white text-base">
              {entry.ability.name}
            </h3>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium text-white flex items-center gap-1 ${essenceColor}`}
            >
              {getEssenceIcon(normalizedEssenceType)}
              {essencePath?.name || normalizedEssenceType}
            </span>
            <span className="px-2 py-0.5 rounded bg-gray-700 text-gray-300 text-xs font-medium">
              Tier {entry.ability.tier}
            </span>
          </div>

          {/* Show description for added/removed abilities */}
          {(entry.changeType === 'added' || entry.changeType === 'removed') && entry.ability.description && (
            <div className={`mt-2 p-3 rounded ${
              entry.changeType === 'added'
                ? 'bg-green-900/20 border border-green-900/50'
                : 'bg-red-900/20 border border-red-900/50'
            }`}>
              <div className="text-sm text-gray-300 whitespace-pre-wrap break-words">
                {entry.ability.description}
              </div>
            </div>
          )}

          {/* Expandable changes section for modifications */}
          {hasChanges && (
            <div className="mt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
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
                <div className="mt-3 space-y-3 pl-5 border-l-2 border-gray-700">
                  {entry.changes.map((change, index) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium text-gray-300 mb-2 capitalize">
                        {change.field}:
                      </div>
                      {change.field === 'description' ? (
                        <div className="space-y-2">
                          {(() => {
                            const diff = highlightDiff(String(change.oldValue), String(change.newValue));
                            return (
                              <>
                                <div className="bg-red-900/20 border border-red-900/50 rounded p-3">
                                  <div className="text-xs text-red-400 font-mono mb-2">- Removed</div>
                                  <div className="text-gray-300 text-sm whitespace-pre-wrap break-words">
                                    <span>{diff.prefix}</span>
                                    {diff.oldMiddle && <span className="bg-red-700/40 text-red-200">{diff.oldMiddle}</span>}
                                    <span>{diff.suffix}</span>
                                  </div>
                                </div>
                                <div className="bg-green-900/20 border border-green-900/50 rounded p-3">
                                  <div className="text-xs text-green-400 font-mono mb-2">+ Added</div>
                                  <div className="text-gray-300 text-sm whitespace-pre-wrap break-words">
                                    <span>{diff.prefix}</span>
                                    {diff.newMiddle && <span className="bg-green-700/40 text-green-200">{diff.newMiddle}</span>}
                                    <span>{diff.suffix}</span>
                                  </div>
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400 flex-wrap">
                          <span className="text-red-400 line-through bg-red-900/20 px-2 py-1 rounded">{String(change.oldValue)}</span>
                          <span>→</span>
                          <span className="text-green-400 bg-green-900/20 px-2 py-1 rounded">{String(change.newValue)}</span>
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
