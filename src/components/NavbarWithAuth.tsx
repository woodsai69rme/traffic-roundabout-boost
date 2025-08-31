
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import AuthNav from '@/components/AuthNav';
import { Button } from '@/components/ui/button';
import { BarChart3, Calendar, Users, Zap } from 'lucide-react';

const NavbarWithAuth = () => {
  const { user } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Roundabout
              </span>
            </Link>
            
            {user && (
              <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/content-planner" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Content
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/audience-insights" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Insights
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/ai-content" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    AI Content
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/platforms">Platforms</Link>
                </Button>
              </div>
            )}
          </div>
          
          <AuthNav />
        </div>
      </div>
    </nav>
  );
};

export default NavbarWithAuth;
