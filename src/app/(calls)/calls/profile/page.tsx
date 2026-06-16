import { type Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Camera, Mail, Calendar, Phone, MapPin, Settings } from "lucide-react";

import { getCurrentUser } from "~/lib/session";
import { prisma } from "~/server/db";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { formatDate } from "~/lib/date";

export const metadata: Metadata = {
  title: "Meet.io – Profile",
  description: "Your account profile and call statistics.",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const [totalCalls, totalParticipations] = await Promise.all([
    prisma.call.count({ where: { userId: user.id } }),
    prisma.participant.count({ where: { userId: user.id } }),
  ]);

  const recentCalls = await prisma.call.findMany({
    where: { userId: user.id },
    orderBy: { startTime: "desc" },
    take: 5,
  });

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "?";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      {/* Header card */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border bg-card">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

        {/* Avatar + edit */}
        <div className="absolute left-6 top-14">
          <div className="relative">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? ""}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border-4 border-card object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-card bg-primary/10 text-xl font-semibold text-primary">
                {initials}
              </div>
            )}
            <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
              <Camera className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Settings link */}
        <div className="absolute right-4 top-4">
          <Link href="/settings">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
              <Settings className="h-3.5 w-3.5" />
              Edit profile
            </Button>
          </Link>
        </div>

        {/* Info */}
        <div className="pb-6 pl-32 pr-6 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-semibold">{user.name ?? "User"}</h1>
            <Badge variant="secondary" className="text-xs">Free plan</Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Stats */}
        {[
          { label: "Calls created", value: totalCalls },
          { label: "Calls joined", value: totalParticipations },
          { 
            label: "This month", 
            value: recentCalls.filter(c => new Date(c.startTime).getMonth() === new Date().getMonth()).length 
          },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center rounded-xl border bg-card px-4 py-6 text-center">
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="mt-1 text-xs text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="mt-4 rounded-xl border bg-card">
        <div className="border-b px-5 py-4">
          <h2 className="text-sm font-medium">Account details</h2>
        </div>
        <div className="divide-y">
          {[
            { icon: Mail, label: "Email", value: user.email ?? "—" },
            { icon: Calendar, label: "Member since", value: formatDate(new Date()) },
            { icon: Phone, label: "Phone", value: "Not set" },
            { icon: MapPin, label: "Location", value: "Not set" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-3.5">
              <Icon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <span className="w-28 flex-shrink-0 text-sm text-muted-foreground">{label}</span>
              <span className="text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent calls */}
      {recentCalls.length > 0 && (
        <div className="mt-4 rounded-xl border bg-card">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-sm font-medium">Recent calls</h2>
            <Link href="/calls/history?page=1&per_page=10" className="text-xs text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y">
            {recentCalls.map((call) => (
              <div key={call.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium">{call.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(call.startTime).toLocaleDateString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                    })}
                  </p>
                </div>
                <Badge variant={call.status === "ended" ? "secondary" : "default"} className="text-xs capitalize">
                  {call.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}