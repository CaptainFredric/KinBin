import { z } from "zod";

export const binderSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
});

export const medicationSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Medication name is required"),
  doseText: z.string().trim().min(1, "Dose is required"),
  scheduleText: z.string().trim().min(1, "Schedule is required"),
  prescriber: z.string().trim().min(1, "Prescriber is required"),
  purpose: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  active: z.boolean(),
});

export const appointmentSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "Appointment title is required"),
  providerName: z.string().trim().min(1, "Provider is required"),
  startsAt: z.string().trim().min(1, "Date/time is required"),
  location: z.string().trim().min(1, "Location is required"),
  transportationPlan: z.string().trim().optional(),
  questionsToAsk: z.string().trim().optional(),
  afterVisitNotes: z.string().trim().optional(),
  followUpNeeded: z.string().trim().optional(),
});

export const taskSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "Task title is required"),
  description: z.string().trim().optional(),
  taskType: z.string().trim().min(1, "Task type is required"),
  status: z.enum(["todo", "claimed", "done", "blocked"]),
  assignedTo: z.string().trim().optional(),
  dueAt: z.string().trim().optional(),
});

export const documentSchema = z.object({
  id: z.string().optional(),
  fileName: z.string().trim().min(1, "Document name is required"),
  fileType: z.string().trim().min(1, "Document type is required"),
  category: z.string().trim().min(1, "Category is required"),
  notes: z.string().trim().optional(),
});

export type BinderFormValues = z.infer<typeof binderSchema>;
export type MedicationFormValues = z.infer<typeof medicationSchema>;
export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
export type TaskFormValues = z.infer<typeof taskSchema>;
export type DocumentFormValues = z.infer<typeof documentSchema>;
