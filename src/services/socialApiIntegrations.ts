
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

// In-memory mock store
let mockConfigs: SocialApiConfig[] = [];

export const fetchApiConfigurations = async (): Promise<SocialApiConfig[]> => {
  return [...mockConfigs];
};

export const updateApiConfiguration = async (config: SocialApiConfig): Promise<boolean> => {
  const idx = mockConfigs.findIndex(c => c.platform === config.platform);
  const entry: SocialApiConfig = {
    ...config,
    connected: true,
    last_updated: new Date().toISOString(),
    id: config.id || crypto.randomUUID(),
    user_id: config.user_id || 'mock-user',
  };
  if (idx >= 0) {
    mockConfigs[idx] = entry;
  } else {
    mockConfigs.push(entry);
  }
  return true;
};

export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  const idx = mockConfigs.findIndex(c => c.platform === platformId);
  if (idx >= 0) {
    mockConfigs[idx] = { ...mockConfigs[idx], connected: false, api_key: '', api_secret: '', access_token: '', access_token_secret: '' };
  }
  return true;
};

export const fetchScheduledPosts = async (): Promise<Post[]> => {
  return [
    {
      id: '1',
      platform: 'instagram',
      content: 'Check out our latest feature! #excited #newfeature',
      media: ['/placeholder.svg'],
      scheduled_time: new Date(Date.now() + 3600000),
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    },
    {
      id: '2',
      platform: 'twitter',
      content: 'Just launched something amazing! #launch #feedback',
      scheduled_time: new Date(Date.now() + 7200000),
      status: 'scheduled',
      engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    },
  ];
};

export const getHashtagAnalytics = async (platform: string): Promise<HashtagAnalytics[]> => {
  return [
    { hashtag: '#socialmedia', usage_count: 245, reach: 12500, engagement_rate: 4.2, trending_score: 85 },
    { hashtag: '#marketing', usage_count: 189, reach: 9800, engagement_rate: 3.8, trending_score: 72 },
    { hashtag: '#content', usage_count: 156, reach: 8200, engagement_rate: 5.1, trending_score: 68 },
    { hashtag: '#business', usage_count: 134, reach: 7100, engagement_rate: 3.2, trending_score: 61 },
  ];
};
