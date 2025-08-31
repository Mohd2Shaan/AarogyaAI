
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

// Temporarily simplified flow for debugging the core AI connection.
export async function chatWithAssistant(input: ChatWithAssistantInput): Promise<string> {
    console.log("Running simplified test flow...");
    try {
        const { output } = await ai.generate({
            prompt: `What is 1+1? Your answer should only be the number itself.`,
        });
        const responseText = output?.text;
        
        if (!responseText) {
          console.error("AI returned an empty response.");
          return "Test failed: AI returned an empty response.";
        }

        console.log("Simplified test flow succeeded. Response:", responseText);
        return `Test successful! The AI says 1+1 is: ${responseText}. This confirms the API connection is working. Now restoring the original chat logic.`;
    } catch (error) {
        console.error("Simplified test flow FAILED:", error);
        return "Test failed. The core AI connection is not working. Please check the API key and Genkit configuration. See the server logs for detailed errors.";
    }
}
