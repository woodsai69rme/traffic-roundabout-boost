
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface SchedulePostFormProps {
  onSubmit: (postData: any) => Promise<void>;
}

const SchedulePostForm: React.FC<SchedulePostFormProps> = ({ onSubmit }) => {
  const [platform, setPlatform] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(undefined);
  const [scheduledTime, setScheduledTime] = useState<string>('12:00');
  const [media, setMedia] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleMediaAdd = () => {
    // In a real app, this would open a file picker
    // For demo purposes, we'll just add a placeholder
    setMedia([...media, '/placeholder.svg']);
  };

  const handleMediaRemove = (index: number) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform || !content || !scheduledDate) return;

    const [hours, minutes] = scheduledTime.split(':').map(Number);
    const dateWithTime = new Date(scheduledDate);
    dateWithTime.setHours(hours, minutes);

    setIsSubmitting(true);
    try {
      await onSubmit({
        platform,
        content,
        scheduledDate: dateWithTime,
        media
      });
      // Reset form
      setPlatform('');
      setContent('');
      setScheduledDate(undefined);
      setScheduledTime('12:00');
      setMedia([]);
    } catch (error) {
      console.error("Error scheduling post:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          placeholder="Write your post content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex space-x-2">
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

        <Select value={scheduledTime} onValueChange={setScheduledTime}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, hour) => (
              <React.Fragment key={hour}>
                <SelectItem value={`${hour}:00`}>
                  {hour === 0 ? '12:00 AM' : 
                   hour < 12 ? `${hour}:00 AM` : 
                   hour === 12 ? '12:00 PM' : 
                   `${hour - 12}:00 PM`}
                </SelectItem>
                <SelectItem value={`${hour}:30`}>
                  {hour === 0 ? '12:30 AM' : 
                   hour < 12 ? `${hour}:30 AM` : 
                   hour === 12 ? '12:30 PM' : 
                   `${hour - 12}:30 PM`}
                </SelectItem>
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {media.map((src, index) => (
            <div key={index} className="relative w-16 h-16 rounded border overflow-hidden">
              <img src={src} alt="Media preview" className="w-full h-full object-cover" />
              <button
                type="button"
                className="absolute top-0 right-0 bg-black bg-opacity-50 p-0.5 rounded-bl"
                onClick={() => handleMediaRemove(index)}
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={handleMediaAdd}>
          <Upload className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </div>

      <Button type="submit" className="w-full" disabled={!platform || !content || !scheduledDate || isSubmitting}>
        {isSubmitting ? 'Scheduling...' : 'Schedule Post'}
      </Button>
    </form>
  );
};

export default SchedulePostForm;
