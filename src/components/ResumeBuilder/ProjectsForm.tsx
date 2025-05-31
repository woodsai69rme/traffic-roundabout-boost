
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, GripVertical, X } from 'lucide-react';
import { Project } from '@/services/resumeService';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      start_date: '',
      end_date: '',
      url: '',
      highlights: ['']
    };
    onChange([...data, newProject]);
    setExpandedItems(prev => new Set([...prev, newProject.id]));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(proj => proj.id === id ? { ...proj, [field]: value } : proj));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
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

  const addTechnology = (projectId: string, tech: string) => {
    const project = data.find(p => p.id === projectId);
    if (project && tech.trim() && !project.technologies.includes(tech.trim())) {
      updateProject(projectId, 'technologies', [...project.technologies, tech.trim()]);
    }
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const newTechnologies = project.technologies.filter((_, index) => index !== techIndex);
      updateProject(projectId, 'technologies', newTechnologies);
    }
  };

  const addHighlight = (projectId: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'highlights', [...project.highlights, '']);
    }
  };

  const updateHighlight = (projectId: string, index: number, value: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const newHighlights = [...project.highlights];
      newHighlights[index] = value;
      updateProject(projectId, 'highlights', newHighlights);
    }
  };

  const removeHighlight = (projectId: string, index: number) => {
    const project = data.find(p => p.id === projectId);
    if (project && project.highlights.length > 1) {
      const newHighlights = project.highlights.filter((_, i) => i !== index);
      updateProject(projectId, 'highlights', newHighlights);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {data.map((project, index) => (
        <Card key={project.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <CardTitle 
                  className="text-base cursor-pointer"
                  onClick={() => toggleExpanded(project.id)}
                >
                  {project.name || `Project ${index + 1}`}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {expandedItems.has(project.id) && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${project.id}`}>Project Name *</Label>
                  <Input
                    id={`name-${project.id}`}
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Platform"
                  />
                </div>
                <div>
                  <Label htmlFor={`url-${project.id}`}>Project URL</Label>
                  <Input
                    id={`url-${project.id}`}
                    value={project.url || ''}
                    onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <div>
                  <Label htmlFor={`start-date-${project.id}`}>Start Date</Label>
                  <Input
                    id={`start-date-${project.id}`}
                    type="month"
                    value={project.start_date}
                    onChange={(e) => updateProject(project.id, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-date-${project.id}`}>End Date</Label>
                  <Input
                    id={`end-date-${project.id}`}
                    type="month"
                    value={project.end_date || ''}
                    onChange={(e) => updateProject(project.id, 'end_date', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`description-${project.id}`}>Description *</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe what the project does and your role in it..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Technologies Used</Label>
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="flex items-center space-x-1">
                        <span>{tech}</span>
                        <button
                          onClick={() => removeTechnology(project.id, techIndex)}
                          className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
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
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        const input = (e.target as HTMLElement).parentElement?.querySelector('input');
                        if (input) {
                          addTechnology(project.id, input.value);
                          input.value = '';
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Project Highlights</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addHighlight(project.id)}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Highlight
                  </Button>
                </div>
                {project.highlights.map((highlight, highlightIndex) => (
                  <div key={highlightIndex} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={highlight}
                      onChange={(e) => updateHighlight(project.id, highlightIndex, e.target.value)}
                      placeholder="Describe a key feature or accomplishment..."
                    />
                    {project.highlights.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHighlight(project.id, highlightIndex)}
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
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to showcase your work.</p>
        </div>
      )}
    </div>
  );
};
