
'use client';

import { useState } from 'react';
import { AlertCircle, Loader2, Send, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { chatWithAssistant } from '@/ai/flows/chat-with-assistant';

interface AiChatModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function AiChatModal({ isOpen, onOpenChange }: AiChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      senderId: 'patient',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
          role: m.senderId === 'ai' ? 'model' : 'user',
          parts: [{text: m.text}]
      }));
      const aiResponseText = await chatWithAssistant({prompt: input, history});

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        senderId: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI chat error:', error);
       const errorMessage: ChatMessage = {
        id: `ai-error-${Date.now()}`,
        text: 'Sorry, I encountered an error. Please try again.',
        senderId: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="text-primary" /> AI Health Assistant for Patient
          </DialogTitle>
          <DialogDescription>
            Get answers to general health questions.
          </DialogDescription>
        </DialogHeader>

        <div className="mx-4 p-2 border rounded-lg text-xs text-muted-foreground bg-background/50">
          <p><strong>Disclaimer:</strong> This AI assistant provides general information only and is not a substitute for professional medical advice.</p>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3',
                  msg.senderId === 'patient' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.senderId === 'ai' && (
                  <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                    <AvatarFallback><Sparkles size={18} /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-lg p-3 text-sm',
                    msg.senderId === 'patient'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                 {msg.senderId === 'patient' && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://i.pravatar.cc/150?u=jane.doe" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                 )}
              </div>
            ))}
             {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 bg-primary/20 text-primary">
                    <AvatarFallback><Sparkles size={18} /></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">AI is typing...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <footer className="border-t p-4">
          <div className="relative">
            <Input
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              className="pr-12"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={handleSend}
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
