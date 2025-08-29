import { redirect } from "next/navigation";
import { getCurrentUser } from "~/lib/session";
import type { ReactNode } from "react";

type CallLayoutProps = {
  children: ReactNode;
  params: Promise<{ slug?: string[] }>;
};

export default async function CallLayout({ children, params }: CallLayoutProps) {
  const resolvedParams = await params;
  const user = await getCurrentUser();

  if (!user) {
    const slugPath = resolvedParams.slug?.join("/") ?? "";
    redirect(`/preview/${slugPath}`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 w-screen flex items-center">{children}</main>
    </div>
  );
}