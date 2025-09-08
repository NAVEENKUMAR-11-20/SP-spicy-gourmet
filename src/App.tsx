import React, { useState } from 'react';
import Logo from './components/Logo';
import Hero from './components/Hero';
import MenuSelector from './components/MenuSelector';
import MenuDisplay from './components/MenuDisplay';

type ViewType = 'home' | 'menu';
type MenuType = 'veg' | 'non-veg';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedMenu, setSelectedMenu] = useState<MenuType>('veg');

  const handleMenuSelect = (menuType: MenuType) => {
    setSelectedMenu(menuType);
    setCurrentView('menu');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Original Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-orange-900 to-amber-900"></div>
      
      {/* Rich Spicy Gourmet Overlay Effects */}
      <div className="absolute inset-0">
        {/* Spice dust clouds with warm colors */}
        <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-radial from-red-600/40 via-red-700/25 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-24 w-72 h-72 bg-gradient-radial from-orange-600/35 via-orange-700/20 to-transparent rounded-full blur-2xl animate-pulse-slow delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-96 h-96 bg-gradient-radial from-amber-600/40 via-amber-700/25 to-transparent rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-radial from-red-500/30 via-red-600/18 to-transparent rounded-full blur-2xl animate-pulse-slow delay-500"></div>
        
        {/* Additional spice texture layers */}
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-gradient-radial from-orange-500/25 via-orange-600/15 to-transparent rounded-full blur-xl animate-pulse-slow delay-1500"></div>
        <div className="absolute bottom-1/4 right-1/3 w-52 h-52 bg-gradient-radial from-amber-500/30 via-amber-600/18 to-transparent rounded-full blur-xl animate-pulse-slow delay-800"></div>
      </div>
      
      {/* Spice Texture Elements */}
      <div className="absolute inset-0">
        {/* Spice particle effects */}
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-400 rounded-full opacity-60 blur-sm animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-50 blur-sm animate-float delay-700"></div>
        <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-amber-400 rounded-full opacity-40 blur-sm animate-float delay-1500"></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-red-300 rounded-full opacity-70 blur-sm animate-float delay-300"></div>
        <div className="absolute top-1/6 right-1/2 w-3 h-3 bg-orange-300 rounded-full opacity-45 blur-sm animate-float delay-1200"></div>
        
        {/* Additional floating spice particles */}
        <div className="absolute top-1/5 left-2/3 w-3 h-3 bg-amber-400 rounded-full opacity-55 blur-sm animate-float delay-900"></div>
        <div className="absolute bottom-1/5 right-1/5 w-4 h-4 bg-red-500 rounded-full opacity-45 blur-sm animate-float delay-1800"></div>
        <div className="absolute top-2/3 left-1/6 w-2 h-2 bg-orange-500 rounded-full opacity-65 blur-sm animate-float delay-600"></div>
        <div className="absolute bottom-2/5 right-2/3 w-5 h-5 bg-amber-500 rounded-full opacity-40 blur-sm animate-float delay-2100"></div>
        
        {/* Spice silhouettes */}
        <div className="absolute top-20 right-1/4 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-red-400 animate-spin-slow">
            <path fill="currentColor" d="M30 5 L35 20 L50 20 L38 30 L43 45 L30 37 L17 45 L22 30 L10 20 L25 20 Z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/4 left-1/6 opacity-8">
          <svg width="40" height="80" viewBox="0 0 40 80" className="text-orange-500 animate-sway">
            <path fill="currentColor" d="M20 5 Q15 10 20 20 Q25 30 20 40 Q15 50 20 60 Q25 70 20 75 Q15 70 10 60 Q5 50 10 40 Q15 30 10 20 Q5 10 10 5 Q15 0 20 5"/>
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/2 opacity-12">
          <svg width="50" height="50" viewBox="0 0 50 50" className="text-amber-400 animate-pulse">
            <circle cx="25" cy="25" r="20" fill="currentColor"/>
            <circle cx="25" cy="25" r="15" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
        
        {/* Additional spice silhouettes */}
        <div className="absolute bottom-1/3 right-1/6 opacity-8">
          <svg width="35" height="70" viewBox="0 0 35 70" className="text-red-400 animate-sway delay-1000">
            <path fill="currentColor" d="M17 3 Q12 8 17 18 Q22 28 17 38 Q12 48 17 58 Q22 68 17 67 Q12 65 8 55 Q4 45 8 35 Q12 25 8 15 Q4 5 8 3 Q12 1 17 3"/>
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/8 opacity-12">
          <svg width="45" height="45" viewBox="0 0 45 45" className="text-orange-400 animate-spin-slow delay-5000">
            <path fill="currentColor" d="M22 2 L27 17 L42 17 L31 27 L36 42 L22 34 L8 42 L13 27 L2 17 L17 17 Z"/>
          </svg>
        </div>
        <div className="absolute bottom-1/6 left-1/3 opacity-10">
          <svg width="30" height="30" viewBox="0 0 30 30" className="text-amber-500 animate-pulse delay-3000">
            <circle cx="15" cy="15" r="12" fill="currentColor"/>
            <circle cx="15" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="15" cy="15" r="4" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </div>
      
      {/* Enhanced dark overlay for text readability with spicy warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-amber-900/10"></div>

      <div className="relative z-10">
        <Logo />
        
        <div className="transition-all duration-700 ease-in-out">
          {currentView === 'home' ? (
            <div className="animate-fadeIn">
              <Hero />
              <MenuSelector onMenuSelect={handleMenuSelect} />
            </div>
          ) : (
            <div className="animate-slideUp">
              <MenuDisplay 
                menuType={selectedMenu} 
                onBack={handleBackToHome}
                onSwitchMenu={handleMenuSelect}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;