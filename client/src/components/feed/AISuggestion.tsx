export default function AISuggestion() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border-l-4 border-indigo-550 dark:border-teal-450">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-550 to-teal-450 flex items-center justify-center text-white">
          <span className="material-icons text-sm">auto_awesome</span>
        </div>
        <div className="ml-3 flex-grow">
          <h3 className="text-sm font-medium mb-1">ZenithHub Assistant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Based on your recent activity, you might be interested in the "Web Design Trends 2023" event happening this weekend.</p>
          <div className="mt-2 flex space-x-2">
            <button className="text-xs px-3 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-550 dark:text-indigo-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800">
              Learn More
            </button>
            <button className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
