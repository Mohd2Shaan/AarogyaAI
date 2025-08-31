
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
  
  // In a real application, this data would be fetched from a database (e.g., Firestore)
  // based on the authenticated user's ID.
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

  // Conditional Logic: Check if data exists.
  // In a real app, you would check if the query to Firestore returned any documents.
  if (!patientHealthProfile || !patientDailySummary) {
    return "I can't seem to access your health data right now. Please make sure you have logged your daily activities and that your health profile is up to date.";
  }


  const system_prompt = `You are AarogyaAI, a friendly, empathetic, and informative health and wellness assistant for a patient named ${patientHealthProfile.name}.
Your primary role is to answer questions about their health using ONLY the specific data provided to you.

**Patient's Health Profile:**
- Conditions: ${patientHealthProfile.conditions.join(', ')}
- Recent Vitals: ${patientHealthProfile.recent_vitals}

**Patient's Logged Data for Today:**
- Sleep: ${patientDailySummary.sleep}
- Medication: ${patientDailySummary.medication}
- Meals: ${patientDailySummary.meals}
- Activities: ${patientDailySummary.activities}

**CRITICAL SAFETY INSTRUCTIONS:**
1.  **NEVER Diagnose or Prescribe:** You are strictly forbidden from providing medical diagnoses, treatment plans, or prescribing medication.
2.  **USE ONLY Provided Data:** Base your answers strictly on the health profile and daily summary provided above. Do not invent or infer any other medical information.
3.  **HANDLE MEDICAL QUESTIONS GRACEFULLY:** If a user asks about specific symptoms (e.g., "I have a fever," "my stomach hurts"), you MUST follow this sequence:
    a. Acknowledge their concern with empathy (e.g., "I'm sorry to hear you're feeling unwell.").
    b. Provide only safe, general, non-prescriptive wellness information (e.g., "For general wellness when feeling feverish, rest and hydration are often suggested.").
    c. Immediately and clearly guide them to a professional. Say: "For a proper diagnosis and medical advice, it is very important to speak with a doctor."
4.  **DISCLAIMER:** Every single response MUST end with the following disclaimer on a new line: "Disclaimer: I am an AI assistant and not a medical professional. Please consult a qualified healthcare provider for any health concerns."

Keep your tone positive and encouraging. Use simple, easy-to-understand language.`;

  try {
    const { output } = await ai.generate({
      prompt: input.prompt,
      history: input.history,
      system: system_prompt,
    });

    const responseText = output?.text;
    if (!responseText) {
      // This can happen if the model returns no text, e.g., due to safety filters.
      throw new Error('The AI model returned an empty response.');
    }

    // Ensure the disclaimer is present as a final safety check.
    if (!responseText.includes("Disclaimer: I am an AI assistant")) {
      return `${responseText.trim()}\n\nDisclaimer: I am an AI assistant and not a medical professional. Please consult a qualified healthcare provider for any health concerns.`;
    }
    
    return responseText;
  } catch (error) {
    // Log the detailed error for debugging purposes.
    console.error('AI generation failed:', error);
    
    // Return a safe, user-friendly message.
    return "I'm sorry, but I'm experiencing a technical issue at the moment. Please try again in a little while.";
  }
}
