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
  type: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Pending' | 'Confirmed';
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

export interface ChatMessage {
  id: string;
  text: string;
  senderId: 'doctor' | 'patient' | 'ai';
  timestamp: Date;
  readStatus?: boolean;
}

export interface Conversation {
  id: string;
  participant: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTimestamp: Date;
  unreadCount: number;
}

export interface ConnectionRequest {
    id: string;
    patient: {
        name: string;
        avatar: string;
    };
    requestDate: Date;
    status: 'pending' | 'accepted' | 'declined';
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  status: 'Available' | 'Busy' | 'Offline';
}
