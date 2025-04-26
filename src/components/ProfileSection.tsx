
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDevice } from '@/hooks/use-mobile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProfileSectionProps {
  userId: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ userId }) => {
  const { isMobile } = useDevice();
  
  // Mock user data
  const userData = {
    name: "John Doe",
    username: "johndoe",
    avatar: "/placeholder.svg",
    bio: "Content creator passionate about technology, productivity, and online growth.",
    joinedDate: "April 2025",
    location: "Sydney, Australia",
    website: "johnwebsite.com"
  };
  
  // Mock statistics
  const userStats = {
    subscribers: 24800,
    views: 1240000,
    engagementRate: 8.6,
    contentCount: 87
  };
  
  // Mock platforms
  const connectedPlatforms = [
    { platform: 'YouTube', username: '@yourusername', followers: 8500, icon: '/platforms/youtube.svg' },
    { platform: 'Instagram', username: '@yourhandle', followers: 4200, icon: '/platforms/instagram.svg' },
    { platform: 'TikTok', username: '@yourtiktok', followers: 12300, icon: '/platforms/tiktok.svg' },
    { platform: 'Twitter', username: '@yourtwitter', followers: 6700, icon: '/platforms/twitter.svg' }
  ];
  
  // Mock growth data
  const growthData = [
    { platform: 'YouTube', yesterday: '+124', weeklyAvg: '+98', monthlyAvg: '+105' },
    { platform: 'Instagram', yesterday: '+56', weeklyAvg: '+43', monthlyAvg: '+48' },
    { platform: 'TikTok', yesterday: '+210', weeklyAvg: '+185', monthlyAvg: '+195' },
    { platform: 'Twitter', yesterday: '+31', weeklyAvg: '+28', monthlyAvg: '+32' }
  ];

  return (
    <section className="py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Profile Overview</h2>
          <p className="text-muted-foreground">
            Track your growth, manage connections, and optimize your presence across platforms.
          </p>
        </div>
        
        <div className={`grid grid-cols-1 ${!isMobile ? 'lg:grid-cols-4 gap-8' : 'gap-6'}`}>
          {/* Left Sidebar */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center pb-2">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name[0]}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-2">{userData.name}</CardTitle>
                  <CardDescription>@{userData.username}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{userData.bio}</p>
                  
                  <div className="text-sm">
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4"/><path d="m8 12h8"/></svg>
                      <span>Joined {userData.joinedDate}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span>{userData.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
                      <span>{userData.website}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link to="/profile" className="w-full flex justify-center">
                      View Full Profile
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {/* Main Content */}
          <div className={`${isMobile ? '' : 'lg:col-span-3'}`}>
            {/* Key stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userStats.subscribers.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    ↑ 12% <span className="text-muted-foreground ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userStats.views.toLocaleString()}
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    ↑ 24% <span className="text-muted-foreground ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userStats.engagementRate}%
                  </div>
                  <p className="text-xs text-green-500 flex items-center">
                    ↑ 5% <span className="text-muted-foreground ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Content Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userStats.contentCount}
                  </div>
                  <p className="text-xs text-amber-500 flex items-center">
                    ↓ 5% <span className="text-muted-foreground ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          
            {/* Platforms and Growth */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Connected Platforms */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Connected Platforms</CardTitle>
                    <Button variant="outline" size="sm">
                      <Link to="/platforms">Manage</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {connectedPlatforms.map((platform, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                            <img src={platform.icon} alt={platform.platform} className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium">{platform.platform}</p>
                            <p className="text-sm text-muted-foreground">{platform.username}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {platform.followers.toLocaleString()} followers
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link to="/platforms" className="w-full flex justify-center">
                      Connect New Account
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Daily Growth */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Growth Metrics</CardTitle>
                    <Button variant="outline" size="sm">
                      <Link to="/analytics">View Analytics</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={isMobile ? "overflow-auto" : ""}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Platform</TableHead>
                          <TableHead className="text-right">Yesterday</TableHead>
                          <TableHead className="text-right">Weekly Avg</TableHead>
                          <TableHead className="text-right">Monthly Avg</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {growthData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{row.platform}</TableCell>
                            <TableCell className="text-right text-green-500">{row.yesterday}</TableCell>
                            <TableCell className="text-right text-green-500">{row.weeklyAvg}</TableCell>
                            <TableCell className="text-right text-green-500">{row.monthlyAvg}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="outline" size="sm">
                    <Link to="/analytics">Detailed Analytics</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="card-hover">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto p-2 rounded-lg bg-roundabout-light-purple text-roundabout-purple">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </div>
                  <CardTitle className="mt-4">Analytics</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Track performance and growth metrics.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link to="/analytics" className="w-full flex justify-center">
                      View Analytics
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto p-2 rounded-lg bg-roundabout-light-blue text-roundabout-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <CardTitle className="mt-4">Communities</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Connect with other creators.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link to="/communities" className="w-full flex justify-center">
                      Join Communities
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto p-2 rounded-lg bg-roundabout-green text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <CardTitle className="mt-4">Monetization</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Explore revenue opportunities.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link to="/monetization" className="w-full flex justify-center">
                      Start Earning
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto p-2 rounded-lg bg-roundabout-yellow text-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                  </div>
                  <CardTitle className="mt-4">Create Content</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">Share new content across platforms.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Link to="/dashboard" className="w-full flex justify-center">
                      Create Now
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
