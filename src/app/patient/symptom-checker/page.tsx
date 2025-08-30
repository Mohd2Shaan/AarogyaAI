
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse } from 'lucide-react';

export default function SymptomCheckerPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Symptom Checker</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeartPulse />
            Check Your Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is under construction. You will soon be able to use our interactive tool to check your symptoms.</p>
        </CardContent>
      </Card>
    </div>
  );
}
