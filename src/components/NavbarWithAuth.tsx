import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDevice } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import NotificationCenter from './NotificationCenter';

const NavbarWithAuth = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 mx-auto px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMobileMenu}>
            <Menu className="h-6 w-6" />
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">Roundabout</span>
          </Link>
        </div>
        
        <nav className={`lg:flex lg:items-center lg:gap-x-6 ${isMobile ? 'hidden' : 'block'}`}>
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Dashboard</Link>
          <Link to="/analytics" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Analytics</Link>
          <Link to="/platforms" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Platforms</Link>
          <Link to="/content-planner" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Content Planner</Link>
          <Link to="/audience-insights" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Audience Insights</Link>
          <Link to="/communities" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Communities</Link>
          <Link to="/monetization" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Monetization</Link>
          <Link to="/integrations" className="text-sm font-medium hover:text-primary transition-colors px-3 py-2">Integrations</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NotificationCenter />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {user?.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user?.username || 'User'} className="h-8 w-8 rounded-full object-cover" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/documentation')}>Documentation</DropdownMenuItem>
              <DropdownMenuItem>
                <a href="https://roundaboutsocial.canny.io/feature-requests" target="_blank" rel="noopener noreferrer">
                  Request a Feature
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="container px-4 py-3 mx-auto space-y-1">
            <Link to="/dashboard" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Dashboard</Link>
            <Link to="/analytics" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Analytics</Link>
            <Link to="/platforms" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Platforms</Link>
            <Link to="/content-planner" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Content Planner</Link>
            <Link to="/audience-insights" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Audience Insights</Link>
            <Link to="/communities" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Communities</Link>
            <Link to="/monetization" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Monetization</Link>
            <Link to="/integrations" className="block px-3 py-2 text-sm rounded-md hover:bg-muted">Integrations</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavbarWithAuth;
