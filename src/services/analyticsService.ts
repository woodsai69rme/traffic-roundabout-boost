
import { supabase } from '@/integrations/supabase/client';

export interface Analytics {
  id: string;
  user_id: string;
  content_id?: string;
  platform: string;
  metrics: Record<string, any>;
  date: string;
  created_at: string;
}

export const analyticsService = {
  async getAnalytics(userId: string, dateRange?: { start: string; end: string }): Promise<Analytics[]> {
    // Mock data since we don't have the analytics table yet
    const mockAnalytics: Analytics[] = [
      {
        id: '1',
        user_id: userId,
        platform: 'twitter',
        metrics: { likes: 25, comments: 5, shares: 3, impressions: 500 },
        date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: userId,
        platform: 'linkedin',
        metrics: { likes: 15, comments: 8, shares: 2, impressions: 300 },
        date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString()
      }
    ];

    return mockAnalytics;
  },

  async recordAnalytics(analytics: Omit<Analytics, 'id' | 'user_id' | 'created_at'>): Promise<Analytics> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const newAnalytics: Analytics = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: user.id,
      created_at: new Date().toISOString(),
      ...analytics
    };

    return newAnalytics;
  },

  async getOverviewMetrics(userId: string): Promise<{
    totalPosts: number;
    totalEngagement: number;
    avgEngagementRate: number;
    topPlatform: string;
  }> {
    const analytics = await this.getAnalytics(userId);
    
    const totalPosts = analytics.length;
    const totalEngagement = analytics.reduce((sum, item) => {
      const likes = Number(item.metrics?.likes || 0);
      const comments = Number(item.metrics?.comments || 0);
      const shares = Number(item.metrics?.shares || 0);
      return sum + likes + comments + shares;
    }, 0);
    
    const avgEngagementRate = totalPosts > 0 ? totalEngagement / totalPosts : 0;
    
    const platformEngagement = analytics.reduce((acc, item) => {
      const likes = Number(item.metrics?.likes || 0);
      const comments = Number(item.metrics?.comments || 0);
      const shares = Number(item.metrics?.shares || 0);
      const engagement = likes + comments + shares;
      acc[item.platform] = (acc[item.platform] || 0) + engagement;
      return acc;
    }, {} as Record<string, number>);
    
    const platformEntries = Object.entries(platformEngagement);
    const topPlatform = platformEntries.length > 0 
      ? platformEntries.sort(([,a], [,b]) => Number(b) - Number(a))[0]?.[0] || 'twitter'
      : 'twitter';

    return {
      totalPosts,
      totalEngagement,
      avgEngagementRate,
      topPlatform
    };
  }
};
