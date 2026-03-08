import type { SocialPlatform, ContentPost, EngagementMetrics, AIContentSuggestion, AudienceInsight } from '@/types/social';
import { platforms } from './platforms';
import { supabase } from '@/integrations/supabase/client';

const mockMetrics: EngagementMetrics[] = [
  { platform: 'instagram', followers: 2453, engagement_rate: 4.2, reach: 15600, impressions: 23400, growth_rate: 12.5 },
  { platform: 'twitter', followers: 1876, engagement_rate: 3.8, reach: 8900, impressions: 12300, growth_rate: 8.7 },
];

export const socialMediaService = {
  async getConnectedPlatforms(userId: string): Promise<SocialPlatform[]> {
    const { data: connections } = await supabase
      .from('platform_connections')
      .select('*')
      .eq('user_id', userId);

    const metrics = await this.getEngagementMetrics(userId);

    return platforms.map(platform => {
      const conn = connections?.find(c => c.platform === platform.id);
      const metric = metrics.find(m => m.platform === platform.id);
      return {
        id: platform.id,
        name: platform.name,
        icon: platform.icon,
        connected: conn?.status === 'connected',
        followers: metric?.followers || 0,
        engagement_rate: metric?.engagement_rate || 0,
        last_post: '3 hours ago',
      };
    });
  },

  async connectPlatform(userId: string, platform: string, credentials: any) {
    const { error } = await supabase
      .from('platform_connections')
      .upsert({
        user_id: userId,
        platform,
        access_token: credentials?.access_token || '',
        status: 'connected',
        connected_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    return error ? null : { success: true };
  },

  async getContentPosts(userId: string): Promise<ContentPost[]> {
    const { data } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (!data || data.length === 0) {
      return [{
        id: '1',
        platform: 'instagram',
        content: 'Check out this amazing view! 🌅 #sunrise #nature #photography',
        media_urls: [],
        scheduled_time: new Date(),
        status: 'published',
        engagement: { likes: 156, comments: 23, shares: 12, views: 1240 },
      }];
    }

    return data.map(row => ({
      id: row.id,
      platform: row.platforms[0] || 'unknown',
      content: row.content,
      media_urls: row.media_urls || [],
      scheduled_time: new Date(row.scheduled_for),
      status: row.status as ContentPost['status'],
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    }));
  },

  async schedulePost(userId: string, post: Partial<ContentPost>) {
    const { error } = await supabase
      .from('scheduled_posts')
      .insert({
        user_id: userId,
        content: post.content || '',
        platforms: post.platform ? [post.platform] : [],
        scheduled_for: post.scheduled_time?.toISOString() || new Date().toISOString(),
        status: 'scheduled',
        media_urls: post.media_urls || [],
      });
    if (error) console.error('Error scheduling post:', error);
  },

  async getEngagementMetrics(userId: string): Promise<EngagementMetrics[]> {
    const { data } = await supabase
      .from('analytics_snapshots')
      .select('*')
      .eq('user_id', userId)
      .order('snapshot_date', { ascending: false })
      .limit(10);

    if (!data || data.length === 0) return mockMetrics;

    const byPlatform = new Map<string, EngagementMetrics>();
    for (const row of data) {
      if (!byPlatform.has(row.platform)) {
        byPlatform.set(row.platform, {
          platform: row.platform,
          followers: row.followers || 0,
          engagement_rate: Number(row.engagement_rate) || 0,
          reach: row.reach || 0,
          impressions: row.impressions || 0,
          growth_rate: 0,
        });
      }
    }

    return byPlatform.size > 0 ? Array.from(byPlatform.values()) : mockMetrics;
  },

  async getAIContentSuggestions(_userId: string, platform: string): Promise<AIContentSuggestion[]> {
    return [{
      id: '1',
      platform,
      content: 'Share behind-the-scenes content to increase engagement',
      hashtags: ['#BTS', '#authentic', '#community'],
      optimal_time: new Date(Date.now() + 3600000),
      predicted_engagement: 8.5,
      confidence_score: 0.87,
    }];
  },

  async getAudienceInsights(_userId: string, platform: string): Promise<AudienceInsight> {
    return {
      platform,
      demographics: {
        age_groups: { '18-24': 35, '25-34': 40, '35-44': 20, '45+': 5 },
        gender: { male: 45, female: 52, other: 3 },
        locations: { US: 60, UK: 15, Canada: 12, Australia: 8, Other: 5 },
      },
      best_posting_times: ['9:00 AM', '1:00 PM', '7:00 PM', '9:00 PM'],
      engagement_patterns: { Monday: 85, Tuesday: 92, Wednesday: 88, Thursday: 95, Friday: 78, Saturday: 65, Sunday: 70 },
      content_performance: {
        content_types: { Videos: 87, Images: 65, Carousels: 78, 'Text Only': 42 },
        content_topics: { Educational: 92, 'Behind the Scenes': 78, 'User Generated': 83, Promotional: 51 },
        content_lengths: { 'Short (0-15s)': 89, 'Medium (15-60s)': 76, 'Long (60s+)': 45 },
      },
      hashtag_performance: {
        top_hashtags: ['#DigitalMarketing', '#ContentStrategy', '#SocialMediaTips', '#StartupLife', '#GrowthHacking'],
        reach_by_category: { 'Industry-Specific': 87, 'Location-Based': 62, Trending: 91, 'Brand-Specific': 76 },
        volume_analysis: { 'High Volume (1M+)': 42, 'Medium Volume (100K-1M)': 85, 'Low Volume (10K-100K)': 93, 'Micro Volume (<10K)': 68 },
      },
    };
  },
};
