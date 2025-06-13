/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { joinCallFormSchema } from "~/schemas/call";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { extractId } from "~/lib/extract-id";
import { Icons } from "../ui/icons";
import { Button } from "../ui/button";
import {
  Dialog
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";

type FormData = z.infer<typeof joinCallFormSchema>;

export default function JoinCallDialog( ) {
  const [isJoinCallLoading, setIsJoinCallLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
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
        callName: callName,
        username: data.name,
      }),
    }).catch((error) => {
      console.error("Error during fetch:", error);
    });

    if (!response?.ok) {
      setIsJoinCallLoading(false);
      return toast({
        title: "Something went wrong.",
        description: "This call cannot be joined. Please try again.",
        variant: "destructive",
      });
    }

    setIsJoinCallLoading(false);
    router.push(`/call/${callName}`);
  }

  return (
    <Dialog>

      <form className="flex flex-col items-center justify-center gap-4" onSubmit={handleSubmit(joinCall)}>
        <div className="mt-4 w-full space-y-1">
          <Input
            {...register("meetingLink")}
            type="url"
            placeholder="Meeting link or ID"
            className="w-full"
            id="meeting-link"
          />
          {errors.meetingLink &&
            typeof errors.meetingLink.message === "string" && (
              <p className="mb-4 mt-2 text-sm text-red-500">
                {errors.meetingLink.message}
              </p>
            )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-md px-12 font-normal"
          disabled={isJoinCallLoading}
        >
          {isJoinCallLoading && (
            <Icons.spinner
              color="#fff"
              width={24}
              height={14}
              className="mr-2"
            />
          )}
          Join Call
        </Button>
      </form>
    </Dialog>
  );
}
