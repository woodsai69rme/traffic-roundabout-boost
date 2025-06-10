
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OptimizationSuggestion {
  type: 'hashtags' | 'timing' | 'content' | 'engagement';
  suggestion: string;
  impact: 'low' | 'medium' | 'high';
}

const ContentOptimizer = () => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const { toast } = useToast();

  const optimizeContent = async () => {
    if (!content.trim()) {
      toast({
        title: "Please enter some content",
        description: "Add your post content to get optimization suggestions",
        variant: "destructive"
      });
      return;
    }

    setIsOptimizing(true);
    
    // Simulate AI optimization
    setTimeout(() => {
      const mockSuggestions: OptimizationSuggestion[] = [
        {
          type: 'hashtags',
          suggestion: 'Add trending hashtags: #motivation #success #entrepreneur #grind',
          impact: 'high'
        },
        {
          type: 'timing',
          suggestion: 'Best posting time for your audience: 7:30 PM on weekdays',
          impact: 'medium'
        },
        {
          type: 'content',
          suggestion: 'Add a question at the end to boost engagement',
          impact: 'high'
        },
        {
          type: 'engagement',
          suggestion: 'Include a clear call-to-action like "Double tap if you agree!"',
          impact: 'medium'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setIsOptimizing(false);
      toast({
        title: "Content optimized!",
        description: "Your optimization suggestions are ready"
      });
    }, 2000);
  };

  const copyOptimizedContent = () => {
    let optimizedContent = content;
    
    // Apply suggestions
    optimizedContent += '\n\n';
    optimizedContent += suggestions
      .filter(s => s.type === 'hashtags')
      .map(s => s.suggestion.replace('Add trending hashtags: ', ''))
      .join(' ');
    
    optimizedContent += '\n\nWhat do you think? Let me know in the comments! 👇';
    
    navigator.clipboard.writeText(optimizedContent);
    toast({
      title: "Copied to clipboard!",
      description: "Your optimized content is ready to post"
    });
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Content Optimizer
          </CardTitle>
          <CardDescription>
            Get AI-powered suggestions to maximize your content's reach and engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Platform</label>
            <select 
              value={platform} 
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Your Content</label>
            <Textarea 
              placeholder="Enter your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>
          
          <Button 
            onClick={optimizeContent} 
            disabled={isOptimizing}
            className="w-full"
          >
            {isOptimizing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Optimize Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Suggestions</CardTitle>
            <CardDescription>
              AI-generated recommendations to improve your content performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{suggestion.type}</span>
                  <Badge className={getImpactColor(suggestion.impact)}>
                    {suggestion.impact} impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
              </div>
            ))}
            
            <Button onClick={copyOptimizedContent} className="w-full mt-4">
              <Copy className="mr-2 h-4 w-4" />
              Copy Optimized Content
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContentOptimizer;
