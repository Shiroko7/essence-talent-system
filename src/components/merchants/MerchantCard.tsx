import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, MapPin, ChevronRight } from 'lucide-react';
import { Merchant } from '../../types/merchant';

interface MerchantCardProps {
  merchant: Merchant;
}

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant }) => {
  if (merchant.isAvailable) {
    return (
      <Link
        to={`/merchants/${merchant.id}`}
        className="group arcane-card arcane-card-hover p-6 block"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display text-lg tracking-wide text-ivory group-hover:text-gold-bright transition-colors">
            {merchant.name}
          </h3>
          <ChevronRight
            size={18}
            className="text-mist group-hover:text-gold transition-colors flex-shrink-0"
          />
        </div>

        {/* Description */}
        <p className="text-fog text-sm font-body mb-4 line-clamp-2">
          {merchant.description}
        </p>

        {/* Location */}
        {merchant.location && (
          <div className="flex items-center gap-2 text-mist text-xs font-body">
            <MapPin size={14} className="text-gold/60" />
            <span>{merchant.location}</span>
          </div>
        )}

        {/* Hover indicator line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/0 to-transparent group-hover:via-gold/40 transition-all duration-300" />
      </Link>
    );
  }

  return (
    <div className="arcane-card p-6 relative opacity-60">
      {/* Header */}
      <h3 className="font-display text-lg tracking-wide text-ivory mb-3">
        {merchant.name}
      </h3>

      {/* Description */}
      <p className="text-fog text-sm font-body mb-4 line-clamp-2">
        {merchant.description}
      </p>

      {/* Location */}
      {merchant.location && (
        <div className="flex items-center gap-2 text-mist text-xs font-body mb-3">
          <MapPin size={14} />
          <span>{merchant.location}</span>
        </div>
      )}

      {/* Lock Overlay */}
      <div className="absolute inset-0 bg-void/50 backdrop-blur-[1px] rounded flex items-center justify-center">
        <div className="arcane-card px-4 py-2 flex items-center gap-2">
          <Lock size={16} className="text-gold" />
          <span className="font-display text-sm tracking-wide text-fog">Locked</span>
        </div>
      </div>

      {/* Lock Reason */}
      {merchant.lockReason && (
        <p className="text-xs text-mist mt-2 relative z-10 italic">{merchant.lockReason}</p>
      )}
    </div>
  );
};

export default MerchantCard;
