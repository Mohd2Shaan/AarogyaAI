'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockAppointments } from '@/lib/mock-data';
import type { Appointment } from '@/lib/types';
import { useMemo } from 'react';
import { FileText } from 'lucide-react';

export default function RecordsPage() {
  const appointmentHistory = useMemo(
    () => mockAppointments.filter((appt) => appt.status === 'Completed'),
    []
  );

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Medical Records</h1>
        <p className="text-muted-foreground">
          View your past appointment history and medical records.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText />
            Appointment History
          </CardTitle>
          <CardDescription>
            A log of all your completed appointments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden sm:table-cell">Reason</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointmentHistory.length > 0 ? (
                appointmentHistory.map((appointment: Appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
                      <div className="font-medium">{appointment.doctor}</div>
                    </TableCell>
                    <TableCell>{appointment.department}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {appointment.type}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">{appointment.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No completed appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
