
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";

interface PropertyListProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onSelectProperty }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getGoNoGoColor = (status: string) => {
    switch (status) {
      case "go":
        return "bg-green-100 text-green-800 border-green-200";
      case "no-go":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getModelBadge = (model: string) => {
    switch (model) {
      case "extension":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "splitting":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "conversion":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "renovation":
        return "bg-teal-100 text-teal-800 border-teal-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {properties.map((property) => (
        <Card
          key={property.id}
          className="property-card overflow-hidden border-gold-100"
          onClick={() => onSelectProperty && onSelectProperty(property)}
        >
          <div className="h-40 relative">
            <img
              src={
                property.thumbnailUrl ||
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
              }
              alt={property.address}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold ${getScoreColor(
                property.developmentScore
              )}`}
            >
              Score: {property.developmentScore}/100
            </div>
          </div>
          <CardContent className="pt-4">
            <h3 className="text-lg font-semibold mb-1 text-gold-800">{property.address}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {property.city} · {property.builtYear} · {property.size}m²
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className={getGoNoGoColor(property.goNoGo)}>
                {property.goNoGo === "go"
                  ? "GO"
                  : property.goNoGo === "no-go"
                  ? "NO-GO"
                  : "REVIEW"}
              </Badge>
              <Badge variant="outline" className={getModelBadge(property.developmentModel)}>
                {property.developmentModel.charAt(0).toUpperCase() + property.developmentModel.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-gold-100 text-gold-800 border-gold-200">
                {property.capRate.toFixed(1)}% Cap Rate
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-0 text-sm text-muted-foreground">
            <p className="line-clamp-2">
              {property.summaryText.length > 100
                ? property.summaryText.substring(0, 100) + "..."
                : property.summaryText}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PropertyList;
