"use client"

import { selectPeers, useHMSStore, useHMSActions, selectMessagesMap, selectLocalPeer } from "@100mslive/react-sdk";
import { Send,PanelLeftOpen} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { HMSMessage } from "@100mslive/hms-video-store";
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
    const [message, setMessage] = useState("");
    const hmsActions = useHMSActions();
    const messagesMap = useHMSStore(selectMessagesMap);
    const messages = Object.values(messagesMap);
    const { toast } = useToast();
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

    // Track unread messages
    useEffect(() => {
        if (activeTab !== "chat" && messages.length > 0) {
            setHasUnreadMessages(true);
        } else {
            setHasUnreadMessages(false);
        }
    }, [messages, activeTab]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            try {
                await hmsActions.sendBroadcastMessage(message);
                setMessage("");
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to send message. Please try again.",
                    variant: "destructive",
                });
            }
        }
    };

    const handleToggleAudio = () => {
        // This function is passed to ParticipantItem, which handles toggling
        // No direct action here, as ParticipantItem handles its own internal state/HMS actions
    };

    const handleToggleVideo = () => {
        // This function is passed to ParticipantItem, which handles toggling
        // No direct action here, as ParticipantItem handles its own internal state/HMS actions
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getSenderName = (msg: HMSMessage) => {
        if (!msg.sender) return "Unknown User";
        if (msg.sender === localPeer?.id) return "You";
        const peer = peers.find(p => p.id === msg.sender);
        return peer ? peer.name : "Unknown User";
    };

    return (
        <div
            className={`w-96 h-full bg-neutral-900 border-l border-neutral-800 flex flex-col fixed p-4 right-0 top-0 z-10  transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full z-[10000]'
                }`}
        >

            <div className="relative flex items-center justify-between mb-4 gap-2">
                <Button 
                          size="sm"
                          variant="ghost" 
                          onClick={() => onToggleSidebar("participants")}
                          className="rounded-md py-6 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                        >
                            <PanelLeftOpen  className="h-5 w-5" />
                        </Button>   
                <div className="flex rounded-lg p-1 w-full bg-neutral-800">
                    <Button
                        variant="ghost"
                        className={`flex-1 text-base text-sm font-medium rounded-md py-2 relative  ${activeTab === "chat" ? "bg-neutral-700 text-white" : "text-neutral-400"}`}
                        onClick={() => {
                            onToggleSidebar("chat");
                            setHasUnreadMessages(false);
                        }}
                    >
                        Chat
                        {hasUnreadMessages && (
                            <span className=" bg-red-500 rounded-full"></span>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        className={`flex-1 text-base text-sm font-medium rounded-md py-2 ${activeTab === "participants" ? "bg-neutral-700 text-white" : "text-neutral-400"}`}
                        onClick={() => onToggleSidebar("participants")}
                    >
                        Participants ({peers.length})
                    </Button>
                </div>

            </div>

            <div className="flex-1 overflow-y-auto pb-4 no-scrollbar">
                {activeTab === "chat" ? (
                    <div className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto mb-4 space-y-4 no-scrollbar">
                            {messages.map((msg: HMSMessage, index: number) => {
                                const senderName = getSenderName(msg);
                                const isLocalSender = msg.sender === localPeer?.id;
                                return (
                                    <div key={index} className={`flex ${isLocalSender ? 'justify-end' : 'justify-start'} w-full`}>
                                        <div className={`flex flex-col max-w-[80%] p-2 ${isLocalSender ? 'bg-neutral-800 text-gray-100 self-end rounded-lg rounded-br-none justify-center' : 'bg-gray-100 text-gray-800 self-start rounded-lg rounded-bl-none justify-end'}`}>
                                            <div className={`text-xs  flex ${isLocalSender ? 'justify-end' : 'justify-start'} w-full`}>
                                                <span className={`font-semibold ${isLocalSender ? 'text-blue-700' : 'text-gray-800'}`}>
                                                    {senderName}
                                                </span>
                                                <span className="text-gray-500 ml-2 text-xs">{formatTime(msg.time)}</span>
                                            </div>
                                            <div className={`text-sm ${isLocalSender ? 'text-end' : 'text-start'}`} >
                                                {msg.message}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="flex gap-2 items-center">

                            <Input
                                placeholder="Send a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && void handleSendMessage()}
                                className="flex-1 bg-neutral-800 border-neutral-700 text-white px-4 py-2 rounded-md"
                            />
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => void handleSendMessage()}
                                className="rounded-md p-2 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {peers.map((peer) => (
                            <ParticipantItem
                                key={peer.id}
                                peer={peer}
                                onToggleAudio={handleToggleAudio}
                                onToggleVideo={handleToggleVideo}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 