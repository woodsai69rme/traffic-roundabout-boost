
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share, Eye } from 'lucide-react';

interface ResumePreviewProps {
  data: any;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Preview</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[8.5/11] bg-white border rounded-lg p-6 text-black">
          {/* Resume Preview Content */}
          <div className="space-y-4">
            <div className="text-center border-b pb-4">
              <h1 className="text-2xl font-bold">
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>
              <div className="text-sm text-gray-600 mt-2">
                {data.personalInfo.email} | {data.personalInfo.phone}
              </div>
              <div className="text-sm text-gray-600">
                {data.personalInfo.location}
              </div>
            </div>
            
            {data.personalInfo.summary && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
                <p className="text-sm text-gray-700">{data.personalInfo.summary}</p>
              </div>
            )}
            
            {data.experience && data.experience.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Experience</h2>
                <div className="space-y-3">
                  {data.experience.map((exp: any, index: number) => (
                    <div key={index} className="text-sm">
                      <div className="font-medium">{exp.position || 'Position'}</div>
                      <div className="text-gray-600">{exp.company || 'Company'}</div>
                      <div className="text-gray-500">{exp.startDate} - {exp.endDate}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-center text-gray-400 text-xs mt-8">
              Resume preview - Template: {data.template}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumePreview;
