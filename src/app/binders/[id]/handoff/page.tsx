"use client";

import { BinderShell } from "@/components/binders/binder-shell";
import { useBinder } from "@/components/binders/use-binder";
import { disclaimer, downloadHandoffPdf, getMissingInfoItems, makeHandoffText } from "@/lib/handoff";

export default function HandoffPage({ params }: { params: { id: string } }) {
  const { binder, loaded, saveHandoffPacket } = useBinder(params.id);

  if (!loaded) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading...</main>;
  if (!binder) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Binder not found.</main>;

  const handoff = makeHandoffText(binder);
  const missing = getMissingInfoItems(binder);

  return (
    <BinderShell
      binderId={binder.id}
      title={`${binder.profile.fullName} · Handoff packet`}
      subtitle="Printable packet for appointments and caregiver handoffs"
    >
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        {missing.length > 0 ? (
          <>
            <p className="font-medium">Fill these before printing:</p>
            <ul className="mt-2 list-disc pl-5">
              {missing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>All key handoff details are present.</p>
        )}
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            downloadHandoffPdf(binder);
            saveHandoffPacket(binder.id, "pdf-export");
          }}
          className="rounded-full bg-teal-900 px-4 py-2 text-white"
        >
          Download handoff PDF
        </button>
        <button
          type="button"
          onClick={() => {
            window.print();
            saveHandoffPacket(binder.id, "print-view");
          }}
          className="rounded-full border border-teal-200 px-4 py-2"
        >
          Print handoff packet
        </button>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">Emergency profile</h2>
        <p className="mt-1 text-xs uppercase tracking-wide text-teal-500">Generated: {handoff.generatedAt}</p>
        <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-[#f4f1ea] p-3 text-sm text-teal-800">
          {handoff.profile}
        </pre>
        <h3 className="mt-5 text-xl font-semibold">Current medications</h3>
        <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-[#f4f1ea] p-3 text-sm text-teal-800">
          {handoff.medications}
        </pre>
        <h3 className="mt-5 text-xl font-semibold">Upcoming appointments</h3>
        <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-[#f4f1ea] p-3 text-sm text-teal-800">
          {handoff.appointments}
        </pre>
        <h3 className="mt-5 text-xl font-semibold">Recent notes</h3>
        <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-[#f4f1ea] p-3 text-sm text-teal-800">
          {handoff.notes}
        </pre>
        <h3 className="mt-5 text-xl font-semibold">Open tasks</h3>
        <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-[#f4f1ea] p-3 text-sm text-teal-800">
          {handoff.tasks}
        </pre>
        <h3 className="mt-5 text-xl font-semibold">Document checklist</h3>
        <pre className="mt-2 overflow-auto whitespace-pre-wrap rounded-xl bg-[#f4f1ea] p-3 text-sm text-teal-800">
          {handoff.documents}
        </pre>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          {disclaimer}
        </p>
      </section>
    </BinderShell>
  );
}
