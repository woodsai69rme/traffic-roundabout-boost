
export interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  followers: number;
  engagement_rate: number;
  last_post: string;
}

export interface ContentPost {
  id: string;
  platform: string;
  content: string;
  media_urls: string[];
  scheduled_time: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

export interface EngagementMetrics {
  platform: string;
  followers: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
  growth_rate: number;
}

export interface AIContentSuggestion {
  id: string;
  platform: string;
  content: string;
  hashtags: string[];
  optimal_time: Date;
  predicted_engagement: number;
  confidence_score: number;
}

export interface AudienceInsight {
  platform: string;
  demographics: {
    age_groups: Record<string, number>;
    gender: Record<string, number>;
    locations: Record<string, number>;
  };
  best_posting_times: string[];
  engagement_patterns: Record<string, number>;
  content_performance: {
    content_types: Record<string, number>;
    content_topics: Record<string, number>;
    content_lengths: Record<string, number>;
  };
  hashtag_performance: {
    top_hashtags: string[];
    reach_by_category: Record<string, number>;
    volume_analysis: Record<string, number>;
  };
}
