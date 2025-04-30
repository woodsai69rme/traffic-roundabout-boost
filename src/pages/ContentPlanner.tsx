
import React, { useState, useEffect } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCalendar from '@/components/ContentScheduler/ContentCalendar';
import ScheduledPostsList from '@/components/ContentScheduler/ScheduledPostsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchScheduledPosts, Post } from '@/services/socialApiIntegrations';
import { useToast } from '@/hooks/use-toast';

const ContentPlanner = () => {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadScheduledPosts();
  }, []);

  const loadScheduledPosts = async () => {
    try {
      setIsLoading(true);
      const posts = await fetchScheduledPosts();
      setScheduledPosts(posts);
    } catch (error) {
      console.error("Error loading scheduled posts:", error);
      toast({
        title: "Error",
        description: "Failed to load scheduled posts. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = (post: Post) => {
    // To be implemented with a modal form
    console.log("Edit post:", post);
  };

  const handleDeletePost = (post: Post) => {
    // To be implemented with confirmation
    console.log("Delete post:", post);
  };

  const handlePublishNow = (post: Post) => {
    // To be implemented
    console.log("Publish now:", post);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Content Planner</h1>
            <p className="text-muted-foreground">Schedule and manage content across all your platforms</p>
          </header>
          
          <Tabs defaultValue="calendar" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="queue">Content Queue</TabsTrigger>
                <TabsTrigger value="templates">Content Templates</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline">Import</Button>
                <Button>New Post</Button>
              </div>
            </div>
            
            <TabsContent value="calendar">
              <ContentCalendar />
            </TabsContent>
            
            <TabsContent value="queue">
              <Card>
                <CardHeader>
                  <CardTitle>Content Queue</CardTitle>
                  <CardDescription>
                    Manage your upcoming scheduled content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <p>Loading posts...</p>
                    </div>
                  ) : (
                    <ScheduledPostsList 
                      posts={scheduledPosts}
                      onEdit={handleEditPost}
                      onDelete={handleDeletePost}
                      onPublishNow={handlePublishNow}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Content Templates</CardTitle>
                  <CardDescription>
                    Reusable templates to streamline your content creation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Create content templates to save time and maintain consistency.</p>
                    <Button className="mt-4">Create Template</Button>
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

export default ContentPlanner;
