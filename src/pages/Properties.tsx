import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { mockProperties } from "@/data/mockData";
import { Property } from "@/types/property";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyDetail from "@/components/properties/PropertyDetail";

const PropertiesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("developmentScore");

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseDetail = () => {
    setSelectedProperty(null);
  };

  // Filter and sort properties
  const filteredProperties = mockProperties
    .filter(property => {
      if (searchTerm) {
        return property.address.toLowerCase().includes(searchTerm.toLowerCase()) || 
               property.city.toLowerCase().includes(searchTerm.toLowerCase());
      }
      if (filter === "go") return property.goNoGo === "go";
      if (filter === "no-go") return property.goNoGo === "no-go";
      if (filter === "review") return property.goNoGo === "manual-review";
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "developmentScore") return b.developmentScore - a.developmentScore;
      if (sortBy === "capRate") return b.capRate - a.capRate;
      if (sortBy === "roi") return b.roi - a.roi;
      if (sortBy === "projectedIrr") return b.projectedIrr - a.projectedIrr;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <Card className="card-gradient border-gold-100">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-gold-800">Properties</CardTitle>
                <Button className="bg-gold-500 hover:bg-gold-600 text-white">
                  Add Property
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {!selectedProperty ? (
                <>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <Input
                        placeholder="Search properties..."
                        className="border-gold-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[150px] border-gold-200">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Properties</SelectItem>
                          <SelectItem value="go">GO</SelectItem>
                          <SelectItem value="no-go">NO-GO</SelectItem>
                          <SelectItem value="review">Review</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[150px] border-gold-200">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="developmentScore">Development Score</SelectItem>
                          <SelectItem value="capRate">Cap Rate</SelectItem>
                          <SelectItem value="roi">ROI</SelectItem>
                          <SelectItem value="projectedIrr">Projected IRR</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="grid">
                    <TabsList className="mb-4 bg-gold-50">
                      <TabsTrigger value="grid" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">Grid View</TabsTrigger>
                      <TabsTrigger value="table" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">Table View</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="grid" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProperties.map(property => (
                          <div 
                            key={property.id} 
                            className="bg-white rounded-lg shadow overflow-hidden border border-gold-100 cursor-pointer property-card"
                            onClick={() => handleSelectProperty(property)}
                          >
                            <div className="h-40 relative">
                              <img
                                src={property.thumbnailUrl || "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"}
                                alt={property.address}
                                className="w-full h-full object-cover"
                              />
                              <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold ${
                                property.developmentScore >= 80 
                                  ? "bg-green-100 text-green-800" 
                                  : property.developmentScore >= 60 
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                Score: {property.developmentScore}/100
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold mb-1 text-gold-800">{property.address}</h3>
                              <p className="text-sm text-muted-foreground mb-2">
                                {property.city} · {property.builtYear} · {property.size}m²
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline" className={
                                  property.goNoGo === "go" 
                                    ? "bg-green-100 text-green-800 border-green-200" 
                                    : property.goNoGo === "no-go" 
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }>
                                  {property.goNoGo === "go" 
                                    ? "GO" 
                                    : property.goNoGo === "no-go" 
                                    ? "NO-GO" 
                                    : "REVIEW"
                                  }
                                </Badge>
                                <Badge variant="outline" className="bg-gold-100 text-gold-800 border-gold-200">
                                  {property.capRate.toFixed(1)}% Cap Rate
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="table">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gold-50">
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">Address</th>
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">City</th>
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">Year</th>
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">Size</th>
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">Score</th>
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">Cap Rate</th>
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">Status</th>
                              <th className="text-left px-4 py-2 border-b border-gold-100 text-gold-800">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredProperties.map(property => (
                              <tr key={property.id} className="hover:bg-gold-50 cursor-pointer">
                                <td className="px-4 py-3 border-b border-gold-100">{property.address}</td>
                                <td className="px-4 py-3 border-b border-gold-100">{property.city}</td>
                                <td className="px-4 py-3 border-b border-gold-100">{property.builtYear}</td>
                                <td className="px-4 py-3 border-b border-gold-100">{property.size}m²</td>
                                <td className="px-4 py-3 border-b border-gold-100">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    property.developmentScore >= 80 
                                      ? "bg-green-100 text-green-800" 
                                      : property.developmentScore >= 60 
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {property.developmentScore}/100
                                  </span>
                                </td>
                                <td className="px-4 py-3 border-b border-gold-100">{property.capRate.toFixed(1)}%</td>
                                <td className="px-4 py-3 border-b border-gold-100">
                                  <Badge variant="outline" className={
                                    property.goNoGo === "go" 
                                      ? "bg-green-100 text-green-800 border-green-200" 
                                      : property.goNoGo === "no-go" 
                                      ? "bg-red-100 text-red-800 border-red-200"
                                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  }>
                                    {property.goNoGo === "go" 
                                      ? "GO" 
                                      : property.goNoGo === "no-go" 
                                      ? "NO-GO" 
                                      : "REVIEW"
                                    }
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 border-b border-gold-100">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="border-gold-200 hover:bg-gold-50 hover:text-gold-700"
                                    onClick={() => handleSelectProperty(property)}
                                  >
                                    View
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </>
              ) : (
                <PropertyDetail property={selectedProperty} onClose={handleCloseDetail} />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-4 border-t border-gold-100 bg-white">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 PropWise Horizon Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PropertiesPage;
