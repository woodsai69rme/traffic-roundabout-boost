
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, RefreshCw, Loader2, Image, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIContentGeneratorProps {
  onGeneratedContent?: (content: { text: string, mediaUrls?: string[] }) => void;
}

const AIContentGenerator = ({ onGeneratedContent }: AIContentGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('caption');
  const [platformType, setPlatformType] = useState('instagram');
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const { toast } = useToast();

  const contentTypes = [
    { value: 'caption', label: 'Caption' },
    { value: 'hashtags', label: 'Hashtags' },
    { value: 'idea', label: 'Content Idea' },
    { value: 'story', label: 'Story' },
  ];

  const platformTypes = [
    { value: 'instagram', label: 'Instagram' },
    { value: 'twitter', label: 'Twitter/X' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'linkedin', label: 'LinkedIn' },
  ];

  const handleGenerate = () => {
    if (!prompt) {
      toast({
        title: "Input required",
        description: "Please provide a prompt for content generation.",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    setGeneratedText('');
    
    // Simulate AI content generation
    setTimeout(() => {
      let result = '';
      
      switch (contentType) {
        case 'caption':
          if (platformType === 'instagram') {
            result = "✨ Exploring new horizons and embracing the journey! Every step forward is a chance to discover something amazing. What adventures are you embarking on this week? #ExploreMore #JourneyOfDiscovery";
          } else if (platformType === 'twitter') {
            result = "Taking the leap into new possibilities! Sometimes the biggest growth comes from stepping outside your comfort zone. What's your next big move?";
          } else {
            result = "Embracing change and discovering new opportunities along the way. The path forward isn't always clear, but that's where the most exciting discoveries happen!";
          }
          break;
        case 'hashtags':
          result = "#ContentCreator #DigitalMarketing #SocialMediaTips #GrowthStrategy #EngagementBoost #CreativeContent #BrandPresence #TrendingNow #SocialMediaManager #OnlinePresence";
          break;
        case 'idea':
          result = "Behind-the-scenes video showing your workflow process from start to finish. This humanizes your brand and gives followers insight into how you create the content they love.";
          break;
        case 'story':
          result = "Start with a question sticker asking your audience about their biggest challenge related to your niche. Follow up with 3-4 slides offering quick tips or solutions addressing those pain points. End with a CTA to your latest content or product that provides more comprehensive help.";
          break;
      }
      
      setGeneratedText(result);
      setGenerating(false);
    }, 2000);
  };

  const handleUseContent = () => {
    if (generatedText && onGeneratedContent) {
      onGeneratedContent({ text: generatedText });
      toast({
        title: "Content applied",
        description: "The AI generated content has been applied to your post."
      });
    }
  };

  const handleCopyContent = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast({
        title: "Copied to clipboard",
        description: "The generated content has been copied to your clipboard."
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          AI Content Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-[calc(50%-0.5rem)]">
            <Label htmlFor="contentType">Content Type</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-[calc(50%-0.5rem)]">
            <Label htmlFor="platformType">Platform</Label>
            <Select value={platformType} onValueChange={setPlatformType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platformTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea 
            id="prompt"
            placeholder="Enter a prompt for the AI (e.g., 'Write a caption about digital marketing tips')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>Generated Content</Label>
            {generatedText && (
              <Button size="sm" variant="ghost" onClick={handleCopyContent} className="h-8 px-2">
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy
              </Button>
            )}
          </div>
          <div className="min-h-[150px] bg-muted/50 rounded-md p-3 text-sm">
            {generating ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Generating content...</span>
              </div>
            ) : generatedText ? (
              <div className="whitespace-pre-wrap">{generatedText}</div>
            ) : (
              <div className="text-muted-foreground text-center h-full flex flex-col justify-center">
                <p>Generated content will appear here</p>
                <p className="text-xs">Click the Generate button to create content based on your prompt</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleGenerate}
          disabled={generating || !prompt}
          className="w-full md:w-auto"
        >
          {generating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate
            </>
          )}
        </Button>
        <Button
          onClick={handleUseContent}
          disabled={!generatedText || generating}
          className="w-full md:w-auto md:ml-2"
        >
          Use this content
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AIContentGenerator;
