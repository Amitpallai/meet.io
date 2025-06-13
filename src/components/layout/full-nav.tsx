import Link from "next/link";
import React from "react";
import { VideoIcon } from "lucide-react";
import { getCurrentUser } from "~/lib/session";

export default async function FullNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <header className="w-screen">
      <div className="container mx-auto flex h-20 max-w-[1400px] items-center justify-between py-6">
        <Link href={`${user ? "/calls" : "/"}`} className="flex gap-2 items-center">
          <VideoIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Meet.io</span>
        </Link>
        <nav className="font-normal text-primary flex items-center gap-2">{children}</nav>
      </div>
    </header>
  );
}
