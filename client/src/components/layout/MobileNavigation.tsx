import { Link, useLocation } from "wouter";

export default function MobileNavigation() {
  const [location] = useLocation();
  
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40">
      <div className="flex justify-between px-6 py-2">
        <Link 
          href="/" 
          className={`flex flex-col items-center ${location === "/" ? "text-indigo-550" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="material-icons">home</span>
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link 
          href="/friends" 
          className={`flex flex-col items-center ${location === "/friends" ? "text-indigo-550" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="material-icons">people</span>
          <span className="text-xs mt-1">Friends</span>
        </Link>
        <Link 
          href="/messages" 
          className={`flex flex-col items-center ${location === "/messages" ? "text-indigo-550" : "text-gray-500 dark:text-gray-400"}`}
        >
          <div className="relative">
            <span className="material-icons">chat</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-550 rounded-full"></span>
          </div>
          <span className="text-xs mt-1">Messages</span>
        </Link>
        <Link 
          href="/notifications" 
          className={`flex flex-col items-center ${location === "/notifications" ? "text-indigo-550" : "text-gray-500 dark:text-gray-400"}`}
        >
          <div className="relative">
            <span className="material-icons">notifications</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <span className="text-xs mt-1">Alerts</span>
        </Link>
        <Link 
          href="/profile" 
          className={`flex flex-col items-center ${location === "/profile" ? "text-indigo-550" : "text-gray-500 dark:text-gray-400"}`}
        >
          <span className="material-icons">menu</span>
          <span className="text-xs mt-1">Menu</span>
        </Link>
      </div>
    </div>
  );
}
