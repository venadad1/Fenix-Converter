import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ConverterPanel from './components/ConverterPanel';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-orange-100 selection:text-orange-600">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-start pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-down">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-orange-600 mr-2 animate-pulse"></span>
            Version 2.0 Now Available
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            The Ultimate <br/>
            <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              File Converter
            </span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Transform your images, videos, and documents effortlessly. 
            Secure, fast, and entirely in your browser. No file limits, no registration.
          </p>
        </div>

        {/* Main Converter Card */}
        <ConverterPanel />

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Secure</h3>
              <p className="text-slate-500 leading-relaxed">Files never leave your browser for supported formats. All processing happens locally on your device.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Blazing Fast</h3>
              <p className="text-slate-500 leading-relaxed">Optimized algorithms ensure your conversions happen in seconds, not minutes.</p>
           </div>
           <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Any Format</h3>
              <p className="text-slate-500 leading-relaxed">Support for a wide range of formats including JPG, PNG, MP4, PDF, DOCX and more.</p>
           </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
