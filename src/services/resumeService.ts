
import { supabase } from '@/integrations/supabase/client';
import type { Resume, ResumeTemplate, AISuggestion, PersonalInfo, Experience, Education, Skill, Project, Certification, Language, CustomSection, DesignSettings } from '@/types/resume';
import type { Database } from '@/integrations/supabase/types';

type DbResumeTemplate = Database['public']['Tables']['resume_templates']['Row'];
type DbResume = Database['public']['Tables']['resumes']['Row'];
type DbAISuggestion = Database['public']['Tables']['ai_suggestions']['Row'];

export class ResumeService {
  static async getTemplates(): Promise<ResumeTemplate[]> {
    const { data, error } = await supabase
      .from('resume_templates')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return (data || []).map(this.mapDbTemplateToTemplate);
  }

  static async getUserResumes(): Promise<Resume[]> {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    return (data || []).map(this.mapDbResumeToResume);
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
    return this.mapDbResumeToResume(data);
  }

  static async createResume(resume: Partial<Resume>): Promise<Resume> {
    const dbResume = this.mapResumeToDbResume(resume);
    const { data, error } = await supabase
      .from('resumes')
      .insert([dbResume])
      .select()
      .single();
    
    if (error) throw error;
    return this.mapDbResumeToResume(data);
  }

  static async updateResume(id: string, updates: Partial<Resume>): Promise<Resume> {
    const dbUpdates = this.mapResumeToDbResume(updates);
    const { data, error } = await supabase
      .from('resumes')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return this.mapDbResumeToResume(data);
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
    return (data || []).map(this.mapDbAISuggestionToAISuggestion);
  }

  static async applyAISuggestion(suggestionId: string): Promise<void> {
    const { error } = await supabase
      .from('ai_suggestions')
      .update({ is_applied: true })
      .eq('id', suggestionId);
    
    if (error) throw error;
  }

  // Helper methods to map between DB types and our custom types
  private static mapDbTemplateToTemplate(dbTemplate: DbResumeTemplate): ResumeTemplate {
    return {
      id: dbTemplate.id,
      name: dbTemplate.name,
      description: dbTemplate.description,
      category: dbTemplate.category,
      preview_url: dbTemplate.preview_url,
      design_config: typeof dbTemplate.design_config === 'object' ? 
        dbTemplate.design_config as any : {
          colors: { primary: '#000000', secondary: '#666666' },
          fonts: { heading: 'Arial', body: 'Arial' }
        },
      is_premium: dbTemplate.is_premium,
      created_at: dbTemplate.created_at,
      updated_at: dbTemplate.updated_at,
    };
  }

  private static mapDbResumeToResume(dbResume: DbResume): Resume {
    return {
      id: dbResume.id,
      user_id: dbResume.user_id,
      template_id: dbResume.template_id,
      title: dbResume.title,
      personal_info: typeof dbResume.personal_info === 'object' ? 
        dbResume.personal_info as PersonalInfo : {} as PersonalInfo,
      experience: Array.isArray(dbResume.experience) ? 
        dbResume.experience as Experience[] : [],
      education: Array.isArray(dbResume.education) ? 
        dbResume.education as Education[] : [],
      skills: Array.isArray(dbResume.skills) ? 
        dbResume.skills as Skill[] : [],
      projects: Array.isArray(dbResume.projects) ? 
        dbResume.projects as Project[] : [],
      certifications: Array.isArray(dbResume.certifications) ? 
        dbResume.certifications as Certification[] : [],
      languages: Array.isArray(dbResume.languages) ? 
        dbResume.languages as Language[] : [],
      custom_sections: Array.isArray(dbResume.custom_sections) ? 
        dbResume.custom_sections as CustomSection[] : [],
      design_settings: typeof dbResume.design_settings === 'object' ? 
        dbResume.design_settings as DesignSettings : {} as DesignSettings,
      ats_score: dbResume.ats_score,
      is_public: dbResume.is_public,
      share_token: dbResume.share_token,
      created_at: dbResume.created_at,
      updated_at: dbResume.updated_at,
    };
  }

  private static mapResumeToDbResume(resume: Partial<Resume>): Partial<DbResume> {
    return {
      user_id: resume.user_id,
      template_id: resume.template_id,
      title: resume.title,
      personal_info: resume.personal_info as any,
      experience: resume.experience as any,
      education: resume.education as any,
      skills: resume.skills as any,
      projects: resume.projects as any,
      certifications: resume.certifications as any,
      languages: resume.languages as any,
      custom_sections: resume.custom_sections as any,
      design_settings: resume.design_settings as any,
      ats_score: resume.ats_score,
      is_public: resume.is_public,
      share_token: resume.share_token,
    };
  }

  private static mapDbAISuggestionToAISuggestion(dbSuggestion: DbAISuggestion): AISuggestion {
    return {
      id: dbSuggestion.id,
      resume_id: dbSuggestion.resume_id,
      section_type: dbSuggestion.section_type,
      suggestion_type: dbSuggestion.suggestion_type,
      original_content: dbSuggestion.original_content,
      suggested_content: dbSuggestion.suggested_content,
      reason: dbSuggestion.reason,
      is_applied: dbSuggestion.is_applied,
      created_at: dbSuggestion.created_at,
    };
  }
}
