
'use client';

import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useState, useActionState } from 'react';
import {
  FileText,
  Lightbulb,
  ListOrdered,
  Loader2,
  Share2,
  UploadCloud,
  X,
} from 'lucide-react';

import { handleAnalyzeReport, getAnalysisResult } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '../ui/skeleton';
import type { AnalyzeMedicalReportOutput } from '@/ai/flows/analyze-medical-report';

const initialState = {
  success: false,
  message: '',
  analysisId: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Starting Analysis...
        </>
      ) : (
        'Analyze Report'
      )}
    </Button>
  );
}

function AnalysisResultSkeleton() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                    <FileText className="mr-2 h-5 w-5 text-primary" /> Summary
                </h3>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                    <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Potential Issues
                </h3>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
            <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                    <ListOrdered className="mr-2 h-5 w-5 text-primary" /> Next Steps
                </h3>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
        </div>
    );
}


export function AnalyzeReportClient() {
  const [state, formAction] = useActionState(handleAnalyzeReport, initialState);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeMedicalReportOutput | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dataUri, setDataUri] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout>();


  useEffect(() => {
    if (state.success && state.analysisId) {
      setIsPolling(true);
      setAnalysisResult(null); // Clear previous results
      handleRemoveFile(); // Clear file input
      
      pollIntervalRef.current = setInterval(async () => {
        try {
          const result = await getAnalysisResult(state.analysisId!);
          if (result) {
            setAnalysisResult(result);
            setIsPolling(false);
            clearInterval(pollIntervalRef.current);
          }
        } catch (error) {
          console.error("Polling failed:", error);
          setIsPolling(false);
          clearInterval(pollIntervalRef.current);
        }
      }, 2000); // Poll every 2 seconds
    }

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [state.success, state.analysisId]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }

      const readerForDataUri = new FileReader();
      readerForDataUri.onload = (event) => setDataUri(event.target?.result as string);
      readerForDataUri.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setDataUri('');
    if (formRef.current) {
      formRef.current.reset();
    }
  };


  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Upload Report</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <form action={formAction} ref={formRef} className="flex-grow flex flex-col">
            <input type="hidden" name="reportDataUri" value={dataUri} />
            <input type="hidden" name="reportName" value={file?.name || ''} />
            <div className="flex-grow flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg mb-4">
              <UploadCloud className="w-12 h-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                <label
                  htmlFor="file-upload"
                  className="font-medium text-primary cursor-pointer hover:underline"
                >
                  Click to upload
                </label>{' '}
                or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, PNG, JPG up to 10MB
              </p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
                disabled={isPolling}
              />
            </div>

            {file && (
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {preview ? (
                        <img
                          src={preview}
                          alt="File preview"
                          className="h-10 w-10 object-cover rounded-md"
                        />
                      ) : (
                        <FileText className="h-10 w-10 text-primary" />
                      )}
                      <div className="truncate">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveFile}
                      disabled={isPolling}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <SubmitButton />

             {state.success && state.message && !isPolling && !analysisResult && (
                <Alert className="mt-4 bg-accent/50 border-accent">
                    <AlertTitle>Analysis Started</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}

            {!state.success && state.message && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Analysis Failed</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Analysis Results</CardTitle>
          {analysisResult && (
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" /> Export
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {isPolling && <AnalysisResultSkeleton />}

          {!isPolling && !analysisResult && (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <FileText className="h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">
                Results will appear here
              </p>
              <p className="text-muted-foreground">
                Upload a report to begin the analysis.
              </p>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" /> Summary
                </h3>
                <p className="text-sm text-muted-foreground bg-secondary p-4 rounded-md whitespace-pre-wrap">
                  {analysisResult.summary}
                </p>
              </div>
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <Lightbulb className="mr-2 h-5 w-5 text-primary" /> Potential
                  Issues
                </h3>
                <p className="text-sm text-muted-foreground bg-secondary p-4 rounded-md whitespace-pre-wrap">
                  {analysisResult.potentialIssues}
                </p>
              </div>
              <div>
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  <ListOrdered className="mr-2 h-5 w-5 text-primary" /> Next
                  Steps
                </h3>
                <p className="text-sm text-muted-foreground bg-secondary p-4 rounded-md whitespace-pre-wrap">
                  {analysisResult.nextSteps}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
