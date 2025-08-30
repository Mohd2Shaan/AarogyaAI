
'use server';

/**
 * @fileOverview An AI-powered symptom checker.
 *
 * - checkSymptoms - A function that handles the symptom checking process.
 * - CheckSymptomsInput - The input type for the checkSymptoms function.
 * - CheckSymptomsOutput - The return type for the checkSymptoms function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const CheckSymptomsInputSchema = z.object({
  symptoms: z.string().describe('A description of the patient\'s symptoms.'),
});
export type CheckSymptomsInput = z.infer<typeof CheckSymptomsInputSchema>;

const CheckSymptomsOutputSchema = z.object({
  potentialConditions: z
    .string()
    .describe(
      'A list of potential, non-diagnostic conditions related to the symptoms, formatted as a bulleted list.'
    ),
  selfCareTips: z
    .string()
    .describe(
      'General self-care tips for the described symptoms, formatted as a bulleted list.'
    ),
});
export type CheckSymptomsOutput = z.infer<typeof CheckSymptomsOutputSchema>;

export async function checkSymptoms(
  input: CheckSymptomsInput
): Promise<CheckSymptomsOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: { schema: CheckSymptomsInputSchema },
  output: { schema: CheckSymptomsOutputSchema },
  prompt: `You are an AI health assistant. Your role is to provide general information based on user-described symptoms.

**CRITICAL INSTRUCTIONS:**
1.  **DO NOT PROVIDE A DIAGNOSIS.** You are not a doctor. Your response must be purely informational.
2.  Your response must be structured into two distinct parts: "Potential Conditions" and "General Self-Care Tips".
3.  Under "Potential Conditions", list possible causes related to the symptoms. This is for informational purposes only. Use phrases like "might be related to" or "could be associated with".
4.  Under "General Self-Care Tips", provide safe, general wellness advice that is not a prescription.
5.  You MUST NOT suggest any specific medications, treatments, or dosages.

Analyze the following symptoms:
"{{{symptoms}}}"

Provide the output in the requested format.`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: CheckSymptomsInputSchema,
    outputSchema: CheckSymptomsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
