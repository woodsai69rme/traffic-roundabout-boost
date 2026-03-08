import React, { useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ContentOptimizer from '@/components/AIEnhancement/ContentOptimizer';
import TrendAnalyzer from '@/components/AIEnhancement/TrendAnalyzer';
import { Sparkles, RefreshCw, Brain, Zap, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AIContentCreator = () => {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState('medium');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const { toast } = useToast();

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({ title: "Prompt required", description: "Please enter a prompt to generate content", variant: "destructive" });
      return;
    }

    setGenerating(true);
    setGeneratedContent('');

    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { prompt, platform, tone, length },
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "AI Error", description: data.error, variant: "destructive" });
        return;
      }

      setGeneratedContent(data?.content || 'No content generated.');
      toast({ title: "Content generated!", description: "Your AI-generated content is ready" });
    } catch (e: any) {
      console.error('AI generation error:', e);
      toast({ title: "Generation failed", description: e.message || "Please try again later.", variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({ title: "Copied!", description: "Content copied to clipboard" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-purple-600" /> AI Content Creator
            </h1>
            <p className="text-muted-foreground">Generate platform-optimized content with real AI</p>
          </header>

          <Tabs defaultValue="generator" className="space-y-6">
            <TabsList>
              <TabsTrigger value="generator">Content Generator</TabsTrigger>
              <TabsTrigger value="optimizer">Content Optimizer</TabsTrigger>
              <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="generator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Brain className="h-5 w-5" /> AI Content Generator</CardTitle>
                  <CardDescription>Create engaging social media content powered by AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Content Prompt</label>
                    <Textarea placeholder="Describe what you want to create..." value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Platform</label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tone</label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
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
                      <label className="text-sm font-medium mb-2 block">Content Length</label>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Long</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={generateContent} disabled={generating} className="w-full">
                    {generating ? (<><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>) : (<><Sparkles className="mr-2 h-4 w-4" /> Generate Content</>)}
                  </Button>
                </CardContent>
              </Card>

              {generatedContent && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Zap className="h-5 w-5" /> Generated Content</CardTitle>
                    <CardDescription>AI-generated content for {platform}, {tone} tone</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border rounded-md whitespace-pre-wrap">{generatedContent}</div>
                    <div className="flex gap-3">
                      <Button onClick={copyToClipboard} className="flex-1">Copy to Clipboard</Button>
                      <Button variant="outline" className="flex-1">Edit Content</Button>
                      <Button className="flex-1"><Send className="mr-2 h-4 w-4" /> Schedule Post</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="optimizer"><ContentOptimizer /></TabsContent>
            <TabsContent value="trends"><TrendAnalyzer /></TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIContentCreator;
