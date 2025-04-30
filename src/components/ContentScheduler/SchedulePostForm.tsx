
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { platforms } from '@/services/platforms';
import { useToast } from '@/hooks/use-toast';

interface SchedulePostFormProps {
  onSchedule: (postData: any) => Promise<void>;
}

const SchedulePostForm = ({ onSchedule }: SchedulePostFormProps) => {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState('12:00');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!platform) {
      toast({
        title: "Platform required",
        description: "Please select a platform to post to",
        variant: "destructive"
      });
      return;
    }

    if (!content) {
      toast({
        title: "Content required",
        description: "Please enter content for your post",
        variant: "destructive"
      });
      return;
    }

    if (!scheduledDate) {
      toast({
        title: "Date required",
        description: "Please select a date for your post",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      // Combine date and time
      const [hours, minutes] = scheduledTime.split(':').map(Number);
      const dateTime = new Date(scheduledDate);
      dateTime.setHours(hours, minutes, 0, 0);
      
      await onSchedule({
        platform,
        content,
        scheduledDate: dateTime,
        media: []
      });
      
      toast({
        title: "Post scheduled",
        description: `Your post has been scheduled for ${format(dateTime, 'PPPp')}`
      });
      
      // Reset form
      setContent('');
      setPlatform('');
    } catch (error) {
      toast({
        title: "Failed to schedule post",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map(platform => (
              <SelectItem key={platform.id} value={platform.id}>
                <div className="flex items-center gap-2">
                  <img src={platform.icon} alt={platform.name} className="w-4 h-4" />
                  <span>{platform.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea 
          id="content"
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left">
                {scheduledDate ? format(scheduledDate, 'PP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={scheduledDate}
                onSelect={setScheduledDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <div className="flex">
            <Button variant="outline" size="icon" className="rounded-r-none">
              <Clock className="h-4 w-4" />
            </Button>
            <input
              id="time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="flex-1 rounded-l-none rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isLoading}
      >
        {isLoading ? "Scheduling..." : "Schedule Post"}
      </Button>
    </form>
  );
};

export default SchedulePostForm;
