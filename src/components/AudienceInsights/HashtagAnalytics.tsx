
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface HashtagAnalyticsProps {
  platform?: string;
}

// Sample data - in a real app, this would come from API
const hashtagPerformanceData = [
  { name: '#marketing', reach: 8500, engagement: 720, posts: 24 },
  { name: '#socialmedia', reach: 12400, engagement: 980, posts: 32 },
  { name: '#digitalmarketing', reach: 7800, engagement: 620, posts: 18 },
  { name: '#contentcreator', reach: 9600, engagement: 840, posts: 28 },
  { name: '#analytics', reach: 6200, engagement: 480, posts: 15 },
];

const trendingHashtagsData = [
  { hashtag: '#reels', volume: 12500, growth: '+15%', category: 'Content Format' },
  { hashtag: '#socialtips', volume: 8700, growth: '+23%', category: 'Education' },
  { hashtag: '#creator', volume: 15300, growth: '+8%', category: 'Identity' },
  { hashtag: '#algorithm', volume: 6200, growth: '+32%', category: 'Technical' },
  { hashtag: '#contentcalendar', volume: 4800, growth: '+19%', category: 'Strategy' },
];

const HashtagAnalytics: React.FC<HashtagAnalyticsProps> = ({ platform }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  // In a real app, you would filter or fetch data based on the platform
  console.log(`Showing hashtag analytics for platform: ${platform || 'all'}`);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Hashtag Analytics</CardTitle>
              <CardDescription>
                Performance analysis of your most used hashtags
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Search hashtags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-[250px]"
              />
              <Button variant="secondary">Search</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hashtagPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="reach" name="Reach" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="engagement" name="Engagement" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <div className="mt-6">
            <h4 className="font-medium text-sm mb-3">Recommended Hashtags</h4>
            <div className="flex flex-wrap gap-2">
              {['#socialmediastrategy', '#contentcreation', '#digitalmarketer', '#growthhacking', '#brandawareness', '#socialmediamarketing', '#influencermarketing', '#analytics']
                .map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Trending Hashtags</CardTitle>
          <CardDescription>
            Popular and growing hashtags in your industry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Hashtag</th>
                  <th className="text-left py-3 font-medium">Volume</th>
                  <th className="text-left py-3 font-medium">Growth</th>
                  <th className="text-left py-3 font-medium">Category</th>
                  <th className="text-right py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {trendingHashtagsData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{item.hashtag}</td>
                    <td className="py-3">{item.volume.toLocaleString()} posts</td>
                    <td className="py-3 text-green-500">{item.growth}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="font-normal">
                        {item.category}
                      </Badge>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm">Add to List</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Hashtag Strategy Tips</h4>
            <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>Mix popular hashtags with niche ones for better reach</li>
              <li>Keep hashtags relevant to your content</li>
              <li>Use trending hashtags within 24-48 hours of them gaining popularity</li>
              <li>Create branded hashtags for campaigns</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HashtagAnalytics;
