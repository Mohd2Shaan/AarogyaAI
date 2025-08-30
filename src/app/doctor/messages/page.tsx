'use client';

import { DoctorDashboardSkeleton } from "@/components/skeletons";
import dynamic from "next/dynamic";

const ChatClient = dynamic(() => import('@/components/shared/chat-client').then(mod => mod.ChatClient), {
    ssr: false,
    loading: () => <DoctorDashboardSkeleton />
});

export default function DoctorMessagesPage() {
    return (
        <ChatClient userType="doctor" />
    )
}
