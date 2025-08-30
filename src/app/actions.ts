'use server';

import { analyzeMedicalReport, type AnalyzeMedicalReportOutput } from '@/ai/flows/analyze-medical-report';
import { logAuditEvent } from '@/lib/audit';

interface FormState {
  success: boolean;
  message: string;
  analysis?: AnalyzeMedicalReportOutput;
}

export async function handleAnalyzeReport(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const reportDataUri = formData.get('reportDataUri') as string;

  if (!reportDataUri) {
    return { success: false, message: 'No file data submitted.' };
  }

  try {
    const analysis = await analyzeMedicalReport({ reportDataUri });
    logAuditEvent('REPORT_ANALYSIS_SUCCESS', 'doctor', { reportMimeType: reportDataUri.substring(5, reportDataUri.indexOf(';')) });
    return { success: true, message: 'Analysis complete.', analysis };
  } catch (error) {
    console.error('Error analyzing medical report:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    logAuditEvent('REPORT_ANALYSIS_FAIL', 'doctor', { error: errorMessage });
    return {
      success: false,
      message: `Failed to analyze report: ${errorMessage}`,
    };
  }
}
