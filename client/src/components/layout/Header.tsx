import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Bell, MessageCircle, Menu, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Header: React.FC = () => {
  const [location] = useLocation();
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/discover', label: 'Discover' },
    { path: '/friends', label: 'Friends' },
    { path: '/messages', label: 'Messages' },
    { path: '/notifications', label: 'Notifications' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold text-xl">Z</div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent hidden sm:inline-block">ZenithHub</span>
              </a>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search ZenithHub"
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, 3).map((item) => (
              <Link key={item.path} href={item.path}>
                <a className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  location === item.path
                    ? 'text-indigo-600 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {item.label}
                </a>
              </Link>
            ))}

            {/* Icons for Messages and Notifications */}
            <Link href="/messages">
              <a className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ${
                location === '/messages'
                  ? 'text-indigo-600 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                <MessageCircle className="h-6 w-6" />
              </a>
            </Link>

            <Link href="/notifications">
              <a className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative ${
                location === '/notifications'
                  ? 'text-indigo-600 dark:text-teal-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </a>
            </Link>

            {/* Profile Dropdown Trigger */}
            <Link href="/profile">
              <a className="flex items-center ml-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </Link>
          </nav>

          {/* Mobile Header Icons */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <Search className="h-6 w-6" />
            </button>

            <button 
              onClick={toggleMobileMenu}
              className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search - Conditional Render */}
        {searchOpen && (
          <div className="px-4 py-3 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Search ZenithHub"
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* Mobile Menu - Conditional Render */}
        {mobileMenuOpen && (
          <nav className="px-4 py-3 space-y-1 md:hidden">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location === item.path
                      ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-teal-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Link href="/profile">
              <a 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === '/profile'
                    ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </a>
            </Link>
            <Link href="/settings">
              <a 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === '/settings'
                    ? 'bg-gray-100 dark:bg-gray-800 text-indigo-600 dark:text-teal-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Settings
              </a>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;