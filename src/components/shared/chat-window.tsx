
'use client';

import { useState } from 'react';
import { Send, Phone, Video } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CallSimulationDialog } from './call-simulation';
import { Skeleton } from '../ui/skeleton';

interface ChatWindowProps {
  messages: ChatMessage[];
  participantName: string;
  onSendMessage: (text: string) => void;
  userType: 'doctor' | 'patient';
}

export function ChatWindow({
  messages,
  participantName,
  onSendMessage,
  userType,
}: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useState(() => {
    setIsClient(true);
  });

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const getAvatarUrl = (senderId: string) => {
    if (userType === 'doctor') {
        return senderId === 'doctor' ? 'https://i.pravatar.cc/150?u=dr.smith' : `https://i.pravatar.cc/150?u=${participantName.toLowerCase().replace(' ', '.')}`;
    } else {
        return senderId === 'patient' ? 'https://i.pravatar.cc/150?u=jane.doe' : 'https://i.pravatar.cc/150?u=dr.smith';
    }
  }

  return (
    <div className="flex flex-1 flex-col">
       <header className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-bold">{participantName}</h2>
        {participantName !== 'Select a conversation' && (
          <div className="flex items-center gap-2">
            {isClient ? (
              <>
                <CallSimulationDialog patientName={participantName} callType="voice">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">Voice Call</span>
                  </Button>
                </CallSimulationDialog>
                <CallSimulationDialog patientName={participantName} callType="video">
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                    <span className="sr-only">Video Call</span>
                  </Button>
                </CallSimulationDialog>
              </>
            ) : (
                <div className='flex items-center gap-2'>
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            )}
          </div>
        )}
      </header>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                msg.senderId === userType ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.senderId !== userType && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getAvatarUrl(msg.senderId)} />
                  <AvatarFallback>{participantName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs rounded-lg p-3 text-sm md:max-w-md',
                  msg.senderId === userType
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p>{msg.text}</p>
                 <p className={cn("text-xs mt-1",  msg.senderId === userType ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
               {msg.senderId === userType && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={getAvatarUrl(msg.senderId)} />
                  <AvatarFallback>
                    {userType === 'doctor' ? 'DS' : 'JD'}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="border-t p-4">
        <div className="relative">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="pr-12 rounded-full"
            disabled={participantName === 'Select a conversation'}
          />
          <Button
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
