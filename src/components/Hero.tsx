
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Users, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Build Professional Resumes That Get You Hired
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create ATS-friendly resumes with our AI-powered builder. Stand out from the crowd with professional templates and intelligent content suggestions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register">
              <Button size="lg" className="flex items-center gap-2">
                Start Building Resume
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-muted-foreground">Resume Templates</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">100K+</div>
              <div className="text-muted-foreground">Users Hired</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-muted-foreground">ATS Pass Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
