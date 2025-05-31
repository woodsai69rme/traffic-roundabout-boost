
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Edit, Download, Share, Trash2 } from 'lucide-react';

const ResumeList = () => {
  const resumes = [
    {
      id: 1,
      title: 'Software Engineer Resume',
      template: 'Modern',
      lastModified: '2 hours ago',
      status: 'Active',
      applications: 5,
    },
    {
      id: 2,
      title: 'Frontend Developer Resume',
      template: 'Classic',
      lastModified: '1 day ago',
      status: 'Draft',
      applications: 0,
    },
    {
      id: 3,
      title: 'Full Stack Developer Resume',
      template: 'Creative',
      lastModified: '3 days ago',
      status: 'Active',
      applications: 12,
    },
  ];

  const statusColors = {
    Active: 'bg-green-500/10 text-green-500 border-green-500/20',
    Draft: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Resumes</CardTitle>
        <CardDescription>Manage and edit your resume collection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resumes.map((resume) => (
            <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium">{resume.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Template: {resume.template}</span>
                    <span>•</span>
                    <span>Modified {resume.lastModified}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm font-medium">{resume.applications}</div>
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
                
                <Badge variant="outline" className={statusColors[resume.status as keyof typeof statusColors]}>
                  {resume.status}
                </Badge>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeList;
