import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div 
      className="fixed bottom-8 md:bottom-24 right-8 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center cursor-pointer" 
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
    >
      <span className="material-icons text-gray-800 dark:text-gray-200 dark:hidden">dark_mode</span>
      <span className="material-icons text-gray-800 dark:text-gray-200 hidden dark:block">light_mode</span>
    </div>
  );
}
