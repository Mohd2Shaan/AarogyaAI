'use client';

import dynamic from 'next/dynamic';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Search, Video, FileText } from 'lucide-react';
import { mockPatients } from '@/lib/mock-data';
import type { Patient } from '@/lib/types';
import { DoctorDashboardSkeleton } from '../skeletons';
import { useState } from 'react';

const CallSimulationDialog = dynamic(() => import('../shared/call-simulation').then(mod => mod.CallSimulationDialog), {
    loading: () => <Button variant="outline" size="icon" disabled><Video className="h-4 w-4" /></Button>
});

export function PatientList({ searchTerm }: { searchTerm: string }) {

  const filteredPatients = mockPatients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Patients</CardTitle>
        <CardDescription>
          A list of all patients currently under your care.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden sm:table-cell">
                Last Appointment
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.length > 0 ? (
                filteredPatients.map((patient: Patient) => (
                <TableRow key={patient.id}>
                    <TableCell>
                    <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={patient.avatar} alt="Avatar" />
                        <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                            {patient.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {patient.contact}
                        </p>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{patient.lastAppointment}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                     <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View Record</span>
                    </Button>
                    <CallSimulationDialog
                        patientName={patient.name}
                        callType="video"
                    >
                        <Button variant="outline" size="icon">
                        <Video className="h-4 w-4" />
                        <span className="sr-only">Video Call</span>
                        </Button>
                    </CallSimulationDialog>
                    <CallSimulationDialog
                        patientName={patient.name}
                        callType="voice"
                    >
                        <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                        <span className="sr-only">Voice Call</span>
                        </Button>
                    </CallSimulationDialog>
                    </TableCell>
                </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                        No patients found matching your search.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
