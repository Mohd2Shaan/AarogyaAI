
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModernLogo } from '@/components/icons';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/20 p-8">
      <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <div className="flex items-center gap-3 mb-4">
            <ModernLogo className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-bold font-headline tracking-tight">
              AarogyaAI
            </h1>
          </div>

          <p className="mb-6 max-w-2xl font-light text-muted-foreground md:text-lg lg:mb-8 lg:text-xl">
            Welcome to the future of healthcare management. Connect with your
            doctor, track your health, and get AI-powered insights, all in
            one secure platform.
          </p>
          <div className="flex items-center gap-4">
            <Button asChild size="lg">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
           <p className="mt-8 text-xs text-muted-foreground max-w-md">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <Image
            src="https://picsum.photos/seed/healthcare/600/800"
            alt="Healthcare professionals"
            width={600}
            height={800}
            className="rounded-lg object-cover shadow-2xl"
            data-ai-hint="healthcare professional"
          />
        </div>
      </div>
       <footer className="absolute bottom-4 text-center text-muted-foreground text-xs">
        <p>&copy; {new Date().getFullYear()} AarogyaAI. All rights reserved.</p>
      </footer>
    </div>
  );
}
