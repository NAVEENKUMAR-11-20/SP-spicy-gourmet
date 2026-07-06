import React from 'react';
import { Instagram, MapPin, MessageCircle, QrCode } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/40 border-t border-brand-maroon-800 backdrop-blur-sm pt-12 pb-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="font-serif font-black text-2xl text-white mb-2">SP SPICY GOURMET</div>
            <div className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-4">Where Spice Meets Elegance</div>
            <p className="text-brand-offwhite/70 text-sm max-w-xs">
              A gourmet journey of flavors, crafted with passion and traditional spices.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-white mb-4">Contact & Hours</h3>
            <p className="text-brand-offwhite/80 text-sm mb-2">123 Culinary Avenue, Food District</p>
            <p className="text-brand-offwhite/80 text-sm mb-2">+1 (555) 123-4567</p>
            <p className="text-brand-offwhite/80 text-sm">Open Daily: 11:30 AM - 10:30 PM</p>
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-serif text-xl font-bold text-white mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-brand-maroon-800 rounded-full hover:bg-brand-orange transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-brand-maroon-800 rounded-full hover:bg-brand-orange transition-colors text-white">
                <MapPin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-brand-maroon-800 rounded-full hover:bg-brand-orange transition-colors text-white">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-brand-gold/80 text-xs bg-brand-maroon-800/50 px-3 py-2 rounded-lg">
              <QrCode className="w-4 h-4" />
              <span>You're viewing our digital menu — enjoy your meal!</span>
            </div>
          </div>

        </div>
        
        <div className="mt-12 pt-6 border-t border-brand-maroon-800/50 text-center text-brand-offwhite/50 text-xs flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} SP Spicy Gourmet. All rights reserved.</p>
          <p>Designed for Dine-in Guests</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
