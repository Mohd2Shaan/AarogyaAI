
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, BrainCircuit, CheckCircle2, Loader2, Target, Users } from 'lucide-react';
import { handleAnalyzeCompliance } from '@/app/actions';
import type { AnalyzePatientComplianceOutput } from '@/ai/flows/analyze-patient-compliance';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Progress } from '../ui/progress';

interface AiComplianceAssistantProps {
  patientId: string;
}

function ComplianceScoreIndicator({ score }: { score: number }) {
  return (
    <div className="relative h-32 w-32">
      <svg className="h-full w-full" viewBox="0 0 36 36">
        <path
          className="text-muted/50"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="text-primary"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={`${score}, 100`}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-primary">{score}</span>
        <span className="text-sm text-muted-foreground">Score</span>
      </div>
    </div>
  );
}

export function AiComplianceAssistant({ patientId }: AiComplianceAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalyzePatientComplianceOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    const result = await handleAnalyzeCompliance(patientId);
    if (result.success) {
      setAnalysis(result.result);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit /> AI Compliance Assistant
        </CardTitle>
        <CardDescription>
          Get an AI-powered summary of the patient's adherence to their treatment plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="font-medium">Analyzing Patient Data...</p>
            <p className="text-sm text-muted-foreground text-center">
              Our AI is checking medication logs, diet, and activity reports.
            </p>
          </div>
        ) : analysis ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center justify-center md:col-span-1">
              <ComplianceScoreIndicator score={analysis.overallComplianceScore} />
              <p className="text-center text-muted-foreground mt-2 text-sm">Overall Compliance</p>
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Medication Adherence</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.medicineAdherence.summary}</p>
                <Progress value={analysis.medicineAdherence.percentage} className="h-2" />
              </div>
               <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2"><Users className="text-blue-500" /> Food Compliance</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.foodCompliance.summary}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2"><Target className="text-orange-500" /> Activity Compliance</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.activityCompliance.summary}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">Click the button to generate a compliance report.</p>
          </div>
        )}
        
        {error && (
            <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        {analysis && (
             <Card className="w-full bg-secondary/50">
                <CardHeader>
                    <CardTitle className="text-lg">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.doctorRecommendations}</p>
                </CardContent>
            </Card>
        )}
         <Button onClick={handleAnalysis} disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? 'Analyzing...' : analysis ? 'Re-analyze Compliance' : 'Analyze Patient Compliance'}
        </Button>
      </CardFooter>
    </Card>
  );
}
