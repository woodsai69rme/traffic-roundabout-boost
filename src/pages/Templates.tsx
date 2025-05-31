
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Star } from 'lucide-react';

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: 'Modern Professional',
      category: 'Modern',
      rating: 4.8,
      downloads: 1250,
      preview: '/api/placeholder/300/400',
      isPro: false,
      description: 'Clean and contemporary design perfect for tech and business roles',
    },
    {
      id: 2,
      name: 'Classic Executive',
      category: 'Classic',
      rating: 4.9,
      downloads: 980,
      preview: '/api/placeholder/300/400',
      isPro: true,
      description: 'Traditional layout ideal for senior management positions',
    },
    {
      id: 3,
      name: 'Creative Designer',
      category: 'Creative',
      rating: 4.7,
      downloads: 850,
      preview: '/api/placeholder/300/400',
      isPro: false,
      description: 'Bold and colorful design for creative professionals',
    },
    {
      id: 4,
      name: 'Minimal Clean',
      category: 'Minimal',
      rating: 4.6,
      downloads: 1100,
      preview: '/api/placeholder/300/400',
      isPro: false,
      description: 'Simple and elegant layout with focus on content',
    },
    {
      id: 5,
      name: 'Tech Specialist',
      category: 'Modern',
      rating: 4.8,
      downloads: 750,
      preview: '/api/placeholder/300/400',
      isPro: true,
      description: 'Designed specifically for software engineers and developers',
    },
    {
      id: 6,
      name: 'Academic Scholar',
      category: 'Classic',
      rating: 4.5,
      downloads: 650,
      preview: '/api/placeholder/300/400',
      isPro: false,
      description: 'Perfect for academic and research positions',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume Templates</h1>
            <p className="text-muted-foreground">Choose from our collection of professional resume templates</p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] bg-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-muted-foreground">Template Preview</span>
                  </div>
                  {template.isPro && (
                    <Badge className="absolute top-2 right-2" variant="secondary">
                      Pro
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.category}</CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {template.rating}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      {template.downloads} downloads
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
