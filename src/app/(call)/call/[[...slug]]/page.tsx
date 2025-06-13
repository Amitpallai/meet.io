"use client";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Cookies from 'js-cookie';
import React from "react";
import CallFooter from "~/components/call/call-footer";
import Conference from "~/components/call/conference";
import Sidebar from "~/components/call/sidebar";
import { useParams, useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { type RoomCodeResponse } from "~/types/types";
import { extractId } from "~/lib/extract-id";
import { useToast } from "~/components/ui/use-toast";

export default function CallPage() {
    const params = useParams();
    const router = useRouter()
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const { toast } = useToast()
    const actions = useHMSActions();
    const roomName = Cookies.get("room-name");
    const roomId = Cookies.get("room-id");
    const unAuthUsername = Cookies.get("username");
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [sidebarTab, setSidebarTab] = React.useState<"chat" | "participants">("chat");

    const handleToggleSidebar = (tab: "chat" | "participants" | null) => {
        if (tab === null) {
            setIsSidebarOpen(false);
        } else if (isSidebarOpen && sidebarTab === tab) {
            setIsSidebarOpen(false);
        } else {
            setSidebarTab(tab);
            setIsSidebarOpen(true);
        }
    };

    const joinCall = React.useCallback(async () => {

        if (!roomId) {
            console.error("Room id is not defined");
            return;
        }

        try {
            const roomCodeResponse = await fetch(`/api/call/code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    callName: roomName ? roomName : params.slug,
                }),
            })

            if (roomCodeResponse?.ok) {

                // use room code to fetch auth token
                const codeResponse: RoomCodeResponse = await roomCodeResponse.json() as RoomCodeResponse;
                const roomCode = codeResponse.code;
                const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode })
                const session = await getSession();

                if (session && session.user.name) {
                    const userName = session.user.name;
                    await hmsActions.join({ userName, authToken });
                } else if (!session && unAuthUsername) {
                    await hmsActions.join({ userName: unAuthUsername, authToken });
                }
                else {
                    console.error("Session or user name is not defined");
                    toast({
                        title: "Something went wrong.",
                        description: "This call cannot joined. Please try again.",
                        variant: "destructive",
                    });
                    router.replace("/calls");
                }
            } else {
                throw new Error("Room code response not OK");
            }

        } catch (error) {
            console.error(error)
            toast({
                title: "Something went wrong.",
                description: "This call cannot be joined. Please try again.",
                variant: "destructive",
            })
            router.replace("/calls");
        }

    }, [hmsActions, toast, params.slug, router, roomName, roomId, unAuthUsername]);

    const leaveCall = React.useCallback(async () => {

        const response = await fetch(`/api/call/leave`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                callName: roomName ? roomName : extractId(params.slug as string),
                roomId: roomId,
            }),
        })

        if (!response.ok) {
            toast({
                title: "Something went wrong.",
                description: "Your call cannot be left. Please try again.",
                variant: "destructive",
            })
        }

        await actions.leave();

    }, [roomName, params.slug, roomId, actions, toast]);

    React.useEffect(() => {
        void joinCall();
    }, [joinCall]);

    React.useEffect(() => {
        window.onunload = () => {
            if (isConnected) {
                void leaveCall();
            }
        };

    }, [isConnected, leaveCall]);

    return (
        <section className="flex w-full h-screen overflow-hidden text-gray-200">
            <div className={`flex-1 flex flex-col min-h-0 ${isSidebarOpen ? 'pr-96' : 'pr-0'} transition-all duration-300 ease-in-out`}>
                <div className="flex-1 min-h-0 mb-2">
                    <Conference />
                </div>
                <CallFooter onToggleSidebar={handleToggleSidebar} isSidebarOpen={isSidebarOpen} />
            </div>
            <Sidebar isOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} activeTab={sidebarTab} />
        </section>
    )
}

