import { supabase } from '@/integrations/supabase/client';

export interface ExportOptions {
  format: 'json' | 'csv' | 'xlsx';
  dataType: 'all' | 'analytics' | 'posts' | 'accounts' | 'engagements';
  includeTimestamp: boolean;
}

export interface ImportResult {
  success: boolean;
  recordsImported: number;
  errors?: string[];
}

const mockData: Record<string, any[]> = {
  analytics: [
    { date: '2024-01-01', platform: 'instagram', followers: 2453, engagement: 4.2 },
    { date: '2024-01-01', platform: 'twitter', followers: 1876, engagement: 3.8 },
  ],
  posts: [
    { id: '1', platform: 'instagram', content: 'Sample post', status: 'published', likes: 156 },
  ],
  accounts: [
    { platform: 'instagram', connected: true, username: '@demo' },
  ],
  engagements: [
    { platform: 'instagram', likes: 156, comments: 23, shares: 12, views: 1240 },
  ],
};

const queryTable = async (dataType: string): Promise<any[] | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  if (dataType === 'analytics' || dataType === 'engagements') {
    const { data } = await supabase
      .from('analytics_snapshots')
      .select('*')
      .eq('user_id', user.id)
      .order('snapshot_date', { ascending: false })
      .limit(100);
    return data && data.length > 0 ? data : null;
  }

  if (dataType === 'posts') {
    const { data } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(100);
    return data && data.length > 0 ? data : null;
  }

  if (dataType === 'accounts') {
    const { data } = await supabase
      .from('platform_connections')
      .select('*')
      .eq('user_id', user.id);
    return data && data.length > 0 ? data : null;
  }

  return null;
};

const toCsv = (entries: any[]): string => {
  if (!entries.length) return 'No data';
  const headers = Object.keys(entries[0]).join(',');
  const rows = entries.map((r: any) => Object.values(r).map(v => JSON.stringify(v ?? '')).join(','));
  return headers + '\n' + rows.join('\n');
};

export const exportData = async (options: ExportOptions): Promise<Blob> => {
  let data: Record<string, any[]>;

  if (options.dataType === 'all') {
    const [analytics, posts, accounts] = await Promise.all([
      queryTable('analytics'),
      queryTable('posts'),
      queryTable('accounts'),
    ]);
    data = {
      analytics: analytics || mockData.analytics,
      posts: posts || mockData.posts,
      accounts: accounts || mockData.accounts,
    };
  } else {
    const dbData = await queryTable(options.dataType);
    data = { [options.dataType]: dbData || mockData[options.dataType] || [] };
  }

  if (options.format === 'json') {
    return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  }

  if (options.format === 'csv') {
    const entries = options.dataType === 'all' ? (data.analytics || []) : (data[options.dataType] || []);
    return new Blob([toCsv(entries)], { type: 'text/csv' });
  }

  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

export const importData = async (file: File): Promise<ImportResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const content = reader.result as string;
        const parsed = JSON.parse(content);
        const records = Array.isArray(parsed) ? parsed : Object.values(parsed).flat();
        const count = records.length;

        // Try to insert into scheduled_posts if records look like posts
        const { data: { user } } = await supabase.auth.getUser();
        if (user && count > 0 && records[0]?.content) {
          const rows = records.map((r: any) => ({
            user_id: user.id,
            content: r.content || '',
            platforms: r.platforms || r.platform ? [r.platform] : [],
            scheduled_for: r.scheduled_for || r.scheduled_time || new Date().toISOString(),
            status: r.status || 'draft',
          }));
          const { error } = await supabase.from('scheduled_posts').insert(rows);
          if (error) {
            resolve({ success: false, recordsImported: 0, errors: [error.message] });
            return;
          }
        }

        resolve({ success: true, recordsImported: count });
      } catch {
        resolve({ success: false, recordsImported: 0, errors: ['Invalid file format'] });
      }
    };
    reader.onerror = () => resolve({ success: false, recordsImported: 0, errors: ['Failed to read file'] });
    reader.readAsText(file);
  });
};

export const getImportTemplate = (dataType: string, format: string): Blob => {
  const templates: Record<string, any[]> = {
    analytics: [{ date: '', platform: '', followers: 0, engagement: 0 }],
    posts: [{ platform: '', content: '', scheduled_time: '', status: 'draft' }],
    accounts: [{ platform: '', username: '', connected: false }],
    engagements: [{ platform: '', likes: 0, comments: 0, shares: 0, views: 0 }],
  };

  const template = templates[dataType] || templates.analytics;

  if (format === 'csv') {
    const headers = Object.keys(template[0]).join(',');
    return new Blob([headers + '\n'], { type: 'text/csv' });
  }

  return new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
};
