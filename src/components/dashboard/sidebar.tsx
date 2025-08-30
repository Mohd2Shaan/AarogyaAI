
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModernLogo } from '../icons';

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  navLinks: NavLink[];
}

export function Sidebar({ navLinks }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ModernLogo className="h-6 w-6 text-primary" />
            <span className="">Aarogya Care</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-4 rounded-lg px-4 py-3 text-muted-foreground transition-all hover:text-primary',
                    isActive && 'bg-primary text-primary-foreground hover:text-primary-foreground'
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
