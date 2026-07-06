import React from 'react';
import { Flame, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { FoodItem } from '../../api/pocketbase';

interface DishCardProps {
  dish: FoodItem | any;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  
  const cartItem = cartItems.find((i) => i.foodId === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Normalise veg status
  const isVeg = dish.vegType === 'Veg' || dish.isVeg === true;

  return (
    <div className="bg-card-dark backdrop-blur-sm rounded-2xl overflow-hidden border border-brand-maroon-800/50 shadow-xl hover:border-brand-gold/30 transition-all duration-300 group flex flex-col h-full">
      {/* Dynamic responsive height for 2-column mobile screens */}
      <div className="relative h-32 sm:h-56 overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex gap-1.5">
          {/* Veg/Non-Veg Indicator */}
          <div className="bg-white/90 backdrop-blur-sm p-1 sm:p-1.5 rounded flex items-center justify-center shadow-sm">
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 p-[1px] ${isVeg ? 'border-green-600' : 'border-red-700'}`}>
              <div className={`w-full h-full rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-700'}`}></div>
            </div>
          </div>
          
          {/* Spice Level */}
          {dish.spiceLevel && (
            <div className="bg-black/60 backdrop-blur-sm px-1.5 py-0.5 sm:px-2 sm:py-1 rounded flex items-center gap-0.5 border border-brand-orange/30">
              {Array.from({ length: dish.spiceLevel === 'Spicy' || dish.spiceLevel === 3 ? 3 : dish.spiceLevel === 'Medium' || dish.spiceLevel === 2 ? 2 : 1 }).map((_, i) => (
                <Flame key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-brand-orange-light fill-brand-orange-light" />
              ))}
            </div>
          )}
        </div>
        
        {/* Price Tag */}
        <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-brand-orange text-white font-bold font-sans text-xs sm:text-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg shadow-lg">
          ₹{dish.price}
        </div>
      </div>
      
      {/* Responsive padding */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Responsive Font Size */}
          <h3 className="font-serif font-bold text-sm sm:text-xl text-white mb-1.5 leading-tight group-hover:text-brand-orange-light transition-colors line-clamp-1">
            {dish.name}
          </h3>
          
          {/* Responsive Description limits */}
          <p className="text-brand-offwhite/70 text-[11px] sm:text-sm font-sans mb-3 line-clamp-2">
            {dish.description}
          </p>
        </div>
        
        {/* Ordering Interaction */}
        <div className="border-t border-brand-maroon-800 pt-3 mt-auto">
          {quantity > 0 ? (
            <div className="flex items-center justify-between w-full bg-brand-maroon-900 border border-brand-maroon-800 rounded-full p-0.5 sm:p-1">
              <button
                onClick={() => updateQuantity(dish.id, quantity - 1)}
                className="p-1 sm:p-2 rounded-full hover:bg-white/10 text-brand-orange transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <span className="font-bold text-white text-xs sm:text-base">{quantity}</span>
              <button
                onClick={() => addToCart(dish)}
                className="p-1 sm:p-2 rounded-full hover:bg-white/10 text-brand-orange transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(dish)}
              className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black text-[11px] sm:text-sm py-2 px-2.5 sm:py-3 sm:px-4 rounded-full transition-all shadow-md flex items-center justify-center gap-1 sm:gap-2"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" /> 
              <span>Add to Order</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;
