
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
    // Since we don't have the content table yet, return mock data
    const mockContent: Content[] = [
      {
        id: '1',
        user_id: userId,
        title: 'Welcome Post',
        content: 'Welcome to my social media presence!',
        platforms: ['twitter', 'linkedin'],
        status: 'published',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: new Date().toISOString()
      }
    ];

    return mockContent;
  },

  async createContent(content: Omit<Content, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Content> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Mock implementation - return the content with generated fields
    const newContent: Content = {
      id: Math.random().toString(36).substr(2, 9),
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...content
    };

    return newContent;
  },

  async updateContent(id: string, updates: Partial<Content>): Promise<Content> {
    // Mock implementation
    const mockContent: Content = {
      id,
      user_id: 'mock',
      title: 'Updated Post',
      content: 'Updated content',
      platforms: ['twitter'],
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...updates
    };

    return mockContent;
  },

  async deleteContent(id: string): Promise<void> {
    // Mock implementation
    console.log('Deleting content:', id);
  },

  async getScheduledContent(userId: string): Promise<Content[]> {
    const allContent = await this.getContent(userId);
    return allContent.filter(content => content.status === 'scheduled');
  }
};
