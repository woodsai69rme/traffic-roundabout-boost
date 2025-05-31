
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Experience } from '@/services/resumeService';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      is_current: false,
      description: '',
      achievements: ['']
    };
    onChange([...data, newExperience]);
    setExpandedItems(prev => new Set([...prev, newExperience.id]));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
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

  const addAchievement = (expId: string) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience) {
      updateExperience(expId, 'achievements', [...experience.achievements, '']);
    }
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience) {
      const newAchievements = [...experience.achievements];
      newAchievements[index] = value;
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  const removeAchievement = (expId: string, index: number) => {
    const experience = data.find(exp => exp.id === expId);
    if (experience && experience.achievements.length > 1) {
      const newAchievements = experience.achievements.filter((_, i) => i !== index);
      updateExperience(expId, 'achievements', newAchievements);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {data.map((experience, index) => (
        <Card key={experience.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <CardTitle 
                  className="text-base cursor-pointer"
                  onClick={() => toggleExpanded(experience.id)}
                >
                  {experience.position || `Experience ${index + 1}`}
                  {experience.company && ` at ${experience.company}`}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {expandedItems.has(experience.id) && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`position-${experience.id}`}>Job Title *</Label>
                  <Input
                    id={`position-${experience.id}`}
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                  <Input
                    id={`company-${experience.id}`}
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    placeholder="Tech Corp Inc."
                  />
                </div>
                <div>
                  <Label htmlFor={`start-date-${experience.id}`}>Start Date *</Label>
                  <Input
                    id={`start-date-${experience.id}`}
                    type="month"
                    value={experience.start_date}
                    onChange={(e) => updateExperience(experience.id, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-date-${experience.id}`}>End Date</Label>
                  <Input
                    id={`end-date-${experience.id}`}
                    type="month"
                    value={experience.end_date || ''}
                    onChange={(e) => updateExperience(experience.id, 'end_date', e.target.value)}
                    disabled={experience.is_current}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${experience.id}`}
                  checked={experience.is_current}
                  onCheckedChange={(checked) => {
                    updateExperience(experience.id, 'is_current', checked);
                    if (checked) {
                      updateExperience(experience.id, 'end_date', '');
                    }
                  }}
                />
                <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
              </div>

              <div>
                <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                <Textarea
                  id={`description-${experience.id}`}
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Key Achievements</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(experience.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Achievement
                  </Button>
                </div>
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                      placeholder="Describe a specific achievement or accomplishment..."
                    />
                    {experience.achievements.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAchievement(experience.id, achIndex)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  );
};
