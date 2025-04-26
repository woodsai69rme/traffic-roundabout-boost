
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { AlertCircleIcon, CopyIcon, PlusCircleIcon, CheckIcon, XIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  fetchWebhooks, 
  createWebhook, 
  updateWebhook, 
  deleteWebhook, 
  triggerTestEvent,
  getCallbackUrl 
} from '@/services/webhookService';
import type { Webhook } from '@/services/webhookService';

const WebhookIntegration = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [newWebhook, setNewWebhook] = useState<Partial<Webhook>>({
    name: '',
    url: '',
    events: ['post.created', 'engagement.received'],
    active: true
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [testingWebhookId, setTestingWebhookId] = useState<string | null>(null);

  const eventOptions = [
    { id: 'post.created', name: 'Post Created' },
    { id: 'post.engagement', name: 'Post Engagement' },
    { id: 'follower.new', name: 'New Follower' },
    { id: 'engagement.received', name: 'Engagement Received' },
    { id: 'message.received', name: 'Message Received' }
  ];
  
  useEffect(() => {
    loadWebhooks();
  }, []);
  
  const loadWebhooks = async () => {
    setIsLoading(true);
    try {
      const data = await fetchWebhooks();
      setWebhooks(data);
    } catch (error) {
      console.error("Error loading webhooks:", error);
      toast({
        title: "Error Loading Webhooks",
        description: "Failed to load webhooks. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateWebhook = async () => {
    try {
      if (!newWebhook.name || !newWebhook.url) {
        throw new Error("Name and URL are required");
      }
      
      await createWebhook({
        name: newWebhook.name,
        url: newWebhook.url,
        events: newWebhook.events || [],
        active: newWebhook.active ?? true
      });
      
      toast({
        title: "Webhook Created",
        description: "Your webhook has been created successfully."
      });
      
      await loadWebhooks();
      setNewWebhook({
        name: '',
        url: '',
        events: ['post.created', 'engagement.received'],
        active: true
      });
      setShowAddForm(false);
    } catch (error) {
      toast({
        title: "Error Creating Webhook",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });
    }
  };
  
  const handleToggleWebhook = async (id: string, active: boolean) => {
    try {
      await updateWebhook(id, { active });
      
      setWebhooks(webhooks.map(webhook => 
        webhook.id === id ? { ...webhook, active } : webhook
      ));
      
      toast({
        title: active ? "Webhook Activated" : "Webhook Deactivated",
        description: `Webhook has been ${active ? 'activated' : 'deactivated'}.`
      });
    } catch (error) {
      toast({
        title: "Error Updating Webhook",
        description: "Failed to update webhook status.",
        variant: "destructive"
      });
    }
  };
  
  const handleDeleteWebhook = async (id: string) => {
    try {
      await deleteWebhook(id);
      await loadWebhooks();
      
      toast({
        title: "Webhook Deleted",
        description: "Your webhook has been deleted successfully."
      });
    } catch (error) {
      toast({
        title: "Error Deleting Webhook",
        description: "Failed to delete webhook.",
        variant: "destructive"
      });
    }
  };
  
  const handleToggleEvent = (eventId: string) => {
    setNewWebhook(prev => {
      const currentEvents = prev.events || [];
      return {
        ...prev,
        events: currentEvents.includes(eventId)
          ? currentEvents.filter(id => id !== eventId)
          : [...currentEvents, eventId]
      };
    });
  };
  
  const handleTestWebhook = async (webhookId: string) => {
    setTestingWebhookId(webhookId);
    try {
      // Test with the first event type in the webhook's events list
      const webhook = webhooks.find(w => w.id === webhookId);
      if (!webhook || webhook.events.length === 0) {
        throw new Error("No events configured for this webhook");
      }
      
      const eventToTest = webhook.events[0];
      await triggerTestEvent(webhookId, eventToTest);
      
      toast({
        title: "Test Sent Successfully",
        description: "The test payload was sent to your webhook URL."
      });
    } catch (error) {
      toast({
        title: "Test Failed",
        description: error instanceof Error ? error.message : "Failed to send test payload",
        variant: "destructive"
      });
    } finally {
      setTestingWebhookId(null);
    }
  };
  
  const copyWebhookUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "URL Copied",
      description: "Webhook URL copied to clipboard."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Webhooks</h2>
          <p className="text-muted-foreground">
            Set up webhooks to receive real-time updates from your social platforms
          </p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add Webhook
        </Button>
      </div>
      
      <Alert>
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Your Webhook Callback URL</AlertTitle>
        <AlertDescription className="flex justify-between items-center">
          <code className="bg-muted px-2 py-1 rounded">{getCallbackUrl()}</code>
          <Button variant="outline" size="sm" onClick={() => copyWebhookUrl(getCallbackUrl())}>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
      
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Webhook</CardTitle>
            <CardDescription>Configure a new webhook endpoint to receive platform updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-name">Webhook Name</Label>
              <Input 
                id="webhook-name" 
                placeholder="My Platform Webhook" 
                value={newWebhook.name}
                onChange={e => setNewWebhook({...newWebhook, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input 
                id="webhook-url" 
                placeholder="https://your-service.com/webhook" 
                value={newWebhook.url}
                onChange={e => setNewWebhook({...newWebhook, url: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Events to Subscribe</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {eventOptions.map(event => (
                  <div key={event.id} className="flex items-center space-x-2">
                    <Switch 
                      id={`event-${event.id}`}
                      checked={newWebhook.events?.includes(event.id)}
                      onCheckedChange={() => handleToggleEvent(event.id)}
                    />
                    <Label htmlFor={`event-${event.id}`}>{event.name}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="webhook-active"
                checked={newWebhook.active}
                onCheckedChange={checked => setNewWebhook({...newWebhook, active: checked})}
              />
              <Label htmlFor="webhook-active">Active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleCreateWebhook}>Create Webhook</Button>
          </CardFooter>
        </Card>
      )}
      
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : webhooks.length > 0 ? (
        <div className="grid gap-4">
          {webhooks.map(webhook => (
            <Card key={webhook.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{webhook.name}</CardTitle>
                  <Switch 
                    checked={webhook.active}
                    onCheckedChange={checked => handleToggleWebhook(webhook.id, checked)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">URL:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{webhook.url}</code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0" 
                        onClick={() => copyWebhookUrl(webhook.url)}
                      >
                        <CopyIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Events:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {webhook.events.map(event => (
                        <span 
                          key={event} 
                          className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded"
                        >
                          {eventOptions.find(e => e.id === event)?.name || event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  disabled={testingWebhookId === webhook.id}
                  onClick={() => handleTestWebhook(webhook.id)}
                >
                  {testingWebhookId === webhook.id ? (
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <CheckIcon className="h-4 w-4 mr-2" />
                  )}
                  Test Webhook
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteWebhook(webhook.id)}
                >
                  <XIcon className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground">No webhooks configured yet.</p>
            <Button 
              className="mt-4" 
              variant="outline" 
              onClick={() => setShowAddForm(true)}
            >
              Add Your First Webhook
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebhookIntegration;
