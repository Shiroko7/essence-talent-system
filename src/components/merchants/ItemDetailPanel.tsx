import React, { useState } from 'react';
import { ExternalLink, Lock, Eye, EyeOff, Package } from 'lucide-react';
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
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Package size={48} className="mx-auto mb-4 text-mist/30" />
          <p className="font-display text-lg text-mist">Select an item to view details</p>
        </div>
      </div>
    );
  }

  const price = getItemPrice(item, pricing);
  const priceFormatted = formatPrice(price, pricing.currency);
  const rarityColor = getRarityColor(item.rarity);

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="p-5 border-b border-gold-subtle sticky top-0 z-10 bg-slate/95 backdrop-blur-sm">
        <h2 className="font-display text-2xl tracking-wide text-ivory mb-3">{item.name}</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 rounded text-sm font-display tracking-wide ${rarityColor}`}>
            {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
          </span>
          <span className="text-sm text-mist font-body">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </span>
          {item.requiresAttunement && (
            <span className="flex items-center gap-1 px-3 py-1 rounded text-sm font-display tracking-wide bg-type-cantrip/20 text-type-cantrip border border-type-cantrip/30">
              <Lock size={14} />
              Attunement
            </span>
          )}
          <span className="text-lg font-display text-type-spell ml-auto">{priceFormatted}</span>
        </div>
      </div>

      <div className="p-5">
        {/* Basic Properties */}
        <div className="mb-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {item.properties?.weaponType && (
              <>
                <span className="text-mist font-body">Weapon:</span>
                <span className="text-parchment font-body">
                  {item.properties.weaponType.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </>
            )}
            {item.properties?.armorType && (
              <>
                <span className="text-mist font-body">Armor:</span>
                <span className="text-parchment font-body">
                  {item.properties.armorType.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </>
            )}
            {item.properties?.damageType && (
              <>
                <span className="text-mist font-body">Damage:</span>
                <span className="text-parchment font-body">
                  {item.properties.damageType.charAt(0).toUpperCase() + item.properties.damageType.slice(1)}
                </span>
              </>
            )}
          </div>

          {item.properties?.properties && item.properties.properties.length > 0 && (
            <div className="mt-4">
              <span className="text-mist text-sm font-body">Properties: </span>
              <div className="inline-flex flex-wrap gap-1.5 mt-1">
                {item.properties.properties.map((prop) => (
                  <span key={prop} className="arcane-badge">
                    {prop.charAt(0).toUpperCase() + prop.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Detailed Data Display */}
        {item.detailedData && (
          <div className="mb-5">
            <ItemDataDisplay data={item.detailedData} />
          </div>
        )}

        {/* 5e.tools Actions */}
        <div className="border-t border-gold-subtle pt-5 space-y-4">
          <div className="flex items-center gap-3">
            <a
              href={item.toolsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 arcane-btn arcane-btn-primary inline-flex items-center justify-center gap-2"
            >
              <ExternalLink size={16} />
              View Full Details on 5e.tools
            </a>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="arcane-btn inline-flex items-center gap-2"
              title={showPreview ? "Hide Preview" : "Show Preview"}
            >
              {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              {showPreview ? 'Hide' : 'Preview'}
            </button>
          </div>

          {/* Toggle iframe Preview */}
          {showPreview && (
            <div className="mt-4">
              {!iframeError ? (
                <div className="arcane-card rounded overflow-hidden" style={{ height: '500px' }}>
                  <iframe
                    src={item.toolsUrl}
                    className="w-full h-full border-0"
                    title={`${item.name} preview`}
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    onError={() => setIframeError(true)}
                  />
                </div>
              ) : (
                <div className="arcane-card p-8 text-center">
                  <p className="text-fog text-sm mb-3 font-body">Unable to embed preview from 5e.tools</p>
                  <p className="text-mist text-xs font-body">Use the button above to view on 5e.tools</p>
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
