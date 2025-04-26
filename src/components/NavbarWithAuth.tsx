
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Menu, X } from 'lucide-react';
import AuthNav from './AuthNav';
import { useAuth } from '@/hooks/use-auth';

const NavbarWithAuth = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', protected: true },
    { name: 'Platforms', path: '/platforms' },
    { name: 'Communities', path: '/communities', protected: true },
    { name: 'Analytics', path: '/analytics', protected: true },
    { name: 'Monetization', path: '/monetization', protected: true },
  ];

  const filteredNavItems = navItems.filter(item => !item.protected || user);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-r from-roundabout-purple to-roundabout-blue"></div>
            <span className="font-bold text-xl hidden sm:inline-block">Roundabout</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {filteredNavItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link to={item.path}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive(item.path) ? "bg-muted" : "bg-transparent"
                    )}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:block">
            <AuthNav />
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 flex flex-col bg-background md:hidden">
          <nav className="flex flex-col space-y-1 p-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-lg rounded-md",
                  isActive(item.path)
                    ? "bg-muted font-medium"
                    : "hover:bg-muted/50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t p-4">
            <AuthNav />
          </div>
        </div>
      )}
    </header>
  );
};

export default NavbarWithAuth;
