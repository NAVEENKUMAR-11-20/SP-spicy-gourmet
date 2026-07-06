import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Flame, Clock, Plus, Minus, ShoppingCart } from 'lucide-react';
import { chefSpecials } from '../data/mockData';
import { useCart } from '../context/CartContext';

const ChefSpecials: React.FC = () => {
  const { cartItems, addToCart, updateQuantity, foodItems } = useCart();

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-16">
      <div className="text-center">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">Chef's Specials</h1>
        <div className="h-1 w-24 bg-brand-gold mx-auto rounded-full mb-6"></div>
        <p className="text-brand-offwhite/80 max-w-xl mx-auto">
          Exclusive creations by Chef Rajesh. These dishes feature seasonal ingredients and intricate techniques, available in limited quantities.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {chefSpecials.map((special, index) => {
          // Find matching item in pb fetched/fallback items
          const matchingItem = foodItems.find(f => f.name === special.name) || {
            id: `special-${special.id}`,
            name: special.name,
            price: special.price,
            image: special.image,
            vegType: special.isVeg ? 'Veg' : 'Non-Veg',
            spiceLevel: special.spiceLevel === 1 ? 'Mild' : special.spiceLevel === 2 ? 'Medium' : 'Spicy',
            description: special.description,
            isAvailable: true,
            isChefSpecial: true
          };

          const cartItem = cartItems.find((i) => i.foodId === matchingItem.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <motion.div 
              key={special.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center bg-card-dark rounded-3xl overflow-hidden border border-brand-maroon-800/60 shadow-2xl group`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-72 md:h-full min-h-[400px] relative overflow-hidden">
                <img 
                  src={special.image} 
                  alt={special.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-brand-maroon-900/80 backdrop-blur-md text-brand-gold text-xs font-bold px-3 py-1.5 rounded-full border border-brand-gold/30 flex items-center gap-1.5 uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> Limited Availability
                  </span>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
                    {special.name}
                  </h2>
                  <span className="bg-brand-orange text-white font-bold px-4 py-1 rounded-lg text-lg">
                    ₹{special.price}
                  </span>
                </div>
                
                <div className="flex gap-2 mb-6">
                   {/* Veg/Non-Veg Indicator */}
                  <div className="bg-white/10 p-1.5 rounded flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 rounded-full border-2 p-[1px] ${special.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                      <div className={`w-full h-full rounded-full ${special.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                  </div>
                  {/* Spice Level */}
                  {special.spiceLevel > 0 && (
                    <div className="bg-white/10 px-2 py-1.5 rounded flex items-center gap-0.5">
                      {Array.from({ length: special.spiceLevel }).map((_, i) => (
                        <Flame key={i} className="w-3.5 h-3.5 text-brand-orange-light fill-brand-orange-light" />
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-brand-offwhite/80 text-lg mb-8">
                  {special.description}
                </p>

                <div className="relative bg-brand-maroon-900/50 p-6 rounded-2xl border-l-4 border-brand-gold mb-8">
                  <Quote className="absolute -top-3 -left-3 w-8 h-8 text-brand-gold/40 fill-brand-gold/40 rotate-180" />
                  <p className="text-brand-offwhite italic text-sm leading-relaxed relative z-10 font-serif">
                    {special.chefNote}
                  </p>
                  <div className="mt-4 text-brand-gold text-xs font-bold uppercase tracking-widest text-right">
                    - Chef Rajesh
                  </div>
                </div>

                {/* Stepper or Add Button */}
                <div className="w-full">
                  {quantity > 0 ? (
                    <div className="flex items-center justify-between w-full max-w-[200px] bg-brand-maroon-900 border border-brand-maroon-800 rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(matchingItem.id, quantity - 1)}
                        className="p-2.5 rounded-full hover:bg-white/10 text-brand-orange transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-white text-base">{quantity}</span>
                      <button
                        onClick={() => addToCart(matchingItem as any)}
                        className="p-2.5 rounded-full hover:bg-white/10 text-brand-orange transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(matchingItem as any)}
                      className="w-full max-w-[200px] bg-brand-orange hover:bg-brand-orange-light text-white font-serif font-black text-sm py-4 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Order
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChefSpecials;
