/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-imports */
"use client";
import React from "react";
import { env } from "~/env.mjs";
import { useCallId } from "~/context/call-id-context";
import useClipboard from "~/hooks/use-copy";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { InviteIcon } from "@100mslive/react-icons";

export default function InviteParticipantsDialog() {
  const { toast } = useToast();
  const { callId } = useCallId();
  const { isCopied, copyToClipboard } = useClipboard();

  const handleCopy = () => {
    void (async () => {
      await copyToClipboard(`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`);
      if (isCopied) {
        toast({
          title: "Copied to clipboard",
          description: "The invite link has been copied to your clipboard.",
          variant: "default",
        });
      }
    })();
  };

  const handleShare = () => {
    void (async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Join my call',
            text: 'Join my call on Meet.io',
            url: `${env.NEXT_PUBLIC_APP_URL}/call/${callId}`,
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          await copyToClipboard(`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`);
          toast({
            title: "Copied to clipboard",
            description: "The invite link has been copied to your clipboard.",
            variant: "default",
          });
        }
      } catch (error) {
        toast({
          title: "Error sharing",
          description: "There was an error sharing the link.",
          variant: "destructive",
        });
      }
    })();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="bg-black dark:text-black dark:bg-white text-white">
         <InviteIcon/> Invite
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Invite participants</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Copy the link below and invite participants to this call.
          </DialogDescription>
        </DialogHeader>
        <div className="my-1 h-[1px] w-full bg-slate-500"></div>
        <DialogFooter className="w-full">
          <div className="mb-2 flex w-full flex-col items-end justify-between md:flex-row">
            <div className="w-full space-y-1">
              <Label htmlFor="link">Link</Label>
              <Input
                disabled
                placeholder={`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`}
                required
                id="link"
                className="w-full"
              />
            </div>
            
            <Button
              variant="secondary"
              size="lg"
              className="ml-auto mt-2 flex w-full rounded-md font-normal md:ml-2 md:mt-0 md:w-fit"
              onClick={handleCopy}
            >
              Copy
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="ml-2 mt-2 flex w-full rounded-md font-normal md:mt-0 md:w-fit"
              onClick={handleShare}
            >
              Share
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
