
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Layers,
  DollarSign,
  UserCircle,
  Menu,
  X,
  BookOpen,
  Link as LinkIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from './ThemeToggle';
import NotificationCenter from './NotificationCenter';

const NavbarWithAuth = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Analytics', href: '/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Platforms', href: '/platforms', icon: <Layers className="h-5 w-5" /> },
    { name: 'Communities', href: '/communities', icon: <Users className="h-5 w-5" /> },
    { name: 'Monetization', href: '/monetization', icon: <DollarSign className="h-5 w-5" /> },
    { name: 'Integrations', href: '/integrations', icon: <LinkIcon className="h-5 w-5" /> },
    { name: 'Documentation', href: '/documentation', icon: <BookOpen className="h-5 w-5" /> },
  ];
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-roundabout-purple to-roundabout-blue h-8 w-8 rounded-md"></div>
            <span className="text-xl font-bold">Roundabout</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="mx-6 flex-1">
              <ul className="flex space-x-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          
          {/* Right-side menu */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />
            <NotificationCenter />
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Profile">
                <UserCircle className="h-5 w-5" />
              </Button>
            </Link>
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMenu}
                aria-label="Menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobile && (
          <div className={cn(
            "fixed inset-x-0 top-16 bg-background border-b border-border pt-2 pb-4 px-4 transition-all duration-200 transform",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          )}>
            <nav>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarWithAuth;
