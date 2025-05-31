
import React, { useState } from 'react';
import NavbarWithAuth from '@/components/NavbarWithAuth';
import Footer from '@/components/Footer';
import ResumeForm from '@/components/ResumeForm';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState('template');
  const [resumeData, setResumeData] = useState({
    template: 'modern',
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
    certifications: [],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarWithAuth />
      <main className="flex-grow">
        <div className="container mx-auto p-4 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Resume Builder</h1>
            <p className="text-muted-foreground">Create your professional resume step by step</p>
          </header>
          
          <Tabs value={currentStep} onValueChange={setCurrentStep} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <TabsContent value="template">
                  <TemplateSelector 
                    selectedTemplate={resumeData.template}
                    onTemplateChange={(template) => setResumeData({...resumeData, template})}
                  />
                </TabsContent>
                
                <TabsContent value="content">
                  <ResumeForm 
                    data={resumeData}
                    onChange={setResumeData}
                  />
                </TabsContent>
                
                <TabsContent value="preview">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Preview Your Resume</h2>
                    <p className="text-muted-foreground">Review your resume before exporting</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="export">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Export Your Resume</h2>
                    <p className="text-muted-foreground">Download or share your resume</p>
                  </div>
                </TabsContent>
              </div>
              
              <div className="lg:sticky lg:top-8 lg:h-fit">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResumeBuilder;
