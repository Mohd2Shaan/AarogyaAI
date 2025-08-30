'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  Activity,
  Apple,
  ClipboardList,
  Loader2,
  Pill,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';

export function ActivityLogger() {
  const [medication, setMedication] = useState('');
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [activities, setActivities] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const isSubmittable = [medication, breakfast, lunch, dinner, activities].some(field => field.trim() !== '');

  const resetForm = () => {
    setMedication('');
    setBreakfast('');
    setLunch('');
    setDinner('');
    setActivities('');
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate saving to a backend
    setTimeout(() => {
      toast({
        title: 'Log Saved!',
        description: "Today's activity has been successfully logged.",
        className: 'bg-accent text-accent-foreground',
      });
      // Do not reset form to allow report generation
      setIsSaving(false);
    }, 1000);
  };
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className='text-lg font-semibold flex items-center gap-2'>
            <Pill className='h-5 w-5 text-primary' /> Medication
        </AccordionTrigger>
        <AccordionContent className="p-1">
          <Label htmlFor="medication">Medications Taken Today</Label>
          <Textarea
            id="medication"
            placeholder="e.g., 1x Paracetamol 500mg in the morning, 2x Vitamin D capsules after lunch..."
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className='text-lg font-semibold flex items-center gap-2'>
            <Apple className='h-5 w-5 text-primary' /> Meals
        </AccordionTrigger>
        <AccordionContent className="space-y-4 p-1">
          <div>
            <Label htmlFor="breakfast">Breakfast</Label>
            <Input
              id="breakfast"
              placeholder="e.g., Oatmeal with fruits"
              value={breakfast}
              onChange={(e) => setBreakfast(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="lunch">Lunch</Label>
            <Input
              id="lunch"
              placeholder="e.g., Grilled chicken salad"
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="dinner">Dinner</Label>
            <Input
              id="dinner"
              placeholder="e.g., Lentil soup and bread"
              value={dinner}
              onChange={(e) => setDinner(e.target.value)}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className='text-lg font-semibold flex items-center gap-2'>
            <Activity className='h-5 w-5 text-primary' /> Physical Activities
        </AccordionTrigger>
        <AccordionContent className="p-1">
          <Label htmlFor="activities">Activities performed today</Label>
          <Textarea
            id="activities"
            placeholder="e.g., 30-minute walk in the park, 15 minutes of stretching..."
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
          />
        </AccordionContent>
      </AccordionItem>
      <div className="flex justify-end gap-2 mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" disabled={!isSubmittable}>
              <ClipboardList className="mr-2 h-4 w-4" /> Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Daily Activity Report for {today}</DialogTitle>
            </DialogHeader>
            <Card>
              <CardContent className="p-6 space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Medication</h4>
                  <p className="text-muted-foreground">{medication || 'No medication logged.'}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Meals</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li><strong>Breakfast:</strong> {breakfast || 'Not logged.'}</li>
                    <li><strong>Lunch:</strong> {lunch || 'Not logged.'}</li>
                    <li><strong>Dinner:</strong> {dinner || 'Not logged.'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Physical Activities</h4>
                  <p className="text-muted-foreground">{activities || 'No activities logged.'}</p>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
        <Button onClick={handleSave} disabled={!isSubmittable || isSaving} className={cn(!isSubmittable && "bg-muted-foreground hover:bg-muted-foreground/90")}>
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Log
        </Button>
      </div>
    </Accordion>
  );
}
