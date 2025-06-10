
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import type { Skill } from '@/types/resume';

interface SkillsFormProps {
  skills: Skill[];
  onUpdate: (skills: Skill[]) => void;
}

const SkillsForm = ({ skills, onUpdate }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: crypto.randomUUID(),
        name: newSkill.trim(),
        level: 'intermediate'
      };
      onUpdate([...skills, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    onUpdate(skills.filter(skill => skill.id !== id));
  };

  const updateSkillLevel = (id: string, level: 'beginner' | 'intermediate' | 'advanced' | 'expert') => {
    onUpdate(skills.map(skill => 
      skill.id === id ? { ...skill, level } : skill
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="new-skill">Add Skill</Label>
          <Input
            id="new-skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, Project Management"
          />
        </div>
        <div className="flex items-end">
          <Button onClick={addSkill}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {skills.length > 0 && (
        <div className="space-y-4">
          <Label>Your Skills</Label>
          <div className="grid gap-3">
            {skills.map((skill) => (
              <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-medium">{skill.name}</span>
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkillLevel(skill.id, e.target.value as any)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skill.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
