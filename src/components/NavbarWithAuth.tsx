
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { TrendingUp, Users, BarChart3, Calendar, Sparkles, DollarSign, BookOpen } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import NotificationCenter from './NotificationCenter';
import { useAuth } from '@/hooks/use-auth';
import UserProfileMenu from './UserProfileMenu';

const NavbarWithAuth = () => {
  const { user, isLoading } = useAuth();

  const mainNavItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart3 className="h-4 w-4 mr-2" />
    },
    {
      title: 'Growth Tools',
      href: '#',
      icon: <TrendingUp className="h-4 w-4 mr-2" />,
      subItems: [
        {
          title: 'Platform Connections',
          href: '/platforms',
          description: 'Connect and manage your social media accounts'
        },
        {
          title: 'Content Planner',
          href: '/content-planner',
          description: 'Schedule and plan your content across platforms'
        },
        {
          title: 'AI Content Creator',
          href: '/ai-content-creator',
          description: 'Generate engaging content with AI assistance'
        }
      ]
    },
    {
      title: 'Analytics',
      href: '#',
      icon: <BarChart3 className="h-4 w-4 mr-2" />,
      subItems: [
        {
          title: 'Performance Analytics',
          href: '/analytics',
          description: 'Track your growth and engagement metrics'
        },
        {
          title: 'Audience Insights',
          href: '/audience-insights',
          description: 'Understand your audience demographics and behavior'
        }
      ]
    },
    {
      title: 'Community',
      href: '/communities',
      icon: <Users className="h-4 w-4 mr-2" />
    },
    {
      title: 'Monetization',
      href: '/monetization',
      icon: <DollarSign className="h-4 w-4 mr-2" />
    },
    {
      title: 'Docs',
      href: '/docs',
      icon: <BookOpen className="h-4 w-4 mr-2" />
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="rounded-full w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="font-bold text-white text-sm">R</span>
            </div>
            <span className="hidden font-bold sm:inline-block">
              Roundabout WebTraffic
            </span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {mainNavItems.map((item) => 
                item.subItems ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="h-auto">
                      <span className="flex items-center">
                        {item.icon}
                        {item.title}
                      </span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.title} className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                to={subItem.href}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  {subItem.title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <Link to={item.href}>
                      <NavigationMenuLink 
                        className={cn(
                          "flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
                        )}
                      >
                        {item.icon}
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" asChild>
            <Link to="/notifications">
              <NotificationCenter />
            </Link>
          </Button>
          <div className="hidden md:flex">
            <NotificationCenter />
          </div>
          
          <ThemeToggle />
          
          {!isLoading && user ? (
            <UserProfileMenu />
          ) : (
            !isLoading && (
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarWithAuth;
