
'use client';

import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  FileText,
  UserPlus,
  HeartPulse,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const patientNavLinks = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient/messages', label: 'Messages', icon: MessageSquare },
  { href: '/patient/appointments', label: 'Appointments', icon: Calendar },
  { href: '/patient/records', label: 'My Records', icon: FileText },
  { href: '/patient/symptom-checker', label: 'Symptom Checker', icon: HeartPulse },
  { href: '/patient/connect-specialist', label: 'Connect Specialist', icon: UserPlus },
];

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={patientNavLinks} className="hidden md:block" />
      <div className="flex flex-col">
        <Header 
            userType="Patient" 
            mobileNav={
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0">
                <Sidebar navLinks={patientNavLinks} />
              </SheetContent>
            </Sheet>
            }
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/40">
          {children}
        </main>
      </div>
    </div>
  );
}
