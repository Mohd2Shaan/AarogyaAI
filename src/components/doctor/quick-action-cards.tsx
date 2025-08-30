import Link from 'next/link';
import {
  UserPlus,
  CalendarPlus,
  FilePenLine,
  ClipboardPen,
  Users,
  UserPlus2
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const actionCards = [
    {
        title: 'Add Patient',
        description: 'Register new patient',
        icon: UserPlus,
        href: '/doctor/add-patient',
        color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
        title: 'Schedule',
        description: 'Book new patient slot',
        icon: CalendarPlus,
        href: '/doctor/appointments',
        color: 'bg-green-500 hover:bg-green-600',
    },
    {
        title: 'Prescription',
        description: 'Create new prescription',
        icon: FilePenLine,
        href: '/doctor/prescriptions',
        color: 'bg-teal-500 hover:bg-teal-600',
    },
    {
        title: 'Patient Notes',
        description: 'Quick note entry',
        icon: ClipboardPen,
        href: '/doctor/notes',
        color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
        title: 'Connections',
        description: 'View connection requests',
        icon: Users,
        href: '/doctor/connections',
        color: 'bg-purple-500 hover:bg-purple-600',
    },
    {
        title: 'Invite Doctor',
        description: 'Add team member',
        icon: UserPlus2,
        href: '/doctor/invite',
        color: 'bg-indigo-500 hover:bg-indigo-600',
    }
]

export function QuickActionCards() {
  return (
    <>
      {actionCards.map((card) => (
        <Link href={card.href} key={card.title} className="col-span-1">
            <Card className={`text-white transition-transform transform-gpu hover:scale-105 ${card.color}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-white/80" />
            </CardHeader>
            <CardContent>
                <p className="text-xs text-white/80">{card.description}</p>
            </CardContent>
            </Card>
        </Link>
      ))}
    </>
  );
}
