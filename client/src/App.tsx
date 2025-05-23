import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "@/components/layout/Header";
import Home from "@/pages/home";
import Friends from "@/pages/friends";
import Messages from "@/pages/messages";
import Notifications from "@/pages/notifications";
import Discover from "@/pages/discover";
import Profile from "@/pages/profile";
import Settings from "@/pages/settings";
import MobileNavigation from "@/components/layout/MobileNavigation";
import ThemeToggle from "@/components/layout/ThemeToggle";
import NotFound from "@/pages/not-found";

function App() {
  const { theme } = useTheme();

  return (
    <TooltipProvider>
      <div className={theme === "dark" ? "dark" : ""}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow mt-24 md:mt-20 pb-16 md:pb-0">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/friends" component={Friends} />
              <Route path="/messages" component={Messages} />
              <Route path="/notifications" component={Notifications} />
              <Route path="/discover" component={Discover} />
              <Route path="/profile" component={Profile} />
              <Route path="/settings" component={Settings} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <MobileNavigation />
          <ThemeToggle />
          
          {/* Message Bubble (Fixed) */}
          <div 
            className="fixed bottom-20 md:bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-550 to-teal-450 shadow-lg flex items-center justify-center text-white cursor-pointer"
            aria-label="Messaging"
          >
            <span className="material-icons">chat</span>
          </div>
        </div>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
