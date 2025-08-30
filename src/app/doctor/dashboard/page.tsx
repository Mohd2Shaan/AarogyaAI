import { TodaysAppointments } from '@/components/doctor/todays-appointments';

export default function DoctorDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Good morning, Dr. Aarav</h1>
        <p className="text-muted-foreground">Ready to help your patients today?</p>
      </div>
      <TodaysAppointments />
    </div>
  );
}
