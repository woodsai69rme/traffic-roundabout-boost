
import React, { useState } from 'react';
import {
  Bell,
  Check,
  User,
  MessageSquare,
  Heart,
  Award
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock data - in a real app this would come from an API
const mockNotifications = [
  {
    id: 1,
    type: 'follow',
    read: false,
    message: 'John Doe started following you',
    time: '5 minutes ago',
    icon: User
  },
  {
    id: 2,
    type: 'comment',
    read: false,
    message: 'Jane Smith commented on your post',
    time: '2 hours ago',
    icon: MessageSquare
  },
  {
    id: 3,
    type: 'like',
    read: true,
    message: 'Your post received 50 likes',
    time: 'Yesterday',
    icon: Heart
  },
  {
    id: 4,
    type: 'achievement',
    read: true,
    message: 'You reached 1,000 followers!',
    time: '3 days ago',
    icon: Award
  }
];

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center">
              <span className="text-xs">{unreadCount}</span>
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[330px] p-0">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-auto py-1 px-2"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="max-h-[60vh]">
          {notifications.length > 0 ? (
            <div>
              {notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`flex items-start p-4 gap-3 hover:bg-muted cursor-pointer ${!notification.read ? 'bg-muted/50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className={`rounded-full p-2 ${!notification.read ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20'}`}>
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              <p>No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
