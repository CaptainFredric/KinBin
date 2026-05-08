"use client";

import Link from "next/link";

import { getMissingInfoItems } from "@/lib/handoff";
import { useCareBinders } from "@/store/use-care-binders";

const today = new Date().toISOString().slice(0, 10);

export default function DashboardPage() {
  const { binders, loaded, deleteBinder } = useCareBinders();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">Care binders</h1>
        <Link href="/binders/new" className="rounded-full bg-teal-900 px-4 py-2 text-white">
          New care binder
        </Link>
      </div>

      {!loaded ? <p className="mt-4 text-sm text-teal-700">Loading...</p> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {binders.map((binder) => {
          const todaysAppointments = binder.appointments.filter((item) =>
            item.startsAt.startsWith(today),
          );
          const openTasks = binder.tasks.filter((item) => item.status !== "done");
          const missing = getMissingInfoItems(binder);

          return (
            <article key={binder.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">{binder.profile.fullName}</h2>
              <p className="mt-2 text-sm text-teal-700">
                Today&apos;s appointments: {todaysAppointments.length} · Open tasks: {openTasks.length}
              </p>
              <p className="text-sm text-amber-800">Missing-info score: {missing.length}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={`/binders/${binder.id}`}
                  className="rounded-full bg-teal-900 px-3 py-1.5 text-sm text-white"
                >
                  Open binder
                </Link>
                <Link
                  href={`/binders/${binder.id}/handoff`}
                  className="rounded-full border border-teal-200 px-3 py-1.5 text-sm"
                >
                  Print Handoff Packet
                </Link>
                <button
                  type="button"
                  onClick={() => deleteBinder(binder.id)}
                  className="rounded-full border border-amber-300 px-3 py-1.5 text-sm text-amber-800"
                >
                  Delete binder
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
