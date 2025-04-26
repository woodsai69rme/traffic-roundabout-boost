
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SocialApiConfig, fetchApiConfigurations, disconnectPlatform } from '@/services/socialApiIntegrations';
import { useToast } from "@/hooks/use-toast";
import { platforms } from '@/services/platforms';
import PlatformConnectionForm from './PlatformConnectionForm';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';

const PlatformsList = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [apiConfigs, setApiConfigs] = useState<SocialApiConfig[]>([]);
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  
  useEffect(() => {
    loadApiConfigurations();
  }, []);
  
  const loadApiConfigurations = async () => {
    setIsLoading(true);
    try {
      const configs = await fetchApiConfigurations();
      setApiConfigs(configs);
      
      if (configs.length > 0 && !activePlatform) {
        setActivePlatform(configs[0].platform);
      } else if (!activePlatform && platforms.length > 0) {
        setActivePlatform(platforms[0].id);
      }
    } catch (error) {
      console.error("Error loading API configurations:", error);
      toast({
        title: "Error Loading Platforms",
        description: "Failed to load platform connections. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDisconnect = async (platformId: string) => {
    try {
      const success = await disconnectPlatform(platformId);
      
      if (success) {
        toast({
          title: "Platform Disconnected",
          description: "Successfully disconnected the platform."
        });
        loadApiConfigurations();
      } else {
        throw new Error("Failed to disconnect platform");
      }
    } catch (error) {
      toast({
        title: "Disconnect Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };
  
  const getConfigForPlatform = (platformId: string) => {
    return apiConfigs.find(config => config.platform === platformId) || null;
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Platform Connections</CardTitle>
        <CardDescription>
          Connect and manage your social media platform API integrations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activePlatform || undefined} onValueChange={setActivePlatform}>
          <TabsList className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-6">
            {platforms.map(platform => (
              <TabsTrigger key={platform.id} value={platform.id} className="relative">
                <img src={platform.icon} alt={platform.name} className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">{platform.name}</span>
                {getConfigForPlatform(platform.id)?.connected && (
                  <span className="absolute -top-1 -right-1">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {platforms.map(platform => (
                <TabsContent key={platform.id} value={platform.id}>
                  <div className="space-y-6">
                    {getConfigForPlatform(platform.id)?.connected ? (
                      <>
                        <Alert variant="default" className="bg-green-500/10 border-green-500/50">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          <AlertDescription>
                            Your {platform.name} account is connected and ready to use.
                          </AlertDescription>
                        </Alert>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            className="text-destructive border-destructive hover:bg-destructive/10"
                            onClick={() => handleDisconnect(platform.id)}
                          >
                            Disconnect Account
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Alert variant="default" className="bg-amber-500/10 border-amber-500/50">
                          <AlertCircleIcon className="h-4 w-4 text-amber-500" />
                          <AlertDescription>
                            Connect your {platform.name} account to enable posting and analytics.
                          </AlertDescription>
                        </Alert>
                        <PlatformConnectionForm
                          platform={platform.id}
                          platformName={platform.name}
                          color={platform.color}
                          icon={platform.icon}
                          initialConfig={getConfigForPlatform(platform.id)}
                          onUpdateSuccess={loadApiConfigurations}
                        />
                      </>
                    )}
                  </div>
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PlatformsList;
