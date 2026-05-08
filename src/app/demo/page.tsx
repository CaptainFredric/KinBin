"use client";

import Link from "next/link";

import { disclaimer, getMissingInfoItems, makeHandoffText } from "@/lib/handoff";
import { useCareBinders } from "@/store/use-care-binders";

export default function DemoPage() {
  const { binders, loaded } = useCareBinders();
  const binder = binders[0];

  if (!loaded || !binder) {
    return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading demo…</main>;
  }

  const handoff = makeHandoffText(binder);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-semibold">Interactive demo</h1>
      <p className="text-teal-700">Demo mode uses browser localStorage and realistic sample data.</p>

      <section className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2">
        <article>
          <h2 className="font-semibold">{binder.profile.fullName}</h2>
          <p className="text-sm text-teal-700">Doctor: {binder.profile.primaryDoctor}</p>
          <p className="text-sm text-teal-700">Allergies: {binder.profile.allergies}</p>
          <p className="mt-2 text-sm">Missing info items: {getMissingInfoItems(binder).length}</p>
          <Link
            href={`/binders/${binder.id}`}
            className="mt-3 inline-block rounded-full bg-teal-900 px-4 py-2 text-sm text-white"
          >
            Open this binder
          </Link>
        </article>
        <article className="rounded-xl bg-[#f7f5f1] p-4">
          <h3 className="font-medium">Handoff preview</h3>
          <pre className="mt-2 overflow-auto whitespace-pre-wrap text-xs">{handoff.medications}</pre>
        </article>
      </section>

      <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">{disclaimer}</p>
    </main>
  );
}
