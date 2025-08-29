"use client";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import React from "react";
import Peer from "../ui/peer";
import { Icons } from "../ui/icons";

export default function Conference() {
  const peers = useHMSStore(selectPeers);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);

  // Track screen size
  const [screenSize, setScreenSize] = React.useState<
    "phone" | "tablet" | "desktop"
  >("desktop");

  React.useEffect(() => {
    if (peers.length > 0) setLoading(false);

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("phone");
      } else if (window.innerWidth < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [peers]);

  // Participants per page
  const participantsPerPage =
    screenSize === "phone" ? 4 : screenSize === "tablet" ? 6 : 9;

  // Slice peers for current page
  const paginatedPeers = peers.slice(
    page * participantsPerPage,
    (page + 1) * participantsPerPage
  );

  const totalPages = Math.ceil(peers.length / participantsPerPage);

  // Grid layout
  const getGridLayout = (numPeers: number) => {
    if (screenSize === "phone") {
      if (numPeers === 1) return "grid-cols-1";
      if (numPeers === 2) return "grid-rows-2"; // 👈 special case: 2 users stacked in rows on phone
      return "grid-cols-2"; // default for phone: 2 columns
    }

    // Tablet / Desktop
    if (numPeers === 1) return "sm:grid-cols-1";
    if (numPeers === 2) return "sm:grid-cols-2";
    if (numPeers <= 4) return "grid-cols-2";
    if (numPeers <= 6) return "grid-cols-3";
    if (numPeers === 8) return "grid-cols-4";
    if (numPeers <= 9) return "grid-cols-3";
    return "grid-cols-3"; // fallback
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-4 px-2 sm:px-4">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Icons.spinner
              className="animate-spin"
              color="#fff"
              width={20}
              height={20}
            />
            <p className="text-base sm:text-lg md:text-xl">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Grid */}
          <div
            className={`w-full h-full grid gap-2 sm:gap-4 auto-rows-fr ${getGridLayout(
              paginatedPeers.length
            )}`}
          >
            {paginatedPeers.map((peer) => (
              <Peer key={peer.id} peer={peer} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-3 sm:mt-4 gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                disabled={page === 0}
                className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40"
              >
                Prev
              </button>

              {/* Dots */}
              {Array.from({ length: totalPages }).map((_, index) => (
                <span
                  key={index}
                  onClick={() => setPage(index)}
                  className={`h-2 w-2 rounded-full mx-1 cursor-pointer ${
                    index === page ? "bg-blue-500" : "bg-gray-600"
                  }`}
                ></span>
              ))}

              <button
                onClick={() =>
                  setPage((p) => Math.min(p + 1, totalPages - 1))
                }
                disabled={page === totalPages - 1}
                className="px-3 py-1 rounded bg-gray-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
