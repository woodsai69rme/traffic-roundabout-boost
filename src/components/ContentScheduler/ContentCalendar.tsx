
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { schedulePost } from '@/services/socialApiIntegrations';
import SchedulePostForm from './SchedulePostForm';
import PostsList from './PostsList';
import type { DayProps } from 'react-day-picker';

const ContentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([
    { 
      id: '1', 
      platform: 'twitter', 
      content: 'Check out our latest product update!', 
      date: new Date(new Date().setHours(14, 30, 0, 0)),
      media: []
    },
    { 
      id: '2', 
      platform: 'instagram', 
      content: 'Behind the scenes look at our team retreat', 
      date: new Date(new Date().setHours(16, 0, 0, 0)),
      media: ['/placeholder.svg']
    },
    { 
      id: '3', 
      platform: 'linkedin', 
      content: 'Excited to announce our new partnership with Acme Inc.', 
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      media: []
    },
  ]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handlePostClick = (post: any) => {
    console.log("Post clicked:", post);
    // Implement post click functionality
  };

  const handleSchedulePost = async (postData: any) => {
    try {
      const result = await schedulePost(
        postData.platform, 
        postData.content, 
        postData.media || [], 
        postData.scheduledDate
      );
      
      if (result) {
        setScheduledPosts([
          ...scheduledPosts, 
          {
            id: result.id,
            platform: postData.platform,
            content: postData.content,
            date: postData.scheduledDate,
            media: postData.media || []
          }
        ]);
      }
    } catch (error) {
      console.error("Failed to schedule post:", error);
    }
  };

  // Function to get posts scheduled for the selected date
  const getPostsForSelectedDate = () => {
    if (!date) return [];
    
    return scheduledPosts.filter(post => {
      const postDate = new Date(post.date);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Function to check if a date has posts
  const hasPostsOnDate = (day: Date) => {
    return scheduledPosts.some(post => {
      const postDate = new Date(post.date);
      return (
        postDate.getDate() === day.getDate() &&
        postDate.getMonth() === day.getMonth() &&
        postDate.getFullYear() === day.getFullYear()
      );
    });
  };

  // Get platforms with posts on the selected date
  const platformsWithPosts = [...new Set(getPostsForSelectedDate().map(post => post.platform))];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Content Calendar</CardTitle>
          <CardDescription>Schedule and manage your social media posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            components={{
              Day: (props: DayProps) => {
                const { date: dayDate, ...dayProps } = props;
                if (!dayDate) return null;
                
                return (
                  <div
                    className={cn(
                      dayProps.className,
                      hasPostsOnDate(dayDate) && 'relative'
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={dayProps.onClick}
                  >
                    {dayProps.children}
                    {hasPostsOnDate(dayDate) && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </div>
                );
              },
            }}
          />
          <div className="mt-4">
            <SchedulePostForm onSubmit={handleSchedulePost} />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {date ? format(date, 'EEEE, MMMM d') : 'No date selected'}
              </CardTitle>
              <CardDescription>
                {getPostsForSelectedDate().length} post{getPostsForSelectedDate().length !== 1 ? 's' : ''} scheduled
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {platformsWithPosts.map((platform) => (
                <Badge key={platform} variant="secondary" className="capitalize">{platform}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <PostsList posts={getPostsForSelectedDate()} />
            </TabsContent>
            <TabsContent value="timeline">
              <div className="space-y-6">
                {Array.from({ length: 24 }, (_, hour) => (
                  <div key={hour} className="flex items-start gap-4">
                    <div className="w-16 text-sm text-muted-foreground mt-1">
                      {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                    </div>
                    <div className="flex-1">
                      {getPostsForSelectedDate()
                        .filter(post => new Date(post.date).getHours() === hour)
                        .map(post => (
                          <div 
                            key={post.id}
                            className="p-3 mb-2 border rounded-md bg-muted/50"
                            onClick={() => handlePostClick(post)}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-2 h-2 rounded-full ${
                                post.platform === 'twitter' ? 'bg-blue-500' : 
                                post.platform === 'instagram' ? 'bg-purple-500' : 'bg-blue-500'
                              }`}></div>
                              <span className="text-xs uppercase font-medium">{post.platform}</span>
                              <span className="text-xs text-muted-foreground ml-auto">
                                {format(new Date(post.date), 'h:mm a')}
                              </span>
                            </div>
                            <p className="text-sm">{post.content}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCalendar;
