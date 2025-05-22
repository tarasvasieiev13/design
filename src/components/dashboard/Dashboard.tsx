import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricsOverview from "./MetricsOverview";
import PropertyList from "../properties/PropertyList";
import PropertyMap from "../map/PropertyMap";
import { mockDashboardMetrics, mockProperties } from "@/data/mockData";
import PropertyDetail from "../properties/PropertyDetail";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Activity, RotateCw } from "lucide-react";

const Dashboard: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectProperty = (property: Property) => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      setSelectedProperty(property);
      setIsLoading(false);
    }, 500);
  };

  const handleCloseDetail = () => {
    setSelectedProperty(null);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6 animate-fade-in">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gold-800 dark:text-gold-300 mr-2">
            Property Development Analysis Dashboard
          </h1>
          {isLoading && (
            <RotateCw className="h-5 w-5 text-gold-500 animate-spin-slow" />
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            className="border-gold-200 dark:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-900/20 hover:text-gold-700 dark:text-gold-300 button-shine transform-3d"
          >
            <RotateCw className="mr-1" /> Refresh Data
          </Button>
          <Link to="/properties">
            <Button 
              variant="outline" 
              className="border-gold-200 dark:border-gold-700 hover:bg-gold-50 dark:hover:bg-gold-900/20 hover:text-gold-700 dark:text-gold-300 button-shine transform-3d"
            >
              View All Properties
            </Button>
          </Link>
          <Button 
            className="bg-gold-500 hover:bg-gold-600 dark:bg-gold-600 dark:hover:bg-gold-500 text-white button-shine transform-3d shadow-lg hover:shadow-xl hover:shadow-gold-300/30 dark:hover:shadow-gold-500/30"
          >
            <Activity className="mr-1" /> Add Property
          </Button>
        </div>
      </div>

      {!selectedProperty ? (
        <>
          <div className="animate-slide-up [animation-delay:100ms] transform-3d">
            <MetricsOverview metrics={mockDashboardMetrics} />
          </div>

          <div className="mt-8 animate-slide-up [animation-delay:200ms]">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="mb-4 bg-gold-50 dark:bg-sidebar p-1 rounded-lg shadow-inner border border-gold-100 dark:border-gold-700/30">
                <TabsTrigger 
                  value="map" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-sidebar-accent/20 data-[state=active]:text-gold-700 dark:data-[state=active]:text-gold-300 data-[state=active]:shadow-md transition-all duration-300 hover:text-gold-600 dark:hover:text-gold-400"
                >
                  Map View
                </TabsTrigger>
                <TabsTrigger 
                  value="list" 
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-sidebar-accent/20 data-[state=active]:text-gold-700 dark:data-[state=active]:text-gold-300 data-[state=active]:shadow-md transition-all duration-300 hover:text-gold-600 dark:hover:text-gold-400"
                >
                  List View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="space-y-6">
                <div className="animate-scale-in hover:rotate-[0.3deg] transition-transform duration-700">
                  <PropertyMap properties={mockProperties} onSelectProperty={handleSelectProperty} />
                </div>
                <div className="mt-6 animate-slide-up [animation-delay:300ms]">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gold-800 dark:text-gold-300 animate-pulse-subtle">Top Development Opportunities</h2>
                    <Link to="/properties" className="text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 text-sm font-medium hover-scale group">
                      View all properties <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                  <PropertyList
                    properties={mockProperties.filter(p => p.developmentScore >= 70).slice(0, 3)}
                    onSelectProperty={handleSelectProperty}
                  />
                </div>
              </TabsContent>

              <TabsContent value="list" className="space-y-4 animate-scale-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gold-800 dark:text-gold-300 animate-pulse-subtle">All Properties</h2>
                  <Link to="/properties" className="text-gold-600 dark:text-gold-400 hover:text-gold-700 dark:hover:text-gold-300 text-sm font-medium hover-scale group">
                    Advanced filters <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
                <PropertyList properties={mockProperties} onSelectProperty={handleSelectProperty} />
              </TabsContent>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="animate-scale-in">
          <PropertyDetail property={selectedProperty} onClose={handleCloseDetail} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
