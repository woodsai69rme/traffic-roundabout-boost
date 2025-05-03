
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';

export interface SchedulePostFormProps {
  onSubmit: (postData: {
    platform: string;
    content: string;
    media: string[];
    scheduledDate: Date;
  }) => void;
}

const SchedulePostForm: React.FC<SchedulePostFormProps> = ({ onSubmit }) => {
  const [platform, setPlatform] = useState('');
  const [content, setContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [media, setMedia] = useState<string[]>([]);
  const [time, setTime] = useState('12:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!platform || !content || !scheduledDate) {
      console.error('Missing required fields');
      return;
    }
    
    // Parse time and set it on the scheduled date
    const [hours, minutes] = time.split(':').map(Number);
    const dateWithTime = new Date(scheduledDate);
    dateWithTime.setHours(hours, minutes);
    
    onSubmit({
      platform,
      content,
      media,
      scheduledDate: dateWithTime
    });
    
    // Reset form
    setPlatform('');
    setContent('');
    setScheduledDate(undefined);
    setMedia([]);
    setTime('12:00');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Textarea 
          placeholder="What do you want to post?" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="resize-none"
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !scheduledDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {scheduledDate ? format(scheduledDate, "PPP") : <span>Pick a date</span>}
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
        
        <div>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>
      
      <Button type="submit" disabled={!platform || !content || !scheduledDate}>
        Schedule Post
      </Button>
    </form>
  );
};

export default SchedulePostForm;
