import Link from "next/link";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  FileClock,
  FileText,
  HeartPulse,
  Lock,
  Pill,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";

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
  "Document checklist",
  "Printable handoff packet",
  "Missing-info checklist",
];

const boundaries = [
  "Local-first demo",
  "Cloud sync optional later",
  "No public family feed",
  "No ads around sensitive care information",
  "Export/delete controls planned",
  "Not medical advice",
];

const faq = [
  ["Is this medical advice?", "No. CareBinder is an organization tool, not medical advice."],
  ["Is this HIPAA compliant?", "Not claimed at this stage."],
  ["Can I use it without an account?", "Yes. Demo and local mode work without an account."],
  [
    "Does it upload documents?",
    "Not yet. Current version stores document checklist metadata only.",
  ],
];

const plans = [
  ["Free", "$0", "Local binder demo", false],
  ["Family Plus", "$8/month", "Planned cloud sync and sharing", true],
  ["Care Team", "$19/month", "Planned larger family/helper coordination", true],
  ["Professional", "$99+/month", "Future agencies/coordinators", true],
] as const;

const featureIcons = [
  HeartPulse,
  CalendarClock,
  Pill,
  Users,
  Shield,
  FileText,
  ClipboardList,
  CheckCircle2,
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-10">
      <section className="grid gap-8 rounded-3xl border border-teal-100 bg-white p-8 shadow-[0_30px_70px_-45px_rgba(10,88,90,0.7)] lg:grid-cols-2">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-900">
            <Lock size={14} /> Private family coordination
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-teal-950 md:text-5xl">
            Care coordination without the text-message chaos.
          </h1>
          <p className="text-lg text-teal-800">
            CareBinder helps families organize appointments, medications, care notes, tasks,
            documents, and printable handoff packets for a loved one.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-teal-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800"
            >
              Create a free care binder
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-teal-200 bg-white px-5 py-2.5 text-sm font-medium text-teal-900 transition hover:bg-teal-50"
            >
              View demo binder
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-teal-100 bg-[#f4f1ea] p-5 text-sm shadow-inner">
          <h2 className="text-base font-semibold text-teal-950">Today&apos;s care snapshot</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl border border-teal-100 bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-950">
                <CalendarClock size={15} className="text-teal-700" /> Appointment
              </p>
              <p className="mt-1 text-teal-800">2:00 PM Follow-up visit with Dr. Choi</p>
            </div>
            <div className="rounded-2xl border border-teal-100 bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-950">
                <Pill size={15} className="text-teal-700" /> Medication
              </p>
              <p className="mt-1 text-teal-800">Lisinopril 10mg with lunch</p>
            </div>
            <div className="rounded-2xl border border-teal-100 bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-950">
                <FileText size={15} className="text-teal-700" /> Recent care note
              </p>
              <p className="mt-1 text-teal-800">Mild knee discomfort, no safety concerns.</p>
            </div>
            <div className="rounded-2xl border border-teal-100 bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-950">
                <ClipboardList size={15} className="text-teal-700" /> Open task
              </p>
              <p className="mt-1 text-teal-800">Pick up refill at Harbor Pharmacy</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
              <p className="flex items-center gap-2 font-medium text-amber-900">
                <AlertTriangle size={15} /> Missing information checklist
              </p>
              <p className="mt-1 text-amber-900">Insurance card back side still needed</p>
            </div>
            <button className="rounded-2xl bg-teal-900 px-4 py-3 text-left font-medium text-white transition hover:bg-teal-800">
              Print Handoff Packet
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-teal-100 bg-white p-8 shadow-sm md:grid-cols-3">
        {stats.map(([value, label], index) => (
          <article key={value} className="rounded-2xl bg-[#f4f1ea] p-4">
            <p className="text-3xl font-semibold">{value}</p>
            <p className="text-sm text-teal-700">{label}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-teal-500">
              Source: {index < 2 ? "AARP/NAC" : "BLS"}
            </p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-teal-950">Care usually breaks in the handoff.</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((item) => (
            <article key={item} className="rounded-2xl border border-teal-100 bg-white p-4 shadow-sm">
              <p className="flex items-center gap-2 text-teal-900">
                <CircleDashed size={16} className="text-teal-700" />
                {item}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-teal-950">
          One private binder for the people helping.
        </h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = featureIcons[index];

            return (
              <article key={item} className="rounded-2xl border border-teal-100 bg-white p-4 shadow-sm">
                <p className="flex items-center gap-2 text-teal-900">
                  <Icon size={17} className="text-teal-700" />
                  {item}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-teal-950">Print the page everyone actually needs.</h2>
        <div className="mt-5 rounded-2xl border border-teal-100 bg-[#f4f1ea] p-6">
          <p className="font-medium text-teal-900">Sample handoff packet preview</p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <article className="rounded-xl bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-900">
                <Shield size={15} className="text-teal-700" /> Emergency profile
              </p>
              <p className="mt-1 text-sm text-teal-700">Contacts, doctor, hospital, allergies, warnings</p>
            </article>
            <article className="rounded-xl bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-900">
                <Pill size={15} className="text-teal-700" /> Active medications
              </p>
              <p className="mt-1 text-sm text-teal-700">Dose, schedule, prescriber, last verification</p>
            </article>
            <article className="rounded-xl bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-900">
                <Stethoscope size={15} className="text-teal-700" /> Upcoming appointments
              </p>
              <p className="mt-1 text-sm text-teal-700">Date/time, provider, questions, follow-ups</p>
            </article>
            <article className="rounded-xl bg-white p-3">
              <p className="flex items-center gap-2 font-medium text-teal-900">
                <FileClock size={15} className="text-teal-700" /> Notes and open tasks
              </p>
              <p className="mt-1 text-sm text-teal-700">Recent observations plus immediate to-dos</p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-teal-950">Privacy and product boundaries</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-teal-800">
            {boundaries.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-teal-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-teal-950">Clear disclaimer</h3>
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
            {disclaimer}
          </p>
        </article>
      </section>

      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-teal-950">Pricing preview</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {plans.map(([name, price, detail, planned]) => (
            <article key={name} className="rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-teal-950">{name}</h3>
                {planned ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-900">
                    planned
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-3xl font-semibold text-teal-900">{price}</p>
              <p className="mt-2 text-sm text-teal-700">{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-teal-950">FAQ</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {faq.map(([question, answer]) => (
            <article key={question} className="rounded-2xl bg-[#f4f1ea] p-4">
              <h3 className="font-semibold text-teal-900">{question}</h3>
              <p className="mt-2 text-sm text-teal-800">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-teal-100 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-teal-950">
          Build the binder before the next appointment.
        </h2>
        <p className="mt-3 text-teal-700">
          Start local in minutes, keep everyone aligned, and print a handoff packet when needed.
        </p>
        <div className="mt-4">
          <Link
            href="/dashboard"
            className="rounded-full bg-teal-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-800"
          >
            Create your first care binder
          </Link>
        </div>
      </section>
    </main>
  );
}
