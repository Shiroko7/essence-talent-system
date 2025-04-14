import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full">
      <Header />
      <main className="flex-1 w-full p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
