
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Education } from '@/services/resumeService';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      gpa: '',
      honors: ''
    };
    onChange([...data, newEducation]);
    setExpandedItems(prev => new Set([...prev, newEducation.id]));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    onChange(data.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {data.map((education, index) => (
        <Card key={education.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <CardTitle 
                  className="text-base cursor-pointer"
                  onClick={() => toggleExpanded(education.id)}
                >
                  {education.degree || `Education ${index + 1}`}
                  {education.institution && ` at ${education.institution}`}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {expandedItems.has(education.id) && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
                  <Input
                    id={`institution-${education.id}`}
                    value={education.institution}
                    onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                    placeholder="University of Technology"
                  />
                </div>
                <div>
                  <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                  <Input
                    id={`degree-${education.id}`}
                    value={education.degree}
                    onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div>
                  <Label htmlFor={`field-${education.id}`}>Field of Study *</Label>
                  <Input
                    id={`field-${education.id}`}
                    value={education.field_of_study}
                    onChange={(e) => updateEducation(education.id, 'field_of_study', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <Label htmlFor={`gpa-${education.id}`}>GPA</Label>
                  <Input
                    id={`gpa-${education.id}`}
                    value={education.gpa || ''}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
                <div>
                  <Label htmlFor={`start-date-${education.id}`}>Start Date</Label>
                  <Input
                    id={`start-date-${education.id}`}
                    type="month"
                    value={education.start_date}
                    onChange={(e) => updateEducation(education.id, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-date-${education.id}`}>End Date</Label>
                  <Input
                    id={`end-date-${education.id}`}
                    type="month"
                    value={education.end_date || ''}
                    onChange={(e) => updateEducation(education.id, 'end_date', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor={`honors-${education.id}`}>Honors & Awards</Label>
                <Input
                  id={`honors-${education.id}`}
                  value={education.honors || ''}
                  onChange={(e) => updateEducation(education.id, 'honors', e.target.value)}
                  placeholder="Magna Cum Laude, Dean's List"
                />
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  );
};
