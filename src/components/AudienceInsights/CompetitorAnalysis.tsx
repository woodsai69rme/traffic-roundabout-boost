
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CompetitorAnalysisProps {
  platform: string;
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ platform }) => {
  const [competitors, setCompetitors] = useState<string[]>(['Competitor A', 'Competitor B']);
  const [newCompetitor, setNewCompetitor] = useState<string>('');

  const addCompetitor = () => {
    if (newCompetitor.trim() && !competitors.includes(newCompetitor.trim())) {
      setCompetitors([...competitors, newCompetitor.trim()]);
      setNewCompetitor('');
    }
  };

  const removeCompetitor = (index: number) => {
    const updatedCompetitors = [...competitors];
    updatedCompetitors.splice(index, 1);
    setCompetitors(updatedCompetitors);
  };

  // Mock data for follower comparison
  const followersData = [
    { name: 'Your Account', followers: 8520 },
    ...competitors.map((comp, index) => ({ 
      name: comp, 
      followers: 5000 + Math.floor(Math.random() * 10000) 
    }))
  ];

  // Mock data for engagement comparison
  const engagementData = [
    { name: 'Your Account', engagement: 4.2 },
    ...competitors.map((comp, index) => ({ 
      name: comp, 
      engagement: 1 + Math.random() * 5 
    }))
  ];

  // Mock data for content type breakdown
  const contentTypeData = [
    { 
      name: 'Your Account',
      image: 45,
      video: 30,
      text: 15,
      other: 10
    },
    ...competitors.map((comp) => ({ 
      name: comp,
      image: 20 + Math.floor(Math.random() * 40),
      video: 20 + Math.floor(Math.random() * 30),
      text: 10 + Math.floor(Math.random() * 20),
      other: 5 + Math.floor(Math.random() * 10)
    }))
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Competitor Analysis</CardTitle>
        <CardDescription>Compare your {platform} performance with competitors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Input 
              placeholder="Add competitor username" 
              value={newCompetitor}
              onChange={(e) => setNewCompetitor(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCompetitor()}
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={addCompetitor}
              disabled={!newCompetitor.trim()}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {competitors.map((comp, index) => (
              <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                {comp}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-1"
                  onClick={() => removeCompetitor(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-4">Follower Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={followersData} 
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="followers" fill="#8884d8" name="Followers" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Engagement Rate Comparison (%)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={engagementData} 
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number | string) => {
                    if (typeof value === 'number') {
                      return `${value.toFixed(2)}%`;
                    }
                    return `${value}%`;
                  }}
                />
                <Bar dataKey="engagement" fill="#82ca9d" name="Engagement Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Content Type Breakdown (%)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={contentTypeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="image" stackId="a" fill="#8884d8" name="Images" />
                <Bar dataKey="video" stackId="a" fill="#82ca9d" name="Videos" />
                <Bar dataKey="text" stackId="a" fill="#ffc658" name="Text" />
                <Bar dataKey="other" stackId="a" fill="#ff8042" name="Other" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorAnalysis;
