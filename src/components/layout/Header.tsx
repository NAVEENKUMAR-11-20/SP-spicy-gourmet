import React, { useState, useEffect } from 'react';
import { Menu, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-maroon-900/90 backdrop-blur-md py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-50">
          <Flame className="w-8 h-8 text-brand-orange" />
          <div className="flex flex-col">
            <span className="font-serif font-black text-xl leading-none text-white tracking-wide">SP SPICY</span>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-gold font-medium">Gourmet</span>
          </div>
        </Link>
        
        <button 
          onClick={onOpenNav}
          className="p-2 rounded-full hover:bg-white/10 transition-colors z-50 group"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-brand-offwhite group-hover:text-brand-orange-light transition-colors" />
        </button>
      </div>
    </header>
  );
};

export default Header;
