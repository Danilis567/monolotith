export default function BareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="ds-bare-root">{children}</div>;
}
