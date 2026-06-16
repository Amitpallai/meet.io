'use client';

import { motion } from 'framer-motion';

/**
 * The Meet.io mark: a quiet "connection signal" — a dot with two rings
 * that ping outward on a loop. Reused at small sizes in the nav and
 * footer to tie the whole page back to the idea of "you're connected".
 */
export function PulseLogo({ size = 28 }: { size?: number }) {
  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-[#FF5D3A]/60"
        animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.span
        className="absolute inset-0 rounded-full border border-[#FF5D3A]/40"
        animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 0.9,
        }}
      />
      <span
        className="relative rounded-full bg-[#FF5D3A]"
        style={{ width: size * 0.4, height: size * 0.4 }}
      />
    </span>
  );
}