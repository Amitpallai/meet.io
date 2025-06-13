/* eslint-disable @typescript-eslint/no-misused-promises */
"use client"; 
import * as React from 'react';
import { useAVToggle, useHMSActions, useHMSStore, selectPeers, selectMessagesMap } from '@100mslive/react-sdk';

import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { extractId } from '~/lib/extract-id';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import RejoinCall from './rejoin-call';
import { Mic, MicOff, Video, VideoOff, Monitor, MessageSquare, Users, ArrowLeftFromLine, MenuIcon } from 'lucide-react';

interface CallFooterProps {
  onToggleSidebar: (tab: "chat" | "participants" ) => void;
  isSidebarOpen: boolean;
}

export default function CallFooter({ onToggleSidebar, isSidebarOpen }: CallFooterProps) {
  const {
    isLocalAudioEnabled,
    isLocalVideoEnabled,
    toggleAudio,
    toggleVideo,
  } = useAVToggle();
  const actions = useHMSActions();
  const { toast } = useToast();
  const peers = useHMSStore(selectPeers);
  const messagesMap = useHMSStore(selectMessagesMap);
  const messages = Object.values(messagesMap);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React.useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = React.useState(false);
  const params = useParams();
  const roomId = Cookies.get("room-id");
  const roomName = Cookies.get("room-name");

  const [showRejoinPopup, setShowRejoinPopup] = React.useState(false);

  // Track unread messages
  React.useEffect(() => {
    if (!isSidebarOpen && messages.length > 0) {
      setHasUnreadMessages(true);
      // Hide notification after 5 seconds
      const timer = setTimeout(() => {
        setHasUnreadMessages(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setHasUnreadMessages(false);
    }
  }, [messages, isSidebarOpen]);

  React.useEffect(() => {
    async function enableScreenShare() {
      if(isScreenShareEnabled){
        try {
          await actions.setScreenShareEnabled(true);
        } catch (error) {
          return toast({
            title: "Something went wrong.",
            description: "Your screen cannot be shared. Please try again.",
            variant: "destructive",
          })
        }
      } else {
        try {
          await actions.setScreenShareEnabled(false);
        } catch (error) {
          return toast({
            title: "Something went wrong.",
            description: "There is an issue disabling screen share. Please try again.",
            variant: "destructive",
          })
        }
      }
    }

    void enableScreenShare();
    
  }, [actions, isScreenShareEnabled, toast])

  return (
    <footer className={`flex items-center mt-auto z-50 justify-between px-6 py-4 bg-transparent`}>
      <div className="flex items-center gap-2">
        <Button 
          size="sm"
          variant="ghost" 
          onClick={toggleAudio}
          className="rounded-md p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
        >
          {
            isLocalAudioEnabled ? 
            <Mic className="h-5 w-5"/> 
            : <MicOff className="h-5 w-5"/>
          }
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={toggleVideo}
          className="rounded-md p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
        >
          {
            isLocalVideoEnabled ? 
            <Video className="h-5 w-5"/> 
            : <VideoOff className="h-5 w-5"/>
          }
        </Button>
       
      </div>

      <div className="flex items-center gap-2">
        <Button 
          size="sm"
          variant="ghost" 
          onClick={() => setIsScreenShareEnabled(prev => !prev)}
          className="rounded-md p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
        >
          <Monitor className="h-5 w-5"/>
        </Button>
       
        <Button 
          size="sm"
          variant="ghost" 
          onClick={() => {
            setShowRejoinPopup(true)
          }}
          className="rounded-md p-2 bg-red-500 text-white hover:bg-red-600"
        >
          <ArrowLeftFromLine className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          size="sm"
          variant="ghost" 
          onClick={() => {
            onToggleSidebar("chat");
            setHasUnreadMessages(false);
          }}
          className="rounded-md p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700 relative"
        >
          <MessageSquare className="h-5 w-5"/>
          {hasUnreadMessages && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={() => onToggleSidebar("participants")}
          className="rounded-md p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
        >
          <Users className="h-5 w-5"/> <span className="ml-1 text-sm">{peers.length}</span>
        </Button>
        <Button 
          size="sm"
          variant="ghost" 
          onClick={() => onToggleSidebar("participants")}
          className="rounded-md p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
        >
          <MenuIcon className="h-5 w-5"/>
        </Button>
      </div>
      {
        showRejoinPopup &&
        <RejoinCall
          roomName={roomName ? roomName : extractId(params.slug as string)}
          stayOnScreenHandler={() => setShowRejoinPopup(false)}
          roomId={roomId as string}
        />
      }
    </footer>
  );
}