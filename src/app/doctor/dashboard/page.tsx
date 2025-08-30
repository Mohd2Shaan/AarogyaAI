import Link from 'next/link';
import {
  FileText,
  PlusCircle,
  Stethoscope,
  UserPlus,
  Video,
  Phone,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { CallSimulationDialog } from '@/components/shared/call-simulation';
import { mockPatients } from '@/lib/mock-data';
import type { Patient } from '@/lib/types';

export default function DoctorDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Appointments Today</CardDescription>
              <CardTitle className="text-4xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +5% from yesterday
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Active Patients</CardDescription>
              <CardTitle className="text-4xl">{mockPatients.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +2 new this month
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2">
            <CardHeader className="pb-4">
              <CardDescription>
                Welcome back, Dr. Smith! You have some pending tasks.
              </CardDescription>
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Button asChild size="sm">
                <Link href="/doctor/add-patient">
                  <UserPlus className="mr-2 h-4 w-4" /> Add Patient
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/doctor/analyze-report">
                  <FileText className="mr-2 h-4 w-4" /> Analyze Report
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Current Patients</CardTitle>
            <CardDescription>
              Manage your patients and start consultations.
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
                {mockPatients.map((patient: Patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={patient.avatar} alt="Avatar" />
                          <AvatarFallback>
                            {patient.name.charAt(0)}
                          </AvatarFallback>
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
                    <TableCell className="text-right">
                      <CallSimulationDialog
                        patientName={patient.name}
                        callType="video"
                      >
                        <Button variant="outline" size="icon" className="mr-2">
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card className="bg-accent/50 border-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope /> AI Assistant
            </CardTitle>
            <CardDescription>
              Leverage AI to get insights from medical reports quickly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Upload a patient's medical report (PDF, JPG, PNG) to get a
              summary, potential issues, and suggested next steps.
            </p>
            <Button asChild className="w-full" variant="secondary">
              <Link href="/doctor/analyze-report">
                <FileText className="mr-2 h-4 w-4" />
                Analyze a New Report
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invite a Colleague</CardTitle>
            <CardDescription>
              Invite other doctors to join the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* This would be a form in a real app */}
            <p className="text-sm text-muted-foreground mb-4">
              A mock invite will be generated.
            </p>
            <Button className="w-full" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
