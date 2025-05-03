
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { RefreshCcw, Copy, ThumbsUp, ThumbsDown, Sparkles, Loader2 } from 'lucide-react';

interface AIContentGeneratorProps {
  onUseContent?: (content: string) => void;
}

const AIContentGenerator: React.FC<AIContentGeneratorProps> = ({ onUseContent }) => {
  const [topic, setTopic] = useState<string>('');
  const [platform, setPlatform] = useState<string>('twitter');
  const [tone, setTone] = useState<string>('professional');
  const [language, setLanguage] = useState<string>('english');
  const [contentLength, setContentLength] = useState<number[]>([2]); // 1-3 scale (short, medium, long)
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [generatedOptions, setGeneratedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock content generation
  const generateContent = () => {
    if (!topic) return;
    
    setIsGenerating(true);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const contentTemplates = {
        twitter: {
          professional: [
            `Looking to improve your ${topic} strategy? Our latest guide breaks down everything you need to know to stay ahead of the competition. #${topic.replace(/\s+/g, '')} #BusinessTips`,
            `The future of ${topic} is here. Discover how innovative companies are leveraging new technologies to transform their approach. #${topic.replace(/\s+/g, '')} #Innovation`,
            `We've compiled the top 5 ${topic} trends for 2025. Click the link in bio to learn how to implement them in your business. #${topic.replace(/\s+/g, '')} #TrendAlert`
          ],
          casual: [
            `Just dropped: our honest thoughts about ${topic}! 👀 What's your take? Drop a comment below! #${topic.replace(/\s+/g, '')} #JustSaying`,
            `Can't stop thinking about ${topic} lately... anyone else obsessed? Share your experiences below! ✨ #${topic.replace(/\s+/g, '')} #ObsessedWithIt`,
            `Hot take: ${topic} is changing everything about how we work. Agree or disagree? 🔥 #${topic.replace(/\s+/g, '')} #HotTake`
          ],
          humorous: [
            `When someone says they don't care about ${topic} 👁️👄👁️ #${topic.replace(/\s+/g, '')} #TheAudacity`,
            `Me explaining ${topic} to my friends for the 100th time while they pretend to listen 🤣 #${topic.replace(/\s+/g, '')} #SorryNotSorry`,
            `Nobody: \nAbsolutely no one: \nMe at 3 AM: *researching everything about ${topic}* #${topic.replace(/\s+/g, '')} #CantSleep`
          ]
        },
        instagram: {
          professional: [
            `📈 Elevate your ${topic} strategy with our proven framework.\n\nIn our latest case study, we demonstrate how businesses are achieving 3x results by implementing these key principles.\n\nSwipe up to learn more!\n\n#${topic.replace(/\s+/g, '')} #BusinessGrowth #ProfessionalDevelopment`,
            `🚀 The definitive guide to mastering ${topic} in 2025.\n\nWe've interviewed 20+ industry experts to compile the most comprehensive resource available.\n\nSave this post for later!\n\n#${topic.replace(/\s+/g, '')} #ExpertTips #IndustryInsights`
          ],
          casual: [
            `✨ Vibing with ${topic} today! ✨\n\nSharing some of my favorite ways to incorporate this into my daily routine. Which one are you trying first?\n\n#${topic.replace(/\s+/g, '')} #DailyVibes #LifestyleTips`,
            `Just hanging out with my favorite ${topic} setup! 🙌\n\nWhat's your go-to approach? Drop it in the comments!\n\n#${topic.replace(/\s+/g, '')} #WeekendVibes #ShareYourSetup`
          ],
          humorous: [
            `When your ${topic} game is strong but your bank account is weak 😂💸\n\nTag someone who relates too hard!\n\n#${topic.replace(/\s+/g, '')} #BrokeButHappy #WorthEveryPenny`,
            `POV: You're trying to explain ${topic} to your parents 🤦‍♀️\n\nAnyone else's family completely clueless about what you do?\n\n#${topic.replace(/\s+/g, '')} #FamilyProblems #TheyJustDontGetIt`
          ]
        }
      };

      // Default to twitter if platform doesn't exist in templates
      const platformContent = contentTemplates[platform] || contentTemplates.twitter;
      // Default to professional if tone doesn't exist in templates
      const toneContent = platformContent[tone] || platformContent.professional;
      
      // Select random options
      const shuffled = [...toneContent].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      
      setGeneratedOptions(selected);
      setGeneratedContent(selected[0]);
      setIsGenerating(false);
      setIsLoading(false);
    }, 1500);
  };

  const handleUseContent = () => {
    if (onUseContent && generatedContent) {
      onUseContent(generatedContent);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const selectOption = (content: string) => {
    setGeneratedContent(content);
  };

  const getLengthLabel = (value: number) => {
    switch (value) {
      case 1: return "Short";
      case 2: return "Medium";
      case 3: return "Long";
      default: return "Medium";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Content Generator
        </CardTitle>
        <CardDescription>Create engaging content for your social media posts</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="generate" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="results" disabled={!generatedContent}>Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Topic or Keywords</label>
              <Input
                placeholder="e.g., social media marketing, fashion trends, healthy recipes"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Platform</label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tone</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium">Content Length</label>
                <span className="text-sm text-muted-foreground">{getLengthLabel(contentLength[0])}</span>
              </div>
              <Slider
                defaultValue={[2]}
                max={3}
                min={1}
                step={1}
                value={contentLength}
                onValueChange={setContentLength}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            {generatedContent && (
              <>
                <div className="space-y-4">
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[150px]"
                  />
                  
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard()}>
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={generateContent} disabled={!topic || isLoading}>
                        <RefreshCcw className="h-4 w-4 mr-1" /> Regenerate
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {generatedOptions.length > 1 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Other options:</h4>
                    {generatedOptions.map((option, index) => (
                      option !== generatedContent && (
                        <div 
                          key={index} 
                          className="p-3 border rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => selectOption(option)}
                        >
                          <p className="text-sm">{option}</p>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setTopic('');
          setPlatform('twitter');
          setTone('professional');
          setLanguage('english');
          setContentLength([2]);
          setGeneratedContent('');
          setGeneratedOptions([]);
        }}>
          Reset
        </Button>
        <div className="flex gap-2">
          {isGenerating ? (
            <Button disabled>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </Button>
          ) : (
            <>
              <Button variant="secondary" onClick={generateContent} disabled={!topic || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
              {generatedContent && (
                <Button onClick={handleUseContent}>
                  Use Content
                </Button>
              )}
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIContentGenerator;
