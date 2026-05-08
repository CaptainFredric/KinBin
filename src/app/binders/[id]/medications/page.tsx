"use client";

import { useState } from "react";

import { BinderShell } from "@/components/binders/binder-shell";
import { useBinder } from "@/components/binders/use-binder";

const blankMedication = {
  id: "",
  name: "",
  doseText: "",
  scheduleText: "",
  prescriber: "",
  purpose: "",
  notes: "",
  active: true,
};

export default function MedicationsPage({ params }: { params: { id: string } }) {
  const { binder, loaded, saveMedication, deleteMedication } = useBinder(params.id);
  const [draft, setDraft] = useState(blankMedication);

  if (!loaded) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading...</main>;
  if (!binder) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Binder not found.</main>;

  return (
    <BinderShell
      binderId={binder.id}
      title={`${binder.profile.fullName} · Medications`}
      subtitle="List only. Verify all medication decisions with licensed professionals."
    >
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Medication list</h2>
        <form
          className="mt-3 grid gap-3 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            saveMedication(binder.id, {
              ...draft,
              careRecipientId: binder.profile.id,
              lastVerifiedAt: new Date().toISOString(),
            });
            setDraft(blankMedication);
          }}
        >
          {[
            ["name", "Medication name"],
            ["doseText", "Dose text"],
            ["scheduleText", "Schedule"],
            ["prescriber", "Prescriber"],
            ["purpose", "Purpose (optional)"],
            ["notes", "Notes"],
          ].map(([field, label]) => (
            <label key={field} className="block text-sm">
              {label}
              <input
                name={field}
                value={String(draft[field as keyof typeof draft] ?? "")}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, [field]: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-teal-200 p-2"
              />
            </label>
          ))}
          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={draft.active}
              onChange={(event) => setDraft((current) => ({ ...current, active: event.target.checked }))}
            />
            Active medication
          </label>
          <button type="submit" className="md:col-span-2 rounded-full bg-teal-900 px-4 py-2 text-white">
            Save medication
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {binder.medications.map((medication) => (
          <article key={medication.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{medication.name}</h3>
              <div className="flex gap-2 text-sm">
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      id: medication.id,
                      name: medication.name,
                      doseText: medication.doseText,
                      scheduleText: medication.scheduleText,
                      prescriber: medication.prescriber,
                      purpose: medication.purpose || "",
                      notes: medication.notes || "",
                      active: medication.active,
                    })
                  }
                  className="rounded-full border border-teal-200 px-3 py-1"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteMedication(binder.id, medication.id)}
                  className="rounded-full border border-amber-300 px-3 py-1 text-amber-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-1 text-sm text-teal-700">{medication.doseText}</p>
            <p className="text-sm text-teal-700">{medication.scheduleText}</p>
            <p className="text-xs text-amber-900">Verify with doctor/pharmacist.</p>
          </article>
        ))}
      </section>
    </BinderShell>
  );
}
