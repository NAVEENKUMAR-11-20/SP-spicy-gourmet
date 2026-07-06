import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import DishCard from '../components/ui/DishCard';

const FullMenu: React.FC = () => {
  const { foodItems, loadingItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'veg' | 'non-veg' | 'spicy'>('all');

  // Extract unique categories (capitalize them for display)
  const categories = useMemo(() => {
    const cats = Array.from(new Set(foodItems.map(d => d.category)));
    return cats.sort();
  }, [foodItems]);

  // Filter dishes
  const filteredDishes = useMemo(() => {
    return foodItems.filter(dish => {
      // Text search
      const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            dish.description.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      // Chip filters
      const isVeg = dish.vegType === 'Veg';
      if (filter === 'veg') return isVeg;
      if (filter === 'non-veg') return !isVeg;
      if (filter === 'spicy') return dish.spiceLevel === 'Spicy' || dish.spiceLevel === 'Medium';
      
      return true;
    });
  }, [foodItems, searchTerm, filter]);

  // Scroll to category
  const scrollToCategory = (category: string) => {
    const el = document.getElementById(`category-${category}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 180; // offset for sticky headers
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (loadingItems && foodItems.length === 0) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-brand-offwhite/60">Loading gourmet delicacies...</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Header & Search */}
      <div className="mb-10 text-center">
        <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-6">Our Menu</h1>
        
        <div className="max-w-2xl mx-auto relative mb-8">
          <input 
            type="text"
            placeholder="Search for a dish or ingredient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-brand-maroon-800/50 border border-brand-maroon-800 text-white px-6 py-4 rounded-full pl-14 focus:outline-none focus:border-brand-orange transition-colors"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-brand-offwhite/50 w-5 h-5" />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: 'all', label: 'All Dishes' },
            { id: 'veg', label: 'Veg Only', icon: <Leaf className="w-4 h-4" /> },
            { id: 'non-veg', label: 'Non-Veg' },
            { id: 'spicy', label: 'Spicy', icon: <Flame className="w-4 h-4" /> },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.id 
                  ? 'bg-brand-orange text-white shadow-lg' 
                  : 'bg-brand-maroon-800 text-brand-offwhite hover:bg-brand-maroon-800/80'
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sticky Category Tabs */}
      <div className="sticky top-[72px] z-30 bg-brand-maroon-900/95 backdrop-blur-md py-4 border-b border-brand-maroon-800/50 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 max-w-7xl mx-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => scrollToCategory(category)}
              className="whitespace-nowrap px-4 py-2 rounded-lg text-brand-offwhite/70 hover:text-white hover:bg-brand-maroon-800 transition-colors capitalize font-medium text-sm"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Categories */}
      <div className="space-y-16">
        {categories.map(category => {
          const categoryDishes = filteredDishes.filter(d => d.category === category);
          
          if (categoryDishes.length === 0) return null;

          return (
            <div key={category} id={`category-${category}`} className="scroll-mt-48">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-3xl font-bold text-brand-gold capitalize">
                  {category}
                </h2>
                <div className="flex-1 h-[1px] bg-brand-maroon-800/80"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryDishes.map(dish => (
                  <motion.div
                    key={dish.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.3 }}
                  >
                    <DishCard dish={dish} />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
        
        {filteredDishes.length === 0 && (
          <div className="text-center py-20 text-brand-offwhite/60">
            <p className="text-xl mb-2">No dishes found matching your criteria.</p>
            <button 
              onClick={() => { setSearchTerm(''); setFilter('all'); }}
              className="text-brand-orange hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullMenu;
