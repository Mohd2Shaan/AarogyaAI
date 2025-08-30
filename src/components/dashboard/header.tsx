'use client';

import Link from 'next/link';
import { Bell, Menu, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserNav } from './user-nav';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Logo } from '../icons';

interface HeaderProps {
  userType: 'Doctor' | 'Patient';
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

type DoctorStatus = 'Available' | 'Busy' | 'Offline';

export function Header({ userType, searchTerm, onSearchChange }: HeaderProps) {
  const [status, setStatus] = useState<DoctorStatus>('Available');

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <div className="md:hidden">
        {/* Mobile menu can be added here if needed */}
      </div>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={onSearchChange ? "Search patients..." : "Search..."}
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              disabled={!onSearchChange}
            />
          </div>
        </form>
      </div>
       {userType === 'Doctor' && (
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Button
            variant="ghost"
            className="rounded-full data-[state=active]:bg-green-100 data-[state=active]:text-green-700"
            data-state={status === 'Available' ? 'active' : 'inactive'}
            onClick={() => setStatus('Available')}
          >
            Available
          </Button>
          <Button
            variant="ghost"
            className="rounded-full data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800"
            data-state={status === 'Busy' ? 'active' : 'inactive'}
            onClick={() => setStatus('Busy')}
          >
            Busy
          </Button>
          <Button
            variant="ghost"
            className="rounded-full data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
            data-state={status === 'Offline' ? 'active' : 'inactive'}
            onClick={() => setStatus('Offline')}
          >
            Offline
          </Button>
        </div>
      )}
      <Button variant="ghost" size="icon" className="rounded-full relative">
        <Bell className="h-5 w-5" />
         <Badge className="absolute top-0 right-0 h-5 w-5 justify-center p-0 text-xs">3</Badge>
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <UserNav userType={userType} />
    </header>
  );
}
