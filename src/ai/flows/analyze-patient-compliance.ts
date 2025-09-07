
'use server';

/**
 * @fileOverview An AI-powered patient compliance analysis agent.
 *
 * - analyzePatientCompliance - A function that analyzes a patient's adherence to their treatment plan.
 * - AnalyzePatientComplianceInput - The input type for the analyzePatientCompliance function.
 * - AnalyzePatientComplianceOutput - The return type for the analyzePatientCompliance function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzePatientComplianceInputSchema = z.object({
  patientId: z.string().describe("The ID of the patient to analyze."),
});
export type AnalyzePatientComplianceInput = z.infer<typeof AnalyzePatientComplianceInputSchema>;

const AnalyzePatientComplianceOutputSchema = z.object({
  medicineAdherence: z.object({
    percentage: z.number().describe('The percentage of medicines taken as prescribed.'),
    summary: z.string().describe('A summary of medicine adherence, highlighting misses.'),
  }),
  foodCompliance: z.object({
    summary: z.string().describe('A summary of food logging compliance and diet balance.'),
  }),
  activityCompliance: z.object({
    summary: z.string().describe('A summary of physical activity compliance against targets.'),
  }),
  overallComplianceScore: z.number().describe('An overall compliance score from 0 to 100.'),
  doctorRecommendations: z.string().describe('Actionable recommendations for the doctor.'),
});
export type AnalyzePatientComplianceOutput = z.infer<typeof AnalyzePatientComplianceOutputSchema>;

// This is a mock function. In a real application, you would use Genkit tools
// to fetch data from Firestore for the given patientId and then perform the analysis.
// For this prototype, we'll return a hardcoded, realistic-looking analysis.
async function performMockAnalysis(input: AnalyzePatientComplianceInput): Promise<AnalyzePatientComplianceOutput> {
    console.log(`Analyzing compliance for patient: ${input.patientId}`);
    
    // Simulate a delay to make it feel like a real AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
        medicineAdherence: {
            percentage: 85,
            summary: "✅ Patient took 85% of prescribed medicines this week.\n⚠️ Missed evening dose on 2 days."
        },
        foodCompliance: {
            summary: "✅ Logged meals consistently. Diet appears balanced."
        },
        activityCompliance: {
            summary: "❌ Physical activity is below target (average 15 mins/day, recommended 30 mins)."
        },
        overallComplianceScore: 78,
        doctorRecommendations: "Discuss the importance of consistent evening medication. Explore barriers to physical activity and suggest manageable goals (e.g., two 15-min walks)."
    };
}


export async function analyzePatientCompliance(input: AnalyzePatientComplianceInput): Promise<AnalyzePatientComplianceOutput> {
  // In a real implementation, this would be a full Genkit flow with prompts and tools.
  // For the prototype, we are calling the mock analysis function directly.
  return analyzePatientComplianceFlow(input);
}


const analyzePatientComplianceFlow = ai.defineFlow(
  {
    name: 'analyzePatientComplianceFlow',
    inputSchema: AnalyzePatientComplianceInputSchema,
    outputSchema: AnalyzePatientComplianceOutputSchema,
  },
  async (input) => {
    // This is where you would normally call a Genkit prompt with tools to fetch and analyze data.
    // e.g., const { output } = await prompt({ patientId: input.patientId });
    // For this prototype, we call our mock function.
    const output = await performMockAnalysis(input);
    if (!output) {
        throw new Error('Analysis failed to produce an output.');
    }
    return output;
  }
);
