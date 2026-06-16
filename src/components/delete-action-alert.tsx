"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Icons } from "~/components/ui/icons";
import { toast } from "./ui/use-toast";

interface ReturnData {
  success: boolean;
  error?: string;
}

export default function DeleteActionAlert({
  showDeleteAlert,
  setShowDeleteAlert,
  callId,
  title,
  description,
}: {
  showDeleteAlert: boolean;
  setShowDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  callId: string;
  description: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  async function handleDeleteCall() {
    try {
      const response = await fetch("/api/call/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callId, path: pathname }),
      });

      const data: ReturnData = (await response.json()) as ReturnData;
      if (!data.success) throw new Error(data.error);

      toast({ title: "Call deleted" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Couldn't delete this call",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive"
            onClick={() =>
              startTransition(async () => {
                await handleDeleteCall();
                router.refresh();
              })
            }
          >
            {isPending ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}