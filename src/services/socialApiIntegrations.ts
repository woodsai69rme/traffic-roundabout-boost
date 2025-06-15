
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

    // Supabase client automatically handles camelCase to snake_case conversion,
    // but being explicit helps with clarity when dealing with DB schemas.
    // The key is that the object properties match what the form and components use.
    // Let's stick to camelCase for JS/TS consistency and let the client handle it.
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
