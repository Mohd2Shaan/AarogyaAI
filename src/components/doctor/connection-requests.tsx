'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockConnectionRequests } from '@/lib/mock-data';
import type { ConnectionRequest } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { Check, UserPlus, X } from 'lucide-react';
import { logAuditEvent } from '@/lib/audit';

export function ConnectionRequests() {
  const [requests, setRequests] = useState<ConnectionRequest[]>(
    mockConnectionRequests
  );

  const handleRequest = (id: string, status: 'accepted' | 'declined') => {
    const updatedRequests = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setRequests(updatedRequests);
    const patientName = requests.find(r => r.id === id)?.patient.name;
    logAuditEvent('CONNECTION_REQUEST', 'doctor', { patientName, status });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus />
          Manage Connection Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={request.patient.avatar} />
                      <AvatarFallback>
                        {request.patient.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{request.patient.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDistanceToNow(request.requestDate, {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  {request.status === 'pending' ? (
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRequest(request.id, 'declined')}
                        className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <X className="mr-2 h-4 w-4" /> Decline
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleRequest(request.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="mr-2 h-4 w-4" /> Accept
                      </Button>
                    </div>
                  ) : (
                    <Badge
                      variant={
                        request.status === 'accepted' ? 'default' : 'destructive'
                      }
                      className={
                        request.status === 'accepted' ?
                        'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {request.status.charAt(0).toUpperCase() +
                        request.status.slice(1)}
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {requests.filter(r => r.status === 'pending').length === 0 && (
            <div className="text-center text-muted-foreground p-8">
                No pending connection requests.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
