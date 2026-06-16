export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-full w-full flex-1 flex-col">
      {children}
    </section>
  );
}