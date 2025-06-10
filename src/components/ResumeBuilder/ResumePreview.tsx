
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Resume } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
}

const ResumePreview = ({ resume }: ResumePreviewProps) => {
  const { personal_info, experience, education, skills, projects, certifications } = resume;

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm min-h-[800px] text-black">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personal_info.full_name || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          {personal_info.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {personal_info.email}
            </div>
          )}
          {personal_info.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {personal_info.phone}
            </div>
          )}
          {personal_info.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {personal_info.location}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personal_info.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <a href={personal_info.website} className="text-blue-600 hover:underline">
                Website
              </a>
            </div>
          )}
          {personal_info.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <a href={personal_info.linkedin} className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
        </div>

        {personal_info.summary && (
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed">{personal_info.summary}</p>
          </div>
        )}
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    <p>{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</p>
                    {exp.location && <p>{exp.location}</p>}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.field_of_study && (
                      <p className="text-gray-600 text-sm">{edu.field_of_study}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    <p>{edu.start_date} - {edu.end_date}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="text-xs">
                {skill.name} ({skill.level})
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <div className="text-sm text-gray-500">
                    {project.start_date} - {project.end_date}
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
                {project.url && (
                  <a href={project.url} className="text-blue-600 hover:underline text-sm">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                    {cert.credential_id && (
                      <p className="text-gray-500 text-sm">ID: {cert.credential_id}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    <p>Issued: {cert.date}</p>
                    {cert.expiry_date && <p>Expires: {cert.expiry_date}</p>}
                  </div>
                </div>
                {cert.url && (
                  <a href={cert.url} className="text-blue-600 hover:underline text-sm">
                    Verify Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
