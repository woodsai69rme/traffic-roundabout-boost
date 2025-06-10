
import React from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Download, Sparkles, CheckCircle, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Build Your Perfect Resume in Minutes
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Create professional, ATS-optimized resumes with our AI-powered builder. 
              Choose from stunning templates and get hired faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/resume-builder">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4">
                  <FileText className="mr-2 h-5 w-5" />
                  Create Resume Now
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="lg" className="px-8 py-4">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Resume Builder?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Content</h3>
                <p className="text-muted-foreground">
                  Get intelligent suggestions and content optimization to make your resume stand out.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">ATS Optimized</h3>
                <p className="text-muted-foreground">
                  Ensure your resume passes Applicant Tracking Systems with our optimization tools.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Multiple Formats</h3>
                <p className="text-muted-foreground">
                  Download your resume in PDF, Word, or share it online with a custom link.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Templates</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our collection of professionally designed templates, 
                crafted to impress recruiters and hiring managers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {['Modern Professional', 'Creative Designer', 'Executive Classic', 'Minimalist Clean'].map((template, index) => (
                <div key={index} className="bg-card rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded mb-3 flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-center">{template}</h4>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/templates">
                <Button variant="outline" size="lg">
                  View All Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">50,000+</div>
                <p className="text-muted-foreground">Resumes Created</p>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-4">
                  <TrendingUp className="h-12 w-12 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">85%</div>
                <p className="text-muted-foreground">Interview Success Rate</p>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <p className="text-muted-foreground">ATS Compatibility</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have successfully landed their dream jobs 
              using our resume builder.
            </p>
            <Link to="/resume-builder">
              <Button size="lg" variant="secondary" className="px-8 py-4">
                <FileText className="mr-2 h-5 w-5" />
                Start Building Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
