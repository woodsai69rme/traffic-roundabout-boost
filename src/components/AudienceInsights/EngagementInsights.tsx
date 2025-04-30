
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data - in a real app, this would come from API
const engagementByTypeData = [
  { name: 'Photos', likes: 482, comments: 140, shares: 86 },
  { name: 'Videos', likes: 650, comments: 210, shares: 122 },
  { name: 'Stories', likes: 380, comments: 120, shares: 44 },
  { name: 'Text', likes: 265, comments: 95, shares: 32 },
  { name: 'Polls', likes: 320, comments: 168, shares: 40 },
];

const engagementByTimeData = [
  { time: '6am', engagement: 120 },
  { time: '9am', engagement: 350 },
  { time: '12pm', engagement: 480 },
  { time: '3pm', engagement: 520 },
  { time: '6pm', engagement: 650 },
  { time: '9pm', engagement: 420 },
  { time: '12am', engagement: 180 },
];

const postsPerformanceData = [
  { 
    id: 1,
    title: "Product update announcement",
    impressions: 5280,
    engagement: 3.8,
    clicks: 342
  },
  { 
    id: 2,
    title: "Behind the scenes video",
    impressions: 8930,
    engagement: 5.2,
    clicks: 721
  },
  { 
    id: 3,
    title: "Customer testimonial",
    impressions: 4150,
    engagement: 4.1,
    clicks: 268
  },
  { 
    id: 4,
    title: "Industry news commentary",
    impressions: 3720,
    engagement: 2.7,
    clicks: 194
  },
  { 
    id: 5,
    title: "Team spotlight",
    impressions: 4580,
    engagement: 4.5,
    clicks: 312
  },
];

const EngagementInsights = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Engagement by Content Type</CardTitle>
          <CardDescription>
            Compare engagement metrics across different content types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementByTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" stackId="a" fill="#8884d8" />
                <Bar dataKey="comments" stackId="a" fill="#82ca9d" />
                <Bar dataKey="shares" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Times to Post</CardTitle>
            <CardDescription>
              Engagement rates by time of day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementByTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="engagement" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                <span className="font-medium">Peak engagement:</span> 6PM (650 engagements)
              </p>
              <p>
                <span className="font-medium">Recommended posting times:</span> 12PM-6PM
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>
              Posts with highest engagement rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="engagement">
              <TabsList className="mb-4">
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="impressions">Impressions</TabsTrigger>
                <TabsTrigger value="clicks">Clicks</TabsTrigger>
              </TabsList>
              <TabsContent value="engagement" className="space-y-4">
                {postsPerformanceData
                  .sort((a, b) => b.engagement - a.engagement)
                  .slice(0, 3)
                  .map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium text-sm truncate" title={post.title}>
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.impressions.toLocaleString()} impressions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{post.engagement}%</p>
                        <p className="text-xs text-muted-foreground">engagement</p>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="impressions" className="space-y-4">
                {postsPerformanceData
                  .sort((a, b) => b.impressions - a.impressions)
                  .slice(0, 3)
                  .map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium text-sm truncate" title={post.title}>
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.engagement}% engagement
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{post.impressions.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">impressions</p>
                      </div>
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="clicks" className="space-y-4">
                {postsPerformanceData
                  .sort((a, b) => b.clicks - a.clicks)
                  .slice(0, 3)
                  .map(post => (
                    <div key={post.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium text-sm truncate" title={post.title}>
                          {post.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {post.impressions.toLocaleString()} impressions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{post.clicks}</p>
                        <p className="text-xs text-muted-foreground">clicks</p>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementInsights;
