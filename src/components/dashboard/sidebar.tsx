
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

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navLinks: NavLink[];
}

export function Sidebar({ navLinks, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("border-r bg-card", className)}>
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <ModernLogo className="h-6 w-6 text-primary" />
            <span className="">Aarogya Care</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start p-2 text-sm font-medium lg:p-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/doctor/dashboard' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary',
                    isActive && 'bg-primary/10 text-primary font-semibold'
                  )}
                >
                  <link.icon className="h-4 w-4" />
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
