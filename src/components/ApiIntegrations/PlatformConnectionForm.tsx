
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { SocialApiConfig, updateApiConfiguration } from '@/services/socialApiIntegrations';
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react';

interface PlatformConnectionFormProps {
  platform: string;
  platformName: string;
  color: string;
  icon: string;
  initialConfig?: Partial<SocialApiConfig> | null;
  onUpdateSuccess: () => void;
}

const PlatformConnectionForm = ({ 
  platform, 
  platformName, 
  color, 
  icon,
  initialConfig,
  onUpdateSuccess
}: PlatformConnectionFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);
  
  const [apiKey, setApiKey] = useState(initialConfig?.api_key || '');
  const [apiSecret, setApiSecret] = useState(initialConfig?.api_secret || '');
  const [accessToken, setAccessToken] = useState(initialConfig?.access_token || '');
  const [accessTokenSecret, setAccessTokenSecret] = useState(initialConfig?.access_token_secret || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const config: SocialApiConfig = {
        platform,
        api_key: apiKey,
        api_secret: apiSecret,
        access_token: accessToken,
        access_token_secret: accessTokenSecret,
        connected: true,
        last_updated: new Date().toISOString()
      };

      const success = await updateApiConfiguration(config);
      
      if (success) {
        toast({
          title: "Connection Updated",
          description: `Successfully connected to ${platformName}.`,
        });
        onUpdateSuccess();
      } else {
        throw new Error("Failed to update connection");
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader className={color}>
        <div className="flex items-center gap-3">
          <img src={icon} alt={platformName} className="w-8 h-8" />
          <CardTitle className="text-white">{platformName} Integration</CardTitle>
        </div>
        <CardDescription className="text-white/80">
          Connect your {platformName} account to enable posting and analytics
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label htmlFor={`${platform}-apiKey`}>API Key</Label>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSecrets(!showSecrets)}
              >
                {showSecrets ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </Button>
            </div>
            <Input
              id={`${platform}-apiKey`}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type={showSecrets ? "text" : "password"}
              placeholder="Enter API key"
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor={`${platform}-apiSecret`}>API Secret</Label>
            <Input
              id={`${platform}-apiSecret`}
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              type={showSecrets ? "text" : "password"}
              placeholder="Enter API secret"
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor={`${platform}-accessToken`}>Access Token</Label>
            <Input
              id={`${platform}-accessToken`}
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              type={showSecrets ? "text" : "password"}
              placeholder="Enter access token"
              required
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor={`${platform}-accessTokenSecret`}>Access Token Secret</Label>
            <Input
              id={`${platform}-accessTokenSecret`}
              value={accessTokenSecret}
              onChange={(e) => setAccessTokenSecret(e.target.value)}
              type={showSecrets ? "text" : "password"}
              placeholder="Enter access token secret"
              required
            />
          </div>
          
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <InfoIcon className="h-4 w-4 mt-0.5 shrink-0" />
            <p>You can find these credentials in your {platformName} Developer portal.</p>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" disabled={isLoading}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Connecting..." : initialConfig?.connected ? "Update Connection" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlatformConnectionForm;
