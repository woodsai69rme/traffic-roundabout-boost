
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, FileText, Download, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow">
        <Hero />
        
        {/* Feature Sections */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Professional Resume Builder Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">ATS-Optimized Templates</h3>
                <p className="text-muted-foreground mb-4">Choose from professionally designed templates that pass through Applicant Tracking Systems.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <Download className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Export Options</h3>
                <p className="text-muted-foreground mb-4">Download your resume as PDF, Word document, or share with a direct link.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <Zap className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">AI-Powered Suggestions</h3>
                <p className="text-muted-foreground mb-4">Get intelligent recommendations for improving your resume content and format.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Build Your Professional Resume Today</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have landed their dream jobs with our resume builder.
              Create a standout resume in minutes, not hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  View Documentation
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
