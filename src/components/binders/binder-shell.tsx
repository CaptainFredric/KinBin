"use client";

import Link from "next/link";

import { BinderNav } from "@/components/binders/binder-nav";

export function BinderShell({
  binderId,
  title,
  subtitle,
  children,
}: {
  binderId: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <Link href="/dashboard" className="text-sm text-teal-700 underline-offset-2 hover:underline">
        Back to dashboard
      </Link>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-teal-950">{title}</h1>
        {subtitle ? <p className="text-sm text-teal-700">{subtitle}</p> : null}
      </div>
      <BinderNav binderId={binderId} />
      {children}
    </main>
  );
}
