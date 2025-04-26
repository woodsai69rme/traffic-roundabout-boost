
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCard from '@/components/ContentCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const userContent = [
    {
      title: 'How I Grew My YouTube Channel to 10K Subscribers',
      thumbnail: '/placeholder.svg',
      creator: 'UserName',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 8400,
      likes: 720,
      date: '3 weeks ago',
    },
    {
      title: 'My Social Media Growth Strategy for 2025',
      thumbnail: '/placeholder.svg',
      creator: 'UserName',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 5200,
      likes: 430,
      date: '1 month ago',
    },
    {
      title: 'Content Creation Tips for Beginners',
      thumbnail: '/placeholder.svg',
      creator: 'UserName',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 3700,
      likes: 280,
      date: '2 months ago',
    },
  ];

  const connectedAccounts = [
    { platform: 'YouTube', username: '@yourusername', followers: 8500 },
    { platform: 'Instagram', username: '@yourhandle', followers: 4200 },
    { platform: 'TikTok', username: '@yourtiktok', followers: 12300 },
  ];

  const achievements = [
    { name: 'Early Adopter', description: 'Joined during the platform beta', date: 'Mar 2025' },
    { name: 'Engagement Pro', description: 'Completed 50 engagements', date: 'Apr 2025' },
    { name: 'Content Creator', description: 'Shared 10+ pieces of content', date: 'Apr 2025' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="mb-8 relative">
            <div className="h-48 rounded-lg overflow-hidden mb-16">
              <div className="w-full h-full bg-gradient-to-r from-roundabout-purple to-roundabout-blue"></div>
            </div>
            
            <div className="absolute left-8 bottom-0 transform translate-y-1/2 flex items-end">
              <div className="w-32 h-32 rounded-full border-4 border-background overflow-hidden bg-muted">
                <img src="/placeholder.svg" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 mb-4">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">@johndoe</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Content creator passionate about technology, productivity, and online growth. 
                    Joined Roundabout to connect with other creators and grow my audience.
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4"/><path d="m8 12h8"/></svg>
                      <span>Joined April 2025</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <span>Sydney, Australia</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-muted-foreground"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
                      <span>johnwebsite.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Connected Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {connectedAccounts.map((account, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                            <img src="/placeholder.svg" alt={account.platform} className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium">{account.platform}</p>
                            <p className="text-sm text-muted-foreground">{account.username}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{account.followers.toLocaleString()} followers</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Connect New Account
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-roundabout-light-purple text-roundabout-purple flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2l3 6.3 7 1-5 4.8 1.2 6.9-6.2-3.2Z"/></svg>
                        </div>
                        <div>
                          <p className="font-medium">{achievement.name}</p>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <p className="text-xs text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Content & Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content">
                    <TabsList className="mb-4">
                      <TabsTrigger value="content">Your Content</TabsTrigger>
                      <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                      <TabsTrigger value="stats">Statistics</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content">
                      <div className="mb-4">
                        <Input placeholder="Search your content..." />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userContent.map((content, index) => (
                          <ContentCard key={index} {...content} />
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button variant="outline">View More</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="activity">
                      <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex gap-3 border-b pb-4 last:border-0">
                            <div className="w-10 h-10 rounded-full bg-muted flex-shrink-0 overflow-hidden">
                              <img src="/placeholder.svg" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p>
                                You <span className="text-muted-foreground">engaged with</span> <span className="font-medium">Content Title {item}</span>
                              </p>
                              <p className="text-sm text-muted-foreground">{item} day{item > 1 ? 's' : ''} ago</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button variant="outline">View More</Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="stats">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">24,521</div>
                            <p className="text-xs text-green-500 flex items-center">
                              ↑ 12% <span className="text-muted-foreground ml-1">from last month</span>
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Engagements</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">1,245</div>
                            <p className="text-xs text-green-500 flex items-center">
                              ↑ 8% <span className="text-muted-foreground ml-1">from last month</span>
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">New Followers</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">384</div>
                            <p className="text-xs text-green-500 flex items-center">
                              ↑ 24% <span className="text-muted-foreground ml-1">from last month</span>
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Content Created</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">15</div>
                            <p className="text-xs text-amber-500 flex items-center">
                              ↓ 5% <span className="text-muted-foreground ml-1">from last month</span>
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
