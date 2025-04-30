
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
      <div className="text-center p-8 border rounded-md bg-muted/50">
        <Calendar className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
        <h3 className="font-medium mb-1">No posts scheduled</h3>
        <p className="text-muted-foreground text-sm">
          Schedule posts to see them appear here.
        </p>
      </div>
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
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                    <img src={platform.icon} alt={platform.name} className="w-4 h-4" />
                  </div>
                  <Badge variant="outline" className="capitalize">{platform.name}</Badge>
                </div>
                {post.scheduledTime && (
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{format(new Date(post.scheduledTime), 'MMM d, p')}</span>
                  </div>
                )}
              </div>
              
              <p className="text-sm mb-3">{post.content}</p>
              
              {post.mediaUrls && post.mediaUrls.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.mediaUrls.map((media, idx) => (
                    <div key={idx} className="w-16 h-16 rounded-md bg-muted overflow-hidden">
                      <img 
                        src={media} 
                        alt={`Media ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex justify-end gap-2 mt-2">
                {onEdit && (
                  <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => onEdit(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
                {onPublishNow && (
                  <Button size="icon" variant="ghost" className="h-8 w-8" title="Publish now" onClick={() => onPublishNow(post)}>
                    <Share className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => onDelete(post)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ScheduledPostsList;
