import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Leaf, ChefHat, Star, Flame } from 'lucide-react';
import { menuData } from '../data/menuData';

interface MenuDisplayProps {
  menuType: 'veg' | 'non-veg';
  onBack: () => void;
  onSwitchMenu: (menuType: 'veg' | 'non-veg') => void;
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ menuType, onBack, onSwitchMenu }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const currentMenuItems = menuData[menuType];
  
  const filteredItems = useMemo(() => {
    if (!searchTerm) return currentMenuItems;
    return currentMenuItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [currentMenuItems, searchTerm]);

  const getSpiceLevel = (level: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Flame 
        key={i} 
        className={`h-4 w-4 ${i < level ? 'text-red-500' : 'text-gray-600'}`} 
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors duration-300"
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="font-medium">Back to Home</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onSwitchMenu(menuType === 'veg' ? 'non-veg' : 'veg')}
            className="flex items-center space-x-2 bg-gray-800/50 hover:bg-gray-700/50 px-4 py-2 rounded-lg transition-colors duration-300"
          >
            {menuType === 'veg' ? (
              <>
                <ChefHat className="h-5 w-5 text-red-500" />
                <span className="text-white">Switch to Non-Veg</span>
              </>
            ) : (
              <>
                <Leaf className="h-5 w-5 text-green-500" />
                <span className="text-white">Switch to Veg</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Menu Title */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          {menuType === 'veg' ? (
            <Leaf className="h-10 w-10 text-green-500" />
          ) : (
            <ChefHat className="h-10 w-10 text-red-500" />
          )}
          <h2 className="text-4xl font-bold text-white">
            {menuType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} Menu
          </h2>
        </div>
        <p className="text-gray-300 text-lg">
          {menuType === 'veg' 
            ? 'Fresh, organic ingredients crafted into exceptional plant-based dishes'
            : 'Premium meats and seafood prepared with authentic spices and modern techniques'
          }
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-12">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300"
        />
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-amber-500/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10"
          >
            <div className="relative overflow-hidden h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                {getSpiceLevel(item.spiceLevel)}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span className="text-amber-400 text-sm font-medium">{item.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-amber-500">
                  ₹{item.price}
                </span>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>•</span>
                  <span>{item.prepTime} mins</span>
                  <span>•</span>
                  <span className="capitalize">{item.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-xl mb-4">No items found matching your search</div>
          <button
            onClick={() => setSearchTerm('')}
            className="text-amber-500 hover:text-amber-400 font-medium transition-colors duration-300"
          >
            Clear search to see all items
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuDisplay;