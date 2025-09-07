
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ModernLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const taglines = [
  {
    headline: 'Smarter care starts here.',
    subtext: 'Track. Connect. Heal.',
  },
  {
    headline: 'Your health, your data, your doctor.',
    subtext: 'All in one secure place.',
  },
  {
    headline: 'Experience healthcare reimagined.',
    subtext: 'With the power of AI.',
  },
];

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M21.35 11.1h-9.1v3.4h5.2c-.2 1.1-.9 2.1-2.1 2.8v2.3h2.9c1.7-1.6 2.7-4 2.7-6.5s-1-4.9-2.6-6.5z"
      />
      <path
        fill="#34A853"
        d="M12.25 22c2.4 0 4.5-.8 6-2.2l-2.9-2.3c-.8.5-1.9.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H4.1v2.4c1.3 2.5 4.1 4.2 7.15 4.2z"
      />
      <path
        fill="#FBBC05"
        d="M7.15 14.7c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8V8.8H4.1c-.7 1.3-1.1 2.8-1.1 4.4s.4 3.1 1.1 4.4l3.05-2.3z"
      />
      <path
        fill="#EA4335"
        d="M12.25 6.8c1.3 0 2.5.5 3.4 1.4l2.6-2.6C16.7 3.9 14.6 3 12.25 3 9.2 3 6.4 4.7 5.1 7.2l3.05 2.3c.7-2.2 2.7-3.7 5.1-3.7z"
      />
    </svg>
  );
}


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (!email || !password) {
        toast({
          title: 'Login Failed',
          description: 'Please enter both email and password.',
          variant: 'destructive',
        });
        return;
      }
      toast({
        title: 'Login Successful',
        description: 'Redirecting to your dashboard...',
        className: 'bg-primary text-primary-foreground',
      });
      // Default to patient dashboard for this redesigned page
      router.push('/patient/dashboard');
    }, 1500);
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen bg-background">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="rounded-lg"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="rounded-lg"
              />
            </div>
            <Button type="submit" className="w-full rounded-lg shadow-sm hover:shadow-md" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            <Button variant="outline" className="w-full rounded-lg" type="button">
              <GoogleIcon /> Continue with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center p-12 flex-col text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50"></div>
         <div className="relative z-10">
            <Link href="/" className="flex items-center justify-center gap-3 mb-8">
                <ModernLogo className="h-12 w-12 text-primary" />
                <span className="text-4xl font-bold text-foreground">Aarogya Care</span>
            </Link>
            <div className="h-24">
                {isClient && taglines.map((tagline, index) => (
                    <div
                        key={index}
                        className={cn(
                        'absolute w-full transition-opacity duration-1000 ease-in-out',
                        index === currentTaglineIndex ? 'opacity-100' : 'opacity-0'
                        )}
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-foreground">
                            {tagline.headline}
                        </h2>
                        <p className="text-xl text-muted-foreground mt-2">{tagline.subtext}</p>
                    </div>
                ))}
            </div>
            <p className="text-sm text-muted-foreground mt-24 max-w-md mx-auto">
                Securely manage your health records, communicate with your doctor, and receive personalized AI-driven insights to help you on your wellness journey.
            </p>
         </div>
      </div>
    </div>
  );
}
