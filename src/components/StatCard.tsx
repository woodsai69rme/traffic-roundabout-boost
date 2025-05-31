
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, change, icon, color }: StatCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className={`pb-2 ${color.includes('bg-') ? '' : color}`}>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            {change !== undefined && (
              <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                <span className="text-muted-foreground ml-1">from last month</span>
              </p>
            )}
          </div>
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
