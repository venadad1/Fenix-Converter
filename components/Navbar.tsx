import React from 'react';
import { Flame } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-600 p-2 rounded-lg text-white">
              <Flame size={24} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Fenix Convertor
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Home</a>
            <a href="#" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">Features</a>
            <a href="#" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">About</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
