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

export const exportData = async (options: ExportOptions): Promise<Blob> => {
  const data = options.dataType === 'all' ? mockData : { [options.dataType]: mockData[options.dataType] || [] };

  if (options.format === 'json') {
    return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  }

  if (options.format === 'csv') {
    const entries = options.dataType === 'all' ? mockData.analytics : (mockData[options.dataType] || []);
    if (!Array.isArray(entries) || entries.length === 0) {
      return new Blob(['No data'], { type: 'text/csv' });
    }
    const headers = Object.keys(entries[0]).join(',');
    const rows = entries.map((r: any) => Object.values(r).join(','));
    return new Blob([headers + '\n' + rows.join('\n')], { type: 'text/csv' });
  }

  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

export const importData = async (file: File): Promise<ImportResult> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = reader.result as string;
        const parsed = JSON.parse(content);
        const count = Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length;
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
