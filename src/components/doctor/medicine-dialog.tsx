
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import type { Medicine } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface MedicineDialogProps {
  medicine?: Medicine;
  onSave: (medicine: Medicine) => void;
  children: React.ReactNode;
}

const initialMedicineState: Omit<Medicine, 'id' | 'status'> = {
    medicineName: '',
    dosage: '',
    timing: 'Morning',
    relationToMeal: 'Anytime',
};

export function MedicineDialog({ medicine, onSave, children }: MedicineDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialMedicineState);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (medicine) {
      setFormData({
        medicineName: medicine.medicineName,
        dosage: medicine.dosage,
        timing: medicine.timing,
        relationToMeal: medicine.relationToMeal,
      });
    } else {
      setFormData(initialMedicineState);
    }
  }, [medicine]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: keyof typeof initialMedicineState) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSave = () => {
    if (!formData.medicineName || !formData.dosage) {
        toast({ title: "Validation Error", description: "Please fill out all fields.", variant: "destructive"});
        return;
    }
    
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      const savedMedicine: Medicine = {
        id: medicine?.id || `med_${Date.now()}`,
        status: medicine?.status || false,
        ...formData
      };
      
      onSave(savedMedicine);
      toast({
        title: 'Schedule Updated',
        description: `${formData.medicineName} has been saved.`,
        className: 'bg-accent text-accent-foreground',
      });
      setIsSaving(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{medicine ? 'Edit Medication' : 'Add Medication'}</DialogTitle>
          <DialogDescription>
            {medicine ? 'Update the details for this medication.' : 'Add a new medication to the schedule.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="medicineName" className="text-right">
              Name
            </Label>
            <Input
              id="medicineName"
              value={formData.medicineName}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="e.g., Metformin"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dosage" className="text-right">
              Dosage
            </Label>
            <Input
              id="dosage"
              value={formData.dosage}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="e.g., 1 tablet (500mg)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timing" className="text-right">
              Timing
            </Label>
             <Select value={formData.timing} onValueChange={handleSelectChange('timing')}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select timing" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Afternoon">Afternoon</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                </SelectContent>
            </Select>
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="relationToMeal" className="text-right">
              Meal Relation
            </Label>
             <Select value={formData.relationToMeal} onValueChange={handleSelectChange('relationToMeal')}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select meal relation" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Anytime">Anytime</SelectItem>
                    <SelectItem value="Before Breakfast">Before Breakfast</SelectItem>
                    <SelectItem value="After Breakfast">After Breakfast</SelectItem>
                    <SelectItem value="Before Lunch">Before Lunch</SelectItem>
                    <SelectItem value="After Lunch">After Lunch</SelectItem>
                    <SelectItem value="Before Dinner">Before Dinner</SelectItem>
                    <SelectItem value="After Dinner">After Dinner</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
