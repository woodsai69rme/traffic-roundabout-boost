
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus } from 'lucide-react';
import type { Project } from '@/types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onUpdate: (projects: Project[]) => void;
}

const ProjectsForm = ({ projects, onUpdate }: ProjectsFormProps) => {
  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      start_date: '',
      end_date: ''
    };
    onUpdate([...projects, newProject]);
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = projects.map((project, i) => 
      i === index ? { ...project, [field]: value } : project
    );
    onUpdate(updated);
  };

  const removeProject = (index: number) => {
    onUpdate(projects.filter((_, i) => i !== index));
  };

  const updateTechnologies = (index: number, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(Boolean);
    updateProject(index, 'technologies', technologies);
  };

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <Card key={project.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Project {index + 1}</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeProject(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Project Name *</Label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                placeholder="My Awesome Project"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                placeholder="Describe what this project does and your role in it..."
                rows={3}
              />
            </div>

            <div>
              <Label>Technologies Used</Label>
              <Input
                value={project.technologies.join(', ')}
                onChange={(e) => updateTechnologies(index, e.target.value)}
                placeholder="React, TypeScript, Node.js, PostgreSQL"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Separate technologies with commas
              </p>
            </div>

            <div>
              <Label>Project URL</Label>
              <Input
                value={project.url}
                onChange={(e) => updateProject(index, 'url', e.target.value)}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={project.start_date}
                  onChange={(e) => updateProject(index, 'start_date', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={project.end_date}
                  onChange={(e) => updateProject(index, 'end_date', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
