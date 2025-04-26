
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Users, Eye, Share2, Clock } from 'lucide-react';

const DashboardSummary = () => {
  // Mock data - in a real app this would come from API
  const stats = [
    {
      title: 'Total Followers',
      value: '24,531',
      change: 12.5,
      isPositive: true,
      icon: Users,
    },
    {
      title: 'Total Views',
      value: '1.2M',
      change: 8.3,
      isPositive: true,
      icon: Eye,
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: -2.1,
      isPositive: false,
      icon: Share2,
    },
    {
      title: 'Avg. Watch Time',
      value: '4:32',
      change: 15.7,
      isPositive: true,
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-bold mt-2 mb-4">{stat.value}</h2>
                <div className="flex items-center">
                  {stat.isPositive ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(stat.change).toFixed(1)}%
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardSummary;
