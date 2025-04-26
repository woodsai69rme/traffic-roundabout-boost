
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import PlatformsList from './PlatformsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebhookIntegration from './WebhookIntegration';
import DataExportImport from './DataExportImport';

const SocialApiIntegrationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">API Integrations</h1>
            <p className="text-muted-foreground">
              Connect your social media accounts, set up webhooks, and manage data exports/imports
            </p>
          </header>
          
          <Tabs defaultValue="platforms" className="space-y-6">
            <TabsList>
              <TabsTrigger value="platforms">Platform Connections</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="data">Data Import/Export</TabsTrigger>
            </TabsList>
            
            <TabsContent value="platforms">
              <PlatformsList />
            </TabsContent>
            
            <TabsContent value="webhooks">
              <WebhookIntegration />
            </TabsContent>
            
            <TabsContent value="data">
              <DataExportImport />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SocialApiIntegrationPage;
