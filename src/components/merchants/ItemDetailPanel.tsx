import React, { useState } from 'react';
import { ExternalLink, Lock, Eye, EyeOff } from 'lucide-react';
import { MerchantItem, MerchantPricing, getItemPrice, formatPrice, getRarityColor } from '../../types/merchant';
import ItemDataDisplay from './ItemDataDisplay';

interface ItemDetailPanelProps {
  item: MerchantItem | null;
  pricing: MerchantPricing;
}

const ItemDetailPanel: React.FC<ItemDetailPanelProps> = ({ item, pricing }) => {
  const [iframeError, setIframeError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Select an item to view details</p>
      </div>
    );
  }

  const price = getItemPrice(item, pricing);
  const priceFormatted = formatPrice(price, pricing.currency);
  const rarityColor = getRarityColor(item.rarity);

  return (
    <div className="h-full overflow-y-auto">
      {/* Compact Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`text-xs px-2 py-1 rounded ${rarityColor}`}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </span>
          <span className="text-xs text-gray-400">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
          {item.requiresAttunement && (
            <span className="text-xs px-2 py-1 rounded bg-indigo-700 text-indigo-200 flex items-center gap-1">
              <Lock size={12} />
              Attunement
            </span>
          )}
          <span className="text-lg font-bold text-green-400 ml-auto">{priceFormatted}</span>
        </div>
      </div>

      <div className="p-4">
        {/* Basic Properties */}
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {item.properties?.weaponType && (
              <>
                <span className="text-gray-400">Weapon:</span>
                <span className="text-white">
                  {item.properties.weaponType.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </>
            )}
            {item.properties?.armorType && (
              <>
                <span className="text-gray-400">Armor:</span>
                <span className="text-white">
                  {item.properties.armorType.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </>
            )}
            {item.properties?.damageType && (
              <>
                <span className="text-gray-400">Damage:</span>
                <span className="text-white">
                  {item.properties.damageType.charAt(0).toUpperCase() + item.properties.damageType.slice(1)}
                </span>
              </>
            )}
          </div>

          {item.properties?.properties && item.properties.properties.length > 0 && (
            <div className="mt-3">
              <span className="text-gray-400 text-sm">Properties: </span>
              <div className="inline-flex flex-wrap gap-1 mt-1">
                {item.properties.properties.map((prop) => (
                  <span key={prop} className="text-xs px-2 py-0.5 bg-gray-700 text-gray-300 rounded">
                    {prop.charAt(0).toUpperCase() + prop.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detailed Data Display */}
        {item.detailedData && (
          <div className="mb-4">
            <ItemDataDisplay data={item.detailedData} />
          </div>
        )}

        {/* 5e.tools Actions */}
        <div className="border-t border-gray-700 pt-4 space-y-3">
          <div className="flex items-center gap-3">
            <a
              href={item.toolsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm transition-colors"
            >
              <ExternalLink size={16} />
              View Full Details on 5e.tools
            </a>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm transition-colors"
              title={showPreview ? "Hide Preview" : "Show Preview"}
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPreview ? 'Hide' : 'Preview'}
            </button>
          </div>

          {/* Toggle iframe Preview */}
          {showPreview && (
            <div className="mt-3">
              {!iframeError ? (
                <div className="bg-gray-900 rounded border border-gray-700 overflow-hidden" style={{ height: '500px' }}>
                  <iframe
                    src={item.toolsUrl}
                    className="w-full h-full border-0"
                    title={`${item.name} preview`}
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    onError={() => setIframeError(true)}
                  />
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-700 rounded">
                  <p className="text-gray-400 text-sm mb-3">Unable to embed preview from 5e.tools</p>
                  <p className="text-gray-500 text-xs">Use the button above to view on 5e.tools</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPanel;
