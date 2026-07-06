import React from 'react';
import { Flame, Info } from 'lucide-react';
import { MenuItem } from '../../data/menuData'; // Assume we adapt this slightly

interface DishCardProps {
  dish: MenuItem | any; // Type flexibly for now
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  return (
    <div className="bg-card-dark backdrop-blur-sm rounded-2xl overflow-hidden border border-brand-maroon-800/50 shadow-xl hover:border-brand-gold/30 transition-all duration-300 group flex flex-col h-full">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Veg/Non-Veg Indicator */}
          <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-md flex items-center justify-center shadow-sm">
            <div className={`w-3 h-3 rounded-full border-2 p-[1px] ${dish.isVeg !== false && dish.category !== 'non-veg' ? 'border-green-600' : 'border-red-700'}`}>
              <div className={`w-full h-full rounded-full ${dish.isVeg !== false && dish.category !== 'non-veg' ? 'bg-green-600' : 'bg-red-700'}`}></div>
            </div>
          </div>
          
          {/* Spice Level */}
          {dish.spiceLevel > 0 && (
            <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-0.5 border border-brand-orange/30">
              {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                <Flame key={i} className="w-3.5 h-3.5 text-brand-orange-light fill-brand-orange-light" />
              ))}
            </div>
          )}
        </div>
        
        {/* Price Tag */}
        <div className="absolute bottom-3 right-3 bg-brand-orange text-white font-bold font-sans px-3 py-1 rounded-lg shadow-lg">
          ₹{dish.price}
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif font-bold text-xl text-white mb-2 leading-tight group-hover:text-brand-orange-light transition-colors">
          {dish.name}
        </h3>
        
        <p className="text-brand-offwhite/70 text-sm font-sans mb-4 flex-1 line-clamp-3">
          {dish.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-brand-maroon-800 flex items-center gap-2 text-brand-gold/90 text-xs font-medium">
          <Info className="w-4 h-4" />
          <span>Ask your server to order this</span>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
