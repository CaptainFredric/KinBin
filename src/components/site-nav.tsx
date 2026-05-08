"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/", "Home"],
  ["/dashboard", "Dashboard"],
  ["/demo", "Demo"],
  ["/pricing", "Pricing"],
  ["/settings", "Settings"],
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-teal-100 bg-[#f7f5f1]">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-teal-900">
          CareBinder
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-3 py-1.5 transition ${
                pathname === href || (href !== "/" && pathname.startsWith(href))
                  ? "bg-teal-900 text-white"
                  : "text-teal-900 hover:bg-teal-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
