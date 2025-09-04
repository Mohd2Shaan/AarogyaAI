
import Link from 'next/link';
import {
  FileText,
  MessageSquare,
  CalendarPlus,
  UserPlus,
  HeartPulse,
} from 'lucide-react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

const actionCards = [
    {
        title: 'Health Profile',
        icon: FileText,
        href: '/patient/records',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
    },
    {
        title: 'Chat & Video Call',
        icon: MessageSquare,
        href: '/patient/messages',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
    },
    {
        title: 'Appointment Booking',
        icon: CalendarPlus,
        href: '/patient/appointments',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
    },
    {
        title: 'Connect with Specialist',
        icon: UserPlus,
        href: '/patient/connect-specialist',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
    },
];

export function QuickActionCards() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {actionCards.map((card) => (
        <Link href={card.href} key={card.title} className="group">
            <Card className="transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                    <div className={`p-3 rounded-full mb-3 transition-colors duration-300 ${card.bgColor}`}>
                        <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm">{card.title}</h3>
                </CardContent>
            </Card>
        </Link>
      ))}
    </div>
  );
}
