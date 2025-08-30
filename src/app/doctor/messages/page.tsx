'use client';

import { ChatClient } from "@/components/shared/chat-client";

export default function DoctorMessagesPage() {
    return (
        <ChatClient userType="doctor" />
    )
}
