
import React, { useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import ATSOptimization from '@/components/ATSOptimization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, Wand2, Target, Eye, Download } from 'lucide-react';

const AIResumeReview = () => {
  const [uploadedResume, setUploadedResume] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  // Mock resume data for demonstration
  const mockResumeData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with 5+ years developing scalable web applications'
    },
    experience: [
      {
        id: 1,
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020-01',
        endDate: '2023-12',
        current: false,
        achievements: ['Increased system performance by 40%', 'Led a team of 5 developers']
      }
    ],
    skills: [
      { id: 1, name: 'JavaScript', level: 'Expert', category: 'Technical' },
      { id: 2, name: 'React', level: 'Advanced', category: 'Technical' },
      { id: 3, name: 'Leadership', level: 'Advanced', category: 'Soft Skills' }
    ],
    education: [
      {
        id: 1,
        school: 'University of California',
        degree: "Bachelor's Degree",
        field: 'Computer Science',
        endDate: '2019-05'
      }
    ]
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedResume(file);
      // In a real app, you'd parse the file content here
    }
  };

  const analyzeWithAI = () => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        overallScore: 78,
        strengths: [
          'Strong technical skills alignment with job requirements',
          'Quantified achievements with specific metrics',
          'Clear career progression shown',
          'Professional summary is concise and impactful'
        ],
        improvements: [
          'Add more industry-specific keywords from the job description',
          'Include more details about project management experience',
          'Consider adding certifications relevant to the role',
          'Expand on leadership experience with specific examples'
        ],
        keywordMatch: 65,
        missingKeywords: ['Python', 'AWS', 'Microservices', 'Agile', 'CI/CD'],
        recommendations: [
          'Tailor your summary to match the specific role requirements',
          'Add a "Certifications" section if you have relevant ones',
          'Include more action verbs at the beginning of bullet points',
          'Consider adding a "Projects" section to showcase relevant work'
        ],
        atsCompatibility: 82,
        industryBenchmark: {
          avgScore: 65,
          percentile: 85
        }
      };
      
      setAnalysis(mockAnalysis);
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-6">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Resume Review</h1>
            <p className="text-muted-foreground">
              Get intelligent feedback and optimization suggestions for your resume
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Resume
                  </CardTitle>
                  <CardDescription>
                    Upload your resume or use our sample data for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="resume-upload">Upload Resume (PDF, DOC, DOCX)</Label>
                    <Input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="mt-2"
                    />
                  </div>
                  
                  {uploadedResume && (
                    <div className="flex items-center gap-2 p-3 border rounded-lg bg-green-50">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">{uploadedResume.name}</span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or</p>
                    <Button variant="outline">
                      Use Sample Resume Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Target Job Description
                  </CardTitle>
                  <CardDescription>
                    Paste the job description to get tailored optimization suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the job description here for targeted analysis..."
                    rows={8}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <Button 
                    className="mt-4 w-full" 
                    onClick={analyzeWithAI}
                    disabled={analyzing}
                  >
                    {analyzing ? (
                      <>Analyzing with AI...</>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Analyze Resume with AI
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Analysis Results */}
              {analysis && (
                <Card>
                  <CardHeader>
                    <CardTitle>AI Analysis Results</CardTitle>
                    <CardDescription>
                      Comprehensive review of your resume's effectiveness
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="keywords">Keywords</TabsTrigger>
                        <TabsTrigger value="improvements">Improvements</TabsTrigger>
                        <TabsTrigger value="benchmark">Benchmark</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-green-600">
                                  {analysis.overallScore}/100
                                </div>
                                <p className="text-sm text-muted-foreground">Overall Score</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600">
                                  {analysis.keywordMatch}%
                                </div>
                                <p className="text-sm text-muted-foreground">Keyword Match</p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600">
                                  {analysis.atsCompatibility}/100
                                </div>
                                <p className="text-sm text-muted-foreground">ATS Compatible</p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-green-700 mb-2">Strengths</h4>
                            <ul className="space-y-1">
                              {analysis.strengths.map((strength: string, index: number) => (
                                <li key={index} className="text-sm text-green-600">
                                  ✓ {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-orange-700 mb-2">Areas for Improvement</h4>
                            <ul className="space-y-1">
                              {analysis.improvements.map((improvement: string, index: number) => (
                                <li key={index} className="text-sm text-orange-600">
                                  • {improvement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="keywords" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Missing Keywords</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            These keywords from the job description could strengthen your resume:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {analysis.missingKeywords.map((keyword: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-red-600 border-red-300">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h5 className="font-medium text-blue-900 mb-2">Keyword Integration Tips</h5>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Naturally incorporate keywords in your experience descriptions</li>
                            <li>• Add missing skills to your skills section</li>
                            <li>• Include relevant keywords in your professional summary</li>
                            <li>• Use both acronyms and full forms (e.g., "AI" and "Artificial Intelligence")</li>
                          </ul>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="improvements" className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-3">Detailed Recommendations</h4>
                          <div className="space-y-3">
                            {analysis.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                                <Wand2 className="h-4 w-4 mt-0.5 text-blue-500" />
                                <div>
                                  <p className="text-sm">{rec}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="benchmark" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold">
                                  {analysis.industryBenchmark.percentile}th
                                </div>
                                <p className="text-sm text-muted-foreground">Percentile</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Your resume scores better than {analysis.industryBenchmark.percentile}% of resumes in your field
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardContent className="pt-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold">
                                  {analysis.industryBenchmark.avgScore}
                                </div>
                                <p className="text-sm text-muted-foreground">Industry Average</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  You're {analysis.overallScore - analysis.industryBenchmark.avgScore} points above average
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <ATSOptimization 
                resumeData={mockResumeData} 
                onOptimize={(suggestions) => console.log(suggestions)} 
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Optimized Resume
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Analysis Report
                  </Button>
                  <Button className="w-full">
                    Apply Suggestions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIResumeReview;
