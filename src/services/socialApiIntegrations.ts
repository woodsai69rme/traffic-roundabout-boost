
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
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
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
  // In a real implementation, this would make a test API call to the platform
  // using the provided credentials to verify they work
  
  // For now, we'll simulate an API call
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
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Error fetching metrics for ${platform}:`, error);
    throw new Error(`Failed to fetch metrics: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Fetch latest posts from a platform
 */
export const fetchLatestPosts = async (platform: string, limit = 10): Promise<any[]> => {
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
    engagement: Math.floor(Math.random() * 100),
    likes: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 20),
    comments: Math.floor(Math.random() * 10),
    date: new Date(Date.now() - Math.random() * 604800000).toISOString() // Random time in last week
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
