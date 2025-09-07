
'use server';

import { z } from 'genkit';
import { ai } from '@/ai/genkit';
import type { MessageData } from 'genkit';

// Zod schema
const ChatWithAssistantInputSchema = z.object({
  prompt: z.string(),
  history: z.array(z.custom<MessageData>()).optional(),
});
export type ChatWithAssistantInput = z.infer<
  typeof ChatWithAssistantInputSchema
>;

// Main function
export async function chatWithAssistant(
  input: ChatWithAssistantInput
): Promise<string> {
  // Mock patient data
  const patientHealthProfile = {
    name: 'Jane Doe',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    vitals: { heartRate: '72 bpm', bloodPressure: '130/85 mmHg' },
  };
  const patientDailySummary = {
    sleep: '7.5 hours',
    stressLevel: 'High',
    activity: '30-minute walk',
  };

  if (!patientHealthProfile || !patientDailySummary) {
    return "I can't access your health data right now. Please try again later.";
  }

  // System prompt / persona
  const systemPrompt = `You are AarogyaAI, a friendly and supportive AI health companion for a patient named ${patientHealthProfile.name}. Your role is to give basic wellness advice in clear, simple language.

**PATIENT'S HEALTH DATA (for context only):**
- Conditions: ${patientHealthProfile.conditions.join(', ')}
- Vitals: Heart Rate ${patientHealthProfile.vitals.heartRate}, Blood Pressure ${patientHealthProfile.vitals.bloodPressure}
- Today's Log: Slept for ${patientDailySummary.sleep}, Stress level is ${patientDailySummary.stressLevel}, Activity was a ${patientDailySummary.activity}.

**YOUR INSTRUCTIONS:**
1.  **Be Friendly and Supportive:** Always greet the patient warmly. Use short, encouraging messages, like a coach or a friend.
2.  **Be Empathetic and Positive:** Acknowledge their feelings and maintain a positive tone.
3.  **Provide General Health Suggestions Only:** Stick to basic advice about diet, exercise, and medicine reminders.
4.  **NEVER DIAGNOSE:** Do not provide medical diagnoses, prescribe treatments, or give any advice that should come from a doctor.
5.  **Always Include a Disclaimer:** Every single response MUST end with the following sentence, exactly as written: 'This is general advice. Please follow your doctor’s guidance for medical decisions.'

Example Interaction:
Patient: 'I forgot my evening medicine.'
AI: 'No worries! It happens. Just try to stay consistent. Maybe setting a reminder on your phone could help 😊. This is general advice. Please follow your doctor’s guidance for medical decisions.'
`;

  const historyText = (input.history ?? [])
    .map((h) => {
      const role = (h as any).role ?? 'user';
      const content = (h as any).content ?? (h as any).text ?? '';
      return `${role.toUpperCase()}: ${content}`;
    })
    .join('\n');

  const combined = [
    systemPrompt,
    historyText ? `Conversation:\n${historyText}` : '',
    `User: ${input.prompt}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  try {
    const response = await ai.generate({
      prompt: [{ text: combined }],
    });

    let textRes: string | undefined = response.text;

    if (!textRes) {
      console.error('Empty response from ai.generate()', response);
      return "I'm sorry — I seem to be having trouble generating a response right now.";
    }

    // Ensure the disclaimer is always present
    const disclaimer = 'This is general advice. Please follow your doctor’s guidance for medical decisions.';
    if (!textRes.endsWith(disclaimer)) {
        textRes = textRes.trim() + ' ' + disclaimer;
    }

    return textRes;
  } catch (err: any) {
    console.error('Error in chatWithAssistant:', err);
    return "Something went wrong while generating a response.";
  }
}
