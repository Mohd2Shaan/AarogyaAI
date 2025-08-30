'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { MessageSquare } from 'lucide-react';
import { AiChatModal } from './ai-chat-modal';
import { useState } from 'react';

export function AiChatAssistantClient() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>AI Chat Assistant</CardTitle>
                    <CardDescription>
                        Get quick answers to general health questions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={() => setIsChatOpen(true)}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat with AI
                    </Button>
                </CardContent>
            </Card>
            <AiChatModal isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
        </>
    );
}
