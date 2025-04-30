
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudienceDemographics from '@/components/AudienceInsights/AudienceDemographics';
import EngagementInsights from '@/components/AudienceInsights/EngagementInsights';
import CompetitorAnalysis from '@/components/AudienceInsights/CompetitorAnalysis';
import HashtagAnalytics from '@/components/AudienceInsights/HashtagAnalytics';

const AudienceInsights = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Audience Insights</h1>
            <p className="text-muted-foreground">Detailed analytics about your audience and content performance</p>
          </header>
          
          <Tabs defaultValue="demographics" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
            </TabsList>
            
            <TabsContent value="demographics">
              <AudienceDemographics />
            </TabsContent>
            
            <TabsContent value="engagement">
              <EngagementInsights />
            </TabsContent>
            
            <TabsContent value="competitors">
              <CompetitorAnalysis />
            </TabsContent>
            
            <TabsContent value="hashtags">
              <HashtagAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AudienceInsights;
