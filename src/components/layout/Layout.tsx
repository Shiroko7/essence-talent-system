import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-void text-parchment font-body">
      {/* Atmospheric background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-gold/5 via-transparent to-transparent opacity-50" />
        {/* Bottom corner accents */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-essence-water/3 via-transparent to-transparent opacity-40" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-radial from-essence-poison/3 via-transparent to-transparent opacity-40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full px-4 py-6 md:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
