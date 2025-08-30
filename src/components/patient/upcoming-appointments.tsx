'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockAppointments } from '@/lib/mock-data';
import { Calendar, Clock, Video } from 'lucide-react';

export function UpcomingAppointments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {mockAppointments.map((appointment) => (
          <div key={appointment.id} className="flex items-center gap-4">
            <Avatar className="hidden h-12 w-12 sm:flex">
              <AvatarImage
                src="https://i.pravatar.cc/150?u=dr.smith"
                alt="Dr. Smith"
              />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                Consultation with Dr. Smith
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" /> {appointment.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> {appointment.time}
              </div>
            </div>
            <Button variant="outline" size="icon" className="ml-auto">
              <Video className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button asChild variant="outline" className="w-full mt-2">
          <Link href="/patient/appointments">View All Appointments</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
