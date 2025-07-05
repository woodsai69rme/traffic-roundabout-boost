
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit, Share, Trash } from 'lucide-react';
import { platforms } from '@/services/platforms';
import { Post } from '@/services/socialApiIntegrations';

interface ScheduledPostsListProps {
  posts: Post[];
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  onPublishNow?: (post: Post) => void;
}

const ScheduledPostsList = ({ 
  posts, 
  onEdit, 
  onDelete, 
  onPublishNow 
}: ScheduledPostsListProps) => {
  const getPlatformDetails = (platformId: string) => {
    return platforms.find(p => p.id === platformId) || {
      name: platformId,
      icon: '/placeholder.svg',
      color: 'bg-gray-500'
    };
  };

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="text-center p-8">
          <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium mb-1">No scheduled posts</h3>
          <p className="text-muted-foreground text-sm">
            Posts you schedule will appear here for easy management.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => {
        const platform = getPlatformDetails(post.platform);
        
        return (
          <Card key={post.id} className="overflow-hidden">
            <div className={`h-1 ${platform.color}`}></div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border flex items-center justify-center">
                    <img src={platform.icon} alt={platform.name} className="w-5 h-5" />
                  </div>
                  <div>
                    <Badge variant="outline" className="capitalize mb-1">
                      {platform.name}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{format(new Date(post.scheduled_time), 'MMM d, yyyy at h:mm a')}</span>
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={post.status === 'scheduled' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {post.status}
                </Badge>
              </div>
              
              <p className="text-sm mb-3 line-clamp-3">{post.content}</p>
              
              {post.media && post.media.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.media.slice(0, 3).map((media, idx) => (
                    <div key={idx} className="w-16 h-16 rounded-md bg-muted overflow-hidden">
                      <img 
                        src={media} 
                        alt={`Media ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {post.media.length > 3 && (
                    <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      +{post.media.length - 3}
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {post.engagement.likes + post.engagement.comments + post.engagement.shares} interactions
                </div>
                <div className="flex gap-1">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onEdit?.(post)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onPublishNow?.(post)}
                    className="h-8 w-8 p-0"
                    title="Publish now"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => onDelete?.(post)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ScheduledPostsList;
