
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { useDevice } from '@/hooks/use-mobile';
import DashboardSummary from '@/components/DashboardSummary';
import PlatformOverview from '@/components/PlatformOverview';
import EngagementStats from '@/components/EngagementStats';
import RecentActivity from '@/components/RecentActivity';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart as RechartsAreaChart,
  Area
} from 'recharts';

// Create wrapper components for charts
const LineChart = ({ data, height }) => (
  <ChartContainer config={{}} className="h-[300px]">
    <RechartsLineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </RechartsLineChart>
  </ChartContainer>
);

const BarChart = ({ data, height }) => (
  <ChartContainer config={{}} className="h-[300px]">
    <RechartsBarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </RechartsBarChart>
  </ChartContainer>
);

const AreaChart = ({ data, categories, height }) => (
  <ChartContainer config={{}} className="h-[300px]">
    <RechartsAreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {categories.map((category, index) => (
        <Area 
          key={category} 
          type="monotone" 
          dataKey={category} 
          stackId="1"
          stroke={index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ffc658"} 
          fill={index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ffc658"} 
        />
      ))}
    </RechartsAreaChart>
  </ChartContainer>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { isMobile } = useDevice();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-8">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {user?.fullName || user?.username || 'there'}</h1>
            <p className="text-muted-foreground">Here's an overview of your social media performance</p>
          </header>
          
          <DashboardSummary />
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Trend</CardTitle>
                    <CardDescription>Last 30 days follower growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LineChart
                      data={[
                        { name: 'Apr 1', value: 400 },
                        { name: 'Apr 8', value: 600 },
                        { name: 'Apr 15', value: 800 },
                        { name: 'Apr 22', value: 1200 },
                      ]}
                      height={isMobile ? 200 : 300}
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Rate</CardTitle>
                    <CardDescription>Platform comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BarChart
                      data={[
                        { name: 'Instagram', value: 5.2 },
                        { name: 'YouTube', value: 4.8 },
                        { name: 'TikTok', value: 7.5 },
                        { name: 'Twitter', value: 3.2 },
                      ]}
                      height={isMobile ? 200 : 300}
                    />
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2 lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Content Performance</CardTitle>
                    <CardDescription>Views by content type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AreaChart
                      data={[
                        { name: 'Apr 1', tutorials: 400, reviews: 240, vlogs: 320 },
                        { name: 'Apr 8', tutorials: 500, reviews: 380, vlogs: 410 },
                        { name: 'Apr 15', tutorials: 650, reviews: 420, vlogs: 510 },
                        { name: 'Apr 22', tutorials: 700, reviews: 550, vlogs: 590 },
                      ]}
                      categories={['tutorials', 'reviews', 'vlogs']}
                      height={isMobile ? 200 : 300}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <RecentActivity />
            </TabsContent>
            
            <TabsContent value="platforms">
              <PlatformOverview />
            </TabsContent>
            
            <TabsContent value="engagement">
              <EngagementStats />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
