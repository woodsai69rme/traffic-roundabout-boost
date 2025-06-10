
import { supabase } from '@/integrations/supabase/client';
import type { Resume, ResumeTemplate, AISuggestion } from '@/types/resume';

export class ResumeService {
  static async getTemplates(): Promise<ResumeTemplate[]> {
    const { data, error } = await supabase
      .from('resume_templates')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  static async getUserResumes(): Promise<Resume[]> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async getResume(id: string): Promise<Resume | null> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  static async createResume(resume: Partial<Resume>): Promise<Resume> {
    const { data, error } = await supabase
      .from('resumes')
      .insert([{
        ...resume,
        personal_info: resume.personal_info || {},
        experience: resume.experience || [],
        education: resume.education || [],
        skills: resume.skills || [],
        projects: resume.projects || [],
        certifications: resume.certifications || [],
        languages: resume.languages || [],
        custom_sections: resume.custom_sections || [],
        design_settings: resume.design_settings || {},
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async updateResume(id: string, updates: Partial<Resume>): Promise<Resume> {
    const { data, error } = await supabase
      .from('resumes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async deleteResume(id: string): Promise<void> {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  static async generateShareToken(id: string): Promise<string> {
    const token = crypto.randomUUID();
    await this.updateResume(id, { share_token: token, is_public: true });
    return token;
  }

  static async getAISuggestions(resumeId: string): Promise<AISuggestion[]> {
    const { data, error } = await supabase
      .from('ai_suggestions')
      .select('*')
      .eq('resume_id', resumeId)
      .eq('is_applied', false)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }

  static async applyAISuggestion(suggestionId: string): Promise<void> {
    const { error } = await supabase
      .from('ai_suggestions')
      .update({ is_applied: true })
      .eq('id', suggestionId);
    
    if (error) throw error;
  }
}
