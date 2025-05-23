import React from 'react';
import { Link, useLocation } from 'wouter';
import { Home, Compass, Users, MessageCircle, Bell } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const [location] = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/friends', icon: Users, label: 'Friends' },
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/notifications', icon: Bell, label: 'Notifications' }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <a className={`flex flex-col items-center justify-center py-2 text-xs font-medium ${
              location === item.path
                ? 'text-indigo-600 dark:text-teal-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              <item.icon className={`h-6 w-6 mb-1 ${
                location === item.path
                  ? 'text-indigo-600 dark:text-teal-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`} />
              <span>{item.label}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;