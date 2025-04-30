import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { schedulePost } from '@/services/socialApiIntegrations';
import SchedulePostForm from './SchedulePostForm';
import PostsList from './PostsList';

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

  const customComponents: CustomComponents = {
    Day: (props) => {
      const dateStr = format(props.day, 'yyyy-MM-dd');
      const dayPosts = scheduledPosts.filter(post => {
        if (!post.scheduledTime) return false;
        return format(new Date(post.scheduledTime), 'yyyy-MM-dd') === dateStr;
      });
      
      return (
        <DayWithScheduledPosts 
          {...props}
          posts={dayPosts}
          onPostClick={handlePostClick}
        />
      );
    }
  };

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
              day: ({ day, ...props }) => (
                <div
                  {...props}
                  className={cn(
                    props.className,
                    hasPostsOnDate(day) && 'relative'
                  )}
                >
                  {props.children}
                  {hasPostsOnDate(day) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                </div>
              ),
            }}
          />
          <div className="mt-4">
            <SchedulePostForm onSchedule={handleSchedulePost} />
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {date ? new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric' 
                }) : 'No date selected'}
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
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-2 h-2 rounded-full bg-${post.platform === 'twitter' ? 'blue' : post.platform === 'instagram' ? 'purple' : 'blue'}-500`}></div>
                              <span className="text-xs uppercase font-medium">{post.platform}</span>
                              <span className="text-xs text-muted-foreground ml-auto">
                                {new Date(post.date).toLocaleTimeString('en-US', { 
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })}
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
