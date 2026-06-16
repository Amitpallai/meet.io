"use client";

import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "../ui/peer";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";

export default function Conference() {
  const peers = useHMSStore(selectPeers);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [screenSize, setScreenSize] = React.useState<"phone" | "tablet" | "desktop">("desktop");

  React.useEffect(() => {
    if (peers.length > 0) setLoading(false);
    const handleResize = () => {
      if (window.innerWidth < 640) setScreenSize("phone");
      else if (window.innerWidth < 1024) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [peers]);

  const participantsPerPage = screenSize === "phone" ? 4 : screenSize === "tablet" ? 6 : 9;
  const paginatedPeers = peers.slice(page * participantsPerPage, (page + 1) * participantsPerPage);
  const totalPages = Math.ceil(peers.length / participantsPerPage);

  const getGridLayout = (n: number) => {
    if (screenSize === "phone") {
      if (n === 1) return "grid-cols-1";
      if (n === 2) return "grid-rows-2";
      return "grid-cols-2";
    }
    if (n === 1) return "sm:grid-cols-1";
    if (n === 2) return "sm:grid-cols-2";
    if (n <= 4) return "grid-cols-2";
    if (n <= 6) return "grid-cols-3";
    return "grid-cols-3";
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-neutral-400">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm">Connecting…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-2 pt-4 sm:px-4">
      {/* Peer grid */}
      <div className={`grid h-full w-full gap-2 auto-rows-fr sm:gap-3 ${getGridLayout(paginatedPeers.length)}`}>
        {paginatedPeers.map((peer) => (
          <Peer key={peer.id} peer={peer} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-4 bg-white" : "w-1.5 bg-neutral-600 hover:bg-neutral-500"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-neutral-300 transition-colors hover:bg-neutral-700 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}