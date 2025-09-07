
'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cake, Phone, User as UserIcon } from 'lucide-react';
import { usePatientStore } from '@/lib/store';
import type { Patient } from '@/lib/types';
import { DoctorDashboardSkeleton } from '@/components/skeletons';
import { PatientReportManager } from '@/components/doctor/patient-report-manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditableMedicineSchedule } from '@/components/doctor/editable-medicine-schedule';
import { PatientFoodLog } from '@/components/doctor/patient-food-log';
import { AiComplianceAssistant } from '@/components/doctor/ai-compliance-assistant';

export default function PatientProfilePage() {
  const params = useParams();
  const { getPatientById } = usePatientStore();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const patientId = params.id as string;

  useEffect(() => {
    if (patientId) {
      const foundPatient = getPatientById(patientId);
      setPatient(foundPatient);
    }
    setIsLoading(false);
  }, [patientId, getPatientById]);

  if (isLoading) {
    return <DoctorDashboardSkeleton />;
  }

  if (!patient) {
    notFound();
    return null;
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
      <div className="flex flex-col md:flex-row items-start gap-8">
        <Avatar className="h-32 w-32 border-4 border-primary shadow-md">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback className="text-4xl">
            {patient.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h1 className="text-4xl font-bold tracking-tight">{patient.name}</h1>
          <p className="text-muted-foreground text-lg">Patient ID: {patient.id}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Cake className="h-5 w-5" />
              <span>
                {patient.dob} ({calculateAge(patient.dob)} years old)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              <span>{patient.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <span>{patient.contact}</span>
            </div>
          </div>
        </div>
      </div>
      
      <AiComplianceAssistant patientId={patient.id} />

      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Medicine Schedule</TabsTrigger>
          <TabsTrigger value="food">Food Log</TabsTrigger>
          <TabsTrigger value="reports">Clinical Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
            <EditableMedicineSchedule />
        </TabsContent>
        <TabsContent value="food">
            <PatientFoodLog patientId={patient.id} />
        </TabsContent>
        <TabsContent value="reports">
            <PatientReportManager patientId={patient.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
