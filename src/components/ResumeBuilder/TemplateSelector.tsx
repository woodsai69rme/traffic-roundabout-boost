
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { resumeService, ResumeTemplate } from '@/services/resumeService';
import { Check, Crown } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate?: string;
  onTemplateChange: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange
}) => {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const data = await resumeService.getTemplates();
      setTemplates(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getTemplatePreview = (template: ResumeTemplate) => {
    const colors = template.design_config?.colors || { primary: '#2563eb', secondary: '#64748b' };
    
    return (
      <div className="w-full h-48 bg-white border rounded-lg p-4 relative overflow-hidden">
        <div 
          className="h-3 w-full rounded mb-3"
          style={{ backgroundColor: colors.primary }}
        />
        <div className="space-y-2">
          <div 
            className="h-2 w-3/4 rounded"
            style={{ backgroundColor: colors.secondary, opacity: 0.7 }}
          />
          <div 
            className="h-2 w-1/2 rounded"
            style={{ backgroundColor: colors.secondary, opacity: 0.5 }}
          />
          <div 
            className="h-2 w-2/3 rounded"
            style={{ backgroundColor: colors.secondary, opacity: 0.3 }}
          />
        </div>
        <div className="mt-4 space-y-1">
          <div 
            className="h-1 w-full rounded"
            style={{ backgroundColor: colors.secondary, opacity: 0.2 }}
          />
          <div 
            className="h-1 w-4/5 rounded"
            style={{ backgroundColor: colors.secondary, opacity: 0.2 }}
          />
          <div 
            className="h-1 w-3/5 rounded"
            style={{ backgroundColor: colors.secondary, opacity: 0.2 }}
          />
        </div>
        
        {selectedTemplate === template.id && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}
        
        {template.is_premium && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-48 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose a Template</h3>
        <p className="text-gray-600 text-sm">
          Select a professional template that best fits your industry and personal style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id ? 'ring-2 ring-blue-500 shadow-md' : ''
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <CardContent className="p-4">
              {getTemplatePreview(template)}
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{template.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
                {template.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {template.description}
                  </p>
                )}
                <Button
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTemplateChange(template.id);
                  }}
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    'Select Template'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No templates available.</p>
        </div>
      )}
    </div>
  );
};
