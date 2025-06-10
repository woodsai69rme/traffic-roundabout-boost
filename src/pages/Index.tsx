
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Zap, BarChart3, Rocket, Star } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full py-4 bg-background/80 backdrop-blur-md border-b">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="font-bold text-white">R</span>
            </div>
            <span className="font-bold text-xl">Roundabout WebTraffic</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Log In</Link>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Grow Your Social Media
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Accelerate your social media growth with AI-powered insights, reciprocal engagement, and comprehensive analytics across all platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8" asChild>
              <Link to="/register">Start Growing Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/docs">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Everything You Need to Grow
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>AI-Powered Growth</CardTitle>
                <CardDescription>
                  Leverage artificial intelligence to optimize your content strategy and maximize engagement
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Reciprocal Engagement</CardTitle>
                <CardDescription>
                  Join a community where users support each other's content for mutual growth
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Get detailed insights into your audience, content performance, and growth metrics
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Multi-Platform Support</CardTitle>
                <CardDescription>
                  Connect and manage Instagram, YouTube, TikTok, Twitter, and more from one dashboard
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Rocket className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Content Scheduling</CardTitle>
                <CardDescription>
                  Plan and schedule your content across platforms for optimal engagement times
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Star className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Monetization Tools</CardTitle>
                <CardDescription>
                  Turn your growing audience into revenue with our integrated monetization features
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already growing their social media presence with Roundabout WebTraffic.
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8" asChild>
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Roundabout WebTraffic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
