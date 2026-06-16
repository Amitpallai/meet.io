'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Mic } from 'lucide-react';

// Nine muted gradient tiles standing in for participant cameras.
const TILES = [
  'from-[#3A2E6E] to-[#1B1430]',
  'from-[#1F3B57] to-[#0E1F33]',
  'from-[#5B2A3A] to-[#2A1320]',
  'from-[#274736] to-[#11241C]',
  'from-[#4A3420] to-[#221708]',
  'from-[#2C2C4A] to-[#141426]',
  'from-[#3B1F3F] to-[#1A0E20]',
  'from-[#1E3A3A] to-[#0C1C1C]',
  'from-[#3A2A4F] to-[#191225]',
];

export function Hero() {
  const [activeTile, setActiveTile] = useState(4);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTile((prev) => (prev + 1) % TILES.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden pb-24 pt-40 md:pb-32 md:pt-48">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#FF5D3A]/10 blur-[120px]" />

      <div className="container mx-auto grid max-w-[1200px] gap-16 px-4 md:grid-cols-2 md:items-center md:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5EEAD4] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5EEAD4]" />
            </span>
            connection status: excellent
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Show up, on time,
            <br />
            in focus.
          </h1>

          <p className="mt-6 max-w-md text-lg text-muted-foreground">
            Meet.io turns any link into a room — sharp video, instant joins,
            and zero plug-ins. Built for teams who&apos;d rather talk than
            troubleshoot.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-[#FF5D3A] px-6 py-3 text-sm font-semibold text-[#1A0900] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FF5D3A]/30"
            >
              Start a meeting
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <Play className="h-3.5 w-3.5" />
              See it in 90 seconds
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -top-3 right-4 z-10 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 font-mono text-[11px] font-medium text-[#FF5D3A] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF5D3A]" />
            REC 00:24:13
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-3xl border border-border bg-card/40 p-3 backdrop-blur-sm sm:gap-4 sm:p-4">
            {TILES.map((gradient, i) => (
              <motion.div
                key={i}
                className={`relative aspect-square rounded-xl bg-gradient-to-br ${gradient}`}
                animate={
                  activeTile === i
                    ? {
                        boxShadow:
                          '0 0 0 2px #5EEAD4, 0 0 24px rgba(94,234,212,0.35)',
                      }
                    : { boxShadow: '0 0 0 0px rgba(94,234,212,0)' }
                }
                transition={{ duration: 0.5 }}
              >
                {activeTile === i && (
                  <span className="absolute bottom-2 left-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#5EEAD4]/20">
                    <Mic className="h-2.5 w-2.5 text-[#5EEAD4]" />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}