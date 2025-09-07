
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Activity,
  Apple,
  CheckCircle2,
  Loader2,
  Pill,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

type LogStatus = 'pending' | 'saving' | 'saved';

interface LogSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onLog: () => void;
  status: LogStatus;
  logDisabled: boolean;
}

function LogSection({ title, icon: Icon, children, onLog, status, logDisabled }: LogSectionProps) {
    const isSaved = status === 'saved';
    const isSaving = status === 'saving';

    return (
        <Card className={cn(isSaved && 'bg-muted/50 border-green-200 dark:border-green-800')}>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                    <Icon className={cn('h-6 w-6', isSaved ? 'text-green-500' : 'text-primary')} />
                    {title}
                </CardTitle>
                {isSaved && <CheckCircle2 className="h-6 w-6 text-green-500" />}
            </CardHeader>
            <CardContent>
                <div className={cn('space-y-4', isSaved && 'opacity-60')}>
                    {children}
                </div>
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={onLog}
                        disabled={logDisabled || isSaving || isSaved}
                        size="sm"
                        variant={isSaved ? 'secondary' : 'default'}
                    >
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSaved ? 'Logged' : isSaving ? 'Logging...' : 'Log'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}


export function ActivityLogger() {
  const [medication, setMedication] = useState('');
  const [medicationStatus, setMedicationStatus] = useState<LogStatus>('pending');

  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [mealsStatus, setMealsStatus] = useState<LogStatus>('pending');
  
  const [activities, setActivities] = useState('');
  const [activitiesStatus, setActivitiesStatus] = useState<LogStatus>('pending');

  const handleLog = (section: 'medication' | 'meals' | 'activities') => {
    const setters = {
        medication: setMedicationStatus,
        meals: setMealsStatus,
        activities: setActivitiesStatus,
    };

    setters[section]('saving');
    // Simulate saving to a backend
    setTimeout(() => {
      setters[section]('saved');
      toast({
        title: `${section.charAt(0).toUpperCase() + section.slice(1)} Logged!`,
        description: `Your ${section} have been successfully saved.`,
        className: 'bg-accent text-accent-foreground',
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
        <LogSection
            title="Medication"
            icon={Pill}
            status={medicationStatus}
            logDisabled={!medication.trim()}
            onLog={() => handleLog('medication')}
        >
            <Label htmlFor="medication" className="sr-only">Medications Taken Today</Label>
            <Textarea
                id="medication"
                placeholder="e.g., 1x Paracetamol 500mg in the morning, 2x Vitamin D capsules after lunch..."
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                rows={3}
                disabled={medicationStatus !== 'pending'}
            />
        </LogSection>

        <LogSection
            title="Meals"
            icon={Apple}
            status={mealsStatus}
            logDisabled={!breakfast.trim() && !lunch.trim() && !dinner.trim()}
            onLog={() => handleLog('meals')}
        >
             <div className="space-y-4">
                <div>
                    <Label htmlFor="breakfast">Breakfast</Label>
                    <Input
                    id="breakfast"
                    placeholder="e.g., Oatmeal with fruits"
                    value={breakfast}
                    onChange={(e) => setBreakfast(e.target.value)}
                    disabled={mealsStatus !== 'pending'}
                    />
                </div>
                <div>
                    <Label htmlFor="lunch">Lunch</Label>
                    <Input
                    id="lunch"
                    placeholder="e.g., Grilled chicken salad"
                    value={lunch}
                    onChange={(e) => setLunch(e.target.value)}
                    disabled={mealsStatus !== 'pending'}
                    />
                </div>
                <div>
                    <Label htmlFor="dinner">Dinner</Label>
                    <Input
                    id="dinner"
                    placeholder="e.g., Lentil soup and bread"
                    value={dinner}
                    onChange={(e) => setDinner(e.target.value)}
                    disabled={mealsStatus !== 'pending'}
                    />
                </div>
            </div>
        </LogSection>

        <LogSection
            title="Physical Activities"
            icon={Activity}
            status={activitiesStatus}
            logDisabled={!activities.trim()}
            onLog={() => handleLog('activities')}
        >
            <Label htmlFor="activities" className="sr-only">Activities performed today</Label>
            <Textarea
                id="activities"
                placeholder="e.g., 30-minute walk in the park, 15 minutes of stretching..."
                value={activities}
                onChange={(e) => setActivities(e.target.value)}
                rows={3}
                disabled={activitiesStatus !== 'pending'}
            />
        </LogSection>
    </div>
  );
}
