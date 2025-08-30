'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus2 } from 'lucide-react';

export default function InvitePage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Invite a Doctor</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus2 />
            Invite a Colleague
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This feature is under construction. You will soon be able to invite other doctors to join your practice on this platform.</p>
        </CardContent>
      </Card>
    </div>
  );
}
