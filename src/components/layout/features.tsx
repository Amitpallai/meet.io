'use client';

import { motion, type Variants } from 'framer-motion';
import { Video, Users, Share2, Shield, MessageSquare, Globe } from 'lucide-react';

const FEATURES = [
  {
    icon: Video,
    title: 'Studio-grade video',
    description:
      '1080p video and noise-cancelled audio that holds up on hotel wifi.',
  },
  {
    icon: Users,
    title: 'Room for everyone',
    description:
      'Host calls, webinars, and all-hands with up to 100 people in one room.',
  },
  {
    icon: Share2,
    title: 'Share anything',
    description:
      'Share a tab, an app, or your whole screen — no plug-in, no permissions dance.',
  },
  {
    icon: Shield,
    title: 'Locked by default',
    description:
      'AES-256 encryption on every call, switched on automatically.',
  },
  {
    icon: MessageSquare,
    title: 'Side conversations',
    description:
      'Chat, react, and raise a hand without interrupting whoever is talking.',
  },
  {
    icon: Globe,
    title: 'Fast, wherever you are',
    description: 'A global network keeps latency low, from Lagos to Lima.',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-[1100px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF5D3A]">
            Why teams switch
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            No lag. No logins. No &ldquo;can everyone see my screen?&rdquo;
          </h2>
          <p className="mt-4 text-muted-foreground">
            Meet.io handles the technical part of meeting, so your team can
            focus on the conversation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-colors duration-300 hover:border-[#FF5D3A]/40"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#FF5D3A]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#FF5D3A]/10" />
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted/60 text-[#FF5D3A]">
                <feature.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}