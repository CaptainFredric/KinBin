"use client";

import Link from "next/link";
import {
  CalendarClock,
  ClipboardList,
  FileText,
  Pill,
  ShieldAlert,
  UserCircle2,
} from "lucide-react";

import { disclaimer, getMissingInfoItems, makeHandoffText } from "@/lib/handoff";
import { useCareBinders } from "@/store/use-care-binders";

export default function DemoPage() {
  const { binders, loaded } = useCareBinders();
  const binder = binders[0];

  if (!loaded || !binder) {
    return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading demo…</main>;
  }

  const handoff = makeHandoffText(binder);
  const nextAppointment = binder.appointments
    .slice()
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0];
  const activeMeds = binder.medications.filter((item) => item.active).length;
  const openTasks = binder.tasks.filter((item) => item.status !== "done").length;
  const recentNote = binder.notes
    .slice()
    .sort((a, b) => new Date(b.noteDate).getTime() - new Date(a.noteDate).getTime())[0];
  const missingCount = getMissingInfoItems(binder).length;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-teal-950">Guided demo binder</h1>
        <p className="text-teal-700">
          Demo mode uses browser localStorage with realistic sample data so you can preview the
          product experience without creating an account.
        </p>
      </header>

      <section className="grid gap-4 rounded-3xl border border-teal-100 bg-white p-6 shadow-sm lg:grid-cols-[1.15fr_0.85fr]">
        <article className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-950">Sample care recipient profile</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#f4f1ea] p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-teal-900">
                <UserCircle2 size={16} /> Name
              </p>
              <p className="mt-1 text-teal-800">{binder.profile.fullName}</p>
            </div>
            <div className="rounded-2xl bg-[#f4f1ea] p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-teal-900">
                <ShieldAlert size={16} /> Allergies / warnings
              </p>
              <p className="mt-1 text-teal-800">{binder.profile.allergies || "None listed"}</p>
            </div>
            <div className="rounded-2xl bg-[#f4f1ea] p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-teal-900">
                <CalendarClock size={16} /> Today&apos;s appointment
              </p>
              <p className="mt-1 text-teal-800">
                {nextAppointment
                  ? `${nextAppointment.title} - ${new Date(nextAppointment.startsAt).toLocaleString()}`
                  : "No appointment scheduled"}
              </p>
            </div>
            <div className="rounded-2xl bg-[#f4f1ea] p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-teal-900">
                <Pill size={16} /> Active medications
              </p>
              <p className="mt-1 text-teal-800">{activeMeds}</p>
            </div>
            <div className="rounded-2xl bg-[#f4f1ea] p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-teal-900">
                <ClipboardList size={16} /> Open tasks
              </p>
              <p className="mt-1 text-teal-800">{openTasks}</p>
            </div>
            <div className="rounded-2xl bg-[#f4f1ea] p-3">
              <p className="flex items-center gap-2 text-sm font-medium text-teal-900">
                <FileText size={16} /> Missing information
              </p>
              <p className="mt-1 text-teal-800">{missingCount}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-teal-100 bg-white p-3">
            <p className="text-sm font-medium text-teal-900">Most recent note</p>
            <p className="mt-1 text-sm text-teal-700">
              {recentNote
                ? `${recentNote.noteDate}: ${recentNote.generalNote || "No general note entered."}`
                : "No recent note available."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/binders/${binder.id}`}
              className="inline-block rounded-full bg-teal-900 px-4 py-2 text-sm text-white"
            >
              Open demo binder
            </Link>
            <Link
              href={`/binders/${binder.id}/handoff`}
              className="inline-block rounded-full border border-teal-200 px-4 py-2 text-sm text-teal-900"
            >
              View handoff packet
            </Link>
          </div>
        </article>

        <article className="rounded-2xl bg-[#f4f1ea] p-4">
          <h3 className="font-medium text-teal-900">Handoff packet preview</h3>
          <p className="mt-2 text-xs uppercase tracking-wide text-teal-500">Medications</p>
          <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap text-xs text-teal-800">
            {handoff.medications}
          </pre>
          <p className="mt-3 text-xs uppercase tracking-wide text-teal-500">Appointments</p>
          <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap text-xs text-teal-800">
            {handoff.appointments}
          </pre>
          <p className="mt-3 text-xs uppercase tracking-wide text-teal-500">Open tasks</p>
          <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap text-xs text-teal-800">
            {handoff.tasks}
          </pre>
        </article>
      </section>

      <section className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-teal-950">What this demo shows</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-teal-800">
          <li>Profile, notes, medications, appointments, tasks, and document checklist metadata.</li>
          <li>Local-first data storage in your browser for fast trial and iteration.</li>
          <li>Printable handoff packet plus PDF export for practical caregiver transitions.</li>
        </ul>
      </section>

      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{disclaimer}</p>
    </main>
  );
}
