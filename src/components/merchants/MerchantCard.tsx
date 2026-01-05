import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, MapPin } from 'lucide-react';
import { Merchant } from '../../types/merchant';

interface MerchantCardProps {
  merchant: Merchant;
}

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant }) => {
  if (merchant.isAvailable) {
    return (
      <Link
        to={`/merchants/${merchant.id}`}
        className="block bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-150 hover:border-blue-500 hover:bg-gray-750"
      >
        <h3 className="text-xl font-bold text-white mb-2">{merchant.name}</h3>
        <p className="text-gray-300 text-sm mb-3">{merchant.description}</p>
        {merchant.location && (
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <MapPin size={14} />
            <span>{merchant.location}</span>
          </div>
        )}
      </Link>
    );
  }

  return (
    <div className="relative bg-gray-800 border border-gray-700 rounded-lg p-6 opacity-50 cursor-not-allowed">
      <h3 className="text-xl font-bold text-white mb-2">{merchant.name}</h3>
      <p className="text-gray-300 text-sm mb-3">{merchant.description}</p>
      {merchant.location && (
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <MapPin size={14} />
          <span>{merchant.location}</span>
        </div>
      )}

      {/* Lock Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded border border-gray-600">
          <Lock size={18} className="text-gray-400" />
          <span className="text-sm text-white font-medium">Locked</span>
        </div>
      </div>

      {/* Lock Reason */}
      {merchant.lockReason && (
        <p className="text-xs text-gray-500 mt-2 relative z-10">{merchant.lockReason}</p>
      )}
    </div>
  );
};

export default MerchantCard;
