
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockSpecialists } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { CalendarPlus, MessageSquare } from 'lucide-react';
import type { Specialist } from '@/lib/types';

const getStatusClass = (status: Specialist['status']) => {
  switch (status) {
    case 'Available':
      return 'bg-green-500';
    case 'Busy':
      return 'bg-yellow-500';
    case 'Offline':
      return 'bg-gray-500';
  }
};

export default function ConnectSpecialistPage() {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Connect with a Specialist
        </h1>
        <p className="text-muted-foreground">
          Find and book an appointment with a specialist from various fields.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSpecialists.map((specialist) => (
          <Card key={specialist.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={specialist.avatar} alt={specialist.name} />
                  <AvatarFallback>
                    {specialist.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{specialist.name}</CardTitle>
                  <CardDescription>{specialist.specialty}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'h-3 w-3 rounded-full',
                    getStatusClass(specialist.status)
                  )}
                />
                <span className="text-sm font-medium">{specialist.status}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Dr. {specialist.name.split(' ').slice(1).join(' ')} is a renowned expert in {specialist.specialty} with over 10 years of experience.
              </p>
            </CardContent>
            <CardFooter>
                <div className="w-full grid grid-cols-2 gap-2">
                    <Button>
                        <CalendarPlus className="mr-2 h-4 w-4" /> Book Appointment
                    </Button>
                    <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
