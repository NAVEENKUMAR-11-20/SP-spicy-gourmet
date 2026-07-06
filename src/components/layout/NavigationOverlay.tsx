import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Full Menu' },
  { path: '/specials', label: 'Chef\'s Specials' },
  { path: '/offers', label: 'Combo Deals' },
  { path: '/lookup', label: 'Track Order' },
  { path: '/about', label: 'About Us' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/location', label: 'Location & Hours' },
  { path: '/admin/login', label: 'Staff POS Portal' },
];

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-brand-maroon-900/95 backdrop-blur-xl flex flex-col"
        >
          <div className="flex justify-between items-center p-5 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
              <Flame className="w-8 h-8 text-brand-orange" />
              <span className="font-serif font-black text-xl text-white">SP SPICY</span>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-8 h-8 text-brand-offwhite" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col items-center justify-center space-y-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={link.path}
                  onClick={onClose}
                  className={`text-3xl sm:text-4xl font-serif font-bold transition-all ${
                    location.pathname === link.path 
                      ? 'text-brand-orange border-b-2 border-brand-gold' 
                      : 'text-brand-offwhite hover:text-brand-orange-light'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="p-6 text-center text-brand-offwhite/60 text-sm pb-10">
            <p>Digital Menu for Dine-In Guests</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationOverlay;
