import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex mb-4 gap-2">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">404 Page Not Found</h1>
        </div>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}
