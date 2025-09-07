
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
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
import { Phone, Video, FileText, UserPlus } from 'lucide-react';
import type { Patient } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import { usePatientStore } from '@/lib/store';

const CallSimulationDialog = dynamic(() => import('../shared/call-simulation').then(mod => mod.CallSimulationDialog), {
    loading: () => <Button variant="outline" size="icon" disabled><Video className="h-4 w-4" /></Button>,
    ssr: false
});

export function PatientList({ searchTerm }: { searchTerm: string }) {
  const { patients } = usePatientStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredPatients = useMemo(() => {
    if (!searchTerm) {
      return patients;
    }
    return patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, patients]);

  if (!isClient) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Current Patients</CardTitle>
                <CardDescription>Loading patient data...</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center p-8">Loading...</div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Current Patients</CardTitle>
            <CardDescription>
            A list of all patients currently under your care.
            </CardDescription>
        </div>
        <Button asChild>
            <Link href="/doctor/add-patient">
                <UserPlus className="mr-2 h-4 w-4"/>
                Add Patient
            </Link>
        </Button>
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
                        <p className="text-sm text-muted-foreground md:hidden">
                            {patient.contact}
                        </p>
                        <p className="text-sm text-muted-foreground hidden md:block">
                            {patient.contact}
                        </p>
                        </div>
                    </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline">{patient.lastAppointment}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                     <Button variant="outline" size="icon" asChild>
                      <Link href={`/doctor/patients/${patient.id}`}>
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View Record</span>
                      </Link>
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
                        No patients found.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
