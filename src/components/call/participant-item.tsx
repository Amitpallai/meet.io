import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import { useHMSStore, selectIsPeerAudioEnabled, selectIsPeerVideoEnabled } from "@100mslive/react-sdk";
import Image from "next/image";
interface ParticipantItemProps {
    peer: {
        id: string;
        name: string;
        isLocal: boolean;
        userImage?: string;
    };
    onToggleAudio: (peerId: string) => void;
    onToggleVideo: (peerId: string) => void;
}

export function ParticipantItem({ peer }: ParticipantItemProps) {
    const isAudioEnabled = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const isVideoEnabled = useHMSStore(selectIsPeerVideoEnabled(peer.id));

    return (
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-neutral-800">
            <div className="w-full flex items-center gap-2 justify-between">
                {peer.userImage ? (
                    <Image
                        src={peer.userImage}
                        alt={peer.name}
                        className="w-8 h-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center">
                        {peer.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                )}
                <div className="w-full flex justify-between ">
                    <span className="text-sm">{peer.name} {peer.isLocal ? "(You)" : ""}</span>
                    <div className="flex items-center gap-2 mt-1">
                        {isAudioEnabled ? (
                            <Mic className="h-3 w-3 text-green-500" />
                        ) : (
                            <MicOff className="h-3 w-3 text-red-500" />
                        )}
                        {isVideoEnabled ? (
                            <Video className="h-3 w-3 text-green-500" />
                        ) : (
                            <VideoOff className="h-3 w-3 text-red-500" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 