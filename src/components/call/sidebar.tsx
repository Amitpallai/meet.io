"use client";

import {
  selectPeers,
  selectLocalPeer,
  selectMessagesMap,
  useHMSStore,
  useHMSActions,
} from "@100mslive/react-sdk";
import { Send, X, MessageSquare, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { HMSMessage } from "@100mslive/hms-video-store";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "~/components/ui/use-toast";
import { ParticipantItem } from "./participant-item";

interface SidebarProps {
  isOpen: boolean;
  onToggleSidebar: (tab: "chat" | "participants" | null) => void;
  activeTab: "chat" | "participants";
}

export default function Sidebar({ isOpen, onToggleSidebar, activeTab }: SidebarProps) {
  const peers = useHMSStore(selectPeers);
  const localPeer = useHMSStore(selectLocalPeer);
  const messagesMap = useHMSStore(selectMessagesMap);
  const messages = Object.values(messagesMap);
  const hmsActions = useHMSActions();
  const { toast } = useToast();

  const [message, setMessage] = useState("");
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab !== "chat" && messages.length > 0) setHasUnreadMessages(true);
    else setHasUnreadMessages(false);
  }, [messages, activeTab]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (activeTab === "chat") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTab]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      await hmsActions.sendBroadcastMessage(message);
      setMessage("");
    } catch {
      toast({ title: "Couldn't send message", variant: "destructive" });
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const getSenderName = (msg: HMSMessage) => {
    if (!msg.sender) return "Unknown";
    if (msg.sender === localPeer?.id) return "You";
    return peers.find((p) => p.id === msg.sender)?.name ?? "Unknown";
  };

  return (
    <div
      className={`fixed right-0 top-0 z-10 flex h-full w-80 flex-col border-l border-neutral-800 bg-neutral-950 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-neutral-900 p-1">
          <button
            onClick={() => {
              onToggleSidebar("chat");
              setHasUnreadMessages(false);
            }}
            className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "chat"
                ? "bg-neutral-700 text-white"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Chat
            {hasUnreadMessages && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-500" />
            )}
          </button>
          <button
            onClick={() => onToggleSidebar("participants")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "participants"
                ? "bg-neutral-700 text-white"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            People
            <span className="ml-0.5 rounded-full bg-neutral-700 px-1.5 py-0.5 text-[10px] text-neutral-300">
              {peers.length}
            </span>
          </button>
        </div>

        {/* Close */}
        <button
          onClick={() => onToggleSidebar(null)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {activeTab === "chat" ? (
          <>
            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 [scrollbar-width:none]">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-neutral-500">No messages yet</p>
                </div>
              ) : (
                messages.map((msg: HMSMessage, i: number) => {
                  const isLocal = msg.sender === localPeer?.id;
                  return (
                    <div key={i} className={`flex flex-col gap-1 ${isLocal ? "items-end" : "items-start"}`}>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-medium ${isLocal ? "text-blue-400" : "text-neutral-300"}`}>
                          {getSenderName(msg)}
                        </span>
                        <span className="text-[10px] text-neutral-600">{formatTime(msg.time)}</span>
                      </div>
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                          isLocal
                            ? "rounded-tr-sm bg-blue-600 text-white"
                            : "rounded-tl-sm bg-neutral-800 text-neutral-100"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-neutral-800 p-3">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Message everyone…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && void handleSendMessage()}
                  className="flex-1 border-neutral-700 bg-neutral-900 text-sm text-white placeholder:text-neutral-500 focus-visible:ring-neutral-600"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={!message.trim()}
                  onClick={() => void handleSendMessage()}
                  className="h-9 w-9 rounded-md p-0 text-neutral-400 hover:bg-neutral-800 hover:text-white disabled:opacity-30"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto px-3 py-3 [scrollbar-width:none]">
            <div className="space-y-1">
              {peers.map((peer) => (
                <ParticipantItem
                  key={peer.id}
                  peer={peer}
                  onToggleAudio={() => undefined}
                  onToggleVideo={() => undefined}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}