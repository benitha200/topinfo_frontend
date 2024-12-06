import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const TopNavigation = ({ 
  isScrolled, 
  isDarkMode, 
  toggleDarkMode, 
  isNavOpen, 
  toggleNav 
}) => {
  const publicNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Become Provider', path: '/provider' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
              TopInfo
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            {publicNavItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="text-gray-700 hover:text-sky-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <div className="space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 border border-sky-500 text-sky-600 rounded-md hover:bg-sky-50 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
              >
                Register
              </Link>
            </div>

            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;