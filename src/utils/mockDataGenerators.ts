
/**
 * Helper functions for generating mock data for demonstration purposes
 */

/**
 * Generate mock analytics data
 * @returns Array of analytics data objects
 */
export const generateMockAnalytics = (): any[] => {
  const days = 30;
  const result = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    result.push({
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 1000),
      engagements: Math.floor(Math.random() * 500),
      clicks: Math.floor(Math.random() * 200),
      followers: 1000 + Math.floor(Math.random() * 50) - 25
    });
  }
  
  return result;
};

/**
 * Generate mock posts data
 * @returns Array of post data objects
 */
export const generateMockPosts = (): any[] => {
  const count = 20;
  const platforms = ['twitter', 'facebook', 'instagram', 'linkedin'];
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    result.push({
      id: `post_${i}_${Date.now()}`,
      content: `This is a sample post #${i}`,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      published: Math.random() > 0.2,
      publishedAt: date.toISOString(),
      likes: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 30),
      comments: Math.floor(Math.random() * 20)
    });
  }
  
  return result;
};

/**
 * Generate mock engagements data
 * @returns Array of engagement data objects
 */
export const generateMockEngagements = (): any[] => {
  const count = 50;
  const types = ['like', 'comment', 'share', 'follow'];
  const platforms = ['twitter', 'facebook', 'instagram', 'linkedin'];
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    result.push({
      id: `eng_${i}_${Date.now()}`,
      type: types[Math.floor(Math.random() * types.length)],
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      postId: `post_${Math.floor(Math.random() * 20)}_${Date.now() - 86400000}`,
      userId: `user_${Math.floor(Math.random() * 1000)}`,
      createdAt: date.toISOString()
    });
  }
  
  return result;
};
