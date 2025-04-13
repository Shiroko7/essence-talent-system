import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 p-4">
      <div className="container mx-auto text-center text-gray-400 text-sm">
        Character essence calculator for the Leatrux campaign
        <p className="mt-1">
          &copy; {new Date().getFullYear()} | Built with React, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
