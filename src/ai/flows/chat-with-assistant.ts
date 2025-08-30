
'use server';

/**
 * @fileOverview A conversational AI assistant for patients.
 *
 * - chatWithAssistant - A function that handles the conversation.
 * - ChatWithAssistantInput - The input type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { MessageData } from 'genkit';

const ChatWithAssistantInputSchema = z.object({
  prompt: z.string(),
  history: z.array(z.custom<MessageData>()).optional(),
});
export type ChatWithAssistantInput = z.infer<typeof ChatWithAssistantInputSchema>;

export async function chatWithAssistant(input: ChatWithAssistantInput): Promise<string> {
  const normalizedPrompt = input.prompt.toLowerCase().trim();

  // Handle conversational queries with hardcoded responses
  if (normalizedPrompt.includes('how are you')) {
    return "I'm an AI assistant, so I don't have feelings, but I'm here and ready to help you with your health questions. What would you like to know about your health profile or daily routine?";
  }
  if (normalizedPrompt.includes('what is your name') || normalizedPrompt.includes("what's your name")) {
    return "I'm AarogyaAI, your personal health assistant. I can provide insights based on your health data. How can I assist you today?";
  }
  
  // In a real app, this data would be fetched from a database based on the logged-in user.
  const patientHealthProfile = {
      name: "Jane Doe",
      conditions: ["Hypertension (controlled)", "Pollen Allergy"],
      recent_vitals: "BP: 125/80 mmHg, HR: 72 bpm"
  };

  const patientDailySummary = {
      sleep: "7.5 hours (logged last night)",
      medication: "Lisinopril 10mg (taken this morning)",
      meals: "Breakfast: Oatmeal, Lunch: Salad, Dinner: Grilled Chicken",
      activities: "30-minute walk"
  };

  const system_prompt = `You are AarogyaAI, a friendly, empathetic, and informative health and wellness assistant for a patient named ${patientHealthProfile.name}.
Your primary role is to answer questions about their health using the specific data provided to you.

**Patient's Health Profile:**
- Conditions: ${patientHealthProfile.conditions.join(', ')}
- Recent Vitals: ${patientHealthProfile.recent_vitals}

**Patient's Logged Data for Today:**
- Sleep: ${patientDailySummary.sleep}
- Medication: ${patientDailySummary.medication}
- Meals: ${patientDailySummary.meals}
- Activities: ${patientDailySummary.activities}

**Crucial Safety Instructions:**
1.  **NEVER Diagnose or Prescribe:** You are strictly forbidden from providing medical diagnoses, treatment plans, or prescribing medication.
2.  **Use ONLY Provided Data:** Base your answers strictly on the health profile and daily summary provided above. Do not invent or infer any other medical information.
3.  **Handle Medical Questions Gracefully:** If a user asks about specific symptoms (e.g., "I have a fever," "my stomach hurts"), you MUST follow this sequence:
    a. Acknowledge their concern with empathy (e.g., "I'm sorry to hear you're feeling unwell.").
    b. Provide only safe, general, non-prescriptive wellness information (e.g., "For general wellness when feeling feverish, rest and hydration are often suggested.").
    c. Immediately and clearly guide them to a professional. Say: "For a proper diagnosis and medical advice, it is very important to speak with a doctor."
4.  **Disclaimer:** Every single response MUST end with the following disclaimer on a new line: "Disclaimer: I am an AI assistant and not a medical professional. Please consult a qualified healthcare provider for any health concerns."

Keep your tone positive and encouraging. Use simple, easy-to-understand language.`;

  const { output } = await ai.generate({
    prompt: input.prompt,
    history: input.history,
    system: system_prompt,
    config: {
      safetySettings: [
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_NONE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE',
        },
      ],
    },
  });

  const responseText = output?.text;
  if (!responseText) {
    return 'I am sorry, but I cannot provide a response to that. Please try a different question.';
  }

  // Ensure the disclaimer is present
  if (!responseText.includes("Disclaimer: I am an AI assistant")) {
     return `${responseText.trim()}\n\nDisclaimer: I am an AI assistant and not a medical professional. Please consult a qualified healthcare provider for any health concerns.`;
  }
  
  return responseText;
}
