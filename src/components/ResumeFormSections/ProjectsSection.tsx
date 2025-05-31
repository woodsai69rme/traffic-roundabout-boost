
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, X, ExternalLink, Github } from 'lucide-react';

interface ProjectsSectionProps {
  data: any[];
  onChange: (projects: any[]) => void;
}

const ProjectsSection = ({ data, onChange }: ProjectsSectionProps) => {
  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      current: false,
      github_url: '',
      live_url: '',
      achievements: ['']
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: number) => {
    onChange(data.filter(project => project.id !== id));
  };

  const updateProject = (id: number, field: string, value: any) => {
    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const addTechnology = (projectId: number, tech: string) => {
    if (tech.trim()) {
      const updated = data.map(project => 
        project.id === projectId 
          ? { ...project, technologies: [...(project.technologies || []), tech.trim()] }
          : project
      );
      onChange(updated);
    }
  };

  const removeTechnology = (projectId: number, techIndex: number) => {
    const updated = data.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            technologies: project.technologies.filter((_: any, index: number) => index !== techIndex)
          }
        : project
    );
    onChange(updated);
  };

  const addAchievement = (projectId: number) => {
    const updated = data.map(project => 
      project.id === projectId 
        ? { ...project, achievements: [...(project.achievements || []), ''] }
        : project
    );
    onChange(updated);
  };

  const updateAchievement = (projectId: number, index: number, value: string) => {
    const updated = data.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            achievements: project.achievements.map((ach: string, i: number) => 
              i === index ? value : ach
            )
          }
        : project
    );
    onChange(updated);
  };

  const removeAchievement = (projectId: number, index: number) => {
    const updated = data.map(project => 
      project.id === projectId 
        ? { 
            ...project, 
            achievements: project.achievements.filter((_: any, i: number) => i !== index)
          }
        : project
    );
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Showcase your personal and professional projects</CardDescription>
          </div>
          <Button onClick={addProject} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No projects added yet. Click "Add Project" to showcase your work.
          </div>
        )}
        
        {data.map((project, index) => (
          <Card key={project.id} className="p-4">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium">Project #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <Label>Project Name *</Label>
                <Input 
                  placeholder="E-commerce Platform" 
                  value={project.name || ''}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                />
              </div>
              
              <div>
                <Label>Start Date</Label>
                <Input 
                  type="month" 
                  value={project.startDate || ''}
                  onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input 
                  type="month" 
                  value={project.endDate || ''}
                  onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                />
              </div>
              
              <div>
                <Label>GitHub URL</Label>
                <div className="flex">
                  <Github className="h-4 w-4 mt-2.5 mr-2 text-muted-foreground" />
                  <Input 
                    placeholder="https://github.com/username/project" 
                    value={project.github_url || ''}
                    onChange={(e) => updateProject(project.id, 'github_url', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Live Demo URL</Label>
                <div className="flex">
                  <ExternalLink className="h-4 w-4 mt-2.5 mr-2 text-muted-foreground" />
                  <Input 
                    placeholder="https://yourproject.com" 
                    value={project.live_url || ''}
                    onChange={(e) => updateProject(project.id, 'live_url', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Project Description *</Label>
                <Textarea 
                  rows={3} 
                  placeholder="Describe what the project does, its purpose, and your role..."
                  value={project.description || ''}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(project.technologies || []).map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary" className="pr-1">
                      {tech}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-2 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeTechnology(project.id, index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Add technology (e.g., React, Node.js)" 
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        addTechnology(project.id, input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addTechnology(project.id, input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Key Achievements & Features</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addAchievement(project.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
                
                {(project.achievements || []).map((achievement: string, achIndex: number) => (
                  <div key={achIndex} className="flex gap-2 mb-2">
                    <Textarea
                      rows={2}
                      placeholder="• Implemented user authentication system with JWT tokens"
                      value={achievement}
                      onChange={(e) => updateAchievement(project.id, achIndex, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(project.id, achIndex)}
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
