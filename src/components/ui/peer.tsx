"use client";
import {
  selectIsPeerVideoEnabled,
  selectIsPeerAudioEnabled,
  useHMSStore,
  useVideo,
} from "@100mslive/react-sdk";
import Avatar from "./avatar";
import { MicOff, Video, VideoOff } from "lucide-react";
import { useRef, useEffect } from "react";
import Image from "next/image";

interface PeerProps {
  peer: {
    videoTrack?: string | undefined;
    isLocal: boolean;
    name: string;
    id: string;
    userImage?: string;
  };
}

export default function Peer({ peer }: PeerProps) {
  const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));
  const isAudioOn = useHMSStore(selectIsPeerAudioEnabled(peer.id));
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMounted = useRef(true);

  const { videoRef: hmsVideoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  // Track mount state
  useEffect(() => {
    isMounted.current = true;

    const videoElement = videoRef.current;

    return () => {
      isMounted.current = false;

      // Use the captured reference
      if (videoElement) {
        videoElement.pause();
        videoElement.srcObject = null;
      }
    };
  }, []);

  // Attach HMS video ref to our video element
  useEffect(() => {
    if (!videoRef.current || !hmsVideoRef) return;
    hmsVideoRef(videoRef.current);
  }, [hmsVideoRef, peer.videoTrack]);

  // Safe play — only plays if still mounted and video is paused
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoOn || !peer.videoTrack) return;

    const tryPlay = () => {
      if (!isMounted.current || !video.paused) return;
      video.play().catch((err: Error) => {
        // Ignore abort errors from unmount racing with play()
        if (err.name !== "AbortError") {
          console.error("Error playing video:", err);
        }
      });
    };

    video.addEventListener("loadedmetadata", tryPlay);
    tryPlay(); // attempt immediately if already loaded

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
    };
  }, [isVideoOn, peer.videoTrack]);

  const showAvatar = !isVideoOn || !peer.videoTrack;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-neutral-800">
      {showAvatar &&
        (peer.userImage ? (
          <Image
            src={peer.userImage}
            alt={peer.name}
            fill
            className="rounded-md object-cover"
          />
        ) : (
          <Avatar name={peer.name} />
        ))}

      {/* Status indicators */}
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1">
        {!isAudioOn && (
          <div className="rounded-full bg-black/50 p-1">
            <MicOff className="h-4 w-4 text-white" />
          </div>
        )}
        <div className="rounded-md bg-black/50 p-1">
          {isVideoOn && peer.videoTrack ? (
            <Video className="h-4 w-4 text-green-500" />
          ) : (
            <VideoOff className="h-4 w-4 text-red-500" />
          )}
        </div>
      </div>

      {/* Video element */}
      <div className="relative h-full">
        <video
          ref={videoRef}
          className="h-full w-full scale-x-[-1] rounded-md object-cover"
          autoPlay
          muted
          playsInline
        />
        <div className="absolute bottom-2 left-2">
          <span className="max-w-[80%] truncate rounded-md px-2 py-1 text-sm font-semibold text-white">
            {peer.name} {peer.isLocal ? "(You)" : ""}
          </span>
        </div>
      </div>
    </div>
  );
}