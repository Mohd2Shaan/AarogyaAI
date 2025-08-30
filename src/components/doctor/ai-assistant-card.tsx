import Link from 'next/link';
import { FileText, Stethoscope } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function AiAssistantCard() {
  return (
    <Card className="bg-accent/50 border-accent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope /> AI Assistant
        </CardTitle>
        <CardDescription>
          Leverage AI to get insights from medical reports quickly.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Upload a patient's medical report (PDF, JPG, PNG) to get a
          summary, potential issues, and suggested next steps.
        </p>
        <Button asChild className="w-full" variant="secondary">
          <Link href="/doctor/analyze-report">
            <FileText className="mr-2 h-4 w-4" />
            Analyze a New Report
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
