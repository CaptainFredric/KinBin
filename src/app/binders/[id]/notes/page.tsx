"use client";

import { useState } from "react";

import { BinderShell } from "@/components/binders/binder-shell";
import { useBinder } from "@/components/binders/use-binder";
import { getTodayIsoDate } from "@/lib/dates";

const blankNote = {
  id: "",
  noteDate: getTodayIsoDate(),
  mood: "",
  meals: "",
  sleep: "",
  mobility: "",
  painOrDiscomfort: "",
  medicationIssue: "",
  safetyConcern: "",
  generalNote: "",
};

export default function NotesPage({ params }: { params: { id: string } }) {
  const { binder, loaded, saveNote, deleteNote } = useBinder(params.id);
  const [draft, setDraft] = useState(blankNote);

  if (!loaded) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading...</main>;
  if (!binder) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Binder not found.</main>;

  return (
    <BinderShell binderId={binder.id} title={`${binder.profile.fullName} · Care notes`}>
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Add or edit daily note</h2>
        <form
          className="mt-3 grid gap-3 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            saveNote(binder.id, { ...draft, careRecipientId: binder.profile.id });
            setDraft(blankNote);
          }}
        >
          {[
            ["noteDate", "Date"],
            ["mood", "Mood"],
            ["meals", "Meals"],
            ["sleep", "Sleep"],
            ["mobility", "Mobility"],
            ["painOrDiscomfort", "Pain/discomfort"],
            ["medicationIssue", "Medication issue"],
            ["safetyConcern", "Safety concern"],
            ["generalNote", "General observation"],
          ].map(([field, label]) => (
            <label key={field} className="block text-sm">
              {label}
              <input
                name={field}
                value={draft[field as keyof typeof draft]}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, [field]: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-teal-200 p-2"
              />
            </label>
          ))}
          <button type="submit" className="rounded-full bg-teal-900 px-4 py-2 text-white md:col-span-2">
            Save note
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {binder.notes.map((note) => (
          <article key={note.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{note.noteDate}</h3>
              <div className="flex gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => setDraft({ ...note })}
                  className="rounded-full border border-teal-200 px-3 py-1"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteNote(binder.id, note.id)}
                  className="rounded-full border border-amber-300 px-3 py-1 text-amber-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-teal-800">{note.generalNote || "No observation entered."}</p>
          </article>
        ))}
      </section>
    </BinderShell>
  );
}
