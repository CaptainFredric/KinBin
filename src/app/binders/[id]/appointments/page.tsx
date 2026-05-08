"use client";

import { useState } from "react";

import { BinderShell } from "@/components/binders/binder-shell";
import { useBinder } from "@/components/binders/use-binder";

const blankAppointment = {
  id: "",
  title: "",
  providerName: "",
  startsAt: "",
  location: "",
  transportationPlan: "",
  questionsToAsk: "",
  afterVisitNotes: "",
  followUpNeeded: "",
};

export default function AppointmentsPage({ params }: { params: { id: string } }) {
  const { binder, loaded, saveAppointment, deleteAppointment } = useBinder(params.id);
  const [draft, setDraft] = useState(blankAppointment);

  if (!loaded) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading...</main>;
  if (!binder) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Binder not found.</main>;

  return (
    <BinderShell binderId={binder.id} title={`${binder.profile.fullName} · Appointments`}>
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Appointment tracker</h2>
        <form
          className="mt-3 grid gap-3 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            saveAppointment(binder.id, { ...draft, careRecipientId: binder.profile.id });
            setDraft(blankAppointment);
          }}
        >
          {[
            ["title", "Title"],
            ["providerName", "Provider"],
            ["startsAt", "Date/time (ISO)"] ,
            ["location", "Location"],
            ["transportationPlan", "Transportation plan"],
            ["questionsToAsk", "Questions to ask"],
            ["afterVisitNotes", "Notes after appointment"],
            ["followUpNeeded", "Follow-up tasks"],
          ].map(([field, label]) => (
            <label key={field} className="block text-sm">
              {label}
              <input
                value={draft[field as keyof typeof draft]}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, [field]: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-teal-200 p-2"
              />
            </label>
          ))}
          <button type="submit" className="md:col-span-2 rounded-full bg-teal-900 px-4 py-2 text-white">
            Save appointment
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {binder.appointments.map((appointment) => (
          <article key={appointment.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{appointment.title}</h3>
              <div className="flex gap-2 text-sm">
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      id: appointment.id,
                      title: appointment.title,
                      providerName: appointment.providerName,
                      startsAt: appointment.startsAt,
                      location: appointment.location,
                      transportationPlan: appointment.transportationPlan,
                      questionsToAsk: appointment.questionsToAsk,
                      afterVisitNotes: appointment.afterVisitNotes,
                      followUpNeeded: appointment.followUpNeeded,
                    })
                  }
                  className="rounded-full border border-teal-200 px-3 py-1"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteAppointment(binder.id, appointment.id)}
                  className="rounded-full border border-amber-300 px-3 py-1 text-amber-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-teal-700">{appointment.providerName}</p>
            <p className="text-sm text-teal-700">{appointment.startsAt || "No date set"}</p>
          </article>
        ))}
      </section>
    </BinderShell>
  );
}
