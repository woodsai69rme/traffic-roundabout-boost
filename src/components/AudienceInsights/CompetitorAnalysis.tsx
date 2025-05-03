
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CompetitorAnalysisProps {
  platform?: string;
}

// Sample data - in a real app, this would come from API
const growthComparisonData = [
  { name: 'Jan', you: 2100, competitor1: 2400, competitor2: 1900 },
  { name: 'Feb', you: 2300, competitor1: 2500, competitor2: 2000 },
  { name: 'Mar', you: 2600, competitor1: 2600, competitor2: 2200 },
  { name: 'Apr', you: 2900, competitor1: 2750, competitor2: 2400 },
  { name: 'May', you: 3200, competitor1: 2900, competitor2: 2600 },
  { name: 'Jun', you: 3800, competitor1: 3100, competitor2: 2900 },
  { name: 'Jul', you: 4200, competitor1: 3300, competitor2: 3200 },
];

const engagementComparisonData = [
  { metric: 'Engagement Rate', you: 4.2, competitor1: 3.8, competitor2: 4.5 },
  { metric: 'Likes per Post', you: 320, competitor1: 280, competitor2: 350 },
  { metric: 'Comments per Post', you: 45, competitor1: 32, competitor2: 50 },
  { metric: 'Shares per Post', you: 28, competitor1: 22, competitor2: 30 },
  { metric: 'Saves per Post', you: 65, competitor1: 55, competitor2: 70 },
];

const competitorProfiles = [
  { name: 'Competitor 1', followers: '125K', posts: 458, engagementRate: '3.8%', contentTypes: 'Photos, Videos, Stories' },
  { name: 'Competitor 2', followers: '95K', posts: 623, engagementRate: '4.5%', contentTypes: 'Live Streams, Photos, Reels' },
  { name: 'Competitor 3', followers: '210K', posts: 312, engagementRate: '3.2%', contentTypes: 'Videos, Carousels' },
  { name: 'Competitor 4', followers: '78K', posts: 520, engagementRate: '4.1%', contentTypes: 'Photos, Stories, Guides' },
];

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ platform }) => {
  // In a real app, you would filter or fetch data based on the platform
  console.log(`Showing competitor analysis for platform: ${platform || 'all'}`);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Follower Growth Comparison</CardTitle>
          <CardDescription>How your follower growth compares with competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="you" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} name="Your Account" />
                <Line type="monotone" dataKey="competitor1" stroke="#82ca9d" activeDot={{ r: 6 }} name="Competitor 1" />
                <Line type="monotone" dataKey="competitor2" stroke="#ffc658" activeDot={{ r: 6 }} name="Competitor 2" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Engagement Metrics Comparison</CardTitle>
          <CardDescription>How your engagement metrics compare with competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="you" fill="#8884d8" name="Your Account" />
                <Bar dataKey="competitor1" fill="#82ca9d" name="Competitor 1" />
                <Bar dataKey="competitor2" fill="#ffc658" name="Competitor 2" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competitor Profiles</CardTitle>
          <CardDescription>Key metrics of your main competitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Followers</TableHead>
                  <TableHead>Eng. Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {competitorProfiles.map((competitor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{competitor.name}</TableCell>
                    <TableCell>{competitor.followers}</TableCell>
                    <TableCell>{competitor.engagementRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalysis;
