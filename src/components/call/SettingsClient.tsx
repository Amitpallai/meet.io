"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Bell, Shield, Palette, Trash2, LogOut, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { useToast } from "~/components/ui/use-toast";
import { cn } from "~/lib/utils";

type Section = "profile" | "notifications" | "appearance" | "security" | "danger";

const NAV: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: Camera },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "danger", label: "Danger zone", icon: Trash2 },
];

export default function SettingsClient({
  user,
}: {
  user: { name: string; email: string; image: string };
}) {
  const { toast } = useToast();
  const [active, setActive] = useState<Section>("profile");

  // Profile form
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);

  // Notifications
  const [notifCall, setNotifCall] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSound, setNotifSound] = useState(false);

  // Appearance
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSaveProfile = () => {
    // TODO: wire up API call
    toast({ 
      title: "Profile updated",
      description: "Your changes have been saved successfully."
    });
  };

  // Notification handlers
  const handleNotificationChange = (key: string, value: boolean) => {
    // This would be where you'd update the backend
 console.log(`${key} set to: ${String(value)}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 md:flex-row md:py-14">
      {/* Sidebar nav */}
      <nav className="flex flex-row gap-1 overflow-x-auto md:w-52 md:flex-col md:overflow-visible">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={cn(
              "flex flex-shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors md:w-full",
              active === id
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              id === "danger" && active !== "danger" && "text-destructive hover:text-destructive"
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span>{label}</span>
            <ChevronRight className="ml-auto hidden h-3.5 w-3.5 md:block" />
          </button>
        ))}
      </nav>

      {/* Content panel */}
      <div className="flex-1 rounded-xl border bg-card">
        {/* ── Profile ── */}
        {active === "profile" && (
          <div>
            <div className="border-b px-6 py-4">
              <h2 className="font-semibold">Profile</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Update your personal information.</p>
            </div>
            <div className="px-6 py-6 space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  {user.image ? (
                    <Image 
                      src={user.image} 
                      alt={name} 
                      width={64} 
                      height={64} 
                      className="h-16 w-16 rounded-full object-cover" 
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                      {initials}
                    </div>
                  )}
                  <button 
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow transition-transform hover:scale-105"
                    onClick={() => {
                      // TODO: Implement avatar upload
                      toast({ title: "Avatar upload", description: "Avatar upload will be available soon." });
                    }}
                  >
                    <Camera className="h-2.5 w-2.5" />
                  </button>
                </div>
                <div>
                  <p className="text-sm font-medium">{name || "Your name"}</p>
                  <p className="text-xs text-muted-foreground">{email}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="s-name">Full name</Label>
                  <Input 
                    id="s-name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Jane Cooper" 
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-email">Email</Label>
                  <Input id="s-email" value={email} disabled className="text-muted-foreground" />
                </div>
              </div>

              <Button onClick={handleSaveProfile} className="w-full sm:w-auto">
                Save changes
              </Button>
            </div>
          </div>
        )}

        {/* ── Notifications ── */}
        {active === "notifications" && (
          <div>
            <div className="border-b px-6 py-4">
              <h2 className="font-semibold">Notifications</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Choose what you get notified about.</p>
            </div>
            <div className="divide-y px-6">
              {[
                { 
                  label: "Incoming call alerts", 
                  desc: "Get notified when someone starts a call with you.", 
                  value: notifCall, 
                  set: setNotifCall,
                  key: "callAlerts"
                },
                { 
                  label: "Email summaries", 
                  desc: "Receive a daily summary of your call activity.", 
                  value: notifEmail, 
                  set: setNotifEmail,
                  key: "emailSummaries"
                },
                { 
                  label: "Sound effects", 
                  desc: "Play sounds for join/leave and incoming messages.", 
                  value: notifSound, 
                  set: setNotifSound,
                  key: "soundEffects"
                },
              ].map(({ label, desc, value, set, key }) => (
                <div key={label} className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Switch 
                    checked={value} 
                    onCheckedChange={(checked) => {
                      set(checked);
                      handleNotificationChange(key, checked);
                    }} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Appearance ── */}
        {active === "appearance" && (
          <div>
            <div className="border-b px-6 py-4">
              <h2 className="font-semibold">Appearance</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Customize how Meet.io looks for you.</p>
            </div>
            <div className="px-6 py-6 space-y-3">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-3">
                {(["system", "light", "dark"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTheme(t);
                      // TODO: Apply theme change
                      console.log(`Theme changed to: ${t}`);
                    }}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors capitalize",
                      theme === t ? "border-primary bg-primary/5" : "border-border hover:bg-accent/40"
                    )}
                  >
                    <div className={cn(
                      "h-8 w-8 rounded-full border",
                      t === "light" ? "bg-white" : 
                      t === "dark" ? "bg-neutral-900" : 
                      "bg-gradient-to-br from-white to-neutral-900"
                    )} />
                    <span className="text-xs font-medium">{t}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Security ── */}
        {active === "security" && (
          <div>
            <div className="border-b px-6 py-4">
              <h2 className="font-semibold">Security</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Manage your password and sessions.</p>
            </div>
            <div className="divide-y px-6">
              <div className="py-5 space-y-3">
                <p className="text-sm font-medium">Change password</p>
                <div className="space-y-2 max-w-sm">
                  <Input type="password" placeholder="Current password" />
                  <Input type="password" placeholder="New password" />
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    // TODO: Implement password change
                    toast({ title: "Password updated successfully" });
                  }}
                >
                  Update password
                </Button>
              </div>
              <div className="flex items-center justify-between py-5">
                <div>
                  <p className="text-sm font-medium">Sign out everywhere</p>
                  <p className="text-xs text-muted-foreground">End all active sessions on all devices.</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1.5"
                  onClick={() => {
                    // TODO: Implement sign out all
                    toast({ 
                      title: "Signed out everywhere",
                      description: "All sessions have been terminated."
                    });
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out all
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ── Danger zone ── */}
        {active === "danger" && (
          <div>
            <div className="border-b px-6 py-4">
              <h2 className="font-semibold text-destructive">Danger zone</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Irreversible actions — proceed carefully.</p>
            </div>
            <div className="divide-y px-6">
              <div className="flex items-center justify-between py-5">
                <div>
                  <p className="text-sm font-medium">Delete call history</p>
                  <p className="text-xs text-muted-foreground">Permanently remove all of your past calls.</p>
                </div>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="gap-1.5"
                  onClick={() => {
                    // TODO: Implement delete history with confirmation
                    if (confirm("Are you sure you want to delete all call history? This action cannot be undone.")) {
                      toast({ 
                        title: "Call history deleted",
                        description: "All call history has been permanently removed."
                      });
                    }
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete history
                </Button>
              </div>
              <div className="flex items-center justify-between py-5">
                <div>
                  <p className="text-sm font-medium">Delete account</p>
                  <p className="text-xs text-muted-foreground">Permanently delete your account and all data.</p>
                </div>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="gap-1.5"
                  onClick={() => {
                    // TODO: Implement account deletion with confirmation
                    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
                    if (confirmDelete) {
                      const confirmAgain = confirm("This will permanently delete all your data. Are you absolutely sure?");
                      if (confirmAgain) {
                        toast({ 
                          title: "Account deleted",
                          description: "Your account has been permanently deleted."
                        });
                      }
                    }
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete account
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}