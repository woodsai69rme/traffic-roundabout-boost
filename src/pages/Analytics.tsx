import React, { useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { useDevice } from '@/hooks/use-mobile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Analytics = () => {
  const { isMobile } = useDevice();
  const [timeRange, setTimeRange] = useState('30d');
  const [platform, setPlatform] = useState('all');
  
  // Mock growth data
  const growthData = [
    { name: 'Jan', subscribers: 120, views: 1400, engagement: 340 },
    { name: 'Feb', subscribers: 180, views: 2300, engagement: 450 },
    { name: 'Mar', subscribers: 250, views: 3200, engagement: 520 },
    { name: 'Apr', subscribers: 310, views: 4100, engagement: 640 },
    { name: 'May', subscribers: 410, views: 4800, engagement: 720 },
    { name: 'Jun', subscribers: 520, views: 5700, engagement: 850 }
  ];

  // Mock platform data
  const platformData = [
    { name: 'YouTube', value: 45, color: '#FF0000' },
    { name: 'Instagram', value: 25, color: '#C13584' },
    { name: 'TikTok', value: 15, color: '#000000' },
    { name: 'Twitter', value: 10, color: '#1DA1F2' },
    { name: 'Facebook', value: 5, color: '#4267B2' }
  ];

  // Mock content performance
  const contentPerformance = [
    { id: 1, title: 'How to Grow on YouTube in 2025', platform: 'YouTube', views: 12840, engagement: 1560, conversion: 3.2 },
    { id: 2, title: 'Instagram Reels Strategy', platform: 'Instagram', views: 8420, engagement: 980, conversion: 2.8 },
    { id: 3, title: 'TikTok Viral Hack', platform: 'TikTok', views: 25640, engagement: 3200, conversion: 4.5 },
    { id: 4, title: 'Content Creation Tips', platform: 'YouTube', views: 6320, engagement: 840, conversion: 2.1 },
    { id: 5, title: 'Social Media Growth Tactics', platform: 'Twitter', views: 4280, engagement: 520, conversion: 1.8 }
  ];

  // Mock audience demographics
  const audienceDemographics = {
    age: [
      { name: '18-24', value: 30 },
      { name: '25-34', value: 40 },
      { name: '35-44', value: 15 },
      { name: '45-54', value: 10 },
      { name: '55+', value: 5 }
    ],
    gender: [
      { name: 'Male', value: 65 },
      { name: 'Female', value: 32 },
      { name: 'Other', value: 3 }
    ],
    countries: [
      { name: 'United States', value: 40 },
      { name: 'United Kingdom', value: 15 },
      { name: 'Australia', value: 12 },
      { name: 'Canada', value: 10 },
      { name: 'Germany', value: 8 },
      { name: 'Others', value: 15 }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
              <p className="text-muted-foreground">Track your growth and performance across all platforms.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue={platform} onValueChange={setPlatform}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Subscribers" 
              value="24.8K" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} 
              trend="+12%"
            />
            <StatCard 
              title="Total Views" 
              value="1.2M" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>} 
              trend="+24%"
            />
            <StatCard 
              title="Engagement Rate" 
              value="8.6%" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>} 
              trend="+5%"
            />
            <StatCard 
              title="Est. Revenue" 
              value="$2,450" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} 
              trend="+18%"
            />
          </div>
          
          {/* Growth charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Your audience growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="subscribers" stroke="#9b87f5" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="views" stroke="#0EA5E9" />
                      <Line type="monotone" dataKey="engagement" stroke="#22c55e" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Where your audience engages with you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Content performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>How your content is performing across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={isMobile ? "overflow-auto" : ""}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Platform</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Engagement</TableHead>
                      <TableHead className="text-right">Conversion %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contentPerformance.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell className="font-medium">{content.title}</TableCell>
                        <TableCell>{content.platform}</TableCell>
                        <TableCell className="text-right">{content.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{content.engagement.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{content.conversion}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          {/* Audience insights */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Understand who engages with your content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="age">
                <TabsList>
                  <TabsTrigger value="age">Age</TabsTrigger>
                  <TabsTrigger value="gender">Gender</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="age" className="pt-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={audienceDemographics.age}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name="Percentage" fill="#9b87f5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="gender" className="pt-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={audienceDemographics.gender}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          <Cell fill="#9b87f5" />
                          <Cell fill="#0EA5E9" />
                          <Cell fill="#64748B" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="location" className="pt-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={audienceDemographics.countries} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={100} />
                        <Tooltip />
                        <Bar dataKey="value" name="Percentage" fill="#0EA5E9" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
