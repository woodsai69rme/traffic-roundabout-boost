
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Wand2 } from 'lucide-react';

interface SkillsSectionProps {
  data: any[];
  onChange: (skills: any[]) => void;
}

const SkillsSection = ({ data, onChange }: SkillsSectionProps) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate', category: 'Technical' });

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill = {
        id: Date.now(),
        ...newSkill
      };
      onChange([...data, skill]);
      setNewSkill({ name: '', level: 'Intermediate', category: 'Technical' });
    }
  };

  const removeSkill = (id: number) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const skillCategories = ['Technical', 'Soft Skills', 'Languages', 'Tools', 'Frameworks', 'Other'];

  const groupedSkills = data.reduce((acc: any, skill: any) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  const suggestedSkills = {
    'Technical': ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'HTML/CSS', 'Java', 'C++'],
    'Tools': ['VS Code', 'Docker', 'AWS', 'Jira', 'Figma', 'Photoshop', 'Excel', 'Slack'],
    'Soft Skills': ['Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Project Management']
  };

  const addSuggestedSkill = (skillName: string, category: string) => {
    const skill = {
      id: Date.now(),
      name: skillName,
      level: 'Intermediate',
      category: category
    };
    onChange([...data, skill]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Expertise</CardTitle>
        <CardDescription>Add your technical and soft skills</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Add New Skill */}
        <Card className="p-4">
          <h4 className="font-medium mb-4">Add New Skill</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label>Skill Name</Label>
              <Input 
                placeholder="e.g., JavaScript, Leadership, etc." 
                value={newSkill.name}
                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
            </div>
            <div>
              <Label>Proficiency Level</Label>
              <Select 
                value={newSkill.level} 
                onValueChange={(value) => setNewSkill({...newSkill, level: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select 
                value={newSkill.category} 
                onValueChange={(value) => setNewSkill({...newSkill, category: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={addSkill} className="mt-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        </Card>

        {/* Suggested Skills */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Suggested Skills</h4>
            <Button variant="ghost" size="sm">
              <Wand2 className="h-4 w-4 mr-2" />
              AI Suggestions
            </Button>
          </div>
          {Object.entries(suggestedSkills).map(([category, skills]) => (
            <div key={category} className="mb-4">
              <Label className="text-sm text-muted-foreground">{category}</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {(skills as string[]).map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => addSuggestedSkill(skill, category)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </Card>

        {/* Current Skills by Category */}
        {Object.keys(groupedSkills).length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium">Your Skills</h4>
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <Card key={category} className="p-4">
                <h5 className="font-medium text-sm text-muted-foreground mb-3">{category}</h5>
                <div className="flex flex-wrap gap-2">
                  {(skills as any[]).map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="pr-1">
                      <span className="mr-2">{skill.name}</span>
                      <span className="text-xs opacity-70">({skill.level})</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeSkill(skill.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No skills added yet. Add your first skill above or choose from suggestions.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
