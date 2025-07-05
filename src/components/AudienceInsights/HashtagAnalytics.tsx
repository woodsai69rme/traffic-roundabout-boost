
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Hash, TrendingUp, Users, Eye } from 'lucide-react';
import { getHashtagAnalytics, HashtagAnalytics as HashtagData } from '@/services/socialApiIntegrations';

interface HashtagAnalyticsProps {
  platform: string;
}

const HashtagAnalytics = ({ platform }: HashtagAnalyticsProps) => {
  const [hashtags, setHashtags] = useState<HashtagData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHashtags = async () => {
      setLoading(true);
      try {
        const data = await getHashtagAnalytics(platform);
        setHashtags(data);
      } catch (error) {
        console.error('Error loading hashtag analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHashtags();
  }, [platform]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Hashtag Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading hashtag analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Hash className="h-5 w-5" />
          Hashtag Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Top Hashtags */}
          <div>
            <h4 className="font-medium mb-3">Top Performing Hashtags</h4>
            <div className="flex flex-wrap gap-2">
              {hashtags.slice(0, 10).map((hashtag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-sm py-1 px-3"
                >
                  {hashtag.hashtag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="space-y-4">
            <h4 className="font-medium">Detailed Analytics</h4>
            {hashtags.map((hashtag, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h5 className="font-medium">{hashtag.hashtag}</h5>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">{hashtag.trending_score}%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{hashtag.usage_count}</div>
                      <div className="text-muted-foreground">Uses</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{hashtag.reach.toLocaleString()}</div>
                      <div className="text-muted-foreground">Reach</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{hashtag.engagement_rate}%</div>
                      <div className="text-muted-foreground">Engagement</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Trend Score</div>
                    <Progress value={hashtag.trending_score} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HashtagAnalytics;
