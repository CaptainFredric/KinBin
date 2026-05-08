"use client";

import { useState } from "react";

import { BinderShell } from "@/components/binders/binder-shell";
import { useBinder } from "@/components/binders/use-binder";

const blankDocument = {
  id: "",
  fileName: "",
  fileType: "",
  category: "",
  notes: "",
};

export default function DocumentsPage({ params }: { params: { id: string } }) {
  const { binder, loaded, saveDocument, deleteDocument } = useBinder(params.id);
  const [draft, setDraft] = useState(blankDocument);

  if (!loaded) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Loading...</main>;
  if (!binder) return <main className="mx-auto w-full max-w-6xl px-6 py-10">Binder not found.</main>;

  return (
    <BinderShell
      binderId={binder.id}
      title={`${binder.profile.fullName} · Documents`}
      subtitle="Document metadata in local demo mode; storage path reserved for cloud mode."
    >
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold">Document vault</h2>
        <form
          className="mt-3 grid gap-3 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault();
            saveDocument(binder.id, { ...draft, careRecipientId: binder.profile.id });
            setDraft(blankDocument);
          }}
        >
          {[
            ["fileName", "File name"],
            ["fileType", "File type"],
            ["category", "Category"],
            ["notes", "Notes"],
          ].map(([field, label]) => (
            <label key={field} className="block text-sm">
              {label}
              <input
                value={draft[field as keyof typeof draft]}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, [field]: event.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-teal-200 p-2"
              />
            </label>
          ))}
          <button type="submit" className="md:col-span-2 rounded-full bg-teal-900 px-4 py-2 text-white">
            Save document metadata
          </button>
        </form>
      </section>

      <section className="space-y-3">
        {binder.documents.map((document) => (
          <article key={document.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">{document.fileName}</h3>
              <div className="flex gap-2 text-sm">
                <button
                  type="button"
                  onClick={() =>
                    setDraft({
                      id: document.id,
                      fileName: document.fileName,
                      fileType: document.fileType,
                      category: document.category,
                      notes: document.notes,
                    })
                  }
                  className="rounded-full border border-teal-200 px-3 py-1"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteDocument(binder.id, document.id)}
                  className="rounded-full border border-amber-300 px-3 py-1 text-amber-800"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-teal-700">{document.category}</p>
            <p className="text-sm text-teal-700">{document.notes}</p>
          </article>
        ))}
      </section>
    </BinderShell>
  );
}
