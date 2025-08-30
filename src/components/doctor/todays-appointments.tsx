
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockAppointments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';

export function TodaysAppointments() {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'completed':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className='flex items-center gap-2'>
            <CalendarIcon className="h-6 w-6 text-primary" />
            <CardTitle>Today's Appointments</CardTitle>
          </div>
          <CardDescription>{mockAppointments.length} appointments</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                 <div className="relative h-10 w-10">
                  <Image
                    src={appointment.patientAvatar}
                    alt={appointment.patientName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{appointment.patientName}</p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="font-medium">{appointment.time}</p>
                <Badge
                  variant={getStatusVariant(appointment.status)}
                  className={cn(
                    'capitalize',
                    appointment.status.toLowerCase() === 'pending' &&
                      'bg-orange-100 text-orange-600 border-orange-200',
                    appointment.status.toLowerCase() === 'confirmed' &&
                      'bg-blue-100 text-blue-600 border-blue-200',
                       appointment.status.toLowerCase() === 'completed' &&
                      'bg-gray-100 text-gray-600 border-gray-200'
                  )}
                >
                  {appointment.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
