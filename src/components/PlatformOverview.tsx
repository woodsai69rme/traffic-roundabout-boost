
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface PlatformOverviewProps {
  accounts: Array<{
    id: string;
    platform: string;
    username?: string;
    is_active: boolean;
  }>;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({ accounts }) => {
  const platforms = [
    { name: 'Twitter', key: 'twitter' },
    { name: 'LinkedIn', key: 'linkedin' },
    { name: 'Facebook', key: 'facebook' },
    { name: 'Instagram', key: 'instagram' },
  ];

  const getAccountStatus = (platformKey: string) => {
    const account = accounts.find(acc => acc.platform === platformKey);
    return account && account.is_active;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Platforms</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {platforms.map((platform) => {
          const isConnected = getAccountStatus(platform.key);
          const account = accounts.find(acc => acc.platform === platform.key);
          
          return (
            <div key={platform.key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {isConnected ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
                <span className="font-medium">{platform.name}</span>
                {account?.username && (
                  <span className="text-sm text-muted-foreground">@{account.username}</span>
                )}
              </div>
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Connected" : "Not Connected"}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
