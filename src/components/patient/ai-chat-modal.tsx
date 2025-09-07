
'use client';

import { useState, useRef, useEffect } from 'react';
import { AlertCircle, Loader2, Send, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { chatWithAssistant } from '@/ai/flows/chat-with-assistant';
import { Alert, AlertDescription } from '../ui/alert';
import type { MessageData } from 'genkit';

interface AiChatModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function AiChatModal({ isOpen, onOpenChange }: AiChatModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // @ts-ignore - access viewport
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input,
      senderId: 'patient',
      timestamp: new Date(),
    };
    
    const currentInput = input;
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const history: MessageData[] = newMessages.slice(0, -1).map(m => ({
          role: m.senderId === 'ai' ? 'model' : 'user',
          parts: [{text: m.text}]
      }));

      const aiResponseText = await chatWithAssistant({prompt: currentInput, history});

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
            <Sparkles className="text-primary" /> AI Health Assistant
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
             {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Sparkles className="h-12 w-12 mb-4" />
                    <h3 className="text-lg font-semibold text-foreground">Welcome to AarogyaAI</h3>
                    <p>You can ask me questions like:</p>
                    <ul className="mt-2 text-sm list-disc list-inside">
                        <li>"How was my sleep last night?"</li>
                        <li>"Summarize my latest health report."</li>
                        <li>"Any tips for a high-stress day?"</li>
                    </ul>
                </div>
            )}
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
                    <span className="text-sm text-muted-foreground">AarogyaAI is thinking...</span>
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
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
