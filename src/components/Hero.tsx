
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-roundabout-light-purple opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-roundabout-light-blue opacity-50 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Boost Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-roundabout-purple to-roundabout-blue">Social Media</span> Presence
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
              Join the Roundabout WebTraffic platform and connect with creators to grow your audience through genuine engagement and reciprocal support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-roundabout-purple to-roundabout-blue hover:opacity-90 transition-opacity text-white">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background bg-gradient-to-r from-roundabout-purple to-roundabout-blue flex items-center justify-center overflow-hidden`}>
                    <span className="text-xs font-medium text-white">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="ml-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">1,000+</span> creators already joined
              </p>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="bg-gradient-to-br from-roundabout-purple to-roundabout-blue p-1 rounded-2xl shadow-xl animate-float">
              <div className="bg-background rounded-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Platform Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">Social Accounts</p>
                      <p className="text-2xl font-bold">5,280</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">Engagements</p>
                      <p className="text-2xl font-bold">134k</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">Platforms</p>
                      <p className="text-2xl font-bold">7+</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <p className="text-muted-foreground text-sm">New Today</p>
                      <p className="text-2xl font-bold">124</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
