import { CareBinder } from "@/types/care";

const now = new Date();
const isoNow = now.toISOString();
const todayIso = now.toISOString().slice(0, 10);
const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000).toISOString();

export const sampleBinders: CareBinder[] = [
  {
    id: "demo-binder",
    createdAt: isoNow,
    updatedAt: isoNow,
    profile: {
      id: "recipient-demo",
      fullName: "Patricia Monroe",
      dateOfBirth: "1943-11-16",
      address: "18 Harbor View Dr, Portland, ME",
      emergencyContacts: "Sam Monroe (son) 555-0191; Lisa Monroe (daughter) 555-0114",
      preferredHospital: "Maine Medical Center",
      primaryDoctor: "Dr. Elena Choi",
      allergies: "Penicillin",
      mobilityNotes: "Uses cane indoors; needs help on stairs.",
      communicationNotes: "Best in mornings, hearing aid in right ear.",
      emergencySummary: "History of falls. Keep phone nearby.",
      createdAt: isoNow,
      updatedAt: isoNow,
    },
    notes: [
      {
        id: "note-demo-1",
        careRecipientId: "recipient-demo",
        noteDate: todayIso,
        mood: "Calm",
        meals: "Oatmeal breakfast, soup lunch",
        sleep: "6.5 hours",
        mobility: "Walked hall twice with cane",
        painOrDiscomfort: "Mild knee pain in afternoon",
        medicationIssue: "No missed doses",
        safetyConcern: "None",
        generalNote: "Asked for reminder about eye appointment tomorrow.",
        createdAt: isoNow,
      },
    ],
    medications: [
      {
        id: "med-demo-1",
        careRecipientId: "recipient-demo",
        name: "Lisinopril",
        doseText: "10 mg",
        scheduleText: "Once daily with breakfast",
        prescriber: "Dr. Elena Choi",
        purpose: "Blood pressure",
        notes: "Verify refill next week",
        active: true,
        lastVerifiedAt: isoNow,
        createdAt: isoNow,
      },
    ],
    appointments: [
      {
        id: "apt-demo-1",
        careRecipientId: "recipient-demo",
        title: "Follow-up visit",
        providerName: "Dr. Elena Choi",
        location: "Main St Clinic",
        startsAt: oneHourFromNow,
        transportationPlan: "Sam driving",
        questionsToAsk: "Can PT be increased to twice weekly?",
        afterVisitNotes: "",
        followUpNeeded: "",
        createdAt: isoNow,
      },
    ],
    tasks: [
      {
        id: "task-demo-1",
        careRecipientId: "recipient-demo",
        title: "Pick up medication refill",
        description: "Lisinopril refill at Harbor Pharmacy",
        taskType: "Medication pickup",
        status: "todo",
        assignedTo: "Lisa",
        dueAt: oneHourFromNow,
        createdAt: isoNow,
      },
    ],
    documents: [
      {
        id: "doc-demo-1",
        careRecipientId: "recipient-demo",
        fileName: "Insurance Card",
        fileType: "jpg",
        category: "Insurance card",
        notes: "Back side still needed",
        createdAt: isoNow,
      },
    ],
    handoffPackets: [],
  },
];
