import { Link } from "wouter";
import UserAvatar from "@/components/common/UserAvatar";

export default function Sidebar() {
  return (
    <div className="hidden md:block w-64 flex-shrink-0">
      <div className="sticky top-20">
        {/* User Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4 overflow-hidden">
          <div className="relative h-24 bg-gradient-to-r from-indigo-550 to-teal-450"></div>
          <div className="p-4 pt-0 relative">
            <div className="absolute -top-8 left-4">
              <UserAvatar 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
                alt="Profile picture"
                size="lg"
                className="border-4 border-white dark:border-gray-800"
              />
            </div>
            <div className="mt-8">
              <h2 className="text-lg font-semibold">Alex Morgan</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">@alexmorgan</p>
            </div>
            
            <div className="flex justify-between mt-4 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
              <div>
                <div className="font-medium">1,234</div>
                <div className="text-gray-600 dark:text-gray-400">Followers</div>
              </div>
              <div>
                <div className="font-medium">567</div>
                <div className="text-gray-600 dark:text-gray-400">Following</div>
              </div>
              <div>
                <div className="font-medium">89</div>
                <div className="text-gray-600 dark:text-gray-400">Posts</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Nav */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <div className="p-4">
            <h3 className="font-semibold mb-2">Shortcuts</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">photo_library</span>
                  My Photos
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">bookmark</span>
                  Saved Posts
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">groups</span>
                  Design Community
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">event</span>
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">store</span>
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Smart Lists (AI Grouped) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Smart Lists</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-550 dark:text-indigo-300">AI</span>
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">work</span>
                  Colleagues
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">school</span>
                  College Friends
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-500">favorite</span>
                  Close Friends
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
