import Link from 'next/link';
import { Stethoscope, User } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ModernLogo } from '@/components/icons';

export default function UserSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <ModernLogo className="h-12 w-12 text-primary" />
          <h1 className="text-5xl font-bold font-headline tracking-tight">
            AarogyaAI
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Welcome to the future of healthcare. Please select your role to proceed to your personalized dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        <Link href="/doctor/dashboard" className="group">
          <Card className="h-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-primary">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/20 rounded-full mb-4 transition-colors duration-300 group-hover:bg-primary/30">
                <Stethoscope className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">
                I am a Doctor
              </CardTitle>
              <CardDescription>
                Access patient records, analyze reports, and manage appointments.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold text-primary transition-all duration-300 group-hover:underline">
                Go to Doctor's Dashboard &rarr;
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/patient/dashboard" className="group">
          <Card className="h-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-primary">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/20 rounded-full mb-4 transition-colors duration-300 group-hover:bg-primary/30">
                <User className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">
                I am a Patient
              </CardTitle>
              <CardDescription>
                Track your activities, view your health data, and connect with your doctor.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold text-primary transition-all duration-300 group-hover:underline">
                Go to Patient's Dashboard &rarr;
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <footer className="mt-16 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} AarogyaAI. All rights reserved.</p>
        <p className="mt-1">Your AI-powered health companion.</p>
      </footer>
    </div>
  );
}
