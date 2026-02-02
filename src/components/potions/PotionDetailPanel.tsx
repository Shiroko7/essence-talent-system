import React from 'react';
import { FlaskConical, AlertTriangle, Clock, Shield, Coins } from 'lucide-react';
import { Potion, getPotionRarityColor, POTION_CATEGORIES, getCraftingCost } from '../../types/potion';

interface PotionDetailPanelProps {
  potion: Potion | null;
}

const PotionDetailPanel: React.FC<PotionDetailPanelProps> = ({ potion }) => {
  if (!potion) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <div className="text-center">
          <FlaskConical size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">Select a potion to view details</p>
        </div>
      </div>
    );
  }

  const categoryLabel = POTION_CATEGORIES.find(c => c.id === potion.category)?.label || potion.category;

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{potion.name}</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPotionRarityColor(potion.rarity)}`}>
            {potion.rarity.charAt(0).toUpperCase() + potion.rarity.slice(1)}
          </span>
          <span className="text-gray-400">{categoryLabel}</span>
          {potion.isAddictive && (
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-red-700 text-red-200">
              <AlertTriangle size={14} />
              Addictive
            </span>
          )}
        </div>
      </div>

      {/* Effect */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Effect</h3>
        <p className="text-gray-300 leading-relaxed">{potion.effect}</p>
      </div>

      {/* Properties */}
      {(potion.duration || potion.savingThrow) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {potion.duration && (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Clock size={16} />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <p className="text-white font-semibold">{potion.duration}</p>
            </div>
          )}

          {potion.savingThrow && (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Shield size={16} />
                <span className="text-sm font-medium">Saving Throw</span>
              </div>
              <p className="text-white font-semibold">{potion.savingThrow}</p>
            </div>
          )}
        </div>
      )}

      {/* Crafting Cost */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <Coins size={18} />
          Crafting Cost
        </h3>
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            {(() => {
              const cost = getCraftingCost(potion.rarity);
              return (
                <>
                  <div>
                    <span className="text-amber-400 font-semibold">{cost.gp.toLocaleString()}</span>
                    <span className="text-gray-400 ml-1">gp</span>
                  </div>
                  <div className="text-gray-600">|</div>
                  <div>
                    <span className="text-gray-300 font-semibold">{cost.pp.toLocaleString()}</span>
                    <span className="text-gray-400 ml-1">pp</span>
                  </div>
                  <div className="text-gray-600">|</div>
                  <div>
                    <span className="text-gray-300 font-semibold">{cost.ep.toLocaleString()}</span>
                    <span className="text-gray-400 ml-1">ep</span>
                  </div>
                  <div className="text-gray-600">|</div>
                  <div>
                    <span className="text-gray-300 font-semibold">{cost.sp.toLocaleString()}</span>
                    <span className="text-gray-400 ml-1">sp</span>
                  </div>
                  <div className="text-gray-600">|</div>
                  <div>
                    <span className="text-gray-300 font-semibold">{cost.cp.toLocaleString()}</span>
                    <span className="text-gray-400 ml-1">cp</span>
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
          <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} />
            Overdose Effect
          </h3>
          <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
            <p className="text-gray-300 leading-relaxed">{potion.overdoseEffect}</p>
          </div>
        </div>
      )}

      {/* Addictive Warning */}
      {potion.isAddictive && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} />
            Warning: Addictive
          </h3>
          <p className="text-gray-300 leading-relaxed">
            A creature that willingly consumes this toxin more than three times within a tenday must succeed on a Wisdom saving throw against the poisoner's DC or become addicted. An addicted creature has disadvantage on ability checks until they consume the drug again or complete a lesser restoration or similar effect.
          </p>
        </div>
      )}
    </div>
  );
};

export default PotionDetailPanel;
