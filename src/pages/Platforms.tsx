
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getAllPlatforms, getMonetizablePlatforms, Platform } from '@/services/platforms';

const Platforms = () => {
  const navigate = useNavigate();
  const [showMonetizableOnly, setShowMonetizableOnly] = useState(false);
  const platforms = showMonetizableOnly ? getMonetizablePlatforms() : getAllPlatforms();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Supported Platforms</h1>
              <p className="text-muted-foreground max-w-2xl">
                Connect and grow your presence across all major social media platforms with Roundabout WebTraffic.
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Switch
                id="monetizable"
                checked={showMonetizableOnly}
                onCheckedChange={setShowMonetizableOnly}
              />
              <Label htmlFor="monetizable">Show monetizable platforms only</Label>
            </div>
          </div>

          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((platform) => (
                  <Card key={platform.id} className="card-hover">
                    <div className={`h-2 ${platform.color}`}></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-semibold">{platform.name}</CardTitle>
                        <div className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center`}>
                          <img src={platform.icon} alt={platform.name} className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <CardDescription>{platform.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Monetization Requirements:</h4>
                        <p className="text-sm text-muted-foreground">{platform.minRequirementsForMonetization}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {platform.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="outline">{feature}</Badge>
                          ))}
                          {platform.features.length > 3 && (
                            <Badge variant="outline">+{platform.features.length - 3} more</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant="outline" onClick={() => navigate(`/platform/${platform.id}`)}>
                        Learn More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="list">
              <div className="space-y-4">
                {platforms.map((platform) => (
                  <Card key={platform.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className={`w-full md:w-1 h-2 md:h-auto ${platform.color}`}></div>
                      <div className="flex-grow p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${platform.color} flex items-center justify-center`}>
                              <img src={platform.icon} alt={platform.name} className="w-4 h-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-lg">{platform.name}</h3>
                          </div>
                          {platform.monetizable && (
                            <Badge variant="secondary">Monetizable</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">{platform.description}</p>
                        <div className="flex flex-col md:flex-row justify-between mb-4">
                          <div className="mb-4 md:mb-0 md:mr-4 md:max-w-md">
                            <h4 className="text-sm font-medium mb-1">Monetization Requirements:</h4>
                            <p className="text-sm text-muted-foreground">{platform.minRequirementsForMonetization}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Features:</h4>
                            <div className="flex flex-wrap gap-2">
                              {platform.features.map((feature, index) => (
                                <Badge key={index} variant="outline">{feature}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => navigate(`/platform/${platform.id}`)}>
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to grow your social media presence?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Start connecting your accounts today and accelerate your growth across all platforms.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-roundabout-purple to-roundabout-blue text-white">
              Get Started
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Platforms;
