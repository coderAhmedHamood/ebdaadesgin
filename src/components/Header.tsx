import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/services' },
    { name: t('projects'), href: '/projects' },//المشاريع جاهزة لاكن 
    { name: t('about'), href: '/about' },
    { name: t('leadership'), href: '/leadership' },
    // { name: t('testimonials'), href: '/testimonials' },
    { name: t('faq'), href: '/faq' },
    { name: t('vision2030'), href: '/vision2030' },
    { name: t('contact'), href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            
            
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 flex items-center justify-center">
              <img
                src="/uploads/logo.png"
                alt="Ebdaa Design Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>


            <div className="hidden md:block">
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                إبداع ديزاين
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {t('tagline')}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Register Button */}
            {/* <Link
              to="/register"
              className="hidden md:inline-flex px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {t('register')}
            </Link> */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg text-center mt-4"
              >
                {t('register')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;