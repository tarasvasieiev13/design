import React from "react";
import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockDashboardMetrics, mockProperties } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';

const AnalyticsPage = () => {
  // Generate data for charts
  const developmentScoreData = [
    { name: '0-20', value: mockProperties.filter(p => p.developmentScore < 20).length },
    { name: '21-40', value: mockProperties.filter(p => p.developmentScore >= 20 && p.developmentScore < 40).length },
    { name: '41-60', value: mockProperties.filter(p => p.developmentScore >= 40 && p.developmentScore < 60).length },
    { name: '61-80', value: mockProperties.filter(p => p.developmentScore >= 60 && p.developmentScore < 80).length },
    { name: '81-100', value: mockProperties.filter(p => p.developmentScore >= 80).length },
  ];

  const modelDistributionData = [
    { name: 'Extension', value: mockProperties.filter(p => p.developmentModel === 'extension').length },
    { name: 'Splitting', value: mockProperties.filter(p => p.developmentModel === 'splitting').length },
    { name: 'Conversion', value: mockProperties.filter(p => p.developmentModel === 'conversion').length },
    { name: 'Renovation', value: mockProperties.filter(p => p.developmentModel === 'renovation').length },
  ];

  const capRateData = [
    { name: '<3%', value: mockProperties.filter(p => p.capRate < 3).length },
    { name: '3-4%', value: mockProperties.filter(p => p.capRate >= 3 && p.capRate < 4).length },
    { name: '4-5%', value: mockProperties.filter(p => p.capRate >= 4 && p.capRate < 5).length },
    { name: '5-6%', value: mockProperties.filter(p => p.capRate >= 5 && p.capRate < 6).length },
    { name: '>6%', value: mockProperties.filter(p => p.capRate >= 6).length },
  ];

  const trendData = [
    { month: 'Jan', averageCapRate: 4.2, averageScore: 65 },
    { month: 'Feb', averageCapRate: 4.3, averageScore: 68 },
    { month: 'Mar', averageCapRate: 4.5, averageScore: 70 },
    { month: 'Apr', averageCapRate: 4.7, averageScore: 72 },
    { month: 'May', averageCapRate: 4.8, averageScore: 75 },
    { month: 'Jun', averageCapRate: 5.0, averageScore: 76 },
  ];

  const COLORS = ['#FFD700', '#FFAA00', '#FF8000', '#FF5500', '#FF0000'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 to-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gold-800">
              Property Analytics
            </h1>
            <div className="flex items-center gap-4">
              <Select defaultValue="3months">
                <SelectTrigger className="w-[180px] border-gold-200">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last month</SelectItem>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gold-200 hover:bg-gold-50 hover:text-gold-700">
                Export Report
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-gold-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-gold-700">Properties Analyzed</CardTitle>
                <CardDescription>Total properties in system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gold-800">{mockDashboardMetrics.totalProperties}</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">+{mockDashboardMetrics.recentlyAdded}</span> added this month
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-gold-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-gold-700">Average Development Score</CardTitle>
                <CardDescription>Success probability score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gold-800">{mockDashboardMetrics.averageDevelopmentScore}/100</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">+2.5%</span> increase from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-gold-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-gold-700">Average Cap Rate</CardTitle>
                <CardDescription>Return on investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gold-800">{mockDashboardMetrics.averageCapRate}%</div>
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="text-green-600">+0.3%</span> increase from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="space-y-8">
            <TabsList className="bg-gold-50 p-0">
              <TabsTrigger value="performance" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">Performance Metrics</TabsTrigger>
              <TabsTrigger value="models" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">Development Models</TabsTrigger>
              <TabsTrigger value="trends" className="data-[state=active]:bg-white data-[state=active]:text-gold-700">Market Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white border-gold-100">
                  <CardHeader>
                    <CardTitle className="text-gold-700">Development Score Distribution</CardTitle>
                    <CardDescription>Distribution of properties by development score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={developmentScoreData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" name="Number of Properties" fill="#FFB300" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-gold-100">
                  <CardHeader>
                    <CardTitle className="text-gold-700">Cap Rate Distribution</CardTitle>
                    <CardDescription>Distribution of properties by cap rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={capRateData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {capRateData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-white border-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-700">GO/NO-GO Analysis</CardTitle>
                  <CardDescription>Decision outcome analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-100 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-800">{mockDashboardMetrics.goCount}</div>
                      <div className="text-sm text-green-700">GO</div>
                    </div>
                    <div className="bg-red-100 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-800">{mockDashboardMetrics.noGoCount}</div>
                      <div className="text-sm text-red-700">NO-GO</div>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-800">{mockDashboardMetrics.reviewCount}</div>
                      <div className="text-sm text-yellow-700">REVIEW</div>
                    </div>
                  </div>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { name: 'GO', value: mockDashboardMetrics.goCount },
                          { name: 'NO-GO', value: mockDashboardMetrics.noGoCount },
                          { name: 'REVIEW', value: mockDashboardMetrics.reviewCount }
                        ]} 
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name="Number of Properties">
                          {[
                            <Cell key="cell-0" fill="#4ade80" />,
                            <Cell key="cell-1" fill="#f87171" />,
                            <Cell key="cell-2" fill="#fbbf24" />
                          ]}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="models" className="space-y-6">
              <Card className="bg-white border-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-700">Development Model Distribution</CardTitle>
                  <CardDescription>Distribution of properties by development model</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={modelDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {modelDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border-gold-100">
                  <CardHeader>
                    <CardTitle className="text-gold-700">Model Performance</CardTitle>
                    <CardDescription>Average development score by model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Extension', score: 76 },
                            { name: 'Splitting', score: 68 },
                            { name: 'Conversion', score: 72 },
                            { name: 'Renovation', score: 65 }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="score" name="Avg. Development Score" fill="#FFB300" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-gold-100">
                  <CardHeader>
                    <CardTitle className="text-gold-700">Model ROI Comparison</CardTitle>
                    <CardDescription>Average cap rate by development model</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Extension', capRate: 5.8 },
                            { name: 'Splitting', capRate: 4.9 },
                            { name: 'Conversion', capRate: 5.2 },
                            { name: 'Renovation', capRate: 4.7 }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="capRate" name="Avg. Cap Rate (%)" fill="#D69A00" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <Card className="bg-white border-gold-100">
                <CardHeader>
                  <CardTitle className="text-gold-700">Performance Trends (6 Months)</CardTitle>
                  <CardDescription>Historical development score and cap rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={trendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" domain={[0, 100]} />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="averageScore" name="Avg. Development Score" stroke="#FFB300" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="averageCapRate" name="Avg. Cap Rate (%)" stroke="#B35C00" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white border-gold-100">
                  <CardHeader>
                    <CardTitle className="text-gold-700">Regional Performance</CardTitle>
                    <CardDescription>Performance metrics by city</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Amsterdam', score: 78, capRate: 5.1 },
                            { name: 'Rotterdam', score: 72, capRate: 5.6 },
                            { name: 'Utrecht', score: 75, capRate: 4.9 },
                            { name: 'The Hague', score: 70, capRate: 5.2 }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Bar yAxisId="left" dataKey="score" name="Avg. Development Score" fill="#FFB300" />
                          <Bar yAxisId="right" dataKey="capRate" name="Avg. Cap Rate (%)" fill="#D69A00" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-gold-100">
                  <CardHeader>
                    <CardTitle className="text-gold-700">Property Type Analysis</CardTitle>
                    <CardDescription>Performance by property type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Ground-floor Apt', score: 81, capRate: 5.5 },
                            { name: 'Top-floor Apt', score: 76, capRate: 5.3 },
                            { name: 'Middle Apt', score: 68, capRate: 4.8 },
                            { name: 'Office/Retail', score: 72, capRate: 5.0 },
                            { name: 'House', score: 74, capRate: 4.5 }
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="score" name="Avg. Development Score" fill="#FFB300" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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

export default AnalyticsPage;
