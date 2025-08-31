
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

// This function now simulates fetching data and uses conditional logic.
export async function chatWithAssistant(
  input: ChatWithAssistantInput
): Promise<string> {
  // Simulate fetching patient data from a database like Firestore.
  // In a real app, you would replace this with a an async database query using the user's ID.
  const patientHealthProfile = {
    name: 'Jane Doe',
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    vitals: {
      heartRate: '72 bpm',
      bloodPressure: '130/85 mmHg',
    },
  };
  const patientDailySummary = {
    sleep: '7.5 hours',
    stressLevel: 'High',
    activity: '30-minute walk',
  };

  // --- Conditional Logic ---
  // If data is missing, return a pre-scripted response without calling the AI.
  if (!patientHealthProfile || !patientDailySummary) {
    return "I can't seem to access your health data right now. Please try logging your daily activities and check back later.";
  }

  // Handle common conversational queries with a hardcoded response.
  const lowerCasePrompt = input.prompt.toLowerCase();
  if (lowerCasePrompt.includes('how are you')) {
    return "I'm an AI assistant, ready to help you with your health questions. How can I assist you today?";
  }
  if (lowerCasePrompt.includes('what is your name')) {
    return "I'm AarogyaAI, your personal health assistant. I can provide insights based on your health data.";
  }

  // Define the AI's persona and instructions using the fetched data.
  const system_prompt = `You are AarogyaAI, an empathetic and supportive health assistant for a patient named ${
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

  **YOUR INSTRUCTIONS:**
  1.  **Analyze Data**: Base your answers *only* on the patient data provided above.
  2.  **Be Empathetic**: Use a supportive and encouraging tone.
  3.  **NEVER DIAGNOSE**: Do not provide medical diagnoses or prescribe treatments.
  4.  **Handle Medical Questions Safely**: If asked a direct medical question (e.g., "what should I do for a fever?"), provide general wellness tips (like "rest and stay hydrated") and **always** state that they must consult a real doctor for medical advice.
  5.  **Disclaimer**: You MUST end every single response with the line: "Disclaimer: I am an AI assistant and not a substitute for a real doctor. Please consult with a healthcare professional for any medical concerns."`;

  try {
    const result = await ai.generateText({
      model: 'googleai/gemini-2.5-flash', // Specify the model here
      messages: [
        { role: 'system', content: system_prompt },
        ...(input.history ?? []),
        { role: 'user', content: input.prompt },
      ],
    });

    const responseText = result.outputText; // Correctly access text from the outputText property
    if (!responseText) {
      console.error('AI returned an empty response.');
      return "I'm sorry, I seem to be having trouble generating a response. Please try again later.";
    }
    
    // Final check to ensure the disclaimer is present.
    const disclaimer = "Disclaimer: I am an AI assistant and not a substitute for a real doctor. Please consult with a healthcare professional for any medical concerns.";
    if (!responseText.includes(disclaimer)) {
        return `${responseText}\n\n${disclaimer}`;
    }

    return responseText;
    
  } catch (error) {
    console.error('AI generation failed:', error);
    return "I'm sorry, but I'm experiencing a technical issue and can't respond right now. Please try again later.";
  }
}
