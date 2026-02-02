import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 p-4 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Essence Talent System</Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="hover:text-blue-400">Home</Link>
            </li>
            <li>
              <Link to="/changelog" className="hover:text-blue-400">Changelog</Link>
            </li>
            <li>
              <Link to="/merchants" className="hover:text-blue-400">Merchants</Link>
            </li>
            <li>
              <Link to="/potions" className="hover:text-blue-400">Alchemy</Link>
            </li>
            <li>
              <a href="https://github.com/shiroko7/essence-talent-system" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                GitHub
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
