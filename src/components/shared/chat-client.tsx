'use client';

import { useState } from 'react';
import { ConversationList } from './conversation-list';
import { ChatWindow } from './chat-window';
import { mockConversations, mockMessages, mockPatients } from '@/lib/mock-data';
import type { Conversation, ChatMessage } from '@/lib/types';
import { Card } from '../ui/card';

interface ChatClientProps {
  userType: 'doctor' | 'patient';
}

export function ChatClient({ userType }: ChatClientProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  
  // In a real app, these would be fetched from a database
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<{[key: string]: ChatMessage[]}>(mockMessages);


  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    // Mark messages as read
    const updatedConversations = conversations.map(c => 
        c.id === conversation.id ? {...c, unreadCount: 0} : c
    );
    setConversations(updatedConversations);
  };

  const handleSendMessage = (text: string) => {
    if (!selectedConversation) return;

    const newMessage: ChatMessage = {
      id: `msg${Date.now()}`,
      text,
      senderId: userType,
      timestamp: new Date(),
    };

    const conversationId = selectedConversation.id;
    const updatedMessages = {
      ...messages,
      [conversationId]: [...(messages[conversationId] || []), newMessage],
    };
    setMessages(updatedMessages);

     const updatedConversations = conversations.map(c => 
        c.id === conversationId ? {...c, lastMessage: text, lastMessageTimestamp: new Date()} : c
    );
    setConversations(updatedConversations);
  };

  const currentMessages = selectedConversation ? messages[selectedConversation.id] || [] : [];
  const participantName = userType === 'patient' ? 'Dr. Smith' : selectedConversation?.participant.name;

  return (
    <Card className="h-[calc(100vh-10rem)] flex">
        <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
        />
        <ChatWindow
            messages={currentMessages}
            participantName={participantName || 'Select a conversation'}
            onSendMessage={handleSendMessage}
            userType={userType}
        />
    </Card>
  );
}
