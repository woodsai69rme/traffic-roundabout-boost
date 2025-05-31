
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import RecentActivity from '@/components/RecentActivity';
import PlatformOverview from '@/components/PlatformOverview';
import { contentService } from '@/services/contentService';
import { socialAccountService } from '@/services/socialAccountService';
import { analyticsService } from '@/services/analyticsService';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Users, Calendar, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: content = [], isLoading: contentLoading } = useQuery({
    queryKey: ['content', user?.id],
    queryFn: () => user ? contentService.getContent(user.id) : [],
    enabled: !!user
  });

  const { data: socialAccounts = [], isLoading: accountsLoading } = useQuery({
    queryKey: ['socialAccounts', user?.id],
    queryFn: () => user ? socialAccountService.getSocialAccounts(user.id) : [],
    enabled: !!user
  });

  const { data: overviewMetrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['overviewMetrics', user?.id],
    queryFn: () => user ? analyticsService.getOverviewMetrics(user.id) : null,
    enabled: !!user
  });

  const { data: scheduledContent = [] } = useQuery({
    queryKey: ['scheduledContent', user?.id],
    queryFn: () => user ? contentService.getScheduledContent(user.id) : [],
    enabled: !!user
  });

  const totalPosts = content.length;
  const connectedPlatforms = socialAccounts.length;
  const scheduledPosts = scheduledContent.length;
  const engagement = overviewMetrics?.totalEngagement || 0;

  const recentPosts = content.slice(0, 5).map(post => ({
    id: post.id,
    action: 'Published post',
    target: post.title,
    platform: post.platforms[0] || 'unknown',
    timestamp: post.created_at
  }));

  if (contentLoading || accountsLoading || metricsLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarWithAuth />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">Loading dashboard...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's your social media overview.
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/content-planner">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Content
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Posts"
              value={totalPosts.toString()}
              icon={<BarChart3 className="h-6 w-6" />}
              trend="+12%"
            />
            <StatCard
              title="Connected Platforms"
              value={connectedPlatforms.toString()}
              icon={<Users className="h-6 w-6" />}
              trend="+2"
            />
            <StatCard
              title="Scheduled Posts"
              value={scheduledPosts.toString()}
              icon={<Calendar className="h-6 w-6" />}
              trend="+5"
            />
            <StatCard
              title="Total Engagement"
              value={engagement.toLocaleString()}
              icon={<TrendingUp className="h-6 w-6" />}
              trend="+8.2%"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Platform Overview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                  <CardDescription>
                    Your connected social media platforms and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {socialAccounts.length > 0 ? (
                    <PlatformOverview accounts={socialAccounts} />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        No platforms connected yet
                      </p>
                      <Link to="/platforms">
                        <Button>Connect Platforms</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest posts and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentPosts.length > 0 ? (
                    <RecentActivity activities={recentPosts} />
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        No recent activity
                      </p>
                      <Link to="/content-planner">
                        <Button size="sm">Create First Post</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your social media presence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/content-planner" className="block">
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                    <Plus className="h-6 w-6" />
                    <span className="font-medium">Schedule Post</span>
                    <span className="text-sm text-muted-foreground">Plan your content</span>
                  </Button>
                </Link>
                <Link to="/analytics" className="block">
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    <span className="font-medium">View Analytics</span>
                    <span className="text-sm text-muted-foreground">Track performance</span>
                  </Button>
                </Link>
                <Link to="/platforms" className="block">
                  <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span className="font-medium">Connect Platforms</span>
                    <span className="text-sm text-muted-foreground">Add social accounts</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
