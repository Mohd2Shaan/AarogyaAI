
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { FileClock, FilePlus2, Loader2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Mock data for report history
const mockReportHistory = [
  {
    id: 'report1',
    date: new Date('2024-04-15T10:00:00Z'),
    reportText:
      'Patient presented with mild symptoms of fatigue and occasional headaches. Blood pressure is slightly elevated at 140/90. Advised dietary changes and regular exercise. Follow-up in 2 weeks.',
    doctorId: 'Dr. Aarav Malhotra',
  },
  {
    id: 'report2',
    date: new Date('2024-03-01T14:30:00Z'),
    reportText:
      'Annual check-up. All vitals are within normal range. Blood work shows no abnormalities. Patient is in good health.',
    doctorId: 'Dr. Aarav Malhotra',
  },
];

interface PatientReportManagerProps {
  patientId: string;
}

function UpdateReportForm({ onReportAdded }: { onReportAdded: (newReport: any) => void }) {
  const [reportText, setReportText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) {
      toast({
        title: 'Error',
        description: 'Report content cannot be empty.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call to save the report
    setTimeout(() => {
      const newReport = {
        id: `report${Date.now()}`,
        date: new Date(),
        reportText,
        doctorId: 'Dr. Aarav Malhotra', // In a real app, get this from auth state
      };
      onReportAdded(newReport);
      toast({
        title: 'Report Saved',
        description: 'The new report has been added to the patient\'s history.',
        className: 'bg-accent text-accent-foreground',
      });
      setReportText('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePlus2 /> Add New Report
        </CardTitle>
        <CardDescription>
          Record new findings, notes, or prescriptions for this patient.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Enter report details here..."
            rows={6}
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            disabled={isSubmitting}
          />
          <Button type="submit" className="mt-4 w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isSubmitting ? 'Saving Report...' : 'Save Report'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function ReportHistory({ reports }: { reports: typeof mockReportHistory }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileClock /> Report History
        </CardTitle>
        <CardDescription>
          A chronological log of all past reports for this patient.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {reports.map((report) => (
              <AccordionItem value={report.id} key={report.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <span className="font-semibold">
                      {report.date.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      by {report.doctorId}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {report.reportText}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            No report history found for this patient.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function PatientReportManager({ patientId }: PatientReportManagerProps) {
  const [reports, setReports] = useState(mockReportHistory);

  const handleReportAdded = (newReport: any) => {
    setReports((prevReports) => [newReport, ...prevReports]);
  };

  return (
    <div className="space-y-8">
      <UpdateReportForm onReportAdded={handleReportAdded} />
      <ReportHistory reports={reports} />
    </div>
  );
}
