
import React, { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/use-auth";
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { socialMediaService } from '@/services/socialMediaService';
import type { AudienceInsight } from '@/types/social';
import { BarChart3, Users, MapPin, Calendar, Hash, BarChart } from 'lucide-react';

const AudienceInsights = () => {
  const { user } = useAuth();
  const [platform, setPlatform] = useState('instagram');
  const [insights, setInsights] = useState<AudienceInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const data = await socialMediaService.getAudienceInsights(user.id, platform);
        setInsights(data);
      } catch (error) {
        console.error('Error loading audience insights:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, [user, platform]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarWithAuth />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading audience insights...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
                <Users className="h-8 w-8 text-purple-600" />
                Audience Insights
              </h1>
              <p className="text-muted-foreground">
                Understand your audience demographics, engagement patterns, and preferences
              </p>
            </div>
            <div className="w-full md:w-64">
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </header>
          
          {insights && (
            <Tabs defaultValue="demographics" className="space-y-6">
              <TabsList>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="content">Content Performance</TabsTrigger>
                <TabsTrigger value="hashtags">Hashtag Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="demographics">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Age Demographics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Age Distribution
                      </CardTitle>
                      <CardDescription>
                        Breakdown of your audience by age groups
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(insights.demographics.age_groups).map(([range, percentage]) => (
                          <div key={range}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{range}</span>
                              <span className="text-sm font-medium">{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Gender Demographics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Gender Distribution
                      </CardTitle>
                      <CardDescription>
                        Breakdown of your audience by gender
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(insights.demographics.gender).map(([gender, percentage]) => (
                          <div key={gender}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm capitalize">{gender}</span>
                              <span className="text-sm font-medium">{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Location Demographics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Geographic Distribution
                      </CardTitle>
                      <CardDescription>
                        Top locations of your audience
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(insights.demographics.locations).map(([location, percentage]) => (
                          <div key={location}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{location}</span>
                              <span className="text-sm font-medium">{percentage}%</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="engagement">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Best Posting Times */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Optimal Posting Times
                      </CardTitle>
                      <CardDescription>
                        Times when your audience is most active
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {insights.best_posting_times.map((time, index) => (
                          <div key={index} className="border rounded-lg p-3 text-center">
                            <span className="block text-lg font-medium">{time}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Weekly Engagement Pattern */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Weekly Engagement Pattern
                      </CardTitle>
                      <CardDescription>
                        Engagement levels throughout the week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(insights.engagement_patterns).map(([day, value]) => (
                          <div key={day}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{day}</span>
                              <span className="text-sm font-medium">{value}%</span>
                            </div>
                            <Progress value={value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="content">
                <Card>
                  <CardHeader>
                    <CardTitle>Content Performance Analysis</CardTitle>
                    <CardDescription>
                      Analysis of your top-performing content types
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Content Type</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Videos</span>
                              <span>87%</span>
                            </div>
                            <Progress value={87} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Images</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Carousels</span>
                              <span>78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Text Only</span>
                              <span>42%</span>
                            </div>
                            <Progress value={42} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Content Topics</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Educational</span>
                              <span>92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Behind the Scenes</span>
                              <span>78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>User Generated</span>
                              <span>83%</span>
                            </div>
                            <Progress value={83} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Promotional</span>
                              <span>51%</span>
                            </div>
                            <Progress value={51} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">Content Length</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Short (0-15s)</span>
                              <span>89%</span>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Medium (15-60s)</span>
                              <span>76%</span>
                            </div>
                            <Progress value={76} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Long (60s+)</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="hashtags">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="h-5 w-5" />
                      Hashtag Performance
                    </CardTitle>
                    <CardDescription>
                      Analysis of your most effective hashtags
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Top Performing Hashtags</h4>
                        <div className="flex flex-wrap gap-2">
                          {insights.top_hashtags.map((tag, index) => (
                            <Badge key={index} className="py-2 px-3 text-base bg-purple-100 text-purple-800 hover:bg-purple-200">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-4">Reach by Hashtag Category</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Industry-Specific</span>
                                <span>87%</span>
                              </div>
                              <Progress value={87} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Location-Based</span>
                                <span>62%</span>
                              </div>
                              <Progress value={62} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Trending</span>
                                <span>91%</span>
                              </div>
                              <Progress value={91} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Brand-Specific</span>
                                <span>76%</span>
                              </div>
                              <Progress value={76} className="h-2" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-4">Hashtag Volume Analysis</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>High Volume (1M+)</span>
                                <span>42%</span>
                              </div>
                              <Progress value={42} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Medium Volume (100K-1M)</span>
                                <span>85%</span>
                              </div>
                              <Progress value={85} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Low Volume (10K-100K)</span>
                                <span>93%</span>
                              </div>
                              <Progress value={93} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Micro Volume (<10K)</span>
                                <span>68%</span>
                              </div>
                              <Progress value={68} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AudienceInsights;
