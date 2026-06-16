import { redirect } from "next/navigation";

import PerPageDropdown from "~/components/call/call-history-per-page-dropdown";
import DeleteCallActions from "~/components/call/delete-call-actions";
import CallHistoryPagination from "~/components/call/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getCurrentUser } from "~/lib/session";
import { cn } from "~/lib/utils";
import { prisma } from "~/server/db";

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; per_page: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const user = await getCurrentUser();

  if (
    resolvedSearchParams.page === undefined ||
    resolvedSearchParams.per_page === undefined
  ) {
    redirect("/calls/history?page=1&per_page=10");
  }

  if (!user) redirect("/login");

  const { page, per_page } = resolvedSearchParams;

  const calls = await prisma.call.findMany({
    where: { userId: user.id },
    include: { participants: true },
    orderBy: { startTime: "desc" },
    skip: (parseInt(page) - 1) * parseInt(per_page),
    take: parseInt(per_page, 10),
  });

  const totalCalls = await prisma.call.count({ where: { userId: user.id } });

  const perPageOptions = [10, 20, 30];
  const selectedPerPage = parseInt(per_page, 10);
  const totalPages = Math.ceil(totalCalls / selectedPerPage);

  return (
    <div className="container mx-auto mb-16 max-w-5xl px-4 pt-8 md:pt-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Call history
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalCalls === 0
            ? "No calls yet. Start one from the home screen."
            : `${totalCalls} call${totalCalls === 1 ? "" : "s"} total`}
        </p>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5 font-medium">Name</TableHead>
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Started</TableHead>
              <TableHead className="font-medium">Ended</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.length > 0 ? (
              calls.map((call) => (
                <TableRow key={call.id} className="hover:bg-accent/40">
                  <TableCell className={cn("pl-5 font-medium")}>
                    {call.title}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(call.startTime).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(call.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {call.endTime
                      ? new Date(call.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    <DeleteCallActions callId={call.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  No calls to show
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <PerPageDropdown
          options={perPageOptions}
          page={page}
          selectedPerPage={selectedPerPage}
          totalCalls={totalCalls}
        />
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <CallHistoryPagination
            page={page}
            per_page={per_page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}