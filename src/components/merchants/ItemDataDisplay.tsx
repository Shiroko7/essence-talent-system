import React from 'react';
import { ItemDetailedData } from '../../types/merchant';

interface ItemDataDisplayProps {
  data: ItemDetailedData;
}

const ItemDataDisplay: React.FC<ItemDataDisplayProps> = ({ data }) => {
  const renderEntry = (entry: any, index: number): React.ReactNode => {
    if (typeof entry === 'string') {
      return (
        <p key={index} className="text-parchment/90 text-sm leading-relaxed text-left font-body">
          {entry}
        </p>
      );
    }

    if (typeof entry === 'object' && entry !== null) {
      if (entry.type === 'list') {
        return (
          <div key={index} className="ml-4 text-left">
            {entry.name && <p className="font-display text-sm text-ivory mb-1 text-left">{entry.name}</p>}
            <ul className="list-disc list-outside ml-5 space-y-2">
              {entry.items?.map((item: any, i: number) => (
                <li key={i} className="text-parchment/90 text-sm text-left font-body">
                  {typeof item === 'string' ? item : renderNestedEntry(item)}
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
              {entry.entries?.map((item: any, i: number) => renderEntry(item, i))}
            </div>
          </div>
        );
      }
    }

    return null;
  };

  const renderNestedEntry = (entry: any): React.ReactNode => {
    if (typeof entry === 'string') {
      return entry;
    }

    if (typeof entry === 'object' && entry !== null && entry.type === 'entries') {
      return (
        <div className="space-y-1">
          {entry.name && <span className="font-display text-ivory">{entry.name}: </span>}
          {entry.entries?.map((item: any, idx: number) => (
            <span key={idx} className="text-parchment/90 font-body">
              {typeof item === 'string' ? item : null}
            </span>
          ))}
        </div>
      );
    }

    return null;
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
