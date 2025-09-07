
'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import {
  Home,
  Users,
  Calendar,
  LineChart,
  BrainCircuit,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const doctorNavLinks = [
  { href: '/doctor/dashboard', label: 'Home', icon: Home },
  { href: '/doctor/patients', label: 'Patient Records', icon: Users },
  { href: '/doctor/appointments', label: 'Appointments', icon: Calendar },
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
  const [searchTerm, setSearchTerm] = useState('');

  // Pass searchTerm to all children, so any page can use it.
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-ignore - cloning to pass props
      return React.cloneElement(child, { searchTerm });
    }
    return child;
  });

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar navLinks={doctorNavLinks} className="hidden md:block" />
      <div className="flex flex-col">
        <Header
          userType="Doctor"
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
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
                <SheetHeader className="p-4">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                </SheetHeader>
                <Sidebar navLinks={doctorNavLinks} />
              </SheetContent>
            </Sheet>
          }
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-secondary/40">
          {childrenWithProps}
        </main>
      </div>
    </div>
  );
}
