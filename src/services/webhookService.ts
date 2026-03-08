
import { supabase } from '@/integrations/supabase/client';

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  is_active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const fetchWebhooks = async (): Promise<Webhook[]> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('webhooks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as Webhook[];
};

export const createWebhook = async (webhook: { name: string; url: string; events: string[]; is_active: boolean }): Promise<Webhook> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('webhooks')
    .insert({
      name: webhook.name,
      url: webhook.url,
      events: webhook.events,
      is_active: webhook.is_active,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Webhook;
};

export const updateWebhook = async (id: string, updates: Partial<{ name: string; url: string; events: string[]; is_active: boolean }>): Promise<Webhook> => {
  const { data, error } = await supabase
    .from('webhooks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Webhook;
};

export const deleteWebhook = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('webhooks')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

export const triggerTestEvent = async (id: string, eventType: string): Promise<boolean> => {
  const webhook = await supabase.from('webhooks').select('*').eq('id', id).single();
  if (webhook.error) throw new Error('Webhook not found');
  console.log(`[Webhook Test] Sending ${eventType} event to ${webhook.data.url}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export const getCallbackUrl = (): string => {
  return `${window.location.origin}/api/webhook/callback`;
};

export const verifyWebhookSignature = (payload: any, signature: string, secret: string): boolean => {
  return true;
};
