
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContentCardProps {
  title: string;
  thumbnail: string;
  creator: string;
  creatorAvatar: string;
  platform: string;
  platformLogo: string;
  views: number;
  likes: number;
  date: string;
}

const ContentCard = ({
  title,
  thumbnail,
  creator,
  creatorAvatar,
  platform,
  platformLogo,
  views,
  likes,
  date,
}: ContentCardProps) => {
  return (
    <Card className="card-hover overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative pb-[56.25%] overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title} 
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
            <img src={platformLogo} alt={platform} className="w-3 h-3 mr-1" />
            {platform}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="font-medium text-base line-clamp-2 mb-2">{title}</h3>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
            <img src={creatorAvatar} alt={creator} className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium line-clamp-1">{creator}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <div className="flex justify-between mt-3 text-xs text-muted-foreground">
          <span>{views.toLocaleString()} views</span>
          <span>{likes.toLocaleString()} likes</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Engage
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
