/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { useCallId } from '~/context/call-id-context';
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { cn } from '~/lib/utils';
import { Icons } from '../ui/icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { env } from '~/env.mjs';
import useClipboard from '~/hooks/use-copy';

export default function CreateCallCard() {
  const { toast } = useToast()
  const router = useRouter()
  const { callId } = useCallId();
  const [showCallMenu, setShowCallMenu] = React.useState(false);
  const [showCallLinkDialog, setShowCallLinkDialog] = React.useState(false);
  const { isCopied, copyToClipboard } = useClipboard();

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.call-menu')) {
        setShowCallMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function createCall() {
    const response = await fetch(`/api/call/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        callName: callId,
        audio: true,
        video: true,
      }),
    })

    if (!response?.ok) {
      toast({
        title: "Error",
        description: "Failed to create call. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className='relative'>
      <div className="call-menu">
        <Button
          variant="ghost"
          className="w-full h-full bg-black dark:text-black dark:bg-white text-white"
          onClick={() => setShowCallMenu(!showCallMenu)}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Create Call
        </Button>

        {showCallMenu && (
          <div className={cn(
            "absolute right-0 mt-1 p-0 shadow-sm bg-black border rounded-sm min-w-[200px] z-50",
            "animate-in fade-in-0 zoom-in-95 text-white"
          )}>
            <button
              className="w-full px-2 py-1.5 text-sm text-left hover:bg-accent"
              onClick={async () => {
                await createCall();
                setShowCallMenu(false);
                router.push(`/call/${callId}`)
              }}
            >
              Start a call now
            </button>
            <div className="h-px bg-border " />
            <button
              className="w-full px-2 py-1.5 text-sm text-left hover:bg-accent"
              onClick={async () => {
                await createCall();
                setShowCallMenu(false);
                setShowCallLinkDialog(true);
              }}
            >
              Create call for later
            </button>
          </div>
        )}
      </div>

      <Dialog open={showCallLinkDialog} onOpenChange={setShowCallLinkDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Here is the link to your meeting</DialogTitle>
            <DialogDescription>
              This link is your gateway to connect with your guests at the appointed time. Make sure to copy and
              save this link, as you&nbsp;ll need it to join the call too.
            </DialogDescription>
          </DialogHeader>
          <div className='w-full flex flex-col justify-between items-end mb-2'>
            <div className='w-full space-y-1 my-4'>
              <Label htmlFor="link">Call Link</Label>
              <Input
                disabled
                placeholder={`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`}
                required
                id="link"
                className={cn('w-full border-ring')}
              />
            </div>
            <Button
              size='lg'
              className="rounded-md font-normal flex mt-2 md:mt-0 md:ml-2 ml-auto w-full md:w-fit"
              onClick={async () => {
                await copyToClipboard(`${env.NEXT_PUBLIC_APP_URL}/call/${callId}`);
                if (isCopied) {
                  toast({
                    title: 'Copied to clipboard',
                    description: 'The invite link has been copied to your clipboard.',
                    variant: 'default'
                  });
                }
              }}
            >
              Copy Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
