
/**
 * Helper functions for converting and parsing different data formats
 */

/**
 * Convert data to CSV format
 * @param data Array of objects to be converted to CSV
 * @returns CSV formatted string
 */
export const convertToCSV = (data: any[]): string => {
  if (!data || !data.length) return '';
  
  // For an array of objects, extract headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create the header row
  const csvRows = [headers.join(',')];
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

/**
 * Parse CSV string to array of objects
 * @param csv CSV formatted string
 * @returns Array of objects
 */
export const parseCSV = (csv: string): any[] => {
  // This is a simplified CSV parser
  // In a real app, you would use a CSV parsing library
  
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const values = lines[i].split(',');
    const row: Record<string, string> = {};
    
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j];
    }
    
    result.push(row);
  }
  
  return result;
};

/**
 * Read file contents based on file type
 * @param file File to read
 * @param fileType Type of file (json, csv, xlsx, etc)
 * @returns Promise resolving to parsed file content
 */
export const readFileContents = async (file: File, fileType: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        
        if (typeof content !== 'string') {
          throw new Error('Failed to read file content');
        }
        
        switch (fileType) {
          case 'json':
            resolve(JSON.parse(content));
            break;
            
          case 'csv':
            resolve(parseCSV(content));
            break;
            
          case 'xlsx':
          case 'xls':
            // In a real app, this would use a library to parse Excel files
            resolve({ message: 'Excel parsing would be implemented in production' });
            break;
            
          default:
            throw new Error(`Unsupported file type: ${fileType}`);
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    if (fileType === 'json' || fileType === 'csv' || fileType === 'txt') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};

/**
 * Generate template data for different formats
 * @returns Object containing template data for different formats
 */
export const generateTemplateData = () => {
  return {
    json: {
      'analytics': { date: 'YYYY-MM-DD', views: 0, engagements: 0, followers: 0 },
      'posts': { content: 'Post content', platform: 'platform_id', scheduledFor: 'YYYY-MM-DD' },
      'accounts': { platform: 'platform_id', apiKey: 'your_api_key', connected: true },
      'engagements': { date: 'YYYY-MM-DD', type: 'like|comment', postId: 'post_id' }
    },
    csv: {
      'analytics': 'date,views,engagements,followers\nYYYY-MM-DD,0,0,0',
      'posts': 'content,platform,scheduledFor\nPost content,platform_id,YYYY-MM-DD',
      'accounts': 'platform,apiKey,connected\nplatform_id,your_api_key,true',
      'engagements': 'date,type,postId\nYYYY-MM-DD,like,post_id'
    },
    excel: 'This would be an Excel template in a production environment.'
  };
};
