'use client';

import { UserPlus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InviteDoctorDialog } from './invite-doctor-dialog';

export function InviteColleagueCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite a Colleague</CardTitle>
        <CardDescription>
          Invite other doctors to join the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InviteDoctorDialog>
          <Button className="w-full" variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Doctor
          </Button>
        </InviteDoctorDialog>
      </CardContent>
    </Card>
  );
}
