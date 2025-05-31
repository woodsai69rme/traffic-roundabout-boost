import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileTemplate, Wand2, FileText } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full justify-start" size="lg">
          <Plus className="h-4 w-4 mr-2" />
          Create New Resume
        </Button>
        
        <Button variant="outline" className="w-full justify-start" size="lg">
          <FileTemplate className="h-4 w-4 mr-2" />
          Browse Templates
        </Button>
        
        <Button variant="outline" className="w-full justify-start" size="lg">
          <Wand2 className="h-4 w-4 mr-2" />
          AI Resume Review
        </Button>
        
        <Button variant="outline" className="w-full justify-start" size="lg">
          <FileText className="h-4 w-4 mr-2" />
          Import from LinkedIn
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
