
'use client';

import { cn } from '@/lib/utils';
import type { Conversation } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export function ConversationList({
  conversations,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <aside className="w-1/3 border-r">
       <CardHeader>
           <CardTitle>Messages</CardTitle>
       </CardHeader>
       <ScrollArea className="h-[calc(100%-4rem)]">
            <div className="flex flex-col">
                {conversations.map((convo) => (
                <button
                    key={convo.id}
                    className={cn(
                    'flex items-center gap-4 p-4 text-left transition-colors hover:bg-muted/50',
                    selectedConversation?.id === convo.id && 'bg-muted'
                    )}
                    onClick={() => onSelectConversation(convo)}
                >
                    <Avatar className="h-10 w-10">
                    <AvatarImage src={convo.participant.avatar} alt={convo.participant.name} />
                    <AvatarFallback>{convo.participant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">{convo.participant.name}</p>
                        <p className="text-xs text-muted-foreground">
                        {isClient ? formatDistanceToNow(convo.lastMessageTimestamp, { addSuffix: true }) : '...'}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                        {convo.unreadCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {convo.unreadCount}
                        </span>
                        )}
                    </div>
                    </div>
                </button>
                ))}
            </div>
        </ScrollArea>
    </aside>
  );
}
