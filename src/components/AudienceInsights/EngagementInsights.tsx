
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EngagementInsightsProps {
  platform?: string;
}

// Sample data - in a real app, this would come from API
const engagementData = [
  { name: 'Monday', likes: 120, comments: 25, shares: 15 },
  { name: 'Tuesday', likes: 150, comments: 30, shares: 20 },
  { name: 'Wednesday', likes: 200, comments: 40, shares: 30 },
  { name: 'Thursday', likes: 180, comments: 35, shares: 25 },
  { name: 'Friday', likes: 250, comments: 45, shares: 35 },
  { name: 'Saturday', likes: 300, comments: 60, shares: 45 },
  { name: 'Sunday', likes: 280, comments: 55, shares: 40 },
];

const growthData = [
  { name: 'Jan', followers: 2100 },
  { name: 'Feb', followers: 2300 },
  { name: 'Mar', followers: 2600 },
  { name: 'Apr', followers: 2900 },
  { name: 'May', followers: 3200 },
  { name: 'Jun', followers: 3800 },
  { name: 'Jul', followers: 4200 },
];

const timeData = [
  { time: '6 AM', engagement: 15 },
  { time: '9 AM', engagement: 30 },
  { time: '12 PM', engagement: 60 },
  { time: '3 PM', engagement: 75 },
  { time: '6 PM', engagement: 90 },
  { time: '9 PM', engagement: 50 },
  { time: '12 AM', engagement: 20 },
];

const EngagementInsights: React.FC<EngagementInsightsProps> = ({ platform }) => {
  // In a real app, you would filter or fetch data based on the platform
  console.log(`Showing engagement for platform: ${platform || 'all'}`);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Engagement Overview</CardTitle>
          <CardDescription>Detailed breakdown of your engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily">
            <TabsList className="mb-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily" className="space-y-4">
              <ChartContainer config={{}} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                    <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                    <Bar dataKey="shares" fill="#ffc658" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="weekly">
              <ChartContainer config={{}} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                    <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                    <Bar dataKey="shares" fill="#ffc658" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="monthly">
              <ChartContainer config={{}} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                    <Bar dataKey="comments" fill="#82ca9d" name="Comments" />
                    <Bar dataKey="shares" fill="#ffc658" name="Shares" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Follower Growth</CardTitle>
          <CardDescription>Track your audience growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="followers" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Best Posting Times</CardTitle>
          <CardDescription>Optimal times for engagement based on your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="engagement" fill="#82ca9d" name="Engagement Score" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementInsights;
