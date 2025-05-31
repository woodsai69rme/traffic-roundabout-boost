
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
    // Mock data since the social_accounts table doesn't exist yet
    const mockAccounts: SocialAccount[] = [
      {
        id: '1',
        user_id: userId,
        platform: 'twitter',
        platform_user_id: 'twitter_123',
        username: 'user123',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: userId,
        platform: 'linkedin',
        platform_user_id: 'linkedin_456',
        username: 'user456',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];

    return mockAccounts;
  },

  async connectAccount(account: Omit<SocialAccount, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<SocialAccount> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Mock implementation
    const newAccount: SocialAccount = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...account
    };

    return newAccount;
  },

  async disconnectAccount(id: string): Promise<void> {
    // Mock implementation
    console.log('Disconnecting account:', id);
  },

  async updateTokens(id: string, tokens: { access_token?: string; refresh_token?: string; token_expires_at?: string }): Promise<void> {
    // Mock implementation
    console.log('Updating tokens for account:', id, tokens);
  }
};
