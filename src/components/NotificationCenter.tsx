
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  type: 'system' | 'alert' | 'engagement';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  platform?: string;
}

const NotificationCenter = () => {
  // Sample notifications - in a real app, these would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'engagement',
      title: 'New followers',
      description: 'You gained 5 new followers on Instagram',
      timestamp: '10 minutes ago',
      read: false,
      platform: 'instagram'
    },
    {
      id: '2',
      type: 'alert',
      title: 'Post scheduled',
      description: 'Your post has been scheduled for tomorrow at 3:00 PM',
      timestamp: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'system',
      title: 'System update',
      description: 'The platform will be updated tonight at 2:00 AM',
      timestamp: '3 hours ago',
      read: true
    },
    {
      id: '4',
      type: 'engagement',
      title: 'Post performing well',
      description: 'Your latest post is performing 25% better than average',
      timestamp: '5 hours ago',
      read: true,
      platform: 'twitter'
    },
    {
      id: '5',
      type: 'alert',
      title: 'API limit reached',
      description: 'You\'ve reached 80% of your API limit for Instagram',
      timestamp: '1 day ago',
      read: true
    },
  ]);

  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.2rem] min-h-[1.2rem] flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
            Mark all read
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0">
            <NotificationsList 
              notifications={notifications} 
              onMarkAsRead={handleMarkAsRead} 
            />
          </TabsContent>
          
          <TabsContent value="engagement" className="m-0">
            <NotificationsList 
              notifications={notifications.filter(n => n.type === 'engagement')} 
              onMarkAsRead={handleMarkAsRead} 
            />
          </TabsContent>
          
          <TabsContent value="alert" className="m-0">
            <NotificationsList 
              notifications={notifications.filter(n => n.type === 'alert')} 
              onMarkAsRead={handleMarkAsRead} 
            />
          </TabsContent>
          
          <TabsContent value="system" className="m-0">
            <NotificationsList 
              notifications={notifications.filter(n => n.type === 'system')} 
              onMarkAsRead={handleMarkAsRead} 
            />
          </TabsContent>
        </Tabs>
        
        <div className="p-2 border-t">
          <Button variant="ghost" className="w-full text-sm" size="sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

interface NotificationsListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationsList = ({ notifications, onMarkAsRead }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <Bell className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">No notifications</p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[320px]">
      <div className="divide-y">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 hover:bg-muted/50 ${notification.read ? '' : 'bg-muted/20'}`}
            onClick={() => onMarkAsRead(notification.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {notification.type === 'system' && (
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-blue-500" />
                  </div>
                )}
                {notification.type === 'alert' && (
                  <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-amber-500" />
                  </div>
                )}
                {notification.type === 'engagement' && (
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">
                  {notification.title}
                  {notification.platform && (
                    <Badge variant="outline" className="ml-2 py-0 px-1">
                      {notification.platform}
                    </Badge>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.timestamp}
                </p>
              </div>
              
              {!notification.read && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationCenter;
