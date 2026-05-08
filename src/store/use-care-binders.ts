"use client";

import { useMemo, useState } from "react";

import {
  addHandoffPacket,
  createBinder as createBinderRecord,
  deleteAppointment as removeAppointment,
  deleteBinder as removeBinder,
  deleteDocument as removeDocument,
  deleteMedication as removeMedication,
  deleteNote as removeNote,
  deleteTask as removeTask,
  loadBinders,
  makeId,
  upsertAppointment,
  upsertDocument,
  upsertMedication,
  upsertNote,
  upsertTask,
  updateProfile,
} from "@/lib/storage";
import {
  Appointment,
  CareBinder,
  CareNote,
  CareRecipient,
  CareTask,
  DocumentRecord,
  HandoffPacket,
  Medication,
} from "@/types/care";

const now = () => new Date().toISOString();

export const useCareBinders = () => {
  const [binders, setBinders] = useState<CareBinder[]>(() => loadBinders());
  const loaded = true;

  const actions = useMemo(
    () => ({
      createBinder: (fullName: string) => {
        const { next, binder } = createBinderRecord(binders, fullName);
        setBinders(next);
        return binder;
      },
      deleteBinder: (binderId: string) => setBinders(removeBinder(binders, binderId)),
      updateProfile: (binderId: string, updates: Partial<CareRecipient>) =>
        setBinders(updateProfile(binders, binderId, updates)),
      saveNote: (binderId: string, note: Partial<CareNote>) => {
        const item: CareNote = {
          id: note.id || makeId(),
          careRecipientId: note.careRecipientId || "",
          noteDate: note.noteDate || new Date().toISOString().slice(0, 10),
          mood: note.mood || "",
          meals: note.meals || "",
          sleep: note.sleep || "",
          mobility: note.mobility || "",
          painOrDiscomfort: note.painOrDiscomfort || "",
          medicationIssue: note.medicationIssue || "",
          safetyConcern: note.safetyConcern || "",
          generalNote: note.generalNote || "",
          createdAt: note.createdAt || now(),
        };
        setBinders(upsertNote(binders, binderId, item));
      },
      deleteNote: (binderId: string, noteId: string) =>
        setBinders(removeNote(binders, binderId, noteId)),
      saveMedication: (binderId: string, medication: Partial<Medication>) => {
        const item: Medication = {
          id: medication.id || makeId(),
          careRecipientId: medication.careRecipientId || "",
          name: medication.name || "",
          doseText: medication.doseText || "",
          scheduleText: medication.scheduleText || "",
          prescriber: medication.prescriber || "",
          purpose: medication.purpose || "",
          notes: medication.notes || "",
          active: medication.active ?? true,
          lastVerifiedAt: medication.lastVerifiedAt || now(),
          createdAt: medication.createdAt || now(),
        };
        setBinders(upsertMedication(binders, binderId, item));
      },
      deleteMedication: (binderId: string, medicationId: string) =>
        setBinders(removeMedication(binders, binderId, medicationId)),
      saveAppointment: (binderId: string, appointment: Partial<Appointment>) => {
        const item: Appointment = {
          id: appointment.id || makeId(),
          careRecipientId: appointment.careRecipientId || "",
          title: appointment.title || "",
          providerName: appointment.providerName || "",
          location: appointment.location || "",
          startsAt: appointment.startsAt || "",
          transportationPlan: appointment.transportationPlan || "",
          questionsToAsk: appointment.questionsToAsk || "",
          afterVisitNotes: appointment.afterVisitNotes || "",
          followUpNeeded: appointment.followUpNeeded || "",
          createdAt: appointment.createdAt || now(),
        };
        setBinders(upsertAppointment(binders, binderId, item));
      },
      deleteAppointment: (binderId: string, appointmentId: string) =>
        setBinders(removeAppointment(binders, binderId, appointmentId)),
      saveTask: (binderId: string, task: Partial<CareTask>) => {
        const item: CareTask = {
          id: task.id || makeId(),
          careRecipientId: task.careRecipientId || "",
          title: task.title || "",
          description: task.description || "",
          taskType: task.taskType || "General",
          status: task.status || "todo",
          assignedTo: task.assignedTo || "",
          dueAt: task.dueAt || "",
          createdAt: task.createdAt || now(),
        };
        setBinders(upsertTask(binders, binderId, item));
      },
      deleteTask: (binderId: string, taskId: string) =>
        setBinders(removeTask(binders, binderId, taskId)),
      saveDocument: (binderId: string, document: Partial<DocumentRecord>) => {
        const item: DocumentRecord = {
          id: document.id || makeId(),
          careRecipientId: document.careRecipientId || "",
          fileName: document.fileName || "",
          fileType: document.fileType || "",
          category: document.category || "",
          notes: document.notes || "",
          createdAt: document.createdAt || now(),
        };
        setBinders(upsertDocument(binders, binderId, item));
      },
      deleteDocument: (binderId: string, documentId: string) =>
        setBinders(removeDocument(binders, binderId, documentId)),
      saveHandoffPacket: (binderId: string, packetType: string) => {
        const packet: HandoffPacket = {
          id: makeId(),
          careRecipientId: binderId,
          packetType,
          createdAt: now(),
          dateRangeStart: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 10),
          dateRangeEnd: new Date().toISOString().slice(0, 10),
        };

        setBinders(addHandoffPacket(binders, binderId, packet));
      },
    }),
    [binders],
  );

  return { binders, loaded, ...actions };
};
