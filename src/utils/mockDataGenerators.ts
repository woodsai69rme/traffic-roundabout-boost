
/**
 * Helper functions for generating mock data for demonstration purposes
 */

/**
 * Generate a random number within a range
 * @param min Minimum value (inclusive)
 * @param max Maximum value (inclusive)
 * @returns Random number within the specified range
 */
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate a date in the past
 * @param daysBack Maximum number of days in the past
 * @returns Date object
 */
const randomPastDate = (daysBack: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, daysBack));
  return date;
};

/**
 * Generate mock analytics data
 * @param days Number of days to generate data for
 * @returns Array of analytics data objects
 */
export const generateMockAnalytics = (days: number = 30): any[] => {
  const result = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    result.push({
      date: date.toISOString().split('T')[0],
      views: randomInt(500, 1500),
      engagements: randomInt(200, 700),
      clicks: randomInt(50, 250),
      followers: 1000 + randomInt(-25, 50)
    });
  }
  
  // Sort by date ascending
  return result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

/**
 * Available platforms for mock data
 */
const PLATFORMS = ['twitter', 'facebook', 'instagram', 'linkedin'];

/**
 * Generate mock posts data
 * @param count Number of posts to generate
 * @returns Array of post data objects
 */
export const generateMockPosts = (count: number = 20): any[] => {
  const result = [];
  const timestamp = Date.now();
  
  for (let i = 0; i < count; i++) {
    const publishDate = randomPastDate(30);
    const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
    
    result.push({
      id: `post_${i}_${timestamp}`,
      content: `This is a sample post #${i} for ${platform}`,
      platform,
      published: Math.random() > 0.2,
      publishedAt: publishDate.toISOString(),
      likes: randomInt(0, 100),
      shares: randomInt(0, 30),
      comments: randomInt(0, 20)
    });
  }
  
  // Sort by published date descending (newest first)
  return result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

/**
 * Generate mock engagements data
 * @param count Number of engagements to generate
 * @returns Array of engagement data objects
 */
export const generateMockEngagements = (count: number = 50): any[] => {
  const types = ['like', 'comment', 'share', 'follow'];
  const result = [];
  const timestamp = Date.now();
  
  for (let i = 0; i < count; i++) {
    const date = randomPastDate(30);
    const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    
    result.push({
      id: `eng_${i}_${timestamp}`,
      type,
      platform,
      postId: `post_${randomInt(0, 19)}_${timestamp - 86400000}`,
      userId: `user_${randomInt(0, 1000)}`,
      createdAt: date.toISOString()
    });
  }
  
  // Sort by createdAt date descending (newest first)
  return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

/**
 * Generate mock performance data for platforms
 * @returns Object containing performance metrics by platform
 */
export const generateMockPlatformPerformance = (): Record<string, any> => {
  return PLATFORMS.reduce((acc, platform) => {
    acc[platform] = {
      followers: randomInt(1000, 10000),
      engagement: +(Math.random() * 5).toFixed(2),
      impressions: randomInt(10000, 100000),
      clicks: randomInt(500, 5000),
      growth: +(Math.random() * 10 - 2).toFixed(1), // Growth rate from -2% to 8%
      lastUpdated: new Date().toISOString()
    };
    return acc;
  }, {} as Record<string, any>);
};
