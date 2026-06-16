import { type Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsClient from "~/components/call/SettingsClient";
import { getCurrentUser } from "~/lib/session";

export const metadata: Metadata = {
  title: "Meet.io – Settings",
  description: "Manage your account settings and preferences.",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <SettingsClient user={{ name: user.name ?? "", email: user.email ?? "", image: user.image ?? "" }} />;
}