
-- Create resumes table
CREATE TABLE public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  template_id TEXT NOT NULL DEFAULT 'modern',
  personal_info JSONB NOT NULL DEFAULT '{}',
  experience JSONB NOT NULL DEFAULT '[]',
  education JSONB NOT NULL DEFAULT '[]',
  skills JSONB NOT NULL DEFAULT '[]',
  certifications JSONB NOT NULL DEFAULT '[]',
  projects JSONB NOT NULL DEFAULT '[]',
  languages JSONB NOT NULL DEFAULT '[]',
  references JSONB NOT NULL DEFAULT '[]',
  custom_sections JSONB NOT NULL DEFAULT '[]',
  ats_score INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resume_templates table
CREATE TABLE public.resume_templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  preview_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resume_shares table
CREATE TABLE public.resume_shares (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resume_id UUID REFERENCES public.resumes NOT NULL,
  share_token TEXT UNIQUE NOT NULL,
  is_public BOOLEAN DEFAULT false,
  password_protected BOOLEAN DEFAULT false,
  password_hash TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_shares ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for resumes
CREATE POLICY "Users can view their own resumes" 
  ON public.resumes 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own resumes" 
  ON public.resumes 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own resumes" 
  ON public.resumes 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own resumes" 
  ON public.resumes 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for templates (public read)
CREATE POLICY "Anyone can view templates" 
  ON public.resume_templates 
  FOR SELECT 
  TO public
  USING (true);

-- Create RLS policies for shares
CREATE POLICY "Users can view their resume shares" 
  ON public.resume_shares 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.resumes 
    WHERE resumes.id = resume_shares.resume_id 
    AND resumes.user_id = auth.uid()
  ));

CREATE POLICY "Users can create shares for their resumes" 
  ON public.resume_shares 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.resumes 
    WHERE resumes.id = resume_id 
    AND resumes.user_id = auth.uid()
  ));

-- Insert default templates
INSERT INTO public.resume_templates (id, name, category, description, is_premium) VALUES
('modern', 'Modern Professional', 'Modern', 'Clean and contemporary design perfect for tech roles', false),
('classic', 'Classic Executive', 'Classic', 'Traditional layout ideal for corporate positions', true),
('creative', 'Creative Designer', 'Creative', 'Bold design for creative and design roles', false),
('minimal', 'Minimal Clean', 'Minimal', 'Simple and elegant layout with focus on content', false),
('tech', 'Tech Specialist', 'Modern', 'Designed specifically for software engineers', true),
('academic', 'Academic Scholar', 'Classic', 'Perfect for academic and research positions', false);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON public.resumes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
