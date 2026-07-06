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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black pointer-events-auto"
          />

          {/* Right Side Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-80 bg-brand-maroon-900 border-l border-brand-gold/20 shadow-2xl z-50 flex flex-col pointer-events-auto"
          >
            {/* Header inside drawer */}
            <div className="flex justify-between items-center p-6 border-b border-brand-gold/10">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-brand-orange" />
                <span className="font-serif font-black text-lg text-brand-orange">SP SPICY</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 text-brand-offwhite transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links list */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className={`block font-serif text-lg font-bold transition-all py-2.5 px-3 rounded-xl ${
                        isActive
                          ? 'text-white bg-brand-orange shadow-md'
                          : 'text-brand-offwhite hover:text-brand-orange hover:bg-black/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Footer inside drawer */}
            <div className="p-6 text-center text-brand-offwhite/50 text-xs border-t border-brand-gold/10 bg-brand-maroon-800/10">
              <p>Digital Menu for Dine-In Guests</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NavigationOverlay;
