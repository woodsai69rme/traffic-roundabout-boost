
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface EngagementInsightsProps {
  platform?: string;
}

// Sample data - in a real app, this would come from API
const engagementData = [
  { name: 'Jan', likes: 4000, comments: 2400, shares: 1400 },
  { name: 'Feb', likes: 3000, comments: 1398, shares: 2210 },
  { name: 'Mar', likes: 2000, comments: 9800, shares: 2290 },
  { name: 'Apr', likes: 2780, comments: 3908, shares: 2000 },
  { name: 'May', likes: 1890, comments: 4800, shares: 2181 },
  { name: 'Jun', likes: 2390, comments: 3800, shares: 2500 },
  { name: 'Jul', likes: 3490, comments: 4300, shares: 2100 },
];

const contentTypeData = [
  { name: 'Photos', value: 40, fill: '#8884d8' },
  { name: 'Videos', value: 30, fill: '#83a6ed' },
  { name: 'Carousels', value: 20, fill: '#8dd1e1' },
  { name: 'Text', value: 10, fill: '#82ca9d' },
];

const bestTimeData = [
  { time: '9AM', engagement: 1200 },
  { time: '12PM', engagement: 1800 },
  { time: '3PM', engagement: 2400 },
  { time: '6PM', engagement: 3200 },
  { time: '9PM', engagement: 2600 },
  { time: '12AM', engagement: 1400 },
];

const contentPerformanceData = [
  { name: 'Product Demo', likes: 4300, comments: 1240, shares: 880 },
  { name: 'Tutorial', likes: 3200, comments: 1500, shares: 1100 },
  { name: 'Customer Story', likes: 2800, comments: 980, shares: 1700 },
  { name: 'Industry News', likes: 1900, comments: 870, shares: 450 },
  { name: 'Announcement', likes: 2400, comments: 780, shares: 690 },
];

const EngagementInsights: React.FC<EngagementInsightsProps> = ({ platform }) => {
  // In a real app, you would filter or fetch data based on the platform
  console.log(`Showing engagement insights for platform: ${platform || 'all'}`);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
            <CardDescription>Likes, comments, and shares over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="likes" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="comments" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Type Performance</CardTitle>
            <CardDescription>Engagement breakdown by content type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Times to Post</CardTitle>
            <CardDescription>When your audience is most engaged</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bestTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="engagement" fill="#8884d8" name="Engagement" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Categories</CardTitle>
            <CardDescription>Performance by content category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={contentPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Engagement Recommendations</CardTitle>
          <CardDescription>Actionable insights to improve your engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Post Timing</h3>
              <p className="text-sm text-muted-foreground">Your audience is most active between 3PM and 9PM. Schedule your most important content during these hours for maximum reach.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Content Format</h3>
              <p className="text-sm text-muted-foreground">Videos and carousels are generating 50% more engagement than static posts. Consider creating more video content to boost engagement.</p>
            </div>
            
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium mb-2">Audience Interaction</h3>
              <p className="text-sm text-muted-foreground">Posts that ask questions receive 3x more comments. Include questions in your captions to encourage audience interaction.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementInsights;
