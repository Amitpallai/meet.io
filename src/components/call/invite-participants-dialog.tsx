/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { Link2, Share2 } from "lucide-react";

import { env } from "~/env.mjs";
import { useCallId } from "~/context/call-id-context";
import useClipboard from "~/hooks/use-copy";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

export default function InviteParticipantsDialog() {
  const { toast } = useToast();
  const { callId } = useCallId();
  const { isCopied, copyToClipboard } = useClipboard();

  const meetingUrl = `${env.NEXT_PUBLIC_APP_URL}/call/${callId}`;

  const handleCopy = () => {
    void (async () => {
      await copyToClipboard(meetingUrl);
      toast({
        title: "Link copied",
        description: "Share it with anyone you want to invite.",
      });
    })();
  };

  const handleShare = () => {
    void (async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: "Join my call on Meet.io",
            text: "You've been invited to join a call.",
            url: meetingUrl,
          });
        } else {
          await copyToClipboard(meetingUrl);
          toast({
            title: "Link copied",
            description: "Share it with anyone you want to invite.",
          });
        }
      } catch {
        toast({
          title: "Couldn't share",
          description: "Try copying the link instead.",
          variant: "destructive",
        });
      }
    })();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border bg-card p-6 text-center transition-colors hover:border-primary/40 hover:bg-accent/40"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <Link2 className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium">Invite people</span>
          <span className="text-xs text-muted-foreground">
            Share a link to this call
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Invite participants</DialogTitle>
          <DialogDescription>
            Share this link with anyone you want to join the call.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-1.5">
          <Label htmlFor="invite-link">Meeting link</Label>
          <Input
            id="invite-link"
            readOnly
            value={meetingUrl}
            className="text-sm text-muted-foreground"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleCopy}>
            <Link2 className="h-4 w-4" />
            {isCopied ? "Copied!" : "Copy link"}
          </Button>
          <Button className="flex-1 gap-2" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}