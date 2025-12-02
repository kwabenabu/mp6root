"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/user/123", label: "User Demo" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-3 text-sm font-medium">
      <span className="font-bold text-blue-700 mr-4">kwabena</span>
      {links.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded px-3 py-1 transition kwabena-link ${
              isActive ? "bg-blue-700 text-white" : "text-slate-600 hover:text-blue-700"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
