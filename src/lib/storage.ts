"use client";

import { sampleBinders } from "@/lib/sample-data";
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

const STORAGE_KEY = "carebinder.binders.v1";

const isBrowser = () => typeof window !== "undefined";

export const makeId = () =>
  isBrowser() && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Array.from(crypto.getRandomValues(new Uint32Array(2)))
        .map((value) => value.toString(16))
        .join("")}`;

const saveBinders = (binders: CareBinder[]) => {
  if (!isBrowser()) {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(binders));
};

export const loadBinders = (): CareBinder[] => {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    saveBinders(sampleBinders);
    return sampleBinders;
  }

  try {
    return JSON.parse(raw) as CareBinder[];
  } catch {
    saveBinders(sampleBinders);
    return sampleBinders;
  }
};

const updateBinder = (
  binders: CareBinder[],
  binderId: string,
  callback: (binder: CareBinder) => CareBinder,
) => {
  const next = binders.map((binder) =>
    binder.id === binderId ? callback(binder) : binder,
  );
  saveBinders(next);
  return next;
};

const timestamp = () => new Date().toISOString();

export const createBinder = (binders: CareBinder[], fullName: string) => {
  const now = timestamp();
  const profileId = makeId();

  const binder: CareBinder = {
    id: makeId(),
    createdAt: now,
    updatedAt: now,
    profile: {
      id: profileId,
      fullName,
      createdAt: now,
      updatedAt: now,
    },
    notes: [],
    medications: [],
    appointments: [],
    tasks: [],
    documents: [],
    handoffPackets: [],
  };

  const next = [binder, ...binders];
  saveBinders(next);
  return { next, binder };
};

export const deleteBinder = (binders: CareBinder[], binderId: string) => {
  const next = binders.filter((binder) => binder.id !== binderId);
  saveBinders(next);
  return next;
};

export const updateProfile = (
  binders: CareBinder[],
  binderId: string,
  updates: Partial<CareRecipient>,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    profile: {
      ...binder.profile,
      ...updates,
      updatedAt: timestamp(),
    },
  }));

const upsertById = <T extends { id: string }>(items: T[], item: T) => {
  const exists = items.some((entry) => entry.id === item.id);
  if (exists) {
    return items.map((entry) => (entry.id === item.id ? item : entry));
  }
  return [item, ...items];
};

const removeById = <T extends { id: string }>(items: T[], id: string) =>
  items.filter((entry) => entry.id !== id);

export const upsertNote = (
  binders: CareBinder[],
  binderId: string,
  note: CareNote,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    notes: upsertById(binder.notes, note),
  }));

export const deleteNote = (binders: CareBinder[], binderId: string, noteId: string) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    notes: removeById(binder.notes, noteId),
  }));

export const upsertMedication = (
  binders: CareBinder[],
  binderId: string,
  medication: Medication,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    medications: upsertById(binder.medications, medication),
  }));

export const deleteMedication = (
  binders: CareBinder[],
  binderId: string,
  medicationId: string,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    medications: removeById(binder.medications, medicationId),
  }));

export const upsertAppointment = (
  binders: CareBinder[],
  binderId: string,
  appointment: Appointment,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    appointments: upsertById(binder.appointments, appointment),
  }));

export const deleteAppointment = (
  binders: CareBinder[],
  binderId: string,
  appointmentId: string,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    appointments: removeById(binder.appointments, appointmentId),
  }));

export const upsertTask = (
  binders: CareBinder[],
  binderId: string,
  task: CareTask,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    tasks: upsertById(binder.tasks, task),
  }));

export const deleteTask = (binders: CareBinder[], binderId: string, taskId: string) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    tasks: removeById(binder.tasks, taskId),
  }));

export const upsertDocument = (
  binders: CareBinder[],
  binderId: string,
  document: DocumentRecord,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    documents: upsertById(binder.documents, document),
  }));

export const deleteDocument = (
  binders: CareBinder[],
  binderId: string,
  documentId: string,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    documents: removeById(binder.documents, documentId),
  }));

export const addHandoffPacket = (
  binders: CareBinder[],
  binderId: string,
  packet: HandoffPacket,
) =>
  updateBinder(binders, binderId, (binder) => ({
    ...binder,
    updatedAt: timestamp(),
    handoffPackets: [packet, ...binder.handoffPackets],
  }));
