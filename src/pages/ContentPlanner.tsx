
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentCalendar from '@/components/ContentScheduler/ContentCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContentPlanner = () => {
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
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Your content queue will appear here.</p>
                    <Button className="mt-4">Create Content</Button>
                  </div>
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
