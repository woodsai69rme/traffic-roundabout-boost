
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlatformOverview } from '@/components/PlatformOverview';
import PlatformConnect from '@/components/PlatformConnect';

const Platforms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Platforms</h1>
            <p className="text-muted-foreground">Manage and analyze your social media platforms</p>
          </header>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="connect">Connect</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <PlatformOverview />
            </TabsContent>
            
            <TabsContent value="connect">
              <PlatformConnect />
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Platform Settings</h2>
                <p className="text-muted-foreground">
                  Configure your platform preferences and permissions.
                </p>
                
                <div className="bg-muted p-6 rounded-lg text-center">
                  <p>Platform settings coming soon.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Platforms;
