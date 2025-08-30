'use server';

/**
 * @fileOverview A medical report analysis AI agent.
 *
 * - analyzeMedicalReport - A function that handles the medical report analysis process.
 * - AnalyzeMedicalReportInput - The input type for the analyzeMedicalReport function.
 * - AnalyzeMedicalReportOutput - The return type for the analyzeMedicalReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMedicalReportInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      "A medical report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeMedicalReportInput = z.infer<typeof AnalyzeMedicalReportInputSchema>;

const AnalyzeMedicalReportOutputSchema = z.object({
  summary: z.string().describe('A summary of the medical report.'),
  potentialIssues: z.string().describe('Potential issues highlighted in the report.'),
  nextSteps: z.string().describe('Suggested next steps based on the report.'),
});
export type AnalyzeMedicalReportOutput = z.infer<typeof AnalyzeMedicalReportOutputSchema>;

export async function analyzeMedicalReport(input: AnalyzeMedicalReportInput): Promise<AnalyzeMedicalReportOutput> {
  return analyzeMedicalReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMedicalReportPrompt',
  input: {schema: AnalyzeMedicalReportInputSchema},
  output: {schema: AnalyzeMedicalReportOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing medical reports. Please summarize the report, highlight any potential issues, and suggest next steps for the doctor. Use the following medical report as the primary source of information:

Medical Report: {{media url=reportDataUri}}`,
});

const analyzeMedicalReportFlow = ai.defineFlow(
  {
    name: 'analyzeMedicalReportFlow',
    inputSchema: AnalyzeMedicalReportInputSchema,
    outputSchema: AnalyzeMedicalReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
