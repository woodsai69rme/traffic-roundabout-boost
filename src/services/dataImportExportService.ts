
import { supabase } from '@/integrations/supabase/client';
import type { SocialApiConfig } from './socialApiIntegrations';

export interface ExportData {
  platforms: SocialApiConfig[];
  posts: any[];
  analytics: any[];
  settings: any;
  timestamp: string;
}

export interface ImportOptions {
  overwriteExisting: boolean;
  selectiveImport: {
    platforms: boolean;
    posts: boolean;
    analytics: boolean;
    settings: boolean;
  };
}

class DataImportExportService {
  async exportUserData(userId: string): Promise<ExportData> {
    try {
      console.log('Exporting data for user:', userId);
      
      // Export platform connections
      const { data: platforms, error: platformsError } = await supabase
        .from('platform_connections')
        .select('*')
        .eq('user_id', userId);
      
      if (platformsError) throw platformsError;

      // Export posts (mock data for now)
      const posts = [
        {
          id: '1',
          platform: 'instagram',
          content: 'Sample post content',
          status: 'published',
          created_at: new Date().toISOString()
        }
      ];

      // Export analytics (mock data)
      const analytics = [
        {
          platform: 'instagram',
          followers: 1250,
          engagement_rate: 4.2,
          date: new Date().toISOString()
        }
      ];

      // Export settings (mock data)
      const settings = {
        notifications: true,
        auto_post: false,
        theme: 'light'
      };

      return {
        platforms: platforms?.map(p => ({
          platform: p.platform,
          api_key: p.api_key || '',
          api_secret: p.api_secret || '',
          access_token: p.access_token || '',
          access_token_secret: p.access_token_secret || '',
          connected: p.connected || false,
          last_updated: p.last_updated || new Date().toISOString()
        })) || [],
        posts,
        analytics,
        settings,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Export failed:', error);
      throw new Error('Failed to export user data');
    }
  }

  async importUserData(userId: string, data: ExportData, options: ImportOptions): Promise<boolean> {
    try {
      console.log('Importing data for user:', userId, options);

      if (options.selectiveImport.platforms && data.platforms) {
        for (const platform of data.platforms) {
          const { error } = await supabase
            .from('platform_connections')
            .upsert({
              user_id: userId,
              platform: platform.platform,
              api_key: platform.api_key,
              api_secret: platform.api_secret,
              access_token: platform.access_token,
              access_token_secret: platform.access_token_secret,
              connected: platform.connected,
              last_updated: platform.last_updated
            }, { onConflict: 'user_id,platform' });

          if (error) throw error;
        }
      }

      // Import other data types would go here
      console.log('Import completed successfully');
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      throw new Error('Failed to import user data');
    }
  }

  async exportToJSON(data: ExportData): Promise<string> {
    return JSON.stringify(data, null, 2);
  }

  async exportToCSV(data: ExportData): Promise<string> {
    // Simple CSV export for platforms
    const headers = ['Platform', 'Connected', 'Last Updated'];
    const rows = data.platforms.map(p => [
      p.platform,
      p.connected.toString(),
      p.last_updated
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  parseImportFile(fileContent: string, fileType: 'json' | 'csv'): ExportData {
    try {
      if (fileType === 'json') {
        return JSON.parse(fileContent);
      } else {
        // Parse CSV (simplified)
        const lines = fileContent.split('\n');
        const headers = lines[0].split(',');
        const platforms = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            platform: values[0],
            api_key: '',
            api_secret: '',
            access_token: '',
            access_token_secret: '',
            connected: values[1] === 'true',
            last_updated: values[2] || new Date().toISOString()
          };
        });

        return {
          platforms,
          posts: [],
          analytics: [],
          settings: {},
          timestamp: new Date().toISOString()
        };
      }
    } catch (error) {
      throw new Error('Invalid file format');
    }
  }

  validateImportData(data: any): data is ExportData {
    return (
      typeof data === 'object' &&
      Array.isArray(data.platforms) &&
      Array.isArray(data.posts) &&
      Array.isArray(data.analytics) &&
      typeof data.settings === 'object' &&
      typeof data.timestamp === 'string'
    );
  }
}

export const dataImportExportService = new DataImportExportService();
