
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snack']),
  foodItems: z.string().min(3, 'Please describe what you ate.'),
  relationToMedication: z.string().optional(),
});

export function FoodLogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealType: 'Breakfast',
      foodItems: '',
      relationToMedication: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // In a real app, this would save to Firestore
    console.log({
      ...values,
      timestamp: new Date(),
    });

    setTimeout(() => {
      toast({
        title: 'Meal Logged Successfully!',
        description: `Your ${values.mealType.toLowerCase()} has been recorded.`,
        className: 'bg-accent text-accent-foreground',
      });
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mealType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meal Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a meal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foodItems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What did you eat?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Oatmeal with berries, a glass of orange juice..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationToMedication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relation to Medication (Optional)</FormLabel>
                   <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option if applicable" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Before Medication">Before Medication</SelectItem>
                      <SelectItem value="After Medication">After Medication</SelectItem>
                       <SelectItem value="With Medication">With Medication</SelectItem>
                       <SelectItem value="Not Applicable">Not Applicable</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Did you take this meal before or after your medication?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? 'Logging...' : 'Log Meal'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
