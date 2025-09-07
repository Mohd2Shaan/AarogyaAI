
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
import { mockAppointments, mockPatients } from '@/lib/mock-data';
import type { Appointment } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';
import { FileText, User, Cake, Phone, Stethoscope } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePatientStore } from '@/lib/store';
import { PatientDashboardSkeleton } from '@/components/skeletons';

export default function RecordsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { patients } = usePatientStore();
  // For this demo, we'll just display the first patient's data.
  // In a real app, you'd get the logged-in patient's ID.
  const patient = patients[0];

   useEffect(() => {
    if (patient) {
      setIsLoading(false);
    }
  }, [patient]);


  const appointmentHistory = useMemo(
    () => mockAppointments.filter((appt) => appt.status === 'Completed'),
    []
  );

  if (isLoading) {
    return <PatientDashboardSkeleton />;
  }

  if (!patient) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>No Patient Data</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Could not find patient information.</p>
            </CardContent>
        </Card>
    )
  }

   const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };


  return (
    <div className="container mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Medical Records</h1>
        <p className="text-muted-foreground">
          View your profile and past appointment history.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-8">
             <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={patient.avatar} alt={patient.name} />
                <AvatarFallback className="text-3xl">
                {patient.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
            </Avatar>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                 <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span>{patient.name}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Cake className="h-5 w-5 text-muted-foreground" />
                    <span>{calculateAge(patient.dob)} years old</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{patient.contact}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-muted-foreground" />
                    <span>Doctor: Dr. Aarav Malhotra</span>
                </div>
            </div>
        </CardContent>
       </Card>


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
