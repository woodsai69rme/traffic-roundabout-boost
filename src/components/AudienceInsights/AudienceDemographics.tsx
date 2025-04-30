
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface AudienceDemographicsProps {
  platform?: string;
}

// Sample data - in a real app, this would come from API
const ageData = [
  { name: '18-24', value: 25, fill: '#8884d8' },
  { name: '25-34', value: 38, fill: '#82ca9d' },
  { name: '35-44', value: 20, fill: '#ffc658' },
  { name: '45-54', value: 12, fill: '#ff8042' },
  { name: '55+', value: 5, fill: '#0088FE' },
];

const genderData = [
  { name: 'Male', value: 42, fill: '#0088FE' },
  { name: 'Female', value: 55, fill: '#FF8042' },
  { name: 'Other', value: 3, fill: '#00C49F' },
];

const locationData = [
  { name: 'United States', value: 45, fill: '#8884d8' },
  { name: 'UK', value: 15, fill: '#82ca9d' },
  { name: 'Canada', value: 12, fill: '#ffc658' },
  { name: 'Australia', value: 8, fill: '#ff8042' },
  { name: 'Germany', value: 6, fill: '#0088FE' },
  { name: 'Other', value: 14, fill: '#00C49F' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ 
  cx, 
  cy, 
  midAngle, 
  innerRadius, 
  outerRadius, 
  percent 
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor="middle" 
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AudienceDemographics: React.FC<AudienceDemographicsProps> = ({ platform }) => {
  // In a real app, you would filter or fetch data based on the platform
  console.log(`Showing demographics for platform: ${platform || 'all'}`);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
          <CardDescription>Audience breakdown by age groups</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="bottom" align="center" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
          <CardDescription>Audience breakdown by gender</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="bottom" align="center" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Top audience locations</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend layout="vertical" verticalAlign="bottom" align="center" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudienceDemographics;
