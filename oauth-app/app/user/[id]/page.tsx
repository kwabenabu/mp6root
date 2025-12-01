"use client";

import { useParams } from "next/navigation";

export default function UserPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <section className="mx-auto max-w-2xl space-y-4 rounded-2xl bg-white p-10 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">User ID: {id}</h1>
      <p className="text-slate-600">
        This dynamic route uses <code className="font-semibold">app/user/[id]/page.tsx</code> and
        the <code className="font-semibold">useParams</code> hook to read the current segment.
      </p>
    </section>
  );
}
