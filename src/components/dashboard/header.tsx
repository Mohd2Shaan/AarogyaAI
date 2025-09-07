
'use client';

import Link from 'next/link';
import { Bell, Menu, Search, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserNav } from './user-nav';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Logo } from '../icons';
import { AiChatModal } from '../patient/ai-chat-modal';

interface HeaderProps {
  userType: 'Doctor' | 'Patient';
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  mobileNav?: React.ReactNode;
}

type DoctorStatus = 'Available' | 'Busy' | 'Offline';

export function Header({ userType, searchTerm, onSearchChange, mobileNav }: HeaderProps) {
  const [status, setStatus] = useState<DoctorStatus>('Available');
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-6 sticky top-0 z-30">
        {mobileNav}
      <div className="w-full flex-1">
        {userType === 'Patient' ? (
           <Button variant="outline" className="w-full justify-start text-muted-foreground rounded-full" onClick={() => setIsChatOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            Ask me about your health profile, daily routine...
          </Button>
        ) : (
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={onSearchChange ? 'Search patients...' : 'Search anything...'}
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3 rounded-full"
                value={searchTerm}
                onChange={(e) => onSearchChange?.(e.target.value)}
                disabled={!onSearchChange}
              />
            </div>
          </form>
        )}
      </div>
      {userType === 'Doctor' && (
        <div className="hidden md:flex items-center gap-2 text-sm">
          <Button
            variant="ghost"
            className="rounded-full data-[state=active]:bg-green-100 data-[state=active]:text-green-700 dark:data-[state=active]:bg-green-900/50 dark:data-[state=active]:text-green-300"
            data-state={status === 'Available' ? 'active' : 'inactive'}
            onClick={() => setStatus('Available')}
          >
            Available
          </Button>
          <Button
            variant="ghost"
            className="rounded-full data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800 dark:data-[state=active]:bg-yellow-900/50 dark:data-[state=active]:text-yellow-300"
            data-state={status === 'Busy' ? 'active' : 'inactive'}
            onClick={() => setStatus('Busy')}
          >
            Busy
          </Button>
          <Button
            variant="ghost"
            className="rounded-full data-[state=active]:bg-red-100 data-[state=active]:text-red-700 dark:data-[state=active]:bg-red-900/50 dark:data-[state=active]:text-red-300"
            data-state={status === 'Offline' ? 'active' : 'inactive'}
            onClick={() => setStatus('Offline')}
          >
            Offline
          </Button>
        </div>
      )}
      <Button variant="ghost" size="icon" className="rounded-full relative">
        <Bell className="h-5 w-5" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs">3</Badge>
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <UserNav userType={userType} />
      {userType === 'Patient' && <AiChatModal isOpen={isChatOpen} onOpenChange={setIsChatOpen} />}
    </header>
  );
}
