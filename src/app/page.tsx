import Link from "next/link";

import { disclaimer } from "@/lib/handoff";

const stats = [
  ["63M", "Americans provided ongoing care in 2025"],
  ["$1.01T", "Estimated unpaid family care value in 2024"],
  ["17%", "Projected 2024–2034 home-care aide job growth"],
];

const problems = [
  "Texts get buried",
  "Medication lists go stale",
  "Appointment notes disappear",
  "Siblings duplicate tasks",
  "Documents live in five places",
  "Nobody knows what changed today",
];

const features = [
  "Daily care notes",
  "Appointment tracker",
  "Medication list",
  "Shared task board",
  "Emergency profile",
  "Document vault",
  "Printable handoff packet",
  "Missing-info checklist",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-10">
      <section className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-2">
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold">Care coordination without the text-message chaos.</h1>
          <p className="text-lg text-teal-700">
            CareBinder helps families organize appointments, medications, care notes, tasks,
            documents, and printable handoff packets for a loved one.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className="rounded-full bg-teal-900 px-5 py-2.5 text-white">
              Create a free care binder
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-teal-200 px-5 py-2.5 text-teal-900"
            >
              View sample handoff packet
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-teal-100 bg-[#f7f5f1] p-4 text-sm">
          <h2 className="font-semibold">Today&apos;s care snapshot</h2>
          <div className="mt-3 grid gap-3">
            <div className="rounded-xl bg-white p-3">Appointment: 2:00 PM Follow-up visit</div>
            <div className="rounded-xl bg-white p-3">Medication reminder: Lisinopril with lunch</div>
            <div className="rounded-xl bg-white p-3">Recent note: Mild knee discomfort, no safety issues</div>
            <div className="rounded-xl bg-white p-3">Missing info: upload insurance card back side</div>
            <button className="rounded-xl bg-amber-100 p-3 text-left font-medium">
              Print Handoff Packet
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-3">
        {stats.map(([value, label]) => (
          <article key={value} className="rounded-2xl bg-[#f7f5f1] p-4">
            <p className="text-3xl font-semibold">{value}</p>
            <p className="text-sm text-teal-700">{label}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Care usually breaks in the handoff.</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((item) => (
            <article key={item} className="rounded-2xl bg-white p-4 shadow-sm">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">One private binder for the people helping.</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <article key={item} className="rounded-2xl bg-white p-4 shadow-sm">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold">Print the page everyone actually needs.</h2>
        <div className="mt-4 rounded-2xl border border-teal-100 bg-[#f7f5f1] p-6">
          <p className="font-medium">Sample handoff packet preview</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-teal-800">
            <li>Emergency contacts</li>
            <li>Current medications</li>
            <li>Allergies/warnings</li>
            <li>Today&apos;s appointments</li>
            <li>Last 7 days of notes</li>
            <li>Open tasks and document checklist</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Share the right details with the right people.</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-teal-800">
            <li>Owner: full access</li>
            <li>Family member: notes/tasks/calendar</li>
            <li>Helper: assigned tasks only</li>
            <li>Viewer: emergency profile and handoff packet</li>
          </ul>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Private by default. Practical by design.</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-teal-800">
            <li>No public family feed</li>
            <li>No ads around sensitive care information</li>
            <li>Export and delete controls</li>
            <li>Cloud sync optional</li>
            <li>Clear medical-advice disclaimer</li>
          </ul>
        </article>
      </section>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold">Build the binder before the next appointment.</h2>
        <div className="mt-4">
          <Link href="/dashboard" className="rounded-full bg-teal-900 px-5 py-2.5 text-white">
            Create your first care binder
          </Link>
        </div>
      </section>

      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {disclaimer}
      </p>
    </main>
  );
}
