
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlatformCardProps {
  platform: string;
  icon: string;
  color: string;
  description: string;
  userCount: number;
}

const PlatformCard = ({ platform, icon, color, description, userCount }: PlatformCardProps) => {
  return (
    <Card className="card-hover overflow-hidden border">
      <div className={`h-2 ${color}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{platform}</CardTitle>
          <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center`}>
            <img src={icon} alt={platform} className="w-5 h-5" />
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Active users</span>
          <span className="font-medium">{userCount.toLocaleString()}</span>
        </div>
        <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full ${color.replace('bg-', 'bg-opacity-80 ')} animate-pulse-light`} 
            style={{ width: `${Math.min(100, (userCount / 1500) * 100)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
