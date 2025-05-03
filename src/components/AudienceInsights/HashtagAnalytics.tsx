
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { getHashtagAnalytics } from '@/services/socialApiIntegrations';

interface HashtagAnalyticsProps {
  platform: string;
}

interface Hashtag {
  hashtag: string;
  posts: number;
  engagement: number;
  reach: number;
  growth: number;
  trending: boolean;
}

const HashtagAnalytics: React.FC<HashtagAnalyticsProps> = ({ platform }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hashtags, setHashtags] = useState<Hashtag[]>([
    { hashtag: '#marketing', posts: 8500, engagement: 4.2, reach: 25000, growth: 15, trending: true },
    { hashtag: '#socialmedia', posts: 12500, engagement: 3.8, reach: 45000, growth: 8, trending: true },
    { hashtag: '#contentcreator', posts: 7200, engagement: 5.1, reach: 18000, growth: 22, trending: true },
    { hashtag: '#digitalmarketing', posts: 9600, engagement: 3.5, reach: 28000, growth: 5, trending: false },
    { hashtag: '#branding', posts: 6300, engagement: 4.0, reach: 15000, growth: 12, trending: false }
  ]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const data = await getHashtagAnalytics(platform, searchQuery);
      setHashtags(data);
    } catch (error) {
      console.error("Error searching hashtags:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hashtag Analytics</CardTitle>
        <CardDescription>Research and analyze hashtags for {platform}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <Input 
            placeholder="Search hashtags" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : <Search className="h-4 w-4" />}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4">Hashtag</th>
                <th className="text-right py-2 px-4">Posts</th>
                <th className="text-right py-2 px-4">Engagement</th>
                <th className="text-right py-2 px-4">Reach</th>
                <th className="text-right py-2 px-4">Growth</th>
                <th className="text-center py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {hashtags.map((hashtag, index) => (
                <tr key={index} className="border-b hover:bg-muted/50">
                  <td className="py-2 px-4">{hashtag.hashtag}</td>
                  <td className="text-right py-2 px-4">{hashtag.posts.toLocaleString()}</td>
                  <td className="text-right py-2 px-4">{hashtag.engagement.toFixed(1)}%</td>
                  <td className="text-right py-2 px-4">{hashtag.reach.toLocaleString()}</td>
                  <td className="text-right py-2 px-4 text-green-500">+{hashtag.growth}%</td>
                  <td className="text-center py-2 px-4">
                    {hashtag.trending ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Trending
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HashtagAnalytics;
