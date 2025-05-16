
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EngagementInsightsProps {
  platform: string;
}

const EngagementInsights: React.FC<EngagementInsightsProps> = ({ platform }) => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Mock data for engagement over time
  const engagementData = {
    '7d': Array.from({ length: 7 }, (_, i) => ({
      name: i === 0 ? 'Today' : `Day ${i}`,
      engagement: 3 + Math.random() * 3,
      impressions: 1000 + Math.random() * 1000,
      clicks: 50 + Math.random() * 100
    })),
    '30d': Array.from({ length: 30 }, (_, i) => ({
      name: `Day ${i + 1}`,
      engagement: 3 + Math.random() * 3,
      impressions: 1000 + Math.random() * 1000,
      clicks: 50 + Math.random() * 100
    })),
    '90d': Array.from({ length: 12 }, (_, i) => ({
      name: `Week ${i + 1}`,
      engagement: 3 + Math.random() * 3,
      impressions: 1000 + Math.random() * 1000,
      clicks: 50 + Math.random() * 100
    }))
  };
  
  // Mock data for content type performance
  const contentPerformanceData = [
    { type: 'Images', engagement: 4.2, impressions: 1200, clicks: 85 },
    { type: 'Videos', engagement: 5.8, impressions: 1800, clicks: 120 },
    { type: 'Carousel', engagement: 6.1, impressions: 1500, clicks: 105 },
    { type: 'Text', engagement: 2.9, impressions: 950, clicks: 42 },
    { type: 'Link', engagement: 3.5, impressions: 1100, clicks: 95 },
  ];
  
  // Mock data for best posting times
  const bestTimesData = [
    { time: '9 AM', engagement: 4.2 },
    { time: '12 PM', engagement: 3.8 },
    { time: '3 PM', engagement: 4.7 },
    { time: '6 PM', engagement: 5.3 },
    { time: '9 PM', engagement: 4.9 },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Engagement Insights</CardTitle>
            <CardDescription>Performance metrics for your {platform} content</CardDescription>
          </div>
          <Tabs 
            value={timeframe} 
            onValueChange={(value) => setTimeframe(value as '7d' | '30d' | '90d')}
            className="mt-2 md:mt-0"
          >
            <TabsList>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="30d">30 Days</TabsTrigger>
              <TabsTrigger value="90d">90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-4">Engagement Rate Over Time (%)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={engagementData[timeframe]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number | string) => {
                    if (typeof value === 'number') {
                      return `${value.toFixed(2)}%`;
                    }
                    return `${value}%`;
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#8884d8" activeDot={{ r: 8 }} name="Engagement Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Content Type Performance</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={contentPerformanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="engagement" fill="#8884d8" name="Engagement Rate (%)" />
                <Bar yAxisId="right" dataKey="clicks" fill="#82ca9d" name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">Best Posting Times</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={bestTimesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number | string) => {
                    if (typeof value === 'number') {
                      return `${value.toFixed(2)}%`;
                    }
                    return `${value}%`;
                  }}
                />
                <Legend />
                <Bar dataKey="engagement" fill="#8884d8" name="Engagement Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementInsights;
