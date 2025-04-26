
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'comment',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        initials: 'SJ',
      },
      content: 'Left a comment on your YouTube video',
      item: '"How to Boost Your Instagram Engagement"',
      time: '2 hours ago',
      platform: 'youtube',
    },
    {
      id: 2,
      type: 'follow',
      user: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
        initials: 'MC',
      },
      content: 'Started following you on Twitter',
      item: '',
      time: '4 hours ago',
      platform: 'twitter',
    },
    {
      id: 3,
      type: 'like',
      user: {
        name: 'Emma Williams',
        avatar: 'https://i.pravatar.cc/150?img=3',
        initials: 'EW',
      },
      content: 'Liked your post on Instagram',
      item: '"5 Tips for Content Creators"',
      time: 'Yesterday',
      platform: 'instagram',
    },
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'David Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=4',
        initials: 'DR',
      },
      content: 'Mentioned you in a TikTok video',
      item: '"Creators to Follow in 2025"',
      time: '2 days ago',
      platform: 'tiktok',
    },
  ];

  const platformColorMap: Record<string, string> = {
    youtube: 'bg-red-500',
    twitter: 'bg-blue-500',
    instagram: 'bg-pink-500',
    tiktok: 'bg-black',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest interactions across your platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-sm text-muted-foreground">{activity.content}</span>
                </div>
                {activity.item && (
                  <p className="text-sm text-muted-foreground">{activity.item}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className={`w-2 h-2 rounded-full ${platformColorMap[activity.platform]}`}></div>
                  <span>{activity.platform}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
