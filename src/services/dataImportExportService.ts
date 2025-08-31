
import { supabase } from '@/integrations/supabase/client';

export interface ExportOptions {
  format: 'json' | 'csv' | 'xlsx';
  includeAnalytics?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface ImportOptions {
  format: 'json' | 'csv' | 'xlsx';
  overwrite?: boolean;
  validateData?: boolean;
}

export interface ExportData {
  posts: any[];
  analytics: any[];
  platforms: any[];
  metadata: {
    exportDate: string;
    totalRecords: number;
    format: string;
  };
}

export const exportData = async (options: ExportOptions): Promise<ExportData> => {
  try {
    // Fetch posts data
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('*');

    if (postsError) throw postsError;

    // Fetch analytics data if requested
    let analytics = [];
    if (options.includeAnalytics) {
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('analytics')
        .select('*');

      if (analyticsError) throw analyticsError;
      analytics = analyticsData || [];
    }

    // Fetch platforms data
    const { data: platforms, error: platformsError } = await supabase
      .from('platforms')
      .select('*');

    if (platformsError) throw platformsError;

    const exportData: ExportData = {
      posts: posts || [],
      analytics,
      platforms: platforms || [],
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: (posts?.length || 0) + analytics.length + (platforms?.length || 0),
        format: options.format,
      },
    };

    return exportData;
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const importData = async (file: File, options: ImportOptions): Promise<void> => {
  try {
    const text = await file.text();
    let data;

    switch (options.format) {
      case 'json':
        data = JSON.parse(text);
        break;
      case 'csv':
        // Simple CSV parsing - in production, use a proper CSV parser
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        data = lines.slice(1).map(line => {
          const values = line.split(',');
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim();
          });
          return obj;
        });
        break;
      default:
        throw new Error(`Unsupported format: ${options.format}`);
    }

    // Validate data if requested
    if (options.validateData) {
      if (!data || !Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
    }

    // Import posts if they exist in the data
    if (data.posts && Array.isArray(data.posts)) {
      for (const post of data.posts) {
        const { error } = await supabase
          .from('posts')
          .upsert(post, { onConflict: 'id' });

        if (error) throw error;
      }
    }

    // Import platforms if they exist in the data
    if (data.platforms && Array.isArray(data.platforms)) {
      for (const platform of data.platforms) {
        const { error } = await supabase
          .from('platforms')
          .upsert(platform, { onConflict: 'id' });

        if (error) throw error;
      }
    }

    console.log('Import completed successfully');
  } catch (error) {
    console.error('Import failed:', error);
    throw new Error(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const getImportTemplate = (format: 'json' | 'csv' | 'xlsx') => {
  const template = {
    posts: [
      {
        id: 'example-id',
        content: 'Example post content',
        platform: 'twitter',
        scheduled_time: '2024-01-01T12:00:00Z',
        status: 'scheduled',
        created_at: '2024-01-01T10:00:00Z'
      }
    ],
    platforms: [
      {
        id: 'example-platform-id',
        name: 'Twitter',
        type: 'twitter',
        is_connected: true,
        created_at: '2024-01-01T10:00:00Z'
      }
    ]
  };

  switch (format) {
    case 'json':
      return JSON.stringify(template, null, 2);
    case 'csv':
      // Simple CSV template for posts
      return 'id,content,platform,scheduled_time,status,created_at\nexample-id,Example post content,twitter,2024-01-01T12:00:00Z,scheduled,2024-01-01T10:00:00Z';
    default:
      return JSON.stringify(template, null, 2);
  }
};

export const downloadFile = (content: string, filename: string, mimeType: string = 'application/json') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
