
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { resumeService, Resume, ResumeTemplate } from '@/services/resumeService';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resume }) => {
  const [template, setTemplate] = useState<ResumeTemplate | null>(null);

  useEffect(() => {
    if (resume.template_id) {
      loadTemplate();
    }
  }, [resume.template_id]);

  const loadTemplate = async () => {
    try {
      const templates = await resumeService.getTemplates();
      const selectedTemplate = templates.find(t => t.id === resume.template_id);
      setTemplate(selectedTemplate || null);
    } catch (error) {
      console.error('Failed to load template:', error);
    }
  };

  const getTemplateColors = () => {
    if (template?.design_config?.colors) {
      return template.design_config.colors;
    }
    return { primary: '#2563eb', secondary: '#64748b' };
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const colors = getTemplateColors();

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white border rounded-lg p-6 shadow-sm min-h-[800px] max-h-[800px] overflow-y-auto">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <h1 
              className="text-3xl font-bold mb-2"
              style={{ color: colors.primary }}
            >
              {resume.personal_info.full_name || 'Your Name'}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
              {resume.personal_info.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {resume.personal_info.email}
                </div>
              )}
              {resume.personal_info.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {resume.personal_info.phone}
                </div>
              )}
              {resume.personal_info.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {resume.personal_info.location}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {resume.personal_info.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <a href={resume.personal_info.website} className="text-blue-600 hover:underline">
                    Website
                  </a>
                </div>
              )}
              {resume.personal_info.linkedin && (
                <div className="flex items-center gap-1">
                  <Linkedin className="h-4 w-4" />
                  <a href={resume.personal_info.linkedin} className="text-blue-600 hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
            </div>

            {resume.personal_info.summary && (
              <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">
                  {resume.personal_info.summary}
                </p>
              </div>
            )}
          </div>

          {/* Experience */}
          {resume.experience.length > 0 && (
            <div className="mb-6">
              <h2 
                className="text-xl font-semibold mb-4 pb-2 border-b"
                style={{ color: colors.primary }}
              >
                Professional Experience
              </h2>
              {resume.experience.map((exp, index) => (
                <div key={exp.id} className={index > 0 ? 'mt-4' : ''}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date || '')}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-700 mb-2">{exp.description}</p>
                  )}
                  {exp.achievements.filter(a => a.trim()).length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {exp.achievements.filter(a => a.trim()).map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div className="mb-6">
              <h2 
                className="text-xl font-semibold mb-4 pb-2 border-b"
                style={{ color: colors.primary }}
              >
                Education
              </h2>
              {resume.education.map((edu, index) => (
                <div key={edu.id} className={index > 0 ? 'mt-3' : ''}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold">{edu.degree} in {edu.field_of_study}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(edu.start_date)} - {formatDate(edu.end_date || '')}
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    {edu.honors && <span>{edu.honors}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {resume.skills.length > 0 && (
            <div className="mb-6">
              <h2 
                className="text-xl font-semibold mb-4 pb-2 border-b"
                style={{ color: colors.primary }}
              >
                Skills
              </h2>
              <div className="space-y-3">
                {['technical', 'soft', 'language', 'tools', 'other'].map(category => {
                  const categorySkills = resume.skills.filter(skill => skill.category === category);
                  if (categorySkills.length === 0) return null;
                  
                  const categoryLabels: Record<string, string> = {
                    technical: 'Technical Skills',
                    soft: 'Soft Skills',
                    language: 'Languages',
                    tools: 'Tools & Software',
                    other: 'Other Skills'
                  };

                  return (
                    <div key={category}>
                      <h3 className="font-medium text-gray-800 mb-2">{categoryLabels[category]}</h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map(skill => (
                          <Badge key={skill.id} variant="secondary" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div className="mb-6">
              <h2 
                className="text-xl font-semibold mb-4 pb-2 border-b"
                style={{ color: colors.primary }}
              >
                Projects
              </h2>
              {resume.projects.map((project, index) => (
                <div key={project.id} className={index > 0 ? 'mt-4' : ''}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      {project.url && (
                        <a 
                          href={project.url} 
                          className="text-blue-600 hover:underline text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                    {project.start_date && (
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(project.start_date)} - {project.end_date ? formatDate(project.end_date) : 'Present'}
                      </div>
                    )}
                  </div>
                  
                  {project.description && (
                    <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                  )}
                  
                  {project.technologies.length > 0 && (
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {project.highlights.filter(h => h.trim()).length > 0 && (
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {project.highlights.filter(h => h.trim()).map((highlight, highlightIndex) => (
                        <li key={highlightIndex}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!resume.personal_info.full_name && resume.experience.length === 0 && resume.education.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">Your resume preview will appear here</p>
              <p className="text-sm">Start by filling out your personal information</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
