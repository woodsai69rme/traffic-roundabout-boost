
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full w-8 h-8 bg-gradient-to-r from-roundabout-purple to-roundabout-blue flex items-center justify-center">
                <span className="font-bold text-white">R</span>
              </div>
              <span className="font-bold text-xl">Roundabout</span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Your all-in-one platform for social media growth, engagement, and reciprocal support.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/platforms" className="text-muted-foreground hover:text-primary transition-colors">Platforms</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/analytics" className="text-muted-foreground hover:text-primary transition-colors">Analytics</Link></li>
              <li><Link to="/ai-content" className="text-muted-foreground hover:text-primary transition-colors">AI Content</Link></li>
              <li><Link to="/content-planner" className="text-muted-foreground hover:text-primary transition-colors">Content Planner</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/documentation" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/api-integrations" className="text-muted-foreground hover:text-primary transition-colors">API Integrations</Link></li>
              <li><Link to="/communities" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
              <li><Link to="/monetization" className="text-muted-foreground hover:text-primary transition-colors">Monetization</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">Log In</Link></li>
              <li><Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">Sign Up</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary transition-colors">Profile</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Roundabout WebTraffic. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
