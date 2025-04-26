
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProfileSection from '@/components/ProfileSection';
import { useDevice } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  // Placeholder userId, in real app would come from auth
  const placeholderUserId = "user-123";
  const { isMobile } = useDevice();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <ProfileSection userId={placeholderUserId} />
        <section className="py-16 bg-gradient-to-br from-roundabout-purple to-roundabout-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Grow Your Online Presence?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join Roundabout WebTraffic today and connect with creators, grow your audience, 
              and monetize your content across multiple platforms.
            </p>
            <div className={`flex ${isMobile ? 'flex-col' : ''} gap-4 justify-center`}>
              <Link to="/platforms">
                <button className="px-6 py-3 bg-white text-roundabout-purple font-medium rounded-lg hover:bg-opacity-90 transition-colors">
                  Connect Platforms
                </button>
              </Link>
              <Link to="/communities">
                <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors">
                  Join Communities
                </button>
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
