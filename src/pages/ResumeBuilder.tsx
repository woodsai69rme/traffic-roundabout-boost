
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { resumeService, Resume } from '@/services/resumeService';
import { PersonalInfoForm } from '@/components/ResumeBuilder/PersonalInfoForm';
import { ExperienceForm } from '@/components/ResumeBuilder/ExperienceForm';
import { EducationForm } from '@/components/ResumeBuilder/EducationForm';
import { SkillsForm } from '@/components/ResumeBuilder/SkillsForm';
import { ProjectsForm } from '@/components/ResumeBuilder/ProjectsForm';
import { ResumePreview } from '@/components/ResumeBuilder/ResumePreview';
import { TemplateSelector } from '@/components/ResumeBuilder/TemplateSelector';
import { Save, Download, Share2, Eye } from 'lucide-react';

const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resume, setResume] = useState<Resume>({
    title: 'My Resume',
    personal_info: {
      full_name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    custom_sections: [],
    design_settings: {}
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
      const data = await resumeService.getResume(resumeId);
      if (data) {
        setResume(data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load resume",
        variant: "destructive"
      });
    }
  };

  const saveResume = async () => {
    setIsSaving(true);
    try {
      if (id && id !== 'new') {
        await resumeService.updateResume(id, resume);
        toast({
          title: "Success",
          description: "Resume saved successfully"
        });
      } else {
        const newResume = await resumeService.createResume(resume);
        navigate(`/resume-builder/${newResume.id}`, { replace: true });
        toast({
          title: "Success",
          description: "Resume created successfully"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateResume = (field: keyof Resume, value: any) => {
    setResume(prev => ({ ...prev, [field]: value }));
  };

  const exportPDF = () => {
    // PDF export functionality
    toast({
      title: "Coming Soon",
      description: "PDF export feature will be available soon"
    });
  };

  const shareResume = () => {
    // Share functionality
    toast({
      title: "Coming Soon",
      description: "Share feature will be available soon"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                value={resume.title}
                onChange={(e) => updateResume('title', e.target.value)}
                className="text-xl font-semibold border-none bg-transparent p-0 h-auto"
                placeholder="Resume Title"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={exportPDF}>
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button variant="outline" size="sm" onClick={shareResume}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={saveResume} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="template">Template</TabsTrigger>
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                  </TabsList>

                  <TabsContent value="template" className="mt-6">
                    <TemplateSelector
                      selectedTemplate={resume.template_id}
                      onTemplateChange={(templateId) => updateResume('template_id', templateId)}
                    />
                  </TabsContent>

                  <TabsContent value="personal" className="mt-6">
                    <PersonalInfoForm
                      data={resume.personal_info}
                      onChange={(data) => updateResume('personal_info', data)}
                    />
                  </TabsContent>

                  <TabsContent value="experience" className="mt-6">
                    <ExperienceForm
                      data={resume.experience}
                      onChange={(data) => updateResume('experience', data)}
                    />
                  </TabsContent>

                  <TabsContent value="education" className="mt-6">
                    <EducationForm
                      data={resume.education}
                      onChange={(data) => updateResume('education', data)}
                    />
                  </TabsContent>

                  <TabsContent value="skills" className="mt-6">
                    <SkillsForm
                      data={resume.skills}
                      onChange={(data) => updateResume('skills', data)}
                    />
                  </TabsContent>

                  <TabsContent value="projects" className="mt-6">
                    <ProjectsForm
                      data={resume.projects}
                      onChange={(data) => updateResume('projects', data)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <ResumePreview resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
