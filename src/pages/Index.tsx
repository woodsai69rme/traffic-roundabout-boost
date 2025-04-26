
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import PlatformCard from '@/components/PlatformCard';
import UserProfileCard from '@/components/UserProfileCard';
import ContentCard from '@/components/ContentCard';
import { Button } from '@/components/ui/button';

const Index = () => {
  const platforms = [
    {
      platform: 'YouTube',
      icon: '/placeholder.svg',
      color: 'bg-red-500',
      description: 'Share videos and gain subscribers',
      userCount: 1250,
    },
    {
      platform: 'Instagram',
      icon: '/placeholder.svg',
      color: 'bg-pink-500',
      description: 'Boost followers and engagement',
      userCount: 980,
    },
    {
      platform: 'Twitter',
      icon: '/placeholder.svg',
      color: 'bg-blue-400',
      description: 'Increase followers and interactions',
      userCount: 750,
    },
    {
      platform: 'TikTok',
      icon: '/placeholder.svg',
      color: 'bg-black',
      description: 'Grow your audience and views',
      userCount: 1450,
    },
    {
      platform: 'Facebook',
      icon: '/placeholder.svg',
      color: 'bg-blue-600',
      description: 'Build your community and page likes',
      userCount: 620,
    },
    {
      platform: 'LinkedIn',
      icon: '/placeholder.svg',
      color: 'bg-blue-700',
      description: 'Expand your professional network',
      userCount: 480,
    },
  ];

  const featuredCreators = [
    {
      name: 'Alex Johnson',
      username: 'alexcreates',
      avatarUrl: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      followers: 12500,
      content: 78,
    },
    {
      name: 'Sarah Williams',
      username: 'sarahcreative',
      avatarUrl: '/placeholder.svg',
      platform: 'Instagram',
      platformLogo: '/placeholder.svg',
      followers: 8700,
      content: 320,
    },
    {
      name: 'Mike Chen',
      username: 'miketech',
      avatarUrl: '/placeholder.svg',
      platform: 'TikTok',
      platformLogo: '/placeholder.svg',
      followers: 15300,
      content: 142,
    },
  ];

  const trendingContent = [
    {
      title: 'How to Grow Your Channel Fast in 2025',
      thumbnail: '/placeholder.svg',
      creator: 'GrowthHacker',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 52300,
      likes: 4820,
      date: '2 days ago',
    },
    {
      title: 'Best Photography Tips for Instagram',
      thumbnail: '/placeholder.svg',
      creator: 'PhotoPro',
      creatorAvatar: '/placeholder.svg',
      platform: 'Instagram',
      platformLogo: '/placeholder.svg',
      views: 18700,
      likes: 2450,
      date: '5 days ago',
    },
    {
      title: '10 Viral TikTok Ideas Anyone Can Do',
      thumbnail: '/placeholder.svg',
      creator: 'TikTokStar',
      creatorAvatar: '/placeholder.svg',
      platform: 'TikTok',
      platformLogo: '/placeholder.svg',
      views: 124800,
      likes: 15600,
      date: '1 day ago',
    },
    {
      title: 'Monetization Strategies for Content Creators',
      thumbnail: '/placeholder.svg',
      creator: 'MoneyCreator',
      creatorAvatar: '/placeholder.svg',
      platform: 'YouTube',
      platformLogo: '/placeholder.svg',
      views: 34500,
      likes: 3200,
      date: '3 days ago',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        {/* Platforms Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Supported Platforms</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect and grow your presence across all major social media platforms in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {platforms.map((platform) => (
                <PlatformCard key={platform.platform} {...platform} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline">
                View All Platforms
              </Button>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Grow your social media presence in three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-roundabout-light-purple text-roundabout-purple flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect Your Accounts</h3>
                <p className="text-muted-foreground">
                  Link your social media profiles and share your content with our community.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-roundabout-light-blue text-roundabout-blue flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Engage With Others</h3>
                <p className="text-muted-foreground">
                  Support fellow creators by viewing, liking, and engaging with their content.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-roundabout-green text-green-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Grow Together</h3>
                <p className="text-muted-foreground">
                  Watch your followers, views, and engagement increase through reciprocal support.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Creators Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Creators</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with these successful creators who are growing with Roundabout.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCreators.map((creator) => (
                <UserProfileCard key={creator.username} {...creator} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button className="bg-gradient-to-r from-roundabout-purple to-roundabout-blue text-white">
                Join Our Community
              </Button>
            </div>
          </div>
        </section>
        
        {/* Trending Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trending Content</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover popular content from our community members across different platforms.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingContent.map((content, index) => (
                <ContentCard key={index} {...content} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Button variant="outline">
                View More Content
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-roundabout-purple to-roundabout-blue opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Social Media Presence?</h2>
              <p className="text-lg mb-8 text-muted-foreground">
                Join thousands of creators who are growing their audience, engagement, and revenue with Roundabout WebTraffic.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-roundabout-purple to-roundabout-blue text-white">
                Get Started for Free
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
