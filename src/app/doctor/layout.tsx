'use client';

import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import {
  Home,
  Users,
  Calendar,
  FileText,
  LineChart,
  BrainCircuit,
  MessageSquare,
  Settings,
} from 'lucide-react';

const doctorNavLinks = [
  { href: '/doctor/dashboard', label: 'Home', icon: Home },
  { href: '/doctor/patients', label: 'Patient Records', icon: Users },
  { href: '/doctor/appointments', label: 'Appointments', icon: Calendar },
  { href: '/doctor/prescriptions', label: 'Prescriptions', icon: FileText },
  { href: '/doctor/analytics', label: 'Analytics', icon: LineChart },
  { href: '/doctor/ai-insights', label: 'AI Insights', icon: BrainCircuit },
  { href: '/doctor/messages', label: 'Messages', icon: MessageSquare },
  { href: '/doctor/settings', label: 'Settings', icon: Settings },
];

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={doctorNavLinks} />
      <div className="flex flex-col">
        <Header userType="Doctor" />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/40">
          {children}
        </main>
      </div>
    </div>
  );
}
