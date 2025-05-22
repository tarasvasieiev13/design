
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sun, Moon, RotateCw } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on user preference or system setting
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <header className="bg-white dark:bg-sidebar border-b border-gold-100 dark:border-sidebar-border sticky top-0 z-10 shadow-md backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 transition-all duration-300">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 group">
          <div className="bg-gold-500 text-white p-2 rounded shadow-lg group-hover:rotate-6 transition-all duration-500">
            <span className="font-bold text-lg flex items-center">
              PW 
              <RotateCw className="ml-1 w-4 h-4 animate-spin-slow" />
            </span>
          </div>
          <h1 className="text-xl font-semibold text-gold-800 dark:text-gold-300">
            PropWise <span className="text-gold-600 dark:text-gold-400 animate-pulse-subtle">Horizon Engine</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {[
            { path: "/", label: "Dashboard" },
            { path: "/properties", label: "Properties" },
            { path: "/analytics", label: "Analytics" },
            { path: "/notifications", label: "Notifications" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-sm font-medium text-muted-foreground dark:text-sidebar-foreground hover:text-gold-600 dark:hover:text-gold-400 transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-2 mr-2">
            <Sun className="h-4 w-4 text-gold-600 dark:text-gold-300" />
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={toggleDarkMode} 
              className="data-[state=checked]:bg-sidebar-primary"
            />
            <Moon className="h-4 w-4 text-gold-700 dark:text-gold-400" />
          </div> */}
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gold-200 dark:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-900/30 hover:text-gold-700 dark:text-gold-300 dark:hover:text-gold-200 transition-all duration-300 hover:scale-105 hover:rotate-1"
          >
            Login
          </Button>
          <Button 
            size="sm" 
            className="bg-gold-500 hover:bg-gold-600 dark:bg-gold-600 dark:hover:bg-gold-500 text-white transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-xl hover:shadow-gold-300/30 dark:hover:shadow-gold-500/30 button-shine"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
