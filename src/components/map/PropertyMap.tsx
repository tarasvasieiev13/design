import React, { useEffect, useRef, useState } from "react";
import { Property } from "@/types/property";
import { Card } from "@/components/ui/card";
import "../../App.css";

// This is a placeholder for Mapbox integration
// In a real implementation, you would use mapbox-gl properly
const PropertyMap: React.FC<{ properties: Property[]; onSelectProperty?: (property: Property) => void }> = ({
  properties,
  onSelectProperty,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // This function would normally initialize the Mapbox map
  const initializeMap = () => {
    console.log("Map would be initialized here with proper Mapbox integration");
    // In a real implementation, this would create a Mapbox GL map
  };

  useEffect(() => {
    initializeMap();
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);
  }, [theme]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Simple representation of properties on the map
  return (
    <Card className="relative overflow-hidden h-[400px] animate-fade-in">
      <div className="absolute inset-0 bg-gray-100" ref={mapRef}>
        <div className="w-full h-full bg-propwise-50 flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-muted-foreground mb-2">Map Visualization Placeholder</p>
            <p className="text-xs text-muted-foreground">Connect Mapbox for live property visualization</p>
            
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="relative p-3 bg-white rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow card"
                  onClick={() => {
                    setActiveProperty(property);
                    onSelectProperty && onSelectProperty(property);
                  }}
                >
                  <div
                    className={`absolute top-1 right-1 w-3 h-3 rounded-full ${getScoreColor(
                      property.developmentScore
                    )}`}
                  ></div>
                  <div className="text-xs font-medium truncate">{property.address}</div>
                  <div className="text-xs text-med-foreground truncate">
                    {property.size}m² · {property.capRate.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyMap;
