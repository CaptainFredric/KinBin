"use client";

import { useState } from "react";

import { BinderShell } from "@/components/binders/binder-shell";
import { useBinder } from "@/components/binders/use-binder";
import { TaskStatus } from "@/types/care";

const blankTask = {
  id: "",
  title: "",
  description: "",
  taskType: "Ride",
  status: "todo" as TaskStatus,
  assignedTo: "",
  dueAt: "",
};

const statuses: TaskStatus[] = ["todo", "claimed", "done", "blocked"];

export default function TasksPage({ params }: { params: { id: string } }) {
  const { binder, loaded, saveTask, deleteTask } = useBinder(params.id);
  const [draft, setDraft] = useState(blankTask);

  if (!loaded) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading...</main>;
  if (!binder) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Binder not found.</main>;

  return (
    <BinderShell binderId={binder.id} title={`${binder.profile.fullName} · Tasks`}>
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Task board</h2>
        <form
          className="mt-3 grid gap-3 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            saveTask(binder.id, { ...draft, careRecipientId: binder.profile.id });
            setDraft(blankTask);
          }}
        >
          <label className="block text-sm">
            Title
            <input
              value={draft.title}
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-teal-200 p-2"
            />
          </label>
          <label className="block text-sm">
            Type
            <input
              value={draft.taskType}
              onChange={(event) => setDraft((current) => ({ ...current, taskType: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-teal-200 p-2"
            />
          </label>
          <label className="block text-sm md:col-span-2">
            Description
            <input
              value={draft.description}
              onChange={(event) =>
                setDraft((current) => ({ ...current, description: event.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-teal-200 p-2"
            />
          </label>
          <label className="block text-sm">
            Assigned to
            <input
              value={draft.assignedTo}
              onChange={(event) =>
                setDraft((current) => ({ ...current, assignedTo: event.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-teal-200 p-2"
            />
          </label>
          <label className="block text-sm">
            Due date/time
            <input
              value={draft.dueAt}
              onChange={(event) => setDraft((current) => ({ ...current, dueAt: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-teal-200 p-2"
            />
          </label>
          <label className="block text-sm">
            Status
            <select
              value={draft.status}
              onChange={(event) =>
                setDraft((current) => ({ ...current, status: event.target.value as TaskStatus }))
              }
              className="mt-1 w-full rounded-lg border border-teal-200 p-2"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="rounded-full bg-teal-900 px-4 py-2 text-white">
            Save task
          </button>
        </form>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {binder.tasks.map((task) => (
          <article key={task.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{task.title}</h3>
              <span className="rounded-full bg-teal-100 px-2 py-1 text-xs">{task.status}</span>
            </div>
            <p className="mt-2 text-sm text-teal-800">{task.description}</p>
            <div className="mt-3 flex gap-2 text-sm">
              <button
                type="button"
                className="rounded-full border border-teal-200 px-3 py-1"
                onClick={() =>
                  setDraft({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    taskType: task.taskType,
                    status: task.status,
                    assignedTo: task.assignedTo,
                    dueAt: task.dueAt,
                  })
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-full border border-amber-300 px-3 py-1 text-amber-800"
                onClick={() => deleteTask(binder.id, task.id)}
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </section>
    </BinderShell>
  );
}
