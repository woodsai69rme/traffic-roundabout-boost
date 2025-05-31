
import { supabase } from '@/integrations/supabase/client';

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: string;
  platform_user_id: string;
  username?: string;
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const socialAccountService = {
  async getSocialAccounts(userId: string): Promise<SocialAccount[]> {
    const { data, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching social accounts:', error);
      throw error;
    }

    return data || [];
  },

  async connectAccount(account: Omit<SocialAccount, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<SocialAccount> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('social_accounts')
      .upsert({
        ...account,
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error connecting account:', error);
      throw error;
    }

    return data;
  },

  async disconnectAccount(id: string): Promise<void> {
    const { error } = await supabase
      .from('social_accounts')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error disconnecting account:', error);
      throw error;
    }
  },

  async updateTokens(id: string, tokens: { access_token?: string; refresh_token?: string; token_expires_at?: string }): Promise<void> {
    const { error } = await supabase
      .from('social_accounts')
      .update(tokens)
      .eq('id', id);

    if (error) {
      console.error('Error updating tokens:', error);
      throw error;
    }
  }
};
