import { Link, useLocation } from 'wouter';
import { Home, Users, MessageSquare, Bell, Compass } from 'lucide-react';

const MobileNavigation = () => {
  const [location] = useLocation();
  
  const navItems = [
    { icon: <Home className="h-6 w-6" />, label: 'Home', path: '/' },
    { icon: <Users className="h-6 w-6" />, label: 'Friends', path: '/friends' },
    { icon: <MessageSquare className="h-6 w-6" />, label: 'Messages', path: '/messages' },
    { icon: <Bell className="h-6 w-6" />, label: 'Notifications', path: '/notifications' },
    { icon: <Compass className="h-6 w-6" />, label: 'Discover', path: '/discover' },
  ];
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
      <nav className="grid grid-cols-5">
        {navItems.map((item) => (
          <div key={item.path} className="flex justify-center">
            <Link href={item.path}>
              <div className={`flex flex-col items-center py-2 cursor-pointer ${
                location === item.path
                  ? 'text-indigo-500 dark:text-teal-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </div>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavigation;