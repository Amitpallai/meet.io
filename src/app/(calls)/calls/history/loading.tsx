export default function CallHistoryLoading() {
  return (
    <div className="container mx-auto mb-16 max-w-5xl px-4 pt-8 md:pt-12">
      <div className="mb-8">
        <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
        <div className="mt-2 h-4 w-24 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="rounded-xl border bg-card">
        <div className="border-b px-5 py-3">
          <div className="flex gap-8">
            {["w-24", "w-20", "w-16", "w-16"].map((w, i) => (
              <div key={i} className={`h-3 ${w} animate-pulse rounded bg-muted`} />
            ))}
          </div>
        </div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-8 border-b px-5 py-4 last:border-0">
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}