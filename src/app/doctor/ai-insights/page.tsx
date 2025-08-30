'use client';

import { AnalyzeReportClient } from '@/components/doctor/analyze-report-client';

export default function AiInsightsPage() {
  return (
    <div className="container mx-auto">
       <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          AI-Powered Report Analysis
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
          Upload a medical report (PDF, JPG, or PNG) and our AI assistant will
          provide a summary, highlight potential issues, and suggest next steps.
        </p>
      </div>
      <AnalyzeReportClient />
    </div>
  );
}
