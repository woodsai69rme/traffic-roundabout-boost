
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProfileSection from '@/components/ProfileSection';
import { useDevice } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index: React.FC = () => {
  const { isMobile } = useDevice();
  const { user } = useAuth();

  // If user is logged in, show a personalized dashboard preview
  if (user) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavbarWithAuth />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.fullName || user.username || 'there'}!</h1>
              <p className="text-muted-foreground">
                Continue growing your social media presence with Roundabout WebTraffic.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6 mb-10">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/dashboard">
                  <Button variant="outline" className="w-full">View Dashboard</Button>
                </Link>
                <Link to="/platforms">
                  <Button variant="outline" className="w-full">Manage Platforms</Button>
                </Link>
                <Link to="/analytics">
                  <Button variant="outline" className="w-full">Check Analytics</Button>
                </Link>
                <Link to="/communities">
                  <Button variant="outline" className="w-full">Join Communities</Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="growth" className="space-y-6">
              <TabsList>
                <TabsTrigger value="growth">Growth Opportunities</TabsTrigger>
                <TabsTrigger value="monetization">Monetization Tips</TabsTrigger>
              </TabsList>
              
              <TabsContent value="growth" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="font-medium mb-2">Enhance Your Profile</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete your profile to increase visibility and create a stronger brand image.
                    </p>
                    <Link to="/profile">
                      <Button size="sm" variant="outline">Update Profile</Button>
                    </Link>
                  </div>
                  <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="font-medium mb-2">Join Engagement Groups</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Participate in reciprocal engagement to boost your content's reach.
                    </p>
                    <Link to="/communities">
                      <Button size="sm" variant="outline">Find Groups</Button>
                    </Link>
                  </div>
                  <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="font-medium mb-2">Analyze Top Performers</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn from your best-performing content to optimize future posts.
                    </p>
                    <Link to="/analytics">
                      <Button size="sm" variant="outline">View Analytics</Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="monetization" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="font-medium mb-2">Sponsorship Opportunities</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore brand partnerships that match your content style and audience.
                    </p>
                    <Link to="/monetization">
                      <Button size="sm" variant="outline">View Sponsors</Button>
                    </Link>
                  </div>
                  <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="font-medium mb-2">Premium Content</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create exclusive content for subscribers to generate recurring revenue.
                    </p>
                    <Link to="/monetization">
                      <Button size="sm" variant="outline">Start Creating</Button>
                    </Link>
                  </div>
                  <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <h3 className="font-medium mb-2">Affiliate Marketing</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Promote products you love and earn commissions on sales.
                    </p>
                    <Link to="/monetization">
                      <Button size="sm" variant="outline">Browse Programs</Button>
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Default landing page for non-logged in users
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow">
        <Hero />
        <ProfileSection userId="user-123" />
        <section className="py-16 bg-gradient-to-br from-roundabout-purple to-roundabout-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Online Presence?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join Roundabout WebTraffic today and connect with creators, grow your audience, 
              and monetize your content across multiple platforms.
            </p>
            <div className={`flex ${isMobile ? 'flex-col' : ''} gap-4 justify-center`}>
              <Link to="/register">
                <Button size="lg" className="bg-white text-roundabout-purple font-medium hover:bg-opacity-90 transition-colors">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:bg-opacity-10 transition-colors">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
