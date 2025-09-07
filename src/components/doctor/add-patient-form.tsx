
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CalendarIcon,
  FileUp,
  Loader2,
  UploadCloud,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { logAuditEvent } from '@/lib/audit';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Card, CardContent } from '../ui/card';
import { usePatientStore } from '@/lib/store';

const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters.'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  gender: z.enum(['Male', 'Female', 'Other']),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits.'),
  address: z.string().min(5, 'Address is too short.'),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
});

export function AddPatientForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState('');
  const router = useRouter();
  const { addPatient } = usePatientStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      gender: 'Male',
      email: '',
      phone: '',
      address: '',
      medicalHistory: '',
      allergies: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const newPatient = {
      id: `p${Date.now()}`,
      name: `${values.firstName} ${values.lastName}`,
      dob: format(values.dob, 'yyyy-MM-dd'),
      gender: values.gender,
      contact: values.phone,
      avatar: `https://i.pravatar.cc/150?u=${values.email}`,
      lastAppointment: 'N/A',
    };
    
    addPatient(newPatient);
    
    logAuditEvent('PATIENT_CREATE', 'doctor', { patientName: newPatient.name });
    
    toast({
      title: 'Patient Added Successfully!',
      description: `${newPatient.name} has been added to your records.`,
      variant: 'default',
      className: 'bg-accent text-accent-foreground',
    });

    // Navigate to the new patient's profile page
    router.push(`/doctor/patients/${newPatient.id}`);

    form.reset();
    setReportFile(null);
    setExtractedInfo('');
    setIsSubmitting(false);
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setReportFile(file);
      setIsExtracting(true);
      logAuditEvent('REPORT_UPLOAD', 'doctor', { fileName: file.name, fileSize: file.size });
      // Simulate information extraction
      setTimeout(() => {
        setExtractedInfo(
          'Mock Extracted Info:\n- Blood Type: O+\n- Last Check-up: 2023-11-20\n- Primary Physician: Dr. Evelyn Reed'
        );
        setIsExtracting(false);
      }, 2000);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Accordion type="multiple" defaultValue={['item-1', 'item-2', 'item-3']} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className='text-xl font-semibold'>Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-4 p-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'PPP')
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                               <span className="sr-only">Open date picker</span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className='text-xl font-semibold'>Contact Information</AccordionTrigger>
            <AccordionContent className="space-y-4 p-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="patient@email.com" {...field} type="email"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="123 Health St, Wellness City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className='text-xl font-semibold'>Medical History & Reports</AccordionTrigger>
            <AccordionContent className="space-y-6 p-1">
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Past Medical History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Hypertension, diagnosed in 2015..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Known Allergies</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Penicillin, Peanuts" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Upload Medical Report</FormLabel>
                <FormControl>
                  <Card className="p-4">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
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
                      <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                      <Input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </div>
                  </Card>
                </FormControl>
                {reportFile && (
                  <Card className="mt-4">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileUp className="h-5 w-5 text-primary" />
                          <span className="text-sm font-medium">{reportFile.name}</span>
                        </div>
                        {isExtracting ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm">Extracting...</span>
                          </div>
                        ) : (
                          <span className="text-sm text-green-600">Extracted</span>
                        )}
                      </div>
                      {extractedInfo && (
                        <div className="mt-4 p-3 bg-secondary rounded-md">
                          <p className="text-sm font-semibold mb-2">Extracted Information (Mock):</p>
                          <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-body">{extractedInfo}</pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </FormItem>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Saving...' : 'Add Patient & View Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
