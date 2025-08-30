import Link from 'next/link';
import {
  FileText,
  UserPlus,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPatients } from '@/lib/mock-data';

export function QuickActionCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Appointments Today</CardDescription>
          <CardTitle className="text-4xl">12</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +5% from yesterday
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Patients</CardDescription>
          <CardTitle className="text-4xl">{mockPatients.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +2 new this month
          </div>
        </CardContent>
      </Card>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-4">
          <CardDescription>
            Welcome back, Dr. Smith! You have some pending tasks.
          </CardDescription>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/doctor/add-patient">
              <UserPlus className="mr-2 h-4 w-4" /> Add Patient
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/doctor/analyze-report">
              <FileText className="mr-2 h-4 w-4" /> Analyze Report
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
