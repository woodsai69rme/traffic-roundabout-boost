
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
    let query = supabase
      .from('analytics')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (dateRange) {
      query = query
        .gte('date', dateRange.start)
        .lte('date', dateRange.end);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }

    return data || [];
  },

  async recordAnalytics(analytics: Omit<Analytics, 'id' | 'user_id' | 'created_at'>): Promise<Analytics> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('analytics')
      .insert({
        ...analytics,
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error recording analytics:', error);
      throw error;
    }

    return data;
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
      const engagement = (item.metrics.likes || 0) + (item.metrics.comments || 0) + (item.metrics.shares || 0);
      return sum + engagement;
    }, 0);
    
    const avgEngagementRate = totalPosts > 0 ? totalEngagement / totalPosts : 0;
    
    const platformEngagement = analytics.reduce((acc, item) => {
      const engagement = (item.metrics.likes || 0) + (item.metrics.comments || 0) + (item.metrics.shares || 0);
      acc[item.platform] = (acc[item.platform] || 0) + engagement;
      return acc;
    }, {} as Record<string, number>);
    
    const topPlatform = Object.entries(platformEngagement)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'twitter';

    return {
      totalPosts,
      totalEngagement,
      avgEngagementRate,
      topPlatform
    };
  }
};
