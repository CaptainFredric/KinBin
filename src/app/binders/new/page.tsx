"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { binderSchema, type BinderFormValues } from "@/lib/validators";
import { useCareBinders } from "@/store/use-care-binders";

export default function NewBinderPage() {
  const router = useRouter();
  const { createBinder } = useCareBinders();
  const form = useForm<BinderFormValues>({
    resolver: zodResolver(binderSchema),
    defaultValues: { fullName: "" },
  });

  const onSubmit = form.handleSubmit((values) => {
    const binder = createBinder(values.fullName.trim());
    router.push(`/binders/${binder.id}`);
  });

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Create care recipient</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium">
          Full name
          <input
            {...form.register("fullName")}
            className="mt-1 w-full rounded-lg border border-teal-200 p-2"
            placeholder="e.g., Patricia Monroe"
          />
        </label>
        {form.formState.errors.fullName ? (
          <p className="text-sm text-amber-800">{form.formState.errors.fullName.message}</p>
        ) : null}
        <button type="submit" className="rounded-full bg-teal-900 px-4 py-2 text-white">
          Create binder
        </button>
      </form>
    </main>
  );
}
