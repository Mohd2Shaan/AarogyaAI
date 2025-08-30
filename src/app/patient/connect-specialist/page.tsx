
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export default function ConnectSpecialistPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Connect with a Specialist</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus />
            Find a Specialist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is under construction. You will soon be able to find and connect with specialists from various fields here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
