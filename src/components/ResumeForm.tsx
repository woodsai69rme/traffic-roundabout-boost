
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now(),
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
    });
  };

  const removeExperience = (id: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp: any) => exp.id !== id),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Content</CardTitle>
        <CardDescription>Fill in your information to build your resume</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={data.personalInfo.firstName || ''}
                  onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={data.personalInfo.lastName || ''}
                  onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.personalInfo.email || ''}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={data.personalInfo.phone || ''}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={data.personalInfo.location || ''}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  rows={4}
                  value={data.personalInfo.summary || ''}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="experience" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              <Button onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            
            {data.experience.map((exp: any, index: number) => (
              <Card key={exp.id} className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Experience #{index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company</Label>
                    <Input placeholder="Company name" />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input placeholder="Job title" />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="md:col-span-2">
                    <Label>Description</Label>
                    <Textarea rows={3} placeholder="Describe your role and achievements" />
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="education" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Education</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
            
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>School/University</Label>
                  <Input placeholder="Institution name" />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input placeholder="Degree type" />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input placeholder="Major/Field" />
                </div>
                <div>
                  <Label>Graduation Year</Label>
                  <Input placeholder="YYYY" />
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Skills</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Technical Skills</Label>
                <Textarea rows={4} placeholder="List your technical skills" />
              </div>
              <div>
                <Label>Soft Skills</Label>
                <Textarea rows={4} placeholder="List your soft skills" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ResumeForm;
