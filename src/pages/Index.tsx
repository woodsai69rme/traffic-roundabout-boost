
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Download, Share2, BarChart3, Sparkles, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Professional Templates",
      description: "Choose from dozens of ATS-friendly templates designed by career experts"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "AI-Powered Optimization",
      description: "Get intelligent suggestions to improve your resume content and ATS compatibility"
    },
    {
      icon: <Download className="h-8 w-8 text-green-600" />,
      title: "Multiple Export Formats",
      description: "Download your resume as PDF, Word document, or share online with a custom link"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "ATS Score Analysis",
      description: "Real-time feedback on how well your resume will perform with applicant tracking systems"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-pink-600" />,
      title: "Smart Content Suggestions",
      description: "AI-generated bullet points and content recommendations based on your industry"
    },
    {
      icon: <Share2 className="h-8 w-8 text-indigo-600" />,
      title: "Easy Sharing",
      description: "Share your resume with potential employers via secure, customizable links"
    }
  ];

  const templates = [
    { name: "Modern Professional", category: "Tech & Business" },
    { name: "Creative Designer", category: "Design & Media" },
    { name: "Executive Classic", category: "Leadership" },
    { name: "Minimalist Clean", category: "Any Industry" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800">
              ✨ AI-Powered Resume Builder
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build Your Perfect Resume in
              <span className="text-blue-600"> Minutes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Create professional, ATS-optimized resumes with our AI-powered builder. 
              Choose from expert-designed templates and get personalized suggestions to land your dream job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/register">Start Building For Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you create, optimize, and share professional resumes 
              that get noticed by employers and pass through ATS systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Templates for Every Industry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of professionally designed, ATS-optimized templates 
              that help you stand out while ensuring compatibility with applicant tracking systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                    <FileText className="h-16 w-16 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                  <Badge variant="outline">{template.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/register">Browse All Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Resumes Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">ATS Compatibility Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9★</div>
              <div className="text-blue-100">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of job seekers who have successfully landed their dream jobs 
            using our AI-powered resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/register">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/documentation">View Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
