import type { Patient, Appointment } from './types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'John Doe',
    dob: '1985-05-20',
    gender: 'Male',
    contact: '+1234567890',
    avatar: 'https://i.pravatar.cc/150?u=john.doe',
    lastAppointment: '2024-05-10',
  },
  {
    id: '2',
    name: 'Jane Smith',
    dob: '1992-08-15',
    gender: 'Female',
    contact: '+1987654321',
    avatar: 'https://i.pravatar.cc/150?u=jane.smith',
    lastAppointment: '2024-05-12',
  },
  {
    id: '3',
    name: 'Peter Jones',
    dob: '1978-11-30',
    gender: 'Male',
    contact: '+1122334455',
    avatar: 'https://i.pravatar.cc/150?u=peter.jones',
    lastAppointment: '2024-04-28',
  },
  {
    id: '4',
    name: 'Mary Johnson',
    dob: '2001-02-18',
    gender: 'Female',
    contact: '+1555666777',
    avatar: 'https://i.pravatar.cc/150?u=mary.johnson',
    lastAppointment: '2024-05-15',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'John Doe',
    patientAvatar: 'https://i.pravatar.cc/150?u=john.doe',
    date: '2024-08-25',
    time: '10:00 AM',
    type: 'Video',
    status: 'Upcoming',
  },
  {
    id: '2',
    patientName: 'Jane Smith',
    patientAvatar: 'https://i.pravatar.cc/150?u=jane.smith',
    date: '2024-08-26',
    time: '02:30 PM',
    type: 'Voice',
    status: 'Upcoming',
  },
];
