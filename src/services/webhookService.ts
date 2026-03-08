
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

// In-memory mock store
let mockWebhooks: Webhook[] = [];

export const fetchWebhooks = async (): Promise<Webhook[]> => {
  return [...mockWebhooks];
};

export const createWebhook = async (webhook: Omit<Webhook, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<Webhook> => {
  const now = new Date().toISOString();
  const newWebhook: Webhook = {
    ...webhook,
    id: crypto.randomUUID(),
    user_id: 'mock-user',
    created_at: now,
    updated_at: now,
  };
  mockWebhooks.push(newWebhook);
  return newWebhook;
};

export const updateWebhook = async (id: string, updates: Partial<Omit<Webhook, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<Webhook> => {
  const idx = mockWebhooks.findIndex(w => w.id === id);
  if (idx === -1) throw new Error('Webhook not found');
  mockWebhooks[idx] = { ...mockWebhooks[idx], ...updates, updated_at: new Date().toISOString() };
  return mockWebhooks[idx];
};

export const deleteWebhook = async (id: string): Promise<boolean> => {
  mockWebhooks = mockWebhooks.filter(w => w.id !== id);
  return true;
};

export const triggerTestEvent = async (id: string, eventType: string): Promise<boolean> => {
  const webhook = mockWebhooks.find(w => w.id === id);
  if (!webhook) throw new Error('Webhook not found');
  console.log(`[Webhook Test] Sending ${eventType} event to ${webhook.url}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return true;
};

export const getCallbackUrl = (): string => {
  return `${window.location.origin}/api/webhook/callback`;
};

export const verifyWebhookSignature = (payload: any, signature: string, secret: string): boolean => {
  return true;
};
