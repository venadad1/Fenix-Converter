import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Supported Formats</a></li>
              <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">About</a></li>
              <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-500 hover:text-orange-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-orange-600 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github size={24} />
              </a>
              <a href="#" className="text-slate-400 hover:text-orange-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter size={24} />
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500 flex items-center">
              Made with <Heart size={14} className="mx-1 text-red-500 fill-red-500" /> by Fenix
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
