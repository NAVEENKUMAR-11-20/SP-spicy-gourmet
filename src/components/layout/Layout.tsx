import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavigationOverlay from './NavigationOverlay';
import Footer from './Footer';
import CallWaiterFAB from './CallWaiterFAB';

const Layout: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-maroon-900 text-brand-offwhite font-sans flex flex-col relative overflow-hidden">
      
      {/* Global Background Effects - similar to original but scoped back slightly so content pops */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-brand"></div>
        {/* Abstract blur blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[100px]"></div>
      </div>

      <Header onOpenNav={() => setIsNavOpen(true)} />
      <NavigationOverlay isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
      
      <main className="flex-1 relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Outlet />
      </main>

      <Footer />
      <CallWaiterFAB />
    </div>
  );
};

export default Layout;
