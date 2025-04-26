
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer } from '@/components/ui/chart';
import { useDevice } from '@/hooks/use-mobile';
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// Create wrapper components for charts
const AreaChart = ({ data, categories, height, valueFormatter }) => (
  <ChartContainer config={{}} className="h-[300px]">
    <RechartsAreaChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip formatter={(value) => valueFormatter ? valueFormatter(value) : value} />
      <Legend />
      {categories.map((category, index) => (
        <Area 
          key={category} 
          type="monotone" 
          dataKey={category} 
          stackId="1"
          stroke={index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ffc658"} 
          fill={index === 0 ? "#8884d8" : index === 1 ? "#82ca9d" : "#ffc658"} 
        />
      ))}
    </RechartsAreaChart>
  </ChartContainer>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const PieChart = ({ data, height, valueFormatter }) => (
  <ChartContainer config={{}} className="h-[300px]">
    <RechartsPieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name}: ${valueFormatter ? valueFormatter(percent * 100) : `${(percent * 100).toFixed(0)}%`}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => valueFormatter ? valueFormatter(value) : value} />
      <Legend />
    </RechartsPieChart>
  </ChartContainer>
);

const EngagementStats = () => {
  const { isMobile } = useDevice();

  const engagementData = [
    { name: 'Apr 1', likes: 240, comments: 120, shares: 40 },
    { name: 'Apr 8', likes: 320, comments: 180, shares: 65 },
    { name: 'Apr 15', likes: 280, comments: 190, shares: 85 },
    { name: 'Apr 22', likes: 390, comments: 210, shares: 95 },
  ];

  const engagementSourceData = [
    { name: 'Organic', value: 65 },
    { name: 'Reciprocal', value: 25 },
    { name: 'Paid', value: 10 },
  ];

  const timeOfDayData = [
    { name: '12am-4am', value: 5 },
    { name: '4am-8am', value: 12 },
    { name: '8am-12pm', value: 28 },
    { name: '12pm-4pm', value: 20 },
    { name: '4pm-8pm', value: 25 },
    { name: '8pm-12am', value: 10 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Engagement Breakdown</CardTitle>
          <CardDescription>Interactions with your content over time</CardDescription>
        </CardHeader>
        <CardContent>
          <AreaChart
            data={engagementData}
            categories={['likes', 'comments', 'shares']}
            height={isMobile ? 250 : 350}
            valueFormatter={(value) => `${value.toLocaleString()}`}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Sources</CardTitle>
            <CardDescription>Where your engagement is coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={engagementSourceData}
              height={isMobile ? 200 : 300}
              valueFormatter={(value) => `${value}%`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Time to Post</CardTitle>
            <CardDescription>When your audience is most active</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekday">
              <TabsList className="mb-4">
                <TabsTrigger value="weekday">Weekdays</TabsTrigger>
                <TabsTrigger value="weekend">Weekends</TabsTrigger>
              </TabsList>
              <TabsContent value="weekday" className="h-[250px]">
                <PieChart
                  data={timeOfDayData}
                  height={isMobile ? 200 : 250}
                  valueFormatter={(value) => `${value}%`}
                />
              </TabsContent>
              <TabsContent value="weekend" className="h-[250px]">
                <PieChart
                  data={[
                    { name: '12am-4am', value: 8 },
                    { name: '4am-8am', value: 5 },
                    { name: '8am-12pm', value: 15 },
                    { name: '12pm-4pm', value: 30 },
                    { name: '4pm-8pm', value: 27 },
                    { name: '8pm-12am', value: 15 },
                  ]}
                  height={isMobile ? 200 : 250}
                  valueFormatter={(value) => `${value}%`}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EngagementStats;
