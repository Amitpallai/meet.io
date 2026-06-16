/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Video, Play, Clock } from "lucide-react";

import { useCallId } from "~/context/call-id-context";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { env } from "~/env.mjs";
import useClipboard from "~/hooks/use-copy";

export default function CreateCallCard() {
  const { toast } = useToast();
  const router = useRouter();
  const { callId } = useCallId();
  const [showCallMenu, setShowCallMenu] = React.useState(false);
  const [showCallLinkDialog, setShowCallLinkDialog] = React.useState(false);
  const { isCopied, copyToClipboard } = useClipboard();
  const isCreated = React.useRef(false); // prevent double-create

  // Pre-create room on mount
  React.useEffect(() => {
    if (isCreated.current) return;
    isCreated.current = true;

    void fetch(`/api/call/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callName: callId, audio: true, video: true }),
    });
  }, [callId]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".call-menu")) {
        setShowCallMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const meetingUrl = `${env.NEXT_PUBLIC_APP_URL}/call/${callId}`;

  return (
    <div className="relative call-menu w-full h-full">
      <button
        type="button"
        className="group flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border bg-card p-6 text-center transition-colors hover:border-primary/40 hover:bg-accent/40"
        onClick={() => setShowCallMenu(!showCallMenu)}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <Video className="h-5 w-5" />
        </span>
        <span className="text-sm font-medium">New call</span>
        <span className="text-xs text-muted-foreground">
          Start or schedule a call
        </span>
      </button>

      {showCallMenu && (
        <div
          className={cn(
            "absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 overflow-hidden rounded-lg border bg-popover shadow-lg",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          <button
            className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent"
            onClick={() => {
              setShowCallMenu(false);
              router.push(`/call/${callId}`); // instant
            }}
          >
            <Play className="h-4 w-4 text-muted-foreground" />
            Start call now
          </button>
          <div className="h-px bg-border" />
          <button
            className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-accent"
            onClick={() => {
              setShowCallMenu(false);
              setShowCallLinkDialog(true); // instant
            }}
          >
            <Clock className="h-4 w-4 text-muted-foreground" />
            Schedule for later
          </button>
        </div>
      )}

      <Dialog open={showCallLinkDialog} onOpenChange={setShowCallLinkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Your call is ready</DialogTitle>
            <DialogDescription>
              Share this link with the people you want to invite. You'll also use it to join when the time comes.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-2 space-y-1.5">
            <Label htmlFor="call-link">Call link</Label>
            <Input
              id="call-link"
              readOnly
              value={meetingUrl}
              className="text-sm text-muted-foreground"
            />
          </div>

          <Button
            className="mt-4 w-full"
            onClick={async () => {
              await copyToClipboard(meetingUrl);
              toast({
                title: "Link copied",
                description: "Share it with your participants.",
              });
            }}
          >
            {isCopied ? "Copied!" : "Copy link"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}