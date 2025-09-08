import React from 'react';
import { Leaf, ChefHat } from 'lucide-react';

interface MenuSelectorProps {
  onMenuSelect: (menuType: 'veg' | 'non-veg') => void;
}

const MenuSelector: React.FC<MenuSelectorProps> = ({ onMenuSelect }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h3 className="text-3xl font-bold text-center text-white mb-12">
        Choose Your <span className="text-amber-500">Culinary Journey</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <button
          onClick={() => onMenuSelect('veg')}
          className="group relative bg-gradient-to-br from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
        >
          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Leaf className="h-16 w-16 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="text-2xl font-bold text-white mb-2">Vegetarian</h4>
          <p className="text-green-100">Fresh, organic, and flavorful plant-based delicacies</p>
          <div className="mt-4 inline-flex items-center text-white font-medium">
            Explore Menu
            <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
        
        <button
          onClick={() => onMenuSelect('non-veg')}
          className="group relative bg-gradient-to-br from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 rounded-2xl p-8 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
        >
          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <ChefHat className="h-16 w-16 text-white mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
          <h4 className="text-2xl font-bold text-white mb-2">Non-Vegetarian</h4>
          <p className="text-red-100">Premium meats and seafood prepared with exotic spices</p>
          <div className="mt-4 inline-flex items-center text-white font-medium">
            Explore Menu
            <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MenuSelector;