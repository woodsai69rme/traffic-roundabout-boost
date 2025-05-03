import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export interface HashtagAnalyticsProps {
  platform?: string;
}

// Sample data - in a real app, this would come from API
const hashtagPerformanceData = [
  { hashtag: '#marketing', reach: 12500, engagement: 520 },
  { hashtag: '#socialmedia', reach: 9800, engagement: 450 },
  { hashtag: '#contentcreator', reach: 7600, engagement: 380 },
  { hashtag: '#business', reach: 5400, engagement: 290 },
  { hashtag: '#entrepreneur', reach: 4200, engagement: 240 },
];

const trendsData = [
  { hashtag: '#trending1', posts: 1250000, growth: '+125%' },
  { hashtag: '#trending2', posts: 980000, growth: '+86%' },
  { hashtag: '#trending3', posts: 760000, growth: '+62%' },
  { hashtag: '#trending4', posts: 540000, growth: '+45%' },
  { hashtag: '#trending5', posts: 420000, growth: '+32%' },
];

const recommendedHashtags = [
  { category: 'Industry Specific', hashtags: ['#marketing', '#digitalmarketing', '#contentcreation', '#branding'] },
  { category: 'Business General', hashtags: ['#business', '#entrepreneur', '#startup', '#smallbusiness'] },
  { category: 'Growth & Success', hashtags: ['#success', '#growth', '#motivation', '#goals'] },
  { category: 'Community', hashtags: ['#community', '#network', '#connections', '#collaboration'] },
];

const HashtagAnalytics: React.FC<HashtagAnalyticsProps> = ({ platform }) => {
  // In a real app, you would filter or fetch data based on the platform
  console.log(`Showing hashtag analytics for platform: ${platform || 'all'}`);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Hashtag Performance</CardTitle>
          <CardDescription>Impact of hashtags used in your content</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hashtagPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hashtag" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="reach" fill="#8884d8" name="Reach" />
                <Bar yAxisId="right" dataKey="engagement" fill="#82ca9d" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trending Hashtags</CardTitle>
          <CardDescription>Popular hashtags in your niche</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hashtag</TableHead>
                <TableHead>Posts</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trendsData.map((trend, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{trend.hashtag}</TableCell>
                  <TableCell>{trend.posts.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600">{trend.growth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Recommended Hashtags</CardTitle>
          <CardDescription>Suggested hashtags to improve your content reach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recommendedHashtags.map((category, index) => (
              <div key={index}>
                <h3 className="text-sm font-medium mb-2">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.hashtags.map((hashtag, hIndex) => (
                    <Badge key={hIndex} variant="secondary">{hashtag}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HashtagAnalytics;
