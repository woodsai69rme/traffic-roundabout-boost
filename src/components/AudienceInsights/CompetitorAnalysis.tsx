
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Sample data - in a real app, this would come from API
const competitorRadarData = [
  { subject: 'Engagement', A: 120, B: 110, C: 140, fullMark: 150 },
  { subject: 'Growth Rate', A: 98, B: 130, C: 100, fullMark: 150 },
  { subject: 'Post Frequency', A: 86, B: 130, C: 70, fullMark: 150 },
  { subject: 'Audience Size', A: 99, B: 100, C: 65, fullMark: 150 },
  { subject: 'Content Quality', A: 85, B: 90, C: 110, fullMark: 150 },
  { subject: 'Response Time', A: 65, B: 85, C: 120, fullMark: 150 },
];

const growthComparisonData = [
  { month: 'Jan', you: 4000, competitor1: 2400, competitor2: 3200 },
  { month: 'Feb', you: 4500, competitor1: 2700, competitor2: 3400 },
  { month: 'Mar', you: 5100, competitor1: 3100, competitor2: 3800 },
  { month: 'Apr', you: 5900, competitor1: 3500, competitor2: 4100 },
  { month: 'May', you: 6800, competitor1: 3800, competitor2: 4300 },
  { month: 'Jun', you: 7800, competitor1: 4000, competitor2: 4800 },
];

const competitorInsightsData = [
  {
    name: 'Competitor A',
    followers: '24.5K',
    engagement: '4.2%',
    postFrequency: '5.2/week',
    trending: true,
    topContent: 'Video tutorials'
  },
  {
    name: 'Competitor B',
    followers: '18.3K',
    engagement: '3.7%',
    postFrequency: '3.8/week',
    trending: false,
    topContent: 'Industry reports'
  },
  {
    name: 'Competitor C',
    followers: '31.2K',
    engagement: '2.9%',
    postFrequency: '7.1/week',
    trending: true,
    topContent: 'Customer testimonials'
  },
  {
    name: 'Your Account',
    followers: '22.7K',
    engagement: '3.8%',
    postFrequency: '4.5/week',
    trending: true,
    topContent: 'Product demos'
  },
];

const CompetitorAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Competitive Analysis</CardTitle>
            <CardDescription>
              Compare your performance against competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={competitorRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar
                    name="Your Brand"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Competitor 1"
                    dataKey="B"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Competitor 2"
                    dataKey="C"
                    stroke="#ffc658"
                    fill="#ffc658"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Follower Growth Comparison</CardTitle>
            <CardDescription>
              6-month follower growth trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="you"
                    name="Your Brand"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="competitor1"
                    name="Competitor 1"
                    stroke="#82ca9d"
                  />
                  <Line
                    type="monotone"
                    dataKey="competitor2"
                    name="Competitor 2"
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Competitor Insights</CardTitle>
          <CardDescription>
            Key metrics and content strategy analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Post Frequency</TableHead>
                <TableHead>Trending</TableHead>
                <TableHead>Top Content</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitorInsightsData.map((competitor, index) => (
                <TableRow key={index} className={competitor.name === 'Your Account' ? 'bg-muted/50' : ''}>
                  <TableCell className="font-medium">{competitor.name}</TableCell>
                  <TableCell>{competitor.followers}</TableCell>
                  <TableCell>{competitor.engagement}</TableCell>
                  <TableCell>{competitor.postFrequency}</TableCell>
                  <TableCell>
                    {competitor.trending ? (
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/20">
                        Trending Up
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        Stable
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{competitor.topContent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6 p-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Strategy Insights</h4>
            <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
              <li>Competitor A is gaining traction with video content - consider increasing video production</li>
              <li>Your engagement rate is above industry average, but posting frequency could be increased</li>
              <li>Competitor C has higher follower count but lower engagement - focus on quality over quantity</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompetitorAnalysis;
