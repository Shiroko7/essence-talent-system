/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Crimson Pro', 'serif'],
      },
      colors: {
        // Core palette
        void: '#0a0a0f',
        obsidian: '#12121a',
        slate: '#1a1a24',
        charcoal: '#242432',
        ash: '#3a3a4a',
        mist: '#6a6a7a',
        fog: '#9a9aa8',
        parchment: '#e8e4d9',
        ivory: '#f5f3eb',

        // Arcane Gold
        gold: {
          dim: '#8b7355',
          DEFAULT: '#c9a959',
          bright: '#f4d47c',
        },

        // Essence Colors
        essence: {
          water: '#4a9eff',
          'water-dim': '#2d5a8a',
          fire: '#ff6b4a',
          'fire-dim': '#8a3d2d',
          earth: '#c49a6c',
          'earth-dim': '#6b5340',
          metal: '#a8b4c4',
          'metal-dim': '#5a6270',
          wood: '#5dba6f',
          'wood-dim': '#2d5a35',
          poison: '#9b4dca',
          'poison-dim': '#4d2665',
          acid: '#a8e04a',
          'acid-dim': '#546a25',
          lightning: '#c084fc',
          'lightning-dim': '#5a3d7a',
          wind: '#7dd3fc',
          'wind-dim': '#3d6a7a',
        },

        // Rarity Colors
        rarity: {
          common: '#9ca3af',
          uncommon: '#4ade80',
          rare: '#60a5fa',
          'very-rare': '#c084fc',
          legendary: '#fb923c',
        },

        // Ability Type Colors
        type: {
          passive: '#c49a6c',
          active: '#4a9eff',
          cantrip: '#c084fc',
          spell: '#4ade80',
        },
      },
      boxShadow: {
        'arcane-sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
        'arcane-md': '0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
        'arcane-lg': '0 10px 15px rgba(0, 0, 0, 0.5), 0 4px 6px rgba(0, 0, 0, 0.3)',
        'glow-gold': '0 0 20px rgba(201, 169, 89, 0.4), 0 0 40px rgba(201, 169, 89, 0.2)',
        'glow-water': '0 0 20px rgba(74, 158, 255, 0.3)',
        'glow-fire': '0 0 20px rgba(255, 107, 74, 0.3)',
        'glow-earth': '0 0 20px rgba(196, 154, 108, 0.3)',
        'glow-metal': '0 0 20px rgba(168, 180, 196, 0.3)',
        'glow-wood': '0 0 20px rgba(93, 186, 111, 0.3)',
        'glow-poison': '0 0 20px rgba(155, 77, 202, 0.3)',
        'glow-acid': '0 0 20px rgba(168, 224, 74, 0.3)',
        'glow-lightning': '0 0 20px rgba(192, 132, 252, 0.3)',
        'glow-wind': '0 0 20px rgba(125, 211, 252, 0.3)',
      },
      borderColor: {
        'gold-subtle': 'rgba(201, 169, 89, 0.15)',
        'gold-accent': 'rgba(201, 169, 89, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'arcane-panel': 'linear-gradient(180deg, rgba(26, 26, 36, 0.9) 0%, rgba(18, 18, 26, 0.95) 100%)',
        'arcane-card': 'linear-gradient(135deg, rgba(26, 26, 36, 0.95) 0%, rgba(18, 18, 26, 0.98) 100%)',
        'arcane-btn': 'linear-gradient(180deg, rgba(201, 169, 89, 0.1) 0%, rgba(201, 169, 89, 0.05) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(201, 169, 89, 0.1) 50%, transparent 100%)',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite linear',
        'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'float': 'float 3s infinite ease-in-out',
        'essence-pulse': 'essence-pulse 2s infinite ease-in-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201, 169, 89, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(201, 169, 89, 0.4), 0 0 40px rgba(201, 169, 89, 0.2)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'essence-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
    },
  },
  safelist: [
    // Essence background colors
    'bg-essence-water', 'bg-essence-fire', 'bg-essence-earth', 'bg-essence-metal',
    'bg-essence-wood', 'bg-essence-poison', 'bg-essence-acid', 'bg-essence-lightning', 'bg-essence-wind',
    // Essence dim colors
    'bg-essence-water-dim', 'bg-essence-fire-dim', 'bg-essence-earth-dim', 'bg-essence-metal-dim',
    'bg-essence-wood-dim', 'bg-essence-poison-dim', 'bg-essence-acid-dim', 'bg-essence-lightning-dim', 'bg-essence-wind-dim',
    // Essence border colors
    'border-essence-water', 'border-essence-fire', 'border-essence-earth', 'border-essence-metal',
    'border-essence-wood', 'border-essence-poison', 'border-essence-acid', 'border-essence-lightning', 'border-essence-wind',
    // Essence text colors
    'text-essence-water', 'text-essence-fire', 'text-essence-earth', 'text-essence-metal',
    'text-essence-wood', 'text-essence-poison', 'text-essence-acid', 'text-essence-lightning', 'text-essence-wind',
    // Essence shadows
    'shadow-glow-water', 'shadow-glow-fire', 'shadow-glow-earth', 'shadow-glow-metal',
    'shadow-glow-wood', 'shadow-glow-poison', 'shadow-glow-acid', 'shadow-glow-lightning', 'shadow-glow-wind',
    // Rarity colors
    'bg-rarity-common', 'bg-rarity-uncommon', 'bg-rarity-rare', 'bg-rarity-very-rare', 'bg-rarity-legendary',
    'text-rarity-common', 'text-rarity-uncommon', 'text-rarity-rare', 'text-rarity-very-rare', 'text-rarity-legendary',
    'border-rarity-common', 'border-rarity-uncommon', 'border-rarity-rare', 'border-rarity-very-rare', 'border-rarity-legendary',
    // Type colors
    'bg-type-passive', 'bg-type-active', 'bg-type-cantrip', 'bg-type-spell',
    'text-type-passive', 'text-type-active', 'text-type-cantrip', 'text-type-spell',
    'border-type-passive', 'border-type-active', 'border-type-cantrip', 'border-type-spell',
  ],
  plugins: [],
}
