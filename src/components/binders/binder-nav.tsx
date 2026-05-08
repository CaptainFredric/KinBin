"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  ["", "Overview"],
  ["/notes", "Notes"],
  ["/medications", "Medications"],
  ["/appointments", "Appointments"],
  ["/tasks", "Tasks"],
  ["/documents", "Documents"],
  ["/handoff", "Handoff"],
] as const;

export function BinderNav({ binderId }: { binderId: string }) {
  const pathname = usePathname();
  const base = `/binders/${binderId}`;

  return (
    <nav className="flex flex-wrap gap-2 border-b border-teal-100 pb-4">
      {tabs.map(([path, label]) => {
        const href = `${base}${path}`;
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              active ? "bg-teal-900 text-white" : "bg-teal-50 text-teal-900 hover:bg-teal-100"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
