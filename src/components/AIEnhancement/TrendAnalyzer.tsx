
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Hash, Clock, Target } from 'lucide-react';

interface Trend {
  id: string;
  topic: string;
  platform: string;
  score: number;
  growth: number;
  hashtags: string[];
  category: string;
}

const TrendAnalyzer = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading trending topics
    setTimeout(() => {
      const mockTrends: Trend[] = [
        {
          id: '1',
          topic: 'Sustainable Living',
          platform: 'Instagram',
          score: 95,
          growth: 23.5,
          hashtags: ['#sustainable', '#ecofriendly', '#zerowaste', '#green'],
          category: 'Lifestyle'
        },
        {
          id: '2',
          topic: 'AI Tools for Business',
          platform: 'LinkedIn',
          score: 88,
          growth: 45.2,
          hashtags: ['#AI', '#business', '#productivity', '#automation'],
          category: 'Technology'
        },
        {
          id: '3',
          topic: 'Mental Health Awareness',
          platform: 'TikTok',
          score: 92,
          growth: 18.7,
          hashtags: ['#mentalhealth', '#selfcare', '#wellness', '#mindfulness'],
          category: 'Health'
        },
        {
          id: '4',
          topic: 'Remote Work Tips',
          platform: 'Twitter',
          score: 76,
          growth: 12.3,
          hashtags: ['#remotework', '#wfh', '#productivity', '#worklife'],
          category: 'Work'
        }
      ];
      
      setTrends(mockTrends);
      setLoading(false);
    }, 1500);
  }, []);

  const getPlatformColor = (platform: string) => {
    switch(platform.toLowerCase()) {
      case 'instagram': return 'bg-purple-100 text-purple-800';
      case 'linkedin': return 'bg-blue-100 text-blue-800';
      case 'twitter': return 'bg-sky-100 text-sky-800';
      case 'tiktok': return 'bg-black text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trend Analyzer</CardTitle>
          <CardDescription>Loading trending topics...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trending Topics Analysis
        </CardTitle>
        <CardDescription>
          Discover trending topics across platforms to inspire your content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {trends.map((trend) => (
            <div key={trend.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium">{trend.topic}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getPlatformColor(trend.platform)}>
                      {trend.platform}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{trend.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-600 flex items-center">
                    +{trend.growth}% <TrendingUp className="h-3 w-3 ml-1" />
                  </div>
                  <div className="text-xs text-muted-foreground">growth this week</div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>Trend Score</span>
                  <span className="font-medium">{trend.score}/100</span>
                </div>
                <Progress value={trend.score} className={getScoreColor(trend.score)} />
              </div>
              
              <div>
                <div className="flex items-center gap-1 mb-2 text-sm">
                  <Hash className="h-4 w-4" />
                  <span>Related Hashtags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trend.hashtags.map((tag, i) => (
                    <Badge key={i} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Best posting time: 7PM - 9PM</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span>25-34 age demographic</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendAnalyzer;
