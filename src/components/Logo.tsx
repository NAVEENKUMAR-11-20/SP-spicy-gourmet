import React from 'react';
import { Flame } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="text-center py-8 px-4">
      <div className="inline-flex items-center space-x-3 group">
        <Flame className="h-12 w-12 text-red-500 group-hover:text-red-400 transition-colors duration-300" />
        <div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-amber-500 to-red-600 bg-clip-text text-transparent tracking-tight">
            SP Spicy Gourmet
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-red-500 via-amber-500 to-red-600 rounded-full mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
        <Flame className="h-12 w-12 text-amber-500 group-hover:text-amber-400 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default Logo;