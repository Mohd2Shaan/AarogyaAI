export interface Patient {
  id: string;
  name: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  avatar: string;
  lastAppointment: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  date: string;
  time: string;
  type: 'Video' | 'Voice' | 'In-Person';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface ActivityLog {
  id: string;
  date: Date;
  medication: string;
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  activities: string;
}
