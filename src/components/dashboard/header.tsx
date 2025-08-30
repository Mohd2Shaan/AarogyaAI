'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserNav } from './user-nav';
import { Logo } from '../icons';

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  userType: 'Doctor' | 'Patient';
  navLinks: NavLink[];
}

export function Header({ userType, navLinks }: HeaderProps) {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname.startsWith(link.href)
              ? 'text-primary'
              : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold">AarogyaAI</span>
          </Link>
          <div className="hidden md:flex">
            <NavLinks />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav userType={userType} />
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                    <Logo className="h-6 w-6 text-primary" />
                    <span className="inline-block font-bold">AarogyaAI</span>
                </Link>
                <div className="flex flex-col space-y-4">
                    <NavLinks className="flex-col space-x-0 space-y-2 items-start" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
