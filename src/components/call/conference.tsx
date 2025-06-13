"use client";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "../ui/peer";
import { Icons } from "../ui/icons";

export default function Conference() {
    const peers = useHMSStore(selectPeers);

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (peers.length > 0) {
            setLoading(false);
        }
    }, [peers]);

    // Determine grid layout based on number of peers
    const getGridLayout = (numPeers: number) => {
        if (numPeers === 1) return "grid-cols-1 grid-rows-1";
        if (numPeers === 2) return "grid-cols-2 grid-rows-1";
        if (numPeers <= 4) return "grid-cols-2 grid-rows-2";
        if (numPeers <= 6) return "grid-cols-3 grid-rows-2";
        if (numPeers <= 9) return "grid-cols-3 grid-rows-3";
        return "grid-cols-3 grid-rows-3"; // Default for more than 9, will need pagination logic for full implementation
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-4 px-4">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex items-center gap-4">
                        <Icons.spinner color="#fff" width={18} height={18} />
                        <p className="text-lg sm:text-xl">Loading...</p>
                    </div>
                </div>
            ) : (
                <div className={`w-full h-full grid gap-4 ${getGridLayout(peers.length)}`}>
                    {peers.map((peer) => <Peer key={peer.id} peer={peer} />)}
                </div>
            )}
            {/* Pagination dots (visual only for now) */}
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(peers.length / 9) }).map((_, index) => (
                    <span
                        key={index}
                        className={`h-2 w-2 rounded-full mx-1 ${
                            index === 0 ? 'bg-blue-500' : 'bg-gray-600' // Assuming first page is active
                        }`}
                    ></span>
                ))}
            </div>
        </div>
    );
}
