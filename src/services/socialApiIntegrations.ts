
import { supabase } from "@/integrations/supabase/client";

export interface SocialApiConfig {
  platform: string;
  apiKey?: string;
  apiSecret?: string;
  accessToken?: string;
  accessTokenSecret?: string;
  connected: boolean;
  lastUpdated: string;
}

export interface ApiPostOptions {
  content: string;
  mediaUrls?: string[];
  scheduledTime?: string;
  platformIds: string[];
}

export interface ApiPostResponse {
  success: boolean;
  postId?: string;
  url?: string;
  platformId: string;
  error?: string;
}

// Function to fetch all API configurations for the current user
export async function fetchApiConfigurations(): Promise<SocialApiConfig[]> {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    // In a real implementation, this would fetch from a Supabase table
    const { data, error } = await supabase
      .from('platform_connections')
      .select('*')
      .eq('user_id', user.user.id);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching API configurations:", error);
    return [];
  }
}

// Function to update an API configuration
export async function updateApiConfiguration(config: SocialApiConfig): Promise<boolean> {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    // In a real implementation, this would update a Supabase table
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

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating API configuration:", error);
    return false;
  }
}

// Function to disconnect a platform
export async function disconnectPlatform(platformId: string): Promise<boolean> {
  try {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error("User not authenticated");
    }

    // In a real implementation, this would update a Supabase table
    const { error } = await supabase
      .from('platform_connections')
      .update({ 
        connected: false,
        access_token: null,
        access_token_secret: null
      })
      .eq('user_id', user.user.id)
      .eq('platform', platformId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error disconnecting platform:", error);
    return false;
  }
}

// Function to post content to connected platforms
export async function postToSocialPlatforms(options: ApiPostOptions): Promise<ApiPostResponse[]> {
  // In a real implementation, this would call Supabase Edge Functions to post to each platform
  const responses: ApiPostResponse[] = [];
  
  for (const platformId of options.platformIds) {
    try {
      // This would be an edge function call in a real implementation
      const response = await supabase.functions.invoke('post-to-platform', {
        body: {
          platform: platformId,
          content: options.content,
          mediaUrls: options.mediaUrls,
          scheduledTime: options.scheduledTime
        }
      });
      
      responses.push({
        success: true,
        platformId,
        postId: response.data?.postId,
        url: response.data?.url
      });
    } catch (error) {
      console.error(`Error posting to ${platformId}:`, error);
      responses.push({
        success: false,
        platformId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  return responses;
}
