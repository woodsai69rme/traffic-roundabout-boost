
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design perfect for tech roles',
      preview: '/api/placeholder/300/400',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional layout ideal for corporate positions',
      preview: '/api/placeholder/300/400',
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold design for creative and design roles',
      preview: '/api/placeholder/300/400',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant layout with focus on content',
      preview: '/api/placeholder/300/400',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Template</CardTitle>
        <CardDescription>Select a template that best fits your industry and style</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all ${
                selectedTemplate === template.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onTemplateChange(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              
              <div className="aspect-[3/4] bg-muted rounded mb-3 flex items-center justify-center">
                <span className="text-muted-foreground">Template Preview</span>
              </div>
              
              <h3 className="font-semibold mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
