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

  if (error || !data) return [];

  return data.map((row) => ({
    platform: row.platform,
    api_key: '',
    api_secret: '',
    access_token: row.access_token || '',
    access_token_secret: '',
    connected: row.status === 'connected',
    last_updated: row.updated_at,
    id: row.id,
    user_id: row.user_id,
  }));
};

export const updateApiConfiguration = async (config: SocialApiConfig): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('platform_connections')
    .upsert({
      id: config.id || undefined,
      user_id: user.id,
      platform: config.platform,
      access_token: config.access_token,
      status: 'connected',
      connected_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

  return !error;
};

export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('platform_connections')
    .update({ status: 'disconnected', access_token: null, updated_at: new Date().toISOString() })
    .eq('user_id', user.id)
    .eq('platform', platformId);

  return !error;
};

export const fetchScheduledPosts = async (): Promise<Post[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('scheduled_posts')
    .select('*')
    .eq('user_id', user.id)
    .order('scheduled_for', { ascending: true });

  if (error || !data || data.length === 0) {
    // Return mock fallback so UI isn't empty for new users
    return [
      {
        id: 'demo-1',
        platform: 'instagram',
        content: 'Check out our latest feature! #excited #newfeature',
        media: ['/placeholder.svg'],
        scheduled_time: new Date(Date.now() + 3600000),
        status: 'scheduled',
        engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      },
      {
        id: 'demo-2',
        platform: 'twitter',
        content: 'Just launched something amazing! #launch #feedback',
        scheduled_time: new Date(Date.now() + 7200000),
        status: 'scheduled',
        engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
      },
    ];
  }

  return data.map((row) => ({
    id: row.id,
    platform: row.platforms[0] || 'unknown',
    content: row.content,
    media: row.media_urls || [],
    scheduled_time: new Date(row.scheduled_for),
    status: row.status as Post['status'],
    engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
  }));
};

export const getHashtagAnalytics = async (_platform: string): Promise<HashtagAnalytics[]> => {
  return [
    { hashtag: '#socialmedia', usage_count: 245, reach: 12500, engagement_rate: 4.2, trending_score: 85 },
    { hashtag: '#marketing', usage_count: 189, reach: 9800, engagement_rate: 3.8, trending_score: 72 },
    { hashtag: '#content', usage_count: 156, reach: 8200, engagement_rate: 5.1, trending_score: 68 },
    { hashtag: '#business', usage_count: 134, reach: 7100, engagement_rate: 3.2, trending_score: 61 },
  ];
};
