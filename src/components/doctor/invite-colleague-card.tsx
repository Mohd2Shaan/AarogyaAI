import { UserPlus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function InviteColleagueCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite a Colleague</CardTitle>
        <CardDescription>
          Invite other doctors to join the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* This would be a form in a real app */}
        <p className="text-sm text-muted-foreground mb-4">
          A mock invite will be generated.
        </p>
        <Button className="w-full" variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Doctor
        </Button>
      </CardContent>
    </Card>
  );
}
