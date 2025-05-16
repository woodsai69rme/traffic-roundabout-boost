
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import SchedulePostForm from './SchedulePostForm';
import PostsList from './PostsList';

// Define post interface
interface Post {
  id: string;
  date: Date;
  platform: string;
  content: string;
}

// Define the Day component props
type DayComponentProps = {
  date: Date;
  displayMonth?: Date;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const ContentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([
    { id: '1', date: new Date('2024-07-15'), platform: 'Twitter', content: 'Exciting news! Check out our latest blog post.' },
    { id: '2', date: new Date('2024-07-18'), platform: 'Instagram', content: 'Sneak peek behind the scenes. #behindthescenes' },
    { id: '3', date: new Date('2024-07-15'), platform: 'LinkedIn', content: 'New insights on industry trends. #leadership' },
  ]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const addScheduledPost = (newPost: { platform: string; content: string; scheduledDate: Date; media: string[] }) => {
    const post: Post = {
      id: Math.random().toString(36).substring(2, 9), // Generate a simple ID
      date: newPost.scheduledDate,
      platform: newPost.platform,
      content: newPost.content
    };
    
    setScheduledPosts([...scheduledPosts, post]);
    setOpen(false);
  };
  
  const getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => format(post.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
  };

  // Custom day renderer to highlight days with scheduled posts
  const renderDay = (props: DayComponentProps) => {
    const { date, displayMonth, onClick, className, children } = props;
    const hasPosts = getPostsForDate(date).length > 0;
    
    const handleClick = () => {
      onClick?.();
      handleDateSelect(date);
    };
    
    return (
      <div 
        className={className}
        onClick={handleClick}
      >
        {children}
        {hasPosts && (
          <div className="flex items-center justify-center w-full mt-1">
            <span className="text-xs text-blue-500">●</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Calendar</CardTitle>
        <CardDescription>Plan and schedule your social media content</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          className="rounded-md border"
          components={{
            Day: renderDay
          }}
        />
        {date ? (
          <p>
            Selected Date: {format(date, 'PPP')}
          </p>
        ) : (
          <p>Please select a date.</p>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              Schedule Post <Plus className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule a New Post</DialogTitle>
              <DialogDescription>
                Choose a platform and create your content.
              </DialogDescription>
            </DialogHeader>
            <SchedulePostForm onSubmit={addScheduledPost} />
            <DialogFooter>
              <Button type="submit">Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
      {date && (
        <CardContent>
          <PostsList posts={getPostsForDate(date)} />
        </CardContent>
      )}
    </Card>
  );
};

export default ContentCalendar;
