import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Lock } from 'lucide-react';
import { MerchantItem, getRarityColor } from '../../types/merchant';

interface ItemDetailsProps {
  item: MerchantItem;
  onClose: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onClose }) => {
  const [iframeError, setIframeError] = useState(false);
  const rarityColor = getRarityColor(item.rarity);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 border border-gray-600 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-600 flex justify-between items-center z-10">
          <div className="flex items-center gap-3 flex-1">
            <h2 className="text-xl font-bold">{item.name}</h2>
            <span className={`text-xs px-2 py-1 rounded-full ${rarityColor}`}>
              {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
            </span>
            {item.requiresAttunement && (
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-700 text-indigo-200 flex items-center gap-1">
                <Lock size={12} />
                Attunement
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded-full"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Item Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-medium mb-1 text-gray-400">Type</h3>
              <div className="text-white">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </div>
            </div>

            <div className="bg-gray-700 p-3 rounded-lg">
              <h3 className="text-sm font-medium mb-1 text-gray-400">Rarity</h3>
              <div className="text-white">
                {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
              </div>
            </div>

            {item.properties?.weaponType && (
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-medium mb-1 text-gray-400">Weapon Type</h3>
                <div className="text-white">
                  {item.properties.weaponType.charAt(0).toUpperCase() + item.properties.weaponType.slice(1)}
                </div>
              </div>
            )}

            {item.properties?.armorType && (
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-medium mb-1 text-gray-400">Armor Type</h3>
                <div className="text-white">
                  {item.properties.armorType.charAt(0).toUpperCase() + item.properties.armorType.slice(1)}
                </div>
              </div>
            )}

            {item.source && (
              <div className="bg-gray-700 p-3 rounded-lg">
                <h3 className="text-sm font-medium mb-1 text-gray-400">Source</h3>
                <div className="text-white text-sm">{item.source}</div>
              </div>
            )}
          </div>

          {/* External Link */}
          <div className="mb-4 flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <span className="text-sm text-gray-300">View full details on 5e.tools</span>
            <a
              href={item.toolsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-2 text-sm"
            >
              <ExternalLink size={16} />
              Open in new tab
            </a>
          </div>

          {/* iframe Embed */}
          {!iframeError ? (
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src={item.toolsUrl}
                className="w-full h-[60vh] border-0"
                title={`${item.name} details`}
                sandbox="allow-scripts allow-same-origin allow-popups"
                onError={() => setIframeError(true)}
              />
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-700 rounded-lg">
              <p className="text-gray-400 mb-4">
                Unable to embed content from 5e.tools.
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Please view the item details directly on 5e.tools using the link above.
              </p>
              <a
                href={item.toolsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white"
              >
                <ExternalLink size={16} />
                Open on 5e.tools
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
