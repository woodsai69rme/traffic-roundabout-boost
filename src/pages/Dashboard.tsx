
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import ContentCard from '@/components/ContentCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const analyticsData = [
    { name: 'Jan', views: 4000, engagement: 2400, followers: 100 },
    { name: 'Feb', views: 3000, engagement: 1398, followers: 150 },
    { name: 'Mar', views: 2000, engagement: 9800, followers: 220 },
    { name: 'Apr', views: 2780, engagement: 3908, followers: 290 },
    { name: 'May', views: 1890, engagement: 4800, followers: 350 },
    { name: 'Jun', views: 2390, engagement: 3800, followers: 420 },
    { name: 'Jul', views: 3490, engagement: 4300, followers: 510 },
  ];

  const pendingEngagements = [
    {
      title: 'How to Make Perfect Pancakes',
      thumbnail: '/placeholder.svg',
      creator: 'CookingPro',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 12300,
      likes: 820,
      date: '1 day ago',
    },
    {
      title: 'Summer Fashion Trends 2025',
      thumbnail: '/placeholder.svg',
      creator: 'FashionGuide',
      creatorAvatar: '/placeholder.svg',
      platform: 'Instagram',
      platformLogo: '/placeholder.svg',
      views: 5700,
      likes: 450,
      date: '3 days ago',
    },
  ];

  const yourContent = [
    {
      title: 'My Journey as a Content Creator',
      thumbnail: '/placeholder.svg',
      creator: 'You',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 2300,
      likes: 180,
      date: '1 week ago',
    },
    {
      title: 'Behind the Scenes: Creating Quality Content',
      thumbnail: '/placeholder.svg',
      creator: 'You',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 1700,
      likes: 120,
      date: '2 weeks ago',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
            </div>
            <Button className="bg-gradient-to-r from-roundabout-purple to-roundabout-blue text-white">
              Add New Content
            </Button>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Views" 
              value="24.5K" 
              change={12} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>} 
              color="bg-roundabout-purple/20 text-roundabout-purple" 
            />
            <StatCard 
              title="Engagements" 
              value="1.2K" 
              change={8} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>} 
              color="bg-roundabout-blue/20 text-roundabout-blue" 
            />
            <StatCard 
              title="New Followers" 
              value="384" 
              change={24} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} 
              color="bg-green-500/20 text-green-500" 
            />
            <StatCard 
              title="Pending Tasks" 
              value="8" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-checks"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>} 
              color="bg-amber-500/20 text-amber-500" 
            />
          </div>
          
          {/* Analytics */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Growth Analytics</CardTitle>
              <CardDescription>Track your social media growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="views">
                <TabsList className="mb-4">
                  <TabsTrigger value="views">Views</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="followers">Followers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="views" className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="views" stroke="#9b87f5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="engagement" className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="engagement" stroke="#0EA5E9" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="followers" className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="followers" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Engagements */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Engagements</CardTitle>
                <CardDescription>Content you need to engage with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingEngagements.map((content, index) => (
                    <div key={index} className="flex gap-4 border-b pb-4 last:border-0">
                      <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
                        <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{content.title}</h4>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{content.creator}</span>
                          <span className="mx-2">•</span>
                          <span>{content.platform}</span>
                          <span className="mx-2">•</span>
                          <span>{content.date}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="flex-shrink-0 h-8">
                        Engage
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4">
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
            
            {/* Your Content */}
            <Card>
              <CardHeader>
                <CardTitle>Your Content</CardTitle>
                <CardDescription>Recent content you've shared</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {yourContent.map((content, index) => (
                    <div key={index} className="flex gap-4 border-b pb-4 last:border-0">
                      <div className="w-24 h-16 rounded overflow-hidden flex-shrink-0">
                        <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{content.title}</h4>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            {content.platform} • {content.date}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {content.views} views • {content.likes} likes
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="w-full mt-4">
                  View All Content
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
