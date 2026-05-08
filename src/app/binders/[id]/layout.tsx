export function generateStaticParams() {
  return [{ id: "demo-binder" }];
}

export default function BinderIdLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}