import { QuickActionCards } from '@/components/doctor/quick-action-cards';
import { TodaysAppointments } from '@/components/doctor/todays-appointments';
import { PatientList } from '@/components/doctor/patient-list';
import { AiAssistantCard } from '@/components/doctor/ai-assistant-card';
import { InviteColleagueCard } from '@/components/doctor/invite-colleague-card';

export default function DoctorDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Good morning, Dr. Aarav
        </h1>
        <p className="text-muted-foreground">
          Ready to help your patients today?
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <TodaysAppointments />
        </div>
        <div className="space-y-8 hidden xl:block">
            {/* This space can be used for other cards on larger screens if needed */}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <QuickActionCards />
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          <PatientList />
        </div>
        <div className="space-y-8">
          <AiAssistantCard />
          <InviteColleagueCard />
        </div>
      </div>
    </div>
  );
}
