
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Property } from "@/types/property";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface PropertyDetailProps {
  property: Property;
  onClose?: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose }) => {
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

  return (
    <Card className="animate-fade-in w-full max-w-3xl mx-auto border-gold-100">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="mb-2">
          <Badge variant="outline" className={getGoNoGoColor(property.goNoGo)}>
            {property.goNoGo === "go"
              ? "GO"
              : property.goNoGo === "no-go"
              ? "NO-GO"
              : "REVIEW"}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-gold-800">{property.address}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {property.city} · Built {property.builtYear} · {property.size}m²
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <img
              src={
                property.thumbnailUrl ||
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
              }
              alt={property.address}
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
          <div className="w-full sm:w-1/2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Development Score</h3>
              <div className="flex items-center gap-2">
                <Progress value={property.developmentScore} className="h-2 bg-gold-100" 
                  style={{
                    "--progress-background": property.developmentScore >= 80 ? "#22c55e" :
                      property.developmentScore >= 60 ? "#f59e0b" : "#ef4444"
                  } as React.CSSProperties}/>
                <span className="text-sm font-medium text-gold-800">{property.developmentScore}/100</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Cap Rate</h3>
                <p className="text-lg font-semibold text-gold-800">{property.capRate.toFixed(1)}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">ROI</h3>
                <p className="text-lg font-semibold text-gold-800">{property.roi.toFixed(1)}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Projected IRR</h3>
                <p className="text-lg font-semibold text-gold-800">{property.projectedIrr.toFixed(1)}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Model</h3>
                <p className="text-lg font-semibold capitalize text-gold-800">{property.developmentModel}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="border-gold-100" />

        <div>
          <h3 className="font-medium mb-2 text-gold-800">Features</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  property.hasGarden ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span>Garden: {property.hasGarden ? `Yes (${property.gardenSize}m²)` : "No"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  property.hasRoofAccess ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span>Roof Access: {property.hasRoofAccess ? "Yes" : "No"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-300"></span>
              <span>Unit Type: {property.unitType.replace(/-/g, " ")}</span>
            </div>
          </div>
        </div>

        <Separator className="border-gold-100" />

        <div>
          <h3 className="font-medium mb-2 text-gold-800">Analysis Summary</h3>
          <p className="text-sm text-muted-foreground">{property.summaryText}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetail;
