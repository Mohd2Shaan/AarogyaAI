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
    system: `You are a helpful AI assistant for a healthcare app named AarogyaAI.
    Your role is to provide general health information to patients.
    You must provide a clear and prominent disclaimer at the beginning of EVERY conversation that you are not a medical professional and your advice should not be considered a substitute for professional medical advice.
    You MUST NOT provide personalized medical diagnoses, treatment plans, or prescribe medication.
    If asked for a diagnosis, you must politely decline and advise the user to consult with their doctor.
    Keep your responses concise and easy to understand.
    `,
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

  return output.text;
}
