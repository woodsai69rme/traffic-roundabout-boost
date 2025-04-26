
import { supabase } from "@/integrations/supabase/client";

export interface SocialApiConfig {
  platform: string;
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  connected: boolean;
  lastUpdated: string;
}

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
    platform: item.platform,
    apiKey: item.api_key || '',
    apiSecret: item.api_secret || '',
    accessToken: item.access_token || '',
    accessTokenSecret: item.access_token_secret || '',
    connected: item.connected || false,
    lastUpdated: item.last_updated || new Date().toISOString()
  }));
};

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

export const disconnectPlatform = async (platformId: string): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { error } = await supabase
    .from('platform_connections')
    .update({ connected: false })
    .eq('user_id', user.user.id)
    .eq('platform', platformId);
  
  if (error) {
    console.error("Error disconnecting platform:", error);
    throw error;
  }
  
  return true;
};
