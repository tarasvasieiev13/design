
import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  useEffect(() => {
    // Add animation to gradient background
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      document.documentElement.style.setProperty('--mouse-x', `${x}`);
      document.documentElement.style.setProperty('--mouse-y', `${y}`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen background-animate bg-gradient-to-br from-gold-50 via-background to-white dark:from-sidebar dark:via-background dark:to-sidebar/80 flex flex-col animate-fade-in">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-[10%] left-[10%] w-[40%] h-[30%] bg-gold-400 dark:bg-gold-500 rounded-full mix-blend-multiply filter blur-[80px] animate-float-slow"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[60%] h-[40%] bg-propwise-400 dark:bg-propwise-500 rounded-full mix-blend-multiply filter blur-[100px] animate-float"></div>
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-gold-300 dark:bg-gold-600 rounded-full mix-blend-multiply filter blur-[70px] animate-float-reverse"></div>
        </div>
      </div>

      <Navbar />
      
      <main className="flex-1 relative z-10">
        <Dashboard />
      </main>
      
      <footer className="py-4 border-t border-gold-200 dark:border-sidebar-border bg-white/80 dark:bg-sidebar/80 backdrop-blur-sm z-10 transition-all duration-300">
        <div className="container text-center text-sm text-foreground font-medium dark:text-sidebar-foreground">
          <p className="animate-pulse-subtle">© 2025 PropWise Horizon Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
