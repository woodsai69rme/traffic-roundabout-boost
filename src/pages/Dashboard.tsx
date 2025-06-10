
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Eye, Heart, MessageCircle, Share, Plus } from 'lucide-react';
import { socialMediaService } from '@/services/socialMediaService';
import type { EngagementMetrics, AIContentSuggestion } from '@/types/social';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<EngagementMetrics[]>([]);
  const [suggestions, setSuggestions] = useState<AIContentSuggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      try {
        const [metricsData, suggestionsData] = await Promise.all([
          socialMediaService.getEngagementMetrics(user.id),
          socialMediaService.getAIContentSuggestions(user.id, 'all')
        ]);
        
        setMetrics(metricsData);
        setSuggestions(suggestionsData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarWithAuth />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalFollowers = metrics.reduce((sum, metric) => sum + metric.followers, 0);
  const avgEngagement = metrics.length > 0 
    ? metrics.reduce((sum, metric) => sum + metric.engagement_rate, 0) / metrics.length 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your social media growth today.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600" asChild>
              <Link to="/content-planner">
                <Plus className="mr-2 h-4 w-4" />
                Create Content
              </Link>
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalFollowers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.3%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reach</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.5K</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.1%</span> from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <Progress value={87} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Platform Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Your engagement across connected platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.map((metric) => (
                  <div key={metric.platform} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                        {metric.platform[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{metric.platform}</p>
                        <p className="text-sm text-muted-foreground">
                          {metric.followers.toLocaleString()} followers
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{metric.engagement_rate}%</p>
                      <p className="text-sm text-green-600">+{metric.growth_rate}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>AI Content Suggestions</CardTitle>
              <CardDescription>Personalized recommendations to boost your engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium capitalize">{suggestion.platform}</h4>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {(suggestion.confidence_score * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{suggestion.content}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {suggestion.hashtags.map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Predicted engagement: {suggestion.predicted_engagement}/10</span>
                      <span>Best time: {suggestion.optimal_time.toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connect Platforms</CardTitle>
                <CardDescription>Link your social media accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/platforms">Manage Connections</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule Content</CardTitle>
                <CardDescription>Plan your posts in advance</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/content-planner">Open Planner</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">View Analytics</CardTitle>
                <CardDescription>Deep dive into your metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/analytics">View Reports</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
