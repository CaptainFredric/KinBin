"use client";

import { useState } from "react";

import { BinderShell } from "@/components/binders/binder-shell";
import { useBinder } from "@/components/binders/use-binder";
import { getMissingInfoItems } from "@/lib/handoff";

export default function BinderOverviewPage({ params }: { params: { id: string } }) {
  const { binder, loaded, updateProfile } = useBinder(params.id);
  const [editing, setEditing] = useState(false);

  if (!loaded) {
    return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading...</main>;
  }

  if (!binder) {
    return <main className="mx-auto w-full max-w-6xl px-6 py-10">Binder not found.</main>;
  }

  const missing = getMissingInfoItems(binder);

  return (
    <BinderShell
      binderId={binder.id}
      title={binder.profile.fullName}
      subtitle="Daily overview with practical handoff information"
    >
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Care recipient profile</h2>
            <button
              type="button"
              className="text-sm text-teal-700 underline"
              onClick={() => setEditing((value) => !value)}
            >
              {editing ? "Close" : "Edit"}
            </button>
          </div>
          {editing ? (
            <form
              className="space-y-2"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                updateProfile(binder.id, {
                  fullName: String(formData.get("fullName") || ""),
                  dateOfBirth: String(formData.get("dateOfBirth") || ""),
                  address: String(formData.get("address") || ""),
                  emergencyContacts: String(formData.get("emergencyContacts") || ""),
                  preferredHospital: String(formData.get("preferredHospital") || ""),
                  primaryDoctor: String(formData.get("primaryDoctor") || ""),
                  allergies: String(formData.get("allergies") || ""),
                  mobilityNotes: String(formData.get("mobilityNotes") || ""),
                  communicationNotes: String(formData.get("communicationNotes") || ""),
                  emergencySummary: String(formData.get("emergencySummary") || ""),
                });
                setEditing(false);
              }}
            >
              {[
                ["fullName", "Name", binder.profile.fullName],
                ["dateOfBirth", "Date of birth", binder.profile.dateOfBirth || ""],
                ["address", "Address", binder.profile.address || ""],
                ["emergencyContacts", "Emergency contacts", binder.profile.emergencyContacts || ""],
                ["preferredHospital", "Preferred hospital", binder.profile.preferredHospital || ""],
                ["primaryDoctor", "Primary doctor", binder.profile.primaryDoctor || ""],
                ["allergies", "Allergies", binder.profile.allergies || ""],
                ["mobilityNotes", "Mobility notes", binder.profile.mobilityNotes || ""],
                [
                  "communicationNotes",
                  "Communication preferences",
                  binder.profile.communicationNotes || "",
                ],
                ["emergencySummary", "Important warnings", binder.profile.emergencySummary || ""],
              ].map(([name, label, value]) => (
                <label key={name} className="block text-sm">
                  {label}
                  <input
                    className="mt-1 w-full rounded-lg border border-teal-200 p-2"
                    name={name}
                    defaultValue={value}
                  />
                </label>
              ))}
              <button className="rounded-full bg-teal-900 px-4 py-2 text-sm text-white" type="submit">
                Save profile
              </button>
            </form>
          ) : (
            <div className="space-y-1 text-sm text-teal-800">
              <p>Doctor: {binder.profile.primaryDoctor || "Not set"}</p>
              <p>Hospital: {binder.profile.preferredHospital || "Not set"}</p>
              <p>Emergency contacts: {binder.profile.emergencyContacts || "Not set"}</p>
              <p>Allergies: {binder.profile.allergies || "Not set"}</p>
            </div>
          )}
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold">Today&apos;s care dashboard</h2>
          <ul className="mt-3 space-y-1 text-sm text-teal-800">
            <li>Appointments today: {binder.appointments.length}</li>
            <li>Open tasks: {binder.tasks.filter((item) => item.status !== "done").length}</li>
            <li>Recent notes: {binder.notes.slice(0, 3).length}</li>
            <li>Medication reminders: {binder.medications.filter((item) => item.active).length}</li>
            <li>Documents needing upload: {missing.length}</li>
          </ul>
          <p className="mt-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-900">
            Verify medication entries with doctor or pharmacist.
          </p>
        </article>
      </section>

      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Missing information checklist</h2>
        {missing.length === 0 ? (
          <p className="mt-2 text-sm text-teal-700">This binder has all key handoff details.</p>
        ) : (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-teal-800">
            {missing.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>
    </BinderShell>
  );
}
