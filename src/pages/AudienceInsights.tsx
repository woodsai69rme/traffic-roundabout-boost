
import React, { useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AudienceDemographics from '@/components/AudienceInsights/AudienceDemographics';
import EngagementInsights from '@/components/AudienceInsights/EngagementInsights';
import CompetitorAnalysis from '@/components/AudienceInsights/CompetitorAnalysis';
import HashtagAnalytics from '@/components/AudienceInsights/HashtagAnalytics';
import { Button } from '@/components/ui/button';
import { Download, RefreshCcw } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from '@/components/ui/card';

const AudienceInsights = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Audience Insights</h1>
              <p className="text-muted-foreground">Detailed analytics about your audience and content performance</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </header>
          
          <Tabs defaultValue="demographics" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="competitors">Competitors</TabsTrigger>
              <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
            </TabsList>
            
            <TabsContent value="demographics" className="space-y-6">
              <AudienceDemographics platform={selectedPlatform} />
            </TabsContent>
            
            <TabsContent value="engagement" className="space-y-6">
              <EngagementInsights platform={selectedPlatform} />
            </TabsContent>
            
            <TabsContent value="competitors" className="space-y-6">
              <CompetitorAnalysis platform={selectedPlatform} />
            </TabsContent>
            
            <TabsContent value="hashtags" className="space-y-6">
              <HashtagAnalytics platform={selectedPlatform} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AudienceInsights;
