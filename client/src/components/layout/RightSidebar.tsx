import { Link } from "wouter";
import UserAvatar from "@/components/common/UserAvatar";

export default function RightSidebar() {
  return (
    <div className="hidden lg:block w-80 flex-shrink-0">
      <div className="sticky top-20">
        {/* Contacts / Online Friends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Online Friends</h3>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <span className="material-icons">search</span>
              </button>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="relative">
                  <UserAvatar 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                    alt="Sarah's profile"
                    size="xs"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <span className="ml-2 text-sm">Sarah Johnson</span>
              </li>
              <li className="flex items-center">
                <div className="relative">
                  <UserAvatar 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                    alt="Mike's profile"
                    size="xs"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <span className="ml-2 text-sm">Mike Williams</span>
              </li>
              <li className="flex items-center">
                <div className="relative">
                  <UserAvatar 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                    alt="David's profile"
                    size="xs"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <span className="ml-2 text-sm">David Chen</span>
              </li>
              <li className="flex items-center">
                <div className="relative">
                  <UserAvatar 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                    alt="Emma's profile"
                    size="xs"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <span className="ml-2 text-sm">Emma Wilson</span>
              </li>
              <li className="flex items-center">
                <div className="relative">
                  <UserAvatar 
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                    alt="Jamal's profile"
                    size="xs"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-yellow-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <span className="ml-2 text-sm">Jamal Thomas</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">• Idle</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex flex-col items-center justify-center text-indigo-550 dark:text-indigo-300">
                  <span className="text-xs font-bold">JUN</span>
                  <span className="text-sm font-bold">15</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">Web Design Trends 2023</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Online • 3:00 PM</p>
                  <div className="mt-1 flex space-x-1">
                    <div className="flex -space-x-1">
                      <img className="h-4 w-4 rounded-full border border-white dark:border-gray-800" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" alt="" />
                      <img className="h-4 w-4 rounded-full border border-white dark:border-gray-800" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" alt="" />
                      <img className="h-4 w-4 rounded-full border border-white dark:border-gray-800" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" alt="" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">+24 going</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex flex-col items-center justify-center text-purple-600 dark:text-purple-300">
                  <span className="text-xs font-bold">JUN</span>
                  <span className="text-sm font-bold">22</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium">Tech Meetup: AI & Design</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">San Francisco • 6:30 PM</p>
                  <div className="mt-1 flex space-x-1">
                    <div className="flex -space-x-1">
                      <img className="h-4 w-4 rounded-full border border-white dark:border-gray-800" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" alt="" />
                      <img className="h-4 w-4 rounded-full border border-white dark:border-gray-800" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" alt="" />
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">+12 going</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="mt-3 text-sm text-indigo-550 dark:text-teal-450 font-medium hover:underline w-full text-center">See All Events</button>
          </div>
        </div>
        
        {/* Trending Topics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Trending Now</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-400">trending_up</span>
                  #AITechnology
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 ml-7">2.3K posts today</p>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-400">trending_up</span>
                  #ProductDesign
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 ml-7">1.8K posts today</p>
              </li>
              <li>
                <Link href="#" className="flex items-center text-sm hover:text-indigo-550 dark:hover:text-teal-450">
                  <span className="material-icons mr-2 text-gray-400">trending_up</span>
                  #WebDevelopment
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 ml-7">1.2K posts today</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
