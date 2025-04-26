
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow">
        <Hero />
        
        {/* Feature Sections */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful features for creators</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Cross-Platform Management</h3>
                <p className="text-muted-foreground mb-4">Connect and manage all your social media accounts from one dashboard.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Advanced Analytics</h3>
                <p className="text-muted-foreground mb-4">Track performance metrics and gain insights across all your platforms.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3">Community Building</h3>
                <p className="text-muted-foreground mb-4">Grow your audience and manage engagement in one place.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Documentation Section */}
        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-4">Comprehensive Documentation</h2>
                <p className="text-muted-foreground mb-6">
                  Explore our detailed guides for integrating Roundabout with your favorite tools and platforms. 
                  From no-code solutions like Webflow and Bubble to development environments like VS Code.
                </p>
                <Link to="/docs">
                  <Button className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Browse Documentation
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="md:w-1/2 bg-muted p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded">
                    <h4 className="font-bold mb-2">No-Code Platforms</h4>
                    <p className="text-sm text-muted-foreground">Integrate with Webflow, Bubble, Zapier, and more</p>
                  </div>
                  <div className="p-4 bg-card rounded">
                    <h4 className="font-bold mb-2">Developer Tools</h4>
                    <p className="text-sm text-muted-foreground">VS Code setup, snippets, and debugging guides</p>
                  </div>
                  <div className="p-4 bg-card rounded">
                    <h4 className="font-bold mb-2">API Reference</h4>
                    <p className="text-sm text-muted-foreground">Comprehensive API documentation</p>
                  </div>
                  <div className="p-4 bg-card rounded">
                    <h4 className="font-bold mb-2">Architecture</h4>
                    <p className="text-sm text-muted-foreground">Technical architecture and design patterns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
