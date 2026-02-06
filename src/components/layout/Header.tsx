import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Github, FlaskConical, Store, ScrollText } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Talents', icon: Sparkles },
    { to: '/changelog', label: 'Changelog', icon: ScrollText },
    { to: '/merchants', label: 'Merchants', icon: Store },
    { to: '/potions', label: 'Alchemy', icon: FlaskConical },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="relative border-b border-gold-subtle bg-obsidian/80 backdrop-blur-sm">
      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <div className="relative">
              <Sparkles
                size={28}
                className="text-gold group-hover:text-gold-bright transition-colors"
              />
              <div className="absolute inset-0 blur-md bg-gold/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl tracking-wider text-ivory group-hover:text-gold-bright transition-colors">
                Essence
              </span>
              <span className="font-display text-[10px] md:text-xs tracking-[0.2em] text-gold-dim uppercase -mt-1">
                Talent System
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`
                        relative flex items-center gap-2 px-4 py-2 font-display text-sm tracking-wide
                        transition-all duration-200 rounded
                        ${active
                          ? 'text-gold-bright'
                          : 'text-fog hover:text-parchment'
                        }
                      `}
                    >
                      <Icon size={16} className={active ? 'text-gold' : ''} />
                      {item.label}
                      {active && (
                        <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                      )}
                    </Link>
                  </li>
                );
              })}

              {/* GitHub Link */}
              <li className="ml-2 pl-2 border-l border-gold-subtle">
                <a
                  href="https://github.com/shiroko7/essence-talent-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-mist hover:text-parchment transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github size={18} />
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-fog hover:text-parchment transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 z-50 bg-obsidian/95 backdrop-blur-md border-b border-gold-subtle">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 font-display text-sm tracking-wide
                        rounded transition-all duration-200
                        ${active
                          ? 'text-gold-bright bg-gold/10'
                          : 'text-fog hover:text-parchment hover:bg-white/5'
                        }
                      `}
                    >
                      <Icon size={18} className={active ? 'text-gold' : ''} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              <li className="mt-2 pt-2 border-t border-gold-subtle">
                <a
                  href="https://github.com/shiroko7/essence-talent-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-mist hover:text-parchment transition-colors"
                >
                  <Github size={18} />
                  <span className="font-display text-sm tracking-wide">View on GitHub</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </header>
  );
};

export default Header;
