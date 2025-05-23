import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import Header from "@/components/layout/Header";
import Home from "@/pages/home";
import Friends from "@/pages/friends";
import Messages from "@/pages/messages";
import Notifications from "@/pages/notifications";
import Discover from "@/pages/discover";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";
import Marketplace from "@/pages/marketplace";
import Groups from "@/pages/groups";
import MobileNavigation from "@/components/layout/MobileNavigation";
import ThemeToggle from "@/components/layout/ThemeToggle";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";

function App() {
  // State for theme and loading
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle theme initialization
  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Check system preference
      setTheme('dark');
    }
    
    // Simulate loading to ensure everything is mounted
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Update document class when theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading ZenithHub...</p>
        </div>
      </div>
    );
  }

  // Theme context value to be passed to components
  const themeContextValue = {
    theme,
    setTheme,
    toggleTheme
  };

  return (
    <TooltipProvider>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="flex-grow mt-24 md:mt-20 pb-16 md:pb-0">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/friends" component={Friends} />
              <Route path="/messages" component={Messages} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/discover" component={Discover} />
              <Route path="/profile" component={Profile} />
              <Route path="/settings" component={Settings} />
              <Route path="/marketplace" component={Marketplace} />
              <Route path="/groups" component={Groups} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <MobileNavigation />
          <div onClick={toggleTheme}>
            <ThemeToggle theme={theme} />
          </div>
          
          {/* Message Bubble (Fixed) */}
          <div 
            className="fixed bottom-20 md:bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 shadow-lg flex items-center justify-center text-white cursor-pointer"
            aria-label="Messaging"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
