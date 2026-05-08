import { jsPDF } from "jspdf";

import { CareBinder } from "@/types/care";

export const disclaimer =
  "CareBinder is a family organization tool. It does not provide medical advice, diagnosis, treatment guidance, emergency monitoring, or professional care documentation. Always verify medication and care decisions with licensed professionals.";

export const getMissingInfoItems = (binder: CareBinder) => {
  const missing: string[] = [];
  const profile = binder.profile;

  if (!profile.fullName.trim()) missing.push("Care recipient name");
  if (!profile.emergencyContacts?.trim()) missing.push("Emergency contacts");
  if (!profile.primaryDoctor?.trim()) missing.push("Primary doctor");
  if (!profile.allergies?.trim()) missing.push("Allergies / warning notes");
  if (binder.medications.length === 0) missing.push("Medication list");
  if (binder.appointments.length === 0) missing.push("Upcoming appointments");
  if (binder.documents.length === 0) missing.push("Document checklist entries");

  return missing;
};

const line = (value: string) => value.replace(/\s+/g, " ").trim();

export const makeHandoffText = (binder: CareBinder) => {
  const appointments = binder.appointments
    .slice(0, 5)
    .map((item) => `${item.title} — ${item.startsAt ? new Date(item.startsAt).toLocaleString() : "TBD"}`)
    .join("\n") || "No appointments listed.";

  const medications = binder.medications
    .filter((item) => item.active)
    .map((item) => `${item.name}: ${item.doseText} / ${item.scheduleText}`)
    .join("\n") || "No active medications listed.";

  const notes = binder.notes
    .slice(0, 5)
    .map((item) => `${item.noteDate}: ${line(item.generalNote || "No note")}`)
    .join("\n") || "No recent notes.";

  const tasks = binder.tasks
    .filter((item) => item.status !== "done")
    .slice(0, 8)
    .map((item) => `${item.title} (${item.status})`)
    .join("\n") || "No open tasks.";

  return {
    profile: `Emergency Profile\nName: ${binder.profile.fullName}\nDoctor: ${binder.profile.primaryDoctor || "N/A"}\nHospital: ${binder.profile.preferredHospital || "N/A"}\nContacts: ${binder.profile.emergencyContacts || "N/A"}\nAllergies: ${binder.profile.allergies || "N/A"}\nWarnings: ${binder.profile.emergencySummary || "N/A"}`,
    medications,
    appointments,
    notes,
    tasks,
  };
};

export const downloadHandoffPdf = (binder: CareBinder) => {
  const handoff = makeHandoffText(binder);
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("CareBinder Handoff Packet", 14, 18);
  doc.setFontSize(11);

  doc.text(handoff.profile, 14, 30, { maxWidth: 180 });
  doc.text(`Current Medications\n${handoff.medications}`, 14, 78, { maxWidth: 180 });
  doc.text(`Upcoming Appointments\n${handoff.appointments}`, 14, 126, {
    maxWidth: 180,
  });
  doc.addPage();
  doc.text(`Recent Notes\n${handoff.notes}`, 14, 20, { maxWidth: 180 });
  doc.text(`Open Tasks\n${handoff.tasks}`, 14, 108, { maxWidth: 180 });
  doc.text(disclaimer, 14, 240, { maxWidth: 180 });

  doc.save(`carebinder-handoff-${binder.profile.fullName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
};
