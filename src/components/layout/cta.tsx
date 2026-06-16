'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5EEAD4]/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="container relative mx-auto max-w-[800px] rounded-3xl border border-border bg-card px-8 py-16 text-center md:px-16"
      >
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Your next meeting starts in one click.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          No downloads, no waiting room, no &ldquo;can you hear me now?&rdquo;
          Create a room and send the link.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-[#FF5D3A] px-7 py-3 text-sm font-semibold text-[#1A0900] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#FF5D3A]/30"
          >
            Create a free room
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}