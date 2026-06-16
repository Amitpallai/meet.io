/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useHMSActions } from "@100mslive/react-sdk";
import { PhoneOff, RotateCcw, Home } from "lucide-react";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export default function RejoinCall({
  roomName,
  stayOnScreenHandler,
  roomId,
}: {
  roomName: string;
  stayOnScreenHandler: () => void;
  roomId: string;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const actions = useHMSActions();
  const [secondsLeft, setSecondsLeft] = React.useState(30);

  const leaveCall = React.useCallback(async () => {
    const response = await fetch(`/api/call/leave`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callName: roomName, roomId }),
    });
    if (!response.ok) {
      toast({
        title: "Couldn't leave the call",
        description: "Please try again.",
        variant: "destructive",
      });
    }
    await actions.leave();
  }, [roomName, roomId, toast, actions]);

  React.useEffect(() => {
    if (secondsLeft > 0) {
      const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
      return () => clearTimeout(id);
    } else {
      void leaveCall();
      router.replace("/calls");
    }
  }, [leaveCall, router, secondsLeft]);

  // SVG circle countdown
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (secondsLeft / 30);

  return (
    <section className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      {/* Countdown pill */}
      <div className="absolute left-5 top-5 flex items-center gap-2.5 rounded-full border border-border bg-card px-3 py-2 shadow-sm">
        <svg width="40" height="40" viewBox="0 0 48 48" className="-rotate-90">
          <circle cx="24" cy="24" r={radius} fill="none" stroke="currentColor" strokeWidth="3.5" className="text-muted/20" />
          <circle
            cx="24" cy="24" r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - offset}
            className="text-primary transition-all duration-1000"
          />
          <text
            x="24" y="24"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="11"
            fill="currentColor"
            className="rotate-90 fill-foreground font-medium"
            transform="rotate(90, 24, 24)"
          >
            {secondsLeft}
          </text>
        </svg>
        <span className="text-sm text-muted-foreground">Redirecting…</span>
      </div>

      {/* Main card */}
      <div className="flex w-full max-w-sm flex-col items-center gap-8 px-6 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <PhoneOff className="h-7 w-7 text-destructive" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight">You left the call</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Changed your mind? You can rejoin anytime.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2.5">
          <Button
            size="lg"
            onClick={() => {
              stayOnScreenHandler();
              window.location.reload();
            }}
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Rejoin call
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={async () => {
              await leaveCall();
              router.replace("/calls");
            }}
            className="w-full gap-2"
          >
            <Home className="h-4 w-4" />
            Go home
          </Button>
        </div>
      </div>
    </section>
  );
}