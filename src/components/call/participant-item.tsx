import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import {
  useHMSStore,
  selectIsPeerAudioEnabled,
  selectIsPeerVideoEnabled,
} from "@100mslive/react-sdk";
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
    <div className="flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-neutral-900">
      {/* Avatar */}
      {peer.userImage ? (
        <Image
          src={peer.userImage}
          alt={peer.name}
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 text-sm font-medium text-neutral-200">
          {peer.name?.[0]?.toUpperCase() ?? "?"}
        </div>
      )}

      {/* Name */}
      <span className="flex-1 truncate text-sm text-neutral-200">
        {peer.name}
        {peer.isLocal && (
          <span className="ml-1.5 text-xs text-neutral-500">(you)</span>
        )}
      </span>

      {/* Media indicators */}
      <div className="flex items-center gap-1.5">
        {isAudioEnabled ? (
          <Mic className="h-3.5 w-3.5 text-neutral-400" />
        ) : (
          <MicOff className="h-3.5 w-3.5 text-red-500" />
        )}
        {isVideoEnabled ? (
          <Video className="h-3.5 w-3.5 text-neutral-400" />
        ) : (
          <VideoOff className="h-3.5 w-3.5 text-red-500" />
        )}
      </div>
    </div>
  );
}