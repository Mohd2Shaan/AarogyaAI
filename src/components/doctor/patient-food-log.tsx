
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Utensils } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Mock data - in a real app, this would be fetched from Firestore
const mockFoodLogs = [
  {
    id: 'log1',
    date: new Date('2024-07-28T08:00:00Z'),
    mealType: 'Breakfast',
    foodItems: 'Oatmeal with berries and nuts.',
    relationToMedication: 'After morning medication',
  },
  {
    id: 'log2',
    date: new Date('2024-07-28T13:00:00Z'),
    mealType: 'Lunch',
    foodItems: 'Grilled chicken salad with vinaigrette dressing.',
    relationToMedication: 'Before afternoon medication',
  },
  {
    id: 'log3',
    date: new Date('2024-07-28T19:00:00Z'),
    mealType: 'Dinner',
    foodItems: 'Salmon with quinoa and roasted vegetables.',
    relationToMedication: 'After evening medication',
  },
  {
    id: 'log4',
    date: new Date('2024-07-27T08:30:00Z'),
    mealType: 'Breakfast',
    foodItems: 'Scrambled eggs with whole wheat toast.',
    relationToMedication: 'After morning medication',
  },
];

interface PatientFoodLogProps {
  patientId: string;
}

export function PatientFoodLog({ patientId }: PatientFoodLogProps) {
  // In a real app, you'd fetch this data based on patientId
  const [foodLogs] = useState(mockFoodLogs);

  const groupedLogs = foodLogs.reduce((acc, log) => {
    const date = log.date.toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {} as Record<string, typeof mockFoodLogs>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils /> Food Log History
        </CardTitle>
        <CardDescription>
          A chronological history of the patient's logged meals.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {Object.keys(groupedLogs).length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(groupedLogs).map(([date, logs]) => (
              <AccordionItem value={date} key={date}>
                <AccordionTrigger>
                  <div className="font-semibold text-lg">
                    {new Date(date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {logs.map((log) => (
                      <div key={log.id} className="p-4 bg-muted/50 rounded-lg">
                        <p className="font-semibold text-md">{log.mealType}</p>
                        <p className="text-muted-foreground">{log.foodItems}</p>
                        {log.relationToMedication && (
                          <p className="text-xs text-primary mt-2">
                            ({log.relationToMedication})
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            No food logs found for this patient.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
