import React from 'react';
import { FlaskConical, AlertTriangle, Clock, Shield, Coins } from 'lucide-react';
import { Potion, getPotionRarityColor, POTION_CATEGORIES, getCraftingCost } from '../../types/potion';

interface PotionDetailPanelProps {
  potion: Potion | null;
}

const PotionDetailPanel: React.FC<PotionDetailPanelProps> = ({ potion }) => {
  if (!potion) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <FlaskConical size={48} className="mx-auto mb-4 text-mist/30" />
          <p className="font-display text-lg text-mist">Select a potion to view details</p>
        </div>
      </div>
    );
  }

  const categoryLabel = POTION_CATEGORIES.find(c => c.id === potion.category)?.label || potion.category;

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="font-display text-2xl tracking-wide text-ivory mb-3">{potion.name}</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 rounded text-sm font-display tracking-wide ${getPotionRarityColor(potion.rarity)}`}>
            {potion.rarity.charAt(0).toUpperCase() + potion.rarity.slice(1)}
          </span>
          <span className="text-fog font-body">{categoryLabel}</span>
          {potion.isAddictive && (
            <span className="flex items-center gap-1 px-3 py-1 rounded text-sm font-display tracking-wide bg-essence-fire/20 text-essence-fire border border-essence-fire/30">
              <AlertTriangle size={14} />
              Addictive
            </span>
          )}
        </div>
      </div>

      {/* Effect */}
      <div className="mb-6">
        <h3 className="font-display text-sm tracking-wider text-gold mb-3">Effect</h3>
        <div className="arcane-card p-4">
          <p className="text-parchment/90 leading-relaxed font-body">{potion.effect}</p>
        </div>
      </div>

      {/* Properties */}
      {(potion.duration || potion.savingThrow) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {potion.duration && (
            <div className="arcane-card p-4">
              <div className="flex items-center gap-2 text-mist mb-2">
                <Clock size={16} className="text-gold/60" />
                <span className="font-display text-xs tracking-wider uppercase">Duration</span>
              </div>
              <p className="text-ivory font-display">{potion.duration}</p>
            </div>
          )}

          {potion.savingThrow && (
            <div className="arcane-card p-4">
              <div className="flex items-center gap-2 text-mist mb-2">
                <Shield size={16} className="text-gold/60" />
                <span className="font-display text-xs tracking-wider uppercase">Saving Throw</span>
              </div>
              <p className="text-ivory font-display">{potion.savingThrow}</p>
            </div>
          )}
        </div>
      )}

      {/* Crafting Cost */}
      <div className="mb-6">
        <h3 className="font-display text-sm tracking-wider text-gold mb-3 flex items-center gap-2">
          <Coins size={16} className="text-gold/60" />
          Crafting Cost
        </h3>
        <div className="arcane-card p-4">
          <div className="flex flex-wrap gap-4 text-sm font-body">
            {(() => {
              const cost = getCraftingCost(potion.rarity);
              return (
                <>
                  <div>
                    <span className="text-gold font-display">{cost.gp.toLocaleString()}</span>
                    <span className="text-mist ml-1">gp</span>
                  </div>
                  <div className="text-charcoal">|</div>
                  <div>
                    <span className="text-parchment">{cost.pp.toLocaleString()}</span>
                    <span className="text-mist ml-1">pp</span>
                  </div>
                  <div className="text-charcoal">|</div>
                  <div>
                    <span className="text-parchment">{cost.ep.toLocaleString()}</span>
                    <span className="text-mist ml-1">ep</span>
                  </div>
                  <div className="text-charcoal">|</div>
                  <div>
                    <span className="text-parchment">{cost.sp.toLocaleString()}</span>
                    <span className="text-mist ml-1">sp</span>
                  </div>
                  <div className="text-charcoal">|</div>
                  <div>
                    <span className="text-parchment">{cost.cp.toLocaleString()}</span>
                    <span className="text-mist ml-1">cp</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Overdose Effect */}
      {potion.overdoseEffect && (
        <div className="mb-6">
          <h3 className="font-display text-sm tracking-wider text-essence-fire mb-3 flex items-center gap-2">
            <AlertTriangle size={16} />
            Overdose Effect
          </h3>
          <div className="arcane-card p-4 border-essence-fire/30">
            <p className="text-parchment/90 leading-relaxed font-body">{potion.overdoseEffect}</p>
          </div>
        </div>
      )}

      {/* Addictive Warning */}
      {potion.isAddictive && (
        <div className="arcane-card p-4 border-essence-fire/30">
          <h3 className="font-display text-sm tracking-wider text-essence-fire mb-3 flex items-center gap-2">
            <AlertTriangle size={16} />
            Warning: Addictive
          </h3>
          <p className="text-parchment/90 leading-relaxed font-body">
            A creature that willingly consumes this toxin more than three times within a tenday must succeed on a Wisdom saving throw against the poisoner's DC or become addicted. An addicted creature has disadvantage on ability checks until they consume the drug again or complete a lesser restoration or similar effect.
          </p>
        </div>
      )}
    </div>
  );
};

export default PotionDetailPanel;
