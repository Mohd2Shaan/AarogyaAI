
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
import { Button } from '@/components/ui/button';

export default function WelcomePage() {
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
          Welcome to the future of healthcare. Login or sign up to continue.
        </p>
      </div>

      <div className="flex items-center gap-4">
         <Button asChild size="lg">
            <Link href="/login">Login</Link>
         </Button>
         <Button asChild variant="outline" size="lg">
            <Link href="/signup">Sign Up</Link>
         </Button>
      </div>

      <div className="mt-16 text-center text-muted-foreground text-sm max-w-md">
        <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        <p className="mt-4">Are you a Doctor or a Patient? You can select your role during sign-up.</p>
      </div>

      <div className="absolute bottom-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-8 opacity-20 pointer-events-none">
        <Card className="h-full">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/20 rounded-full mb-4">
                <Stethoscope className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">
                For Doctors
              </CardTitle>
              <CardDescription>
                Access patient records, analyze reports, and manage appointments.
              </CardDescription>
            </CardHeader>
        </Card>

        <Card className="h-full">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary/20 rounded-full mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-headline">
                For Patients
              </CardTitle>
              <CardDescription>
                Track your activities, view your health data, and connect with your doctor.
              </CardDescription>
            </CardHeader>
        </Card>
      </div>

      <footer className="absolute bottom-2 text-center text-muted-foreground text-xs">
        <p>&copy; {new Date().getFullYear()} AarogyaAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
