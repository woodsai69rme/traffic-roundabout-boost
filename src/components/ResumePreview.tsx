
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Share, Eye, ExternalLink, Github, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface ResumePreviewProps {
  data: any;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const groupedSkills = (skills || []).reduce((acc: any, skill: any) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button size="sm" variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white border rounded-lg p-8 text-black min-h-[800px] shadow-lg">
          
          {/* Header Section */}
          <div className="border-b-2 border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {personalInfo?.firstName} {personalInfo?.lastName}
            </h1>
            
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              {personalInfo?.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {personalInfo.email}
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {personalInfo.phone}
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {personalInfo.location}
                </div>
              )}
              {personalInfo?.website && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="text-blue-600">{personalInfo.website}</span>
                </div>
              )}
            </div>
            
            {personalInfo?.summary && (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            )}
          </div>

          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-4">
                {experience.map((exp: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                        {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                        </p>
                      </div>
                    </div>
                    
                    {exp.description && (
                      <p className="text-gray-700 mb-2 text-sm">{exp.description}</p>
                    )}
                    
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="list-none space-y-1">
                        {exp.achievements.map((achievement: string, achIndex: number) => (
                          achievement.trim() && (
                            <li key={achIndex} className="text-gray-700 text-sm">
                              {achievement.startsWith('•') ? achievement : `• ${achievement}`}
                            </li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
                PROJECTS
              </h2>
              <div className="space-y-4">
                {projects.map((project: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{project.name}</h3>
                        <div className="flex gap-4 mt-1">
                          {project.github_url && (
                            <div className="flex items-center gap-1 text-blue-600 text-sm">
                              <Github className="h-3 w-3" />
                              GitHub
                            </div>
                          )}
                          {project.live_url && (
                            <div className="flex items-center gap-1 text-blue-600 text-sm">
                              <ExternalLink className="h-3 w-3" />
                              Live Demo
                            </div>
                          )}
                        </div>
                      </div>
                      {(project.startDate || project.endDate) && (
                        <div className="text-right text-sm text-gray-600">
                          <p>
                            {formatDate(project.startDate)} - {formatDate(project.endDate)}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {project.description && (
                      <p className="text-gray-700 mb-2 text-sm">{project.description}</p>
                    )}
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech: string, techIndex: number) => (
                          <span 
                            key={techIndex} 
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {project.achievements && project.achievements.length > 0 && (
                      <ul className="list-none space-y-1">
                        {project.achievements.map((achievement: string, achIndex: number) => (
                          achievement.trim() && (
                            <li key={achIndex} className="text-gray-700 text-sm">
                              {achievement.startsWith('•') ? achievement : `• ${achievement}`}
                            </li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {education && education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
                EDUCATION
              </h2>
              <div className="space-y-3">
                {education.map((edu: any, index: number) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.school}</h3>
                      <p className="text-gray-700">{edu.degree} in {edu.field}</p>
                      {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                      {edu.achievements && (
                        <p className="text-gray-600 text-sm mt-1">{edu.achievements}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                      {edu.location && <p>{edu.location}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {Object.keys(groupedSkills).length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
                SKILLS
              </h2>
              <div className="space-y-3">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(categorySkills as any[]).map((skill, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center text-gray-400 text-xs mt-8 pt-4 border-t border-gray-200">
            Generated with ResumeBuilder Pro - Template: {data.template}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
