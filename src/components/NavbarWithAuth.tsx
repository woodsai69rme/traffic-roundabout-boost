
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { FileText, Users, Layout, PieChart, Calendar, Sparkles, DollarSign, BookOpen } from 'lucide-react';
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
      icon: <Layout className="h-4 w-4 mr-2" />
    },
    {
      title: 'Resume Builder',
      href: '#',
      icon: <FileText className="h-4 w-4 mr-2" />,
      subItems: [
        {
          title: 'Create Resume',
          href: '/resume-builder',
          description: 'Build a new professional resume from scratch'
        },
        {
          title: 'Browse Templates',
          href: '/templates',
          description: 'Choose from our collection of professional templates'
        }
      ]
    },
    {
      title: 'Analytics',
      href: '/analytics',
      icon: <PieChart className="h-4 w-4 mr-2" />
    },
    {
      title: 'Tools',
      href: '#',
      icon: <Sparkles className="h-4 w-4 mr-2" />,
      subItems: [
        {
          title: 'Content Planner',
          href: '/content-planner',
          description: 'Plan and organize your job search content'
        },
        {
          title: 'AI Content Creator',
          href: '/ai-content-creator',
          description: 'Generate professional content with AI'
        }
      ]
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
            <FileText className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Resume Builder
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
