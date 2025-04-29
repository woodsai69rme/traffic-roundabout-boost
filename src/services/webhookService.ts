
import { supabase } from "@/integrations/supabase/client";

export interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface WebhookError extends Error {
  code?: string;
  details?: string;
}

/**
 * Fetch all webhooks for the current user
 */
export const fetchWebhooks = async (): Promise<Webhook[]> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('webhooks')
    .select('*')
    .eq('user_id', user.user.id);
  
  if (error) {
    const webhookError = new Error("Error fetching webhooks: " + error.message) as WebhookError;
    webhookError.code = error.code;
    webhookError.details = error.details;
    console.error("Error fetching webhooks:", error);
    throw webhookError;
  }
  
  return data || [];
};

/**
 * Create a new webhook
 */
export const createWebhook = async (webhook: Omit<Webhook, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Webhook> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const now = new Date().toISOString();
  
  const { data, error } = await supabase
    .from('webhooks')
    .insert({
      ...webhook,
      user_id: user.user.id,
      created_at: now,
      updated_at: now
    })
    .select()
    .single();
  
  if (error) {
    const webhookError = new Error("Error creating webhook: " + error.message) as WebhookError;
    webhookError.code = error.code;
    webhookError.details = error.details;
    console.error("Error creating webhook:", error);
    throw webhookError;
  }
  
  return data;
};

/**
 * Update an existing webhook
 */
export const updateWebhook = async (id: string, updates: Partial<Omit<Webhook, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Webhook> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { data, error } = await supabase
    .from('webhooks')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.user.id)
    .select()
    .single();
  
  if (error) {
    const webhookError = new Error("Error updating webhook: " + error.message) as WebhookError;
    webhookError.code = error.code;
    webhookError.details = error.details;
    console.error("Error updating webhook:", error);
    throw webhookError;
  }
  
  return data;
};

/**
 * Delete a webhook
 */
export const deleteWebhook = async (id: string): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  const { error } = await supabase
    .from('webhooks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.user.id);
  
  if (error) {
    const webhookError = new Error("Error deleting webhook: " + error.message) as WebhookError;
    webhookError.code = error.code;
    webhookError.details = error.details;
    console.error("Error deleting webhook:", error);
    throw webhookError;
  }
  
  return true;
};

/**
 * Trigger a test event for a webhook
 */
export const triggerTestEvent = async (id: string, eventType: string): Promise<boolean> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user.user) {
    throw new Error("User not authenticated");
  }
  
  // Get the webhook to check if it's valid and get the URL
  const { data: webhook, error: fetchError } = await supabase
    .from('webhooks')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.user.id)
    .single();
  
  if (fetchError) {
    const webhookError = new Error("Error fetching webhook: " + fetchError.message) as WebhookError;
    webhookError.code = fetchError.code;
    webhookError.details = fetchError.details;
    console.error("Error fetching webhook:", fetchError);
    throw webhookError;
  }
  
  if (!webhook) {
    throw new Error("Webhook not found");
  }
  
  // In a real implementation, this would be a call to a backend service
  // that sends a test payload to the webhook URL
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demonstration purposes, we'll log the event we would send
    console.log(`[Webhook Test] Sending ${eventType} event to ${webhook.url}`);
    console.log(`[Webhook Test] Payload:`, {
      event: eventType,
      timestamp: new Date().toISOString(),
      user_id: user.user.id,
      test: true
    });
    
    return true;
  } catch (error) {
    console.error("Error triggering test event:", error);
    throw new Error(`Failed to trigger test event: ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Get webhook callback URL for this application
 */
export const getCallbackUrl = (): string => {
  // In a real application, this would be a stable URL for your webhook endpoint
  const baseUrl = window.location.origin;
  return `${baseUrl}/api/webhook/callback`;
};

/**
 * Verify a webhook signature
 * This would typically be done on the server side
 */
export const verifyWebhookSignature = (payload: any, signature: string, secret: string): boolean => {
  // In a real implementation, this would verify that the webhook payload
  // was genuinely sent by your application and not by a malicious actor
  
  // For demonstration purposes, we'll always return true
  return true;
};
