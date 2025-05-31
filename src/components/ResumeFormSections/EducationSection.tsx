
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface EducationSectionProps {
  data: any[];
  onChange: (education: any[]) => void;
}

const EducationSection = ({ data, onChange }: EducationSectionProps) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: '',
      relevant_coursework: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: number) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: number, field: string, value: any) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const degreeTypes = [
    'High School Diploma',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree',
    'Professional Degree',
    'Certificate',
    'Other'
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Education</CardTitle>
            <CardDescription>Add your educational background</CardDescription>
          </div>
          <Button onClick={addEducation} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No education added yet. Click "Add Education" to get started.
          </div>
        )}
        
        {data.map((edu, index) => (
          <Card key={edu.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Education #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>School/University *</Label>
                <Input 
                  placeholder="Harvard University" 
                  value={edu.school || ''}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                />
              </div>
              <div>
                <Label>Degree Type *</Label>
                <Select 
                  value={edu.degree || ''} 
                  onValueChange={(value) => updateEducation(edu.id, 'degree', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select degree type" />
                  </SelectTrigger>
                  <SelectContent>
                    {degreeTypes.map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Field of Study *</Label>
                <Input 
                  placeholder="Computer Science" 
                  value={edu.field || ''}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input 
                  placeholder="Cambridge, MA" 
                  value={edu.location || ''}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                />
              </div>
              <div>
                <Label>Start Date</Label>
                <Input 
                  type="month" 
                  value={edu.startDate || ''}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date (or Expected)</Label>
                <Input 
                  type="month" 
                  value={edu.endDate || ''}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input 
                  placeholder="3.8" 
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                />
              </div>
              <div>
                <Label>Relevant Coursework</Label>
                <Textarea 
                  placeholder="Data Structures, Algorithms, Machine Learning..."
                  value={edu.relevant_coursework || ''}
                  onChange={(e) => updateEducation(edu.id, 'relevant_coursework', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Achievements & Honors</Label>
                <Textarea 
                  placeholder="Dean's List, Magna Cum Laude, Relevant projects..."
                  value={edu.achievements || ''}
                  onChange={(e) => updateEducation(edu.id, 'achievements', e.target.value)}
                />
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
