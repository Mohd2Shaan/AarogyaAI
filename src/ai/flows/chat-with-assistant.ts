'use server';

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import type { MessageData } from 'genkit';

// Initialize Genkit with Google plugin + default model
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'), // default model set here
});

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
  const systemPrompt = `You are AarogyaAI, an empathetic and supportive health assistant for a patient named ${
    patientHealthProfile.name
  }.

**PATIENT'S HEALTH DATA:**
- Conditions: ${patientHealthProfile.conditions.join(', ')}
- Vitals: Heart Rate ${patientHealthProfile.vitals.heartRate}, Blood Pressure ${
    patientHealthProfile.vitals.bloodPressure
  }
- Today's Log: Slept for ${patientDailySummary.sleep}, Stress level is ${
    patientDailySummary.stressLevel
  }, Activity was a ${patientDailySummary.activity}.

YOUR INSTRUCTIONS:
1. Use only the patient data above to inform responses.
2. Be empathetic and supportive.
3. NEVER DIAGNOSE or prescribe treatment.
4. For medical questions, give general wellness tips and always recommend consulting a licensed clinician.
5. End every response with: "Disclaimer: I am an AI assistant and not a substitute for a real doctor. Please consult with a healthcare professional for any medical concerns."`;

  // Combine system prompt, history, and user input into a single text part
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

  // Debug: log combined prompt being sent to Gemini
  console.log('Combined prompt being sent to Gemini:\n', combined);

  try {
    // Generate response using the parts-array format (v1.18.0 compatible)
    const partsResponse: any = await ai.generate([{ text: combined }]);

    // Debug: log the raw AI response
    console.log('AI response:', partsResponse);

    let textRes: string | undefined;
    if (Array.isArray(partsResponse)) {
      textRes = partsResponse[0]?.text;
    } else if (partsResponse && typeof partsResponse.text === 'string') {
      textRes = partsResponse.text;
    }

    if (!textRes) {
      console.error('Empty response from ai.generate()', partsResponse);
      return "I'm sorry — I seem to be having trouble generating a response right now.";
    }

    return textRes;
  } catch (err: any) {
    console.error('Error in chatWithAssistant:', err);
    return "Something went wrong while generating a response.";
  }
}
