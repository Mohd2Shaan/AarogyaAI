import type { Patient, Appointment, Conversation, ChatMessage, ConnectionRequest } from './types';

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
    patientName: 'Sarah Johnson',
    patientAvatar: 'https://i.pravatar.cc/150?u=sarah.johnson',
    date: '2024-08-25',
    time: '9:00 AM',
    type: 'Routine checkup',
    status: 'Confirmed',
  },
  {
    id: '2',
    patientName: 'Michael Chen',
    patientAvatar: 'https://i.pravatar.cc/150?u=michael.chen',
    date: '2024-08-25',
    time: '10:30 AM',
    type: 'Follow-up consultation',
    status: 'Pending',
  },
  {
    id: '3',
    patientName: 'Emily Davis',
    patientAvatar: 'https://i.pravatar.cc/150?u=emily.davis',
    date: '2024-08-25',
    time: '2:00 PM',
    type: 'Blood pressure monitoring',
    status: 'Completed',
  },
  {
    id: '4',
    patientName: 'Robert Wilson',
    patientAvatar: 'https://i.pravatar.cc/150?u=robert.wilson',
    date: '2024-08-25',
    time: '3:30 PM',
    type: 'Diabetes management',
    status: 'Confirmed',
  },
];


export const mockConversations: Conversation[] = [
    {
        id: '1',
        participant: { name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=john.doe' },
        lastMessage: 'I will. Thank you, Doctor!',
        lastMessageTimestamp: new Date(new Date().getTime() - 5 * 60000), // 5 minutes ago
        unreadCount: 0,
    },
    {
        id: '2',
        participant: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=jane.smith' },
        lastMessage: 'Yes, I\'ve been taking the new medication as prescribed.',
        lastMessageTimestamp: new Date(new Date().getTime() - 2 * 60 * 60000), // 2 hours ago
        unreadCount: 2,
    },
     {
        id: '3',
        participant: { name: 'Peter Jones', avatar: 'https://i.pravatar.cc/150?u=peter.jones' },
        lastMessage: 'The test results are attached.',
        lastMessageTimestamp: new Date(new Date().getTime() - 24 * 60 * 60000), // 1 day ago
        unreadCount: 0,
    },
];

export const mockMessages: { [key: string]: ChatMessage[] } = {
  '1': [
    { id: 'msg1', text: 'Good morning, John. How are you feeling today?', senderId: 'doctor', timestamp: new Date(new Date().getTime() - 10 * 60000) },
    { id: 'msg2', text: 'I\'m feeling much better, thanks for asking.', senderId: 'patient', timestamp: new Date(new Date().getTime() - 8 * 60000) },
    { id: 'msg3', text: 'That\'s great to hear. Remember to keep up with your exercises.', senderId: 'doctor', timestamp: new Date(new Date().getTime() - 6 * 60000) },
    { id: 'msg4', text: 'I will. Thank you, Doctor!', senderId: 'patient', timestamp: new Date(new Date().getTime() - 5 * 60000) },
  ],
  '2': [
    { id: 'msg5', text: 'Hi Jane, checking in on your progress.', senderId: 'doctor', timestamp: new Date(new Date().getTime() - 2 * 60 * 60000 - 60000) },
    { id: 'msg6', text: 'Yes, I\'ve been taking the new medication as prescribed.', senderId: 'patient', timestamp: new Date(new Date().getTime() - 2 * 60 * 60000) },
  ],
   '3': [
    { id: 'msg7', text: 'Hi Peter, please upload your latest test results when you can.', senderId: 'doctor', timestamp: new Date(new Date().getTime() - 25 * 60 * 60000) },
    { id: 'msg8', text: 'The test results are attached.', senderId: 'patient', timestamp: new Date(new Date().getTime() - 24 * 60 * 60000) },
  ],
};

export const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: 'req1',
    patient: {
      name: 'Carlos Rodriguez',
      avatar: 'https://i.pravatar.cc/150?u=carlos.rodriguez',
    },
    requestDate: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    status: 'pending',
  },
  {
    id: 'req2',
    patient: {
      name: 'Aisha Khan',
      avatar: 'https://i.pravatar.cc/150?u=aisha.khan',
    },
    requestDate: new Date(new Date().setDate(new Date().getDate() - 2)), // 2 days ago
    status: 'pending',
  },
    {
    id: 'req3',
    patient: {
      name: 'Bennet Wilson',
      avatar: 'https://i.pravatar.cc/150?u=bennet.wilson',
    },
    requestDate: new Date(new Date().setDate(new Date().getDate() - 3)),
    status: 'accepted',
  },
];
