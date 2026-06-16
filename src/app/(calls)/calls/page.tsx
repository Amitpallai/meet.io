import { type Metadata } from "next";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

import { formatDate } from "~/lib/date";
import { getCurrentUser } from "~/lib/session";
import JoinCallDialog from "~/components/call/join-call-dialog";
import InviteParticipantsDialog from "~/components/call/invite-participants-dialog";
import CreateCallCard from "~/components/call/create-call-card";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "Meet.io – Calls",
  description: "Start, join, or schedule video calls.",
};

export default async function CallsPage() {
  const user = await getCurrentUser();
  const firstName = user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col items-center justify-center px-4 py-16">
      {/* Greeting */}
      <div className="mb-12 text-center">
        <p className="mb-1 text-sm font-medium text-muted-foreground">
          {formatDate(new Date())}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          Good to see you, {firstName}
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          What would you like to do today?
        </p>
      </div>

      {/* Action cards */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
        <CreateCallCard />
        <JoinCallDialog />
        <InviteParticipantsDialog />
      </div>

      {/* Call history link */}
      <Link
        href={{ pathname: "/calls/history", query: { page: 1, per_page: 10 } }}
        className="mt-12"
      >
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          View call history
          <ArrowDown className="h-3.5 w-3.5" />
        </Button>
      </Link>
    </div>
  );
}