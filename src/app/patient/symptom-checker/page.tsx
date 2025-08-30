
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, BrainCircuit, HeartPulse, Loader2, Stethoscope } from 'lucide-react';
import { handleCheckSymptoms, type SymptomCheckState } from '@/app/actions';
import { useActionState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const initialState: SymptomCheckState = {
  success: false,
  result: null,
  error: null,
};

function SymptomCheckerForm({
  formAction,
  symptoms,
  setSymptoms,
}: {
  formAction: (payload: FormData) => void;
  symptoms: string;
  setSymptoms: (symptoms: string) => void;
}) {
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HeartPulse />
          Symptom Checker
        </CardTitle>
        <CardDescription>
          Describe your symptoms below. This tool provides general information
          and is not a substitute for professional medical advice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          name="symptoms"
          placeholder="e.g., fever, cough, body aches..."
          rows={5}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">
          <Stethoscope className="mr-2 h-4 w-4" /> Check Symptoms
        </Button>
      </CardFooter>
    </form>
  );
}

function ResultDisplay({ state, onReset }: { state: SymptomCheckState, onReset: () => void }) {
  if (!state.result) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
            <CardTitle className='flex items-center gap-2'><BrainCircuit /> Potential Conditions (Informational Only)</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{state.result.potentialConditions}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>General Self-Care Tips</CardTitle>
        </CardHeader>
         <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{state.result.selfCareTips}</p>
        </CardContent>
      </Card>

      <div className='text-center'>
        <Button onClick={onReset} variant="outline">Check Different Symptoms</Button>
      </div>
    </div>
  );
}

export default function SymptomCheckerPage() {
  const [state, formAction, isPending] = useActionState(handleCheckSymptoms, initialState);
  const [symptoms, setSymptoms] = useState('');

  const handleReset = () => {
    setSymptoms('');
    // This is a way to reset the action state, not officially supported but works
    (state as any).success = false; 
    (state as any).result = null;
    (state as any).error = null;
  }

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Symptom Checker</h1>
        <p className="text-muted-foreground mt-2">
          Get general information about your symptoms.
        </p>
      </div>

      <div className="min-h-[400px]">
        {isPending && (
          <Card className="flex flex-col items-center justify-center p-10 space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium">Analyzing your symptoms...</p>
              <p className="text-muted-foreground text-center">Please wait while our AI assistant processes your information. <br/>This should only take a moment.</p>
          </Card>
        )}

        {!isPending && !state.success && (
          <Card>
            <SymptomCheckerForm
              formAction={formAction}
              symptoms={symptoms}
              setSymptoms={setSymptoms}
            />
          </Card>
        )}

        {!isPending && state.success && state.result && (
          <ResultDisplay state={state} onReset={handleReset} />
        )}

        {!isPending && state.error && (
          <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Analysis Failed</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </div>

      <footer className="mt-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            This information is for general knowledge only and is not a substitute for professional medical advice. Please consult a doctor for diagnosis and treatment.
          </AlertDescription>
        </Alert>
      </footer>
    </div>
  );
}
