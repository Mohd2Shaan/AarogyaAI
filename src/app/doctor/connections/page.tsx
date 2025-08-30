'use client';

import { ConnectionRequests } from '@/components/doctor/connection-requests';

export default function ConnectionsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Connections</h1>
      <ConnectionRequests />
    </div>
  );
}
