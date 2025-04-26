
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
    throw error;
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
    throw error;
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
    throw error;
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
    .update({ connected: false, last_updated: new Date().toISOString() })
    .eq('user_id', user.user.id)
    .eq('platform', platformId);
  
  if (error) {
    console.error("Error disconnecting platform:", error);
    throw error;
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
    throw error;
  }
  
  return true;
};

/**
 * Fetch metrics for a specific platform
 * In a real application, this might call the platform's API
 * using the stored credentials
 */
export const fetchPlatformMetrics = async (platform: string): Promise<PlatformMetrics> => {
  // This is a mock implementation
  // In a real app, you would use the stored API credentials to call the platform's API
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data
  return {
    followers: Math.floor(Math.random() * 10000),
    engagement: Math.random() * 5,
    impressions: Math.floor(Math.random() * 50000),
    clicks: Math.floor(Math.random() * 2000),
    lastUpdated: new Date().toISOString()
  };
};

/**
 * Test a platform connection using the provided credentials
 */
export const testPlatformConnection = async (config: SocialApiConfig): Promise<boolean> => {
  // This is a mock implementation
  // In a real app, you would make a test call to the platform's API
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Always return success for now
  return true;
};
