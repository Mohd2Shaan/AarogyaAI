
'use client';

import { FoodLogForm } from '@/components/patient/food-log-form';

export default function FoodLogPage() {
  return (
    <div className="container mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Log Your Meal</h1>
        <p className="text-muted-foreground">
          Keep a record of your daily food intake to share with your doctor.
        </p>
      </div>
      <FoodLogForm />
    </div>
  );
}
