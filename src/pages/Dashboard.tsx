
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Plus, Eye, Download, Edit } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock resume data - will be replaced with real data from ResumeService
  const recentResumes = [
    {
      id: '1',
      title: 'Software Engineer Resume',
      updatedAt: '2024-01-15',
      template: 'Modern Professional'
    },
    {
      id: '2', 
      title: 'Marketing Manager Resume',
      updatedAt: '2024-01-10',
      template: 'Creative Designer'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto space-y-8">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {user?.email?.split('@')[0] || 'there'}!
            </h1>
            <p className="text-muted-foreground">
              Manage your resumes and track your job application success.
            </p>
          </header>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/resume-builder">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Create New Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Start building a new resume from scratch or use a template.
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/templates">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Browse Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Explore our collection of professional resume templates.
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/resume-analytics">
                <CardHeader className="text-center">
                  <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>View Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">
                    Track views, downloads, and performance metrics.
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>

          {/* Recent Resumes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Resumes</CardTitle>
                <Link to="/resume-builder">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Resume
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {recentResumes.length > 0 ? (
                <div className="space-y-4">
                  {recentResumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 rounded p-2">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{resume.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resume.template} • Updated {resume.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first resume to get started on your job search journey.
                  </p>
                  <Link to="/resume-builder">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Your First Resume
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">2</div>
                <p className="text-muted-foreground text-sm">Total Resumes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">45</div>
                <p className="text-muted-foreground text-sm">Total Views</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">12</div>
                <p className="text-muted-foreground text-sm">Downloads</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">85%</div>
                <p className="text-muted-foreground text-sm">ATS Score</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
