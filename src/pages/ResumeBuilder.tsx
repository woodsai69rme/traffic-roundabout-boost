
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { ResumeService } from '@/services/resumeService';
import type { Resume } from '@/types/resume';
import PersonalInfoForm from '@/components/ResumeBuilder/PersonalInfoForm';
import ExperienceForm from '@/components/ResumeBuilder/ExperienceForm';
import EducationForm from '@/components/ResumeBuilder/EducationForm';
import SkillsForm from '@/components/ResumeBuilder/SkillsForm';
import ProjectsForm from '@/components/ResumeBuilder/ProjectsForm';
import CertificationsForm from '@/components/ResumeBuilder/CertificationsForm';
import ResumePreview from '@/components/ResumeBuilder/ResumePreview';
import { Save, Download, Share } from 'lucide-react';

const ResumeBuilder = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume>({
    id: '',
    user_id: user?.id || '',
    title: 'My Resume',
    personal_info: {
      full_name: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    custom_sections: [],
    design_settings: {
      template: 'modern',
      colors: {
        primary: '#2563eb',
        secondary: '#64748b'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      }
    },
    ats_score: 0,
    is_public: false,
    share_token: null,
    created_at: '',
    updated_at: ''
  });
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id && id !== 'new') {
      loadResume(id);
    }
  }, [id]);

  const loadResume = async (resumeId: string) => {
    try {
      const loadedResume = await ResumeService.getResume(resumeId);
      if (loadedResume) {
        setResume(loadedResume);
      } else {
        toast({
          title: 'Resume not found',
          description: 'The resume you\'re looking for doesn\'t exist.',
          variant: 'destructive'
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error loading resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to load resume.',
        variant: 'destructive'
      });
    }
  };

  const saveResume = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      if (resume.id && id !== 'new') {
        await ResumeService.updateResume(resume.id, resume);
        toast({
          title: 'Success',
          description: 'Resume saved successfully!'
        });
      } else {
        const newResume = await ResumeService.createResume({
          ...resume,
          user_id: user.id
        });
        setResume(newResume);
        navigate(`/resume-builder/${newResume.id}`, { replace: true });
        toast({
          title: 'Success',
          description: 'Resume created successfully!'
        });
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to save resume.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateResume = (updates: Partial<Resume>) => {
    setResume(prev => ({ ...prev, ...updates }));
  };

  const exportToPDF = () => {
    toast({
      title: 'Coming Soon',
      description: 'PDF export functionality will be available soon!'
    });
  };

  const shareResume = async () => {
    try {
      if (resume.id) {
        const token = await ResumeService.generateShareToken(resume.id);
        const shareUrl = `${window.location.origin}/resume/${token}`;
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: 'Success',
          description: 'Share link copied to clipboard!'
        });
      }
    } catch (error) {
      console.error('Error sharing resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate share link.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow p-4 md:p-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">Resume Builder</h1>
              <p className="text-muted-foreground">Create your professional resume</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportToPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" onClick={shareResume}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={saveResume} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                    </TabsList>
                    <TabsList className="grid w-full grid-cols-3 mt-2">
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="certifications">Certificates</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="mt-4">
                      <PersonalInfoForm 
                        personalInfo={resume.personal_info}
                        onUpdate={(personalInfo) => updateResume({ personal_info: personalInfo })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="experience" className="mt-4">
                      <ExperienceForm
                        experience={resume.experience}
                        onUpdate={(experience) => updateResume({ experience })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="education" className="mt-4">
                      <EducationForm
                        education={resume.education}
                        onUpdate={(education) => updateResume({ education })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="skills" className="mt-4">
                      <SkillsForm
                        skills={resume.skills}
                        onUpdate={(skills) => updateResume({ skills })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="projects" className="mt-4">
                      <ProjectsForm
                        projects={resume.projects}
                        onUpdate={(projects) => updateResume({ projects })}
                      />
                    </TabsContent>
                    
                    <TabsContent value="certifications" className="mt-4">
                      <CertificationsForm
                        certifications={resume.certifications}
                        onUpdate={(certifications) => updateResume({ certifications })}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Preview Section */}
            <div className="lg:sticky lg:top-4">
              <Card>
                <CardHeader>
                  <CardTitle>Live Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResumePreview resume={resume} />
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

export default ResumeBuilder;
