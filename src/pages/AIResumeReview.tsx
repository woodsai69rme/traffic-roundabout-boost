
import React, { useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, AlertTriangle, XCircle, Wand2 } from 'lucide-react';

const AIResumeReview = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const recommendations = [
    {
      type: 'success',
      title: 'Strong Action Verbs',
      description: 'Your resume uses impactful action verbs like "implemented," "optimized," and "led"',
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      type: 'warning',
      title: 'Missing Keywords',
      description: 'Consider adding industry-specific keywords like "agile," "cloud computing," and "data analysis"',
      icon: AlertTriangle,
      color: 'text-yellow-500',
    },
    {
      type: 'error',
      title: 'Length Optimization',
      description: 'Your resume is 2.5 pages. Consider reducing to 1-2 pages for better readability',
      icon: XCircle,
      color: 'text-red-500',
    },
    {
      type: 'success',
      title: 'ATS Friendly Format',
      description: 'Your resume format is compatible with Applicant Tracking Systems',
      icon: CheckCircle,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-4xl space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Resume Review</h1>
            <p className="text-muted-foreground">Get intelligent feedback to improve your resume</p>
          </header>
          
          {!analysisComplete ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Your Resume
                  </CardTitle>
                  <CardDescription>Upload your resume for AI-powered analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg font-medium mb-2">Drop your resume here</p>
                    <p className="text-sm text-muted-foreground mb-4">Supports PDF, DOC, DOCX files</p>
                    <Button variant="outline">Choose File</Button>
                  </div>
                  
                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Wand2 className="h-4 w-4 animate-spin" />
                        <span>Analyzing your resume...</span>
                      </div>
                      <Progress value={66} />
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="w-full"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Start AI Analysis'}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>What We Analyze</CardTitle>
                  <CardDescription>Our AI checks multiple aspects of your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>ATS Compatibility</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Keyword Optimization</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Content Quality</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Format & Structure</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Grammar & Spelling</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>Overall score and detailed recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">85/100</div>
                    <p className="text-muted-foreground">Your resume score</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">92</div>
                      <div className="text-sm text-muted-foreground">ATS Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">78</div>
                      <div className="text-sm text-muted-foreground">Keywords</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-500">88</div>
                      <div className="text-sm text-muted-foreground">Content</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-500">82</div>
                      <div className="text-sm text-muted-foreground">Format</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Actionable suggestions to improve your resume</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <rec.icon className={`h-5 w-5 mt-0.5 ${rec.color}`} />
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{rec.title}</h3>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                        <Badge variant={rec.type === 'success' ? 'default' : rec.type === 'warning' ? 'secondary' : 'destructive'}>
                          {rec.type === 'success' ? 'Good' : rec.type === 'warning' ? 'Improve' : 'Fix'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIResumeReview;
