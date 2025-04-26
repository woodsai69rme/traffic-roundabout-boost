
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useDevice } from '@/hooks/use-mobile';

const Communities = () => {
  const { isMobile } = useDevice();
  const [activeTab, setActiveTab] = useState('discussions');
  
  // Mock data for discussion forums
  const discussions = [
    {
      id: 1,
      title: 'How to increase YouTube engagement in 2025',
      author: 'GrowthExpert',
      authorAvatar: '/placeholder.svg',
      replies: 24,
      views: 342,
      lastActive: '2 hours ago',
      tags: ['youtube', 'engagement', 'growth'],
    },
    {
      id: 2,
      title: 'Instagram algorithm changes - April update',
      author: 'SocialMediaGuru',
      authorAvatar: '/placeholder.svg',
      replies: 37,
      views: 891,
      lastActive: '5 hours ago',
      tags: ['instagram', 'algorithm', 'updates'],
    },
    {
      id: 3,
      title: 'Best practices for cross-platform content',
      author: 'ContentCreator',
      authorAvatar: '/placeholder.svg',
      replies: 18,
      views: 276,
      lastActive: '1 day ago',
      tags: ['content', 'strategy', 'multi-platform'],
    },
  ];

  // Mock data for community groups
  const communityGroups = [
    {
      id: 1,
      name: 'YouTube Creators',
      members: 1245,
      description: 'A community for YouTube content creators to share tips and support each other.',
      icon: '/platforms/youtube.svg',
      topics: ['Video SEO', 'Thumbnails', 'Monetization'],
    },
    {
      id: 2,
      name: 'Instagram Growth Hackers',
      members: 876,
      description: 'Strategies and tactics for growing your Instagram followers and engagement.',
      icon: '/platforms/instagram.svg',
      topics: ['Reels', 'Hashtags', 'Engagement'],
    },
    {
      id: 3,
      name: 'TikTok Trends',
      members: 2134,
      description: 'Stay updated with the latest TikTok trends and growth strategies.',
      icon: '/platforms/tiktok.svg',
      topics: ['Viral Content', 'Sound Selection', 'For You Page'],
    },
    {
      id: 4,
      name: 'Twitch Streamers',
      members: 658,
      description: 'Connect with other Twitch streamers to collaborate and share advice.',
      icon: '/platforms/twitch.svg',
      topics: ['Stream Setup', 'Audience Growth', 'Monetization'],
    }
  ];

  // Mock data for events
  const events = [
    {
      id: 1,
      title: 'Creator Summit 2025',
      date: 'June 15-17, 2025',
      location: 'Virtual Event',
      description: 'Annual summit for content creators across all platforms to network and learn.',
      attendees: 532,
    },
    {
      id: 2,
      title: 'Instagram Growth Workshop',
      date: 'May 20, 2025',
      location: 'Online',
      description: 'Learn advanced tactics for Instagram growth from industry experts.',
      attendees: 248,
    },
    {
      id: 3,
      title: 'YouTube Monetization Masterclass',
      date: 'July 10, 2025',
      location: 'Online',
      description: 'Deep dive into YouTube monetization strategies beyond AdSense.',
      attendees: 376,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-muted/20 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Communities</h1>
            <p className="text-muted-foreground">
              Connect with other creators, share knowledge, and grow together.
            </p>
          </div>

          <div className={`grid grid-cols-1 ${!isMobile ? 'lg:grid-cols-4 gap-8' : ''}`}>
            {!isMobile && (
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Discover</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button 
                        variant={activeTab === 'discussions' ? 'default' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('discussions')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                        Discussions
                      </Button>
                      <Button 
                        variant={activeTab === 'groups' ? 'default' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('groups')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Groups
                      </Button>
                      <Button 
                        variant={activeTab === 'events' ? 'default' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('events')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        Events
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>My Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Posts</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Replies</span>
                        <span className="font-medium">157</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Groups</span>
                        <span className="font-medium">5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Events Attended</span>
                        <span className="font-medium">8</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className={`${isMobile ? '' : 'lg:col-span-3'}`}>
              {isMobile && (
                <Tabs defaultValue="discussions" className="mb-6">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                    <TabsTrigger value="groups">Groups</TabsTrigger>
                    <TabsTrigger value="events">Events</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="discussions">
                    {/* Mobile discussions content */}
                    <DiscussionsTabContent discussions={discussions} />
                  </TabsContent>
                  
                  <TabsContent value="groups">
                    {/* Mobile groups content */}
                    <GroupsTabContent groups={communityGroups} />
                  </TabsContent>
                  
                  <TabsContent value="events">
                    {/* Mobile events content */}
                    <EventsTabContent events={events} />
                  </TabsContent>
                </Tabs>
              )}

              {!isMobile && (
                <>
                  {activeTab === 'discussions' && (
                    <DiscussionsTabContent discussions={discussions} />
                  )}
                  {activeTab === 'groups' && (
                    <GroupsTabContent groups={communityGroups} />
                  )}
                  {activeTab === 'events' && (
                    <EventsTabContent events={events} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Tab content components
const DiscussionsTabContent = ({ discussions }) => (
  <>
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Discussions</CardTitle>
          <Button>New Thread</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Input className="mb-4" placeholder="Search discussions..." />
        
        <div className="space-y-4">
          {discussions.map(discussion => (
            <Card key={discussion.id} className="card-hover">
              <CardHeader className="py-3">
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-lg">{discussion.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={discussion.authorAvatar} />
                        <AvatarFallback>{discussion.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{discussion.author}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="font-medium">{discussion.replies}</span> replies
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Last active {discussion.lastActive}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="pt-0 pb-3">
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
    
    <div className="text-center">
      <Button variant="outline">View More Discussions</Button>
    </div>
  </>
);

const GroupsTabContent = ({ groups }) => (
  <>
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Community Groups</CardTitle>
          <Button>Create Group</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Input className="mb-4" placeholder="Search groups..." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map(group => (
            <Card key={group.id} className="card-hover">
              <CardHeader className="py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <img src={group.icon} alt={group.name} className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {group.members} members
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{group.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {group.topics.map(topic => (
                    <Badge key={topic} variant="outline">{topic}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Join Group</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
    
    <div className="text-center">
      <Button variant="outline">View All Groups</Button>
    </div>
  </>
);

const EventsTabContent = ({ events }) => (
  <>
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Upcoming Events</CardTitle>
          <Button>Create Event</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Input className="mb-4" placeholder="Search events..." />
        
        <div className="space-y-4">
          {events.map(event => (
            <Card key={event.id} className="card-hover">
              <CardHeader className="py-3">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <Badge>{event.attendees} attending</Badge>
                </div>
                <CardDescription>{event.date} • {event.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{event.description}</p>
              </CardContent>
              <CardFooter>
                <div className="flex gap-3 w-full">
                  <Button className="flex-1">RSVP</Button>
                  <Button variant="outline" className="flex-1">Details</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
    
    <div className="text-center">
      <Button variant="outline">View All Events</Button>
    </div>
  </>
);

export default Communities;
