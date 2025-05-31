
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactElement;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.startsWith('+')) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (trend.startsWith('-')) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className="flex items-center pt-1">
            {getTrendIcon()}
            <span className="text-xs text-muted-foreground ml-1">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
