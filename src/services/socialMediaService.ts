
import { supabase } from '@/integrations/supabase/client';
import type { SocialPlatform, ContentPost, EngagementMetrics, AIContentSuggestion, AudienceInsight } from '@/types/social';
import { platforms } from './platforms';

export const socialMediaService = {
  // Platform connections
  async getConnectedPlatforms(userId: string): Promise<SocialPlatform[]> {
    const { data: connections, error } = await supabase
      .from('platform_connections')
      .select('platform, connected')
      .eq('user_id', userId);

    if (error) throw error;
    
    const engagementMetrics = await this.getEngagementMetrics(userId);

    return platforms.map(platform => {
      const connection = connections?.find(c => c.platform === platform.id);
      const metrics = engagementMetrics.find(m => m.platform === platform.id);

      return {
        id: platform.id,
        name: platform.name,
        icon: platform.icon,
        connected: connection?.connected || false,
        followers: metrics?.followers || 0,
        engagement_rate: metrics?.engagement_rate || 0,
        last_post: '3 hours ago', // Mock data
      };
    });
  },

  async connectPlatform(userId: string, platform: string, credentials: any) {
    const { data, error } = await supabase
      .from('platform_connections')
      .upsert({
        user_id: userId,
        platform,
        connected: true,
        ...credentials
      });

    if (error) throw error;
    return data;
  },

  // Content management
  async getContentPosts(userId: string): Promise<ContentPost[]> {
    // Mock data for now - would integrate with actual social APIs
    return [
      {
        id: '1',
        platform: 'instagram',
        content: 'Check out this amazing view! 🌅 #sunrise #nature #photography',
        media_urls: [],
        scheduled_time: new Date(),
        status: 'published',
        engagement: { likes: 156, comments: 23, shares: 12, views: 1240 }
      }
    ];
  },

  async schedulePost(userId: string, post: Partial<ContentPost>) {
    // Would integrate with scheduling service
    console.log('Scheduling post:', post);
  },

  // Analytics
  async getEngagementMetrics(userId: string): Promise<EngagementMetrics[]> {
    // Mock data - would fetch from social APIs
    return [
      {
        platform: 'instagram',
        followers: 2453,
        engagement_rate: 4.2,
        reach: 15600,
        impressions: 23400,
        growth_rate: 12.5
      },
      {
        platform: 'twitter',
        followers: 1876,
        engagement_rate: 3.8,
        reach: 8900,
        impressions: 12300,
        growth_rate: 8.7
      }
    ];
  },

  // AI Features
  async getAIContentSuggestions(userId: string, platform: string): Promise<AIContentSuggestion[]> {
    // Mock AI suggestions - would integrate with AI service
    return [
      {
        id: '1',
        platform,
        content: 'Share behind-the-scenes content to increase engagement',
        hashtags: ['#BTS', '#authentic', '#community'],
        optimal_time: new Date(Date.now() + 3600000), // 1 hour from now
        predicted_engagement: 8.5,
        confidence_score: 0.87
      }
    ];
  },

  async getAudienceInsights(userId: string, platform: string): Promise<AudienceInsight> {
    // Mock audience data - would fetch from social APIs
    return {
      platform,
      demographics: {
        age_groups: { '18-24': 35, '25-34': 40, '35-44': 20, '45+': 5 },
        gender: { 'male': 45, 'female': 52, 'other': 3 },
        locations: { 'US': 60, 'UK': 15, 'Canada': 12, 'Australia': 8, 'Other': 5 }
      },
      best_posting_times: ['9:00 AM', '1:00 PM', '7:00 PM', '9:00 PM'],
      engagement_patterns: { 'Monday': 85, 'Tuesday': 92, 'Wednesday': 88, 'Thursday': 95, 'Friday': 78, 'Saturday': 65, 'Sunday': 70 },
      content_performance: {
        content_types: { 'Videos': 87, 'Images': 65, 'Carousels': 78, 'Text Only': 42 },
        content_topics: { 'Educational': 92, 'Behind the Scenes': 78, 'User Generated': 83, 'Promotional': 51 },
        content_lengths: { 'Short (0-15s)': 89, 'Medium (15-60s)': 76, 'Long (60s+)': 45 }
      },
      hashtag_performance: {
        top_hashtags: ['#DigitalMarketing', '#ContentStrategy', '#SocialMediaTips', '#StartupLife', '#GrowthHacking'],
        reach_by_category: { 'Industry-Specific': 87, 'Location-Based': 62, 'Trending': 91, 'Brand-Specific': 76 },
        volume_analysis: { 'High Volume (1M+)': 42, 'Medium Volume (100K-1M)': 85, 'Low Volume (10K-100K)': 93, 'Micro Volume (<10K)': 68 }
      }
    };
  }
};
