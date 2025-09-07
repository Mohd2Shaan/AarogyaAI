
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PatientDashboardSkeleton } from '@/components/skeletons';
import { UpcomingAppointmentsClient } from '@/components/patient/upcoming-appointments-client';
import { QuickActionCards } from '@/components/patient/quick-action-cards';
import { AiChatAssistantClient } from '@/components/patient/ai-chat-assistant-client';
import { User, Stethoscope } from 'lucide-react';
import { MedicineSchedule } from '@/components/doctor/medicine-schedule';

export default function PatientDashboard() {
  // Mock data for personalization
  const patient = {
    name: 'Jane Doe',
    age: 32,
    doctor: 'Dr. Aarav Malhotra'
  };

  return (
    <div className="space-y-8">
      {/* Personalized Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {patient.name}!
        </h1>
        <div className="flex items-center text-muted-foreground gap-6">
           <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{patient.age} years old</span>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            <span>Primary Doctor: {patient.doctor}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Medication</CardTitle>
              <CardDescription>
                Track and log your daily medication schedule.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<PatientDashboardSkeleton />}>
                <MedicineSchedule isPatientView={true} />
              </Suspense>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Your health hub. Access key features from here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuickActionCards />
            </CardContent>
          </Card>
        </div>

        <div className="grid auto-rows-max items-start gap-8">
          <Suspense fallback={<PatientDashboardSkeleton />}>
            <UpcomingAppointmentsClient />
          </Suspense>
          <AiChatAssistantClient />
        </div>
      </div>
    </div>
  );
}
