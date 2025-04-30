
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, ImageIcon, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import AIContentGenerator from './AIContentGenerator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { platforms } from '@/services/platforms';
import { schedulePost } from '@/services/socialApiIntegrations';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface SchedulePostFormProps {
  onSubmit?: (formData: any) => void;
  onCancel?: () => void;
}

const SchedulePostForm = ({ onSubmit, onCancel }: SchedulePostFormProps) => {
  const [content, setContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].id);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('12:00');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content) {
      toast({
        title: "Content required",
        description: "Please add content for your post",
        variant: "destructive"
      });
      return;
    }
    
    if (!date) {
      toast({
        title: "Schedule date required",
        description: "Please select a date for your post",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Combine date and time
      const dateTime = new Date(date);
      const [hours, minutes] = time.split(':').map(Number);
      dateTime.setHours(hours, minutes);
      
      const result = await schedulePost(
        selectedPlatform,
        content,
        mediaUrls,
        dateTime
      );
      
      toast({
        title: "Post scheduled",
        description: `Your post has been scheduled for ${format(dateTime, 'PPP')} at ${format(dateTime, 'p')}`
      });
      
      if (onSubmit) {
        onSubmit({
          platform: selectedPlatform,
          content,
          date: dateTime,
          mediaUrls
        });
      }
      
      // Reset form
      setContent('');
      setDate(undefined);
      setMediaUrls([]);
    } catch (error) {
      console.error("Failed to schedule post:", error);
      toast({
        title: "Failed to schedule post",
        description: "There was an error scheduling your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAIContent = (generatedContent: { text: string, mediaUrls?: string[] }) => {
    setContent(generatedContent.text);
    if (generatedContent.mediaUrls && generatedContent.mediaUrls.length > 0) {
      setMediaUrls(generatedContent.mediaUrls);
    }
  };

  // Dummy function to simulate file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Simulate file upload - in a real app this would upload to storage
    const newMediaUrls = [...mediaUrls];
    Array.from(files).forEach(() => {
      // Using placeholder image since we can't actually upload
      newMediaUrls.push('/placeholder.svg');
    });
    
    setMediaUrls(newMediaUrls);
    
    // Reset the input
    e.target.value = '';
  };
  
  const removeMedia = (index: number) => {
    const newMediaUrls = [...mediaUrls];
    newMediaUrls.splice(index, 1);
    setMediaUrls(newMediaUrls);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Schedule New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={useAI ? "ai" : "manual"} onValueChange={(value) => setUseAI(value === "ai")}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <form className="space-y-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map(platform => (
                      <SelectItem key={platform.id} value={platform.id}>
                        <div className="flex items-center">
                          <img 
                            src={platform.icon} 
                            alt={platform.name} 
                            className="w-4 h-4 mr-2" 
                          />
                          {platform.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="What's on your mind?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                />
              </div>
              
              <div>
                <Label htmlFor="media">Media</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mediaUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="relative group w-20 h-20 bg-muted rounded-md overflow-hidden"
                    >
                      <img 
                        src={url} 
                        className="w-full h-full object-cover" 
                        alt={`Media ${index + 1}`} 
                      />
                      <button
                        type="button"
                        className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity"
                        onClick={() => removeMedia(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <label 
                    className="w-20 h-20 border-2 border-dashed border-muted rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                  >
                    <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground mt-1">Add Media</span>
                    <Input
                      id="media"
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="ai">
            <AIContentGenerator onGeneratedContent={handleAIContent} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scheduling...
            </>
          ) : (
            "Schedule Post"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SchedulePostForm;
