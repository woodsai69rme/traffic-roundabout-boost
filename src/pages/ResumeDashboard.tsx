
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { resumeService, Resume } from '@/services/resumeService';
import { Plus, FileText, Calendar, Share2, Download, Trash2, Copy, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ResumeDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      const data = await resumeService.getResumes();
      setResumes(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resumes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createNewResume = () => {
    navigate('/resume-builder/new');
  };

  const editResume = (id: string) => {
    navigate(`/resume-builder/${id}`);
  };

  const duplicateResume = async (id: string) => {
    try {
      const newResume = await resumeService.duplicateResume(id);
      setResumes(prev => [newResume, ...prev]);
      toast({
        title: "Success",
        description: "Resume duplicated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate resume",
        variant: "destructive"
      });
    }
  };

  const deleteResume = async (id: string) => {
    try {
      await resumeService.deleteResume(id);
      setResumes(prev => prev.filter(resume => resume.id !== id));
      toast({
        title: "Success",
        description: "Resume deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getResumeScore = (resume: Resume) => {
    let score = 0;
    if (resume.personal_info.full_name) score += 20;
    if (resume.personal_info.email) score += 10;
    if (resume.personal_info.summary) score += 15;
    if (resume.experience.length > 0) score += 25;
    if (resume.education.length > 0) score += 15;
    if (resume.skills.length > 0) score += 15;
    return Math.min(score, 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <p className="text-gray-600 mt-2">Manage and create professional resumes</p>
        </div>
        <Button onClick={createNewResume} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Create New Resume
        </Button>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No resumes yet</h3>
          <p className="text-gray-500 mb-6">Create your first professional resume to get started</p>
          <Button onClick={createNewResume}>
            <Plus className="h-5 w-5 mr-2" />
            Create Your First Resume
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map(resume => {
            const score = getResumeScore(resume);
            return (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-1">{resume.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>
                        {score}%
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(resume.updated_at || resume.created_at || '')}
                    </span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Personal Info:</span>
                      <span className={resume.personal_info.full_name ? 'text-green-600' : 'text-red-600'}>
                        {resume.personal_info.full_name ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Experience:</span>
                      <span className={resume.experience.length > 0 ? 'text-green-600' : 'text-red-600'}>
                        {resume.experience.length} {resume.experience.length === 1 ? 'entry' : 'entries'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education:</span>
                      <span className={resume.education.length > 0 ? 'text-green-600' : 'text-red-600'}>
                        {resume.education.length} {resume.education.length === 1 ? 'entry' : 'entries'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Skills:</span>
                      <span className={resume.skills.length > 0 ? 'text-green-600' : 'text-red-600'}>
                        {resume.skills.length} skills
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editResume(resume.id!)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => duplicateResume(resume.id!)}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Coming Soon",
                          description: "Preview feature will be available soon"
                        });
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                  </div>

                  <div className="flex justify-between pt-2 border-t">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Coming Soon",
                            description: "Share feature will be available soon"
                          });
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Coming Soon",
                            description: "Download feature will be available soon"
                          });
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{resume.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteResume(resume.id!)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResumeDashboard;
