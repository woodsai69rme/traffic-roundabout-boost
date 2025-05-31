
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoSection from './ResumeFormSections/PersonalInfoSection';
import ExperienceSection from './ResumeFormSections/ExperienceSection';
import EducationSection from './ResumeFormSections/EducationSection';
import SkillsSection from './ResumeFormSections/SkillsSection';
import ProjectsSection from './ResumeFormSections/ProjectsSection';

interface ResumeFormProps {
  data: any;
  onChange: (data: any) => void;
}

const ResumeForm = ({ data, onChange }: ResumeFormProps) => {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  const updateExperience = (experience: any[]) => {
    onChange({
      ...data,
      experience: experience,
    });
  };

  const updateEducation = (education: any[]) => {
    onChange({
      ...data,
      education: education,
    });
  };

  const updateSkills = (skills: any[]) => {
    onChange({
      ...data,
      skills: skills,
    });
  };

  const updateProjects = (projects: any[]) => {
    onChange({
      ...data,
      projects: projects,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <PersonalInfoSection 
            data={data.personalInfo || {}} 
            onChange={updatePersonalInfo} 
          />
        </TabsContent>
        
        <TabsContent value="experience">
          <ExperienceSection 
            data={data.experience || []} 
            onChange={updateExperience} 
          />
        </TabsContent>
        
        <TabsContent value="education">
          <EducationSection 
            data={data.education || []} 
            onChange={updateEducation} 
          />
        </TabsContent>
        
        <TabsContent value="skills">
          <SkillsSection 
            data={data.skills || []} 
            onChange={updateSkills} 
          />
        </TabsContent>
        
        <TabsContent value="projects">
          <ProjectsSection 
            data={data.projects || []} 
            onChange={updateProjects} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeForm;
