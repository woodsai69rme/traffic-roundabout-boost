import { supabase } from "@/integrations/supabase/client";

export interface SocialApiConfig {
  platform: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  connected: boolean;
  lastUpdated: string;
  id?: string;
}

export interface PlatformMetrics {
  followers: number;
  engagement: number;
  impressions: number;
  clicks: number;
  lastUpdated: string;
  demographics?: PlatformDemographics;
  growth?: number;
  reachRate?: number;
}

export interface PlatformDemographics {
  age?: Record<string, number>;
  gender?: Record<string, number>;
  location?: Record<string, number>;
  languages?: Record<string, number>;
}

export interface Post {
  id: string;
  platform: string;
  content: string;
  mediaUrls?: string[];
  scheduledTime?: string;
  publishedTime?: string;
  stats?: PostStats;
}

export interface PostStats {
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
  clicks?: number;
  impressions?: number;
  engagement?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface HashtagAnalytics {
  hashtag: string;
  posts: number;
  engagement: number;
  reach: number;
  growth: number;
  trending: boolean;
}

/**
 * Fetch all API configurations for the current authenticated user
 */
export const fetchApiConfigurations = async (): Promise<SocialApiConfig[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('platform_connections')
    .select('*')
    .eq('user_id', user.user.id);
  
  if (error) {
    console.error("Error fetching API configs:", error);
    throw new Error(`Failed to fetch API configurations: ${error.message}`);
  }
  
  return data.map(item => ({
    id: item.id,
    platform: item.platform,
    apiKey: item.api_key || '',
    apiSecret: item.api_secret || '',
    accessToken: item.access_token || '',
    accessTokenSecret: item.access_token_secret || '',
    connected: item.connected || false,
    lastUpdated: item.last_updated || new Date().toISOString()
  }));
};

/**
 * Get a single platform configuration by platform ID
 */
export const getPlatformConfig = async (platformId: string): Promise<SocialApiConfig | null> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('platform_connections')
    .select('*')
    .eq('user_id', user.user.id)
    .eq('platform', platformId)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') { // No rows returned
      return null;
    }
    console.error("Error fetching platform config:", error);
    throw new Error(`Failed to fetch platform configuration: ${error.message}`);
  }
  
  if (!data) return null;
  
  return {
    id: data.id,
    platform: data.platform,
    apiKey: data.api_key || '',
    apiSecret: data.api_secret || '',
    accessToken: data.access_token || '',
    accessTokenSecret: data.access_token_secret || '',
    connected: data.connected || false,
    lastUpdated: data.last_updated || new Date().toISOString()
  };
};

/**
 * Update or create an API configuration
 */
export const updateApiConfiguration = async (config: SocialApiConfig): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  // First test the platform connection
  try {
    const isValid = await testPlatformConnection(config);
    if (!isValid) {
      throw new Error(`Failed to connect to ${config.platform}`);
    }
  } catch (error) {
    console.error("Connection test failed:", error);
    throw new Error(`Connection test failed: ${error instanceof Error ? error.message : String(error)}`);
  }
  
  const { error } = await supabase
    .from('platform_connections')
    .upsert({
      user_id: user.user.id,
      platform: config.platform,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
      access_token: config.accessToken,
      access_token_secret: config.accessTokenSecret,
      connected: config.connected,
      last_updated: new Date().toISOString()
    });
  
  if (error) {
    console.error("Error updating API config:", error);
    throw new Error(`Failed to update API configuration: ${error.message}`);
  }
  
  return true;
};

/**
 * Disconnect a platform by ID
 */
export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { error } = await supabase
    .from('platform_connections')
    .update({ 
      connected: false, 
      last_updated: new Date().toISOString() 
    })
    .eq('user_id', user.user.id)
    .eq('platform', platformId);
  
  if (error) {
    console.error("Error disconnecting platform:", error);
    throw new Error(`Failed to disconnect platform: ${error.message}`);
  }
  
  return true;
};

/**
 * Delete a platform connection
 */
export const deletePlatformConnection = async (platformId: string): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { error } = await supabase
    .from('platform_connections')
    .delete()
    .eq('user_id', user.user.id)
    .eq('platform', platformId);
  
  if (error) {
    console.error("Error deleting platform connection:", error);
    throw new Error(`Failed to delete platform connection: ${error.message}`);
  }
  
  return true;
};

/**
 * Test a platform connection using the provided credentials
 */
export const testPlatformConnection = async (config: SocialApiConfig): Promise<boolean> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demonstration purposes, let's say the test passes if all required fields are filled
    const requiredFields = ['apiKey', 'apiSecret', 'accessToken', 'accessTokenSecret'];
    const missingFields = requiredFields.filter(field => !config[field as keyof SocialApiConfig]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // In reality, this would test the connection by making an actual API call
    return true;
  } catch (error) {
    console.error(`Connection test failed for ${config.platform}:`, error);
    throw error;
  }
};

/**
 * Create OAuth authorization URL for a platform
 */
export const createOAuthUrl = async (platform: string, redirectUri: string): Promise<string> => {
  // In a real implementation, this would be a call to a backend service
  // that generates the appropriate OAuth URLs based on the platform
  const baseOAuthUrls: Record<string, string> = {
    'twitter': 'https://twitter.com/i/oauth2/authorize',
    'facebook': 'https://www.facebook.com/v18.0/dialog/oauth',
    'instagram': 'https://api.instagram.com/oauth/authorize',
    'linkedin': 'https://www.linkedin.com/oauth/v2/authorization',
    'youtube': 'https://accounts.google.com/o/oauth2/v2/auth',
    'tiktok': 'https://www.tiktok.com/auth/authorize/',
    'pinterest': 'https://www.pinterest.com/oauth/',
    'reddit': 'https://www.reddit.com/api/v1/authorize',
    'snapchat': 'https://accounts.snapchat.com/accounts/oauth2/auth',
    'twitch': 'https://id.twitch.tv/oauth2/authorize'
  };
  
  const baseUrl = baseOAuthUrls[platform];
  if (!baseUrl) {
    throw new Error(`OAuth not supported for platform: ${platform}`);
  }
  
  // For demonstration purposes - in a real app this would be handled differently
  // This is simplified to show the concept - actual implementation would vary by platform
  const params = new URLSearchParams({
    client_id: 'YOUR_CLIENT_ID', // This would be retrieved from env variables
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'read,write',
    state: Math.random().toString(36).substring(2)
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Exchange OAuth code for access token
 */
export const exchangeCodeForToken = async (
  platform: string, 
  code: string, 
  redirectUri: string
): Promise<Partial<SocialApiConfig>> => {
  // In a real implementation, this would be a call to your backend service 
  // that exchanges the OAuth code for tokens using the appropriate endpoint for the platform
  
  // This is a simulated response - in a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock tokens - in reality, these would come from the platform's OAuth token endpoint
  return {
    platform,
    accessToken: `mock_access_token_for_${platform}_${Date.now()}`,
    accessTokenSecret: `mock_access_token_secret_for_${platform}_${Date.now()}`,
    connected: true
  };
};

/**
 * Fetch metrics for a specific platform
 * This would use the stored credentials to call the platform's API
 */
export const fetchPlatformMetrics = async (platform: string): Promise<PlatformMetrics> => {
  // Get the platform configuration with API keys
  const config = await getPlatformConfig(platform);
  if (!config || !config.connected) {
    throw new Error(`Platform ${platform} is not connected`);
  }
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data - in reality, this would be data from the platform API
    return {
      followers: Math.floor(Math.random() * 10000),
      engagement: Math.random() * 5,
      impressions: Math.floor(Math.random() * 50000),
      clicks: Math.floor(Math.random() * 2000),
      growth: (Math.random() * 10) - 2, // -2 to +8 percent
      reachRate: Math.random() * 20 + 10, // 10-30%
      lastUpdated: new Date().toISOString(),
      demographics: {
        age: {
          '18-24': 15 + Math.floor(Math.random() * 15),
          '25-34': 25 + Math.floor(Math.random() * 20),
          '35-44': 15 + Math.floor(Math.random() * 15),
          '45-54': 10 + Math.floor(Math.random() * 10),
          '55+': 5 + Math.floor(Math.random() * 5)
        },
        gender: {
          'male': 40 + Math.floor(Math.random() * 20),
          'female': 40 + Math.floor(Math.random() * 20),
          'other': Math.floor(Math.random() * 5)
        },
        location: {
          'United States': 40 + Math.floor(Math.random() * 20),
          'United Kingdom': 10 + Math.floor(Math.random() * 10),
          'Canada': 5 + Math.floor(Math.random() * 10),
          'Germany': 5 + Math.floor(Math.random() * 5),
          'Australia': 5 + Math.floor(Math.random() * 5),
          'Other': 10 + Math.floor(Math.random() * 10)
        }
      }
    };
  } catch (error) {
    console.error(`Error fetching metrics for ${platform}:`, error);
    throw new Error(`Failed to fetch metrics: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Fetch latest posts from a platform
 */
export const fetchLatestPosts = async (platform: string, limit = 10): Promise<Post[]> => {
  const config = await getPlatformConfig(platform);
  if (!config || !config.connected) {
    throw new Error(`Platform ${platform} is not connected`);
  }
  
  // In a real implementation, this would use the platform API
  // For now, we'll return mock data
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return Array.from({ length: limit }, (_, i) => ({
    id: `post_${i}_${Date.now()}`,
    platform,
    content: `Mock post ${i + 1} from ${platform}`,
    publishedTime: new Date(Date.now() - Math.random() * 604800000).toISOString(), // Random time in last week
    stats: {
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 20),
      shares: Math.floor(Math.random() * 10),
      saves: Math.floor(Math.random() * 5),
      clicks: Math.floor(Math.random() * 100),
      impressions: Math.floor(Math.random() * 500),
      engagement: Math.random() * 5 + 1 // 1-6%
    }
  }));
};

/**
 * Schedule a post to a platform
 */
export const schedulePost = async (
  platform: string, 
  content: string, 
  mediaUrls: string[] = [], 
  scheduledTime?: Date
): Promise<{id: string, scheduledTime: string}> => {
  const config = await getPlatformConfig(platform);
  if (!config || !config.connected) {
    throw new Error(`Platform ${platform} is not connected`);
  }
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const postTime = scheduledTime || new Date(Date.now() + 3600000); // Default 1 hour from now
  
  return {
    id: `scheduled_${platform}_${Date.now()}`,
    scheduledTime: postTime.toISOString()
  };
};

/**
 * Publish a post immediately to a platform
 */
export const publishPost = async (
  platform: string, 
  content: string, 
  mediaUrls: string[] = []
): Promise<{id: string, publishedTime: string}> => {
  const config = await getPlatformConfig(platform);
  if (!config || !config.connected) {
    throw new Error(`Platform ${platform} is not connected`);
  }
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const now = new Date();
  
  return {
    id: `post_${platform}_${Date.now()}`,
    publishedTime: now.toISOString()
  };
};

/**
 * Fetch scheduled posts for a platform or all platforms
 */
export const fetchScheduledPosts = async (platform?: string): Promise<Post[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Mock data - in a real app this would come from a database
  const mockScheduledPosts: Post[] = [
    {
      id: 'scheduled_1',
      platform: 'twitter',
      content: 'Check out our latest product update! #tech #innovation',
      scheduledTime: new Date(Date.now() + 3600000).toISOString(),
    },
    {
      id: 'scheduled_2',
      platform: 'instagram',
      content: 'Behind the scenes look at our design process',
      mediaUrls: ['/placeholder.svg'],
      scheduledTime: new Date(Date.now() + 7200000).toISOString(),
    },
    {
      id: 'scheduled_3',
      platform: 'linkedin',
      content: 'We\'re excited to announce our new partnership with Acme Inc.',
      scheduledTime: new Date(Date.now() + 86400000).toISOString(),
    },
    {
      id: 'scheduled_4',
      platform: 'facebook',
      content: 'Join our upcoming webinar on social media strategy',
      mediaUrls: ['/placeholder.svg'],
      scheduledTime: new Date(Date.now() + 172800000).toISOString(),
    }
  ];
  
  if (platform) {
    return mockScheduledPosts.filter(post => post.platform === platform);
  }
  
  return mockScheduledPosts;
};

/**
 * Delete a scheduled post
 */
export const deleteScheduledPost = async (postId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would delete from a database
  return true;
};

/**
 * Update a scheduled post
 */
export const updateScheduledPost = async (post: Post): Promise<Post> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // In a real app, this would update the database
  return {
    ...post,
  };
};

/**
 * Get best time to post recommendations for a platform
 */
export const getBestTimeToPost = async (platform: string): Promise<{day: string, time: string}[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Mock data - in a real app this would be based on audience analytics
  const mockTimes: Record<string, {day: string, time: string}[]> = {
    'twitter': [
      { day: 'Monday', time: '8:00' },
      { day: 'Wednesday', time: '12:00' },
      { day: 'Friday', time: '15:00' },
    ],
    'instagram': [
      { day: 'Tuesday', time: '11:00' },
      { day: 'Thursday', time: '17:00' },
      { day: 'Saturday', time: '20:00' },
    ],
    'facebook': [
      { day: 'Monday', time: '15:00' },
      { day: 'Wednesday', time: '13:00' },
      { day: 'Friday', time: '10:00' },
    ],
    'linkedin': [
      { day: 'Tuesday', time: '9:00' },
      { day: 'Thursday', time: '16:00' },
      { day: 'Wednesday', time: '11:00' },
    ]
  };
  
  return mockTimes[platform] || [];
};

/**
 * Get hashtag analytics and recommendations
 */
export const getHashtagAnalytics = async (platform: string, query?: string): Promise<HashtagAnalytics[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Mock data - in a real app this would come from platform analytics
  const mockHashtags: HashtagAnalytics[] = [
    { 
      hashtag: '#marketing', 
      posts: 8500, 
      engagement: 4.2, 
      reach: 25000, 
      growth: 15,
      trending: true 
    },
    { 
      hashtag: '#socialmedia', 
      posts: 12500, 
      engagement: 3.8, 
      reach: 45000, 
      growth: 8,
      trending: true 
    },
    { 
      hashtag: '#contentcreator', 
      posts: 7200, 
      engagement: 5.1, 
      reach: 18000, 
      growth: 22,
      trending: true 
    },
    { 
      hashtag: '#digitalmarketing', 
      posts: 9600, 
      engagement: 3.5, 
      reach: 28000, 
      growth: 5,
      trending: false 
    },
    { 
      hashtag: '#branding', 
      posts: 6300, 
      engagement: 4.0, 
      reach: 15000, 
      growth: 12,
      trending: false 
    },
  ];
  
  if (query) {
    return mockHashtags.filter(tag => tag.hashtag.includes(query));
  }
  
  return mockHashtags;
};

/**
 * Get competitor analysis data
 */
export const getCompetitorAnalysis = async (platform: string, competitors: string[]): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Mock data - in a real app this would come from analyzing competitor accounts
  return {
    followersComparison: {
      you: 8500,
      competitors: competitors.map((name, i) => ({ 
        name, 
        value: 5000 + (i * 4000) + Math.floor(Math.random() * 2000) 
      }))
    },
    engagementComparison: {
      you: 4.2,
      competitors: competitors.map((name, i) => ({ 
        name, 
        value: 2.8 + (Math.random() * 3) 
      }))
    },
    postFrequencyComparison: {
      you: 5.2, // posts per week
      competitors: competitors.map((name, i) => ({ 
        name, 
        value: 3.5 + (Math.random() * 5) 
      }))
    },
    contentTypeBreakdown: {
      you: {
        image: 45,
        video: 30,
        text: 15,
        other: 10
      },
      competitors: competitors.map((name) => ({ 
        name, 
        image: 20 + Math.floor(Math.random() * 40),
        video: 20 + Math.floor(Math.random() * 30),
        text: 10 + Math.floor(Math.random() * 20),
        other: 5 + Math.floor(Math.random() * 10)
      }))
    }
  };
};

/**
 * Get audience demographics for a platform
 */
export const getAudienceDemographics = async (platform: string): Promise<PlatformDemographics> => {
  // Get the platform metrics which include demographics
  const metrics = await fetchPlatformMetrics(platform);
  
  return metrics.demographics || {
    age: {},
    gender: {},
    location: {},
    languages: {}
  };
};

/**
 * Get content performance by type
 */
export const getContentPerformanceByType = async (platform: string): Promise<any> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Mock data - in a real app this would come from content analytics
  return [
    { type: 'Image', engagement: 4.2, impressions: 1200, clicks: 85 },
    { type: 'Video', engagement: 5.8, impressions: 1800, clicks: 120 },
    { type: 'Carousel', engagement: 6.1, impressions: 1500, clicks: 105 },
    { type: 'Text', engagement: 2.9, impressions: 950, clicks: 42 },
    { type: 'Link', engagement: 3.5, impressions: 1100, clicks: 95 },
  ];
};
