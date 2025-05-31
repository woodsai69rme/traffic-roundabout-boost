
import { supabase } from '@/integrations/supabase/client';

export interface PersonalInfo {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date?: string;
  gpa?: string;
  honors?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  start_date: string;
  end_date?: string;
  url?: string;
  highlights: string[];
}

export interface Resume {
  id?: string;
  user_id?: string;
  template_id?: string;
  title: string;
  personal_info: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: any[];
  languages: any[];
  custom_sections: any[];
  design_settings: any;
  ats_score?: number;
  is_public?: boolean;
  share_token?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description?: string;
  category: string;
  design_config: any;
  preview_url?: string;
  is_premium?: boolean;
}

export const resumeService = {
  async getResumes(): Promise<Resume[]> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getResume(id: string): Promise<Resume | null> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createResume(resume: Partial<Resume>): Promise<Resume> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('resumes')
      .insert({
        ...resume,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateResume(id: string, resume: Partial<Resume>): Promise<Resume> {
    const { data, error } = await supabase
      .from('resumes')
      .update(resume)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteResume(id: string): Promise<void> {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getTemplates(): Promise<ResumeTemplate[]> {
    const { data, error } = await supabase
      .from('resume_templates')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  },

  async duplicateResume(id: string): Promise<Resume> {
    const original = await this.getResume(id);
    if (!original) throw new Error('Resume not found');

    const { id: _, user_id, created_at, updated_at, ...resumeData } = original;
    
    return this.createResume({
      ...resumeData,
      title: `${resumeData.title} (Copy)`
    });
  }
};
