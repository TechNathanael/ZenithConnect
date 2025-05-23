import { Link } from 'wouter';
import { Search, Bell, User, Menu } from 'lucide-react';

interface HeaderProps {
  theme: string;
  toggleTheme?: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold gradient-brand cursor-pointer">ZenithHub</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <div className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-teal-400 relative cursor-pointer">
              <Link href="/notifications">
                <Bell className="h-6 w-6" />
              </Link>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-teal-400 rounded-md cursor-pointer">
              <Link href="/profile">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">Profile</span>
                </div>
              </Link>
            </div>
          </nav>

          {/* Mobile Navigation Trigger */}
          <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {/* Mobile Search - Visible only on mobile */}
      <div className="block md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-teal-400"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;