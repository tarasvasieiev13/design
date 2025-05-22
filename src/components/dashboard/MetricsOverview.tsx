
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/types/property";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface MetricsOverviewProps {
  metrics: DashboardMetrics;
}

const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  const chartData = [
    { name: "Go", value: metrics.goCount, color: "#38a169" },
    { name: "Review", value: metrics.reviewCount, color: "#f6ad55" },
    { name: "No Go", value: metrics.noGoCount, color: "#e53e3e" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-in">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalProperties}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.recentlyAdded} added this week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Dev Score</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageDevelopmentScore.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Out of 100 possible points</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Cap Rate</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <path d="M2 10h20"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.averageCapRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Average return on investment</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Analysis Results</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={false}
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                />
                <Bar
                  dataKey="value"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;
