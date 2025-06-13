import { type Metadata } from "next";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Icons } from "~/components/ui/icons";
import { formatDate } from "~/lib/date";
import { getCurrentUser } from "~/lib/session";
import JoinCallDialog from "~/components/call/join-call-dialog";
import InviteParticipantsDialog from "~/components/call/invite-participants-dialog";
import CreateCallCard from "~/components/call/create-call-card";
import { Button } from "~/components/ui/button";


export const metadata: Metadata = {
  title: "Meet.io - Calls",
  description:
    "Access your Calls to manage and join your video calls seamlessly.",
};


export default async function CallsPage() {
  const user = await getCurrentUser();

  return (
    <div className="w-full">
      <section className="container mx-auto mb-8 max-w-[1400px] space-y-6 md:mb-12 lg:mb-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <div>
            <Badge variant="secondary">{formatDate(new Date())}</Badge>
            <h1 className="mt-4 px-4 text-4xl font-semibold leading-none md:px-8 md:text-5xl lg:text-[50px]">
              {`Welcome, ${user?.name?.split(' ')[0] ?? 'User'}`}
            </h1>
          </div>
        </div>
      </section>
      <section className="mx-auto space-y-6 ">
        <div className="mx-auto w-full max-w-[1200px] text-center px-1">
          <div className="grid w-full grid-cols-1 place-items-center gap-3 rounded-2xl border-2 bg-card/50 p-4 px-4 sm:grid-cols-3 md:px-8 lg:grid-cols-3 lg:gap-5">
            <CreateCallCard  />
            <JoinCallDialog />
            <InviteParticipantsDialog />
          </div>
          <Link
            href={{
              pathname: "/calls/history",
              query: { page: 1, per_page: 10 },
            }}
            className="inline-flex items-center"
          >
            <Button size="lg" className="mx-auto mt-8 rounded-full md:mt-12">
              View Call History
              <Icons.arrow
                width={14}
                height={14}
                className="ml-2 rotate-90 text-secondary"
              />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
