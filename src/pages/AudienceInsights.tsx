
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import AudienceDemographics from '@/components/AudienceInsights/AudienceDemographics';
import EngagementInsights from '@/components/AudienceInsights/EngagementInsights';
import HashtagAnalytics from '@/components/AudienceInsights/HashtagAnalytics';
import CompetitorAnalysis from '@/components/AudienceInsights/CompetitorAnalysis';
import { platforms } from '@/services/platforms';

const AudienceInsights = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('twitter');

  return (
    <>
      <Helmet>
        <title>Audience Insights | Roundabout</title>
      </Helmet>
      <NavbarWithAuth />
      <main className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audience Insights</h1>
            <p className="text-muted-foreground">Analyze and understand your audience demographics and behavior</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.id} value={platform.id}>
                    <div className="flex items-center">
                      <img src={platform.icon} alt={platform.name} className="w-4 h-4 mr-2" />
                      <span>{platform.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Summary</CardTitle>
              <CardDescription>Overview of your {platforms.find(p => p.id === selectedPlatform)?.name} audience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="text-muted-foreground text-sm">Total Followers</div>
                  <div className="text-2xl font-bold mt-1">15,875</div>
                  <div className="text-xs text-green-500 mt-1">+5.2% from last month</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="text-muted-foreground text-sm">Engagement Rate</div>
                  <div className="text-2xl font-bold mt-1">4.7%</div>
                  <div className="text-xs text-green-500 mt-1">+0.8% from last month</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="text-muted-foreground text-sm">Reach</div>
                  <div className="text-2xl font-bold mt-1">45,230</div>
                  <div className="text-xs text-green-500 mt-1">+12.3% from last month</div>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <div className="text-muted-foreground text-sm">Top Hashtag</div>
                  <div className="text-2xl font-bold mt-1">#marketing</div>
                  <div className="text-xs text-green-500 mt-1">8.5k posts</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="demographics">
            <TabsList className="mb-4">
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
            </TabsList>
            <TabsContent value="demographics">
              <AudienceDemographics platform={selectedPlatform} />
            </TabsContent>
            <TabsContent value="engagement">
              <EngagementInsights platform={selectedPlatform} />
            </TabsContent>
            <TabsContent value="hashtags">
              <HashtagAnalytics platform={selectedPlatform} />
            </TabsContent>
            <TabsContent value="competitors">
              <CompetitorAnalysis platform={selectedPlatform} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default AudienceInsights;
