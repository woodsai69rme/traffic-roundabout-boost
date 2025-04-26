
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UserProfileCardProps {
  name: string;
  username: string;
  avatarUrl: string;
  platform: string;
  platformLogo: string;
  followers: number;
  content: number;
}

const UserProfileCard = ({ 
  name, 
  username, 
  avatarUrl, 
  platform, 
  platformLogo, 
  followers, 
  content 
}: UserProfileCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-24 bg-gradient-to-r from-roundabout-purple to-roundabout-blue"></div>
      </CardHeader>
      <CardContent className="pt-0 -mt-12">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden">
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <h3 className="mt-3 font-semibold text-lg">{name}</h3>
          <p className="text-muted-foreground text-sm">@{username}</p>
          
          <div className="flex items-center mt-2 bg-muted px-3 py-1 rounded-full">
            <img src={platformLogo} alt={platform} className="w-4 h-4 mr-1" />
            <span className="text-xs">{platform}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full mt-4">
            <div className="text-center">
              <p className="text-muted-foreground text-xs">Followers</p>
              <p className="font-semibold">{followers.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-xs">Content</p>
              <p className="font-semibold">{content}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" size="sm" className="w-full">
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfileCard;
