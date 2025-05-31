
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Wand2 } from 'lucide-react';

interface ExperienceSectionProps {
  data: any[];
  onChange: (experiences: any[]) => void;
}

const ExperienceSection = ({ data, onChange }: ExperienceSectionProps) => {
  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: number) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: number, field: string, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addAchievement = (expId: number) => {
    const updated = data.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: [...(exp.achievements || []), ''] }
        : exp
    );
    onChange(updated);
  };

  const updateAchievement = (expId: number, index: number, value: string) => {
    const updated = data.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            achievements: exp.achievements.map((ach: string, i: number) => 
              i === index ? value : ach
            )
          }
        : exp
    );
    onChange(updated);
  };

  const removeAchievement = (expId: number, index: number) => {
    const updated = data.map(exp => 
      exp.id === expId 
        ? { 
            ...exp, 
            achievements: exp.achievements.filter((_: any, i: number) => i !== index)
          }
        : exp
    );
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>Add your professional work experience</CardDescription>
          </div>
          <Button onClick={addExperience} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No work experience added yet. Click "Add Experience" to get started.
          </div>
        )}
        
        {data.map((exp, index) => (
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Job Title *</Label>
                <Input 
                  placeholder="Software Engineer" 
                  value={exp.position || ''}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                />
              </div>
              <div>
                <Label>Company *</Label>
                <Input 
                  placeholder="Google Inc." 
                  value={exp.company || ''}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input 
                  placeholder="San Francisco, CA" 
                  value={exp.location || ''}
                  onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                />
              </div>
              <div>
                <Label>Start Date *</Label>
                <Input 
                  type="month" 
                  value={exp.startDate || ''}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input 
                  type="month" 
                  disabled={exp.current}
                  value={exp.current ? '' : exp.endDate || ''}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox 
                  id={`current-${exp.id}`}
                  checked={exp.current || false}
                  onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                />
                <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Job Description</Label>
                <Textarea 
                  rows={3} 
                  placeholder="Describe your role and responsibilities..."
                  value={exp.description || ''}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Key Achievements</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(exp.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
                
                {(exp.achievements || []).map((achievement: string, achIndex: number) => (
                  <div key={achIndex} className="flex gap-2 mb-2">
                    <Textarea
                      rows={2}
                      placeholder="• Increased team productivity by 25% through implementation of agile methodologies"
                      value={achievement}
                      onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(exp.id, achIndex)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  AI Optimize Achievements
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
