'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function ConnectionsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Connections</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users />
            Manage Connection Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is under construction. You will soon be able to manage connection requests from patients and other doctors here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
