'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarDays, TrendingUp, Star } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const analyticsData = [
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: 'Total Patients',
    value: '342',
    change: '+12 this month',
    changeColor: 'text-green-500',
  },
  {
    icon: <CalendarDays className="h-6 w-6 text-green-500" />,
    title: 'Appointments This Month',
    value: '156',
    change: '+23 from last month',
    changeColor: 'text-green-500',
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
    title: 'Recovery Rate',
    value: '94%',
    change: '+2% improvement',
    changeColor: 'text-green-500',
  },
  {
    icon: <Star className="h-6 w-6 text-yellow-500" />,
    title: 'Patient Satisfaction',
    value: '4.8',
    change: 'out of 5.0',
    changeColor: 'text-muted-foreground',
  },
];

const appointmentTrendsData = [
  { month: 'Jan', total: Math.floor(Math.random() * 50) + 100 },
  { month: 'Feb', total: Math.floor(Math.random() * 50) + 110 },
  { month: 'Mar', total: Math.floor(Math.random() * 50) + 120 },
  { month: 'Apr', total: Math.floor(Math.random() * 50) + 130 },
  { month: 'May', total: Math.floor(Math.random() * 50) + 140 },
  { month: 'Jun', total: 156 },
];

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your practice performance and patient outcomes
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {analyticsData.map((item, index) => (
          <Card key={index} className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <div className="p-2 bg-muted rounded-full">
                {item.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{item.value}</div>
              <p className={`text-xs ${item.changeColor}`}>{item.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Trends</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={appointmentTrendsData}>
                    <XAxis 
                        dataKey="month"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip 
                        cursor={{fill: 'hsla(var(--muted))'}}
                        contentStyle={{backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))'}}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
