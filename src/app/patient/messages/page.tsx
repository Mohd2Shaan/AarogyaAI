'use client';

import { PatientDashboardSkeleton } from "@/components/skeletons";
import { ChatClient } from "@/components/shared/chat-client";
import dynamic from "next/dynamic";

const ChatClientDynamic = dynamic(() => import('@/components/shared/chat-client').then(mod => mod.ChatClient), {
    ssr: false,
    loading: () => <PatientDashboardSkeleton />
});


export default function PatientMessagesPage() {
    return (
        <ChatClientDynamic userType="patient" />
    )
}
