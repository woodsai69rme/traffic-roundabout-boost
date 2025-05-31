
import React, { useEffect, useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import { StatCard } from '@/components/StatCard';
import { PlatformOverview } from '@/components/PlatformOverview';
import { RecentActivity } from '@/components/RecentActivity';
import { useAuth } from '@/hooks/useAuth';
import { analyticsService } from '@/services/analyticsService';
import { socialAccountService } from '@/services/socialAccountService';
import { contentService } from '@/services/contentService';
import { Users, MessageSquare, TrendingUp, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    totalPosts: 0,
    totalEngagement: 0,
    avgEngagementRate: 0,
    topPlatform: 'twitter'
  });
  const [socialAccounts, setSocialAccounts] = useState<any[]>([]);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Load analytics metrics
      const metricsData = await analyticsService.getOverviewMetrics(user!.id);
      setMetrics(metricsData);

      // Load social accounts
      const accounts = await socialAccountService.getSocialAccounts(user!.id);
      setSocialAccounts(accounts);

      // Load recent content for activities
      const content = await contentService.getContent(user!.id);
      const activities = content.map(item => ({
        id: item.id,
        action: 'Published',
        target: item.title,
        platform: item.platforms[0] || 'unknown',
        timestamp: item.published_at || item.created_at
      }));
      setRecentActivities(activities);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarWithAuth />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! Here's your social media overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Posts"
            value={metrics.totalPosts.toString()}
            icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            trend="+12%"
          />
          <StatCard
            title="Total Engagement"
            value={metrics.totalEngagement.toString()}
            icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
            trend="+8%"
          />
          <StatCard
            title="Avg. Engagement Rate"
            value={`${metrics.avgEngagementRate.toFixed(1)}%`}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
            trend="+5%"
          />
          <StatCard
            title="Followers"
            value="1,234"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            trend="+3%"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PlatformOverview accounts={socialAccounts} />
          <RecentActivity activities={recentActivities} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
