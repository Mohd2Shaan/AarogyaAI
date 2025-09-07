
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { mockMedicineSchedule } from '@/lib/mock-data';
import type { Medicine } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Sun, Sunset, Cloudy, Utensils } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MedicineScheduleProps {
  isPatientView?: boolean;
}

export function MedicineSchedule({ isPatientView = false }: MedicineScheduleProps) {
  const [schedule, setSchedule] = useState<Medicine[]>(mockMedicineSchedule);
  const { toast } = useToast();

  const handleStatusChange = (medicineId: string, checked: boolean) => {
    setSchedule((currentSchedule) =>
      currentSchedule.map((med) =>
        med.id === medicineId ? { ...med, status: checked } : med
      )
    );
    if (isPatientView) {
        const medicine = schedule.find(m => m.id === medicineId);
        toast({
            title: "Medicine Logged",
            description: `${medicine?.medicineName} marked as ${checked ? 'taken' : 'not taken'}.`,
            className: 'bg-accent text-accent-foreground',
        });
    }
  };

  const scheduleByTiming = schedule.reduce((acc, med) => {
    (acc[med.timing] = acc[med.timing] || []).push(med);
    return acc;
  }, {} as Record<Medicine['timing'], Medicine[]>);

  const timingSections: { timing: Medicine['timing']; icon: React.ElementType; label: string }[] = [
    { timing: 'Morning', icon: Sun, label: 'Morning' },
    { timing: 'Afternoon', icon: Cloudy, label: 'Afternoon' },
    { timing: 'Evening', icon: Sunset, label: 'Evening' },
  ];

  return (
    <div className="space-y-6">
      {timingSections.map(({ timing, icon: Icon, label }) => (
        <Card key={timing}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <Icon className="h-6 w-6 text-primary" />
              {label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduleByTiming[timing]?.length > 0 ? (
              scheduleByTiming[timing].map((med) => (
                <div
                  key={med.id}
                  className={cn(
                    'flex items-center justify-between rounded-lg border p-4 transition-colors',
                    med.status && 'bg-muted/50'
                  )}
                >
                  <div className="flex items-center gap-4">
                     <Checkbox
                        id={`med-${med.id}`}
                        checked={med.status}
                        onCheckedChange={(checked) => handleStatusChange(med.id, !!checked)}
                        aria-label={`Mark ${med.medicineName} as taken`}
                        disabled={!isPatientView}
                     />
                    <div>
                      <label htmlFor={`med-${med.id}`} className="font-semibold cursor-pointer">
                        {med.medicineName}
                      </label>
                      <p className="text-sm text-muted-foreground">{med.dosage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Utensils className="h-4 w-4" />
                    <span>{med.relationToMeal}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground p-4">
                No medication scheduled for the {timing.toLowerCase()}.
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
