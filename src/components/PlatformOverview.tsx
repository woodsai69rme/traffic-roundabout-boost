
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

const PlatformOverview = () => {
  // Mock data for platform stats
  const platforms = [
    {
      name: 'YouTube',
      username: '@techcreator',
      followers: 15420,
      growth: 4.8,
      engagement: 5.2,
      progress: 78,
      status: 'Monetized',
    },
    {
      name: 'Instagram',
      username: '@tech.creator',
      followers: 24150,
      growth: 2.3,
      engagement: 4.5,
      progress: 65,
      status: 'Growing',
    },
    {
      name: 'TikTok',
      username: '@techcreator',
      followers: 18730,
      growth: 12.5,
      engagement: 7.8,
      progress: 86,
      status: 'Trending',
    },
    {
      name: 'Twitter',
      username: '@techcreator',
      followers: 9840,
      growth: -1.2,
      engagement: 3.1,
      progress: 42,
      status: 'Needs Work',
    },
  ];

  const platformColorMap: Record<string, string> = {
    YouTube: 'bg-red-500',
    Instagram: 'bg-pink-500',
    TikTok: 'bg-black',
    Twitter: 'bg-blue-500',
    Facebook: 'bg-blue-600',
    LinkedIn: 'bg-blue-700',
    Pinterest: 'bg-red-600',
    Twitch: 'bg-purple-500',
  };

  const statusColorMap: Record<string, string> = {
    Monetized: 'bg-green-500/10 text-green-500 border-green-500/20',
    Growing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Trending: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'Needs Work': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  };

  return (
    <div className="space-y-6">
      {platforms.map((platform, index) => (
        <Card key={index} className="overflow-hidden">
          <div className={`h-1 ${platformColorMap[platform.name] || 'bg-gray-500'}`}></div>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-bold">{platform.name}</CardTitle>
                <CardDescription>{platform.username}</CardDescription>
              </div>
              <Badge variant="outline" className={statusColorMap[platform.status]}>
                {platform.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Followers</span>
                  <span className="text-sm font-medium">{platform.followers.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${platform.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {platform.growth >= 0 ? '+' : ''}{platform.growth}%
                  </span>
                  <span className="text-xs text-muted-foreground">this month</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Engagement Rate</span>
                  <span className="text-sm font-medium">{platform.engagement}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Industry avg: 2.5%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Growth Score</span>
                  <span className="text-sm font-medium">{platform.progress}/100</span>
                </div>
                <Progress value={platform.progress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlatformOverview;
