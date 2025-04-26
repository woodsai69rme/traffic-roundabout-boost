
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertCircleIcon, DownloadIcon, UploadIcon } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const DataExportImport = () => {
  const { toast } = useToast();
  const [exportType, setExportType] = useState("all");
  const [exportFormat, setExportFormat] = useState("json");
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState("");

  const dataTypes = [
    { value: "all", label: "All Data" },
    { value: "analytics", label: "Analytics Data" },
    { value: "posts", label: "Posts Data" },
    { value: "accounts", label: "Account Data" },
    { value: "engagements", label: "Engagement Data" }
  ];

  const formats = [
    { value: "json", label: "JSON" },
    { value: "csv", label: "CSV" },
    { value: "excel", label: "Excel" }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);
    setExportStatus("Starting export...");
    
    try {
      // Simulate an export process
      await simulateProgressAsync(setExportProgress, setExportStatus, [
        "Preparing data...",
        "Processing analytics...",
        "Building export file...",
        "Finalizing export..."
      ]);
      
      // In a real implementation, this would be an API call to generate the export
      
      // Simulate file download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '#';
        link.setAttribute('download', `roundabout-export-${Date.now()}.${exportFormat}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Export Complete",
          description: `Your ${exportType} data has been exported as ${exportFormat.toUpperCase()}.`
        });
        
        setExportProgress(100);
        setExportStatus("Export completed successfully.");
        
        setTimeout(() => {
          setIsExporting(false);
          setExportProgress(0);
          setExportStatus("");
        }, 3000);
      }, 500);
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
        variant: "destructive"
      });
      setExportStatus("Export failed.");
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setExportStatus("");
      }, 3000);
    }
  };
  
  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    const fileInput = document.getElementById('importFile') as HTMLInputElement;
    const file = fileInput?.files?.[0];
    
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to import.",
        variant: "destructive"
      });
      return;
    }
    
    setIsImporting(true);
    setImportProgress(0);
    setImportStatus("Starting import...");
    
    try {
      // Simulate an import process
      await simulateProgressAsync(setImportProgress, setImportStatus, [
        "Validating file...",
        "Processing data...",
        "Importing records...",
        "Finalizing import..."
      ]);
      
      // In a real implementation, this would be an API call to process the import
      
      toast({
        title: "Import Complete",
        description: "Your data has been imported successfully."
      });
      
      setImportProgress(100);
      setImportStatus("Import completed successfully.");
      
      setTimeout(() => {
        setIsImporting(false);
        setImportProgress(0);
        setImportStatus("");
        if (fileInput) fileInput.value = '';
      }, 3000);
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "There was an error importing your data.",
        variant: "destructive"
      });
      setImportStatus("Import failed.");
      setTimeout(() => {
        setIsImporting(false);
        setImportProgress(0);
        setImportStatus("");
      }, 3000);
    }
  };
  
  // Helper function to simulate a process with progress updates
  const simulateProgressAsync = async (
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    statusMessages: string[]
  ) => {
    const steps = statusMessages.length;
    const progressPerStep = 100 / steps;
    
    for (let i = 0; i < steps; i++) {
      setStatus(statusMessages[i]);
      const startProgress = i * progressPerStep;
      const endProgress = (i + 1) * progressPerStep;
      
      // Simulate progress within this step
      for (let j = 0; j <= 10; j++) {
        const progress = startProgress + (j / 10) * (endProgress - startProgress);
        setProgress(Math.min(99, Math.round(progress))); // Cap at 99% until complete
        await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>Download your platform data in various formats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label>Select Data to Export</label>
              <Select value={exportType} onValueChange={setExportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label>Export Format</label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map(format => (
                    <SelectItem key={format.value} value={format.value}>{format.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {isExporting && (
              <div className="space-y-2">
                <Progress value={exportProgress} />
                <p className="text-sm text-muted-foreground text-center">{exportStatus}</p>
              </div>
            )}
            
            <Alert variant="default" className="bg-blue-500/10 border-blue-500/50">
              <AlertCircleIcon className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-sm">
                Exports include all your platform data according to your selection, but exclude personal API keys and credentials.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              className="ml-auto"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </CardFooter>
        </Card>
        
        {/* Import Card */}
        <Card>
          <CardHeader>
            <CardTitle>Import Data</CardTitle>
            <CardDescription>Upload and import your data into the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleImport} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="importFile">Select File to Import</label>
                <Input id="importFile" type="file" accept=".json,.csv,.xlsx,.xls" disabled={isImporting} />
              </div>
              
              {isImporting && (
                <div className="space-y-2">
                  <Progress value={importProgress} />
                  <p className="text-sm text-muted-foreground text-center">{importStatus}</p>
                </div>
              )}
              
              <Alert variant="default" className="bg-amber-500/10 border-amber-500/50">
                <AlertCircleIcon className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-sm">
                  Importing data will merge with your existing data. For large imports, this may take several minutes.
                </AlertDescription>
              </Alert>
              
              <Button 
                type="submit" 
                disabled={isImporting}
                className="w-full"
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data Templates</CardTitle>
          <CardDescription>Download templates for importing data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataTypes.slice(1).map(type => (
              <Card key={type.value}>
                <CardHeader className="py-3">
                  <CardTitle className="text-base">{type.label} Template</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex gap-2">
                    {formats.map(format => (
                      <Button 
                        key={format.value} 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Template Downloaded",
                            description: `${type.label} template in ${format.label} format has been downloaded.`
                          });
                        }}
                      >
                        {format.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataExportImport;
