'use server';

import { analyzeMedicalReport, type AnalyzeMedicalReportOutput } from '@/ai/flows/analyze-medical-report';
import { logAuditEvent } from '@/lib/audit';
import { revalidatePath } from 'next/cache';

interface FormState {
  success: boolean;
  message: string;
  analysis?: AnalyzeMedicalReportOutput;
  analysisId?: string;
}

// In-memory store for analysis results for this demo.
// In a real app, you would use a database like Firestore.
const analysisStore: Record<string, AnalyzeMedicalReportOutput> = {};

export async function handleAnalyzeReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const reportDataUri = formData.get('reportDataUri') as string;
  const reportName = formData.get('reportName') as string;

  if (!reportDataUri) {
    return { success: false, message: 'No file data submitted.' };
  }

  const analysisId = crypto.randomUUID();

  // Don't await this. This is now a "fire-and-forget" operation.
  // The client will poll for the result.
  analyzeMedicalReport({ reportDataUri })
    .then(analysis => {
      // Store the result
      analysisStore[analysisId] = analysis;
      logAuditEvent('REPORT_ANALYSIS_SUCCESS', 'doctor', { reportName });
    })
    .catch(error => {
      console.error('Error analyzing medical report:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      logAuditEvent('REPORT_ANALYSIS_FAIL', 'doctor', { reportName, error: errorMessage });
      // You could potentially store the error state as well
      analysisStore[analysisId] = {
        summary: 'Analysis Failed',
        potentialIssues: 'Could not analyze the report.',
        nextSteps: 'Please try again or upload a different file.'
      };
    });

    revalidatePath('/doctor/analyze-report');

  return {
    success: true,
    message: 'Analysis has started. Results will appear shortly.',
    analysisId,
  };
}


export async function getAnalysisResult(analysisId: string): Promise<AnalyzeMedicalReportOutput | null> {
    if (analysisId in analysisStore) {
        return analysisStore[analysisId];
    }
    return null;
}
