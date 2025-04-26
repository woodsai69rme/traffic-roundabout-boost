
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Platform = {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  followers?: number;
  engagement?: number;
  growth?: number;
};

const PlatformConnect = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<Platform[]>([
    { id: 'youtube', name: 'YouTube', icon: '/platforms/youtube.svg', connected: false },
    { id: 'instagram', name: 'Instagram', icon: '/platforms/instagram.svg', connected: true, followers: 14500, engagement: 4.2, growth: 8.7 },
    { id: 'tiktok', name: 'TikTok', icon: '/platforms/tiktok.svg', connected: false },
    { id: 'twitter', name: 'Twitter', icon: '/platforms/twitter.svg', connected: true, followers: 8200, engagement: 2.8, growth: -1.2 },
    { id: 'twitch', name: 'Twitch', icon: '/platforms/twitch.svg', connected: false },
    { id: 'facebook', name: 'Facebook', icon: '/platforms/facebook.svg', connected: false },
    { id: 'linkedin', name: 'LinkedIn', icon: '/platforms/linkedin.svg', connected: false },
    { id: 'pinterest', name: 'Pinterest', icon: '/platforms/pinterest.svg', connected: false },
    { id: 'reddit', name: 'Reddit', icon: '/platforms/reddit.svg', connected: false },
    { id: 'snapchat', name: 'Snapchat', icon: '/platforms/snapchat.svg', connected: false },
  ]);

  const handleConnect = (platformId: string) => {
    // In a real app, this would open an OAuth flow
    toast({
      title: "Connecting to platform",
      description: "Opening authorization window...",
    });
    
    // Mock successful connection after a delay
    setTimeout(() => {
      setPlatforms(platforms.map(p => 
        p.id === platformId 
          ? { ...p, connected: true, followers: 5000, engagement: 3.5, growth: 5.2 } 
          : p
      ));
      
      toast({
        title: "Platform connected",
        description: `Successfully connected to ${platforms.find(p => p.id === platformId)?.name}`,
      });
    }, 2000);
  };

  const handleDisconnect = (platformId: string) => {
    // In a real app, this would revoke OAuth tokens
    setPlatforms(platforms.map(p => 
      p.id === platformId ? { ...p, connected: false } : p
    ));
    
    toast({
      title: "Platform disconnected",
      description: `Successfully disconnected from ${platforms.find(p => p.id === platformId)?.name}`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Connect Your Platforms</h2>
      <p className="text-muted-foreground">
        Link your social media accounts to Roundabout to analyze and grow your audience across platforms.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} className={`overflow-hidden border ${platform.connected ? 'border-green-500/50 dark:border-green-700/50' : ''}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-white">
                    <img 
                      src={platform.icon} 
                      alt={`${platform.name} logo`} 
                      className="w-5 h-5 object-contain" 
                    />
                  </div>
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                </div>
                {platform.connected && (
                  <div className="flex items-center text-xs text-green-600 dark:text-green-500">
                    <Check className="w-4 h-4 mr-1" />
                    <span>Connected</span>
                  </div>
                )}
              </div>
              <CardDescription>
                {platform.connected 
                  ? `${platform.followers?.toLocaleString()} followers` 
                  : "Not connected yet"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {platform.connected ? (
                <>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Engagement</p>
                      <p className="font-medium">{platform.engagement}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Growth</p>
                      <p className={`font-medium ${platform.growth && platform.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {platform.growth && platform.growth > 0 ? '+' : ''}{platform.growth}%
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                    onClick={() => handleDisconnect(platform.id)}
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full bg-gradient-to-r from-roundabout-purple to-roundabout-blue"
                  onClick={() => handleConnect(platform.id)}
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted p-4 rounded-lg flex items-start gap-3 mt-8">
        <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
        <div>
          <h3 className="font-medium mb-1">Important Note</h3>
          <p className="text-sm text-muted-foreground">
            Connecting your social media platforms allows Roundabout to analyze and display your data, but does not grant permission to post content. 
            You can disconnect your accounts at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformConnect;
