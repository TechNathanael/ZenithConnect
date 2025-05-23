import { useState } from "react";
import { Link, useLocation } from "wouter";
import Logo from "@/components/common/Logo";
import UserAvatar from "@/components/common/UserAvatar";

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close the menu when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("#user-menu-button") && isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
            </div>
            
            {/* Search Bar */}
            <div className="hidden md:block flex-grow max-w-xl mx-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-gray-400 text-lg">search</span>
                </div>
                <input 
                  type="text" 
                  className="block w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-full pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-550 dark:focus:ring-teal-450" 
                  placeholder="Search ZenithHub..." 
                  aria-label="Search" 
                />
              </div>
            </div>
            
            {/* Main Navigation */}
            <nav className="flex items-center space-x-1 md:space-x-4" onClick={handleClickOutside}>
              <Link 
                href="/" 
                className={`p-2 ${location === "/" ? "text-indigo-550" : "text-gray-600 dark:text-gray-300 hover:text-indigo-550 dark:hover:text-teal-450"} relative`} 
                aria-label="Home" 
                title="Home"
              >
                <span className="material-icons">home</span>
              </Link>
              <Link 
                href="/friends" 
                className={`p-2 ${location === "/friends" ? "text-indigo-550" : "text-gray-600 dark:text-gray-300 hover:text-indigo-550 dark:hover:text-teal-450"} relative`} 
                aria-label="Friends" 
                title="Friends"
              >
                <span className="material-icons">people</span>
              </Link>
              <Link 
                href="/messages" 
                className={`p-2 ${location === "/messages" ? "text-indigo-550" : "text-gray-600 dark:text-gray-300 hover:text-indigo-550 dark:hover:text-teal-450"} relative`} 
                aria-label="Messages" 
                title="Messages"
              >
                <span className="material-icons">chat</span>
                <span className="absolute top-1 right-1 w-3 h-3 bg-indigo-550 rounded-full"></span>
              </Link>
              <Link 
                href="/notifications" 
                className={`p-2 ${location === "/notifications" ? "text-indigo-550" : "text-gray-600 dark:text-gray-300 hover:text-indigo-550 dark:hover:text-teal-450"} relative`} 
                aria-label="Notifications" 
                title="Notifications"
              >
                <span className="material-icons">notifications</span>
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Link>
              <Link 
                href="/discover" 
                className={`p-2 ${location === "/discover" ? "text-indigo-550" : "text-gray-600 dark:text-gray-300 hover:text-indigo-550 dark:hover:text-teal-450"}`} 
                aria-label="Discover" 
                title="Discover"
              >
                <span className="material-icons">explore</span>
              </Link>
              
              {/* Profile Dropdown */}
              <div className="relative ml-2">
                <button 
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-550 dark:focus:ring-teal-450"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleProfileMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <UserAvatar 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                    alt="Profile picture" 
                    size="sm"
                  />
                </button>
                
                {/* Dropdown Menu */}
                {isProfileMenuOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50" 
                    role="menu" 
                    aria-orientation="vertical" 
                    aria-labelledby="user-menu-button" 
                    tabIndex={-1}
                  >
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Your Profile</Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Settings</Link>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Privacy Center</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Help</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" role="menuitem">Sign out</a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Mobile search (visible only on mobile) */}
      <div className="md:hidden fixed top-16 left-0 right-0 p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons text-gray-400 text-lg">search</span>
          </div>
          <input 
            type="text" 
            className="block w-full bg-gray-100 dark:bg-gray-700 border-0 rounded-full pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-550 dark:focus:ring-teal-450" 
            placeholder="Search ZenithHub..." 
            aria-label="Search" 
          />
        </div>
      </div>
    </>
  );
}
