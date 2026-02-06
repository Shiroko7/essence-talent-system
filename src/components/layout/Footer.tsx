import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-gold-subtle bg-obsidian/60">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          {/* Decorative element */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/30" />
            <Sparkles size={16} className="text-gold/50" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/30" />
          </div>

          {/* Main text */}
          <div className="text-center">
            <p className="font-display text-sm tracking-wider text-fog">
              Essence calculator for the{' '}
              <span className="text-gold">Leatrux Campaign</span>
            </p>
          </div>

          {/* Credits */}
          <p className="text-xs text-mist">
            &copy; {new Date().getFullYear()} | Forged with React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
