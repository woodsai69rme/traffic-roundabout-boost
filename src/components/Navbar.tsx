
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full py-4 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full w-8 h-8 bg-gradient-to-r from-roundabout-purple to-roundabout-blue flex items-center justify-center">
            <span className="font-bold text-white">R</span>
          </div>
          <span className="font-bold text-xl">Roundabout</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/platforms" className="text-foreground/80 hover:text-primary transition-colors">
            Platforms
          </Link>
          <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors">
            Profile
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Log In
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-roundabout-purple to-roundabout-blue text-white">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
