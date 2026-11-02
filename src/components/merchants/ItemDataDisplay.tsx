import React from 'react';
import { ItemDetailedData } from '../../types/merchant';

interface ItemDataDisplayProps {
  data: ItemDetailedData;
}

// Turns 5etools markup such as {@damage 1d4} or {@spell Fear|XPHB} into the text it displays.
const formatText = (text: string): string => {
  let result = text;
  let previous;
  do {
    previous = result;
    result = result.replace(/\{@(\w+) ([^{}]*)\}/g, (_, tag: string, body: string) => {
      const parts = body.split('|');
      switch (tag) {
        case 'dc':
          return parts[1] || `DC ${parts[0]}`;
        case 'hit':
          return parts[1] || `+${parts[0]}`;
        case 'chance':
          return parts[1] || `${parts[0]} percent`;
        case 'dice':
        case 'damage':
        case 'd20':
          return parts[1] || parts[0];
        case 'book':
        case 'adventure':
        case 'quickref':
          return parts[0];
        default:
          return parts[2] || parts[0];
      }
    });
  } while (result !== previous);
  return result;
};

type TableCell =
  | string
  | number
  | { entry?: string; roll?: { exact?: number; min?: number; max?: number } };

type Entry =
  | string
  | {
      type?: string;
      name?: string;
      entry?: Entry;
      entries?: Entry[];
      items?: Entry[];
      caption?: string;
      colLabels?: string[];
      rows?: TableCell[][];
    };

// A cell's own text wins; a bare roll falls back to its number or range.
const formatCell = (cell: TableCell): string => {
  if (typeof cell === 'string') return formatText(cell);
  if (typeof cell === 'number') return String(cell);
  if (cell.entry !== undefined) return formatText(cell.entry);
  if (!cell.roll) return '';
  const { exact, min, max } = cell.roll;
  return exact !== undefined ? String(exact) : `${min}-${max}`;
};

const ItemDataDisplay: React.FC<ItemDataDisplayProps> = ({ data }) => {
  const renderEntry = (entry: Entry, index: number): React.ReactNode => {
    if (typeof entry === 'string') {
      return (
        <p key={index} className="text-parchment/90 text-sm leading-relaxed text-left font-body">
          {formatText(entry)}
        </p>
      );
    }

    if (typeof entry === 'object' && entry !== null) {
      if (entry.type === 'list') {
        return (
          <div key={index} className="ml-4 text-left">
            {entry.name && <p className="font-display text-sm text-ivory mb-1 text-left">{entry.name}</p>}
            <ul className="list-disc list-outside ml-5 space-y-2">
              {entry.items?.map((item, i) => (
                <li key={i} className="text-parchment/90 text-sm text-left font-body">
                  {renderListItem(item)}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (entry.type === 'entries') {
        return (
          <div key={index} className="space-y-2 text-left">
            {entry.name && <p className="font-display text-sm text-ivory text-left">{entry.name}</p>}
            <div className="ml-2">
              {entry.entries?.map((item, i) => renderEntry(item, i))}
            </div>
          </div>
        );
      } else if (entry.type === 'table') {
        return (
          <div key={index} className="overflow-x-auto">
            <table className="w-full text-sm text-left font-body">
              {entry.caption && (
                <caption className="font-display text-ivory text-left mb-1">{formatText(entry.caption)}</caption>
              )}
              {entry.colLabels && (
                <thead>
                  <tr>
                    {entry.colLabels.map((label, i) => (
                      <th key={i} className="font-display text-xs text-gold font-normal pb-1 pr-3 border-b border-gold-subtle">
                        {formatText(label)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {entry.rows?.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c} className="text-parchment/90 py-1 pr-3 align-top border-b border-gold-subtle">
                        {formatCell(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    return null;
  };

  // List items are plain strings or named items that keep their text in `entry` or `entries`.
  const renderListItem = (item: Entry): React.ReactNode => {
    if (typeof item === 'string') {
      return formatText(item);
    }

    const content = item.entries ?? (item.entry !== undefined ? [item.entry] : []);
    return (
      <div className="space-y-1">
        {item.name && <span className="font-display text-ivory">{formatText(item.name)}: </span>}
        {content.map((part, idx) =>
          typeof part === 'string' ? (
            <span key={idx} className="text-parchment/90 font-body">
              {formatText(part)}
            </span>
          ) : (
            renderEntry(part, idx)
          )
        )}
      </div>
    );
  };

  const renderEntries = () => {
    if (!data.entries || data.entries.length === 0) return null;

    return (
      <div className="space-y-3">
        {data.entries.map((entry, index) => renderEntry(entry, index))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Description/Entries */}
      {data.entries && data.entries.length > 0 && (
        <div className="arcane-card p-4">
          <h3 className="font-display text-xs tracking-wider text-gold uppercase mb-3">Description</h3>
          {renderEntries()}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {data.dmg1 && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Damage:</span>
            <span className="text-parchment ml-2 font-mono">
              {data.dmg1}
              {data.dmgType && ` ${data.dmgType}`}
            </span>
          </div>
        )}

        {data.dmg2 && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Versatile:</span>
            <span className="text-parchment ml-2 font-mono">{data.dmg2}</span>
          </div>
        )}

        {data.range && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Range:</span>
            <span className="text-parchment ml-2">{data.range}</span>
          </div>
        )}

        {data.ac !== undefined && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">AC:</span>
            <span className="text-parchment ml-2 font-mono">{data.ac}</span>
          </div>
        )}

        {data.bonusWeapon && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Attack Bonus:</span>
            <span className="text-type-spell ml-2 font-mono">{data.bonusWeapon}</span>
          </div>
        )}

        {data.bonusAc && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">AC Bonus:</span>
            <span className="text-type-spell ml-2 font-mono">{data.bonusAc}</span>
          </div>
        )}

        {data.bonusSpellAttack && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Spell Attack:</span>
            <span className="text-type-spell ml-2 font-mono">{data.bonusSpellAttack}</span>
          </div>
        )}

        {data.bonusSavingThrow && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Save DC:</span>
            <span className="text-type-spell ml-2 font-mono">{data.bonusSavingThrow}</span>
          </div>
        )}

        {data.strength && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Str Required:</span>
            <span className="text-parchment ml-2">{data.strength}</span>
          </div>
        )}

        {data.stealth && (
          <div className="arcane-card p-3 col-span-2">
            <span className="text-essence-fire font-body">Disadvantage on Stealth checks</span>
          </div>
        )}

        {data.charges && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Charges:</span>
            <span className="text-parchment ml-2">{data.charges}</span>
          </div>
        )}

        {data.recharge && (
          <div className="arcane-card p-3">
            <span className="text-mist font-body">Recharge:</span>
            <span className="text-parchment ml-2">{data.recharge}</span>
          </div>
        )}
      </div>

      {/* Ability Scores */}
      {data.ability && Object.keys(data.ability).length > 0 && (() => {
        const abilityScores = data.ability.static || data.ability;

        return (
          <div className="arcane-card p-4">
            <h3 className="font-display text-xs tracking-wider text-gold uppercase mb-3">Ability Scores</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {Object.entries(abilityScores).map(([ability, value]) => {
                if (typeof value !== 'number') return null;

                return (
                  <div key={ability} className="bg-charcoal p-2 rounded text-center border border-gold-subtle">
                    <div className="text-mist text-xs uppercase font-display">{ability}</div>
                    <div className="text-ivory font-display">{value > 0 ? `+${value}` : value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Resistances/Immunities */}
      {(data.resist || data.immune || data.conditionImmune) && (
        <div className="space-y-2">
          {data.resist && data.resist.length > 0 && (
            <div className="arcane-card p-3">
              <span className="text-mist text-sm font-body">Resistance:</span>
              <span className="text-essence-water ml-2 text-sm font-body">{data.resist.join(', ')}</span>
            </div>
          )}
          {data.immune && data.immune.length > 0 && (
            <div className="arcane-card p-3">
              <span className="text-mist text-sm font-body">Immunity:</span>
              <span className="text-type-spell ml-2 text-sm font-body">{data.immune.join(', ')}</span>
            </div>
          )}
          {data.conditionImmune && data.conditionImmune.length > 0 && (
            <div className="arcane-card p-3">
              <span className="text-mist text-sm font-body">Condition Immunity:</span>
              <span className="text-type-cantrip ml-2 text-sm font-body">{data.conditionImmune.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemDataDisplay;
