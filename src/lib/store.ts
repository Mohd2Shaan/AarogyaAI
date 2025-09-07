
'use client';

import { create } from 'zustand';
import { mockPatients } from './mock-data';
import type { Patient } from './types';

interface PatientState {
  patients: Patient[];
  addPatient: (patient: Patient) => void;
  getPatientById: (id: string) => Patient | undefined;
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: mockPatients,
  addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
  getPatientById: (id) => get().patients.find((p) => p.id === id),
}));
