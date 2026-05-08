export type TaskStatus = "todo" | "claimed" | "done" | "blocked";

export interface CareRecipient {
  id: string;
  fullName: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContacts?: string;
  preferredHospital?: string;
  primaryDoctor?: string;
  allergies?: string;
  mobilityNotes?: string;
  communicationNotes?: string;
  emergencySummary?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareNote {
  id: string;
  careRecipientId: string;
  noteDate: string;
  mood: string;
  meals: string;
  sleep: string;
  mobility: string;
  painOrDiscomfort: string;
  medicationIssue: string;
  safetyConcern: string;
  generalNote: string;
  createdAt: string;
}

export interface Medication {
  id: string;
  careRecipientId: string;
  name: string;
  doseText: string;
  scheduleText: string;
  prescriber: string;
  purpose?: string;
  notes?: string;
  active: boolean;
  lastVerifiedAt: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  careRecipientId: string;
  title: string;
  providerName: string;
  location: string;
  startsAt: string;
  transportationPlan: string;
  questionsToAsk: string;
  afterVisitNotes: string;
  followUpNeeded: string;
  createdAt: string;
}

export interface CareTask {
  id: string;
  careRecipientId: string;
  title: string;
  description: string;
  taskType: string;
  status: TaskStatus;
  assignedTo: string;
  dueAt: string;
  createdAt: string;
}

export interface DocumentRecord {
  id: string;
  careRecipientId: string;
  fileName: string;
  fileType: string;
  category: string;
  notes: string;
  createdAt: string;
}

export interface HandoffPacket {
  id: string;
  careRecipientId: string;
  packetType: string;
  dateRangeStart?: string;
  dateRangeEnd?: string;
  createdAt: string;
}

export interface CareBinder {
  id: string;
  profile: CareRecipient;
  notes: CareNote[];
  medications: Medication[];
  appointments: Appointment[];
  tasks: CareTask[];
  documents: DocumentRecord[];
  handoffPackets: HandoffPacket[];
  createdAt: string;
  updatedAt: string;
}
