import UserAvatar from "@/components/common/UserAvatar";

export default function StoriesTray() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {/* Create Story */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-icons text-gray-500 dark:text-gray-400">add</span>
            </div>
            <img 
              className="h-16 w-16 object-cover opacity-40"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              alt=""
            />
          </div>
          <span className="text-xs text-center">Add Story</span>
        </div>
        
        {/* Story 1 - Active */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="gradient-border">
            <UserAvatar 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              alt="User story"
              size="lg"
              className="border-2 border-white dark:border-gray-800"
            />
          </div>
          <span className="text-xs text-center">Mike</span>
        </div>
        
        {/* Story 2 */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="gradient-border">
            <UserAvatar 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              alt="User story"
              size="lg"
              className="border-2 border-white dark:border-gray-800"
            />
          </div>
          <span className="text-xs text-center">Sarah</span>
        </div>
        
        {/* Story 3 */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="gradient-border">
            <UserAvatar 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              alt="User story"
              size="lg"
              className="border-2 border-white dark:border-gray-800"
            />
          </div>
          <span className="text-xs text-center">David</span>
        </div>
        
        {/* Story 4 */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="gradient-border">
            <UserAvatar 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              alt="User story"
              size="lg"
              className="border-2 border-white dark:border-gray-800"
            />
          </div>
          <span className="text-xs text-center">Emma</span>
        </div>
        
        {/* Story 5 */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <div className="gradient-border">
            <UserAvatar 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150"
              alt="User story"
              size="lg"
              className="border-2 border-white dark:border-gray-800"
            />
          </div>
          <span className="text-xs text-center">Jamal</span>
        </div>
      </div>
    </div>
  );
}
