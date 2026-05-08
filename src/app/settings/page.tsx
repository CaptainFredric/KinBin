export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <div className="mt-6 space-y-4">
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Account</h2>
          <p className="mt-2 text-sm text-teal-700">Supabase auth wiring can be added later.</p>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Privacy</h2>
          <p className="mt-2 text-sm text-teal-700">Cloud sync is optional. Local demo data stays in browser storage.</p>
        </section>
      </div>
    </main>
  );
}
