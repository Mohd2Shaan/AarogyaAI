
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { mockMedicineSchedule } from '@/lib/mock-data';
import type { Medicine } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Sun, Sunset, Cloudy, Utensils, Edit, Trash2, PlusCircle, Check, X, Pill } from 'lucide-react';
import { Button } from '../ui/button';
import { MedicineDialog } from './medicine-dialog';

const timingSections: { timing: Medicine['timing']; icon: React.ElementType; label: string }[] = [
    { timing: 'Morning', icon: Sun, label: 'Morning' },
    { timing: 'Afternoon', icon: Cloudy, label: 'Afternoon' },
    { timing: 'Evening', icon: Sunset, label: 'Evening' },
  ];

export function EditableMedicineSchedule() {
  const [schedule, setSchedule] = useState<Medicine[]>(mockMedicineSchedule);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (medicine: Medicine) => {
    setSchedule(currentSchedule => {
        const exists = currentSchedule.some(m => m.id === medicine.id);
        if (exists) {
            return currentSchedule.map(m => m.id === medicine.id ? medicine : m);
        }
        return [...currentSchedule, medicine];
    });
  }

  const handleDelete = (medicineId: string) => {
    setSchedule(currentSchedule => currentSchedule.filter(m => m.id !== medicineId));
  }

  const scheduleByTiming = schedule.reduce((acc, med) => {
    (acc[med.timing] = acc[med.timing] || []).push(med);
    return acc;
  }, {} as Record<Medicine['timing'], Medicine[]>);

  return (
    <div className="space-y-6">
        <div className="flex justify-end gap-2">
            {isEditing ? (
                 <>
                    <MedicineDialog onSave={handleSave}>
                        <Button variant="outline">
                            <PlusCircle className="mr-2" /> Add Medication
                        </Button>
                    </MedicineDialog>
                    <Button onClick={() => setIsEditing(false)} variant="secondary">
                        <Check className="mr-2" /> Done Editing
                    </Button>
                 </>
            ) : (
                <Button onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2" /> Edit Schedule
                </Button>
            )}

        </div>
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
                     <Pill className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold">{med.medicineName}</p>
                      <p className="text-sm text-muted-foreground">{med.dosage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className='flex items-center gap-2'>
                        <Utensils className="h-4 w-4" />
                        <span>{med.relationToMeal}</span>
                    </div>
                    {isEditing && (
                        <div className="flex gap-2">
                             <MedicineDialog medicine={med} onSave={handleSave}>
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                </Button>
                             </MedicineDialog>
                             <Button variant="ghost" size="icon" onClick={() => handleDelete(med.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                             </Button>
                        </div>
                    )}
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
