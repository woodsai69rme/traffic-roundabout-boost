
import { supabase } from '@/integrations/supabase/client';

export interface SocialApiConfig {
  platform: string;
  api_key: string;
  api_secret: string;
  access_token: string;
  access_token_secret: string;
  connected: boolean;
  last_updated: string;
  id?: string;
  user_id?: string;
}

export interface Post {
  id: string;
  platform: string;
  content: string;
  media?: string[];
  scheduled_time: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

export interface HashtagAnalytics {
  hashtag: string;
  usage_count: number;
  reach: number;
  engagement_rate: number;
  trending_score: number;
}

export const fetchApiConfigurations = async (): Promise<SocialApiConfig[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('platform_connections')
    .select('*')
    .eq('user_id', user.id);
  
  if (error) {
    console.error('Error fetching API configurations:', error);
    return [];
  }
  return (data as SocialApiConfig[]) || [];
};

export const updateApiConfiguration = async (config: SocialApiConfig): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const submissionData = {
        user_id: user.id,
        platform: config.platform,
        api_key: config.api_key,
        api_secret: config.api_secret,
        access_token: config.access_token,
        access_token_secret: config.access_token_secret,
        connected: true,
        last_updated: new Date().toISOString()
    };

    const { error } = await supabase
        .from('platform_connections')
        .upsert(submissionData, { onConflict: 'user_id,platform' });

    if (error) {
        console.error('Error updating API configuration:', error);
        return false;
    }
    return true;
};

export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
        .from('platform_connections')
        .update({ 
            connected: false, 
            api_key: null, 
            api_secret: null, 
            access_token: null, 
            access_token_secret: null 
        })
        .eq('user_id', user.id)
        .eq('platform', platformId);
    
    if (error) {
        console.error('Error disconnecting platform:', error);
        return false;
    }
    return true;
};

export const fetchScheduledPosts = async (): Promise<Post[]> => {
  // Mock data for now - this would connect to actual social media APIs
  return [
    {
      id: '1',
      platform: 'instagram',
      content: 'Check out our latest feature! #excited #newfeature',
      media: ['/placeholder.svg'],
      scheduled_time: new Date(Date.now() + 3600000), // 1 hour from now
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 }
    },
    {
      id: '2', 
      platform: 'twitter',
      content: 'Just launched something amazing! What do you think? #launch #feedback',
      scheduled_time: new Date(Date.now() + 7200000), // 2 hours from now
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 }
    }
  ];
};

export const getHashtagAnalytics = async (platform: string): Promise<HashtagAnalytics[]> => {
  // Mock data - would connect to real analytics APIs
  return [
    { hashtag: '#socialmedia', usage_count: 245, reach: 12500, engagement_rate: 4.2, trending_score: 85 },
    { hashtag: '#marketing', usage_count: 189, reach: 9800, engagement_rate: 3.8, trending_score: 72 },
    { hashtag: '#content', usage_count: 156, reach: 8200, engagement_rate: 5.1, trending_score: 68 },
    { hashtag: '#business', usage_count: 134, reach: 7100, engagement_rate: 3.2, trending_score: 61 }
  ];
};
