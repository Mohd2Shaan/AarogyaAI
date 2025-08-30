'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPen } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Patient Notes</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardPen />
            Create & Manage Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is under construction. You will soon be able to create, view, and manage patient notes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
