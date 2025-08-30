import { Header } from '@/components/dashboard/header';

const patientNavLinks = [
  { href: '/patient/dashboard', label: 'Dashboard' },
  { href: '/patient/messages', label: 'Messages' },
  { href: '/patient/appointments', label: 'Appointments' },
  { href: '/patient/records', label: 'My Records' },
];

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header userType="Patient" navLinks={patientNavLinks} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
