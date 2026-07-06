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
            <div className={`w-3 h-3 rounded-full border-2 p-[1px] ${isVeg ? 'border-green-600' : 'border-red-700'}`}>
              <div className={`w-full h-full rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-700'}`}></div>
            </div>
          </div>
          
          {/* Spice Level */}
          {dish.spiceLevel && (
            <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-0.5 border border-brand-orange/30">
              {Array.from({ length: dish.spiceLevel === 'Spicy' || dish.spiceLevel === 3 ? 3 : dish.spiceLevel === 'Medium' || dish.spiceLevel === 2 ? 2 : 1 }).map((_, i) => (
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
      
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif font-bold text-xl text-white mb-2 leading-tight group-hover:text-brand-orange-light transition-colors">
            {dish.name}
          </h3>
          
          <p className="text-brand-offwhite/70 text-sm font-sans mb-4 line-clamp-3">
            {dish.description}
          </p>
        </div>
        
        {/* Ordering Interaction */}
        <div className="border-t border-brand-maroon-800 pt-4 mt-auto">
          {quantity > 0 ? (
            <div className="flex items-center justify-between w-full bg-brand-maroon-900 border border-brand-maroon-800 rounded-full p-1">
              <button
                onClick={() => updateQuantity(dish.id, quantity - 1)}
                className="p-2 rounded-full hover:bg-white/10 text-brand-orange transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold text-white text-base">{quantity}</span>
              <button
                onClick={() => addToCart(dish)}
                className="p-2 rounded-full hover:bg-white/10 text-brand-orange transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(dish)}
              className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black text-sm py-3 px-4 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DishCard;
