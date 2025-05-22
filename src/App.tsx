import './App.css';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PropertiesPage from "./pages/Properties";
import AnalyticsPage from "./pages/Analytics";
import NotificationsPage from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Initialize theme based on localStorage or system preference
const initializeTheme = () => {
  if (localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const App = () => {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner richColors closeButton position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
