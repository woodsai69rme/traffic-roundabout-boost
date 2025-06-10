
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  honors?: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
  startDate: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'basic' | 'conversational' | 'professional' | 'native';
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'list';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  design_config: {
    colors: {
      primary: string;
      secondary: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  preview_url?: string;
  is_premium: boolean;
}

export interface Resume {
  id: string;
  user_id: string;
  template_id?: string;
  title: string;
  personal_info: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  custom_sections: CustomSection[];
  design_settings: Record<string, any>;
  ats_score: number;
  is_public: boolean;
  share_token?: string;
  created_at: string;
  updated_at: string;
}

export interface AISuggestion {
  id: string;
  resume_id: string;
  section_type: string;
  suggestion_type: string;
  original_content?: string;
  suggested_content: string;
  reason?: string;
  is_applied: boolean;
  created_at: string;
}
