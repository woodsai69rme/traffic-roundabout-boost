
import { supabase } from '@/integrations/supabase/client';

export interface Content {
  id: string;
  user_id: string;
  title: string;
  content: string;
  media_urls?: string[];
  platforms: string[];
  scheduled_for?: string;
  published_at?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  created_at: string;
  updated_at: string;
}

export const contentService = {
  async getContent(userId: string): Promise<Content[]> {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
      throw error;
    }

    return data || [];
  },

  async createContent(content: Omit<Content, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Content> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('content')
      .insert({
        ...content,
        user_id: user.id
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating content:', error);
      throw error;
    }

    return data;
  },

  async updateContent(id: string, updates: Partial<Content>): Promise<Content> {
    const { data, error } = await supabase
      .from('content')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content:', error);
      throw error;
    }

    return data;
  },

  async deleteContent(id: string): Promise<void> {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  },

  async getScheduledContent(userId: string): Promise<Content[]> {
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'scheduled')
      .order('scheduled_for', { ascending: true });

    if (error) {
      console.error('Error fetching scheduled content:', error);
      throw error;
    }

    return data || [];
  }
};
