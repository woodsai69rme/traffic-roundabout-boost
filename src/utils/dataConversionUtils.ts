
/**
 * Utility functions for converting data between different formats
 */

/**
 * Convert an array of objects to CSV format
 * @param data Array of objects to convert
 * @returns CSV formatted string
 */
export const convertToCSV = (data: Record<string, any>[]): string => {
  if (data.length === 0) return '';
  
  // Extract headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV header row
  const headerRow = headers.join(',');
  
  // Create CSV data rows
  const rows = data.map(obj => 
    headers.map(header => {
      const value = obj[header];
      
      // Handle null/undefined
      if (value === null || value === undefined) return '';
      
      // Handle strings (escape quotes and commas)
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      }
      
      // Handle objects/arrays (convert to JSON string)
      if (typeof value === 'object') {
        return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      }
      
      // Return as-is for numbers, booleans
      return value;
    }).join(',')
  );
  
  // Combine header and rows
  return [headerRow, ...rows].join('\n');
};

/**
 * Read contents of a file based on its type
 * @param file File object to read
 * @param fileType Type of file (json, csv, excel)
 * @returns Promise resolving to the file contents
 */
export const readFileContents = async (file: File, fileType: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const result = event.target?.result as string;
        
        switch (fileType) {
          case 'json':
            resolve(JSON.parse(result));
            break;
            
          case 'csv':
            // Basic CSV parsing - in a real app, use a proper CSV parser
            const lines = result.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            const data = [];
            
            for (let i = 1; i < lines.length; i++) {
              if (!lines[i].trim()) continue;
              
              const values = lines[i].split(',');
              const row = {};
              
              for (let j = 0; j < headers.length; j++) {
                // @ts-ignore - Dynamic property assignment
                row[headers[j]] = values[j]?.trim() || '';
              }
              
              data.push(row);
            }
            
            resolve(data);
            break;
            
          case 'xlsx':
          case 'xls':
            // In a real app, use a library like xlsx to parse Excel files
            resolve({ error: 'Excel parsing requires a dedicated library' });
            break;
            
          default:
            resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    if (fileType === 'json' || fileType === 'csv' || fileType === 'txt') {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  });
};

/**
 * Generate template data for various formats
 * @returns Object containing template data for different formats
 */
export const generateTemplateData = () => {
  const jsonTemplates = {
    analytics: [
      {
        date: "2023-01-01",
        platform: "twitter",
        followers: 1240,
        engagement: 3.2,
        impressions: 5600,
        clicks: 230
      },
      {
        date: "2023-01-02",
        platform: "twitter",
        followers: 1255,
        engagement: 3.5,
        impressions: 6100,
        clicks: 245
      }
    ],
    posts: [
      {
        id: "post_001",
        platform: "twitter",
        content: "Sample post content",
        published: true,
        publishedAt: "2023-01-01T12:00:00Z",
        metrics: {
          likes: 45,
          comments: 12,
          shares: 8
        }
      }
    ],
    accounts: [
      {
        platform: "twitter",
        username: "example_user",
        apiKey: "YOUR_API_KEY",
        apiSecret: "YOUR_API_SECRET",
        accessToken: "YOUR_ACCESS_TOKEN",
        accessTokenSecret: "YOUR_ACCESS_TOKEN_SECRET"
      }
    ],
    engagements: [
      {
        id: "eng_001",
        type: "like",
        platform: "twitter",
        postId: "post_001",
        userId: "user_123",
        createdAt: "2023-01-01T12:30:00Z"
      }
    ]
  };
  
  const csvTemplates = {
    analytics: 'date,platform,followers,engagement,impressions,clicks\n2023-01-01,twitter,1240,3.2,5600,230\n2023-01-02,twitter,1255,3.5,6100,245',
    posts: 'id,platform,content,published,publishedAt,likes,comments,shares\npost_001,twitter,"Sample post content",true,2023-01-01T12:00:00Z,45,12,8',
    accounts: 'platform,username,apiKey,apiSecret,accessToken,accessTokenSecret\ntwitter,example_user,YOUR_API_KEY,YOUR_API_SECRET,YOUR_ACCESS_TOKEN,YOUR_ACCESS_TOKEN_SECRET',
    engagements: 'id,type,platform,postId,userId,createdAt\neng_001,like,twitter,post_001,user_123,2023-01-01T12:30:00Z'
  };
  
  const excel = 'This would be an Excel file template in a production environment.';
  
  return {
    json: jsonTemplates,
    csv: csvTemplates,
    excel
  };
};
