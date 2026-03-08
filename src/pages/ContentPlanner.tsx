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
import { supabase } from '@/integrations/supabase/client';
import { ContentPlannerSkeleton } from '@/components/PageSkeleton';

interface ContentTemplate {
  id: string;
  name: string;
  content: string;
  platform: string;
}

const TEMPLATES_KEY = 'roundabout_content_templates';

const ContentPlanner = () => {
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateContent, setNewTemplateContent] = useState('');
  const [newTemplatePlatform, setNewTemplatePlatform] = useState('instagram');

  useEffect(() => {
    const saved = localStorage.getItem(TEMPLATES_KEY);
    if (saved) setTemplates(JSON.parse(saved));
  }, []);

  const saveTemplate = () => {
    if (!newTemplateName.trim() || !newTemplateContent.trim()) {
      toast({ title: "Missing fields", description: "Name and content are required.", variant: "destructive" });
      return;
    }
    const t: ContentTemplate = { id: crypto.randomUUID(), name: newTemplateName, content: newTemplateContent, platform: newTemplatePlatform };
    const updated = [...templates, t];
    setTemplates(updated);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
    setNewTemplateName(''); setNewTemplateContent(''); setNewTemplatePlatform('instagram');
    toast({ title: "Saved", description: "Template created." });
  };

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
    toast({ title: "Deleted", description: "Template removed." });
  };
  const { toast } = useToast();

  useEffect(() => { loadScheduledPosts(); }, []);

  const loadScheduledPosts = async () => {
    try {
      setIsLoading(true);
      const posts = await fetchScheduledPosts();
      setScheduledPosts(posts);
    } catch (error) {
      console.error("Error loading scheduled posts:", error);
      toast({ title: "Error", description: "Failed to load scheduled posts.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = async (post: Post) => {
    // Update status to 'scheduled' if draft
    if (post.id.startsWith('demo-')) {
      toast({ title: "Demo post", description: "This is a demo post and cannot be edited." });
      return;
    }
    const { error } = await supabase
      .from('scheduled_posts')
      .update({ status: post.status === 'draft' ? 'scheduled' : 'draft', updated_at: new Date().toISOString() })
      .eq('id', post.id);
    if (error) {
      toast({ title: "Error", description: "Failed to update post.", variant: "destructive" });
    } else {
      toast({ title: "Updated", description: `Post status changed to ${post.status === 'draft' ? 'scheduled' : 'draft'}.` });
      loadScheduledPosts();
    }
  };

  const handleDeletePost = async (post: Post) => {
    if (post.id.startsWith('demo-')) {
      toast({ title: "Demo post", description: "This is a demo post and cannot be deleted." });
      return;
    }
    const { error } = await supabase.from('scheduled_posts').delete().eq('id', post.id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete post.", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Post has been removed." });
      loadScheduledPosts();
    }
  };

  const handlePublishNow = async (post: Post) => {
    if (post.id.startsWith('demo-')) {
      toast({ title: "Demo post", description: "This is a demo post and cannot be published." });
      return;
    }
    const { error } = await supabase
      .from('scheduled_posts')
      .update({ status: 'published', updated_at: new Date().toISOString() })
      .eq('id', post.id);
    if (error) {
      toast({ title: "Error", description: "Failed to publish post.", variant: "destructive" });
    } else {
      toast({ title: "Published", description: "Post has been published!" });
      loadScheduledPosts();
    }
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
            <TabsContent value="calendar"><ContentCalendar /></TabsContent>
            <TabsContent value="queue">
              <Card>
                <CardHeader><CardTitle>Content Queue</CardTitle><CardDescription>Manage your upcoming scheduled content</CardDescription></CardHeader>
                <CardContent>
                  {isLoading ? (
                    <ContentPlannerSkeleton />
                  ) : (
                    <ScheduledPostsList posts={scheduledPosts} onEdit={handleEditPost} onDelete={handleDeletePost} onPublishNow={handlePublishNow} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="templates">
              <Card>
                <CardHeader><CardTitle>Content Templates</CardTitle><CardDescription>Reusable templates to streamline your content creation</CardDescription></CardHeader>
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
