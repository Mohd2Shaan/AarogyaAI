# AarogyaAI

## Project Description

AarogyaAI is an AI-powered health assistant application designed to securely manage health records, facilitate communication between patients and doctors, and provide personalized, AI-driven insights for a holistic wellness journey. It offers dual interfaces tailored for both patients and healthcare professionals.

## Core Features:

*   **Dual User Modes:** Distinct dashboards and user interfaces for Doctors and Patients, accessible upon successful login.
*   **AI-Powered Assistant (Medical Report Analysis):** A robust tool that utilizes OCR and Large Language Models (LLMs) to analyze medical reports (supporting PDF, JPG, PNG formats). It provides concise summaries, highlights potential health issues, and suggests appropriate next steps.
*   **Patient Activity Tracking:** Patients can log daily medications, meals, and activities. The system then generates comprehensive reports that doctors can utilize during appointments to monitor progress and adjust care plans.
*   **Real-time Interaction (Simulated):** Features simulated flows for video and voice calls, enabling seamless communication between doctors and patients. This functionality uses mock data for demonstration purposes.
*   **Add Patient Flow:** A streamlined dashboard experience for doctors to add new patients. This includes collapsible sections, required fields, and the ability to mock extraction of information from uploaded reports.
*   **Invite Doctor Flow:** A feature allowing doctors to invite colleagues, which generates a mock invite email along with a temporary account stub for easy onboarding.
*   **Audit Logging:** A comprehensive audit trail is maintained for critical actions such as patient creation, report uploads, appointment modifications, and connection requests, ensuring transparency and accountability.

## Technology Stack

This project is built primarily with:

*   **TypeScript:** For robust and scalable application development.
*   **Next.js:** A React framework for building fast web applications.
*   **Genkit:** An open-source framework for building AI-powered applications, integrated with Google AI models.

Key libraries and modules used include:
*   `@genkit-ai/googleai`: For interacting with Google's Gemini models.
*   `pdf-parse`: For parsing and extracting text from PDF documents.
*   `fs`: Node.js file system module for file operations.
*   `node:readline/promises`: For command-line interface interactions.

## Setup and Installation

To get this project up and running locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-link]
    cd AarogyaAI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of your project and add your Google API Key and GCP Project ID. These are crucial for Genkit to connect to Google AI services.

    ```
    GOOGLE_API_KEY="YOUR_ACTUAL_GOOGLE_API_KEY"
    GCP_PROJECT="YOUR_ACTUAL_GCP_PROJECT_ID"
    ```
    Replace `YOUR_ACTUAL_GOOGLE_API_KEY` and `YOUR_ACTUAL_GCP_PROJECT_ID` with your actual credentials.

4.  **Run the Development Servers:**
    You need to run two separate development servers concurrently:

    *   **Next.js Application:** In your first terminal:
        ```bash
        npm run dev
        ```

    *   **Genkit Backend:** In a **separate** terminal window, ensure your environment variables are sourced (or configured in `.env` and picked up by Genkit) and then start the Genkit server:
        ```bash
        npm run genkit:dev
        ```
    Keep both terminals running for the application to function correctly.

## Usage

*   Navigate to `http://localhost:3000` (or the port specified by `npm run dev`) in your web browser.
*   Log in as either a Doctor or a Patient to access the respective dashboards.
*   Interact with the AI Health Assistant, track patient activities, manage appointments, and explore other features.

## Mock Data

The application utilizes mock data for demonstrations, including patient health profiles and doctor specialties, as seen in `src/lib/mock-data.ts`.

## Disclaimer

**Important:** The AI Health Assistant provides general information only and is not a substitute for professional medical advice. Always consult with a healthcare professional for any medical concerns or before making any decisions related to your health.



make read me file using this and app 
