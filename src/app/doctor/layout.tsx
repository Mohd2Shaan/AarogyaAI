import { Header } from '@/components/dashboard/header';

const doctorNavLinks = [
  { href: '/doctor/dashboard', label: 'Dashboard' },
  { href: '/doctor/add-patient', label: 'Add Patient' },
  { href: '/doctor/analyze-report', label: 'Analyze Report' },
];

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header userType="Doctor" navLinks={doctorNavLinks} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
