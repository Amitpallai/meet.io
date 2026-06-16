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
    <header className="fixed top-4 left-1/2 z-50 h-16 w-[95%] max-w-[1400px] -translate-x-1/2 rounded-xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 backdrop-blur-md">
      <div className="flex h-full items-center justify-between px-6">
        <Link href={`${user ? "/calls" : "/"}`} className="flex gap-2 items-center">
          <VideoIcon className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Meet.io</span>
        </Link>
        <nav className="font-normal text-primary flex items-center gap-2">{children}</nav>
      </div>
    </header>
  );
}