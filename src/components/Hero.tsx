import React from 'react';
import { Sparkles, Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-center">
      <div className="relative">
        <Sparkles className="absolute -top-8 -left-4 h-6 w-6 text-amber-400 animate-pulse" />
        <Sparkles className="absolute -top-4 -right-8 h-4 w-4 text-red-400 animate-pulse delay-300" />
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Where <span className="text-red-500">Spice</span> Meets{' '}
          <span className="text-amber-500">Elegance</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-amber-100 mb-8 font-light">
          A gourmet journey of flavors
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          Experience the perfect fusion of traditional spices and contemporary culinary artistry. 
          Our expert chefs craft each dish with premium ingredients, creating an unforgettable 
          dining experience that celebrates both vegetarian and non-vegetarian gourmet cuisine.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300 group">
            <Star className="h-8 w-8 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-white font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-400 text-sm">Fresh ingredients sourced daily for exceptional taste</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 group">
            <Sparkles className="h-8 w-8 text-red-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-white font-semibold mb-2">Authentic Spices</h3>
            <p className="text-gray-400 text-sm">Traditional spice blends with modern presentation</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 group">
            <Star className="h-8 w-8 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-white font-semibold mb-2">Gourmet Experience</h3>
            <p className="text-gray-400 text-sm">Elegant dining with exceptional service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;