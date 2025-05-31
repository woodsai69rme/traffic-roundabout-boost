
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Eye, Download, TrendingUp } from 'lucide-react';

const ResumeStats = () => {
  const stats = [
    {
      title: 'Total Resumes',
      value: '3',
      change: '+1 this month',
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Profile Views',
      value: '127',
      change: '+23% from last month',
      icon: Eye,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Downloads',
      value: '45',
      change: '+12 this week',
      icon: Download,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'Applications',
      value: '17',
      change: '+5 pending',
      icon: TrendingUp,
      color: 'bg-orange-500/10 text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResumeStats;
