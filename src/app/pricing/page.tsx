const plans = [
  ["Free", "$0", "One local care binder"],
  ["Family Plus", "$8/month", "Cloud sync, family sharing, PDF packets"],
  ["Care Team", "$19/month", "Larger family/helper coordination"],
  ["Professional", "$99+/month", "Agencies, coordinators, elder-care teams"],
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-4xl font-semibold">Pricing</h1>
      <p className="mt-2 text-teal-700">Start free. Upgrade when your family needs sharing and exports.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {plans.map(([name, price, description]) => (
          <article key={name} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="mt-1 text-2xl">{price}</p>
            <p className="mt-2 text-sm text-teal-700">{description}</p>
            <button className="mt-4 rounded-full bg-teal-900 px-4 py-2 text-sm text-white">
              Choose plan
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
