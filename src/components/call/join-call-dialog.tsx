/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { LogIn } from "lucide-react";

import { joinCallFormSchema } from "~/schemas/call";
import { extractId } from "~/lib/extract-id";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

type FormData = z.infer<typeof joinCallFormSchema>;

export default function JoinCallDialog() {
  const [open, setOpen] = useState(false);
  const [isJoinCallLoading, setIsJoinCallLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(joinCallFormSchema),
  });

  async function joinCall(data: FormData) {
    setIsJoinCallLoading(true);
    const callName = extractId(data.meetingLink);

    const response = await fetch(`/api/call/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callName,
        username: data.name,
      }),
    }).catch((error) => {
      console.error("Error during fetch:", error);
    });

    if (!response?.ok) {
      setIsJoinCallLoading(false);
      toast({
        title: "Couldn't join this call",
        description: "Check the meeting link or ID and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsJoinCallLoading(false);
    setOpen(false);
    reset();
    router.push(`/call/${callName}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border bg-card p-6 text-center transition-colors hover:border-primary/40 hover:bg-accent/40"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <LogIn className="h-5 w-5" />
          </span>
          <span className="text-sm font-medium">Join a call</span>
          <span className="text-xs text-muted-foreground">
            Enter a meeting link or ID
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Join a call</DialogTitle>
          <DialogDescription>
            Enter your name and the meeting link or ID you were sent.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(joinCall)}>
          <div className="space-y-1.5">
            <Label htmlFor="name">Your name</Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="e.g. Jane Cooper"
              autoComplete="name"
            />
            {errors.name && typeof errors.name.message === "string" && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="meeting-link">Meeting link or ID</Label>
            <Input
              {...register("meetingLink")}
              id="meeting-link"
              type="text"
              placeholder="https://meet.io/call/abc-defg-hij"
            />
            {errors.meetingLink &&
              typeof errors.meetingLink.message === "string" && (
                <p className="text-sm text-destructive">
                  {errors.meetingLink.message}
                </p>
              )}
          </div>

          <DialogFooter className="mt-2">
            <Button type="submit" className="w-full" disabled={isJoinCallLoading}>
              {isJoinCallLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Join call
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 