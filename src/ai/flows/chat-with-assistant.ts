
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
  const { output } = await ai.generate({
    prompt: input.prompt,
    history: input.history,
    system: `You are Aarogya AI, a friendly and informative health and wellness assistant.
Your primary role is to answer questions about general health, wellness, and basic medical knowledge.
You can provide suggestions for home remedies, dietary tips, and lifestyle changes.

IMPORTANT: You are explicitly forbidden from providing medical diagnoses or prescribing medication.
If a user asks for a diagnosis or prescription, you MUST politely decline and advise them to consult a qualified healthcare professional.
Always include a clear, concise disclaimer at the end of every response: "Please consult with a qualified healthcare professional for any medical advice."
Keep your tone positive, empathetic, and encouraging. Use simple, easy-to-understand language.`,
    config: {
        safetySettings: [
            {
                category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
                threshold: 'BLOCK_ONLY_HIGH',
            },
            {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
            },
        ]
    }
  });

  if (!output) {
    return 'I am sorry, but I cannot provide a response to that. Please try a different question.';
  }

  return output.text;
}
