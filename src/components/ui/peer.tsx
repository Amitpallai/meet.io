"use client"
import { selectIsPeerVideoEnabled, selectIsPeerAudioEnabled, useHMSStore, useVideo } from "@100mslive/react-sdk";
import Avatar from "./avatar";
import {  MicOff, Video, VideoOff } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import React from "react";


interface PeerProps {
    peer: {
        videoTrack?: string | undefined;
        isLocal: boolean;
        name: string;
        id: string;
        userImage?: string; 
    }
}

export default function Peer({ peer }: PeerProps) {
    const isVideoOn = useHMSStore(selectIsPeerVideoEnabled(peer.id));
    const isAudioOn = useHMSStore(selectIsPeerAudioEnabled(peer.id));
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoError, setVideoError] = useState(false);
    const { toast } = useToast();

    const { videoRef: hmsVideoRef } = useVideo({
        trackId: peer.videoTrack
    });

    // Handle video element
    React.useEffect(() => {
        if (videoRef.current && hmsVideoRef) {
            try {
                // Set the video element
                hmsVideoRef(videoRef.current);
                
                // Force video element to play
                videoRef.current.play().catch(error => {
                    console.error('Error playing video:', error);
                });

                // Add error handling for video element
                videoRef.current.onerror = (e) => {
                    console.error("Video error:", e);
                    setVideoError(true);
                    if (peer.isLocal) {
                        toast({
                            title: "Video Error",
                            description: "There was an error initializing your video. Please check your camera settings.",
                            variant: "destructive",
                        });
                    }
                };

                // Add loaded event handler
                videoRef.current.onloadedmetadata = () => {
                    setVideoError(false);
                    // Force play after metadata is loaded
                    videoRef.current?.play().catch(error => {
                        console.error('Error playing video after metadata loaded:', error);
                    });
                };

                // Add playing event handler
                videoRef.current.onplaying = () => {
                    setVideoError(true);
                };

                // Add stalled event handler
                videoRef.current.onstalled = () => {
                    setVideoError(true);
                };

                // Add waiting event handler
                videoRef.current.onwaiting = () => {
                    // console.log(`Video waiting for peer ${peer.id}`);
                };

                // Check if video is actually playing
                const checkVideoPlaying = setInterval(() => {
                    if (videoRef.current) {
                        if (!videoRef.current.paused && !videoRef.current.ended) {
                            setVideoError(false);
                        } else if (isVideoOn) {
                            setVideoError(true);
                        }
                    }
                }, 2000);

                return () => {
                    clearInterval(checkVideoPlaying);
                };
            } catch (error) {
                console.error("Error setting up video:", error);
                setVideoError(true);
            }
        }
    }, [hmsVideoRef, peer.id, peer.isLocal, isVideoOn, toast, peer.videoTrack]);

    return (
        <div className="relative h-full w-full rounded-md overflow-hidden bg-neutral-800">
            {(!isVideoOn || videoError || !peer.videoTrack) ? (
                peer.userImage ? (
                    <img
                        src={peer.userImage}
                        alt={peer.name}
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                ) : (
                    <Avatar name={peer.name} />
                )
            ) : null}
            {!peer.videoTrack && isVideoOn && !videoError && (
                 <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold bg-black/50 z-20">
                     No video track available.
                 </div>
            )}
            <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                {!isAudioOn && (
                    <div className="bg-black/50 p-1 rounded-full">
                        <MicOff className="h-4 w-4 text-white" />
                    </div>
                )}
                {/* Optionally show video status if needed */}
                 {isVideoOn && !videoError ? (
                    <div className="bg-black/50 p-1 rounded-md">
                        <Video className="h-4 w-4 text-green-500" />
                    </div>
                ) : (
                    <div className="bg-black/50 p-1 rounded-md">
                        <VideoOff className="h-4 w-4 text-red-500" />
                    </div>
                )} 
            </div>
            <div className="relative h-full">
                <video
                    ref={videoRef}
                    className="scale-x-[-1] object-cover h-full w-full rounded-md"
                    autoPlay
                    muted
                    playsInline
     
                />
                <div className="absolute bottom-2 left-2 flex items-center">
                    <span className="text-white text-sm font-semibold truncate max-w-[80%] px-2 py-1 rounded-md">{peer.name} {peer.isLocal ? "(You)" : ""}</span>
                </div>
            </div>
        </div>
    );
}
