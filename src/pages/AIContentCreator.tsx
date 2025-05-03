
import React, { useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AIContentGenerator from '@/components/ContentScheduler/AIContentGenerator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, MessageSquare, Video, Image, FileText, Wand2 } from 'lucide-react';

const AIContentCreator = () => {
  const [generatedContent, setGeneratedContent] = useState<string>('');
  
  const handleUseContent = (content: string) => {
    setGeneratedContent(content);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" /> AI Content Creator
            </h1>
            <p className="text-muted-foreground">Generate engaging content for your social media posts with AI</p>
          </header>
          
          <Tabs defaultValue="post" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="post" className="flex gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Posts & Captions</span>
                  <span className="inline sm:hidden">Posts</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex gap-1">
                  <Video className="h-4 w-4" />
                  <span className="hidden sm:inline">Video Scripts</span>
                  <span className="inline sm:hidden">Video</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex gap-1">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Image Prompts</span>
                  <span className="inline sm:hidden">Image</span>
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex gap-1">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Blog Ideas</span>
                  <span className="inline sm:hidden">Blog</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="post" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <AIContentGenerator onUseContent={handleUseContent} />
                </div>
                
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content History</CardTitle>
                      <CardDescription>
                        Previously generated content
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {generatedContent ? (
                        <div className="space-y-4">
                          <div className="p-4 border rounded-md">
                            <p className="text-sm">{generatedContent}</p>
                            <div className="flex justify-end mt-2">
                              <Button size="sm" variant="outline">Schedule</Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">Generated content will be saved here for later use</p>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Wand2 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                          <p className="text-muted-foreground">
                            Generate content using the AI tool to see it here
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="video">
              <Card>
                <CardHeader>
                  <CardTitle>Video Script Generator</CardTitle>
                  <CardDescription>
                    Create engaging scripts for your video content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Video className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Our video script generator is currently in development.
                      Check back soon for this exciting feature!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="image">
              <Card>
                <CardHeader>
                  <CardTitle>Image Prompt Generator</CardTitle>
                  <CardDescription>
                    Create detailed prompts for AI image generation tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Image className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Our image prompt generator is currently in development.
                      Check back soon for this exciting feature!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="blog">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Content Generator</CardTitle>
                  <CardDescription>
                    Create outlines and ideas for blog posts and articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground">
                      Our blog content generator is currently in development.
                      Check back soon for this exciting feature!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIContentCreator;
