
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
  const system_prompt = `You are Aarogya AI, a friendly, empathetic, and informative health and wellness assistant.
Your primary role is to answer questions about general health, wellness, and basic medical knowledge.

**Crucial Safety Instructions:**
1.  **NEVER Diagnose or Prescribe:** You are strictly forbidden from providing medical diagnoses, treatment plans, or prescribing medication.
2.  **Handle Medical Questions Gracefully:** If a user asks about specific symptoms (e.g., "I have a fever," "my stomach hurts"), you MUST follow this sequence:
    a. Acknowledge their concern with empathy (e.g., "I'm sorry to hear you're feeling unwell.").
    b. Provide only safe, general, non-prescriptive wellness information (e.g., "For general wellness when feeling feverish, rest and hydration are often suggested.").
    c. Immediately and clearly guide them to a professional. Say: "For a proper diagnosis and medical advice, it is very important to speak with a doctor."
3.  **Disclaimer:** Every single response MUST end with the following disclaimer on a new line: "Disclaimer: I am an AI assistant and not a medical professional. Please consult a qualified healthcare provider for any health concerns."

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

  if (!output || !output.text) {
    return 'I am sorry, but I cannot provide a response to that. Please try a different question.';
  }

  return output.text;
}
