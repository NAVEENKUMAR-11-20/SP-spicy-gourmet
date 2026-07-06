import React, { useState, useEffect } from 'react';
import { Menu, Flame, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../customer/CartDrawer';

interface HeaderProps {
  onOpenNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-brand-orange shadow-lg ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 z-50">
            <Flame className="w-8 h-8 text-brand-gold fill-brand-gold" />
            <div className="flex flex-col">
              {/* Logo text is now white, contrasting beautifully on the solid dark forest green bg */}
              <span className="font-serif font-black text-xl leading-none text-white tracking-wide">SP SPICY</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-brand-gold font-medium">Gourmet</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4 z-50">
            {/* Cart Icon Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all relative shrink-0 flex items-center justify-center"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-6 h-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-brand-gold text-brand-orange text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-orange">
                  {totalItems}
                </span>
              )}
            </button>

            <button 
              onClick={onOpenNav}
              className="p-2.5 rounded-full bg-white/10 border border-white/25 text-white hover:bg-white/20 transition-all group shrink-0 flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white group-hover:text-brand-gold transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Cart drawer overlay */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
