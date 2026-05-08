export default function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Signup</h1>
      <p className="mt-2 text-sm text-teal-700">Create your free care binder account (stubbed in demo mode).</p>
      <form className="mt-6 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <label className="block text-sm">
          Full name
          <input className="mt-1 w-full rounded-lg border border-teal-200 p-2" type="text" />
        </label>
        <label className="block text-sm">
          Email
          <input className="mt-1 w-full rounded-lg border border-teal-200 p-2" type="email" />
        </label>
        <label className="block text-sm">
          Password
          <input className="mt-1 w-full rounded-lg border border-teal-200 p-2" type="password" />
        </label>
        <button className="rounded-full bg-teal-900 px-4 py-2 text-white" type="button">
          Create account
        </button>
      </form>
    </main>
  );
}
