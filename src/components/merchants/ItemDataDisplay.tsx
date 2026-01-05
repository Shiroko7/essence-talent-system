import React from 'react';
import { ItemDetailedData } from '../../types/merchant';

interface ItemDataDisplayProps {
  data: ItemDetailedData;
}

const ItemDataDisplay: React.FC<ItemDataDisplayProps> = ({ data }) => {
  // Recursively render a single entry (handles nested structures)
  const renderEntry = (entry: any, index: number): React.ReactNode => {
    if (typeof entry === 'string') {
      return (
        <p key={index} className="text-gray-300 text-sm leading-relaxed text-left">
          {entry}
        </p>
      );
    }

    if (typeof entry === 'object' && entry !== null) {
      if (entry.type === 'list') {
        return (
          <div key={index} className="ml-4 text-left">
            {entry.name && <p className="font-semibold text-gray-200 text-sm mb-1 text-left">{entry.name}</p>}
            <ul className="list-disc list-outside ml-5 space-y-2">
              {entry.items?.map((item: any, i: number) => (
                <li key={i} className="text-gray-300 text-sm text-left">
                  {typeof item === 'string' ? item : renderNestedEntry(item)}
                </li>
              ))}
            </ul>
          </div>
        );
      } else if (entry.type === 'entries') {
        return (
          <div key={index} className="space-y-2 text-left">
            {entry.name && <p className="font-semibold text-gray-200 text-sm text-left">{entry.name}</p>}
            <div className="ml-2">
              {entry.entries?.map((item: any, i: number) => renderEntry(item, i))}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  // Render nested entries (without the outer key for recursion)
  const renderNestedEntry = (entry: any): React.ReactNode => {
    if (typeof entry === 'string') {
      return entry;
    }

    if (typeof entry === 'object' && entry !== null && entry.type === 'entries') {
      return (
        <div className="space-y-1">
          {entry.name && <span className="font-semibold text-gray-200">{entry.name}: </span>}
          {entry.entries?.map((item: any, idx: number) => (
            <span key={idx} className="text-gray-300">
              {typeof item === 'string' ? item : null}
            </span>
          ))}
        </div>
      );
    }

    return null;
  };

  // Render entries (description text)
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
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Description</h3>
          {renderEntries()}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {data.dmg1 && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Damage:</span>
            <span className="text-white ml-2 font-mono">
              {data.dmg1}
              {data.dmgType && ` ${data.dmgType}`}
            </span>
          </div>
        )}

        {data.dmg2 && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Versatile:</span>
            <span className="text-white ml-2 font-mono">{data.dmg2}</span>
          </div>
        )}

        {data.range && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Range:</span>
            <span className="text-white ml-2">{data.range}</span>
          </div>
        )}

        {data.ac !== undefined && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">AC:</span>
            <span className="text-white ml-2 font-mono">{data.ac}</span>
          </div>
        )}

        {data.bonusWeapon && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Attack Bonus:</span>
            <span className="text-green-400 ml-2 font-mono">{data.bonusWeapon}</span>
          </div>
        )}

        {data.bonusAc && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">AC Bonus:</span>
            <span className="text-green-400 ml-2 font-mono">{data.bonusAc}</span>
          </div>
        )}

        {data.bonusSpellAttack && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Spell Attack:</span>
            <span className="text-green-400 ml-2 font-mono">{data.bonusSpellAttack}</span>
          </div>
        )}

        {data.bonusSavingThrow && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Save DC:</span>
            <span className="text-green-400 ml-2 font-mono">{data.bonusSavingThrow}</span>
          </div>
        )}

        {data.strength && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Str Required:</span>
            <span className="text-white ml-2">{data.strength}</span>
          </div>
        )}

        {data.stealth && (
          <div className="bg-gray-700 p-3 rounded col-span-2">
            <span className="text-red-400">Disadvantage on Stealth checks</span>
          </div>
        )}

        {data.charges && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Charges:</span>
            <span className="text-white ml-2">{data.charges}</span>
          </div>
        )}

        {data.recharge && (
          <div className="bg-gray-700 p-3 rounded">
            <span className="text-gray-400">Recharge:</span>
            <span className="text-white ml-2">{data.recharge}</span>
          </div>
        )}
      </div>

      {/* Ability Scores */}
      {data.ability && Object.keys(data.ability).length > 0 && (() => {
        // Handle nested ability structure (e.g., {static: {str: 23}} or {str: 2})
        const abilityScores = data.ability.static || data.ability;

        return (
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Ability Scores</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              {Object.entries(abilityScores).map(([ability, value]) => {
                // Skip non-numeric values
                if (typeof value !== 'number') return null;

                return (
                  <div key={ability} className="bg-gray-600 p-2 rounded text-center">
                    <div className="text-gray-400 text-xs uppercase">{ability}</div>
                    <div className="text-white font-bold">{value > 0 ? `+${value}` : value}</div>
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
            <div className="bg-gray-700 p-3 rounded">
              <span className="text-gray-400 text-sm">Resistance:</span>
              <span className="text-blue-400 ml-2 text-sm">{data.resist.join(', ')}</span>
            </div>
          )}
          {data.immune && data.immune.length > 0 && (
            <div className="bg-gray-700 p-3 rounded">
              <span className="text-gray-400 text-sm">Immunity:</span>
              <span className="text-green-400 ml-2 text-sm">{data.immune.join(', ')}</span>
            </div>
          )}
          {data.conditionImmune && data.conditionImmune.length > 0 && (
            <div className="bg-gray-700 p-3 rounded">
              <span className="text-gray-400 text-sm">Condition Immunity:</span>
              <span className="text-purple-400 ml-2 text-sm">{data.conditionImmune.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemDataDisplay;
